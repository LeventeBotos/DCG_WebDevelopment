"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface AnimatedGradientTextProps {
  children: ReactNode
  from?: string
  via?: string
  to?: string
  className?: string
  animate?: boolean
}

export default function AnimatedGradientText({
  children,
  from = "#003366",
  via = "#006644",
  to = "#003366",
  className = "",
  animate = true,
}: AnimatedGradientTextProps) {
  return (
    <motion.span
      className={`inline-block bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: `linear-gradient(90deg, ${from}, ${via}, ${to})`,
        backgroundSize: animate ? "200% 100%" : "100% 100%",
      }}
      animate={
        animate
          ? {
              backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
            }
          : undefined
      }
      transition={
        animate
          ? {
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }
          : undefined
      }
    >
      {children}
    </motion.span>
  )
}
