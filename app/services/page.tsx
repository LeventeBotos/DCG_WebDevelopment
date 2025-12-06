"use client";

import ServicesGrid from "@/components/ServicesGrid";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

const engagement = [
  {
    title: "Discover",
    body: "Frame the ambition, align on measurable outcomes, and surface the data and process realities.",
  },
  {
    title: "Design",
    body: "Blueprint AI, data, and cloud architectures with security, governance, and adoption plans baked in.",
  },
  {
    title: "Deliver",
    body: "Ship pilots quickly, then harden with MLOps, observability, and transparent change management.",
  },
  {
    title: "Scale",
    body: "Embed agentic workflows, dashboards, and training to keep value growing after launch.",
  },
];

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-dcg-sand to-white" />
        <div className="relative container px-4 md:px-6 py-20 md:py-28 space-y-6">
          <p className="text-sm font-semibold text-dcg-lightGreen uppercase tracking-[0.2em]">
            Services
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-dcg-ink max-w-3xl leading-tight">
            Data Consulting Group specializes in AI, machine learning, and
            data-driven transformation.
          </h1>
          <p className="text-lg text-dcg-slate max-w-3xl">
            We help leading enterprises—including BP, British Airways, Shell,
            and Infosys—deliver scalable AI solutions across retail, energy,
            finance, IT, transportation, aviation, and oil &amp; gas. Mission:
            empower organizations with intelligent data systems that improve
            decision-making, reduce inefficiencies, and unlock new opportunities.
          </p>
          <p className="text-sm text-dcg-ink max-w-4xl">
            The future is already here—a paradigm powered by technology, data,
            and innovation. We focus on outcomes that make a difference, pairing
            transformative strategy with pragmatic delivery. With deep sector
            expertise, AI-powered technology, and an investor mindset, we work
            alongside founders, CEOs, boards, and directors every step of the
            way to shape the future with confidence.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full bg-gradient-to-r from-dcg-lightBlue to-dcg-lightGreen px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl"
            >
              Talk with us
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center rounded-full border border-dcg-lightBlue/30 bg-white px-5 py-3 text-sm font-semibold text-dcg-lightBlue shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              View solutions &amp; projects
            </Link>
          </div>
        </div>
      </section>

      <ServicesGrid />

      <section className="container px-4 md:px-6 py-16 md:py-20 space-y-10">
        <div className="max-w-3xl space-y-3">
          <p className="text-sm font-semibold text-dcg-lightGreen uppercase tracking-[0.2em]">
            Engagement approach
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-dcg-ink">
            Outcome-first, transparent, and built to scale.
          </h2>
          <p className="text-dcg-slate">
            We combine deep industry expertise with forward-looking perspectives
            on sector convergence and future opportunities. Practical solutions
            that yield measurable and sustainable results—delivered with speed
            and certainty.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {engagement.map((step) => (
            <div
              key={step.title}
              className="rounded-3xl border border-dcg-lightBlue/20 bg-white p-5 shadow-md"
            >
              <div className="flex items-center gap-2 text-dcg-lightBlue font-semibold">
                <CheckCircle2 className="h-4 w-4 text-dcg-lightGreen" />
                {step.title}
              </div>
              <p className="mt-2 text-sm text-dcg-slate">{step.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
