"use client";

import React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import { platformCards } from "@/lib/platforms";

export default function DCGAIPlatformSection() {
  return (
    <section className="w-full ">
      <div className="mx-auto grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {platformCards.map((card) => (
          <PlatformCanvasCard key={card.title} {...card} />
        ))}
      </div>
    </section>
  );
}

type PlatformCanvasCardProps = {
  title: string;
  body: string;
  href: string;
  colors: [number, number, number][];
};

function PlatformCanvasCard({
  title,
  body,
  href,
  colors,
}: PlatformCanvasCardProps) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group/canvas-card relative flex h-[18rem] lg:h-auto w-full items-center justify-center 
                 overflow-hidden rounded-xl border border-black/10 bg-white 
                 p-4 shadow-sm"
    >
      {/* corner icons */}
      <Icon className="absolute -left-3 -top-3 h-5 w-5 text-black/40" />
      <Icon className="absolute -left-3 -bottom-3 h-5 w-5 text-black/40" />
      <Icon className="absolute -right-3 -top-3 h-5 w-5 text-black/40" />
      <Icon className="absolute -right-3 -bottom-3 h-5 w-5 text-black/40" />

      {/* hover animated background */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 h-full w-full"
          >
            <CanvasRevealEffect
              animationSpeed={4}
              containerClassName="bg-white"
              colors={colors}
              dotSize={3}
              opacities={[0.1, 0.15, 0.2, 0.25, 0.3, 0.4, 0.6, 0.8, 1]}
              showGradient={false}
            />

            {/* Light-mode soft fade */}
            {/* <div className="absolute inset-0 bg-white/60 [mask-image:radial-gradient(420px_at_center,white,transparent)]" /> */}
          </motion.div>
        )}
      </AnimatePresence>

      {/* content */}
      <div className="relative z-20 flex h-full w-full flex-col justify-between rounded-2xl px-4 py-4 md:px-6 md:py-5 gap-2 lg:gap-6">
        {/* icon row */}
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {/* <AceternityIcon className="text-black" /> */}
            <span className="text-[10px] font-medium uppercase tracking-[0.26em] text-neutral-600">
              DCG AI PLATFORM
            </span>
          </div>
          <span className=" text-[11px] uppercase tracking-[0.22em] text-neutral-500 inline">
            Solution
          </span>
        </div>

        {/* text */}
        <div className="space-y-2 md:space-y-3">
          <h2
            className="text-lg font-semibold text-black transition duration-200
                       group-hover/canvas-card:-translate-y-1 md:text-2xl"
          >
            {title}
          </h2>
          <p className="max-w-3xl text-sm leading-relaxed text-neutral-700 md:text-[0.95rem]">
            {body}
          </p>
        </div>

        {/* bottom row */}
        <div className="mt-4 flex items-center justify-between gap-3">
          <Link
            href={href}
            className="inline-flex items-center gap-2 text-sm font-medium text-black"
          >
            Explore this capability
            <motion.span
              aria-hidden="true"
              initial={{ x: 0 }}
              animate={{ x: [0, 4, 0] }}
              transition={{
                duration: 1.3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="inline-block"
            >
              →
            </motion.span>
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ICONS */

const AceternityIcon = ({ className = "" }) => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 66 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`h-7 w-7 transition-colors ${className}`}
    >
      <path
        d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
        stroke="currentColor"
        strokeWidth="15"
        strokeLinecap="round"
      />
    </svg>
  );
};

export const Icon = ({ className, ...rest }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};
