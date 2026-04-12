"use client";

import Script from "next/script";
import { useCookieConsent } from "@/hooks/use-cookie-consent";
import AnalyticsRouteTracker from "@/components/AnalyticsRouteTracker";

type AnalyticsProps = {
  measurementId: string | null;
};

export default function Analytics({ measurementId }: AnalyticsProps) {
  const { consent, isReady } = useCookieConsent();
  const analyticsId = measurementId?.trim() || null;

  if (!analyticsId || !isReady || consent !== "granted") {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(
          analyticsId,
        )}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          const gaMeasurementId = ${JSON.stringify(analyticsId)};
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          window.gtag = gtag;
          window.dcgGoogleAnalyticsId = gaMeasurementId;
          gtag('js', new Date());
          gtag('config', gaMeasurementId, {
            anonymize_ip: true,
            send_page_view: false,
            allow_google_signals: false,
            allow_ad_personalization_signals: false,
          });
          window.dispatchEvent(new Event('ga-ready'));
        `}
      </Script>
      <AnalyticsRouteTracker />
    </>
  );
}
