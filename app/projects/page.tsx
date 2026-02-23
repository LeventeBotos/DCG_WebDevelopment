import Link from "next/link";
import { Button } from "@/components/ui/button";
import SubpageHero from "@/components/SubpageHero";
import ContactCtaSection from "@/components/ContactCtaSection";

type Project = {
  id: string;
  title: string;
  sector: string;
  summary: string;
  challenge: string;
  approach: string;
  impact: string[];
  deliverables: string[];
  technologies: string[];
  rollout: string[];
  metrics: { label: string; value: string }[];
  detailsHref?: string;
  detailsLabel?: string;
};

const projects: Project[] = [
  {
    id: "retail-ai",
    title: "Retail AI: Demand Forecasting & Dynamic Pricing",
    sector: "Consumer Retail",
    summary:
      "A production-ready pricing and demand engine for fresh goods, designed to cut waste while preserving margin and sell-through.",
    challenge:
      "Store teams were balancing short shelf life products with volatile demand, while planning decisions were still based on fragmented spreadsheets and delayed reporting.",
    approach:
      "We built context-aware forecasting models, near-expiry pricing automation, and store-level replenishment guidance with event and demographic signals in the loop.",
    impact: [
      "Lowered avoidable waste on perishable inventory.",
      "Improved promotion timing and markdown effectiveness.",
      "Raised confidence in import and replenishment planning.",
    ],
    deliverables: [
      "Demand and markdown optimization models",
      "Store segmentation and local event signal pipelines",
      "Ops dashboard for planners, category teams, and buyers",
    ],
    technologies: [
      "Time-series forecasting",
      "Price optimization",
      "Data pipelines",
      "MLOps",
    ],
    rollout: [
      "Pilot in selected high-variance stores",
      "Calibrated pricing guardrails with category leaders",
      "Expanded by region after KPI stabilization",
    ],
    metrics: [
      { label: "Pilot duration", value: "10 weeks" },
      { label: "Planning cadence", value: "Daily" },
      { label: "Decision latency", value: "< 4 hrs" },
    ],
  },
  {
    id: "knowledge-graph-digital-twins",
    title: "Knowledge Graphs & Digital Twins",
    sector: "Industrial Operations",
    summary:
      "A graph-native operational model that unifies assets, events, and relationships, enabling richer diagnostics and AI-ready context retrieval.",
    challenge:
      "Operational knowledge lived across disconnected systems, making root-cause analysis slow and reducing confidence in predictive maintenance decisions.",
    approach:
      "We designed entity-relationship ontologies, linked cross-system semantics, and exposed digital twin views with graph-backed context for RAG workflows.",
    impact: [
      "Created one connected operational source of truth.",
      "Reduced investigation time for complex incidents.",
      "Enabled reusable context for future agent workflows.",
    ],
    deliverables: [
      "Domain ontology and entity mapping framework",
      "Knowledge graph ingestion and governance layer",
      "Digital twin views for operational monitoring",
    ],
    technologies: [
      "Knowledge graphs",
      "Semantic search",
      "RAG architecture",
      "Digital twins",
    ],
    rollout: [
      "Modeled priority assets and dependencies",
      "Connected telemetry and maintenance records",
      "Launched graph APIs for ops and AI teams",
    ],
    metrics: [
      { label: "Entities modeled", value: "10M+" },
      { label: "Relations mapped", value: "50M+" },
      { label: "Query response", value: "< 100 ms" },
    ],
    detailsHref: "/projects/knowledge-graph",
    detailsLabel: "View technical deep dive",
  },
  {
    id: "cloud-data-platform",
    title: "Cloud Migration & Data Platform Modernization",
    sector: "Enterprise Platform",
    summary:
      "A secure cloud data foundation that replaced a brittle legacy estate and accelerated analytics and AI product delivery.",
    challenge:
      "Legacy systems were creating delays in data availability, inconsistent governance, and high friction between engineering and business analytics teams.",
    approach:
      "We delivered a modern lakehouse architecture, real-time ingestion, and governed access layers designed for both BI and AI workloads.",
    impact: [
      "Accelerated experimentation across product and analytics teams.",
      "Improved governance and observability across environments.",
      "Enabled scalable pathways from dashboards to AI use cases.",
    ],
    deliverables: [
      "Cloud-native lakehouse and ingestion framework",
      "Role-based data access and governance model",
      "Monitoring, lineage, and cost-optimization controls",
    ],
    technologies: [
      "Cloud data platforms",
      "Streaming ingestion",
      "Data governance",
      "Observability",
    ],
    rollout: [
      "Migrated critical domains and reporting dependencies",
      "Introduced quality checks and lineage traceability",
      "Scaled usage to regional teams and product squads",
    ],
    metrics: [
      { label: "Core domains migrated", value: "18" },
      { label: "Pipeline reliability", value: "99.9%" },
      { label: "Release cycle", value: "2x faster" },
    ],
  },
  {
    id: "smart-manufacturing",
    title: "Smart Manufacturing: Predictive Maintenance & Yield Optimization",
    sector: "Manufacturing",
    summary:
      "A plant-scale optimization program combining machine telemetry, quality signals, and AI recommendations to reduce downtime and stabilize throughput.",
    challenge:
      "Production teams were facing unplanned line stoppages, variable product quality, and fragmented visibility across maintenance, process, and quality systems.",
    approach:
      "We unified sensor and MES data, deployed failure-risk and yield models, and introduced operator-facing guidance for maintenance windows and process parameter tuning.",
    impact: [
      "Reduced unplanned downtime on critical production lines.",
      "Improved first-pass yield and scrap visibility by shift.",
      "Enabled faster, data-backed maintenance planning decisions.",
    ],
    deliverables: [
      "Unified manufacturing data model across OT and IT systems",
      "Predictive maintenance and yield optimization model suite",
      "Plant operations cockpit for engineering and maintenance teams",
    ],
    technologies: [
      "Industrial IoT",
      "Predictive maintenance",
      "Computer vision QA",
      "MLOps",
    ],
    rollout: [
      "Prioritized bottleneck assets and failure modes",
      "Validated model guidance with plant and reliability engineers",
      "Scaled deployment to additional lines after KPI lift",
    ],
    metrics: [
      { label: "Lines covered", value: "12" },
      { label: "Downtime reduction", value: "22%" },
      { label: "First-pass yield gain", value: "+8.5%" },
    ],
  },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-white">
      <SubpageHero
        eyebrow="Solutions & Projects"
        title="Delivery-focused project case studies"
        emphasis="Delivery-focused"
        description="Each program combines strategy, implementation, and adoption to
            deliver measurable value. The case studies below show the challenge,
            execution pattern, and business outcomes."
        actions={[
          {
            label: "Start a project",
            href: "/contact",
            variant: "primary",
          },
          {
            label: "View services",
            href: "/services",
            variant: "secondary",
          },
        ]}
      />

      <section className="dcg-section pb-20 pt-2">
        <div className="divide-y divide-slate-200 border-t border-slate-200">
          {projects.map((project, index) => (
            <article
              key={project.id}
              id={project.id}
              className="py-12 md:py-16"
            >
              <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
                <div className="space-y-7">
                  <header className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-dcg-slate">
                      Case study {String(index + 1).padStart(2, "0")} ·{" "}
                      {project.sector}
                    </p>
                    <h2 className="text-3xl font-semibold leading-tight text-dcg-ink md:text-4xl">
                      {project.title}
                    </h2>
                    <p className="max-w-3xl text-base leading-8 text-dcg-slate">
                      {project.summary}
                    </p>
                  </header>

                  <section className="space-y-4">
                    <h3 className="text-base font-semibold text-dcg-ink">
                      Business context
                    </h3>
                    <p className="text-sm leading-7 text-dcg-slate">
                      <span className="font-semibold text-dcg-ink">
                        Challenge.
                      </span>{" "}
                      {project.challenge}
                    </p>
                    <p className="text-sm leading-7 text-dcg-slate">
                      <span className="font-semibold text-dcg-ink">
                        Approach.
                      </span>{" "}
                      {project.approach}
                    </p>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-base font-semibold text-dcg-ink">
                      Scope delivered
                    </h3>
                    <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-dcg-slate">
                      {project.deliverables.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </section>

                  <div className="flex flex-wrap gap-3 pt-1">
                    <Button asChild variant="primary" size="lg">
                      <Link href="/contact">Discuss a similar project</Link>
                    </Button>
                    {project.detailsHref ? (
                      <Button asChild variant="secondary" size="lg">
                        <Link href={project.detailsHref}>
                          {project.detailsLabel ?? "View project details"}
                        </Link>
                      </Button>
                    ) : null}
                  </div>
                </div>

                <aside className="rounded-xl border border-slate-200 bg-slate-50/70 p-6 md:p-7">
                  <div>
                    <h3 className="text-base font-semibold text-dcg-ink">
                      Outcome snapshot
                    </h3>
                    <dl className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                      {project.metrics.map((metric) => (
                        <div
                          key={metric.label}
                          className="rounded-lg border border-slate-200 bg-white p-4"
                        >
                          <dt className="text-xs uppercase tracking-[0.1em] text-dcg-slate">
                            {metric.label}
                          </dt>
                          <dd className="mt-1 text-xl font-semibold text-dcg-ink">
                            {metric.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  <div className="mt-7">
                    <h4 className="text-sm font-semibold text-dcg-ink">
                      Business impact
                    </h4>
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-dcg-slate">
                      {project.impact.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-7">
                    <h4 className="text-sm font-semibold text-dcg-ink">
                      Rollout
                    </h4>
                    <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-7 text-dcg-slate">
                      {project.rollout.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ol>
                  </div>

                  <div className="mt-7">
                    <h4 className="text-sm font-semibold text-dcg-ink">
                      Technology stack
                    </h4>
                    <p className="mt-3 text-sm leading-7 text-dcg-slate">
                      {project.technologies.join(" · ")}
                    </p>
                  </div>
                </aside>
              </div>
            </article>
          ))}
        </div>
      </section>

      <ContactCtaSection
        eyebrow="Next step"
        title="Planning a transformation program?"
        description="We build practical, production-ready data and AI programs with clear milestones and operating ownership."
        primaryLabel="Talk to our team"
        primaryHref="/contact"
        secondaryLabel="Explore services"
        secondaryHref="/services"
      />
    </div>
  );
}
