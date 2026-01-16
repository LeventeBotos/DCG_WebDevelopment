"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { services } from "@/lib/services";
import DCGAIPlatformSection from "@/components/DCGAIPlatformSection";
import SubpageHero from "@/components/SubpageHero";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

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

const categoryCopy: Record<
  "Data" | "AI" | "Cloud Operations",
  { title: string; blurb: string }
> = {
  Data: {
    title: "Data",
    blurb:
      "Architectures, governance, and product thinking that make data reliable, discoverable, and ready for decisioning.",
  },
  AI: {
    title: "AI",
    blurb:
      "From classic ML to agentic systems and RAG—delivered with responsible AI guardrails and MLOps foundations.",
  },
  "Cloud Operations": {
    title: "Cloud Operations",
    blurb:
      "Run cloud and platform estates with reliability, security, and cost discipline—tailored to your preferred stack.",
  },
};

const categories: Array<keyof typeof categoryCopy> = [
  "Data",
  "AI",
  "Cloud Operations",
];

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SubpageHero
        eyebrow="Services"
        title="A clear, outcome-first catalog across data, AI, and cloud."
        emphasis="outcome-first"
        description="We design, build, and operate the platforms and products that keep your business intelligent—covering data foundations, AI use cases, and cloud operations with security and cost control baked in."
        actions={[
          { label: "Talk with us", href: "/contact", variant: "primary" },
          {
            label: "View solutions & projects",
            href: "/projects",
            variant: "secondary",
          },
        ]}
      />

      <section className="dcg-section py-12 md:py-16 space-y-6">
        <div className="max-w-3xl space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-dcg-slate">
            Productized AI
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-dcg-ink">
            Ready-to-deploy solutions
          </h2>
          <p className="text-dcg-slate">
            Pre-built platforms with the data models, guardrails, and launch
            plays to prove value fast. Pick one to see what’s inside.
          </p>
        </div>
        <DCGAIPlatformSection />
      </section>

      <section className="dcg-section py-12 md:py-16 space-y-6">
        <div className="max-w-3xl space-y-3">
          <p className="text-sm font-semibold text-dcg-lightGreen uppercase tracking-[0.2em]">
            Service catalog
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-dcg-ink">
            Explore by capability
          </h2>
          <p className="text-dcg-slate">
            Every service links to a detailed page with focus areas, outcomes,
            and how we work—so teams can quickly find what matches their needs.
          </p>
        </div>

        <div className="space-y-6">
          {categories.map((category) => (
            <div
              key={category}
              className="rounded-3xl border border-dcg-blue/10 bg-white p-6 shadow-md"
            >
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div className="max-w-2xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-dcg-slate">
                    {category}
                  </p>
                  <h3 className="text-2xl font-semibold text-dcg-ink">
                    {categoryCopy[category].title} services
                  </h3>
                  <p className="text-sm text-dcg-slate">
                    {categoryCopy[category].blurb}
                  </p>
                </div>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {services
                  .filter((svc) => svc.category === category)
                  .map((svc) => (
                    <Link
                      key={svc.slug}
                      href={`/services/${svc.slug}`}
                      className="group flex h-full flex-col justify-between rounded-2xl border border-dcg-lightBlue/20 bg-gradient-to-br from-white via-white to-dcg-sand/40 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h4 className="text-lg font-semibold text-dcg-ink">
                            {svc.title}
                          </h4>
                          <p className="mt-1 text-sm text-dcg-slate">
                            {svc.excerpt}
                          </p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-dcg-lightBlue opacity-70 transition group-hover:translate-x-1 group-hover:opacity-100" />
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="dcg-section py-16 md:py-20 space-y-10">
        <div className="max-w-3xl space-y-3">
          <p className="text-sm font-semibold text-dcg-lightGreen uppercase tracking-[0.2em]">
            Engagement approach
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-dcg-ink">
            Outcome-first, transparent, and built to scale.
          </h2>
          <p className="text-dcg-slate">
            We combine deep industry expertise with pragmatic delivery. Each
            engagement is measured, transparent, and designed so your teams can
            operate with confidence after launch.
          </p>
        </div>
        <BentoGrid className="mx-0 grid-cols-1 md:auto-rows-[15rem] md:grid-cols-3">
          {engagement.map((step, index) => (
            <BentoGridItem
              key={step.title}
              className={`overflow-hidden border border-dcg-lightBlue/20 bg-white/90 shadow-lg hover:shadow-xl ${
                index === 0 || index === 3 ? "md:col-span-2" : ""
              }`}
              title={<span className="text-dcg-ink">{step.title}</span>}
              description={
                <span className="text-sm text-dcg-slate">{step.body}</span>
              }
              header={
                <div className="flex items-center justify-between rounded-xl bg-gradient-to-br from-dcg-lightBlue/10 via-white to-dcg-lightGreen/10 p-4">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-dcg-slate">
                    Step {index + 1}
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm">
                    <CheckCircle2 className="h-4 w-4 text-dcg-lightGreen" />
                  </div>
                </div>
              }
              icon={<div className="h-2 w-2 rounded-full bg-dcg-lightBlue" />}
            />
          ))}
        </BentoGrid>
      </section>
    </div>
  );
}
