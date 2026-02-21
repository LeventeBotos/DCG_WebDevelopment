"use client";

import IndustriesGrid from "@/components/IndustriesGrid";
import SubpageHero from "@/components/SubpageHero";
import FinalCTASection from "@/components/FinalCTASection";
import {
  CheckCircle2,
  Lightbulb,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { track } from "@/lib/analytics";

const challenges = [
  "Fragmented data across systems and teams",
  "Pilots that stall before production",
  "Limited AI adoption on the frontline",
  "Architecture debt slowing experimentation",
];

const solutions = [
  "Design AI-first workflows and agentic patterns",
  "Operationalize analytics with governance and MLOps",
  "Coach teams on adoption, training, and safety",
  "Link services, projects, and industry playbooks for reuse",
];

const stats = [
  { value: "6", label: "Industries served" },
  { value: "50+", label: "Engagements delivered" },
  { value: "3x", label: "Faster pilot-to-production" },
  { value: "85%", label: "Adoption rate post-launch" },
];

export default function IndustriesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SubpageHero
        eyebrow="Industries"
        title="Sector-specific playbooks grounded in data, AI, and cloud execution."
        emphasis="playbooks"
        description="Retail, energy, finance, IT/technology, transportation, and aviation — we bring repeatable solutions plus the context that makes them work for your teams."
        actions={[
          {
            label: "Explore case studies",
            href: "/projects",
            variant: "primary",
          },
          {
            label: "Start a conversation",
            href: "/contact",
            variant: "secondary",
          },
        ]}
      />

      {/* Stats bar */}
      <section className="border-y border-dcg-lightBlue/15 bg-dcg-sand/60">
        <div className="dcg-section py-8 md:py-10">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-dcg-ink md:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.15em] text-dcg-slate">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenges & How DCG Helps */}
      <section className="dcg-section py-16 md:py-24">
        <div className="max-w-3xl space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-dcg-lightGreen">
            Where we focus
          </p>
          <h2 className="text-3xl font-bold text-dcg-ink md:text-4xl text-balance">
            From sector constraints to clear AI programs
          </h2>
          <p className="text-dcg-slate">
            We translate industry-specific challenges into actionable, governed
            AI programs so teams can move from pilots to production confidently.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 md:gap-8">
          {/* Challenges card */}
          <div className="rounded-3xl border border-dcg-lightBlue/20 bg-white p-6 shadow-lg md:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-dcg-blue/10">
                <Lightbulb className="h-5 w-5 text-dcg-blue" />
              </div>
              <h3 className="text-lg font-semibold text-dcg-ink">
                Challenges we tackle
              </h3>
            </div>
            <ul className="mt-6 space-y-4">
              {challenges.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-dcg-sand text-[11px] font-bold text-dcg-blue">
                    {i + 1}
                  </span>
                  <span className="text-sm text-dcg-slate leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions card */}
          <div className="rounded-3xl border border-dcg-lightGreen/25 bg-gradient-to-br from-white via-white to-dcg-lightGreen/5 p-6 shadow-lg md:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-dcg-lightGreen/15">
                <CheckCircle2 className="h-5 w-5 text-dcg-lightGreen" />
              </div>
              <h3 className="text-lg font-semibold text-dcg-ink">
                How DCG helps
              </h3>
            </div>
            <ul className="mt-6 space-y-4">
              {solutions.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-dcg-lightGreen" />
                  <span className="text-sm text-dcg-slate leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Inline CTA */}
        <div className="mt-8 flex items-center gap-2">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-dcg-blue transition hover:text-dcg-lightBlue"
            onClick={() =>
              track("cta_click", {
                label: "See all services",
                href: "/services",
                location: "industries_challenges",
              })
            }
          >
            See all services
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>

      {/* Industries Grid */}
      <IndustriesGrid />

      {/* CTA */}
      <div className="py-12 md:py-16">
        <FinalCTASection />
      </div>
    </div>
  );
}
