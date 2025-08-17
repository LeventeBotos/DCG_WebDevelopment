"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Database,
  Brain,
  Cloud,
  Network,
  Cpu,
  Shield,
} from "lucide-react";
import { FuturisticButton } from "@/components/futuristic-button";
import FuturisticCard from "@/components/futuristic-card";
import FuturisticSection from "@/components/futuristic-section";
import FuturisticHeading from "@/components/futuristic-heading";

export default function SoftwareProductsPage() {
  const products = [
    {
      icon: Database,
      title: "Data Platform",
      subtitle: "Data Mining & Centralization",
      description:
        "Comprehensive data management platform for mining, processing, and centralizing enterprise data.",
      features: [
        "Real-time data processing",
        "Advanced analytics",
        "Data governance",
        "Scalable architecture",
      ],
      delay: 0.1,
      glowColor: "rgba(0, 51, 102, 0.3)",
    },
    {
      icon: Brain,
      title: "Data Modelling Suite",
      subtitle: "Advanced Analytics Engine",
      description:
        "Sophisticated data modeling tools with relational and graph model capabilities.",
      features: [
        "Relational models",
        "Graph databases",
        "Predictive modeling",
        "Visual modeling tools",
      ],
      delay: 0.2,
      glowColor: "rgba(0, 102, 68, 0.3)",
    },
    {
      icon: Network,
      title: "Knowledge Graph & Digital Twin",
      subtitle: "Intelligent Connectivity",
      description:
        "Create digital representations of physical systems with intelligent knowledge graphs.",
      features: [
        "Digital twin technology",
        "Knowledge graphs",
        "Real-time synchronization",
        "Predictive insights",
      ],
      delay: 0.3,
      glowColor: "rgba(0, 51, 102, 0.3)",
    },
    {
      icon: Cpu,
      title: "LLMOps Platform",
      subtitle: "RAGs & GenAI",
      description:
        "Complete platform for managing Large Language Models and Generative AI operations.",
      features: [
        "RAG implementation",
        "Model deployment",
        "Performance monitoring",
        "GenAI workflows",
      ],
      delay: 0.4,
      glowColor: "rgba(0, 102, 68, 0.3)",
    },
    {
      icon: Shield,
      title: "Smart Machines",
      subtitle: "Intelligent Automation",
      description:
        "AI-powered smart machines for automated decision making and process optimization.",
      features: [
        "Automated workflows",
        "Intelligent decision making",
        "Process optimization",
        "Real-time monitoring",
      ],
      delay: 0.5,
      glowColor: "rgba(0, 51, 102, 0.3)",
    },
    {
      icon: Cloud,
      title: "IoTs & Streaming Platform",
      subtitle: "Real-time Data Processing",
      description:
        "Integrated IoT and streaming platform for real-time data collection and processing.",
      features: [
        "IoT device management",
        "Real-time streaming",
        "Edge computing",
        "Data visualization",
      ],
      delay: 0.6,
      glowColor: "rgba(0, 102, 68, 0.3)",
    },
  ];

  const integrations = [
    {
      name: "Machine Learning",
      description: "Advanced ML algorithms and model deployment",
    },
    {
      name: "Deep Learning & Computer Vision",
      description: "Neural networks and image processing capabilities",
    },
    {
      name: "Transfer Learning",
      description: "Leverage pre-trained models for faster development",
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
                Software
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary">
                  Products
                </span>
              </h1>
              <p className="max-w-[600px] text-slate-600 md:text-xl">
                Cutting-edge software solutions designed to transform your data
                infrastructure and accelerate AI adoption across your
                organization.
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
                <Link href="/contact">Request Demo</Link>
              </FuturisticButton>
              <FuturisticButton variant="outline">
                <Link href="/services">View Services</Link>
              </FuturisticButton>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative"
          >
            <div className="relative aspect-video overflow-hidden rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm">
              <Image
                src="/images/dcg-services-overview.png"
                alt="DCG Software Products Overview"
                fill
                className="object-cover p-4"
              />
            </div>
          </motion.div>
        </div>
      </FuturisticSection>

      {/* Products Grid Section */}
      <FuturisticSection
        withBlobs
        blobConfig={{
          topLeft: true,
          bottomRight: true,
          colors: ["#003366", "#006644"],
        }}
      >
        <FuturisticHeading
          title="Our Product Suite"
          description="Comprehensive software solutions for data management, AI operations, and intelligent automation."
          align="center"
          withGradient
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <FuturisticCard
              key={product.title}
              icon={product.icon}
              title={product.title}
              description={product.description}
              delay={product.delay}
              glowColor={product.glowColor}
              className="flex flex-col justify-between"
            >
              <div className="mt-4 space-y-3">
                <div className="text-sm font-medium text-primary">
                  {product.subtitle}
                </div>
                <ul className="space-y-1">
                  {product.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center text-sm text-slate-600"
                    >
                      <ArrowRight className="mr-2 h-3 w-3 text-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </FuturisticCard>
          ))}
        </div>
      </FuturisticSection>

      {/* Integration Section */}
      <FuturisticSection className="py-20 bg-slate-50/50 backdrop-blur-sm">
        <FuturisticHeading
          title="Advanced Integrations"
          description="Our products seamlessly integrate with cutting-edge AI and machine learning technologies."
          align="center"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {integrations.map((integration, index) => (
            <motion.div
              key={integration.name}
              className="relative overflow-hidden rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <h3 className="text-lg font-bold mb-2">{integration.name}</h3>
              <p className="text-sm text-slate-600">
                {integration.description}
              </p>
              <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
            </motion.div>
          ))}
        </div>
      </FuturisticSection>

      {/* Technology Architecture Section */}
      <FuturisticSection
        withBlobs
        blobConfig={{
          topRight: true,
          bottomLeft: true,
          colors: ["#006644", "#003366"],
        }}
      >
        <FuturisticHeading
          title="Technology Architecture"
          description="Explore our comprehensive technology stack and how our products work together."
          align="center"
          withGradient
        />

        <div className="mt-12 flex justify-center">
          <motion.div
            className="relative max-w-5xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/images/dcg-services-overview.png"
              alt="DCG Technology Architecture"
              width={1000}
              height={700}
              className="rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm p-6"
            />
          </motion.div>
        </div>
      </FuturisticSection>

      {/* CTA Section */}
      <FuturisticSection className="py-20 bg-gradient-to-r from-primary to-primary/90 text-white">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Ready to Transform Your Infrastructure?
            </h2>
            <p className="mx-auto max-w-[700px] text-white/80 md:text-xl">
              Discover how our software products can accelerate your digital
              transformation journey.
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
              variant="secondary"
              className="group"
              icon={
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              }
              iconPosition="right"
            >
              <Link href="/contact">Schedule Demo</Link>
            </FuturisticButton>
            <FuturisticButton variant="outline">
              <Link href="/services">View All Services</Link>
            </FuturisticButton>
          </motion.div>
        </div>
      </FuturisticSection>
    </div>
  );
}
