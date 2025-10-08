"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  CalendarCheck,
  Cloud,
  Database,
  Layers,
  Lightbulb,
  LineChart,
  Network,
  Shield,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

import SectionTitle from "@/components/SectionTitle";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { InfiniteMovingCards } from "@/components/InfiniteScrollingCards";

const projects = [
  {
    id: "knowledge-graph",
    title: "Knowledge Graph & Digital Twin",
    description:
      "Advanced knowledge graph system with entity relationships, digital twin visualisation, and intelligent retrieval across complex data estates.",
    features: [
      "Entity-relationship orchestration",
      "Graph-powered discovery",
      "LLMOps & RAG pipelines",
      "Digital twin integration",
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
      "Zero-downtime migration programme that modernised legacy workloads while boosting scalability, resilience, and security posture.",
    features: [
      "Automated migration playbooks",
      "Performance benchmarking",
      "Cloud-native replatforming",
      "Security and compliance guardrails",
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
      "Unified analytics hub for IoT, document, and streaming data that unlocks real-time insights for operational and strategic teams.",
    features: [
      "Real-time streaming ingestion",
      "Predictive analytics models",
      "Executive-ready dashboards",
      "Automated governance controls",
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
      "Privacy-first behavioural intelligence solution delivering predictive insights with PCI-compliant consent management.",
    features: [
      "Deep learning propensity scoring",
      "PII tokenisation pipeline",
      "360° behaviour dashboards",
      "Consent & governance auditing",
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
      "Data science programme for global retailers that drives demand forecasting, inventory health, and network-wide optimisation.",
    features: [
      "Demand & pricing optimisation",
      "Scenario planning sandbox",
      "Inventory risk mitigation",
      "Revenue impact modelling",
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
      "Enterprise-wide data modelling capability covering relational, graph, and streaming architectures with governance baked in.",
    features: [
      "Unified data blueprints",
      "Performance & cost tuning",
      "Compliance accelerators",
      "Hybrid storage strategies",
    ],
    technologies: ["PostgreSQL", "MongoDB", "Neo4j", "DBT"],
    href: "/projects/data-modeling",
    image: "/placeholder.svg?height=360&width=600",
    icon: Database,
  },
];

const deliveryPillars = [
  {
    title: "Strategy to Launch",
    description:
      "We partner from discovery workshops through production go-live, aligning business outcomes and technical delivery every step of the way.",
    icon: Sparkles,
    highlights: ["Innovation roadmapping", "Rapid proof-of-value", "Executive alignment"],
  },
  {
    title: "Security & Trust",
    description:
      "Regulated industries rely on our secure-by-design frameworks, compliance accelerators, and 24/7 monitoring capabilities.",
    icon: Shield,
    highlights: ["PCI & GDPR compliant", "Secure MLOps guardrails", "Continuous monitoring"],
  },
  {
    title: "Adoption & Enablement",
    description:
      "Change management, training, and co-creation sessions ensure teams are empowered to sustain momentum after launch.",
    icon: Users,
    highlights: ["Playbooks & documentation", "Centre of excellence setup", "Capability uplift"],
  },
];

const deliveryProcess = [
  {
    title: "Discover",
    description: "Stakeholder workshops, data audits, and value-mapping to prioritise the strongest opportunities.",
    icon: Lightbulb,
  },
  {
    title: "Design",
    description: "Architect best-fit solutions, validate data foundations, and prototype the experience quickly.",
    icon: Layers,
  },
  {
    title: "Deliver",
    description: "Iterative sprints, production-ready pipelines, and measurable impact tracked from day one.",
    icon: CalendarCheck,
  },
];

const testimonials = [
  {
    quote:
      "Their engineering team moved from concept to production faster than any partner we've worked with, while keeping stakeholders engaged throughout.",
    name: "Priya Nair",
    title: "Director of Data",
    designation: "Global Retail Group",
    src: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    quote:
      "The migration playbooks and governance frameworks meant zero downtime and complete confidence in our new cloud platform.",
    name: "James Walker",
    title: "CTO",
    designation: "Fintech Scale-Up",
    src: "https://images.unsplash.com/photo-1622675253498-51b230fd0de5?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    quote:
      "Workshops were incredibly collaborative, and the resulting models now underpin our global supply chain decisions.",
    name: "Elena Rossi",
    title: "VP Supply Chain",
    designation: "International Retailer",
    src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    quote:
      "The team embedded with our analysts, leaving behind automation and dashboards that our teams use every day.",
    name: "Ahmed Khan",
    title: "Head of Analytics",
    designation: "Energy & Utilities",
    src: "https://images.unsplash.com/photo-1616680214084-22670de1bc35?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
];

export default function ProjectsPage() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      <section className="relative min-h-[70vh] overflow-hidden rounded-b-[3rem] bg-slate-950 text-white">
        <BackgroundGradientAnimation
          containerClassName="h-full"
          className="relative flex h-full items-center"
        >
          <div className="container mx-auto flex flex-col gap-12 px-4 py-32">
            <motion.span
              className="inline-flex w-fit items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.25em] text-white/70 backdrop-blur"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Proven delivery across industries
            </motion.span>

            <motion.div
              className="max-w-4xl space-y-6"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="text-4xl font-bold leading-tight md:text-6xl">
                Projects that turn complex data into
                <span className="block bg-gradient-to-r from-dcg-lightBlue to-dcg-lightGreen bg-clip-text text-transparent">
                  measurable impact
                </span>
              </h1>
              <p className="max-w-2xl text-base text-white/80 md:text-lg">
                Explore how our AI, data science, and engineering teams deliver end-to-end programmes—from discovery and strategy to secure production deployments and enablement.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-dcg-lightBlue to-dcg-lightGreen px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-dcg-lightBlue/30 transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl"
              >
                Start a project
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white/80 transition-colors duration-200 hover:border-white hover:text-white"
              >
                View all services
              </Link>
            </motion.div>

            <motion.div
              className="grid gap-6 md:grid-cols-3"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {[
                {
                  label: "Projects delivered",
                  value: "120+",
                  icon: Target,
                },
                {
                  label: "Enterprise teams enabled",
                  value: "45",
                  icon: Users,
                },
                {
                  label: "Average go-live",
                  value: "12 weeks",
                  icon: CalendarCheck,
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-white">{stat.value}</p>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </BackgroundGradientAnimation>
      </section>

      <section className="container mx-auto px-4">
        <SectionTitle
          title="Featured Projects"
          subtitle="A selection of programmes that showcase how we connect strategy, engineering, and adoption to deliver real-world impact."
        />

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-3 text-white">
                  <project.icon className="h-6 w-6" />
                  <span className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
                    {project.id.replace(/-/g, " ")}
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-6 p-6">
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-slate-900">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Key Moments
                    </p>
                    <ul className="mt-2 space-y-1 text-sm text-slate-600">
                      {project.features.slice(0, 3).map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-r from-dcg-lightBlue to-dcg-lightGreen" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Tooling
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
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
                </div>

                <div className="mt-auto">
                  <Link
                    href={project.href}
                    className="inline-flex items-center text-sm font-semibold text-dcg-lightBlue transition-colors duration-200 hover:text-dcg-lightGreen"
                  >
                    View full case study
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="bg-slate-950 py-24 text-white">
        <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[1.2fr,1fr] lg:items-center">
          <div className="space-y-6">
            <div className="max-w-2xl space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-dcg-lightGreen">
                Delivery blueprint
              </p>
              <h2 className="text-3xl font-bold md:text-4xl">
                How we deliver projects
              </h2>
              <p className="text-white/70">
                From day one we align product, data, and engineering teams around measurable objectives, secure architectures, and adoption plans.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {deliveryProcess.map((step) => (
                <div
                  key={step.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
                >
                  <step.icon className="mb-4 h-8 w-8 text-dcg-lightGreen" />
                  <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm text-white/70">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            {deliveryPillars.map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                    <pillar.icon className="h-6 w-6 text-dcg-lightGreen" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{pillar.title}</h3>
                </div>
                <p className="mt-3 text-sm text-white/70">{pillar.description}</p>
                <ul className="mt-4 space-y-2 text-sm text-white/70">
                  {pillar.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2">
                      <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-r from-dcg-lightBlue to-dcg-lightGreen" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <SectionTitle
          title="Partnerships that scale"
          subtitle="Client teams trust us to co-create the right solutions and stay engaged long after launch."
        />
        <InfiniteMovingCards items={testimonials} />
      </section>

      <section className="container mx-auto px-4">
        <div className="rounded-3xl bg-gradient-to-r from-dcg-lightBlue via-[#00b1b5] to-dcg-lightGreen p-[1px]">
          <div className="rounded-3xl bg-white p-12 text-center shadow-lg md:p-16">
            <div className="mx-auto flex max-w-3xl flex-col gap-6">
              <h2 className="text-3xl font-bold md:text-4xl">
                Ready to design your next data-driven initiative?
              </h2>
              <p className="text-base text-slate-600 md:text-lg">
                We partner with enterprise and scale-up teams to bring clarity, velocity, and measurable outcomes to AI and data programmes.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-dcg-lightBlue to-dcg-lightGreen px-6 py-3 text-sm font-semibold text-white shadow-lg transition-transform duration-200 hover:-translate-y-1"
                >
                  Book a discovery call
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:border-dcg-lightBlue hover:text-dcg-lightBlue"
                >
                  Meet our team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

