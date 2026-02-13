import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

const projects = [
  {
    title: "Retail AI – Demand Forecasting & Dynamic Pricing",
    challenge:
      "UK retail importer needed to reduce waste and improve margins on fresh goods across varied store contexts.",
    approach:
      "Context-aware demand forecasting, dynamic pricing near expiration, and inventory optimization tuned to events and demographics.",
    outcome:
      "Reduced waste while protecting revenue, with clearer signals for import quantities and store-level promotions.",
  },
  {
    title: "Knowledge Graphs & Digital Twins",
    challenge:
      "Disparate operational data lacked a unified model to support predictive maintenance and decisioning.",
    approach:
      "Built entity-relationship models, semantic linking, and 3D digital twins with RAG-ready knowledge graphs.",
    outcome:
      "Single source of truth for operations, faster insights, and reusable graph assets for future AI agents.",
  },
  {
    title: "Cloud Migration & Data Platforms",
    challenge:
      "Legacy data estate slowed analytics and experimentation across teams and geographies.",
    approach:
      "Modern lakehouse architecture on cloud, streaming ingestion for IoT and documents, plus governed access layers.",
    outcome:
      "Scalable, secure data platform powering analytics, AI, and dashboards with shorter cycle times.",
  },
];

export default function ProjectsShowcase() {
  return (
    <section className="container space-y-10 px-4 py-16 md:px-6 md:py-20">
      <div className="flex flex-col gap-3">
        <p className="text-sm font-semibold text-dcg-darkGreen uppercase tracking-[0.2em]">
          Featured Projects
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-dcg-ink">
          From pilots to production outcomes.
        </h2>
        <p className="text-dcg-slate max-w-3xl">
          A sample of the agentic, cloud, and data programs we deliver with
          measurable results.
        </p>
      </div>

      <BentoGrid className="mx-0 grid-cols-1 gap-6 md:auto-rows-[20rem] md:grid-cols-3">
        {projects.map((project, index) => (
          <BentoGridItem
            key={project.title}
            className={`overflow-hidden border border-dcg-blue/10 bg-white/95 p-6 shadow-lg transition-shadow hover:shadow-xl ${
              index === 0 ? "md:col-span-2" : ""
            }`}
            title={<span className="text-dcg-ink">{project.title}</span>}
            description={
              <div className="space-y-3 text-sm leading-6 text-dcg-slate">
                <p>
                  <span className="font-semibold text-dcg-ink">Challenge:</span>{" "}
                  {project.challenge}
                </p>
                <p>
                  <span className="font-semibold text-dcg-ink">Approach:</span>{" "}
                  {project.approach}
                </p>
                <p>
                  <span className="font-semibold text-dcg-ink">Outcome:</span>{" "}
                  {project.outcome}
                </p>
              </div>
            }
            header={
              <div className="flex items-center justify-between rounded-2xl bg-gradient-to-br from-dcg-lightBlue/10 via-white to-dcg-lightGreen/10 p-5">
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-dcg-slate">
                  Case study
                </span>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-dcg-ink shadow-sm">
                  {index + 1} / {projects.length}
                </span>
              </div>
            }
            icon={<div className="h-2 w-2 rounded-full bg-dcg-lightGreen" />}
          />
        ))}
      </BentoGrid>
      <div className="flex flex-wrap gap-3">
        <Button asChild variant="primary" size="lg">
          <Link href="/projects">Go to Our Projects</Link>
        </Button>
        {/* <a
          href="/insights"
          className="inline-flex items-center rounded-full border border-dcg-blue/20 bg-white px-5 py-3 text-sm font-semibold text-dcg-blue shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          Explore the Insights Library
        </a> */}
      </div>
    </section>
  );
}
