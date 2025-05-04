"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import AnimatedNumber from "./animated-number"

interface StatsCardProps {
  value: number
  suffix?: string
  prefix?: string
  label: string
  delay?: number
  className?: string
  children?: ReactNode
}

export default function StatsCard({
  value,
  suffix = "",
  prefix = "",
  label,
  delay = 0,
  className = "",
  children,
}: StatsCardProps) {
  return (
    <motion.div
      className={`flex flex-col items-center justify-center space-y-2 rounded-xl border bg-background p-6 text-center ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
    >
      <AnimatedNumber
        value={value}
        suffix={suffix}
        prefix={prefix}
        className="text-4xl font-bold tracking-tighter sm:text-5xl"
      />
      <p className="text-sm font-medium text-muted-foreground md:text-base">{label}</p>
      {children}
    </motion.div>
  )
}
