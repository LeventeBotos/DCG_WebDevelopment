import { Building2, Plane, ShoppingBag, Train, Workflow, Factory } from "lucide-react";

const industries = [
  {
    title: "Retail",
    icon: ShoppingBag,
    summary: "Demand forecasting, dynamic pricing, and waste reduction tuned to every store.",
    bullets: [
      "Demand forecasting and inventory optimization",
      "Dynamic pricing near expiration to minimize waste",
      "Context-aware models by location, events, and demographics",
    ],
  },
  {
    title: "Energy & Oil and Gas",
    icon: Factory,
    summary: "Predictive maintenance, production forecasting, and digital twins for critical assets.",
    bullets: [
      "Production forecasting across complex upstream/downstream operations",
      "Predictive maintenance for equipment fleets",
      "Digital twins for operations, monitoring, and forecasting",
    ],
  },
  {
    title: "Finance",
    icon: Building2,
    summary: "Fraud detection, risk models, and compliance systems that keep pace with regulation.",
    bullets: [
      "Risk scoring and compliance automation",
      "Fraud detection and transaction monitoring",
      "Customer insights with secure, anonymized data pipelines",
    ],
  },
  {
    title: "IT / Technology",
    icon: Workflow,
    summary: "Scalable architectures, data migration, and MLOps to accelerate product teams.",
    bullets: [
      "Data migration and platform modernization",
      "MLOps platforms for faster experiments and safer releases",
      "Secure, composable architectures for growth",
    ],
  },
  {
    title: "Transportation",
    icon: Train,
    summary: "Passenger analytics and operational optimization for rail and logistics.",
    bullets: [
      "Passenger demand modeling and station analytics",
      "Railway queue optimization and routing",
      "Operational dashboards for day-of adjustments",
    ],
  },
  {
    title: "Aviation",
    icon: Plane,
    summary: "Pricing, revenue management, and customer analytics for airlines and airports.",
    bullets: [
      "Dynamic pricing and revenue management",
      "Customer analytics for loyalty and service design",
      "Forecasting and operational decision support",
    ],
  },
];

export default function IndustriesGrid() {
  return (
    <section className="container px-4 md:px-6 py-16 md:py-20 space-y-10">
      <div className="max-w-3xl space-y-3">
        <p className="text-sm font-semibold text-dcg-darkGreen uppercase tracking-[0.2em]">
          Industries we serve
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-dcg-ink">
          Sector depth with AI-first execution.
        </h2>
        <p className="text-dcg-slate">
          From retail and energy to aviation and finance, DCG translates data
          and AI into operational impact. Each industry card links to deeper
          playbooks and examples.
        </p>
      </div>

      <div className="space-y-8 divide-y divide-dcg-lightBlue/10">
        {industries.map((industry) => (
          <div
            key={industry.title}
            className="pt-8 first:pt-0 md:grid md:grid-cols-[1.2fr_1.8fr] md:items-start md:gap-10"
          >
            <div className="flex items-start gap-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-dcg-blue/10 text-dcg-blue">
                <industry.icon className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-dcg-ink">
                  {industry.title}
                </h3>
                <p className="text-sm text-dcg-slate">{industry.summary}</p>
              </div>
            </div>
            <ul className="mt-4 grid gap-3 text-sm text-dcg-ink md:mt-0 md:grid-cols-2">
              {industry.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-dcg-lightBlue" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
