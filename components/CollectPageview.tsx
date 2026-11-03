"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { collect } from "@/lib/collect";

/** Counts a first-party (cookieless) pageview on each route change. Not rendered under /admin. */
export default function CollectPageview() {
  const pathname = usePathname();
  useEffect(() => {
    collect("pageview");
  }, [pathname]);
  return null;
}
