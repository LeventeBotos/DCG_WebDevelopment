"use client"

import type { ReactNode } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Quote } from "lucide-react"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  company: string
  image?: string
  delay?: number
  className?: string
  children?: ReactNode
}

export default function TestimonialCard({
  quote,
  author,
  role,
  company,
  image = "/placeholder.svg?height=100&width=100",
  delay = 0,
  className = "",
  children,
}: TestimonialCardProps) {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-xl border bg-background p-6 shadow-sm ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
    >
      <div className="mb-4">
        <Quote className="h-8 w-8 text-primary/40" />
      </div>
      <p className="mb-6 text-muted-foreground italic">{quote}</p>
      <div className="flex items-center gap-4">
        <div className="relative h-12 w-12 overflow-hidden rounded-full">
          <Image src={image || "/placeholder.svg"} alt={author} fill className="object-cover" />
        </div>
        <div>
          <p className="font-semibold">{author}</p>
          <p className="text-sm text-muted-foreground">
            {role}, {company}
          </p>
        </div>
      </div>
      {children}
    </motion.div>
  )
}
