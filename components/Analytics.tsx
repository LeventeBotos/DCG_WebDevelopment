"use client";

import Script from "next/script";
import { useCookieConsent } from "@/hooks/use-cookie-consent";

const GA_ID = "G-T9WH3XWBH5";

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
          gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
