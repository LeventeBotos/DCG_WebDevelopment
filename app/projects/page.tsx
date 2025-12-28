"use client";

import ProjectsShowcase from "@/components/ProjectsShowcase";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const callouts = [
  "Agentic AI interfaces embedded into workflows, not just dashboards.",
  "Graph-based knowledge layers that keep data connected for every decision.",
  "Cloud, lakehouse, and streaming foundations that scale experimentation.",
];

export default function ProjectsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-dcg-sand to-white" />
        <div className="relative dcg-section py-20 md:py-28 space-y-6">
          <p className="text-sm font-semibold text-dcg-lightGreen uppercase tracking-[0.2em]">
            Solutions &amp; Projects
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-dcg-ink max-w-4xl leading-tight">
            From digital twins to retail AI, we build programs that deliver
            measurable value.
          </h1>
          <p className="text-lg text-dcg-slate max-w-3xl">
            Explore featured case studies and solution patterns. Each combines
            strategy, implementation, and adoption support to ensure AI and data
            deliver business outcomes.
          </p>
          <div className="flex flex-wrap gap-2 text-sm text-dcg-ink">
            {callouts.map((item) => (
              <span
                key={item}
                className="rounded-full bg-white px-4 py-2 shadow-sm"
              >
                {item}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="primary" size="lg">
              <Link href="/contact">Start a project</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/services">View services</Link>
            </Button>
          </div>
        </div>
      </section>

      <ProjectsShowcase />
    </div>
  );
}
