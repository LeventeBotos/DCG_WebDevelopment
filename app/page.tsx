"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, BarChart3, Brain, Database, Zap, Shield, Cpu, Server } from "lucide-react"
import { FuturisticButton } from "@/components/futuristic-button"
import FuturisticDataVisualization from "@/components/futuristic-data-visualization"
import FuturisticCard from "@/components/futuristic-card"
import FuturisticSection from "@/components/futuristic-section"
import FuturisticHeading from "@/components/futuristic-heading"

export default function Home() {
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
                Cutting Edge Technology
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary">
                  Digital Solutions
                </span>
              </h1>
              <p className="max-w-[600px] text-slate-600 md:text-xl">
                We create innovative digital solutions by providing expertise in Software Development, Data Science and
                Artificial Intelligence.
              </p>
            </motion.div>
            <motion.div
              className="flex flex-col gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <FuturisticButton
                asChild
                className="group"
                icon={<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />}
                iconPosition="right"
              >
                <Link href="/industries">Explore Industries</Link>
              </FuturisticButton>
              <FuturisticButton asChild variant="outline">
                <Link href="/contact">Contact Us</Link>
              </FuturisticButton>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative"
          >
            <FuturisticDataVisualization />

            {/* Floating elements */}
            <motion.div
              className="absolute -top-10 -right-10 h-20 w-20 rounded-full bg-primary/10 backdrop-blur-sm flex items-center justify-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Brain className="h-10 w-10 text-primary" />
            </motion.div>

            <motion.div
              className="absolute -bottom-5 -left-5 h-16 w-16 rounded-full bg-secondary/10 backdrop-blur-sm flex items-center justify-center"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <Database className="h-8 w-8 text-secondary" />
            </motion.div>
          </motion.div>
        </div>
      </FuturisticSection>

      {/* Clients Section */}
      <FuturisticSection className="py-16 bg-slate-50/50 backdrop-blur-sm">
        <FuturisticHeading
          title="Trusted by Industry Leaders"
          description="We work with some of the most innovative companies across various sectors."
        />
        <motion.div
          className="mt-12 flex flex-wrap items-center justify-center gap-8 md:gap-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {["BP", "Shell", "British Airways", "Infosys", "Intel"].map((client, index) => (
            <motion.div
              key={client}
              className="flex items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative h-16 w-40">
                <div className="flex h-full w-full items-center justify-center rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm px-6 py-3 shadow-sm">
                  <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                    {client}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </FuturisticSection>

      {/* Mission & Vision Section */}
      <FuturisticSection
        withBlobs
        blobConfig={{
          topLeft: true,
          bottomRight: false,
          colors: ["#003366", "#006644"],
        }}
      >
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <FuturisticCard
            icon={Brain}
            title="Our Mission"
            description="Empowering energy, banking, and manufacturing industries with advanced digital solutions that drive operational efficiency, sustainable growth, and customer-centric innovation."
            delay={0.1}
            className="lg:p-8"
            glowColor="rgba(0, 51, 102, 0.3)"
          >
            <motion.p
              className="mt-4 text-slate-600"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              We leverage cutting-edge technology and data-driven insights to transform complex challenges into
              streamlined, scalable opportunities, ensuring our clients are future-ready and resilient in an evolving
              market landscape.
            </motion.p>
          </FuturisticCard>

          <FuturisticCard
            icon={BarChart3}
            title="Our Vision"
            description="To be the trusted digital transformation partner for the energy, banking, and manufacturing sectors, setting new standards for operational excellence, innovation, and sustainable impact."
            delay={0.2}
            className="lg:p-8"
            glowColor="rgba(0, 102, 68, 0.3)"
          >
            <motion.p
              className="mt-4 text-slate-600"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Our vision is a future where technology not only accelerates business success but also contributes to a
              connected, efficient, and environmentally responsible global economy.
            </motion.p>
          </FuturisticCard>
        </div>
      </FuturisticSection>

      {/* Stats Section */}
      <FuturisticSection className="py-20 bg-gradient-to-r from-primary to-primary/90 text-white">
        <FuturisticHeading
          title="Our Impact in Numbers"
          description="Delivering measurable results for our clients across industries."
          align="center"
          withGradient={false}
          withLine
          lineColor="rgba(255, 255, 255, 0.3)"
        />
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
          {[
            { value: "50+", label: "Enterprise Clients", delay: 0.1 },
            { value: "200+", label: "Projects Completed", delay: 0.2 },
            { value: "95%", label: "Client Retention", delay: 0.3 },
            { value: "£30M", label: "Cost Savings Generated", delay: 0.4 },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center justify-center space-y-2 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: stat.delay }}
              whileHover={{ y: -5 }}
            >
              <motion.span
                className="text-4xl font-bold tracking-tight sm:text-5xl"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: stat.delay + 0.2 }}
              >
                {stat.value}
              </motion.span>
              <p className="text-sm font-medium text-white/80 md:text-base">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </FuturisticSection>

      {/* Services Section */}
      <FuturisticSection
        withBlobs
        blobConfig={{
          topRight: false,
          bottomLeft: true,
          colors: ["#006644", "#003366"],
        }}
      >
        <FuturisticHeading
          title="Our Services"
          description="Comprehensive AI and data solutions tailored to your business needs."
          align="center"
          withGradient
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: Brain,
              title: "AI Consulting",
              description: "Strategic guidance on implementing AI solutions to solve complex business challenges.",
              delay: 0.1,
              glowColor: "rgba(0, 51, 102, 0.3)",
            },
            {
              icon: Database,
              title: "Data Analytics",
              description: "Transform raw data into actionable insights to drive informed decision-making.",
              delay: 0.2,
              glowColor: "rgba(0, 102, 68, 0.3)",
            },
            {
              icon: Cpu,
              title: "Machine Learning",
              description: "Custom ML models to predict outcomes and optimize business processes.",
              delay: 0.3,
              glowColor: "rgba(0, 51, 102, 0.3)",
            },
            {
              icon: Server,
              title: "Cloud Solutions",
              description: "Scalable cloud infrastructure to support your AI and data initiatives.",
              delay: 0.4,
              glowColor: "rgba(0, 102, 68, 0.3)",
            },
            {
              icon: Shield,
              title: "Data Security",
              description: "Protect your valuable data assets with advanced security measures.",
              delay: 0.5,
              glowColor: "rgba(0, 51, 102, 0.3)",
            },
            {
              icon: Zap,
              title: "Process Automation",
              description: "Streamline operations with intelligent automation of repetitive tasks.",
              delay: 0.6,
              glowColor: "rgba(0, 102, 68, 0.3)",
            },
          ].map((service) => (
            <FuturisticCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
              delay={service.delay}
              glowColor={service.glowColor}
            />
          ))}
        </div>
      </FuturisticSection>

      {/* Industries Section */}
      <FuturisticSection className="py-20 bg-slate-50/50 backdrop-blur-sm">
        <FuturisticHeading
          title="Industries We Serve"
          description="We provide tailored AI and data solutions for leading industries, helping them transform their operations."
          align="center"
        >
          <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-1 text-sm font-semibold mt-2">
            <Database className="mr-1 h-3.5 w-3.5 text-primary" />
            Expertise
          </div>
        </FuturisticHeading>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
          {[
            {
              title: "Energy",
              description: "Optimizing production forecasting and operational efficiency for energy companies.",
              href: "/industries/energy",
              image: "/placeholder.svg?height=200&width=300",
              delay: 0.1,
              glowColor: "rgba(0, 51, 102, 0.3)",
            },
            {
              title: "Banking",
              description: "Advanced risk assessment and fraud detection solutions for financial institutions.",
              href: "/industries/banking",
              image: "/placeholder.svg?height=200&width=300",
              delay: 0.2,
              glowColor: "rgba(0, 102, 68, 0.3)",
            },
            {
              title: "Manufacturing",
              description: "Predictive maintenance and supply chain optimization for manufacturing companies.",
              href: "/industries/manufacturing",
              image: "/placeholder.svg?height=200&width=300",
              delay: 0.3,
              glowColor: "rgba(0, 51, 102, 0.3)",
            },
          ].map((industry) => (
            <motion.div
              key={industry.title}
              className="group relative overflow-hidden rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: industry.delay }}
              whileHover={{ y: -5 }}
            >
              <div className="relative aspect-video overflow-hidden rounded-t-xl">
                <Image
                  src={industry.image || "/placeholder.svg"}
                  alt={industry.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-xl font-bold text-white">{industry.title}</h3>
                </div>
              </div>
              <div className="p-4">
                <p className="mb-4 text-sm text-slate-600">{industry.description}</p>
                <Link
                  href={industry.href}
                  className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                >
                  Learn More
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              {/* Glow effect */}
              <div
                className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full blur-3xl opacity-30"
                style={{ background: industry.glowColor }}
              />
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <FuturisticButton
            asChild
            className="group"
            icon={<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />}
            iconPosition="right"
          >
            <Link href="/industries">View All Industries</Link>
          </FuturisticButton>
        </div>
      </FuturisticSection>

      {/* Process Section */}
      <FuturisticSection
        withBlobs
        blobConfig={{
          topLeft: true,
          bottomRight: true,
          colors: ["#003366", "#006644"],
        }}
      >
        <FuturisticHeading
          title="Our Approach"
          description="A systematic methodology to deliver successful AI and data projects."
          align="center"
          withGradient
        />

        <div className="mx-auto mt-16 max-w-3xl">
          <div className="space-y-12 md:space-y-16">
            {[
              {
                step: 1,
                title: "Discovery & Analysis",
                description:
                  "We begin by understanding your business challenges and objectives through in-depth analysis.",
                icon: Brain,
                delay: 0.1,
              },
              {
                step: 2,
                title: "Solution Design",
                description:
                  "Our experts design a tailored solution that addresses your specific needs and requirements.",
                icon: Cpu,
                delay: 0.2,
              },
              {
                step: 3,
                title: "Development & Implementation",
                description: "We develop and implement the solution using agile methodologies for optimal results.",
                icon: Server,
                delay: 0.3,
              },
              {
                step: 4,
                title: "Testing & Optimization",
                description:
                  "Rigorous testing ensures the solution performs as expected, with continuous optimization.",
                icon: Shield,
                delay: 0.4,
              },
              {
                step: 5,
                title: "Deployment & Support",
                description: "We deploy the solution and provide ongoing support to ensure long-term success.",
                icon: Zap,
                delay: 0.5,
              },
            ].map((step) => (
              <motion.div
                key={step.step}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: step.delay }}
              >
                <div className="flex items-start gap-6">
                  <div className="relative">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary text-white">
                      <span className="text-sm font-bold">{step.step}</span>
                    </div>
                    {step.step > 1 && (
                      <motion.div
                        className="absolute -top-[calc(100%+0.5rem)] left-1/2 h-16 w-0.5 -translate-x-1/2 bg-gradient-to-b from-primary/20 to-secondary/20"
                        initial={{ scaleY: 0, originY: 1 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: step.delay + 0.2 }}
                      />
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <step.icon className="h-5 w-5 text-primary" />
                      <h3 className="text-xl font-bold">{step.title}</h3>
                    </div>
                    <p className="text-slate-600">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </FuturisticSection>

      {/* Testimonials Section */}
      <FuturisticSection className="py-20 bg-slate-50/50 backdrop-blur-sm">
        <FuturisticHeading
          title="What Our Clients Say"
          description="Hear from the companies we've helped transform with our AI and data solutions."
          align="center"
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              quote:
                "DCG's AI solutions have revolutionized our production forecasting, resulting in significant cost savings and improved efficiency.",
              author: "Sarah Johnson",
              role: "CTO",
              company: "Energy Corp",
              delay: 0.1,
              glowColor: "rgba(0, 51, 102, 0.3)",
            },
            {
              quote:
                "The fraud detection system implemented by DCG has reduced fraudulent transactions by 40%, protecting our customers and our reputation.",
              author: "Michael Chen",
              role: "Head of Security",
              company: "Global Bank",
              delay: 0.2,
              glowColor: "rgba(0, 102, 68, 0.3)",
            },
            {
              quote:
                "Working with DCG has transformed our manufacturing processes. Their predictive maintenance solution has minimized downtime and extended equipment life.",
              author: "David Williams",
              role: "Operations Director",
              company: "Manufacturing Inc.",
              delay: 0.3,
              glowColor: "rgba(0, 51, 102, 0.3)",
            },
          ].map((testimonial) => (
            <FuturisticCard
              key={testimonial.author}
              title={`${testimonial.author}, ${testimonial.role}`}
              description={testimonial.quote}
              delay={testimonial.delay}
              glowColor={testimonial.glowColor}
              className="flex flex-col justify-between"
            >
              <div className="mt-4 text-sm text-slate-500">{testimonial.company}</div>
            </FuturisticCard>
          ))}
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
              Ready to Transform Your Business?
            </h2>
            <p className="mx-auto max-w-[700px] text-white/80 md:text-xl">
              Let's discuss how our AI and data solutions can help your organization thrive in the digital age.
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
              asChild
              variant="secondary"
              className="group"
              icon={<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />}
              iconPosition="right"
            >
              <Link href="/contact">Get Started Today</Link>
            </FuturisticButton>
            <FuturisticButton asChild variant="outline">
              <Link href="/industries">Explore Industries</Link>
            </FuturisticButton>
          </motion.div>
        </div>
      </FuturisticSection>
    </div>
  )
}
