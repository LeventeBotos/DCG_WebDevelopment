"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  Database,
  Cpu,
  Server,
  Zap,
  Shield,
  BarChart3,
  Globe,
  Cloud,
  Network,
  Bot,
  TrendingUp,
  Users,
  Target,
  Lightbulb,
} from "lucide-react";
import { FuturisticButton } from "@/components/futuristic-button";
import FuturisticCard from "@/components/futuristic-card";
import FuturisticSection from "@/components/futuristic-section";
import FuturisticHeading from "@/components/futuristic-heading";

export default function ProjectsPage() {
  const projects = [
    {
      id: "knowledge-graph",
      title: "Knowledge Graph & Digital Twin",
      description:
        "Advanced knowledge graph system with edges, entities, and their relations for comprehensive data modeling.",
      icon: Network,
      features: [
        "Entity-relationship mapping",
        "Graph-based data models",
        "Digital twin integration",
        "LLMOps and RAG systems",
        "Transfer learning capabilities",
      ],
      technologies: ["Python", "Neo4j", "GraphQL", "Machine Learning"],
      image: "/placeholder.svg?height=300&width=400",
      delay: 0.1,
      glowColor: "rgba(0, 51, 102, 0.3)",
      href: "/projects/knowledge-graph",
    },
    {
      id: "cloud-migration",
      title: "Cloud Database Migration",
      description:
        "Seamless migration of databases to cloud infrastructure with zero downtime and enhanced scalability.",
      icon: Cloud,
      features: [
        "Zero-downtime migration",
        "Data integrity validation",
        "Performance optimization",
        "Security compliance",
        "Automated rollback",
      ],
      technologies: ["AWS", "Azure", "Docker", "Kubernetes"],
      image: "/placeholder.svg?height=300&width=400",
      delay: 0.2,
      glowColor: "rgba(0, 102, 68, 0.3)",
      href: "/projects/cloud-migration",
    },
    {
      id: "data-analytics",
      title: "Data Mining & Analytics Platform",
      description:
        "Comprehensive data mining and centralization platform for IoT, documents, and streaming data.",
      icon: BarChart3,
      features: [
        "IoT data processing",
        "Document analysis",
        "Real-time streaming",
        "Predictive analytics",
        "Data visualization",
      ],
      technologies: ["Apache Kafka", "Elasticsearch", "TensorFlow", "React"],
      image: "/placeholder.svg?height=300&width=400",
      delay: 0.3,
      glowColor: "rgba(0, 51, 102, 0.3)",
      href: "/projects/data-analytics",
    },
    {
      id: "customer-habits",
      title: "Customer Habits Analysis (PI)",
      description:
        "AI-powered customer behavior analysis with PCI compliance and deep learning for predictive insights.",
      icon: Brain,
      features: [
        "PCI compliance",
        "Proof of consent (POC)",
        "Deep learning models",
        "Behavioral prediction",
        "Security-first approach",
      ],
      technologies: ["Python", "TensorFlow", "PostgreSQL", "Redis"],
      image: "/placeholder.svg?height=300&width=400",
      delay: 0.4,
      glowColor: "rgba(0, 102, 68, 0.3)",
      href: "/projects/customer-habits",
    },
    {
      id: "supply-chain",
      title: "Supply Chain Optimization",
      description:
        "ML-powered supply chain optimization for retail and manufacturing with demand forecasting.",
      icon: TrendingUp,
      features: [
        "Demand forecasting",
        "Inventory optimization",
        "Price optimization",
        "Location-based analytics",
        "Revenue maximization",
      ],
      technologies: ["Scikit-learn", "Pandas", "NumPy", "Gradio"],
      image: "/placeholder.svg?height=300&width=400",
      delay: 0.5,
      glowColor: "rgba(0, 51, 102, 0.3)",
      href: "/projects/supply-chain",
    },
    {
      id: "data-modeling",
      title: "Advanced Data Modeling",
      description:
        "Comprehensive data modeling solutions including relational and graph models for enterprise applications.",
      icon: Database,
      features: [
        "Relational modeling",
        "Graph modeling",
        "Schema design",
        "Performance tuning",
        "Data governance",
      ],
      technologies: ["PostgreSQL", "MongoDB", "Neo4j", "ERD tools"],
      image: "/placeholder.svg?height=300&width=400",
      delay: 0.6,
      glowColor: "rgba(0, 102, 68, 0.3)",
      href: "/projects/data-modeling",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <FuturisticSection
        className="py-24 md:py-32"
        withBlobs
        blobConfig={{
          topRight: true,
          bottomLeft: true,
          colors: ["#003366", "#006644"],
        }}
      >
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-6">
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl/none">
                Our
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary">
                  Projects
                </span>
              </h1>
              <p className="max-w-[600px] text-slate-600 md:text-xl">
                Discover our cutting-edge AI and data science projects that are
                transforming industries from energy to retail. Each project
                showcases our expertise in machine learning, data analytics, and
                digital transformation.
              </p>
            </motion.div>
            <motion.div
              className="flex flex-col gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <FuturisticButton
                className="group"
                icon={
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                }
                iconPosition="right"
              >
                <Link href="/contact">Start a Project</Link>
              </FuturisticButton>
              <FuturisticButton variant="outline">
                <Link href="/industries">View Industries</Link>
              </FuturisticButton>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative"
          >
            {/* Animated project visualization */}
            <div className="relative h-80 w-full max-w-md mx-auto">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              <div className="absolute inset-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Brain className="h-16 w-16 text-primary mx-auto" />
                  </motion.div>
                  <p className="text-lg font-semibold text-primary">
                    AI Projects
                  </p>
                  <p className="text-sm text-slate-600">
                    Transforming Industries
                  </p>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                className="absolute -top-4 -right-4 h-12 w-12 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Database className="h-6 w-6 text-primary" />
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 h-10 w-10 rounded-full bg-secondary/20 backdrop-blur-sm flex items-center justify-center"
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Cpu className="h-5 w-5 text-secondary" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </FuturisticSection>

      {/* Projects Grid */}
      <FuturisticSection className="py-20">
        <FuturisticHeading
          title="Featured Projects"
          description="Explore our portfolio of innovative AI and data science solutions that are driving digital transformation across industries."
          align="center"
          withGradient
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: project.delay }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <FuturisticCard
                icon={project.icon}
                title={project.title}
                description={project.description}
                delay={project.delay}
                glowColor={project.glowColor}
                className="h-full"
              >
                <div className="mt-6 space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-primary">
                      Key Features:
                    </h4>
                    <ul className="space-y-1">
                      {project.features.slice(0, 3).map((feature, index) => (
                        <li
                          key={index}
                          className="text-xs text-slate-600 flex items-center"
                        >
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-primary">
                      Technologies:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <span
                          key={index}
                          className="inline-block px-2 py-1 text-xs bg-primary/10 text-primary rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4">
                    <FuturisticButton
                      variant="outline"
                      size="sm"
                      className="w-full group"
                      icon={
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      }
                      iconPosition="right"
                    >
                      <Link href={project.href}>View Project</Link>
                    </FuturisticButton>
                  </div>
                </div>
              </FuturisticCard>
            </motion.div>
          ))}
        </div>
      </FuturisticSection>

      {/* Statistics Section */}
      <FuturisticSection className="py-20 bg-gradient-to-r from-primary to-primary/90 text-white">
        <FuturisticHeading
          title="Project Impact"
          description="Numbers that speak to our success in delivering transformative solutions."
          align="center"
          withGradient={false}
          withLine
          lineColor="rgba(255, 255, 255, 0.3)"
        />

        <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {[
            {
              value: "25+",
              label: "Projects Delivered",
              icon: Target,
              delay: 0.1,
            },
            {
              value: "95%",
              label: "Client Satisfaction",
              icon: Users,
              delay: 0.2,
            },
            {
              value: "£15M+",
              label: "Cost Savings",
              icon: TrendingUp,
              delay: 0.3,
            },
            {
              value: "24/7",
              label: "Support Available",
              icon: Shield,
              delay: 0.4,
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center justify-center space-y-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: stat.delay }}
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="p-3 rounded-full bg-white/10"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <stat.icon className="h-6 w-6 text-white" />
              </motion.div>
              <motion.span
                className="text-3xl font-bold tracking-tight sm:text-4xl"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: stat.delay + 0.2 }}
              >
                {stat.value}
              </motion.span>
              <p className="text-sm font-medium text-white/80">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </FuturisticSection>

      {/* CTA Section */}
      <FuturisticSection className="py-20">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Ready to Start Your Project?
            </h2>
            <p className="mx-auto max-w-[700px] text-slate-600 md:text-xl">
              Let's discuss how our AI and data science expertise can transform
              your business operations.
            </p>
          </motion.div>
          <motion.div
            className="flex flex-col gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <FuturisticButton
              className="group"
              icon={
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              }
              iconPosition="right"
            >
              <Link href="/contact">Start Your Project</Link>
            </FuturisticButton>
            <FuturisticButton variant="outline">
              <Link href="/industries">Explore Industries</Link>
            </FuturisticButton>
          </motion.div>
        </div>
      </FuturisticSection>
    </div>
  );
}
