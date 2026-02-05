"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { pageview, hasAnalytics } from "@/lib/analytics";

export default function AnalyticsRouteTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const url = `${window.location.origin}${pathname}${
      searchParams?.toString() ? `?${searchParams.toString()}` : ""
    }`;

    let attempts = 0;
    const trySend = () => {
      attempts += 1;
      if (hasAnalytics()) {
        pageview(url);
        return;
      }
      if (attempts < 5) {
        window.setTimeout(trySend, 250);
      }
    };

    trySend();
  }, [pathname, searchParams]);

  return null;
}

