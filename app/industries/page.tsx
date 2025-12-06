"use client";

import IndustriesGrid from "@/components/IndustriesGrid";
import Link from "next/link";

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
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-dcg-sand to-white" />
        <div className="relative dcg-section py-20 md:py-28 space-y-6">
          <p className="text-sm font-semibold text-dcg-lightGreen uppercase tracking-[0.2em]">
            Industries
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-dcg-ink max-w-4xl leading-tight">
            Sector-specific playbooks grounded in data, AI, and cloud execution.
          </h1>
          <p className="text-lg text-dcg-slate max-w-3xl">
            Retail, energy, finance, IT/technology, transportation, and
            aviation—we bring repeatable solutions plus the context that makes
            them work for your teams.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {industryNotes.map((note) => (
              <div
                key={note.title}
                className="dcg-card-compact"
              >
                <h3 className="text-lg font-semibold text-dcg-ink">
                  {note.title}
                </h3>
                <ul className="mt-2 space-y-2 text-sm text-dcg-slate">
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
          <div className="flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="inline-flex items-center rounded-full bg-gradient-to-r from-dcg-lightBlue to-dcg-lightGreen px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl"
            >
              Explore case studies
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full border border-dcg-lightBlue/30 bg-white px-5 py-3 text-sm font-semibold text-dcg-lightBlue shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              Start a conversation
            </Link>
          </div>
        </div>
      </section>

      <IndustriesGrid />
    </div>
  );
}
