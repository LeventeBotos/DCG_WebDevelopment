"use client";

import { useState } from "react";
import {
  Building2,
  Plane,
  ShoppingBag,
  Train,
  Workflow,
  Factory,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Industry = {
  title: string;
  icon: LucideIcon;
  accent: string;
  accentBg: string;
  accentBorder: string;
  summary: string;
  bullets: string[];
  useCases: string[];
};

const industries: Industry[] = [
  {
    title: "Retail",
    icon: ShoppingBag,
    accent: "text-sky-600",
    accentBg: "bg-sky-50",
    accentBorder: "border-sky-200/60",
    summary:
      "Demand forecasting, dynamic pricing, and waste reduction tuned to every store.",
    bullets: [
      "Demand forecasting and inventory optimization",
      "Dynamic pricing near expiration to minimize waste",
      "Context-aware models by location, events, and demographics",
    ],
    useCases: ["Forecasting", "Pricing", "Supply chain"],
  },
  {
    title: "Energy & Oil and Gas",
    icon: Factory,
    accent: "text-amber-600",
    accentBg: "bg-amber-50",
    accentBorder: "border-amber-200/60",
    summary:
      "Predictive maintenance, production forecasting, and digital twins for critical assets.",
    bullets: [
      "Production forecasting across complex upstream/downstream operations",
      "Predictive maintenance for equipment fleets",
      "Digital twins for operations, monitoring, and forecasting",
    ],
    useCases: ["Maintenance", "Digital twins", "Production"],
  },
  {
    title: "Finance",
    icon: Building2,
    accent: "text-emerald-600",
    accentBg: "bg-emerald-50",
    accentBorder: "border-emerald-200/60",
    summary:
      "Fraud detection, risk models, and compliance systems that keep pace with regulation.",
    bullets: [
      "Risk scoring and compliance automation",
      "Fraud detection and transaction monitoring",
      "Customer insights with secure, anonymized data pipelines",
    ],
    useCases: ["Risk", "Fraud detection", "Compliance"],
  },
  {
    title: "IT / Technology",
    icon: Workflow,
    accent: "text-violet-600",
    accentBg: "bg-violet-50",
    accentBorder: "border-violet-200/60",
    summary:
      "Scalable architectures, data migration, and MLOps to accelerate product teams.",
    bullets: [
      "Data migration and platform modernization",
      "MLOps platforms for faster experiments and safer releases",
      "Secure, composable architectures for growth",
    ],
    useCases: ["MLOps", "Migration", "Architecture"],
  },
  {
    title: "Transportation",
    icon: Train,
    accent: "text-rose-600",
    accentBg: "bg-rose-50",
    accentBorder: "border-rose-200/60",
    summary:
      "Passenger analytics and operational optimization for rail and logistics.",
    bullets: [
      "Passenger demand modeling and station analytics",
      "Railway queue optimization and routing",
      "Operational dashboards for day-of adjustments",
    ],
    useCases: ["Demand modeling", "Routing", "Dashboards"],
  },
  {
    title: "Aviation",
    icon: Plane,
    accent: "text-dcg-blue",
    accentBg: "bg-dcg-lightBlue/10",
    accentBorder: "border-dcg-lightBlue/30",
    summary:
      "Pricing, revenue management, and customer analytics for airlines and airports.",
    bullets: [
      "Dynamic pricing and revenue management",
      "Customer analytics for loyalty and service design",
      "Forecasting and operational decision support",
    ],
    useCases: ["Revenue mgmt", "Loyalty", "Forecasting"],
  },
];

export default function IndustriesGrid() {
  const [active, setActive] = useState<number>(0);
  const selected = industries[active];

  return (
    <section className="bg-dcg-sand/40">
      <div className="dcg-section py-16 md:py-24">
        <div className="max-w-3xl space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-dcg-lightGreen">
            Industries we serve
          </p>
          <h2 className="text-3xl font-bold text-dcg-ink md:text-4xl text-balance">
            Sector depth with AI-first execution
          </h2>
          <p className="text-dcg-slate">
            From retail and energy to aviation and finance, DCG translates data
            and AI into operational impact. Select an industry to explore how we
            help.
          </p>
        </div>

        {/* Industry selector + detail panel */}
        <div className="mt-10 grid gap-6 lg:grid-cols-[340px_1fr] lg:gap-8">
          {/* Left: industry tabs */}
          <div className="flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-1.5 lg:overflow-x-visible lg:pb-0">
            {industries.map((industry, i) => {
              const isActive = active === i;
              const Icon = industry.icon;
              return (
                <button
                  key={industry.title}
                  type="button"
                  onClick={() => setActive(i)}
                  className={cn(
                    "group flex shrink-0 items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition-all duration-200 lg:w-full",
                    isActive
                      ? "border-dcg-lightBlue/30 bg-white shadow-lg"
                      : "border-transparent bg-transparent hover:border-dcg-lightBlue/15 hover:bg-white/60"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors",
                      isActive ? industry.accentBg : "bg-dcg-sand"
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-5 w-5 transition-colors",
                        isActive ? industry.accent : "text-dcg-slate"
                      )}
                    />
                  </div>
                  <div className="min-w-0">
                    <p
                      className={cn(
                        "text-sm font-semibold transition-colors",
                        isActive ? "text-dcg-ink" : "text-dcg-slate"
                      )}
                    >
                      {industry.title}
                    </p>
                    <p className="hidden text-xs text-dcg-slate lg:block truncate">
                      {industry.useCases.join(" / ")}
                    </p>
                  </div>
                  <ArrowRight
                    className={cn(
                      "ml-auto hidden h-4 w-4 shrink-0 transition-all lg:block",
                      isActive
                        ? "text-dcg-lightBlue opacity-100 translate-x-0"
                        : "text-dcg-slate opacity-0 -translate-x-1"
                    )}
                  />
                </button>
              );
            })}
          </div>

          {/* Right: detail panel */}
          <div
            key={selected.title}
            className="rounded-3xl border border-dcg-lightBlue/20 bg-white p-6 shadow-lg md:p-8 animate-in fade-in-0 duration-300"
          >
            {/* Panel header */}
            <div className="flex items-start gap-4">
              <div
                className={cn(
                  "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl",
                  selected.accentBg
                )}
              >
                <selected.icon className={cn("h-7 w-7", selected.accent)} />
              </div>
              <div className="min-w-0">
                <h3 className="text-xl font-bold text-dcg-ink md:text-2xl">
                  {selected.title}
                </h3>
                <p className="mt-1 text-sm text-dcg-slate leading-relaxed">
                  {selected.summary}
                </p>
              </div>
            </div>

            {/* Use-case chips */}
            <div className="mt-5 flex flex-wrap gap-2">
              {selected.useCases.map((uc) => (
                <span
                  key={uc}
                  className={cn(
                    "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
                    selected.accentBorder,
                    selected.accentBg,
                    selected.accent
                  )}
                >
                  {uc}
                </span>
              ))}
            </div>

            {/* Divider */}
            <div className="my-6 h-px w-full bg-dcg-lightBlue/10" />

            {/* Capabilities */}
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-dcg-slate">
              Key capabilities
            </p>
            <ul className="mt-4 grid gap-4 md:grid-cols-1 lg:grid-cols-3">
              {selected.bullets.map((bullet, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 rounded-2xl border border-dcg-lightBlue/10 bg-dcg-sand/50 p-4"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-white text-[11px] font-bold text-dcg-blue shadow-sm">
                    {i + 1}
                  </span>
                  <span className="text-sm text-dcg-ink leading-relaxed">
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
