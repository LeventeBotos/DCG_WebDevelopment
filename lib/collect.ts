/**
 * First-party, cookieless event counting. Sends an event name plus coarse context to /api/collect, which only
 * increments daily aggregate counters — no cookies, no visitor ids, no IP storage. Respects Do Not Track and
 * Global Privacy Control. Separate from (and in addition to) the consent-gated GA4 tracking.
 */
export type CollectEvent =
  | "pageview"
  | "job_view"
  | "apply_open"
  | "apply_submit"
  | "apply_success"
  | "apply_error"
  | "contact_submit"
  | "contact_success"
  | "cta_click";

function optedOut(): boolean {
  if (typeof navigator === "undefined") return true;
  const nav = navigator as Navigator & { globalPrivacyControl?: boolean; doNotTrack?: string | null };
  return nav.globalPrivacyControl === true || nav.doNotTrack === "1";
}

export function collect(event: CollectEvent, props: { job?: string } = {}) {
  if (typeof window === "undefined" || optedOut()) return;

  const params = new URLSearchParams(window.location.search);
  const body = JSON.stringify({
    event,
    path: window.location.pathname,
    job: props.job,
    ref: document.referrer ? safeHost(document.referrer) : "",
    utm: params.get("utm_source") ?? "",
    mobile: window.matchMedia?.("(max-width: 767px)").matches ? "mobile" : "desktop",
  });

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

function safeHost(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return "";
  }
}
