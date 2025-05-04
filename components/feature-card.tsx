"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import AnimatedIcon from "./animated-icon"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  delay?: number
  iconColor?: string
  className?: string
  children?: ReactNode
}

export default function FeatureCard({
  icon,
  title,
  description,
  delay = 0,
  iconColor = "#003366",
  className = "",
  children,
}: FeatureCardProps) {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-xl border bg-background p-6 shadow-sm transition-all hover:shadow-md ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
    >
      <div className="space-y-4">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <AnimatedIcon icon={icon} color={iconColor} size={24} delay={delay} />
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
        {children}
      </div>
      <div className="absolute -bottom-2 -right-2 h-24 w-24 rounded-full bg-primary/5 blur-2xl" />
    </motion.div>
  )
}
