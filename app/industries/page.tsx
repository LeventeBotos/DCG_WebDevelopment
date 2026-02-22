// app/industries/page.tsx (or wherever your page lives)
"use client";

import IndustriesGrid from "@/components/IndustriesGrid";
import SubpageHero from "@/components/SubpageHero";
import IndustriesScrollRail, {
  IndustryRailItem,
} from "@/components/IndustriesScrollRail";

const industryNotes = [
  {
    title: "Challenges we tackle",
    bullets: [
      "Fragmented data across systems and teams",
      "Pilots that stall before production",
      "Limited AI adoption on the frontline",
      "Architecture debt slowing experimentation",
    ],
  },
  {
    title: "How DCG helps",
    bullets: [
      "Design AI first workflows and agentic patterns",
      "Operationalize analytics with governance and MLOps",
      "Coach teams on adoption, training, and safety",
      "Link services, projects, and industry playbooks for reuse",
    ],
  },
];

const railItems: IndustryRailItem[] = [
  {
    key: "retail",
    title: "Retail",
    tag: "Customer and supply",
    summary:
      "Demand sensing, pricing, personalization, and store operations that stay grounded in real constraints.",
    bullets: [
      "Forecast demand with noisy data",
      "Optimize pricing and promos",
      "Improve availability and fulfillment",
    ],
    href: "/projects?industry=retail",
  },
  {
    key: "energy",
    title: "Energy",
    tag: "Reliability and optimization",
    summary:
      "Predictive maintenance and asset analytics with governance, traceability, and production grade delivery.",
    bullets: [
      "Reduce unplanned downtime",
      "Detect anomalies early",
      "Enable field usable insights",
    ],
    href: "/projects?industry=energy",
  },
  {
    key: "finance",
    title: "Finance",
    tag: "Risk and decisioning",
    summary:
      "Fraud signals, credit decisioning, and compliance aware workflows that ship safely.",
    bullets: [
      "Fraud detection and triage",
      "Explainable decision support",
      "Data lineage and controls",
    ],
    href: "/projects?industry=finance",
  },
  {
    key: "tech",
    title: "IT and technology",
    tag: "Platform and velocity",
    summary:
      "From data platform work to agentic patterns, we help teams move from pilots to production fast.",
    bullets: [
      "Modernize data foundations",
      "MLOps and deployment paths",
      "Enablement and adoption",
    ],
    href: "/projects?industry=technology",
  },
  {
    key: "transport",
    title: "Transportation",
    tag: "Networks and operations",
    summary:
      "Planning, routing, and service reliability using analytics that operators can trust day to day.",
    bullets: [
      "Better routing and capacity",
      "Improve on time performance",
      "Operational dashboards that stick",
    ],
    href: "/projects?industry=transportation",
  },
  {
    key: "aviation",
    title: "Aviation",
    tag: "Turnaround and performance",
    summary:
      "Operational intelligence across turnaround, maintenance, and disruption response.",
    bullets: [
      "Reduce turnaround variance",
      "Predict maintenance events",
      "Improve disruption response",
    ],
    href: "/projects?industry=aviation",
  },
];

export default function IndustriesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SubpageHero
        eyebrow="Industries"
        title="Sector specific playbooks grounded in data, AI, and cloud execution."
        emphasis="playbooks"
        description="Retail, energy, finance, IT and technology, transportation, and aviation. We bring repeatable solutions plus the context that makes them work for your teams."
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

      <section className="dcg-section py-12 md:py-16 space-y-6">
        <div className="max-w-3xl space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-dcg-lightGreen">
            Where we focus
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-dcg-ink">
            Challenges we tackle and how DCG helps
          </h2>
          <p className="text-dcg-slate">
            We translate sector constraints into clear, actionable AI programs
            so teams can move from pilots to production.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {industryNotes.map((note) => (
            <div key={note.title} className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-dcg-lightGreen">
                {note.title}
              </p>
              <ul className="space-y-2 text-sm text-dcg-slate">
                {note.bullets.map((bullet) => (
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

      <IndustriesScrollRail
        items={railItems}
        title="Browse by industry"
        subtitle="Keep scrolling. The rail moves horizontally as you move vertically."
      />
    </div>
  );
}
