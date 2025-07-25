"use client"

import { useRef } from "react"
import { motion } from "framer-motion"

interface FuturisticBlobProps {
  className?: string
  color?: string
  size?: number
  speed?: number
  opacity?: number
  blur?: number
}

export default function FuturisticBlob({
  className = "",
  color = "#003366",
  size = 400,
  speed = 20,
  opacity = 0.3,
  blur = 60,
}: FuturisticBlobProps) {
  const blobRef = useRef<SVGSVGElement>(null)

  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        filter: `blur(${blur}px)`,
        opacity,
      }}
    >
      <motion.svg ref={blobRef} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <motion.path
          fill={color}
          d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90.2,-16.3,88.1,-1.2C86.1,13.9,79.3,27.8,70.7,40.2C62.1,52.7,51.7,63.8,39.1,70.7C26.4,77.7,11.7,80.5,-3.2,85.1C-18.1,89.8,-33.1,96.2,-45.4,92.6C-57.8,89,-67.5,75.3,-74.3,60.5C-81.1,45.8,-85,30,-86.5,14.3C-88,,-1.3,-87.1,-16.9,-81.7,-30.4C-76.3,-43.9,-66.3,-55.3,-53.8,-63.1C-41.3,-70.9,-26.3,-75,-11.2,-78.3C3.9,-81.6,19.8,-84.1,30.6,-81.5C41.4,-78.9,47.2,-71.2,44.7,-76.4Z"
          animate={{
            d: [
              "M44.7,-76.4C58.9,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90.2,-16.3,88.1,-1.2C86.1,13.9,79.3,27.8,70.7,40.2C62.1,52.7,51.7,63.8,39.1,70.7C26.4,77.7,11.7,80.5,-3.2,85.1C-18.1,89.8,-33.1,96.2,-45.4,92.6C-57.8,89,-67.5,75.3,-74.3,60.5C-81.1,45.8,-85,30,-86.5,14.3C-88,,-1.3,-87.1,-16.9,-81.7,-30.4C-76.3,-43.9,-66.3,-55.3,-53.8,-63.1C-41.3,-70.9,-26.3,-75,-11.2,-78.3C3.9,-81.6,19.8,-84.1,30.6,-81.5C41.4,-78.9,47.2,-71.2,44.7,-76.4Z",
              "M43.7,-75.1C57.3,-68.6,69.2,-58.3,77.4,-45.3C85.6,-32.3,90,-16.2,89.5,-0.3C89,15.6,83.5,31.1,74.8,44.2C66.1,57.3,54.1,67.9,40.4,74.9C26.7,81.9,11.3,85.3,-3.2,89.9C-17.8,94.5,-35.6,100.3,-48.4,95.7C-61.2,91.1,-69,76.1,-75.1,60.8C-81.2,45.5,-85.6,30,-87.1,14.4C-88.6,-1.2,-87.2,-16.8,-81.9,-30.9C-76.6,-45,-67.4,-57.6,-55.2,-64.9C-43,-72.2,-27.8,-74.2,-13.2,-74.8C1.3,-75.4,15.9,-74.6,30.1,-81.6C44.3,-88.6,58.1,-103.5,43.7,-75.1Z",
              "M42.1,-73.8C55.3,-67.2,67.2,-57.5,75.4,-44.9C83.6,-32.3,88.1,-16.2,87.7,-0.2C87.3,15.7,82.1,31.4,73.6,44.5C65.1,57.6,53.3,68.1,39.8,75.1C26.3,82.1,11.1,85.6,-3.2,89.2C-17.6,92.8,-35.2,96.5,-47.9,91.5C-60.6,86.5,-68.4,72.8,-74.5,58.1C-80.6,43.5,-85,28,-86.5,12.4C-88,-3.2,-86.6,-18.8,-81.3,-32.9C-76,-47,-66.8,-59.6,-54.6,-66.2C-42.4,-72.8,-27.2,-73.4,-12.7,-73.1C1.8,-72.8,16.3,-71.6,28.9,-80.4C41.5,-89.2,52.2,-108,42.1,-73.8Z",
              "M44.7,-76.4C58.9,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90.2,-16.3,88.1,-1.2C86.1,13.9,79.3,27.8,70.7,40.2C62.1,52.7,51.7,63.8,39.1,70.7C26.4,77.7,11.7,80.5,-3.2,85.1C-18.1,89.8,-33.1,96.2,-45.4,92.6C-57.8,89,-67.5,75.3,-74.3,60.5C-81.1,45.8,-85,30,-86.5,14.3C-88,,-1.3,-87.1,-16.9,-81.7,-30.4C-76.3,-43.9,-66.3,-55.3,-53.8,-63.1C-41.3,-70.9,-26.3,-75,-11.2,-78.3C3.9,-81.6,19.8,-84.1,30.6,-81.5C41.4,-78.9,47.2,-71.2,44.7,-76.4Z",
            ],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.05, 0.95, 1],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
            duration: speed,
            ease: "easeInOut",
          }}
        />
      </motion.svg>
    </motion.div>
  )
}
