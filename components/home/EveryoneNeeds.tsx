"use client";

import React from "react";
import { Brain } from "lucide-react";
import { Timeline } from "@/components/ui/timeline";

export function AgenticEnterpriseForB2BSalesSection() {
  const data = [
    {
      title: "1",
      content: (
        <div>
          <h3 className="mb-1 text-2xl font-semibold text-dcg-ink">
            Pipeline Orchestration & Forecasting Agent
          </h3>
          <p className="text-xs leading-relaxed text-dcg-slate md:text-sm">
            Translates high-level growth targets into executable workflows,
            coordinating sales, marketing, and success to maintain real-time
            pipeline and forecast accuracy.
          </p>
        </div>
      ),
    },
    {
      title: "2",
      content: (
        <div>
          <h3 className="mb-1 text-2xl font-semibold text-dcg-ink">
            Lead Generation & Qualification Agent
          </h3>
          <p className="text-xs leading-relaxed text-dcg-slate md:text-sm">
            Identifies and prioritizes ideal accounts using first-party,
            third-party and intent signals, ensuring teams focus on
            opportunities with the highest probability to convert.
          </p>
        </div>
      ),
    },
    {
      title: "3",
      content: (
        <div>
          <h3 className="mb-1 text-2xl font-semibold text-dcg-ink">
            Deal Conversion & Pricing Agent
          </h3>
          <p className="text-xs leading-relaxed text-dcg-slate md:text-sm">
            Crafts proposals, aligns pricing with guardrails, coordinates legal
            and finance, and accelerates deal cycles while maintaining margin
            integrity.
          </p>
        </div>
      ),
    },
    {
      title: "4",
      content: (
        <div>
          <h3 className="mb-1 text-2xl font-semibold text-dcg-ink">
            Account Intelligence & Opportunity Mapping Agent
          </h3>
          <p className="text-xs leading-relaxed text-dcg-slate md:text-sm">
            Builds a dynamic map of buying groups, identifies whitespace,
            interprets intent signals, and recommends next best actions,
            narratives, and plays.
          </p>
        </div>
      ),
    },
    {
      title: "5",
      content: (
        <div>
          <h3 className="mb-1 text-2xl font-semibold text-dcg-ink">
            Customer Success & Retention Agent
          </h3>
          <p className="text-xs leading-relaxed text-dcg-slate md:text-sm">
            Monitors product usage and engagement, flags churn risks early, and
            triggers expansion or renewal plays—so teams can focus on strategic
            customer conversations.
          </p>
        </div>
      ),
    },
  ];

  return (
    <section className="relative ">
      {/* -------------------- TOP TEXT -------------------- */}
      <div className="mx-auto max-w-4xl px-4 text-left md:px-6">
        <h2 className="mt-4 text-2xl font-semibold tracking-tight text-dcg-ink md:text-3xl">
          The next evolution of revenue workflows
        </h2>

        <p className="mt-4 text-sm leading-relaxed text-dcg-slate md:text-base">
          Humans and AI are beginning to work as coordinated systems.
          Specialized AI agents now connect across the revenue stack to
          orchestrate workflows, uncover opportunities, and drive customer
          adoption with precision.
        </p>

        <p className="mt-3 text-sm leading-relaxed text-dcg-slate md:text-base">
          By balancing autonomy with human oversight, companies unlock higher
          efficiency and more predictable growth—while keeping relationships at
          the center.
        </p>

        <p className="mt-6 text-xs text-dcg-slate/70 md:text-sm">
          Built in alignment with DCG’s Responsible AI principles and our
          commitment to sustainable, transparent AI adoption.
        </p>
      </div>

      {/* -------------------- TIMELINE FULL WIDTH -------------------- */}
      <div className=" w-full px-2 md:px-4">
        <Timeline data={data} />
      </div>
    </section>
  );
}
