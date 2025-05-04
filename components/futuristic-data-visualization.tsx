"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Activity, BarChart3, Brain, Database, LineChart, TrendingUp, Zap, Cpu, Server } from "lucide-react"

export default function FuturisticDataVisualization() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

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

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      const container = containerRef.current
      if (!container) return

      canvas.width = container.clientWidth
      canvas.height = container.clientHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Particle system
    const particles: Particle[] = []
    const connections: Connection[] = []

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = (Math.random() - 0.5) * 1
        this.speedY = (Math.random() - 0.5) * 1
        this.color = Math.random() > 0.5 ? "#003366" : "#006644"
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        else if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        else if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    class Connection {
      particleA: Particle
      particleB: Particle
      distance: number
      opacity: number

      constructor(particleA: Particle, particleB: Particle) {
        this.particleA = particleA
        this.particleB = particleB
        this.distance = 0
        this.opacity = 0
      }

      update() {
        const dx = this.particleA.x - this.particleB.x
        const dy = this.particleA.y - this.particleB.y
        this.distance = Math.sqrt(dx * dx + dy * dy)

        // Only show connections within a certain distance
        const maxDistance = 100
        this.opacity = this.distance < maxDistance ? (1 - this.distance / maxDistance) * 0.5 : 0
      }

      draw() {
        if (!ctx || this.opacity <= 0) return

        ctx.strokeStyle = `rgba(0, 102, 68, ${this.opacity})`
        ctx.lineWidth = 0.5
        ctx.beginPath()
        ctx.moveTo(this.particleA.x, this.particleA.y)
        ctx.lineTo(this.particleB.x, this.particleB.y)
        ctx.stroke()
      }
    }

    // Initialize particles
    for (let i = 0; i < 50; i++) {
      particles.push(new Particle())
    }

    // Create connections between particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        connections.push(new Connection(particles[i], particles[j]))
      }
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      // Update and draw connections
      connections.forEach((connection) => {
        connection.update()
        connection.draw()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  // Generate random positions for the icons
  const getRandomPosition = () => {
    return {
      x: Math.random() * 80 - 40 + "%",
      y: Math.random() * 80 - 40 + "%",
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative h-64 md:h-96 w-full overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {icons.map((Icon, index) => {
        const positions = [getRandomPosition(), getRandomPosition(), getRandomPosition(), getRandomPosition()]

        return (
          <motion.div
            key={index}
            className="absolute z-10"
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

      {/* Glowing orbs */}
      {Array.from({ length: 5 }).map((_, index) => (
        <motion.div
          key={`orb-${index}`}
          className="absolute rounded-full bg-primary/30"
          initial={{
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            opacity: 0.3,
            scale: 0.5,
          }}
          animate={{
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            opacity: [0.3, 0.7, 0.3],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
          style={{
            width: `${30 + Math.random() * 50}px`,
            height: `${30 + Math.random() * 50}px`,
            filter: "blur(20px)",
          }}
        />
      ))}
    </div>
  )
}
