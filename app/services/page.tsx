"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { services, type ServiceDetail } from "@/lib/services";
import DCGAIPlatformSection from "@/components/DCGAIPlatformSection";
import SubpageHero from "@/components/SubpageHero";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Timeline } from "@/components/ui/timeline";

const engagement = [
  {
    title: "Discover",
    body: "Frame the ambition, align on measurable outcomes, and surface the data and process realities.",
  },
  {
    title: "Design",
    body: "Blueprint AI, data, and cloud architectures with security, governance, and adoption plans baked in.",
  },
  {
    title: "Deliver",
    body: "Ship pilots quickly, then harden with MLOps, observability, and transparent change management.",
  },
  {
    title: "Scale",
    body: "Embed agentic workflows, dashboards, and training to keep value growing after launch.",
  },
];

const categoryStyle: Record<
  ServiceDetail["category"],
  { bar: string; chip: string; label: string; panel: string }
> = {
  Data: {
    bar: "bg-sky-400",
    chip: "border-sky-200 bg-sky-50 text-sky-700",
    label: "Data",
    panel: "from-sky-100/80 to-sky-50/30 border-sky-200/80",
  },
  AI: {
    bar: "bg-emerald-400",
    chip: "border-emerald-200 bg-emerald-50 text-emerald-700",
    label: "AI",
    panel: "from-emerald-100/80 to-emerald-50/30 border-emerald-200/80",
  },
  "Cloud Operations": {
    bar: "bg-violet-400",
    chip: "border-violet-200 bg-violet-50 text-violet-700",
    label: "Cloud Ops",
    panel: "from-violet-100/80 to-violet-50/30 border-violet-200/80",
  },
};

const categoryOrder: Record<ServiceDetail["category"], number> = {
  Data: 0,
  AI: 1,
  "Cloud Operations": 2,
};

const categoryFilters = ["All", "Data", "AI", "Cloud Operations"] as const;
type CategoryFilter = (typeof categoryFilters)[number];

const sortModes = ["A-Z", "Type"] as const;
type SortMode = (typeof sortModes)[number];

const serviceCountsByCategory = services.reduce<
  Record<ServiceDetail["category"], number>
>(
  (acc, svc) => {
    acc[svc.category] += 1;
    return acc;
  },
  { Data: 0, AI: 0, "Cloud Operations": 0 },
);

export default function ServicesPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");
  const [sortMode, setSortMode] = useState<SortMode>("A-Z");

  const filteredServices = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const next = services.filter((svc) => {
      const matchesType =
        activeCategory === "All" || svc.category === activeCategory;

      const searchable = [
        svc.title,
        svc.excerpt,
        svc.summary,
        svc.highlights.join(" "),
        svc.outcomes.join(" "),
      ]
        .join(" ")
        .toLowerCase();

      const matchesQuery =
        normalizedQuery.length === 0 || searchable.includes(normalizedQuery);

      return matchesType && matchesQuery;
    });

    next.sort((a, b) => {
      if (sortMode === "Type") {
        const byCategory =
          categoryOrder[a.category] - categoryOrder[b.category];
        if (byCategory !== 0) {
          return byCategory;
        }
      }
      return a.title.localeCompare(b.title);
    });

    return next;
  }, [query, activeCategory, sortMode]);

  const engagementTimeline = useMemo(() => {
    return engagement.map((step, index) => ({
      title: `${String(index + 1).padStart(2, "0")} ${step.title}`,
      content: (
        <div className="h-full w-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Step {index + 1}
            </span>
            <span className="text-xs font-medium tabular-nums text-slate-500">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <div className="mt-4 space-y-2">
            <p className="text-lg font-semibold text-slate-900">{step.title}</p>
            <p className="text-sm text-slate-600">{step.body}</p>
          </div>

          <div className="mt-6 rounded-xl border border-slate-100 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Outcome
            </p>
            <p className="mt-1 text-sm text-slate-700">
              {index === 0 &&
                "Aligned scope, success metrics, and current state realities."}
              {index === 1 &&
                "A buildable blueprint with governance, security, and adoption baked in."}
              {index === 2 &&
                "Fast pilot delivery with production grade reliability and transparency."}
              {index === 3 &&
                "Sustained value via enablement, dashboards, and repeatable playbooks."}
            </p>
          </div>
        </div>
      ),
    }));
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <SubpageHero
        eyebrow="Services"
        title="A clear, outcome-first catalog across data, AI, and cloud."
        emphasis="outcome-first"
        description="We design, build, and operate the platforms and products that keep your business intelligent, covering data foundations, AI use cases, and cloud operations with security and cost control built in."
        actions={[
          { label: "Talk with us", href: "/contact", variant: "primary" },
          {
            label: "View solutions & projects",
            href: "/projects",
            variant: "secondary",
          },
        ]}
      />

      <section className="dcg-section space-y-6 py-12 md:py-16">
        <div className="max-w-3xl space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-dcg-slate">
            Productized AI
          </p>
          <h2 className="text-3xl font-bold text-dcg-ink md:text-4xl">
            Ready-to-deploy solutions
          </h2>
          <p className="text-dcg-slate">
            Pre-built platforms with the data models, guardrails, and launch
            plays to prove value fast. Pick one to see what&apos;s inside.
          </p>
        </div>
        <DCGAIPlatformSection />
      </section>

      <section className="dcg-section space-y-6 py-12 md:py-16">
        <div className="max-w-3xl space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-dcg-lightGreen">
            Service directory
          </p>
          <h2 className="text-3xl font-bold text-dcg-ink md:text-4xl">
            One searchable list, clearer choice
          </h2>
          <p className="text-dcg-slate">
            Browse every service in one place. Use filters to narrow by type,
            search by outcomes, and jump straight into the service that fits.
          </p>
        </div>

        <div className="space-y-4">
          <div className="sticky top-20 z-20 rounded-2xl border border-slate-200 bg-white/90 p-4 backdrop-blur">
            <div className="grid gap-4 lg:grid-cols-[1fr_auto_auto] lg:items-center">
              <label className="block">
                <span className="sr-only">Search services</span>
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search by service, capability, or outcome"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 shadow-sm outline-none ring-0 transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                />
              </label>

              <div className="flex flex-wrap gap-2">
                {categoryFilters.map((filter) => {
                  const active = activeCategory === filter;
                  const count =
                    filter === "All"
                      ? services.length
                      : serviceCountsByCategory[filter];

                  return (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setActiveCategory(filter)}
                      className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                        active
                          ? "border-slate-500 bg-slate-900 text-white"
                          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900"
                      }`}
                    >
                      <span>
                        {filter === "Cloud Operations" ? "Cloud Ops" : filter}
                      </span>
                      <span className="text-[11px] tabular-nums">{count}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex gap-2">
                {sortModes.map((mode) => {
                  const active = sortMode === mode;
                  return (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setSortMode(mode)}
                      className={`rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                        active
                          ? "border-slate-400 bg-slate-100 text-slate-900"
                          : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-800"
                      }`}
                    >
                      Sort: {mode}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between px-1">
            <p className="text-sm text-slate-600">
              Showing{" "}
              <span className="font-semibold text-slate-900">
                {filteredServices.length}
              </span>{" "}
              of {services.length} services
            </p>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
              Full directory
            </p>
          </div>

          {filteredServices.length > 0 ? (
            <BentoGrid className="mx-0 max-w-none md:grid-cols-4 md:auto-rows-[19rem]">
              {filteredServices.map((svc) => {
                const style = categoryStyle[svc.category];

                return (
                  <Link
                    key={svc.slug}
                    href={`/services/${svc.slug}`}
                    className="group block h-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
                  >
                    <BentoGridItem
                      className="relative h-full overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md"
                      header={
                        <div
                          className={`relative overflow-hidden rounded-xl border bg-gradient-to-r p-3 ${style.panel}`}
                        >
                          <span className="absolute -right-6 -top-6 h-14 w-14 rounded-full bg-white/60" />
                          <span className="absolute -bottom-6 -left-3 h-10 w-16 rounded-full bg-white/40" />
                          <div className="relative flex items-center justify-between">
                            <span
                              className={`inline-flex items-center rounded-md border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${style.chip}`}
                            >
                              {style.label}
                            </span>
                            <span className="text-xs font-medium text-slate-600">
                              {svc.pillars.length} pillars
                            </span>
                          </div>
                        </div>
                      }
                      title={
                        <div className="space-y-2">
                          <div className="flex items-start justify-between gap-3">
                            <h3 className="text-lg font-semibold text-slate-900">
                              {svc.title}
                            </h3>
                            <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-slate-700" />
                          </div>
                          <div className="h-px w-full bg-slate-100" />
                        </div>
                      }
                      description={
                        <div className="space-y-3">
                          <p className="text-sm text-slate-600">
                            {svc.excerpt}
                          </p>
                          <ul className="space-y-1.5">
                            {svc.outcomes.slice(0, 2).map((outcome) => (
                              <li
                                key={outcome}
                                className="flex items-start gap-2 text-xs text-slate-600"
                              >
                                <span
                                  className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${style.bar}`}
                                />
                                <span>{outcome}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      }
                    />
                  </Link>
                );
              })}
            </BentoGrid>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
              <p className="text-sm text-slate-600">
                No services match those filters. Try another keyword or type.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
