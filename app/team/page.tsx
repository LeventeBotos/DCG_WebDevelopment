"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  Database,
  Cpu,
  MapPin,
  Globe,
  GraduationCap,
  Briefcase,
  Linkedin,
  Mail,
  Github,
  Zap,
  Shield,
  BarChart3,
  Users,
} from "lucide-react";
import { FuturisticButton } from "@/components/futuristic-button";
import FuturisticCard from "@/components/futuristic-card";
import FuturisticSection from "@/components/futuristic-section";
import FuturisticHeading from "@/components/futuristic-heading";

export default function TeamPage() {
  const teamMembers = [
    {
      name: "Godspower",
      role: "AI Consultant & Data Scientist",
      location: "London, UK",
      education: "Advanced AI & Machine Learning",
      expertise: [
        "Consulting & Strategy",
        "BP & Shell Projects",
        "Deep Learning",
        "Production Forecasting",
        "Energy Sector AI",
      ],
      skills: ["Python", "TensorFlow", "PyTorch", "Data Science", "Consulting"],
      image: "/placeholder-user.jpg",
      delay: 0.1,
      glowColor: "rgba(0, 51, 102, 0.3)",
      linkedin: "#",
      email: "godspower@dataconsulting-group.com",
      github: "#",
    },
    {
      name: "Mutiah",
      role: "AI Engineer",
      location: "Nigeria",
      education: "Electrical Engineering",
      expertise: [
        "AI Engineering",
        "Machine Learning",
        "Electrical Systems",
        "Data Processing",
        "Model Development",
      ],
      skills: [
        "Python",
        "AI/ML",
        "Electrical Engineering",
        "Data Analysis",
        "Automation",
      ],
      image: "/placeholder-user.jpg",
      delay: 0.2,
      glowColor: "rgba(0, 102, 68, 0.3)",
      linkedin: "#",
      email: "mutiah@dataconsulting-group.com",
      github: "#",
    },
    {
      name: "Govind",
      role: "Python Developer",
      location: "India",
      education: "Computer Science",
      expertise: [
        "Python Development",
        "Backend Systems",
        "API Development",
        "Database Design",
        "System Architecture",
      ],
      skills: ["Python", "Django", "FastAPI", "PostgreSQL", "AWS"],
      image: "/placeholder-user.jpg",
      delay: 0.3,
      glowColor: "rgba(0, 51, 102, 0.3)",
      linkedin: "#",
      email: "govind@dataconsulting-group.com",
      github: "#",
    },
  ];

  const expertiseAreas = [
    {
      title: "AI Consulting",
      description:
        "Strategic guidance on implementing AI solutions for complex business challenges.",
      icon: Brain,
      delay: 0.1,
      glowColor: "rgba(0, 51, 102, 0.3)",
    },
    {
      title: "Machine Learning",
      description:
        "Custom ML models for prediction, optimization, and process automation.",
      icon: Cpu,
      delay: 0.2,
      glowColor: "rgba(0, 102, 68, 0.3)",
    },
    {
      title: "Data Analytics",
      description:
        "Transform raw data into actionable insights for informed decision-making.",
      icon: BarChart3,
      delay: 0.3,
      glowColor: "rgba(0, 51, 102, 0.3)",
    },
    {
      title: "Cloud Solutions",
      description:
        "Scalable cloud infrastructure to support AI and data initiatives.",
      icon: Database,
      delay: 0.4,
      glowColor: "rgba(0, 102, 68, 0.3)",
    },
    {
      title: "Security & Compliance",
      description:
        "PCI compliance and data security for sensitive information handling.",
      icon: Shield,
      delay: 0.5,
      glowColor: "rgba(0, 51, 102, 0.3)",
    },
    {
      title: "Process Automation",
      description: "Intelligent automation of repetitive tasks and workflows.",
      icon: Zap,
      delay: 0.6,
      glowColor: "rgba(0, 102, 68, 0.3)",
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
                Meet Our
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary">
                  Team
                </span>
              </h1>
              <p className="max-w-[600px] text-slate-600 md:text-xl">
                Our diverse team of AI experts, data scientists, and engineers
                brings together global expertise to deliver innovative solutions
                that transform industries.
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
                <Link href="/contact">Work With Us</Link>
              </FuturisticButton>
              <FuturisticButton variant="outline">
                <Link href="/projects">View Projects</Link>
              </FuturisticButton>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative"
          >
            {/* Animated team visualization */}
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
                    <Users className="h-16 w-16 text-primary mx-auto" />
                  </motion.div>
                  <p className="text-lg font-semibold text-primary">
                    Global Team
                  </p>
                  <p className="text-sm text-slate-600">AI Experts Worldwide</p>
                </div>
              </div>

              {/* Floating team elements */}
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
                <Globe className="h-6 w-6 text-primary" />
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

      {/* Team Members Section */}
      <FuturisticSection className="py-20">
        <FuturisticHeading
          title="Our Team"
          description="Meet the talented individuals behind our innovative AI and data science solutions."
          align="center"
          withGradient
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: member.delay }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <FuturisticCard
                icon={Brain}
                title={member.name}
                description={member.role}
                delay={member.delay}
                glowColor={member.glowColor}
                className="h-full"
              >
                <div className="mt-6 space-y-4">
                  {/* Profile Image */}
                  <div className="flex justify-center">
                    <div className="relative h-24 w-24 rounded-full overflow-hidden border-4 border-primary/20">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Location & Education */}
                  <div className="space-y-2 text-center">
                    <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
                      <MapPin className="h-4 w-4" />
                      {member.location}
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
                      <GraduationCap className="h-4 w-4" />
                      {member.education}
                    </div>
                  </div>

                  {/* Expertise */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-primary">
                      Expertise:
                    </h4>
                    <ul className="space-y-1">
                      {member.expertise.slice(0, 3).map((skill, index) => (
                        <li
                          key={index}
                          className="text-xs text-slate-600 flex items-center"
                        >
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Skills */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-primary">
                      Skills:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {member.skills.slice(0, 3).map((skill, index) => (
                        <span
                          key={index}
                          className="inline-block px-2 py-1 text-xs bg-primary/10 text-primary rounded-md"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contact Links */}
                  <div className="flex justify-center gap-2 pt-2">
                    <motion.a
                      href={member.linkedin}
                      className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Linkedin className="h-4 w-4" />
                    </motion.a>
                    <motion.a
                      href={`mailto:${member.email}`}
                      className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Mail className="h-4 w-4" />
                    </motion.a>
                    <motion.a
                      href={member.github}
                      className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github className="h-4 w-4" />
                    </motion.a>
                  </div>
                </div>
              </FuturisticCard>
            </motion.div>
          ))}
        </div>
      </FuturisticSection>

      {/* Expertise Areas Section */}
      <FuturisticSection className="py-20 bg-slate-50/50 backdrop-blur-sm">
        <FuturisticHeading
          title="Areas of Expertise"
          description="Our team brings together diverse skills and experience across multiple domains."
          align="center"
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {expertiseAreas.map((area) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: area.delay }}
              whileHover={{ y: -5 }}
            >
              <FuturisticCard
                icon={area.icon}
                title={area.title}
                description={area.description}
                delay={area.delay}
                glowColor={area.glowColor}
              />
            </motion.div>
          ))}
        </div>
      </FuturisticSection>

      {/* Global Presence Section */}
      <FuturisticSection
        withBlobs
        blobConfig={{
          topLeft: true,
          bottomRight: true,
          colors: ["#003366", "#006644"],
        }}
      >
        <FuturisticHeading
          title="Global Reach"
          description="Our team spans across continents, bringing diverse perspectives and local expertise to every project."
          align="center"
          withGradient
        />

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {[
            {
              location: "London, UK",
              description:
                "European headquarters and consulting hub for energy sector projects.",
              icon: Briefcase,
              delay: 0.1,
            },
            {
              location: "Nigeria",
              description:
                "AI engineering center specializing in machine learning and automation.",
              icon: Brain,
              delay: 0.2,
            },
            {
              location: "India",
              description:
                "Development center for scalable backend systems and data platforms.",
              icon: Cpu,
              delay: 0.3,
            },
          ].map((office) => (
            <motion.div
              key={office.location}
              className="text-center space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: office.delay }}
            >
              <motion.div
                className="mx-auto p-4 rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <office.icon className="h-8 w-8 text-primary" />
              </motion.div>
              <h3 className="text-xl font-bold text-primary">
                {office.location}
              </h3>
              <p className="text-slate-600">{office.description}</p>
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
              Ready to Work With Our Team?
            </h2>
            <p className="mx-auto max-w-[700px] text-slate-600 md:text-xl">
              Let's discuss how our global team of experts can help transform
              your business with AI and data science.
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
              <Link href="/contact">Get in Touch</Link>
            </FuturisticButton>
            <FuturisticButton variant="outline">
              <Link href="/projects">View Our Work</Link>
            </FuturisticButton>
          </motion.div>
        </div>
      </FuturisticSection>
    </div>
  );
}
