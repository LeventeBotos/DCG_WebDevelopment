type GtagFn = (...args: any[]) => void;
type AnalyticsConsentValue = "granted" | "denied";

declare global {
  interface Window {
    dcgGoogleAnalyticsId?: string;
    dcgAnalyticsConsent?: AnalyticsConsentValue | null;
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

const getAnalyticsConsent = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return window.dcgAnalyticsConsent ?? null;
};

export function hasAnalytics(): boolean {
  return (
    Boolean(getAnalyticsId()) &&
    typeof window !== "undefined" &&
    typeof window.gtag === "function"
  );
}

export function hasAnalyticsConsent(): boolean {
  return getAnalyticsConsent() === "granted";
}

const getConsentModeParams = (consent: AnalyticsConsentValue) => ({
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: consent,
});

export function updateGoogleAnalyticsConsent(consent: AnalyticsConsentValue) {
  if (typeof window === "undefined") return;

  window.dcgAnalyticsConsent = consent;

  if (typeof window.gtag !== "function") {
    return;
  }

  window.gtag("consent", "update", getConsentModeParams(consent));
}

export function pageview(url?: string) {
  if (!hasAnalytics()) return;

  const pageLocation = url || window.location.href;

  window.gtag!("event", "page_view", {
    send_to: getAnalyticsId(),
    page_location: pageLocation,
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
  if (!hasAnalytics() || !hasAnalyticsConsent()) return;
  window.gtag!("event", name, {
    send_to: getAnalyticsId(),
    ...params,
  });
}
