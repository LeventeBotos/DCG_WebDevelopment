"use client";

import Link from "next/link";
import ThermodynamicGrid from "@/components/ui/interactive-thermodynamic-grid";
import TubesBackground from "@/components/ui/neon-flow";
// import NeonFlow from "@/components/ui/neon-flow";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[#050505] px-6 py-20 text-zinc-100">
      <ThermodynamicGrid
        resolution={10}
        className="opacity-50"
        coolingFactor={0.975}
      />
      {/* <TubesBackground /> */}
      {/* <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/40 via-black/60 to-black/85" /> */}

      <div className="relative z-10 pointer-events-none mx-auto max-w-2xl text-center">
        <h1 className="mt-5 text-[16rem] font-mono font-bold leading-tight text-neutral-100 ">
          404
        </h1>
        <p className="mt-4 text-base leading-relaxed text-zinc-300 sm:text-lg">
          The page you were trying to reach does not exist, may have moved, or
          the URL might be incorrect.
        </p>
      </div>
    </section>
  );
}
