"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface FuturisticCardProps {
  icon?: LucideIcon
  title: string
  description: string
  delay?: number
  iconColor?: string
  className?: string
  children?: ReactNode
  glowColor?: string
  hoverEffect?: boolean
}

export default function FuturisticCard({
  icon: Icon,
  title,
  description,
  delay = 0,
  iconColor = "#003366",
  className = "",
  children,
  glowColor = "rgba(0, 51, 102, 0.3)",
  hoverEffect = true,
}: FuturisticCardProps) {
  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 transition-all",
        hoverEffect && "hover:-translate-y-1 hover:shadow-lg",
        className,
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="relative z-10 space-y-4">
        {Icon && (
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
            <Icon className="h-6 w-6" style={{ color: iconColor }} />
          </div>
        )}
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
        {children}
      </div>

      {/* Glow effect */}
      <div
        className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full blur-3xl"
        style={{ background: glowColor, opacity: 0.4 }}
      />

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />

      {/* Animated border effect */}
      <div className="absolute inset-0 rounded-xl overflow-hidden">
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-700">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]" />
          <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite_0.3s]" />
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite_0.5s]" />
          <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite_0.7s]" />
        </div>
      </div>
    </motion.div>
  )
}
