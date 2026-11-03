import type { CollectEventName } from "@/lib/analytics/events";

/**
 * First-party, cookieless event counting (browser side). Sends an event plus coarse context to /api/collect,
 * which only increments aggregate counters. No cookies and no device storage; honours Do Not Track and Global
 * Privacy Control. Separate from, and in addition to, the consent-gated GA4 tracking.
 */
export type CollectEvent = CollectEventName;

export type CollectProps = {
  job?: string;
  /** Override the path (used when flushing metrics for the page we just left). */
  path?: string;
  seconds?: number;
  depth?: number;
  vitals?: Partial<Record<"lcp" | "cls" | "inp" | "ttfb", number>>;
};

export function analyticsOptedOut(): boolean {
  if (typeof navigator === "undefined") return true;
  const nav = navigator as Navigator & { globalPrivacyControl?: boolean; doNotTrack?: string | null };
  return nav.globalPrivacyControl === true || nav.doNotTrack === "1";
}

function safeHost(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return "";
  }
}

export function collect(event: CollectEvent, props: CollectProps = {}) {
  if (typeof window === "undefined" || analyticsOptedOut()) return;

  const params = new URLSearchParams(window.location.search);
  const body = JSON.stringify({
    event,
    path: props.path ?? window.location.pathname,
    job: props.job,
    seconds: props.seconds,
    depth: props.depth,
    vitals: props.vitals,
    ref: document.referrer ? safeHost(document.referrer) : "",
    utmSource: params.get("utm_source") ?? "",
    utmMedium: params.get("utm_medium") ?? "",
    utmCampaign: params.get("utm_campaign") ?? "",
    w: window.innerWidth,
    lang: (navigator.language || "").slice(0, 2),
  });

  try {
    // sendBeacon survives page unloads; fall back to a keepalive fetch.
    if (navigator.sendBeacon?.("/api/collect", new Blob([body], { type: "application/json" }))) return;
  } catch {
    // fall through
  }
  try {
    void fetch("/api/collect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => undefined);
  } catch {
    // Analytics must never break the page.
  }
}
