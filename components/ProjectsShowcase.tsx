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
    <section className="container px-4 md:px-6 py-16 md:py-20 space-y-8">
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

      <div className="grid gap-6 md:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.title}
            className="flex h-full flex-col gap-4 rounded-3xl border border-dcg-blue/10 bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
          >
            <h3 className="text-lg font-semibold text-dcg-ink">
              {project.title}
            </h3>
            <div className="space-y-2 text-sm text-dcg-slate">
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
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        <a
          href="/projects"
          className="inline-flex items-center rounded-full bg-gradient-to-r from-dcg-blue to-dcg-lightBlue px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl"
        >
          Go to Our Projects
        </a>
        <a
          href="/insights"
          className="inline-flex items-center rounded-full border border-dcg-blue/20 bg-white px-5 py-3 text-sm font-semibold text-dcg-blue shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          Explore the Insights Library
        </a>
      </div>
    </section>
  );
}
