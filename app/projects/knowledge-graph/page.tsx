"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Brain,
  Database,
  Network,
  Cpu,
  Shield,
  Zap,
  Users,
  Globe,
  BarChart3,
  Code,
  Server,
  Cloud,
} from "lucide-react";
import FuturisticCard from "@/components/futuristic-card";
import FuturisticSection from "@/components/futuristic-section";
import FuturisticHeading from "@/components/futuristic-heading";
import { Button } from "@/components/ui/button";

export default function KnowledgeGraphProject() {
  const features = [
    {
      title: "Entity-Relationship Mapping",
      description:
        "Advanced graph-based data modeling with comprehensive entity mapping and relationship discovery.",
      icon: Network,
      delay: 0.1,
    },
    {
      title: "Digital Twin Integration",
      description:
        "Real-time synchronization between physical systems and their digital representations.",
      icon: Cpu,
      delay: 0.2,
    },
    {
      title: "LLMOps & RAG Systems",
      description:
        "Large Language Model operations with Retrieval-Augmented Generation for intelligent responses.",
      icon: Brain,
      delay: 0.3,
    },
    {
      title: "Transfer Learning",
      description:
        "Advanced machine learning techniques for knowledge transfer across domains.",
      icon: Zap,
      delay: 0.4,
    },
    {
      title: "Graph Analytics",
      description:
        "Deep insights from graph structure analysis and pattern recognition.",
      icon: BarChart3,
      delay: 0.5,
    },
    {
      title: "Scalable Architecture",
      description:
        "Cloud-native design supporting millions of entities and relationships.",
      icon: Cloud,
      delay: 0.6,
    },
  ];

  const technologies = [
    { name: "Python", category: "Programming", icon: Code },
    { name: "Neo4j", category: "Database", icon: Database },
    { name: "GraphQL", category: "API", icon: Network },
    { name: "TensorFlow", category: "ML Framework", icon: Brain },
    { name: "AWS", category: "Cloud", icon: Cloud },
    { name: "Docker", category: "Containerization", icon: Server },
  ];

  const projectStats = [
    { label: "Entities Processed", value: "10M+", icon: Database },
    { label: "Relationships Mapped", value: "50M+", icon: Network },
    { label: "Query Response Time", value: "<100ms", icon: Zap },
    { label: "Uptime", value: "99.9%", icon: Shield },
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
              <div className="flex items-center space-x-2 text-sm text-primary mb-4">
                <Link
                  href="/projects"
                  className="hover:underline flex items-center"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to Projects
                </Link>
              </div>

              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl/none">
                Knowledge Graph &
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary">
                  Digital Twin
                </span>
              </h1>
              <p className="max-w-[600px] text-slate-600 md:text-xl">
                A revolutionary knowledge graph system that creates
                comprehensive digital representations of complex systems,
                enabling advanced AI-driven insights and predictive analytics.
              </p>
            </motion.div>
            <motion.div
              className="flex flex-col gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button
                asChild
                variant="primary"
                size="lg"
                // className="group"
              >
                <Link href="/contact">Start Similar Project</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/projects">View All Projects</Link>
              </Button>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative"
          >
            {/* Animated knowledge graph visualization */}
            <div className="relative h-80 w-full max-w-md mx-auto">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 30,
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
                    <Network className="h-16 w-16 text-primary mx-auto" />
                  </motion.div>
                  <p className="text-lg font-semibold text-primary">
                    Knowledge Graph
                  </p>
                  <p className="text-sm text-slate-600">
                    Digital Twin Integration
                  </p>
                </div>
              </div>

              {/* Floating graph nodes */}
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
                <Brain className="h-5 w-5 text-secondary" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </FuturisticSection>

      {/* Project Overview */}
      <FuturisticSection className="py-20">
        <FuturisticHeading
          title="Project Overview"
          description="A comprehensive knowledge graph system that revolutionizes how organizations understand and interact with their data."
          align="center"
          withGradient
        />

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {projectStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                className="mx-auto p-4 rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <stat.icon className="h-8 w-8 text-primary" />
              </motion.div>
              <div className="text-2xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <p className="text-sm text-slate-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </FuturisticSection>

      {/* Features Grid */}
      <FuturisticSection className="py-20 bg-slate-50/50 backdrop-blur-sm">
        <FuturisticHeading
          title="Key Features"
          description="Advanced capabilities that make this knowledge graph system a game-changer for data-driven organizations."
          align="center"
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: feature.delay }}
              whileHover={{ y: -5 }}
            >
              <FuturisticCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={feature.delay}
                glowColor="rgba(0, 51, 102, 0.3)"
              />
            </motion.div>
          ))}
        </div>
      </FuturisticSection>

      {/* Technology Stack */}
      <FuturisticSection className="py-20">
        <FuturisticHeading
          title="Technology Stack"
          description="Built with cutting-edge technologies for maximum performance, scalability, and reliability."
          align="center"
          withGradient
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              className="group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -3 }}
            >
              <div className="p-6 rounded-xl border border-gray-200 bg-white hover:border-primary/30 transition-all duration-300 hover:shadow-md">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <tech.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{tech.name}</h3>
                    <p className="text-sm text-slate-600">{tech.category}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </FuturisticSection>

      {/* Use Cases */}
      <FuturisticSection className="py-20 bg-slate-50/50 backdrop-blur-sm">
        <FuturisticHeading
          title="Use Cases & Applications"
          description="This knowledge graph system has been successfully deployed across various industries and use cases."
          align="center"
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {[
            {
              title: "Energy Sector",
              description:
                "Mapping complex relationships between oil wells, pipelines, and production facilities for BP and Shell.",
              icon: Zap,
              delay: 0.1,
            },
            {
              title: "Financial Services",
              description:
                "Fraud detection and risk assessment through entity relationship mapping in banking systems.",
              icon: Shield,
              delay: 0.2,
            },
            {
              title: "Manufacturing",
              description:
                "Digital twin creation for production lines and supply chain optimization.",
              icon: Cpu,
              delay: 0.3,
            },
            {
              title: "Healthcare",
              description:
                "Patient data integration and medical knowledge graph for improved diagnostics.",
              icon: Users,
              delay: 0.4,
            },
          ].map((useCase) => (
            <motion.div
              key={useCase.title}
              className="group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: useCase.delay }}
              whileHover={{ y: -5 }}
            >
              <FuturisticCard
                icon={useCase.icon}
                title={useCase.title}
                description={useCase.description}
                delay={useCase.delay}
                glowColor="rgba(0, 102, 68, 0.3)"
              />
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
              Ready to Build Your Knowledge Graph?
            </h2>
            <p className="mx-auto max-w-[700px] text-slate-600 md:text-xl">
              Let's discuss how our knowledge graph and digital twin technology
              can transform your organization's data capabilities.
            </p>
          </motion.div>
          <motion.div
            className="flex flex-col gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button
              asChild
              variant="primary"
              size="lg"
              // className="group"
            >
              <Link href="/contact">Start Your Project</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/projects">Explore More Projects</Link>
            </Button>
          </motion.div>
        </div>
      </FuturisticSection>
    </div>
  );
}
