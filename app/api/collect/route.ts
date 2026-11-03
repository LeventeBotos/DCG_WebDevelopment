import { NextRequest } from "next/server";
import { getDoc, incrementCounters } from "@/lib/firestore/rest";

export const runtime = "edge";
export const dynamic = "force-dynamic";

/**
 * Cookieless first-party analytics. Increments daily aggregate counters on analyticsDaily/{YYYY-MM-DD}.
 * Stores no identifiers, no IPs and no user agents. Every counter name is built from a fixed vocabulary
 * (or a validated, existing job id) so callers cannot create unbounded fields.
 */

const EVENTS = new Set([
  "pageview",
  "job_view",
  "apply_open",
  "apply_submit",
  "apply_success",
  "apply_error",
  "contact_submit",
  "contact_success",
  "cta_click",
]);
const JOB_EVENTS = new Set(["job_view", "apply_open", "apply_submit", "apply_success", "apply_error"]);
const SECTIONS = new Set([
  "services",
  "solutions",
  "industries",
  "projects",
  "insights",
  "careers",
  "contact",
  "credits",
  "privacy-policy",
  "cookie-policy",
  "terms-of-service",
]);
const REFERRERS: [string, string][] = [
  ["google.", "google"],
  ["bing.", "bing"],
  ["duckduckgo.", "duckduckgo"],
  ["linkedin.", "linkedin"],
  ["lnkd.in", "linkedin"],
  ["t.co", "twitter"],
  ["twitter.", "twitter"],
  ["x.com", "twitter"],
  ["facebook.", "facebook"],
  ["github.", "github"],
  ["youtube.", "youtube"],
];
const UTM_SOURCES = new Set(["google", "linkedin", "twitter", "facebook", "newsletter", "email", "github", "youtube", "bing"]);
const BOT = /bot|crawl|spider|headless|lighthouse|preview|monitor|curl|python|node-fetch/i;

function pathKey(path: string): string {
  if (typeof path !== "string" || !/^\/[a-z0-9\-/]{0,120}$/.test(path)) return "other";
  const parts = path.split("/").filter(Boolean);
  if (parts.length === 0) return "home";
  if (!SECTIONS.has(parts[0])) return "other";
  // Section plus first child, e.g. services_data-engineering → underscores only.
  return parts.slice(0, 2).join("_").replace(/-/g, "_").slice(0, 60);
}

function refBucket(host: unknown, selfHost: string): string {
  if (typeof host !== "string" || !host) return "direct";
  const h = host.toLowerCase();
  if (h === selfHost || h.endsWith(`.${selfHost}`)) return "direct";
  return REFERRERS.find(([needle]) => h.includes(needle))?.[1] ?? "other";
}

const noContent = () => new Response(null, { status: 204 });

export async function POST(req: NextRequest) {
  // Same-origin only, and ignore obvious bots.
  const origin = req.headers.get("origin");
  try {
    if (!origin || new URL(origin).host !== req.nextUrl.host) return noContent();
  } catch {
    return noContent();
  }
  if (BOT.test(req.headers.get("user-agent") ?? "")) return noContent();

  const text = await req.text();
  if (text.length > 1000) return noContent();
  let body: Record<string, unknown>;
  try {
    body = JSON.parse(text);
  } catch {
    return noContent();
  }

  const event = typeof body.event === "string" ? body.event : "";
  if (!EVENTS.has(event)) return noContent();

  const inc: Record<string, number> = { [`ev_${event}`]: 1 };

  if (event === "pageview") {
    inc[`pv_${pathKey(String(body.path ?? ""))}`] = 1;
    inc[`ref_${refBucket(body.ref, req.nextUrl.hostname.replace(/^www\./, ""))}`] = 1;
    const utm = typeof body.utm === "string" ? body.utm.toLowerCase() : "";
    if (UTM_SOURCES.has(utm)) inc[`utm_${utm}`] = 1;
    inc[`dev_${body.mobile === "mobile" ? "mobile" : "desktop"}`] = 1;
    const country = (req.headers.get("cf-ipcountry") ?? "").toUpperCase();
    if (/^[A-Z]{2}$/.test(country)) inc[`cty_${country}`] = 1;
  }

  if (JOB_EVENTS.has(event) && typeof body.job === "string" && /^[a-z0-9-]{1,60}$/.test(body.job)) {
    // Only count real jobs, so arbitrary ids cannot create new counter fields.
    const job = await getDoc(`jobs/${body.job}`).catch(() => null);
    if (job) inc[`job_${body.job.replace(/-/g, "_")}_${event}`] = 1;
  }

  const day = new Date().toISOString().slice(0, 10);
  await incrementCounters(`analyticsDaily/${day}`, inc).catch((e) =>
    console.error("[collect]", e instanceof Error ? e.message : e),
  );
  return noContent();
}
