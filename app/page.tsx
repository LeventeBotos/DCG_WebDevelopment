"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Brain,
  Database,
  Zap,
  Shield,
  Cpu,
  Server,
  TrendingUp,
} from "lucide-react";
import { FuturisticButton } from "@/components/futuristic-button";
import FuturisticCard from "@/components/futuristic-card";
import StatsShowcase from "@/components/statsShowcase";
import Hero from "../components/Hero";
import WhyUs from "@/components/WhyUs";
import OurProcess from "@/components/OurProcess";
import OurImpactInNumbers from "@/components/OurImpactInNumbers";
import ContactStats from "@/components/ContactStats";
import Services from "@/components/Services";
import Industries from "@/components/Industries";
import SuccessStories from "@/components/SuccessStories";
import { WorldMap } from "@/components/WorldMap";
import { AnimatedTestimonials } from "@/components/AnimatedTestimonials";
import { InfiniteMovingCards } from "@/components/InfiniteScrollingCards";
import SectionTitle from "@/components/SectionTitle";

const testimonials = [
  {
    quote:
      "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
    name: "Sarah Chen",
    title: "Title",
    designation: "Product Manager at TechFlow",
    src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
    name: "Michael Rodriguez",
    title: "Title",
    designation: "CTO at InnovateSphere",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
    name: "Emily Watson",
    title: "Title",
    designation: "Operations Director at CloudScale",
    src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
    name: "James Kim",
    title: "Title",
    designation: "Engineering Lead at DataPro",
    src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
    name: "Lisa Thompson",
    title: "Title",
    designation: "VP of Technology at FutureNet",
    src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-20 min-h-screen">
      <Hero />
      <WhyUs />
      <OurProcess />
      <OurImpactInNumbers />
      {/* <ContactStats /> */}
      <Services />

      <SectionTitle
        title="Our Team Spans the Globe"
        subtitle="Connecting continents with innovative solutions."
      />
      <WorldMap
        dots={[
          {
            start: { lat: 51.5074, lng: -0.1278 }, // London
            end: { lat: 6.5244, lng: 3.3792 }, // Lagos, Nigeria
          },
          {
            start: { lat: 51.5074, lng: -0.1278 }, // London
            end: { lat: 28.6139, lng: 77.209 }, // New Delhi
          },
          {
            start: { lat: 51.5074, lng: -0.1278 }, // London
            end: { lat: 47.4979, lng: 19.0402 }, // Budapest
          },
        ]}
      />
      <Industries />
      <SuccessStories />
      <SectionTitle
        title="What Our Clients Say"
        subtitle="Hear from industry leaders who trust us with their digital transformation."
      />
      <AnimatedTestimonials testimonials={testimonials} />

      <InfiniteMovingCards items={testimonials} />

      {/* Clients Section */}
      {/* <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              Trusted by Industry Leaders
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              We work with some of the most innovative companies across various
              sectors, delivering AI solutions that drive real business value.
            </motion.p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {[
              { name: "BP", industry: "Energy", logo: "⚡" },
              { name: "Shell", industry: "Energy", logo: "🔋" },
              { name: "British Airways", industry: "Aviation", logo: "✈️" },
              { name: "Infosys", industry: "Technology", logo: "💻" },
              { name: "Intel", industry: "Technology", logo: "🔌" },
            ].map((client, index) => (
              <motion.div
                key={client.name}
                className="group text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 border border-gray-100">
                  <div className="text-2xl mb-3 text-blue-600">
                    {client.logo}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {client.name}
                  </h3>
                  <p className="text-sm text-gray-500">{client.industry}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}
      {/* <section className="py-24 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
                We leverage cutting-edge technology and data-driven insights to
                transform complex challenges into streamlined, scalable
                opportunities, ensuring our clients are future-ready and
                resilient in an evolving market landscape.
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
                Our vision is a future where technology not only accelerates
                business success but also contributes to a connected, efficient,
                and environmentally responsible global economy.
              </motion.p>
            </FuturisticCard>
          </div>
        </div>
      </section> */}
      {/* Technology Capabilities Section */}
      {/* <section className="py-24 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Technology Stack
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive technology capabilities powering digital
              transformation across industries.
            </p>
          </div>

          <div className="mt-12 flex justify-center">
            <motion.div
              className="relative max-w-4xl"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src="/images/dcg-services-overview.png"
                alt="DCG Technology Stack Overview"
                width={800}
                height={600}
                className="rounded-xl border border-gray-200 bg-white p-4 shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section> */}
      {/* Stats Showcase */}
      {/* <StatsShowcase /> */}
      {/* Services Section */}
      {/* Industries Section */}
      {/* Process Section */}
      {/* <section className="py-24 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Approach
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A systematic methodology to deliver successful AI and data
              projects.
            </p>
          </div>
        </div>

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
                delay: 0.15,
              },
              {
                step: 3,
                title: "Development & Implementation",
                description:
                  "We develop and implement the solution using agile methodologies for optimal results.",
                icon: Server,
                delay: 0.2,
              },
              {
                step: 4,
                title: "Testing & Optimization",
                description:
                  "Rigorous testing ensures the solution performs as expected, with continuous optimization.",
                icon: Shield,
                delay: 0.25,
              },
              {
                step: 5,
                title: "Deployment & Support",
                description:
                  "We deploy the solution and provide ongoing support to ensure long-term success.",
                icon: Zap,
                delay: 0.3,
              },
            ].map((step) => (
              <motion.div
                key={step.step}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: step.delay }}
              >
                <div className="flex items-start gap-6">
                  <div className="relative">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                      <span className="text-sm font-bold">{step.step}</span>
                    </div>
                    {step.step > 1 && (
                      <motion.div
                        className="absolute -top-[calc(100%+0.5rem)] left-1/2 h-16 w-0.5 -translate-x-1/2 bg-gradient-to-b from-blue-500/20 to-blue-600/20"
                        initial={{ scaleY: 0, originY: 1 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: step.delay + 0.2 }}
                      />
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <step.icon className="h-5 w-5 text-blue-600" />
                      <h3 className="text-xl font-bold">{step.title}</h3>
                    </div>
                    <p className="text-slate-600">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}
      {/* Success Stories Section */}
      {/* Testimonials Section */}

      {/* Quick Start Section */}
      {/* <section className="py-24 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              className="text-3xl font-bold tracking-tight sm:text-4xl mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
            >
              Get Started in 3 Simple Steps
            </motion.h2>
            <motion.p
              className="text-lg text-slate-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              Transform your business with AI in weeks, not months
            </motion.p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: "1",
                title: "Free Consultation",
                description:
                  "30-minute call to understand your challenges and goals",
                action: "Book Now",
                href: "/contact",
                icon: "📋",
              },
              {
                step: "2",
                title: "AI Strategy Session",
                description: "Deep dive into your business processes and data",
                action: "Learn More",
                href: "/services",
                icon: "📊",
              },
              {
                step: "3",
                title: "Project Kickoff",
                description: "Start building your AI solution within 2 weeks",
                action: "Get Started",
                href: "/projects",
                icon: "📤",
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                className="text-center group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
                    {item.step}
                  </div>
                  <span className="absolute -top-2 -right-2 text-3xl">
                    {item.icon}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-blue-600 mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-600 mb-4">{item.description}</p>

                <FuturisticButton
                  variant="outline"
                  size="sm"
                  className="group"
                  icon={
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  }
                  iconPosition="right"
                >
                  <Link href={item.href}>{item.action}</Link>
                </FuturisticButton>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}
      {/* CTA Section */}
      {/* <section className="py-24 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Ready to Transform Your Business?
              </h2>
              <p className="mx-auto max-w-[700px] text-white/80 md:text-xl">
                Let's discuss how our AI and data solutions can help your
                organization thrive in the digital age.
              </p>
            </motion.div>
            <motion.div
              className="flex flex-col gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <FuturisticButton
                variant="secondary"
                className="group"
                icon={
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                }
                iconPosition="right"
              >
                <Link href="/contact">Get Started Today</Link>
              </FuturisticButton>
              <FuturisticButton variant="outline">
                <Link href="/projects">View Our Projects</Link>
              </FuturisticButton>
            </motion.div>
          </div>
        </div>
      </section> */}
    </div>
  );
}
