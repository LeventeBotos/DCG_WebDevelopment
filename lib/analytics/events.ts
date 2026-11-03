/** Event names accepted by /api/collect. Kept separate from vocab.ts so the browser bundle stays small. */
export const COLLECT_EVENTS = [
  "pageview", "engaged", "scroll", "vitals", "js_error", "not_found",
  "job_view", "job_filter", "apply_open", "apply_start", "apply_submit", "apply_success", "apply_error",
  "contact_start", "contact_submit", "contact_success", "contact_error",
  "cta_click", "nav_click", "outbound_click", "email_click", "phone_click", "social_click",
] as const;
export type CollectEventName = (typeof COLLECT_EVENTS)[number];
