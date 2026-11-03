"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { collect } from "@/lib/collect";

/**
 * Cookieless behaviour metrics: engaged time, scroll depth, Core Web Vitals and JS errors.
 * Mounted once in the root layout (not under /admin). Everything is aggregated server-side.
 */
export default function AnalyticsExtras() {
  const pathname = usePathname();
  const page = useRef({ path: pathname, acc: 0, start: null as number | null, depths: new Set<number>() });
  const vitalsSent = useRef(false);
  const vitals = useRef<{ lcp?: number; cls: number; inp?: number; ttfb?: number }>({ cls: 0 });
  const errors = useRef(0);

  const flushTime = () => {
    const p = page.current;
    const now = Date.now();
    const total = p.acc + (p.start ? now - p.start : 0);
    p.acc = 0;
    p.start = document.visibilityState === "visible" ? now : null;
    const seconds = Math.round(total / 1000);
    if (seconds >= 1) collect("engaged", { path: p.path, seconds: Math.min(seconds, 1800) });
  };

  // New page (route change): flush the previous page's time, then reset per-page state.
  useEffect(() => {
    if (page.current.path !== pathname) {
      flushTime();
      page.current.path = pathname;
      page.current.depths = new Set();
    }
    if (page.current.start === null && document.visibilityState === "visible") page.current.start = Date.now();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    page.current.start = document.visibilityState === "visible" ? Date.now() : null;

    const sendVitals = () => {
      if (vitalsSent.current) return;
      const v = vitals.current;
      const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
      const ttfb = nav ? Math.round(nav.responseStart) : undefined;
      if (v.lcp === undefined && ttfb === undefined) return;
      vitalsSent.current = true;
      collect("vitals", {
        path: window.location.pathname,
        vitals: { lcp: v.lcp, cls: Math.round(v.cls * 1000), inp: v.inp, ttfb },
      });
    };

    const onHide = () => {
      if (document.visibilityState === "hidden") {
        flushTime();
        sendVitals();
      } else {
        page.current.start = Date.now();
      }
    };
    document.addEventListener("visibilitychange", onHide);
    window.addEventListener("pagehide", onHide);

    // Scroll depth (25/50/75/100 once per page).
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const el = document.documentElement;
        const scrollable = el.scrollHeight - window.innerHeight;
        if (scrollable <= 0) return;
        const pct = ((window.scrollY || el.scrollTop) / scrollable) * 100;
        for (const t of [25, 50, 75, 100]) {
          if (pct >= t - 1 && !page.current.depths.has(t)) {
            page.current.depths.add(t);
            collect("scroll", { path: page.current.path, depth: t });
          }
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Core Web Vitals via PerformanceObserver (no library).
    const observers: PerformanceObserver[] = [];
    const observe = (type: string, cb: (entries: PerformanceEntryList) => void, opts: PerformanceObserverInit = {}) => {
      try {
        const o = new PerformanceObserver((list) => cb(list.getEntries()));
        o.observe({ type, buffered: true, ...opts } as PerformanceObserverInit);
        observers.push(o);
      } catch {
        // unsupported in this browser
      }
    };
    observe("largest-contentful-paint", (entries) => {
      const last = entries[entries.length - 1] as PerformanceEntry | undefined;
      if (last) vitals.current.lcp = Math.round(last.startTime);
    });
    observe("layout-shift", (entries) => {
      for (const e of entries as unknown as { value: number; hadRecentInput: boolean }[]) {
        if (!e.hadRecentInput) vitals.current.cls += e.value;
      }
    });
    observe(
      "event",
      (entries) => {
        for (const e of entries as unknown as { duration: number; interactionId?: number }[]) {
          if (e.interactionId && (vitals.current.inp === undefined || e.duration > vitals.current.inp)) {
            vitals.current.inp = Math.round(e.duration);
          }
        }
      },
      { durationThreshold: 40 } as PerformanceObserverInit,
    );

    // JavaScript errors (counts only, no messages).
    const onError = () => {
      if (errors.current++ < 5) collect("js_error", { path: page.current.path });
    };
    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onError);

    return () => {
      document.removeEventListener("visibilitychange", onHide);
      window.removeEventListener("pagehide", onHide);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onError);
      observers.forEach((o) => o.disconnect());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
