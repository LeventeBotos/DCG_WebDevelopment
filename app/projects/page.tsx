"use client";

import ProjectsShowcase from "@/components/ProjectsShowcase";
import SubpageHero from "@/components/SubpageHero";

export default function ProjectsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SubpageHero
        eyebrow="Solutions & Projects"
        title="From digital twins to retail AI, we build programs that deliver measurable value."
        emphasis="measurable value"
        description="Explore featured case studies and solution patterns. Each combines strategy, implementation, and adoption support to ensure AI and data deliver business outcomes."
        actions={[
          { label: "Start a project", href: "/contact", variant: "primary" },
          { label: "View services", href: "/services", variant: "secondary" },
        ]}
      />

      <ProjectsShowcase />
    </div>
  );
}
