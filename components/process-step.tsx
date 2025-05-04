"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import AnimatedIcon from "./animated-icon"

interface ProcessStepProps {
  step: number
  title: string
  description: string
  icon: LucideIcon
  delay?: number
  iconColor?: string
  className?: string
  children?: ReactNode
}

export default function ProcessStep({
  step,
  title,
  description,
  icon,
  delay = 0,
  iconColor = "#003366",
  className = "",
  children,
}: ProcessStepProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="flex items-start gap-4">
        <div className="relative">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <span className="text-sm font-bold">{step}</span>
          </div>
          {step > 1 && (
            <motion.div
              className="absolute -top-[calc(100%+0.5rem)] left-1/2 h-16 w-0.5 -translate-x-1/2 bg-primary/20"
              initial={{ scaleY: 0, originY: 1 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: delay + 0.2 }}
            />
          )}
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <AnimatedIcon icon={icon} color={iconColor} size={20} delay={delay + 0.1} />
            <h3 className="text-xl font-bold">{title}</h3>
          </div>
          <p className="text-muted-foreground">{description}</p>
          {children}
        </div>
      </div>
    </motion.div>
  )
}
