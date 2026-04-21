import { sendGAEvent } from "@next/third-parties/google";

type GtagFn = (...args: any[]) => void;
type AnalyticsConsentValue = "granted" | "denied";

declare global {
  interface Window {
    dcgAnalyticsConsent?: AnalyticsConsentValue | null;
    gtag?: GtagFn;
    dataLayer?: Object[];
  }
}

const getAnalyticsConsent = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return window.dcgAnalyticsConsent ?? null;
};

export function hasAnalytics(): boolean {
  return typeof window !== "undefined" && typeof window.gtag === "function";
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
  sendGAEvent("event", name, params ?? {});
}
