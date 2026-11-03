import { services } from "@/lib/services";
import { platforms } from "@/lib/platforms";

/**
 * Fixed vocabularies for first-party analytics. Every counter name is built from these (or from a validated job
 * id / configured campaign), so the public /api/collect endpoint can never be used to create unbounded fields.
 * Shared by the collector (write) and the dashboard (labels).
 */

export const INDUSTRY_SLUGS = ["energy", "banking", "manufacturing", "retail"] as const;
const SECTIONS = [
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
] as const;

/** Make a string safe to embed in a Firestore counter field name. */
export const fieldSafe = (v: string) => v.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").slice(0, 40);

const CHILDREN: Record<string, Set<string>> = {
  services: new Set(services.map((s) => s.slug)),
  solutions: new Set(platforms.map((p) => p.slug)),
  industries: new Set(INDUSTRY_SLUGS),
};

/** Map a URL path to a bounded page key: "home", "services", "services_data_migration", "careers_job", ... */
export function pageKey(path: unknown): string {
  if (typeof path !== "string" || !/^\/[a-z0-9\-/]{0,120}$/.test(path)) return "other";
  const parts = path.split("/").filter(Boolean);
  if (parts.length === 0) return "home";
  const [section, child] = parts;
  if (!(SECTIONS as readonly string[]).includes(section)) return "other";
  if (section === "careers") return child ? "careers_job" : "careers";
  if (child && CHILDREN[section]?.has(child)) return `${fieldSafe(section)}_${fieldSafe(child)}`;
  return fieldSafe(section);
}

/** Reverse of pageKey for display: "services_data_migration" → "/services/data-migration". */
export function pageLabel(key: string): string {
  if (key === "home") return "/";
  if (key === "careers_job") return "/careers/<job>";
  if (key === "other") return "(other)";
  for (const section of SECTIONS) {
    const safe = fieldSafe(section);
    if (key === safe) return `/${section}`;
    if (key.startsWith(`${safe}_`)) {
      const rest = key.slice(safe.length + 1);
      for (const slug of CHILDREN[section] ?? []) if (fieldSafe(slug) === rest) return `/${section}/${slug}`;
    }
  }
  return `/${key.replace(/_/g, "-")}`;
}

// ---- referrers ----
export type RefCategory = "search" | "social" | "ai" | "referral" | "direct";
const REFERRERS: [needle: string, name: string, category: RefCategory][] = [
  ["google.", "google", "search"],
  ["bing.", "bing", "search"],
  ["duckduckgo.", "duckduckgo", "search"],
  ["yahoo.", "yahoo", "search"],
  ["yandex.", "yandex", "search"],
  ["baidu.", "baidu", "search"],
  ["ecosia.", "ecosia", "search"],
  ["brave.", "brave", "search"],
  ["linkedin.", "linkedin", "social"],
  ["lnkd.in", "linkedin", "social"],
  ["twitter.", "twitter", "social"],
  ["t.co", "twitter", "social"],
  ["x.com", "twitter", "social"],
  ["facebook.", "facebook", "social"],
  ["fb.com", "facebook", "social"],
  ["instagram.", "instagram", "social"],
  ["reddit.", "reddit", "social"],
  ["youtube.", "youtube", "social"],
  ["news.ycombinator", "hackernews", "social"],
  ["medium.", "medium", "social"],
  ["substack.", "substack", "social"],
  ["chatgpt.", "chatgpt", "ai"],
  ["openai.", "chatgpt", "ai"],
  ["perplexity.", "perplexity", "ai"],
  ["claude.ai", "claude", "ai"],
  ["gemini.google", "gemini", "ai"],
  ["copilot.", "copilot", "ai"],
  ["github.", "github", "referral"],
];

export function classifyReferrer(host: unknown, selfHost: string): { name: string; category: RefCategory } {
  if (typeof host !== "string" || !host) return { name: "direct", category: "direct" };
  const h = host.toLowerCase();
  const self = selfHost.replace(/^www\./, "");
  if (h === self || h === `www.${self}` || h.endsWith(`.${self}`)) return { name: "direct", category: "direct" };
  const hit = REFERRERS.find(([needle]) => h.includes(needle));
  return hit ? { name: hit[1], category: hit[2] } : { name: "other", category: "referral" };
}

export const UTM_SOURCES = new Set([
  "google", "linkedin", "twitter", "x", "facebook", "instagram", "newsletter", "email", "github", "youtube",
  "reddit", "bing", "producthunt", "partner", "event", "qr",
]);
export const UTM_MEDIUMS = new Set([
  "cpc", "email", "social", "organic", "referral", "newsletter", "display", "affiliate", "partner", "qr", "print",
]);

// ---- user agent (never stored; only mapped to these buckets) ----
export type Device = "mobile" | "tablet" | "desktop";
export function parseUserAgent(ua: string): { device: Device; browser: string; os: string } {
  const device: Device = /iPad|Tablet|PlayBook|Silk/i.test(ua) || (/Android/i.test(ua) && !/Mobile/i.test(ua))
    ? "tablet"
    : /Mobi|iPhone|iPod|Android/i.test(ua)
      ? "mobile"
      : "desktop";
  const browser = /Edg\//.test(ua)
    ? "edge"
    : /OPR\/|Opera/.test(ua)
      ? "opera"
      : /SamsungBrowser/.test(ua)
        ? "samsung"
        : /Firefox\/|FxiOS/.test(ua)
          ? "firefox"
          : /Chrome\/|CriOS/.test(ua)
            ? "chrome"
            : /Safari\//.test(ua)
              ? "safari"
              : "other";
  const os = /iPhone|iPad|iPod/.test(ua)
    ? "ios"
    : /Android/.test(ua)
      ? "android"
      : /Windows/.test(ua)
        ? "windows"
        : /CrOS/.test(ua)
          ? "chromeos"
          : /Mac OS X|Macintosh/.test(ua)
            ? "macos"
            : /Linux/.test(ua)
              ? "linux"
              : "other";
  return { device, browser, os };
}

export const screenBucket = (w: unknown): string => {
  const n = typeof w === "number" ? w : 0;
  return n < 640 ? "xs" : n < 1024 ? "sm" : n < 1440 ? "md" : n < 1920 ? "lg" : "xl";
};

// ---- web vitals thresholds (Google's "good" / "poor" boundaries) ----
export const VITALS = {
  lcp: { good: 2500, poor: 4000, unit: "ms", label: "Largest Contentful Paint" },
  cls: { good: 100, poor: 250, unit: "×1000", label: "Cumulative Layout Shift" }, // stored ×1000
  inp: { good: 200, poor: 500, unit: "ms", label: "Interaction to Next Paint" },
  ttfb: { good: 800, poor: 1800, unit: "ms", label: "Time to First Byte" },
} as const;
export type VitalName = keyof typeof VITALS;
export const vitalBucket = (name: VitalName, v: number): "good" | "ni" | "poor" =>
  v <= VITALS[name].good ? "good" : v > VITALS[name].poor ? "poor" : "ni";

export { COLLECT_EVENTS, type CollectEventName } from "./events";
