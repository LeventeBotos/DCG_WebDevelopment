"use client";

import React, { useEffect, useState } from "react";
import { useMotionValue } from "motion/react";
import { cn } from "@/lib/utils";
import {
  CardPattern,
  generateRandomString,
} from "@/components/ui/evervault-card";

export const EvervaultCardWhite = ({
  text,
  className,
}: {
  text?: string;
  className?: string;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const [randomString, setRandomString] = useState("");

  useEffect(() => {
    setRandomString(generateRandomString(1500));
  }, []);

  function onMouseMove({ currentTarget, clientX, clientY }: any) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
    setRandomString(generateRandomString(1500));
  }

  return (
    <div
      className={cn(
        "relative flex h-full w-full aspect-square items-center justify-center bg-transparent p-0.5",
        className
      )}
    >
      <div
        onMouseMove={onMouseMove}
        className="group/card relative flex h-full w-full items-center justify-center overflow-hidden rounded-3xl bg-transparent"
      >
        <CardPattern
          mouseX={mouseX}
          mouseY={mouseY}
          randomString={randomString}
        />
        <div className="relative z-10 flex items-center justify-center">
          <div className="relative flex h-44 w-44 items-center justify-center rounded-full text-4xl font-bold text-slate-900">
            <div className="absolute inset-0 rounded-full bg-white blur-sm" />
            <span className="z-20 text-slate-900">{text}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
