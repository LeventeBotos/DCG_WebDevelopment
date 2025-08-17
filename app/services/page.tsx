"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  Database,
  Server,
  BarChart3,
  LineChart,
  PieChart,
  Network,
  Code,
  Bot,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedBlob from "@/components/animated-blob";
import SectionHeading from "@/components/section-heading";
import FeatureCard from "@/components/feature-card";
import AnimatedGradientText from "@/components/animated-gradient-text";

export default function ServicesPage() {
  const services = [
    {
      category: "Data",
      icon: Database,
      services: [
        "Data Migration",
        "Data Modelling",
        "Database Optimization & Pipelining",
        "Data Platform",
        "Data Centralization",
        "Asset Management",
        "Data Product Portal",
        "Data Mining",
      ],
      description: "Comprehensive data management and optimization solutions.",
      image: "/placeholder.svg?height=300&width=400",
      delay: 0.1,
    },
    {
      category: "AI",
      icon: Brain,
      services: [
        "Data Science",
        "Machine Learning",
        "Transfer Learning",
        "Computer Vision",
        "Industry 4.0",
        "Digital Twin",
        "Deep Learning",
        "Large Language Models & RAGs",
        "Generative AI & Agentic AI",
      ],
      description:
        "Advanced AI and machine learning capabilities for intelligent automation.",
      image: "/placeholder.svg?height=300&width=400",
      delay: 0.2,
    },
    {
      category: "Cloud Operations",
      icon: Server,
      services: [
        "Microsoft Azure",
        "Amazon Web Service",
        "Google Cloud Platform",
        "Databricks",
        "Snowflake",
        "Neo4j",
        "Dataiku",
      ],
      description:
        "Multi-cloud platform expertise for scalable infrastructure solutions.",
      image: "/placeholder.svg?height=300&width=400",
      delay: 0.3,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 bg-muted/50 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <AnimatedBlob
            className="-right-40 -top-40"
            color="#003366"
            opacity={0.05}
            size={600}
          />
          <AnimatedBlob
            className="-left-40 -bottom-40"
            color="#006644"
            opacity={0.05}
            size={600}
          />
        </div>

        <div className="container relative z-10 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Our <AnimatedGradientText>Services</AnimatedGradientText>
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Comprehensive AI and data solutions tailored to your business
                needs.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section className="py-16 bg-slate-50/50 backdrop-blur-sm">
        <SectionHeading
          title="Comprehensive Service Portfolio"
          description="Our complete range of data, AI, and cloud services designed to transform your business."
          align="center"
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
              src="/images/dcg-services-detailed.png"
              alt="DCG Detailed Services"
              width={1000}
              height={700}
              className="rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm p-4"
            />
          </motion.div>
        </div>
      </section>

      {/* Main Services Section */}
      <section className="py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <SectionHeading
            title="Core Services"
            description="Our primary offerings designed to transform your business through AI and data."
            align="center"
          />

          <div className="mt-10 space-y-16">
            {services.map((serviceCategory, index) => (
              <motion.div
                key={serviceCategory.category}
                className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div
                  className={`space-y-4 ${index % 2 === 1 ? "lg:order-2" : ""}`}
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <serviceCategory.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold">
                    {serviceCategory.category}
                  </h2>
                  <p className="text-muted-foreground">
                    {serviceCategory.description}
                  </p>

                  <div className="mt-6 space-y-2">
                    <h3 className="font-semibold">Services:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {serviceCategory.services.map((service) => (
                        <motion.div
                          key={service}
                          className="flex items-start"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.3,
                            delay: serviceCategory.delay,
                          }}
                        >
                          <ArrowRight className="mr-2 h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">
                            {service}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button asChild>
                      <Link href="/contact" className="group">
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </div>

                <div
                  className={`relative ${index % 2 === 1 ? "lg:order-1" : ""}`}
                >
                  <motion.div
                    className="relative aspect-video overflow-hidden rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: serviceCategory.delay + 0.2,
                    }}
                  >
                    <Image
                      src={serviceCategory.image || "/placeholder.svg"}
                      alt={serviceCategory.category}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                  <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />
                  <div className="absolute -top-6 -left-6 h-32 w-32 rounded-full bg-secondary/10 blur-2xl" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialized Services Section */}
      <section className="py-12 md:py-20 bg-muted/50">
        <div className="container px-4 md:px-6">
          <SectionHeading
            title="Specialized Services"
            description="Additional specialized offerings to address specific business needs."
            align="center"
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: BarChart3,
                title: "Predictive Analytics",
                description:
                  "Forecast future trends and behaviors to make proactive business decisions.",
                delay: 0.1,
              },
              {
                icon: LineChart,
                title: "Time Series Analysis",
                description:
                  "Analyze time-based data to identify patterns and predict future values.",
                delay: 0.2,
              },
              {
                icon: PieChart,
                title: "Customer Segmentation",
                description:
                  "Divide customers into groups based on shared characteristics for targeted marketing.",
                delay: 0.3,
              },
              {
                icon: Network,
                title: "Network Optimization",
                description:
                  "Improve network performance and reliability for better business operations.",
                delay: 0.4,
              },
              {
                icon: Code,
                title: "Custom Software Development",
                description:
                  "Bespoke software solutions tailored to your specific business requirements.",
                delay: 0.5,
              },
              {
                icon: Bot,
                title: "Chatbot Development",
                description:
                  "Intelligent conversational agents to enhance customer service and support.",
                delay: 0.6,
              },
            ].map((service) => (
              <FeatureCard
                key={service.title}
                icon={service.icon}
                title={service.title}
                description={service.description}
                delay={service.delay}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Service Process Section */}
      <section className="py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <SectionHeading
                title="Our Service Process"
                description="A systematic approach to delivering exceptional results."
                align="left"
              />

              <div className="mt-8 space-y-6">
                {[
                  {
                    step: "01",
                    title: "Initial Consultation",
                    description:
                      "We begin with a thorough discussion to understand your business challenges and objectives.",
                  },
                  {
                    step: "02",
                    title: "Assessment & Planning",
                    description:
                      "Our experts assess your current situation and develop a detailed implementation plan.",
                  },
                  {
                    step: "03",
                    title: "Solution Development",
                    description:
                      "We design and develop a tailored solution using cutting-edge technologies.",
                  },
                  {
                    step: "04",
                    title: "Implementation & Testing",
                    description:
                      "The solution is implemented and rigorously tested to ensure optimal performance.",
                  },
                  {
                    step: "05",
                    title: "Training & Support",
                    description:
                      "We provide comprehensive training and ongoing support to ensure long-term success.",
                  },
                ].map((step, index) => (
                  <motion.div
                    key={step.step}
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <span className="text-sm font-bold">{step.step}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{step.title}</h3>
                      <p className="text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative aspect-square overflow-hidden rounded-xl border">
                <Image
                  src="/placeholder.svg?height=600&width=600"
                  alt="Service process"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />
              <div className="absolute -top-6 -left-6 h-32 w-32 rounded-full bg-secondary/10 blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Get Started?
              </h2>
              <p className="mx-auto max-w-[700px] md:text-xl">
                Contact us today to discuss how our services can help your
                business thrive in the digital age.
              </p>
            </motion.div>
            <motion.div
              className="flex flex-col gap-2 min-[400px]:flex-row"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button asChild size="lg" variant="secondary" className="group">
                <Link href="/contact">
                  Contact Us Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/about">Learn About Us</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
