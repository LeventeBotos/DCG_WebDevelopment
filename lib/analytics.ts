type GtagFn = (...args: any[]) => void;

declare global {
  interface Window {
    dcgGoogleAnalyticsId?: string;
    gtag?: GtagFn;
    dataLayer?: unknown[];
  }
}

const getAnalyticsId = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return window.dcgGoogleAnalyticsId?.trim() || null;
};

export function hasAnalytics(): boolean {
  return (
    Boolean(getAnalyticsId()) &&
    typeof window !== "undefined" &&
    typeof window.gtag === "function"
  );
}

export function pageview(url: string) {
  if (!hasAnalytics()) return;
  window.gtag!("event", "page_view", {
    send_to: getAnalyticsId(),
    page_location: url,
    page_title: document.title,
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
  window.gtag!("event", name, {
    send_to: getAnalyticsId(),
    ...params,
  });
}
