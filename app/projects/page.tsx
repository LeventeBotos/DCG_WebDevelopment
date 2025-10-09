"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  Cloud,
  Database,
  LineChart,
  Network,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

const projects = [
  {
    id: "knowledge-graph",
    title: "Knowledge Graph & Digital Twin",
    description:
      "Advanced knowledge graph system combining entity relationships, digital twin visualisation, and intelligent retrieval across complex data estates.",
    industry: "Energy",
    timeline: "16 weeks",
    challenge:
      "Field engineers needed a consolidated view of dispersed asset data, but information sat across 12 legacy systems with inconsistent definitions.",
    solution:
      "Designed a canonical ontology, stitched telemetry with maintenance history, and surfaced context through a navigable digital twin built with operators.",
    outcomes: [
      "Unified 12+ data sources into a searchable graph",
      "Generated 28% faster issue diagnostics",
      "Delivered immersive digital twin for exec reviews",
    ],
    services: ["Data architecture", "Platform engineering", "ML enablement"],
    team: ["Product strategist", "Data engineer", "ML engineer", "UX designer"],
    deliverables: [
      "Knowledge graph schema + governance playbook",
      "Digital twin exploration workspace",
      "Alerting and investigation workflows",
    ],
    technologies: ["Python", "Neo4j", "GraphQL", "Machine Learning"],
    href: "/projects/knowledge-graph",
    image: "/placeholder.svg?height=360&width=600",
    icon: Network,
  },
  {
    id: "cloud-migration",
    title: "Cloud Database Migration",
    description:
      "Zero-downtime migration modernising legacy workloads while boosting scalability, resilience, and security posture.",
    industry: "Financial Services",
    timeline: "10 weeks",
    challenge:
      "The trading desk relied on end-of-life servers that restricted scaling windows and increased operational risk during market volatility.",
    solution:
      "Mapped critical workloads, orchestrated phased replication into a hybrid cloud landing zone, and automated guardrails so teams could deploy confidently.",
    outcomes: [
      "Migrated 48TB with zero downtime",
      "Cut infrastructure costs by 35%",
      "Implemented SOC2-aligned guardrails",
    ],
    services: ["Cloud migration", "DevOps automation", "Security engineering"],
    team: ["Cloud architect", "Site reliability engineer", "Security engineer"],
    deliverables: [
      "Landing zone blueprint",
      "Disaster recovery playbook",
      "Continuous compliance dashboards",
    ],
    technologies: ["AWS", "Azure", "Docker", "Kubernetes"],
    href: "/projects/cloud-migration",
    image: "/placeholder.svg?height=360&width=600",
    icon: Cloud,
  },
  {
    id: "data-analytics",
    title: "Data Mining & Analytics Platform",
    description:
      "Unified analytics hub for IoT, document, and streaming data unlocking real-time insights for operational and strategic teams.",
    industry: "Logistics",
    timeline: "14 weeks",
    challenge:
      "Operations teams spent hours reconciling sensor and ERP reports, delaying routing decisions during peak seasons.",
    solution:
      "Implemented governed ingestion patterns, real-time anomaly detection, and role-based dashboards tailored to planners and analysts.",
    outcomes: [
      "Reduced diagnostic time by 42%",
      "Forecast accuracy improved by 18%",
      "Launched 8 tailored executive dashboards",
    ],
    services: ["Data platform", "Analytics engineering", "AI experimentation"],
    team: ["Engagement lead", "Data engineer", "Analytics engineer", "Product designer"],
    deliverables: [
      "Streaming ingestion pipelines",
      "Executive and operator dashboards",
      "ML-driven anomaly monitors",
    ],
    technologies: ["Apache Kafka", "Elasticsearch", "TensorFlow", "React"],
    href: "/projects/data-analytics",
    image: "/placeholder.svg?height=360&width=600",
    icon: LineChart,
  },
  {
    id: "customer-habits",
    title: "Customer Habits Analysis (PI)",
    description:
      "Privacy-first behavioural intelligence delivering predictive insights with PCI-compliant consent management.",
    industry: "Retail",
    timeline: "12 weeks",
    challenge:
      "Global marketing needed granular insight into buying journeys without breaching stringent privacy regulations across regions.",
    solution:
      "Centralised consent events, layered identity stitching, and built experimentation tooling that respected customer preferences by design.",
    outcomes: [
      "Lifted conversion by 21% across key journeys",
      "Real-time consent vault across 9 markets",
      "Automated campaign experimentation framework",
    ],
    services: ["Customer data platforms", "Machine learning", "Privacy engineering"],
    team: ["Engagement lead", "Privacy engineer", "ML engineer", "Frontend engineer"],
    deliverables: [
      "Consent orchestration service",
      "Audience propensity models",
      "Self-serve experimentation toolkit",
    ],
    technologies: ["Python", "TensorFlow", "PostgreSQL", "Redis"],
    href: "/projects/customer-habits",
    image: "/placeholder.svg?height=360&width=600",
    icon: Brain,
  },
  {
    id: "supply-chain",
    title: "Supply Chain Optimisation",
    description:
      "Data science programme driving demand forecasting, inventory health, and network-wide optimisation.",
    industry: "CPG",
    timeline: "18 weeks",
    challenge:
      "Regional planners lacked a unified forecast, resulting in overstocks in city hubs and empty shelves in emerging markets.",
    solution:
      "Delivered a feature-rich forecasting engine, scenario planner, and store health signals to drive weekly decision ceremonies.",
    outcomes: [
      "Boosted full-price sell-through by 12%",
      "Reduced stock-outs across 600 stores",
      "Enabled weekly scenario planning rituals",
    ],
    services: ["Forecasting", "Applied AI", "Change enablement"],
    team: ["Data scientist", "MLOps engineer", "Change lead"],
    deliverables: [
      "Hierarchical demand models",
      "Scenario planning workspace",
      "Retail health scorecard",
    ],
    technologies: ["scikit-learn", "Pandas", "NumPy", "Gradio"],
    href: "/projects/supply-chain",
    image: "/placeholder.svg?height=360&width=600",
    icon: Target,
  },
  {
    id: "data-modeling",
    title: "Advanced Data Modelling",
    description:
      "Enterprise-wide data modelling capability spanning relational, graph, and streaming architectures with governance built in.",
    industry: "Public Sector",
    timeline: "20 weeks",
    challenge:
      "Multiple departments modelled data differently, slowing service delivery and producing conflicting KPIs for leadership.",
    solution:
      "Stood up a federated data modelling guild, automated quality scoring, and equipped teams with reusable patterns.",
    outcomes: [
      "Standardised 150+ canonical models",
      "Cut report production from days to hours",
      "Embedded data quality scoring in pipelines",
    ],
    services: ["Data governance", "Platform modernisation", "Enablement"],
    team: ["Data architect", "Governance lead", "Enablement coach"],
    deliverables: [
      "Model design system",
      "Quality scoring framework",
      "Enablement curriculum",
    ],
    technologies: ["PostgreSQL", "MongoDB", "Neo4j", "DBT"],
    href: "/projects/data-modeling",
    image: "/placeholder.svg?height=360&width=600",
    icon: Database,
  },
];

export default function ProjectsPage() {
  return (
    <div className="bg-slate-50/40 py-16">
      <div className="container mx-auto flex flex-col gap-12 px-4">
        <motion.div
          className="max-w-3xl space-y-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs uppercase tracking-[0.3em] text-slate-500">
            Project index
          </span>
          <p className="text-lg text-slate-600">
            Every engagement pairs measurable outcomes with the craft of data, AI, and platform delivery. Explore the depth of work behind each case study below.
          </p>
        </motion.div>

        <div className="grid gap-10">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              className="group overflow-hidden rounded-[2.25rem] border border-slate-200/60 bg-white/80 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.35)] backdrop-blur"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
            >
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(min-width: 1024px) 960px, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-slate-900/10 to-transparent" />
                <div className="absolute bottom-5 left-6 flex items-center gap-3 text-white">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                    <project.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
                      {project.industry}
                    </p>
                    <p className="text-base font-semibold">{project.title}</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-10 p-8 md:grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)] md:p-10">
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-slate-500">
                    <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 uppercase tracking-[0.25em]">
                      {project.timeline}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1">
                      <Users className="h-3.5 w-3.5 text-dcg-lightBlue" />
                      {project.team.length} core specialists
                    </span>
                  </div>

                  <p className="text-base leading-relaxed text-slate-600">{project.description}</p>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
                        Challenge
                      </h3>
                      <p className="text-sm leading-relaxed text-slate-600">{project.challenge}</p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
                        Approach
                      </h3>
                      <p className="text-sm leading-relaxed text-slate-600">{project.solution}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
                      Deliverables
                    </h3>
                    <ul className="mt-3 space-y-2 text-sm text-slate-600">
                      {project.deliverables.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-r from-dcg-lightBlue to-dcg-lightGreen" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-8 rounded-3xl border border-slate-200/60 bg-slate-50/70 p-6">
                  <div className="space-y-3">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                      Outcomes
                    </h3>
                    <ul className="space-y-2 text-sm text-slate-600">
                      {project.outcomes.map((outcome) => (
                        <li key={outcome} className="flex gap-2">
                          <Sparkles className="mt-0.5 h-3.5 w-3.5 text-dcg-lightBlue" />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                      Services engaged
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.services.map((service) => (
                        <span
                          key={service}
                          className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                      Team
                    </h3>
                    <ul className="space-y-1.5 text-sm text-slate-600">
                      {project.team.map((member) => (
                        <li key={member} className="flex items-center gap-2">
                          <Users className="h-3.5 w-3.5 text-dcg-lightGreen" />
                          <span>{member}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                      Stack snapshot
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={project.href}
                    className="inline-flex items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-dcg-lightBlue transition-colors duration-200 hover:border-dcg-lightBlue hover:text-dcg-lightGreen"
                  >
                    View full project notes
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
