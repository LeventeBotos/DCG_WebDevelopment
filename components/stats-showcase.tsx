"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Users,
  Globe,
  TrendingUp,
  Award,
  Mail,
  MessageCircle,
  Phone,
  Clock,
  Target,
  Zap,
  Shield,
  Database,
  Brain,
  Cloud,
  Network,
} from "lucide-react";

interface StatItem {
  value: string;
  label: string;
  icon: any;
  delay: number;
  suffix?: string;
  prefix?: string;
  isNumber?: boolean;
}

export default function StatsShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [counts, setCounts] = useState<{ [key: string]: number }>({});

  const stats: StatItem[] = [
    {
      value: "50",
      label: "Enterprise Clients",
      icon: Users,
      delay: 0.1,
      isNumber: true,
    },
    {
      value: "200",
      label: "Projects Completed",
      icon: Target,
      delay: 0.2,
      isNumber: true,
    },
    {
      value: "95",
      label: "Client Satisfaction %",
      icon: Award,
      delay: 0.3,
      suffix: "%",
      isNumber: true,
    },
    {
      value: "30",
      label: "Million £ Saved",
      icon: TrendingUp,
      delay: 0.4,
      prefix: "£",
      suffix: "M+",
      isNumber: true,
    },
    {
      value: "1000",
      label: "Emails Responded",
      icon: Mail,
      delay: 0.5,
      suffix: "+",
      isNumber: true,
    },
    {
      value: "500",
      label: "WhatsApp Chats",
      icon: MessageCircle,
      delay: 0.6,
      suffix: "+",
      isNumber: true,
    },
    {
      value: "24",
      label: "Hours Support",
      icon: Clock,
      delay: 0.7,
      suffix: "/7",
      isNumber: true,
    },
    {
      value: "3",
      label: "Global Offices",
      icon: Globe,
      delay: 0.8,
      isNumber: true,
    },
  ];

  const technologies = [
    { name: "Python", icon: Database, delay: 0.1 },
    { name: "TensorFlow", icon: Brain, delay: 0.2 },
    { name: "AWS", icon: Cloud, delay: 0.3 },
    { name: "Neo4j", icon: Network, delay: 0.4 },
    { name: "React", icon: Zap, delay: 0.5 },
    { name: "PostgreSQL", icon: Shield, delay: 0.6 },
  ];

  useEffect(() => {
    if (isInView) {
      stats.forEach((stat) => {
        if (stat.isNumber) {
          const target = parseInt(stat.value);
          const duration = 2000;
          const increment = target / (duration / 16);
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            setCounts((prev) => ({
              ...prev,
              [stat.label]: Math.floor(current),
            }));
          }, 16);

          return () => clearInterval(timer);
        }
      });
    }
  }, [isInView]);

  return (
    <div ref={ref} className="py-20 bg-gradient-to-br from-slate-50 to-white">
      <div className="container px-4 md:px-6">
        {/* Main Stats Grid */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
            Our Impact in Numbers
          </h2>
          <p className="max-w-[700px] mx-auto text-slate-600 md:text-xl">
            Delivering measurable results and building lasting relationships
            with clients worldwide.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: stat.delay }}
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="mx-auto p-4 rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <stat.icon className="h-8 w-8 text-primary" />
              </motion.div>

              <motion.div
                className="text-3xl font-bold text-primary mb-2"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: stat.delay + 0.2 }}
              >
                {stat.isNumber ? (
                  <>
                    {stat.prefix || ""}
                    {counts[stat.label] || 0}
                    {stat.suffix || ""}
                  </>
                ) : (
                  stat.value
                )}
              </motion.div>

              <p className="text-sm font-medium text-slate-600 leading-tight">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Technology Stack */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold tracking-tight sm:text-3xl mb-4">
            Technologies We Master
          </h3>
          <p className="max-w-[600px] mx-auto text-slate-600">
            Our expertise spans across cutting-edge technologies and frameworks.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 mb-16">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              className="text-center group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: tech.delay }}
              whileHover={{ y: -3 }}
            >
              <motion.div
                className="mx-auto p-3 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 group-hover:border-primary/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <tech.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-xs font-medium text-slate-700">
                  {tech.name}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Contact Statistics */}
        <motion.div
          className="bg-gradient-to-r from-primary to-primary/90 rounded-2xl p-8 md:p-12 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold tracking-tight sm:text-3xl mb-4">
              Always Here to Help
            </h3>
            <p className="max-w-[600px] mx-auto text-white/80">
              Our team is available across multiple time zones to provide
              support when you need it most.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Response Time",
                value: "< 2 hours",
                description: "Average response time for urgent inquiries",
                icon: Clock,
                delay: 0.1,
              },
              {
                title: "Support Hours",
                value: "24/7",
                description: "Round-the-clock support availability",
                icon: Shield,
                delay: 0.2,
              },
              {
                title: "Global Reach",
                value: "3 Continents",
                description: "Team members across Europe, Africa, and Asia",
                icon: Globe,
                delay: 0.3,
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: item.delay }}
              >
                <motion.div
                  className="mx-auto p-3 rounded-full bg-white/10 w-16 h-16 flex items-center justify-center mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <item.icon className="h-8 w-8 text-white" />
                </motion.div>
                <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                <div className="text-2xl font-bold mb-2">{item.value}</div>
                <p className="text-sm text-white/80">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
