"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type IndustryRailItem = {
  key: string;
  title: string;
  summary: string;
  bullets?: string[];
  href?: string;
  tag?: string;
};

type IndustryTheme = {
  bg: string;
  glowA: string;
  glowB: string;
  accent: string;
  accentSoft: string;
};

const THEMES: IndustryTheme[] = [
  {
    bg: "from-[#eaf8ff] via-[#f8fcff] to-white",
    glowA: "bg-[#009aca]/20",
    glowB: "bg-[#7ddcb4]/25",
    accent: "text-[#0086b4]",
    accentSoft: "bg-[#009aca]/10 border-[#009aca]/25",
  },
  {
    bg: "from-[#effff6] via-[#f9fffb] to-white",
    glowA: "bg-[#1ea672]/20",
    glowB: "bg-[#6ec5ff]/18",
    accent: "text-[#138259]",
    accentSoft: "bg-[#1ea672]/10 border-[#1ea672]/25",
  },
  {
    bg: "from-[#edf3ff] via-[#f8faff] to-white",
    glowA: "bg-[#4766d8]/18",
    glowB: "bg-[#6fd0ff]/20",
    accent: "text-[#3756cc]",
    accentSoft: "bg-[#4766d8]/10 border-[#4766d8]/25",
  },
  {
    bg: "from-[#fff7ec] via-[#fffbf4] to-white",
    glowA: "bg-[#f59e0b]/18",
    glowB: "bg-[#0ea5e9]/16",
    accent: "text-[#cc7d08]",
    accentSoft: "bg-[#f59e0b]/10 border-[#f59e0b]/25",
  },
  {
    bg: "from-[#f4efff] via-[#fbf9ff] to-white",
    glowA: "bg-[#8b5cf6]/16",
    glowB: "bg-[#22c55e]/12",
    accent: "text-[#6f46d9]",
    accentSoft: "bg-[#8b5cf6]/10 border-[#8b5cf6]/25",
  },
  {
    bg: "from-[#ffeef2] via-[#fff8fa] to-white",
    glowA: "bg-[#e11d48]/16",
    glowB: "bg-[#0284c7]/14",
    accent: "text-[#c2185b]",
    accentSoft: "bg-[#e11d48]/10 border-[#e11d48]/25",
  },
];

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);

    onChange();
    mq.addEventListener?.("change", onChange);

    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  return reduced;
}

export default function IndustriesScrollRail({
  items,
  title = "Industries",
  subtitle = "Scroll to browse each industry.",
  className,
}: {
  items: IndustryRailItem[];
  title?: string;
  subtitle?: string;
  className?: string;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  const count = items.length;
  const hasManyItems = count > 1;
  const totalSteps = Math.max(1, count - 1);

  useEffect(() => {
    if (!count) return;

    let raf = 0;
    let lastProgress = -1;

    const updateProgress = () => {
      raf = 0;
      const section = sectionRef.current;

      if (section) {
        const rect = section.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        const height = section.offsetHeight;
        const viewport = Math.max(window.innerHeight, 1);
        const maxScrollY = Math.max(1, height - viewport);

        const raw = (window.scrollY - top) / maxScrollY;
        const next = clamp(raw, 0, 1);

        if (Math.abs(next - lastProgress) > 0.001) {
          lastProgress = next;
          setProgress(next);
        }
      }
    };

    const scheduleProgressUpdate = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(updateProgress);
    };

    scheduleProgressUpdate();
    window.addEventListener("scroll", scheduleProgressUpdate, {
      passive: true,
    });
    window.addEventListener("resize", scheduleProgressUpdate);

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", scheduleProgressUpdate);
      window.removeEventListener("resize", scheduleProgressUpdate);
    };
  }, [count]);

  if (!count) {
    return null;
  }

  const scrollStep = progress * totalSteps;
  const activeIndex = clamp(Math.round(scrollStep), 0, count - 1);

  const jumpToIndex = (idx: number) => {
    const section = sectionRef.current;
    if (!section) return;

    const viewport = Math.max(window.innerHeight, 1);
    const top = section.getBoundingClientRect().top + window.scrollY;
    const maxScrollY = Math.max(1, section.offsetHeight - viewport);
    const targetProgress = totalSteps <= 0 ? 0 : idx / totalSteps;

    window.scrollTo({
      top: top + maxScrollY * targetProgress,
      behavior: reducedMotion ? "auto" : "smooth",
    });

    setProgress(targetProgress);
  };

  const sectionVh = Math.max(count * 140, 360);

  return (
    <section
      ref={sectionRef}
      className={cn("relative", className)}
      style={{ minHeight: `${sectionVh}vh` }}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {items.map((item, idx) => {
          if (Math.abs(idx - scrollStep) > 1.6) {
            return null;
          }

          const theme = THEMES[idx % THEMES.length];
          const delta = idx - scrollStep;
          const distance = Math.abs(delta);

          const visibility = reducedMotion
            ? idx === activeIndex
              ? 1
              : 0
            : clamp(1 - distance * 0.95, 0, 1);

          const translateY = reducedMotion ? 0 : delta * 18;
          const scale = reducedMotion ? 1 : 1 - Math.min(distance * 0.08, 0.18);

          const slideStyle: React.CSSProperties = {
            opacity: visibility,
            transform: `translate3d(0, ${translateY}%, 0) scale(${scale})`,
            pointerEvents: visibility > 0.65 ? "auto" : "none",
            zIndex: Math.max(1, 100 - idx),
            willChange: "transform, opacity",
            transition: reducedMotion
              ? "none"
              : "opacity 220ms ease-out, transform 280ms cubic-bezier(.22,.61,.36,1)",
          };

          return (
            <article
              key={item.key}
              className="absolute inset-0"
              style={slideStyle}
              aria-hidden={visibility < 0.1}
            >
              <div
                className={cn("absolute inset-0 bg-gradient-to-br", theme.bg)}
              />
              <div
                className={cn(
                  "pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full blur-2xl",
                  theme.glowA,
                )}
              />
              <div
                className={cn(
                  "pointer-events-none absolute -right-28 bottom-10 h-80 w-80 rounded-full blur-2xl",
                  theme.glowB,
                )}
              />

              <div className="relative mx-auto flex h-full w-full max-w-6xl flex-col justify-between px-6 pb-16 pt-20 md:px-10 md:pb-20 md:pt-24">
                <header className="space-y-4">
                  <p
                    className={cn(
                      "text-xs font-semibold uppercase tracking-[0.22em]",
                      theme.accent,
                    )}
                  >
                    {item.tag || title}
                  </p>
                  <h3 className="max-w-4xl text-4xl font-semibold leading-tight text-dcg-ink md:text-6xl md:leading-[1.05]">
                    {item.title}
                  </h3>
                  <p className="max-w-3xl text-base leading-relaxed text-dcg-slate md:text-xl">
                    {item.summary}
                  </p>
                </header>

                <div className="space-y-8">
                  {item.bullets?.length ? (
                    <ul className="grid gap-3 text-sm text-dcg-ink md:grid-cols-2 md:gap-4 md:text-base">
                      {item.bullets.slice(0, 4).map((bullet) => (
                        <li
                          key={bullet}
                          className={cn(
                            "rounded-2xl border px-4 py-3 backdrop-blur-sm",
                          )}
                        >
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  <div className=" h-[1] overflow-hidden rounded-full bg-black/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-dcg-lightBlue to-dcg-lightGreen"
                      style={{ width: `${clamp(progress, 0, 1) * 100}%` }}
                    />
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-4  border-black/10">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-dcg-slate md:text-sm">
                      {String(idx + 1).padStart(2, "0")} /{" "}
                      {String(count).padStart(2, "0")}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          );
        })}

        {/* <div className="absolute bottom-0 left-0 right-0 z-[210] border-t border-black/10 bg-white/90 px-4 py-3 md:px-6 md:py-4">
          <div className="mx-auto w-full max-w-6xl">
            <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-black/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-dcg-lightBlue to-dcg-lightGreen"
                style={{ width: `${clamp(progress, 0, 1) * 100}%` }}
              />
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6">
              {items.map((item, idx) => {
                const isActive = idx === activeIndex;

                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => jumpToIndex(idx)}
                    className={cn(
                      "rounded-full border px-3 py-2 text-left text-xs font-semibold transition-colors",
                      isActive
                        ? "border-dcg-lightBlue/45 bg-dcg-lightBlue/10 text-dcg-ink"
                        : "border-black/10 bg-white/85 text-dcg-slate hover:bg-white",
                    )}
                    aria-label={`Jump to ${item.title}`}
                    disabled={!hasManyItems && idx === 0}
                  >
                    {item.title}
                  </button>
                );
              })}
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}
