"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import FuturisticBlob from "./futuristic-blob"

interface FuturisticSectionProps {
  children: ReactNode
  className?: string
  withBlobs?: boolean
  blobConfig?: {
    topRight?: boolean
    bottomLeft?: boolean
    topLeft?: boolean
    bottomRight?: boolean
    colors?: string[]
  }
  withGradient?: boolean
  gradientFrom?: string
  gradientTo?: string
  withOverlay?: boolean
  overlayOpacity?: number
}

export default function FuturisticSection({
  children,
  className = "",
  withBlobs = false,
  blobConfig = {
    topRight: true,
    bottomLeft: true,
    colors: ["#003366", "#006644"],
  },
  withGradient = false,
  gradientFrom = "rgba(0, 51, 102, 0.05)",
  gradientTo = "rgba(0, 102, 68, 0.05)",
  withOverlay = false,
  overlayOpacity = 0.05,
}: FuturisticSectionProps) {
  return (
    <section className={cn("relative py-16 md:py-24 overflow-hidden", className)}>
      {/* Background blobs */}
      {withBlobs && (
        <>
          {blobConfig.topRight && (
            <FuturisticBlob
              className="-right-40 -top-40"
              color={blobConfig.colors?.[0] || "#003366"}
              opacity={0.05}
              size={600}
              blur={80}
            />
          )}
          {blobConfig.bottomLeft && (
            <FuturisticBlob
              className="-left-40 -bottom-40"
              color={blobConfig.colors?.[1] || "#006644"}
              opacity={0.05}
              size={600}
              blur={80}
            />
          )}
          {blobConfig.topLeft && (
            <FuturisticBlob
              className="-left-40 -top-40"
              color={blobConfig.colors?.[0] || "#003366"}
              opacity={0.05}
              size={600}
              blur={80}
            />
          )}
          {blobConfig.bottomRight && (
            <FuturisticBlob
              className="-right-40 -bottom-40"
              color={blobConfig.colors?.[1] || "#006644"}
              opacity={0.05}
              size={600}
              blur={80}
            />
          )}
        </>
      )}

      {/* Background gradient */}
      {withGradient && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
          }}
        />
      )}

      {/* Overlay */}
      {withOverlay && (
        <div className="absolute inset-0 pointer-events-none bg-black" style={{ opacity: overlayOpacity }} />
      )}

      {/* Content */}
      <motion.div
        className="container relative z-10 px-4 md:px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </section>
  )
}
