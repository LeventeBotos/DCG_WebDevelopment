"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { hasAnalytics, hasAnalyticsConsent, pageview } from "@/lib/analytics";

export default function AnalyticsRouteTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const url = `${window.location.origin}${pathname}${
      searchParams?.toString() ? `?${searchParams.toString()}` : ""
    }`;

    const sendPageview = () => {
      if (hasAnalytics() && hasAnalyticsConsent()) {
        pageview(url);
      }
    };

    if (hasAnalytics()) {
      sendPageview();
      return;
    }

    window.addEventListener("ga-ready", sendPageview, { once: true });
    return () => window.removeEventListener("ga-ready", sendPageview);
  }, [pathname, searchParams]);

  return null;
}
