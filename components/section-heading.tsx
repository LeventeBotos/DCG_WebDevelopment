"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface SectionHeadingProps {
  title: string
  description?: string
  align?: "left" | "center" | "right"
  className?: string
  children?: ReactNode
}

export default function SectionHeading({
  title,
  description,
  align = "center",
  className = "",
  children,
}: SectionHeadingProps) {
  const alignmentClasses = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  }

  return (
    <motion.div
      className={`flex flex-col ${alignmentClasses[align]} space-y-4 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{title}</h2>
      {description && (
        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          {description}
        </p>
      )}
      {children}
    </motion.div>
  )
}
