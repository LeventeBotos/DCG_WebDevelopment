"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface FuturisticHeadingProps {
  title: string | ReactNode
  description?: string | ReactNode
  align?: "left" | "center" | "right"
  className?: string
  titleClassName?: string
  descriptionClassName?: string
  children?: ReactNode
  withGradient?: boolean
  gradientFrom?: string
  gradientVia?: string
  gradientTo?: string
  withLine?: boolean
  lineColor?: string
  staggerChildren?: boolean
}

export default function FuturisticHeading({
  title,
  description,
  align = "center",
  className = "",
  titleClassName = "",
  descriptionClassName = "",
  children,
  withGradient = false,
  gradientFrom = "#003366",
  gradientVia = "#006644",
  gradientTo = "#003366",
  withLine = true,
  lineColor = "rgba(0, 51, 102, 0.5)",
  staggerChildren = true,
}: FuturisticHeadingProps) {
  const alignmentClasses = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  }

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const descriptionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1 },
  }

  return (
    <motion.div
      className={cn("flex flex-col space-y-4", alignmentClasses[align], className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ staggerChildren: staggerChildren ? 0.2 : 0 }}
    >
      <motion.h2
        className={cn(
          "text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl",
          withGradient && "bg-clip-text text-transparent bg-gradient-to-r",
          titleClassName,
        )}
        style={
          withGradient
            ? {
                backgroundImage: `linear-gradient(to right, ${gradientFrom}, ${gradientVia}, ${gradientTo})`,
              }
            : undefined
        }
        variants={titleVariants}
      >
        {title}
      </motion.h2>

      {withLine && (
        <motion.div
          className={cn("h-1 rounded-full", align === "center" ? "w-24 mx-auto" : "w-24")}
          style={{ background: lineColor }}
          variants={lineVariants}
          transition={{ duration: 0.5 }}
        />
      )}

      {description && (
        <motion.p
          className={cn(
            "max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed",
            descriptionClassName,
          )}
          variants={descriptionVariants}
        >
          {description}
        </motion.p>
      )}

      {children && (
        <motion.div variants={descriptionVariants} transition={{ duration: 0.5, delay: 0.2 }}>
          {children}
        </motion.div>
      )}
    </motion.div>
  )
}
