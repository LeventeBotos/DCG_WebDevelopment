type GtagFn = (...args: any[]) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
    dataLayer?: unknown[];
  }
}

export const GA_ID =
  process.env.NEXT_PUBLIC_GA_ID || "G-T9WH3XWBH5";

export function hasAnalytics(): boolean {
  return typeof window !== "undefined" && typeof window.gtag === "function";
}

export function pageview(url: string) {
  if (!hasAnalytics()) return;
  window.gtag!("event", "page_view", {
    page_location: url,
    page_title: document?.title,
  });
}

export type AnalyticsEventName =
  | "nav_click"
  | "cta_click"
  | "outbound_click"
  | "contact_submit"
  | "contact_success"
  | "contact_error"
  | "phone_click"
  | "email_click"
  | "social_click";

export function track(
  name: AnalyticsEventName,
  params?: Record<string, unknown>
) {
  if (!hasAnalytics()) return;
  window.gtag!("event", name, params);
}
