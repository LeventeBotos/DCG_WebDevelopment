import { getDoc, incrementCounters, upsertWithCounters } from "@/lib/firestore/rest";
import {
  classifyReferrer,
  fieldSafe,
  pageKey,
  parseUserAgent,
  screenBucket,
  UTM_MEDIUMS,
  UTM_SOURCES,
  vitalBucket,
  VITALS,
  type VitalName,
} from "./vocab";
import { COLLECT_EVENTS } from "./events";

/**
 * Cookieless first-party analytics collector.
 *
 * Privacy model: nothing identifying is stored. A visitor is represented only by a hash of
 * (IP + user agent + the current UTC day + a server secret). The day is part of the hash, so the same person
 * gets a different id every day and cannot be tracked across days. Visitor documents are deleted after 2 days.
 * The raw IP and user agent are never written anywhere. Counters are sharded so busy traffic cannot hit
 * Firestore's ~1 write/second/document limit.
 */

const PROD = process.env.NODE_ENV === "production";
/** Dev traffic goes to separate collections so local testing never pollutes real analytics. */
export const COLL = {
  daily: PROD ? "analyticsDaily" : "analyticsDevDaily",
  visitors: PROD ? "analyticsVisitors" : "analyticsDevVisitors",
};
export const SHARDS = 8;

const EVENT_SET = new Set<string>(COLLECT_EVENTS);
const BOT = /bot|crawl|spider|headless|lighthouse|preview|monitor|curl|python|node-fetch|wget|axios|go-http|java\//i;
const JOB_EVENTS = new Set(["job_view", "job_filter", "apply_open", "apply_start", "apply_submit", "apply_success", "apply_error"]);
const CLICK_EVENTS = new Set(["cta_click", "nav_click", "outbound_click", "email_click", "phone_click", "social_click"]);

const num = (v: unknown, min: number, max: number): number | null =>
  typeof v === "number" && Number.isFinite(v) ? Math.min(max, Math.max(min, Math.round(v))) : null;

// ---- admin-configured campaign names (the only free-text dimension, so it must be allowlisted) ----
let campaignCache: { at: number; names: Set<string> } | null = null;
async function trackedCampaigns(): Promise<Set<string>> {
  if (campaignCache && Date.now() - campaignCache.at < 60_000) return campaignCache.names;
  const doc = await getDoc<{ names?: string[] }>("config/campaigns").catch(() => null);
  const names = new Set((doc?.names ?? []).map((n) => fieldSafe(n)).filter(Boolean));
  campaignCache = { at: Date.now(), names };
  return names;
}
export function clearCampaignCache() {
  campaignCache = null;
}

async function visitorId(req: Request, day: string): Promise<string> {
  const ip = req.headers.get("cf-connecting-ip") ?? req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "";
  const ua = req.headers.get("user-agent") ?? "";
  const data = new TextEncoder().encode(`${ip}|${ua}|${day}|${process.env.ADMIN_SESSION_SECRET ?? "dcg"}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest).slice(0, 10))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function handleCollect(req: Request): Promise<Response> {
  const noContent = () => new Response(null, { status: 204 });

  // Same-origin only; honour Do Not Track / Global Privacy Control; skip bots.
  const origin = req.headers.get("origin");
  const host = new URL(req.url).host;
  try {
    if (!origin || new URL(origin).host !== host) return noContent();
  } catch {
    return noContent();
  }
  if (req.headers.get("dnt") === "1" || req.headers.get("sec-gpc") === "1") return noContent();
  const ua = req.headers.get("user-agent") ?? "";
  if (!ua || BOT.test(ua)) return noContent();

  const text = await req.text();
  if (text.length > 2000) return noContent();
  let body: Record<string, unknown>;
  try {
    body = JSON.parse(text);
  } catch {
    return noContent();
  }

  const event = typeof body.event === "string" ? body.event : "";
  if (!EVENT_SET.has(event)) return noContent();

  const now = new Date();
  const day = now.toISOString().slice(0, 10);
  const page = pageKey(body.path);
  const inc: Record<string, number> = { [`ev_${event}`]: 1 };

  const prefix = COLL.daily;
  const vid = await visitorId(req, day);
  const visitorPath = `${COLL.visitors}/${day}_${vid}`;

  if (event === "pageview") {
    const country = (req.headers.get("cf-ipcountry") ?? "").toUpperCase();
    const { device, browser, os } = parseUserAgent(ua);
    const ref = classifyReferrer(body.ref, host.split(":")[0]);
    const lang = typeof body.lang === "string" && /^[a-z]{2}$/i.test(body.lang) ? body.lang.toLowerCase() : "";
    const utmSource = typeof body.utmSource === "string" ? fieldSafe(body.utmSource) : "";
    const utmMedium = typeof body.utmMedium === "string" ? fieldSafe(body.utmMedium) : "";
    const utmCampaign = typeof body.utmCampaign === "string" ? fieldSafe(body.utmCampaign) : "";
    const campaigns = utmCampaign ? await trackedCampaigns() : new Set<string>();
    const source = UTM_SOURCES.has(utmSource) ? utmSource : utmSource ? "other" : "";
    const medium = UTM_MEDIUMS.has(utmMedium) ? utmMedium : utmMedium ? "other" : "";
    const campaign = utmCampaign ? (campaigns.has(utmCampaign) ? utmCampaign : "other") : "";
    const cc = /^[A-Z]{2}$/.test(country) ? country : "xx";

    // 1) Touch the visitor record: pv counts this visitor's pageviews today.
    const { pv } = await upsertWithCounters(
      visitorPath,
      {
        lastSeen: now.toISOString(),
        lastPath: page,
        country: cc,
        device,
        expireAt: new Date(now.getTime() + 3 * 86_400_000), // Firestore timestamp (TTL-able)
      },
      { pv: 1 },
    );

    // 2) Counters for this pageview.
    inc[`pv_${page}`] = 1;
    inc[`ref_${ref.name}`] = 1;
    inc[`refcat_${ref.category}`] = 1;
    inc[`dev_${device}`] = 1;
    inc[`br_${browser}`] = 1;
    inc[`os_${os}`] = 1;
    inc[`scr_${screenBucket(num(body.w, 0, 10000))}`] = 1;
    inc[`cty_${cc}`] = 1;
    if (lang) inc[`lang_${lang}`] = 1;
    inc[`hr_${String(now.getUTCHours()).padStart(2, "0")}`] = 1;
    if (source) inc[`utmsrc_${source}`] = 1;
    if (medium) inc[`utmmed_${medium}`] = 1;
    if (campaign) inc[`utmcmp_${campaign}`] = 1;

    if (pv === 1) {
      // First pageview of this visitor today: count a unique visitor and remember first-touch attribution.
      inc.uv_total = 1;
      inc[`uvdev_${device}`] = 1;
      inc[`uvcty_${cc}`] = 1;
      inc[`uvref_${ref.name}`] = 1;
      inc[`uvrefcat_${ref.category}`] = 1;
      inc[`entry_${page}`] = 1;
      if (source) inc[`uvsrc_${source}`] = 1;
      if (medium) inc[`uvmed_${medium}`] = 1;
      if (campaign) inc[`uvcmp_${campaign}`] = 1;
      await upsertWithCounters(
        visitorPath,
        { entry: page, refCategory: ref.category, source, medium, campaign },
        {},
      ).catch(() => undefined);
    } else if (pv === 2) {
      inc.eng_visits = 1; // a visit with 2+ pages is "engaged"; bounce rate = 1 - eng_visits / uv_total
    }
  } else if (event === "engaged") {
    const seconds = num(body.seconds, 0, 1800);
    if (seconds && seconds >= 1) {
      inc.time_s = seconds;
      inc.time_n = 1;
      inc[`tp_${page}_s`] = seconds;
      inc[`tp_${page}_n`] = 1;
    }
    delete inc.ev_engaged;
  } else if (event === "scroll") {
    const depth = num(body.depth, 0, 100);
    if (depth && [25, 50, 75, 100].includes(depth)) {
      inc[`sd_${depth}`] = 1;
      inc[`sdp_${page}_${depth}`] = 1;
    }
    delete inc.ev_scroll;
  } else if (event === "vitals") {
    delete inc.ev_vitals;
    const v = (body.vitals ?? {}) as Record<string, unknown>;
    for (const name of Object.keys(VITALS) as VitalName[]) {
      const value = num(v[name], 0, name === "cls" ? 5000 : 60_000);
      if (value === null) continue;
      inc[`vit_${name}_${vitalBucket(name, value)}`] = 1;
      inc[`vit_${name}_sum`] = value;
      inc[`vit_${name}_n`] = 1;
      if (name === "lcp") {
        inc[`vitp_${page}_lcp_sum`] = value;
        inc[`vitp_${page}_lcp_n`] = 1;
      }
    }
  } else if (event === "js_error") {
    inc[`errp_${page}`] = 1;
  } else if (CLICK_EVENTS.has(event)) {
    if (event === "cta_click") inc[`clk_${page}`] = 1;
  }

  if (JOB_EVENTS.has(event) && typeof body.job === "string" && /^[a-z0-9-]{1,60}$/.test(body.job)) {
    // Only count real jobs so arbitrary ids cannot create new counter fields.
    const job = await getDoc<{ deletedAt?: string | null }>(`jobs/${body.job}`).catch(() => null);
    if (job && !job.deletedAt) inc[`job_${body.job.replace(/-/g, "_")}_${event}`] = 1;
  }

  // Conversions are attributed to the visitor's first-touch campaign/source/entry page (server-side lookup).
  if (event === "apply_success" || event === "contact_success") {
    const visitor = await getDoc<{ campaign?: string; source?: string; entry?: string; refCategory?: string }>(visitorPath).catch(() => null);
    if (visitor?.campaign) inc[`conv_${event}_cmp_${visitor.campaign}`] = 1;
    if (visitor?.source) inc[`conv_${event}_src_${visitor.source}`] = 1;
    if (visitor?.refCategory) inc[`conv_${event}_cat_${visitor.refCategory}`] = 1;
    if (visitor?.entry) inc[`conv_${event}_entry_${visitor.entry}`] = 1;
  }

  const shard = Math.floor(Math.random() * SHARDS);
  await incrementCounters(`${prefix}/${day}_${shard}`, inc).catch((e) =>
    console.error("[collect]", e instanceof Error ? e.message : e),
  );
  return noContent();
}
