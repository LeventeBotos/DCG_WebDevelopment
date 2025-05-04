"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { Activity, BarChart3, Brain, Database, LineChart, TrendingUp, Zap, Cpu, Server } from "lucide-react"

export default function AnimatedData() {
  const containerRef = useRef<HTMLDivElement>(null)

  const icons = [
    { icon: Brain, delay: 0, color: "#003366" },
    { icon: Database, delay: 0.5, color: "#006644" },
    { icon: LineChart, delay: 1, color: "#003366" },
    { icon: TrendingUp, delay: 1.5, color: "#006644" },
    { icon: BarChart3, delay: 2, color: "#003366" },
    { icon: Activity, delay: 2.5, color: "#006644" },
    { icon: Zap, delay: 3, color: "#003366" },
    { icon: Cpu, delay: 3.5, color: "#006644" },
    { icon: Server, delay: 4, color: "#003366" },
  ]

  // Generate random positions for the icons
  const getRandomPosition = () => {
    return {
      x: Math.random() * 80 - 40 + "%",
      y: Math.random() * 80 - 40 + "%",
    }
  }

  // Generate random paths for the connections
  const paths = [
    {
      d: "M100,100 C150,150 200,50 250,100",
      delay: 0,
    },
    {
      d: "M150,200 C200,150 250,250 300,200",
      delay: 1,
    },
    {
      d: "M200,100 C250,50 300,150 350,100",
      delay: 2,
    },
    {
      d: "M50,150 C100,100 150,200 200,150",
      delay: 3,
    },
    {
      d: "M250,50 C300,100 350,50 400,100",
      delay: 4,
    },
  ]

  return (
    <div ref={containerRef} className="relative h-64 md:h-96 w-full overflow-hidden rounded-lg bg-muted">
      {icons.map((Icon, index) => {
        const positions = [getRandomPosition(), getRandomPosition(), getRandomPosition(), getRandomPosition()]

        return (
          <motion.div
            key={index}
            className="absolute"
            initial={{
              x: positions[0].x,
              y: positions[0].y,
              opacity: 0,
              scale: 0.5,
            }}
            animate={{
              x: [positions[0].x, positions[1].x, positions[2].x, positions[3].x],
              y: [positions[0].y, positions[1].y, positions[2].y, positions[3].y],
              opacity: [0, 1, 1, 0],
              scale: [0.5, 1.5, 1.5, 0.5],
            }}
            transition={{
              duration: 20,
              times: [0, 0.3, 0.7, 1],
              repeat: Number.POSITIVE_INFINITY,
              delay: Icon.delay,
              ease: "easeInOut",
            }}
          >
            <Icon.icon className="h-8 w-8 md:h-12 md:w-12" style={{ color: Icon.color }} />
          </motion.div>
        )
      })}

      {/* Animated connections */}
      <svg className="absolute inset-0 w-full h-full">
        {paths.map((path, index) => (
          <motion.path
            key={index}
            d={path.d}
            stroke="#003366"
            strokeWidth="1"
            fill="none"
            className="opacity-20"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 0.5, 0] }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: path.delay,
            }}
          />
        ))}
      </svg>

      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, index) => (
        <motion.div
          key={`particle-${index}`}
          className="absolute rounded-full bg-primary"
          initial={{
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            opacity: 0,
            scale: 0,
          }}
          animate={{
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            opacity: [0, 0.7, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
          style={{
            width: `${4 + Math.random() * 6}px`,
            height: `${4 + Math.random() * 6}px`,
          }}
        />
      ))}
    </div>
  )
}
