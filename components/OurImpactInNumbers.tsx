import { motion, useInView } from "framer-motion";
import React from "react";
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
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import SectionTitle from "./SectionTitle";

interface StatItem {
  value: string;
  label: string;
  icon: any;
  delay: number;
  suffix?: string;
  prefix?: string;
  isNumber?: boolean;
}
const stats: StatItem[] = [
  {
    value: "50",
    label: "Enterprise Clients",
    icon: Users,
    delay: 0.1,
    suffix: "+",
    isNumber: true,
  },
  {
    value: "200",
    label: "Projects Completed",
    icon: Target,
    delay: 0.2,
    suffix: "+",
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
    label: "Cost Savings Generated",
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
    value: "500+",
    label: "WhatsApp Chats",
    icon: MessageCircle,
    delay: 0.6,
    suffix: "+",
    isNumber: true,
  },
  {
    value: "24",
    label: "Support Availability",
    icon: Clock,
    delay: 0.7,
    suffix: "/7",
    isNumber: true,
  },
  {
    value: "3",
    label: "Countries Involved",
    icon: Globe,
    delay: 0.8,
    isNumber: true,
  },
];

const OurImpactInNumbers = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [counts, setCounts] = useState<{ [key: string]: number }>({});

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
    <section ref={ref}>
      <SectionTitle
        title="Our Impact in Numbers"
        subtitle="Delivering measurable results and building lasting relationships with clients worldwide."
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="text-center "
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: stat.delay }}
            whileHover={{ y: -5 }}
          >
            <motion.div
              className="mx-auto border p-4 rounded-lg shadow-lg w-16 h-16 flex items-center justify-center mb-4  transition-colors"
              //   whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <stat.icon className="h-8 w-8 " />
            </motion.div>

            <motion.div
              className="text-3xl font-bold mb-2"
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

            <p className="text-sm font-medium opacity-75 leading-tight">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default OurImpactInNumbers;
