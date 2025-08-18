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

export default function StatsShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [counts, setCounts] = useState<{ [key: string]: number }>({});

  const technologies = [
    { name: "Python", icon: Database, delay: 0.1 },
    { name: "TensorFlow", icon: Brain, delay: 0.2 },
    { name: "AWS", icon: Cloud, delay: 0.3 },
    { name: "Neo4j", icon: Network, delay: 0.4 },
    { name: "React", icon: Zap, delay: 0.5 },
    { name: "PostgreSQL", icon: Shield, delay: 0.6 },
  ];

  return (
    <div ref={ref} className="">
      <div className="container px-4 md:px-6">
        {/* Main Stats Grid */}

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
          <p className="max-w-[600px] mx-auto opacity-75">
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
      </div>
    </div>
  );
}
