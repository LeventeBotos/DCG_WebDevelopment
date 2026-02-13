"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import SubpageHero from "@/components/SubpageHero";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

const roles = [
  {
    title: "ML Engineer",
    location: "London / Remote",
    responsibilities: [
      "Build and productionize ML models and agentic workflows",
      "Collaborate with data engineers on pipelines and feature stores",
      "Partner with clients to translate goals into experiments",
    ],
  },
  {
    title: "Cloud Solutions Engineer",
    location: "London / Remote",
    responsibilities: [
      "Design and implement data platforms across Azure/AWS/GCP",
      "Set up observability, governance, and security controls",
      "Enable teams with templates for rapid delivery",
    ],
  },
  {
    title: "Data & Analytics Consultant",
    location: "London / Remote",
    responsibilities: [
      "Lead discovery and roadmap workshops with executives",
      "Shape KPI frameworks and data storytelling",
      "Guide adoption, training, and change management",
    ],
  },
];

export default function CareersPage() {
  return (
    <div className="flex flex-col min-h-screen">
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

      <section className="dcg-section py-16 md:py-20 space-y-8">
        <div className="max-w-3xl space-y-3">
          <p className="text-sm font-semibold text-dcg-lightGreen uppercase tracking-[0.2em]">
            Open roles
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-dcg-ink">
            Roles built for builders
          </h2>
          <p className="text-dcg-slate">
            Small teams, large impact. You will work directly with clients and
            ship AI-first products that stay in production.
          </p>
        </div>

        <BentoGrid className="mx-0 grid-cols-1 md:auto-rows-[16rem] md:grid-cols-3">
          {roles.map((role, index) => (
            <BentoGridItem
              key={role.title}
              className={`overflow-hidden border border-dcg-lightBlue/20 bg-white/95 shadow-lg ${
                index === 1 ? "md:col-span-2" : ""
              }`}
              title={<span className="text-dcg-ink">{role.title}</span>}
              description={
                <div className="space-y-3 text-sm text-dcg-slate">
                  <p className="font-semibold text-dcg-ink">{role.location}</p>
                  <ul className="space-y-2 text-sm text-dcg-ink">
                    {role.responsibilities.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-dcg-lightGreen" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild variant="secondary" size="sm">
                    <Link href="mailto:info@dataconsulting-group.com?subject=Role%20application">
                      Apply
                    </Link>
                  </Button>
                </div>
              }
              header={
                <div className="flex items-center justify-between rounded-2xl bg-gradient-to-br from-dcg-lightBlue/10 via-white to-dcg-lightGreen/10 p-4">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-dcg-slate">
                    Role {index + 1}
                  </span>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-dcg-ink shadow-sm">
                    Remote-friendly
                  </span>
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
