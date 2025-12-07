"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { StatCard } from "./shared";

type Stat = {
  label: string;
  value: number;
  suffix?: string;
  note: string;
};

const stats: Stat[] = [
  {
    label: "Regular AI users",
    value: 72,
    suffix: "%",
    note: "but adoption on the frontline is much lower",
  },
  {
    label: "Satisfied with AI training",
    value: 36,
    suffix: "%",
    note: "highlighting a large enablement gap",
  },
  {
    label: "Fear job loss from AI",
    value: 41,
    suffix: "%",
    note: "showing why responsible AI and upskilling matter",
  },
  {
    label: "AI agents in workflows",
    value: 13,
    suffix: "%",
    note: "most companies still treat AI as isolated tools",
  },
];

export default function AIAtWorkSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, {
    once: true,
    margin: "-20% 0px", // start animation early
  });

  // array of animated values
  const [displayValues, setDisplayValues] = useState(() => stats.map(() => 0));

  useEffect(() => {
    if (!isInView) return;

    const anims = stats.map((stat, index) =>
      animate(0, stat.value, {
        duration: 1.6,
        ease: "easeOut",
        onUpdate: (v) => {
          setDisplayValues((prev) => {
            const next = [...prev];
            next[index] = v;
            return next;
          });
        },
      })
    );

    return () => anims.forEach((a) => a.stop());
  }, [isInView]);

  return (
    <section>
      <div
        ref={containerRef}
        className="grid gap-6 md:grid-cols-4 items-stretch"
      >
        {stats.map((stat, index) => {
          const rounded = Math.round(displayValues[index] ?? 0);
          const valueStr =
            stat.suffix != null ? `${rounded}${stat.suffix}` : `${rounded}`;

          return (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={valueStr}
              note={stat.note}
              className="h-full"
            />
          );
        })}
      </div>
    </section>
  );
}
