"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import SubpageHero from "@/components/SubpageHero";
import { Button } from "@/components/ui/button";
import { EvervaultCard } from "@/components/ui/evervault-card";

type RoleCategory = "ai" | "cloud" | "data";

type Role = {
  title: string;
  category: RoleCategory;
  location: string;
  responsibilities: string[];
  emailSubject: string;
};

const roleCategoryMeta: Record<
  RoleCategory,
  { label: string; description: string; panel: string }
> = {
  ai: {
    label: "AI",
    description: "Modeling, LLM products, and intelligent automation roles.",
    panel: "from-emerald-100/80 to-emerald-50/30 border-emerald-200/80",
  },
  cloud: {
    label: "Cloud",
    description:
      "Platform, reliability, security, and infrastructure delivery.",
    panel: "from-violet-100/80 to-violet-50/30 border-violet-200/80",
  },
  data: {
    label: "Data",
    description: "Data strategy, analytics, governance, and enablement work.",
    panel: "from-sky-100/80 to-sky-50/30 border-sky-200/80",
  },
};

const roles: Role[] = [
  {
    title: "ML Engineer",
    category: "ai",
    location: "London / Remote",
    responsibilities: [
      "Build and productionize ML models and agentic workflows",
      "Collaborate with data engineers on pipelines and feature stores",
      "Partner with clients to translate goals into experiments",
    ],
    emailSubject: "ML%20Engineer%20application",
  },
  {
    title: "Cloud Solutions Engineer",
    category: "cloud",
    location: "London / Remote",
    responsibilities: [
      "Design and implement data platforms across Azure/AWS/GCP",
      "Set up observability, governance, and security controls",
      "Enable teams with templates for rapid delivery",
    ],
    emailSubject: "Cloud%20Solutions%20Engineer%20application",
  },
  {
    title: "Data & Analytics Consultant",
    category: "data",
    location: "London / Remote",
    responsibilities: [
      "Lead discovery and roadmap workshops with executives",
      "Shape KPI frameworks and data storytelling",
      "Guide adoption, training, and change management",
    ],
    emailSubject: "Data%20%26%20Analytics%20Consultant%20application",
  },
];

const roleCategories: RoleCategory[] = ["ai", "cloud", "data"];

const roleCountByCategory = roles.reduce<Record<RoleCategory, number>>(
  (acc, role) => {
    acc[role.category] += 1;
    return acc;
  },
  { ai: 0, cloud: 0, data: 0 },
);

function RoleCard({ role, index }: { role: Role; index: number }) {
  return (
    <article className="group h-full rounded-3xl border border-neutral-200 bg-white p-6 shadow-[0_30px_80px_-35px_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-[0_40px_100px_-30px_rgba(0,0,0,0.22)]">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400">
          Role {index + 1}
        </p>
        <h3 className="text-xl font-semibold text-neutral-900">{role.title}</h3>
        <p className="text-sm text-neutral-500">{role.location}</p>
      </div>

      <div className="mt-5 h-px w-full bg-neutral-100" />

      <ul className="mt-5 space-y-3 text-sm text-neutral-700">
        {role.responsibilities.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-neutral-400" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-between">
        <span className="text-xs text-neutral-400">Email intro + CV</span>

        <Button asChild size="sm">
          <Link
            href={`mailto:info@dataconsulting-group.com?subject=${role.emailSubject}`}
          >
            Apply
          </Link>
        </Button>
      </div>
    </article>
  );
}

export default function CareersPage() {
  const [activeCategory, setActiveCategory] = useState<RoleCategory | null>(
    null,
  );

  const filteredRoles = useMemo(() => {
    if (!activeCategory) {
      return [];
    }

    return roles.filter((role) => role.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="flex flex-col bg-white">
      <SubpageHero
        eyebrow="Careers"
        title="Build the AI-first future with DCG."
        emphasis="AI-first"
        description="We are a consulting team focused on AI, ML, cloud solutions, and data platforms. Join us if you want to ship meaningful work, mentor clients, and shape how enterprises use data and AI every day."
        actions={[
          {
            label: "Email your resume",
            href: "mailto:info@dataconsulting-group.com?subject=Careers%20at%20DCG",
            variant: "primary",
          },
        ]}
      />

      <section className="dcg-section space-y-6 py-12 md:py-16">
        <div className="max-w-3xl space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-dcg-lightGreen">
            Open roles
          </p>
          <h2 className="text-3xl font-bold text-dcg-ink md:text-4xl">
            Choose one category, then browse
          </h2>
          <p className="text-dcg-slate">
            Start by choosing AI, Cloud, or Data. Then review the open roles in
            that track.
          </p>
        </div>

        <div className="space-y-4">
          {!activeCategory ? (
            <div className="space-y-4 max-w-4xl mx-auto self-center flex flex-row items-center">
              <div className="grid gap-4 md:grid-cols-3">
                {roleCategories.map((category) => (
                  // <button
                  //   key={category}
                  //   type="button"
                  //   onClick={() => setActiveCategory(category)}
                  //   className={`group flex min-h-[24rem] flex-col gap-4 rounded-3xl border bg-gradient-to-b p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${roleCategoryMeta[category].panel}`}
                  // >
                  //   <div className="h-56 w-full overflow-hidden rounded-2xl border border-black/10 bg-slate-950">
                  //     <EvervaultCard
                  //       text={roleCategoryMeta[category].label}
                  //       className="h-full w-full aspect-auto"
                  //     />
                  //   </div>
                  //   <div className="space-y-2 px-1">
                  //     <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  //       Category
                  //     </p>
                  //     <p className="text-sm text-slate-700">
                  //       {roleCategoryMeta[category].description}
                  //     </p>
                  //   </div>
                  //   <p className="mt-auto px-1 text-sm font-semibold text-slate-700">
                  // {roleCountByCategory[category]} open role
                  // {roleCountByCategory[category] > 1 ? "s" : ""}
                  //   </p>
                  // </button>
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className="h-[36rem] relative bg-black shadow-sm rounded-md hover:shadow-lg"
                  >
                    <EvervaultCard
                      text={roleCategoryMeta[category].label}
                      className="h-full w-full rounded-3xl"
                    />
                    <div className="absolute w-full bottom-4 text-white/75">
                      {/* <p className="text-sm  ">
                                                          {roleCategoryMeta[category].description}
                                                        </p> */}

                      <p className="mx-auto px-1 text-sm font-semibold ">
                        {roleCountByCategory[category]} open role
                        {roleCountByCategory[category] > 1 ? "s" : ""}
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
                      {roleCategoryMeta[activeCategory].label}
                    </span>
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveCategory(null)}
                    className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-500 hover:text-slate-900"
                  >
                    Change category
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between px-1">
                <p className="text-sm text-slate-600">
                  Showing{" "}
                  <span className="font-semibold text-slate-900">
                    {filteredRoles.length}
                  </span>{" "}
                  of {roleCountByCategory[activeCategory]}{" "}
                  {roleCategoryMeta[activeCategory].label.toLowerCase()} roles
                </p>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                  Open positions
                </p>
              </div>

              {filteredRoles.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {filteredRoles.map((role, index) => (
                    <RoleCard key={role.title} role={role} index={index} />
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
                  <p className="text-sm text-slate-600">
                    No open roles found in this category right now.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
