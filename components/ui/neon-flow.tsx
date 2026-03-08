"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TubesBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  enableClickInteraction?: boolean;
}

const palettes = [
  {
    background:
      "radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.28), transparent 42%), radial-gradient(circle at 80% 18%, rgba(16, 185, 129, 0.24), transparent 36%), linear-gradient(135deg, #020617 0%, #020617 38%, #07142b 100%)",
    tubes: ["#38bdf8", "#34d399", "#60a5fa"],
  },
  {
    background:
      "radial-gradient(circle at 18% 24%, rgba(244, 114, 182, 0.24), transparent 38%), radial-gradient(circle at 78% 16%, rgba(250, 204, 21, 0.2), transparent 34%), linear-gradient(135deg, #09090b 0%, #101828 48%, #1f2937 100%)",
    tubes: ["#f472b6", "#f59e0b", "#facc15"],
  },
  {
    background:
      "radial-gradient(circle at 24% 18%, rgba(45, 212, 191, 0.22), transparent 38%), radial-gradient(circle at 76% 20%, rgba(96, 165, 250, 0.2), transparent 36%), linear-gradient(135deg, #020617 0%, #0f172a 42%, #111827 100%)",
    tubes: ["#2dd4bf", "#22c55e", "#60a5fa"],
  },
];

const beamPositions = [
  { top: "10%", left: "-15%", rotate: "18deg", delay: 0 },
  { top: "36%", left: "-10%", rotate: "-8deg", delay: 0.8 },
  { top: "62%", left: "-18%", rotate: "12deg", delay: 1.4 },
];

export function TubesBackground({
  children,
  className,
  enableClickInteraction = true,
}: TubesBackgroundProps) {
  const [paletteIndex, setPaletteIndex] = useState(0);
  const palette = palettes[paletteIndex];

  const beams = useMemo(
    () =>
      beamPositions.map((beam, index) => ({
        ...beam,
        color: palette.tubes[index % palette.tubes.length],
      })),
    [palette],
  );

  const handleClick = () => {
    if (!enableClickInteraction) {
      return;
    }

    setPaletteIndex((current) => (current + 1) % palettes.length);
  };

  return (
    <div
      className={cn(
        "relative h-full min-h-[400px] w-full overflow-hidden bg-slate-950",
        className,
      )}
      onClick={handleClick}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 transition-[background] duration-700"
        style={{ background: palette.background }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(circle at center, black 40%, transparent 90%)",
        }}
      />

      {beams.map((beam) => (
        <motion.div
          key={`${beam.top}-${beam.left}-${beam.color}`}
          aria-hidden="true"
          className="absolute h-24 rounded-full blur-3xl"
          style={{
            top: beam.top,
            left: beam.left,
            width: "140%",
            rotate: beam.rotate,
            background: `linear-gradient(90deg, transparent 0%, ${beam.color} 30%, rgba(255,255,255,0.9) 50%, ${beam.color} 70%, transparent 100%)`,
            opacity: 0.45,
          }}
          animate={{
            x: ["-3%", "4%", "-2%"],
            y: ["0%", "2%", "-1%"],
            opacity: [0.28, 0.5, 0.28],
          }}
          transition={{
            duration: 9 + beam.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: beam.delay,
          }}
        />
      ))}

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.7)_100%)]"
      />

      {children ? (
        <div className="relative z-10 h-full w-full">{children}</div>
      ) : null}
    </div>
  );
}

export default TubesBackground;
