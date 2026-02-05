"use client";

import Script from "next/script";
import { useCookieConsent } from "@/hooks/use-cookie-consent";
import AnalyticsRouteTracker from "@/components/AnalyticsRouteTracker";
import { GA_ID } from "@/lib/analytics";

export default function Analytics() {
  const { consent, isReady } = useCookieConsent();

  if (!isReady || consent !== "granted") {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            anonymize_ip: true,
            send_page_view: false,
            allow_google_signals: false,
            allow_ad_personalization_signals: false,
          });
        `}
      </Script>
      <AnalyticsRouteTracker />
    </>
  );
}
