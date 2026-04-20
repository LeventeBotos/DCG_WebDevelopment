"use client";

import Script from "next/script";
import AnalyticsRouteTracker from "@/components/AnalyticsRouteTracker";

type AnalyticsProps = {
  measurementId: string | null;
};

export default function Analytics({ measurementId }: AnalyticsProps) {
  const analyticsId = measurementId?.trim() || null;

  if (!analyticsId) {
    return null;
  }

  return (
    <>
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          const gaMeasurementId = ${JSON.stringify(analyticsId)};
          const consentKey = 'dcg_cookie_consent';
          const readStoredAnalyticsConsent = () => {
            try {
              const stored = window.localStorage.getItem(consentKey);
              if (stored === 'granted' || stored === 'denied') {
                return stored;
              }
            } catch (error) {}

            const match = document.cookie.match(new RegExp('(?:^|; )' + consentKey + '=([^;]*)'));
            if (!match) {
              return null;
            }

            try {
              const value = decodeURIComponent(match[1]);
              return value === 'granted' || value === 'denied' ? value : null;
            } catch (error) {
              return null;
            }
          };

          const storedAnalyticsConsent = readStoredAnalyticsConsent();
          const analyticsStorage = storedAnalyticsConsent === 'granted' ? 'granted' : 'denied';

          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          window.gtag = gtag;
          window.dcgGoogleAnalyticsId = gaMeasurementId;
          window.dcgAnalyticsConsent = storedAnalyticsConsent;

          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: analyticsStorage,
            wait_for_update: 500,
          });
          gtag('set', {
            ads_data_redaction: true,
            allow_google_signals: false,
            allow_ad_personalization_signals: false,
          });
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
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(
          analyticsId,
        )}`}
        strategy="afterInteractive"
      />
      <AnalyticsRouteTracker />
    </>
  );
}
