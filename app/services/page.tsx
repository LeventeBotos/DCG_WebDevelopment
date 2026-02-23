"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { services, type ServiceDetail } from "@/lib/services";
import DCGAIPlatformSection from "@/components/DCGAIPlatformSection";
import SubpageHero from "@/components/SubpageHero";
import ContactCtaSection from "@/components/ContactCtaSection";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { EvervaultCardWhite } from "@/components/ui/evervault-card-white";

type CategoryKey = "ai" | "cloud" | "data";

type GroupedService = ServiceDetail & {
  groupedCount: number;
};

const categoryMeta: Record<
  CategoryKey,
  {
    label: string;
    serviceCategory: ServiceDetail["category"];
    description: string;
  }
> = {
  ai: {
    label: "AI",
    serviceCategory: "AI",
    description: "Models, LLMs, and intelligent automation services.",
  },
  cloud: {
    label: "Cloud",
    serviceCategory: "Cloud Operations",
    description:
      "Infrastructure, platform operations, and reliability services.",
  },
  data: {
    label: "Data",
    serviceCategory: "Data",
    description: "Data foundations, governance, and analytics services.",
  },
};

const categoryStyle: Record<
  CategoryKey,
  { bar: string; chip: string; label: string; panel: string }
> = {
  data: {
    bar: "bg-sky-400",
    chip: "border-sky-200 bg-sky-50 text-sky-700",
    label: "Data",
    panel: "from-sky-100/80 to-sky-50/30 border-sky-200/80",
  },
  ai: {
    bar: "bg-emerald-400",
    chip: "border-emerald-200 bg-emerald-50 text-emerald-700",
    label: "AI",
    panel: "from-emerald-100/80 to-emerald-50/30 border-emerald-200/80",
  },
  cloud: {
    bar: "bg-violet-400",
    chip: "border-violet-200 bg-violet-50 text-violet-700",
    label: "Cloud",
    panel: "from-violet-100/80 to-violet-50/30 border-violet-200/80",
  },
};

const categoryKeys: CategoryKey[] = ["ai", "cloud", "data"];

const toCategoryKey = (category: ServiceDetail["category"]): CategoryKey => {
  if (category === "AI") {
    return "ai";
  }
  if (category === "Cloud Operations") {
    return "cloud";
  }
  return "data";
};

const serviceKey = (service: ServiceDetail): string =>
  `${toCategoryKey(service.category)}:${service.title
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")}`;

const groupedServicesMap = services.reduce<Map<string, GroupedService>>(
  (acc, service) => {
    const key = serviceKey(service);
    const existing = acc.get(key);

    if (!existing) {
      acc.set(key, { ...service, groupedCount: 1 });
      return acc;
    }

    const uniqueHighlights = Array.from(
      new Set([...existing.highlights, ...service.highlights]),
    );
    const uniqueOutcomes = Array.from(
      new Set([...existing.outcomes, ...service.outcomes]),
    );
    const uniquePillars = Array.from(
      new Map(
        [...existing.pillars, ...service.pillars].map((pillar) => [
          pillar.title.trim().toLowerCase(),
          pillar,
        ]),
      ).values(),
    );

    acc.set(key, {
      ...existing,
      highlights: uniqueHighlights,
      outcomes: uniqueOutcomes,
      pillars: uniquePillars,
      groupedCount: existing.groupedCount + 1,
    });

    return acc;
  },
  new Map(),
);

const groupedServices = Array.from(groupedServicesMap.values());

const serviceCountsByCategory = groupedServices.reduce<
  Record<CategoryKey, number>
>(
  (acc, service) => {
    acc[toCategoryKey(service.category)] += 1;
    return acc;
  },
  { ai: 0, cloud: 0, data: 0 },
);

export default function ServicesPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryKey | null>(
    null,
  );

  const filteredServices = useMemo(() => {
    if (!activeCategory) {
      return [];
    }

    const normalizedQuery = query.trim().toLowerCase();
    const serviceCategory = categoryMeta[activeCategory].serviceCategory;

    return groupedServices
      .filter((service) => {
        if (service.category !== serviceCategory) {
          return false;
        }

        const searchable = [
          service.title,
          service.excerpt,
          service.summary,
          service.highlights.join(" "),
          service.outcomes.join(" "),
        ]
          .join(" ")
          .toLowerCase();

        return (
          normalizedQuery.length === 0 || searchable.includes(normalizedQuery)
        );
      })
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [activeCategory, query]);

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
            Choose one category, then browse
          </h2>
          <p className="text-dcg-slate">
            Start by choosing AI, Cloud, or Data. Then search inside that group
            to find the exact service you need.
          </p>
        </div>

        <div className="space-y-4">
          {!activeCategory ? (
            <div className="space-y-4 max-w-4xl mx-auto self-center flex flex-row items-center">
              <div className="grid gap-4 md:grid-cols-3">
                {categoryKeys.map((category) => (
                  // <button
                  //   key={category}
                  //   type="button"
                  //   onClick={() => setActiveCategory(category)}
                  //   className={`group flex min-h-[24rem] flex-col gap-4 rounded-3xl border bg-gradient-to-b p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${categoryStyle[category].panel}`}
                  // >
                  //   <div className="h-56 w-full overflow-hidden rounded-2xl border border-black/10 bg-slate-950">
                  //     <EvervaultCardWhite
                  //       text={categoryMeta[category].label}
                  //       className="h-full w-full aspect-auto"
                  //     />
                  //   </div>
                  //   <div className="space-y-2 px-1">
                  //     <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  //       Category
                  //     </p>
                  //     <p className="text-sm text-slate-700">
                  //       {categoryMeta[category].description}
                  //     </p>
                  //   </div>
                  // <p className="mt-auto px-1 text-sm font-semibold text-slate-700">
                  //   {serviceCountsByCategory[category]} grouped services
                  // </p>
                  // </button>
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className="relative h-[32rem] rounded-md border border-slate-200 bg-white shadow-sm hover:shadow-lg"
                  >
                    <EvervaultCardWhite
                      text={categoryMeta[category].label}
                      className="h-full w-full rounded-3xl"
                    />
                    <div className="absolute bottom-4 w-full text-slate-700/80">
                      {/* <p className="text-sm  ">
                                        {roleCategoryMeta[category].description}
                                      </p> */}

                      <p className="mx-auto px-1 text-sm font-semibold ">
                        {serviceCountsByCategory[category]} grouped services
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="sticky top-20 z-20 space-y-4 rounded-2xl border border-slate-200 bg-white/90 p-4 backdrop-blur">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm text-slate-600">
                    Selected category:{" "}
                    <span className="font-semibold text-slate-900">
                      {categoryMeta[activeCategory].label}
                    </span>
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCategory(null);
                      setQuery("");
                    }}
                    className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-500 hover:text-slate-900"
                  >
                    Change category
                  </button>
                </div>

                <label className="block">
                  <span className="sr-only">Search services</span>
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder={`Search ${categoryMeta[activeCategory].label} services`}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 shadow-sm outline-none ring-0 transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                  />
                </label>
              </div>

              <div className="flex items-center justify-between px-1">
                <p className="text-sm text-slate-600">
                  Showing{" "}
                  <span className="font-semibold text-slate-900">
                    {filteredServices.length}
                  </span>{" "}
                  of {serviceCountsByCategory[activeCategory]}{" "}
                  {categoryMeta[activeCategory].label.toLowerCase()} services
                </p>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                  Grouped directory
                </p>
              </div>

              {filteredServices.length > 0 ? (
                <BentoGrid className="mx-0 max-w-none md:grid-cols-4 md:auto-rows-[19rem]">
                  {filteredServices.map((service) => {
                    const style =
                      categoryStyle[toCategoryKey(service.category)];

                    return (
                      <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
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
                              </div>
                            </div>
                          }
                          title={
                            <div className="space-y-2">
                              <div className="flex items-start justify-between gap-3">
                                <h3 className="text-lg font-semibold text-slate-900">
                                  {service.title}
                                </h3>
                                <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-slate-700" />
                              </div>
                              <div className="h-px w-full bg-slate-100" />
                            </div>
                          }
                          description={
                            <div className="space-y-3">
                              <p className="text-sm text-slate-600">
                                {service.excerpt}
                              </p>
                              {service.groupedCount > 1 ? (
                                <p className="text-xs font-medium text-slate-500">
                                  Grouped from {service.groupedCount} similar
                                  services.
                                </p>
                              ) : null}
                              <ul className="space-y-1.5">
                                {service.outcomes.slice(0, 2).map((outcome) => (
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
                    No services match those filters. Try another keyword.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
      <ContactCtaSection
        eyebrow="Next step"
        title="Need help selecting the right service mix?"
        description="We can align your priorities, sequencing, and ownership model so your next phase ships with measurable outcomes."
        primaryLabel="Talk to our team"
        primaryHref="/contact"
        secondaryLabel="View projects"
        secondaryHref="/projects"
      />
    </div>
  );
}
