"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, BarChart3, Brain, Database, Zap, Award, Users, Shield, Cpu, Server } from "lucide-react"
import { Button } from "@/components/ui/button"
import AnimatedData from "@/components/animated-data"
import AnimatedBlob from "@/components/animated-blob"
import AnimatedGradientText from "@/components/animated-gradient-text"
import SectionHeading from "@/components/section-heading"
import FeatureCard from "@/components/feature-card"
import StatsCard from "@/components/stats-card"
import TestimonialCard from "@/components/testimonial-card"
import ProcessStep from "@/components/process-step"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <AnimatedBlob className="-right-40 -top-40" color="#003366" opacity={0.05} size={600} />
          <AnimatedBlob className="-left-40 -bottom-40" color="#006644" opacity={0.05} size={600} />
        </div>

        <div className="container relative z-10 px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Cutting Edge Technology
                  <br />
                  <AnimatedGradientText className="text-primary">Digital Solutions</AnimatedGradientText>
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  We create innovative digital solutions by providing expertise in Software Development, Data Science
                  and Artificial Intelligence.
                </p>
              </motion.div>
              <motion.div
                className="flex flex-col gap-2 min-[400px]:flex-row"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Button asChild size="lg" className="group">
                  <Link href="/industries">
                    Explore Industries
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <AnimatedData />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-12 md:py-20 bg-muted/50">
        <div className="container px-4 md:px-6">
          <SectionHeading
            title="Trusted by Industry Leaders"
            description="We work with some of the most innovative companies across various sectors."
          />
          <motion.div
            className="mt-10 flex flex-wrap items-center justify-center gap-8 md:gap-16"
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
                <div className="relative h-12 w-32 md:h-16 md:w-40">
                  <div className="flex h-full w-full items-center justify-center rounded-md bg-background/50 px-4 py-2">
                    <span className="text-xl font-bold text-muted-foreground">{client}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="relative py-12 md:py-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <AnimatedBlob className="-left-40 -top-40" color="#003366" opacity={0.05} size={500} />
        </div>

        <div className="container relative z-10 px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <FeatureCard
              icon={Brain}
              title="Our Mission"
              description="Empowering energy, banking, and manufacturing industries with advanced digital solutions that drive operational efficiency, sustainable growth, and customer-centric innovation."
              delay={0.1}
              className="lg:p-8"
            >
              <motion.p
                className="mt-4 text-muted-foreground"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                We leverage cutting-edge technology and data-driven insights to transform complex challenges into
                streamlined, scalable opportunities, ensuring our clients are future-ready and resilient in an evolving
                market landscape.
              </motion.p>
            </FeatureCard>

            <FeatureCard
              icon={BarChart3}
              title="Our Vision"
              description="To be the trusted digital transformation partner for the energy, banking, and manufacturing sectors, setting new standards for operational excellence, innovation, and sustainable impact."
              delay={0.2}
              className="lg:p-8"
            >
              <motion.p
                className="mt-4 text-muted-foreground"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Our vision is a future where technology not only accelerates business success but also contributes to a
                connected, efficient, and environmentally responsible global economy.
              </motion.p>
            </FeatureCard>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-20 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <SectionHeading
            title="Our Impact in Numbers"
            description="Delivering measurable results for our clients across industries."
            align="center"
          />
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
            <StatsCard value={50} suffix="+" label="Enterprise Clients" delay={0.1} />
            <StatsCard value={200} suffix="+" label="Projects Completed" delay={0.2} />
            <StatsCard value={95} suffix="%" label="Client Retention" delay={0.3} />
            <StatsCard value={30} suffix="M" prefix="£" label="Cost Savings Generated" delay={0.4} />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative py-12 md:py-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <AnimatedBlob className="-right-40 -bottom-40" color="#006644" opacity={0.05} size={500} />
        </div>

        <div className="container relative z-10 px-4 md:px-6">
          <SectionHeading
            title="Our Services"
            description="Comprehensive AI and data solutions tailored to your business needs."
            align="center"
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={Brain}
              title="AI Consulting"
              description="Strategic guidance on implementing AI solutions to solve complex business challenges."
              delay={0.1}
            />
            <FeatureCard
              icon={Database}
              title="Data Analytics"
              description="Transform raw data into actionable insights to drive informed decision-making."
              delay={0.2}
            />
            <FeatureCard
              icon={Cpu}
              title="Machine Learning"
              description="Custom ML models to predict outcomes and optimize business processes."
              delay={0.3}
            />
            <FeatureCard
              icon={Server}
              title="Cloud Solutions"
              description="Scalable cloud infrastructure to support your AI and data initiatives."
              delay={0.4}
            />
            <FeatureCard
              icon={Shield}
              title="Data Security"
              description="Protect your valuable data assets with advanced security measures."
              delay={0.5}
            />
            <FeatureCard
              icon={Zap}
              title="Process Automation"
              description="Streamline operations with intelligent automation of repetitive tasks."
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-12 md:py-20 bg-muted/50">
        <div className="container px-4 md:px-6">
          <SectionHeading
            title="Industries We Serve"
            description="We provide tailored AI and data solutions for leading industries, helping them transform their operations."
            align="center"
          >
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold mt-2">
              <Database className="mr-1 h-3.5 w-3.5" />
              Expertise
            </div>
          </SectionHeading>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
            {[
              {
                title: "Energy",
                description: "Optimizing production forecasting and operational efficiency for energy companies.",
                href: "/industries/energy",
                image: "/placeholder.svg?height=200&width=300",
                delay: 0.1,
              },
              {
                title: "Banking",
                description: "Advanced risk assessment and fraud detection solutions for financial institutions.",
                href: "/industries/banking",
                image: "/placeholder.svg?height=200&width=300",
                delay: 0.2,
              },
              {
                title: "Manufacturing",
                description: "Predictive maintenance and supply chain optimization for manufacturing companies.",
                href: "/industries/manufacturing",
                image: "/placeholder.svg?height=200&width=300",
                delay: 0.3,
              },
            ].map((industry, index) => (
              <motion.div
                key={industry.title}
                className="group relative overflow-hidden rounded-xl border bg-background transition-colors hover:bg-muted/50"
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
                  <p className="mb-4 text-sm text-muted-foreground">{industry.description}</p>
                  <Link
                    href={industry.href}
                    className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                  >
                    Learn More
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center">
            <Button asChild size="lg">
              <Link href="/industries" className="group">
                View All Industries
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="relative py-12 md:py-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <AnimatedBlob className="-left-40 -bottom-40" color="#003366" opacity={0.05} size={500} />
        </div>

        <div className="container relative z-10 px-4 md:px-6">
          <SectionHeading
            title="Our Approach"
            description="A systematic methodology to deliver successful AI and data projects."
            align="center"
          />

          <div className="mx-auto mt-16 max-w-3xl">
            <div className="space-y-12 md:space-y-16">
              <ProcessStep
                step={1}
                title="Discovery & Analysis"
                description="We begin by understanding your business challenges and objectives through in-depth analysis."
                icon={Brain}
                delay={0.1}
              />
              <ProcessStep
                step={2}
                title="Solution Design"
                description="Our experts design a tailored solution that addresses your specific needs and requirements."
                icon={Cpu}
                delay={0.2}
              />
              <ProcessStep
                step={3}
                title="Development & Implementation"
                description="We develop and implement the solution using agile methodologies for optimal results."
                icon={Server}
                delay={0.3}
              />
              <ProcessStep
                step={4}
                title="Testing & Optimization"
                description="Rigorous testing ensures the solution performs as expected, with continuous optimization."
                icon={Shield}
                delay={0.4}
              />
              <ProcessStep
                step={5}
                title="Deployment & Support"
                description="We deploy the solution and provide ongoing support to ensure long-term success."
                icon={Zap}
                delay={0.5}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-20 bg-muted/50">
        <div className="container px-4 md:px-6">
          <SectionHeading
            title="What Our Clients Say"
            description="Hear from the companies we've helped transform with our AI and data solutions."
            align="center"
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <TestimonialCard
              quote="DCG's AI solutions have revolutionized our production forecasting, resulting in significant cost savings and improved efficiency."
              author="Sarah Johnson"
              role="CTO"
              company="Energy Corp"
              delay={0.1}
            />
            <TestimonialCard
              quote="The fraud detection system implemented by DCG has reduced fraudulent transactions by 40%, protecting our customers and our reputation."
              author="Michael Chen"
              role="Head of Security"
              company="Global Bank"
              delay={0.2}
            />
            <TestimonialCard
              quote="Working with DCG has transformed our manufacturing processes. Their predictive maintenance solution has minimized downtime and extended equipment life."
              author="David Williams"
              role="Operations Director"
              company="Manufacturing Inc."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <motion.div
              className="order-2 lg:order-1"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <SectionHeading
                title="Why Choose Us"
                description="What sets Data Consulting Group apart from the competition."
                align="left"
              />

              <div className="mt-8 space-y-6">
                {[
                  {
                    icon: Brain,
                    title: "Industry Expertise",
                    description: "Deep understanding of the energy, banking, and manufacturing sectors.",
                  },
                  {
                    icon: Award,
                    title: "Proven Results",
                    description: "Track record of delivering measurable business outcomes for our clients.",
                  },
                  {
                    icon: Users,
                    title: "Expert Team",
                    description: "Highly skilled data scientists, AI specialists, and industry consultants.",
                  },
                  {
                    icon: Shield,
                    title: "Secure Solutions",
                    description: "Robust security measures to protect your sensitive data and systems.",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="order-1 lg:order-2 relative"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative aspect-video overflow-hidden rounded-xl">
                <Image src="/placeholder.svg?height=400&width=600" alt="Why choose us" fill className="object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />
              <div className="absolute -top-6 -left-6 h-32 w-32 rounded-full bg-secondary/10 blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-12 md:py-20 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <AnimatedBlob className="-right-40 -top-40" color="#006644" opacity={0.1} size={500} />
          <AnimatedBlob className="-left-40 -bottom-40" color="#003366" opacity={0.1} size={500} />
        </div>

        <div className="container relative z-10 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Transform Your Business?
              </h2>
              <p className="mx-auto max-w-[700px] md:text-xl">
                Let's discuss how our AI and data solutions can help your organization thrive in the digital age.
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
                  Get Started Today
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/industries">Explore Industries</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <SectionHeading
            title="Latest Insights"
            description="Stay updated with our latest thoughts on AI, data science, and industry trends."
            align="center"
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "The Future of AI in Energy Production",
                excerpt: "Exploring how artificial intelligence is revolutionizing energy production and distribution.",
                date: "May 15, 2023",
                image: "/placeholder.svg?height=200&width=300",
                delay: 0.1,
              },
              {
                title: "Machine Learning for Fraud Detection",
                excerpt: "How advanced ML algorithms are helping financial institutions combat fraud more effectively.",
                date: "April 28, 2023",
                image: "/placeholder.svg?height=200&width=300",
                delay: 0.2,
              },
              {
                title: "Predictive Maintenance: A Game Changer",
                excerpt: "Why predictive maintenance is transforming manufacturing and reducing operational costs.",
                date: "March 12, 2023",
                image: "/placeholder.svg?height=200&width=300",
                delay: 0.3,
              },
            ].map((post, index) => (
              <motion.div
                key={post.title}
                className="group relative overflow-hidden rounded-xl border bg-background transition-colors hover:bg-muted/50"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: post.delay }}
                whileHover={{ y: -5 }}
              >
                <div className="relative aspect-video overflow-hidden rounded-t-xl">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <p className="mb-2 text-xs text-muted-foreground">{post.date}</p>
                  <h3 className="mb-2 text-xl font-bold">{post.title}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">{post.excerpt}</p>
                  <Link
                    href="/blog"
                    className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                  >
                    Read More
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/blog" className="group">
                View All Articles
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 md:py-20 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl rounded-xl border bg-background p-6 md:p-8 shadow-sm">
            <SectionHeading
              title="Stay Updated"
              description="Subscribe to our newsletter for the latest insights on AI, data science, and industry trends."
              align="center"
            />

            <motion.form
              className="mt-8 flex flex-col gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-1"
                required
              />
              <Button type="submit" className="w-full sm:w-auto">
                Subscribe
              </Button>
            </motion.form>

            <motion.p
              className="mt-4 text-center text-xs text-muted-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
            </motion.p>
          </div>
        </div>
      </section>
    </div>
  )
}
