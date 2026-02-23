"use client";

import Link from "next/link";
import SubpageHero from "@/components/SubpageHero";
import ContactCtaSection from "@/components/ContactCtaSection";

const operatingModel = [
  {
    title: "Discovery and prioritization",
    bullets: [
      "Map business goals to measurable use cases",
      "Audit data, tooling, and process constraints",
      "Define a practical roadmap with owners and milestones",
    ],
  },
  {
    title: "Delivery and enablement",
    bullets: [
      "Ship analytics and AI workflows into daily operations",
      "Set up governance, MLOps, and performance monitoring",
      "Train teams so solutions stay maintainable after launch",
    ],
  },
  {
    title: "Scale and continuous improvement",
    bullets: [
      "Track adoption, quality, and business impact",
      "Expand proven playbooks to adjacent functions",
      "Reduce technical debt while increasing delivery speed",
    ],
  },
];

const industries = [
  {
    key: "retail",
    title: "Retail",
    summary: "Customer, assortment, pricing, and store operations.",
    capabilities: [
      "Demand forecasting and inventory optimization",
      "Promotion and markdown optimization",
      "In-store and omnichannel performance analytics",
    ],
    outcomes: [
      "Lower stockouts and waste",
      "More consistent gross margin performance",
      "Faster response to local demand shifts",
    ],
    href: "/projects?industry=retail",
  },
  {
    key: "energy",
    title: "Energy",
    summary: "Assets, reliability, maintenance, and field operations.",
    capabilities: [
      "Predictive maintenance for critical equipment",
      "Production and downtime forecasting",
      "Anomaly detection for operations and safety",
    ],
    outcomes: [
      "Reduced unplanned outages",
      "Higher asset utilization",
      "Better planning accuracy across operations",
    ],
    href: "/projects?industry=energy",
  },
  {
    key: "finance",
    title: "Finance",
    summary: "Risk, compliance, customer intelligence, and fraud.",
    capabilities: [
      "Fraud detection and transaction monitoring",
      "Credit and risk decision support",
      "Regulatory reporting and lineage controls",
    ],
    outcomes: [
      "Earlier fraud signal detection",
      "More explainable and auditable decisions",
      "Lower compliance reporting effort",
    ],
    href: "/projects?industry=finance",
  },
  {
    key: "tech",
    title: "IT and technology",
    summary: "Platforms, data foundations, and product velocity.",
    capabilities: [
      "Data platform modernization and migration",
      "MLOps and deployment lifecycle design",
      "Cross-team analytics and AI standards",
    ],
    outcomes: [
      "Faster release cycles for data products",
      "Improved reliability in model operations",
      "Clearer ownership and platform governance",
    ],
    href: "/projects?industry=technology",
  },
  {
    key: "transport",
    title: "Transportation",
    summary: "Planning, routing, utilization, and service reliability.",
    capabilities: [
      "Capacity planning and route optimization",
      "Network performance forecasting",
      "Operational decision support dashboards",
    ],
    outcomes: [
      "Higher on-time performance",
      "More efficient network utilization",
      "Improved day-of operational decisions",
    ],
    href: "/projects?industry=transportation",
  },
  {
    key: "aviation",
    title: "Aviation",
    summary: "Turnaround, disruption, revenue, and maintenance planning.",
    capabilities: [
      "Turnaround and ground-ops performance analytics",
      "Disruption prediction and recovery decision support",
      "Revenue and demand intelligence",
    ],
    outcomes: [
      "Reduced turnaround variability",
      "Faster disruption recovery",
      "Better planning across operations and commercial teams",
    ],
    href: "/projects?industry=aviation",
  },
];

export default function IndustriesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SubpageHero
        eyebrow="Industries"
        title="Industry expertise delivered through practical AI and analytics programs."
        emphasis="playbooks"
        description="We work with teams in retail, energy, finance, technology, transportation, and aviation to turn data and AI initiatives into measurable operational outcomes."
        actions={[
          {
            label: "Explore case studies",
            href: "/projects",
            variant: "secondary",
          },
          {
            label: "Start a conversation",
            href: "/contact",
            variant: "primary",
          },
        ]}
      />

      <section className="dcg-section py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[240px_1fr] lg:gap-14">
          <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-dcg-lightBlue">
              Industry index
            </p>
            <ul className="space-y-3 text-sm">
              {industries.map((industry) => (
                <li key={industry.key}>
                  <a
                    href={`#${industry.key}`}
                    className="text-dcg-slate transition-colors hover:text-dcg-ink"
                  >
                    {industry.title}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <div className="space-y-10">
            <div className="max-w-3xl space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-dcg-lightBlue">
                Where we focus
              </p>
              <h2 className="text-3xl font-semibold text-dcg-ink md:text-4xl">
                Built for sector realities, not generic templates.
              </h2>
              <p className="text-dcg-slate md:text-lg">
                Every industry has different constraints. We tailor delivery to
                operational, regulatory, and technology conditions while keeping
                execution fast and measurable.
              </p>
            </div>

            <div className="border-y border-dcg-lightBlue/20">
              {industries.map((industry) => (
                <article
                  id={industry.key}
                  key={industry.key}
                  className="scroll-mt-28 border-b border-dcg-lightBlue/20 py-8 last:border-b-0 md:py-10"
                >
                  <div className="grid gap-6 md:grid-cols-[1fr_2fr] md:gap-10">
                    <div className="space-y-3">
                      <h3 className="text-2xl font-semibold text-dcg-ink">
                        {industry.title}
                      </h3>
                      <p className="text-sm text-dcg-slate">{industry.summary}</p>
                      <Link
                        href={industry.href}
                        className="inline-flex text-sm font-semibold text-dcg-blue hover:text-dcg-lightBlue"
                      >
                        View related projects
                      </Link>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-dcg-lightBlue">
                          Core capabilities
                        </p>
                        <ul className="space-y-2 text-sm text-dcg-slate">
                          {industry.capabilities.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-dcg-lightBlue">
                          Typical outcomes
                        </p>
                        <ul className="space-y-2 text-sm text-dcg-slate">
                          {industry.outcomes.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="dcg-section pb-16 md:pb-20">
        <div className="space-y-8">
          <div className="max-w-3xl space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-dcg-lightBlue">
              How we engage
            </p>
            <h2 className="text-3xl font-semibold text-dcg-ink md:text-4xl">
              A delivery model built for production outcomes.
            </h2>
          </div>

          <div className="border-y border-dcg-lightBlue/20">
            {operatingModel.map((stage, index) => (
              <div
                key={stage.title}
                className="grid gap-4 border-b border-dcg-lightBlue/20 py-6 last:border-b-0 md:grid-cols-[220px_1fr]"
              >
                <p className="text-sm font-semibold text-dcg-ink">
                  {String(index + 1).padStart(2, "0")} {stage.title}
                </p>
                <ul className="space-y-2 text-sm text-dcg-slate">
                  {stage.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </section>
      <ContactCtaSection
        eyebrow="Next step"
        title="Need an industry-specific delivery plan?"
        description="We can help you prioritize high-impact use cases and sequence execution around your operational constraints."
        primaryLabel="Talk to our team"
        primaryHref="/contact"
        secondaryLabel="Review services"
        secondaryHref="/services"
      />
    </div>
  );
}
