"use client";

import Link from "next/link";
import Image from "next/image";
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
import FuturisticDataVisualization from "@/components/futuristic-data-visualization";
import FuturisticCard from "@/components/futuristic-card";

import StatsShowcase from "@/components/stats-showcase";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-50 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse animation-delay-4000"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              className="space-y-8 text-center lg:text-left"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-6">
                <motion.div
                  className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  ⚡ Leading AI & Data Science Consultancy
                </motion.div>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="text-gray-900">Transform Your</span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                    Business with AI
                  </span>
                </h1>

                <p className="text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  We help enterprises like BP, Shell, and British Airways
                  leverage cutting-edge AI and machine learning to drive
                  innovation, optimize operations, and achieve breakthrough
                  results.
                </p>
              </div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <Link
                  href="/projects"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Explore Our Projects
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center px-8 py-4 border-2 border-blue-200 text-blue-700 font-semibold rounded-xl hover:border-blue-600 hover:text-blue-800 hover:bg-blue-50 transform hover:scale-105 transition-all duration-200"
                >
                  Get Started
                </Link>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                className="pt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.6 }}
              >
                <p className="text-sm text-gray-500 mb-4">
                  Trusted by industry leaders
                </p>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6">
                  {["BP", "Shell", "British Airways", "Infosys"].map(
                    (client, index) => (
                      <motion.div
                        key={client}
                        className="px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-100"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                      >
                        <span className="font-semibold text-gray-700">
                          {client}
                        </span>
                      </motion.div>
                    )
                  )}
                </div>
              </motion.div>
            </motion.div>

            {/* Right Visual */}
            <motion.div
              className="relative hidden lg:block"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="relative">
                {/* Main Card */}
                <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                        <Brain className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">
                          AI Solutions
                        </h3>
                        <p className="text-sm text-gray-500">
                          Powered by Machine Learning
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {[
                        {
                          icon: Database,
                          label: "Data Analytics",
                          color: "from-blue-500 to-blue-600",
                        },
                        {
                          icon: Cpu,
                          label: "ML Models",
                          color: "from-blue-600 to-blue-700",
                        },
                        {
                          icon: Shield,
                          label: "Security",
                          color: "from-blue-700 to-blue-800",
                        },
                        {
                          icon: Zap,
                          label: "Automation",
                          color: "from-blue-800 to-blue-900",
                        },
                      ].map((item, index) => (
                        <motion.div
                          key={item.label}
                          className="bg-gray-50 rounded-xl p-4 text-center"
                          whileHover={{ y: -5, scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div
                            className={`w-10 h-10 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center mx-auto mb-2`}
                          >
                            <item.icon className="h-5 w-5 text-white" />
                          </div>
                          <p className="text-xs font-medium text-gray-700">
                            {item.label}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <motion.div
                  className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg"
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <BarChart3 className="h-8 w-8 text-white" />
                </motion.div>

                <motion.div
                  className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg"
                  animate={{ y: [0, 10, 0] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <TrendingUp className="h-6 w-6 text-white" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              Why Industry Leaders Choose DCG
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              We're not just another consulting firm. We're your strategic
              partner in the AI revolution, delivering measurable results that
              transform businesses.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "📊",
                title: "Proven Results",
                description:
                  "£30M+ in cost savings delivered across 200+ projects",
                color: "from-blue-500 to-blue-600",
              },
              {
                icon: "🌐",
                title: "Global Expertise",
                description:
                  "Team spanning 3 continents with local market knowledge",
                color: "from-blue-600 to-blue-700",
              },
              {
                icon: "⚡",
                title: "Fast Implementation",
                description: "From concept to deployment in weeks, not months",
                color: "from-blue-700 to-blue-800",
              },
              {
                icon: "🛡️",
                title: "Enterprise Security",
                description: "PCI compliant with bank-level security standards",
                color: "from-blue-800 to-blue-900",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="group text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="relative mb-6">
                  <div
                    className={`w-20 h-20 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <span className="text-3xl">{feature.icon}</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Process Flow */}
          <motion.div
            className="mt-20 bg-gradient-to-r from-gray-50 to-blue-50 rounded-3xl p-8 lg:p-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Our Proven Process
              </h3>
              <p className="text-lg text-gray-600">
                A systematic approach that ensures success in every project
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: "1",
                  title: "Discovery",
                  desc: "Deep dive into your business challenges and objectives",
                  icon: "🔍",
                },
                {
                  step: "2",
                  title: "Strategy",
                  desc: "AI roadmap tailored to your specific goals",
                  icon: "📋",
                },
                {
                  step: "3",
                  title: "Build",
                  desc: "Rapid development and testing with agile methods",
                  icon: "⚙️",
                },
                {
                  step: "4",
                  title: "Deploy",
                  desc: "Seamless rollout with ongoing support",
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
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-lg border-2 border-blue-200 group-hover:border-blue-400 transition-colors duration-300">
                      <span className="text-2xl">{item.icon}</span>
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {item.step}
                    </div>
                  </div>

                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    {item.title}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

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

      {/* Mission & Vision Section */}
      <section className="py-24 bg-gradient-to-r from-gray-50 to-blue-50">
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
      </section>

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
      <StatsShowcase />

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              Our Services
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              Comprehensive AI and data solutions tailored to your business
              needs, delivered with enterprise-grade quality and security.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "AI Consulting",
                description:
                  "Strategic guidance on implementing AI solutions to solve complex business challenges.",
                color: "from-blue-500 to-blue-600",
                features: [
                  "Strategy Development",
                  "ROI Analysis",
                  "Implementation Roadmap",
                ],
              },
              {
                icon: Database,
                title: "Data Analytics",
                description:
                  "Transform raw data into actionable insights to drive informed decision-making.",
                color: "from-blue-600 to-blue-700",
                features: [
                  "Data Mining",
                  "Predictive Analytics",
                  "Visualization",
                ],
              },
              {
                icon: Cpu,
                title: "Machine Learning",
                description:
                  "Custom ML models to predict outcomes and optimize business processes.",
                color: "from-blue-700 to-blue-800",
                features: [
                  "Model Development",
                  "Training & Testing",
                  "Deployment",
                ],
              },
              {
                icon: Server,
                title: "Cloud Solutions",
                description:
                  "Scalable cloud infrastructure to support your AI and data initiatives.",
                color: "from-blue-800 to-blue-900",
                features: ["AWS/Azure", "Scalability", "Security"],
              },
              {
                icon: Shield,
                title: "Data Security",
                description:
                  "Protect your valuable data assets with advanced security measures.",
                color: "from-blue-900 to-blue-950",
                features: ["PCI Compliance", "Encryption", "Access Control"],
              },
              {
                icon: Zap,
                title: "Process Automation",
                description:
                  "Streamline operations with intelligent automation of repetitive tasks.",
                color: "from-blue-950 to-slate-900",
                features: ["Workflow Design", "Integration", "Monitoring"],
              },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <service.icon className="h-8 w-8 text-white" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <div className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center text-sm text-gray-500"
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-24 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              Industries We Serve
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              Our projects span across leading industries, delivering
              transformative AI and data solutions that drive real business
              value and measurable results.
            </motion.p>
            <motion.div
              className="inline-flex items-center rounded-full bg-blue-100 text-blue-800 px-4 py-2 text-sm font-medium mt-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Database className="mr-2 h-4 w-4" />
              Project Expertise
            </motion.div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 max-w-7xl self-center mx-auto lg:grid-cols-4 gap-8">
          {[
            {
              title: "Energy",
              description:
                "Optimizing production forecasting and operational efficiency for energy companies.",
              href: "/industries/energy",
              icon: "⚡",
              color: "from-blue-500 to-blue-600",
              delay: 0.1,
            },
            {
              title: "Retail",
              description:
                "Advanced analytics and AI solutions for retail optimization and customer experience.",
              href: "/industries/retail",
              icon: "📊",
              color: "from-blue-600 to-blue-700",
              delay: 0.15,
            },
            {
              title: "Manufacturing",
              description:
                "Predictive maintenance and supply chain optimization for manufacturing companies.",
              href: "/industries/manufacturing",
              icon: "⚙️",
              color: "from-blue-700 to-blue-800",
              delay: 0.2,
            },
            {
              title: "Banking",
              description:
                "Advanced risk assessment and fraud detection solutions for financial institutions.",
              href: "/industries/banking",
              icon: "💳",
              color: "from-blue-800 to-blue-900",
              delay: 0.25,
            },
          ].map((industry) => (
            <motion.div
              key={industry.title}
              className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: industry.delay }}
              whileHover={{ y: -8 }}
            >
              <div
                className={`w-16 h-16 bg-gradient-to-r ${industry.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <span className="text-2xl">{industry.icon}</span>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-3">
                {industry.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                {industry.description}
              </p>

              <Link
                href={industry.href}
                className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 group-hover:underline"
              >
                Learn More
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link
            href="/industries"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            View All Industries
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-gradient-to-r from-gray-50 to-blue-50">
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
      </section>

      {/* Success Stories Section */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real results from real projects with industry leaders.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                company: "BP & Shell",
                industry: "Energy",
                result: "40% improvement in production forecasting accuracy",
                impact: "£12M+ annual cost savings",
                icon: "⚡",
                delay: 0.1,
              },
              {
                company: "British Airways",
                industry: "Aviation",
                result: "60% reduction in fraud detection time",
                impact: "Enhanced customer security",
                icon: "✈️",
                delay: 0.2,
              },
              {
                company: "Infosys",
                industry: "Manufacturing",
                result: "35% increase in supply chain efficiency",
                impact: "Faster time-to-market",
                icon: "⚙️",
                delay: 0.3,
              },
            ].map((story) => (
              <motion.div
                key={story.company}
                className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: story.delay }}
                whileHover={{ y: -5 }}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{story.icon}</span>
                    <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                      {story.industry}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-blue-600 mb-2">
                      {story.company}
                    </h3>
                    <p className="text-sm text-slate-600 mb-3">
                      {story.result}
                    </p>
                    <div className="text-sm font-semibold text-blue-700">
                      {story.impact}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from the companies we've helped transform with our AI and
              data solutions.
            </p>
          </div>

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
                <div className="mt-4 text-sm text-slate-500">
                  {testimonial.company}
                </div>
              </FuturisticCard>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="py-24 bg-gradient-to-r from-gray-50 to-blue-50">
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
      </section>

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
