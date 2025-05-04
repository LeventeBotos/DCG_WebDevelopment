"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface AnimatedIconProps {
  icon: LucideIcon
  color?: string
  size?: number
  className?: string
  delay?: number
}

export default function AnimatedIcon({
  icon: Icon,
  color = "currentColor",
  size = 24,
  className = "",
  delay = 0,
}: AnimatedIconProps) {
  return (
    <motion.div
      className={`inline-flex items-center justify-center ${className}`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: delay,
      }}
    >
      <Icon style={{ color }} size={size} />
    </motion.div>
  )
}
