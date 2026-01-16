"use client";

import IndustriesGrid from "@/components/IndustriesGrid";
import SubpageHero from "@/components/SubpageHero";

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
      "Design AI-first workflows and agentic patterns",
      "Operationalize analytics with governance and MLOps",
      "Coach teams on adoption, training, and safety",
      "Link services, projects, and industry playbooks for reuse",
    ],
  },
];

export default function IndustriesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SubpageHero
        eyebrow="Industries"
        title="Sector-specific playbooks grounded in data, AI, and cloud execution."
        emphasis="playbooks"
        description="Retail, energy, finance, IT/technology, transportation, and aviation—we bring repeatable solutions plus the context that makes them work for your teams."
        actions={[
          { label: "Explore case studies", href: "/projects", variant: "primary" },
          { label: "Start a conversation", href: "/contact", variant: "secondary" },
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

      <IndustriesGrid />
    </div>
  );
}
