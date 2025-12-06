"use client";

import Link from "next/link";

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
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-dcg-sand to-white" />
        <div className="relative dcg-section py-20 md:py-28 space-y-6">
          <p className="text-sm font-semibold text-dcg-lightGreen uppercase tracking-[0.2em]">
            Careers
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-dcg-ink max-w-3xl leading-tight">
            Build the AI-first future with DCG.
          </h1>
          <p className="text-lg text-dcg-slate max-w-3xl">
            We are a consulting team focused on AI, ML, cloud solutions, and
            data platforms. Join us if you want to ship meaningful work, mentor
            clients, and shape how enterprises use data and AI every day.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="mailto:info@dataconsulting-group.com?subject=Careers%20at%20DCG"
              className="dcg-cta"
            >
              Email your resume
            </Link>
          </div>
        </div>
      </section>

      <section className="dcg-section py-16 md:py-20 space-y-8">
        <div className="grid gap-6 md:grid-cols-3">
          {roles.map((role) => (
            <div
              key={role.title}
              className="flex h-full flex-col gap-4 dcg-card"
            >
              <div>
                <p className="text-lg font-semibold text-dcg-ink">
                  {role.title}
                </p>
                <p className="text-sm text-dcg-slate">{role.location}</p>
              </div>
              <ul className="space-y-2 text-sm text-dcg-ink">
                {role.responsibilities.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-dcg-lightGreen" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="mailto:info@dataconsulting-group.com?subject=Role%20application"
                className="mt-auto inline-flex items-center rounded-full border border-dcg-lightBlue/30 bg-white px-4 py-2 text-sm font-semibold text-dcg-lightBlue transition hover:-translate-y-0.5 hover:shadow"
              >
                Apply
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
