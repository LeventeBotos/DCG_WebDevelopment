"use client";

import type React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";
import { Highlight } from "@/components/ui/hero-highlight";

type HeroAction = {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
  size?: "default" | "lg" | "sm";
};

type HeroChip = {
  label: string;
  href?: string;
};

type SubpageHeroProps = {
  eyebrow: string;
  title: string | React.ReactNode;
  description: string;
  emphasis?: string;
  actions?: HeroAction[];
  chips?: HeroChip[];
  align?: "left" | "center";
  className?: string;
  topSlot?: React.ReactNode;
  aside?: React.ReactNode;
};

const SubpageHero = ({
  eyebrow,
  title,
  description,
  emphasis,
  actions = [],
  chips = [],
  align = "left",
  className,
  topSlot,
  aside,
}: SubpageHeroProps) => {
  const isCentered = align === "center";
  const titleContent =
    typeof title === "string" && emphasis ? (
      (() => {
        const parts = title.split(emphasis);
        if (parts.length === 1) {
          return title;
        }
        return (
          <>
            {parts[0]}
            <Highlight className="from-dcg-lightBlue/40 to-dcg-lightGreen/40 text-dcg-ink">
              {emphasis}
            </Highlight>
            {parts.slice(1).join(emphasis)}
          </>
        );
      })()
    ) : (
      title
    );

  return (
    <BackgroundBeamsWithCollision
      className={cn(
        "relative py-16 md:py-24 bg-gradient-to-br from-dcg-sand via-white to-white",
        className
      )}
    >
      <DottedGlowBackground
        className="pointer-events-none opacity-40"
        color="rgba(15, 23, 42, 0.4)"
        glowColor="rgba(0, 154, 202, 0.6)"
        gap={16}
        radius={1.6}
        backgroundOpacity={0.12}
      />
      <div className="relative dcg-section w-full">
        <div
          className={cn(
            "grid gap-10 lg:gap-12",
            aside ? "lg:grid-cols-[1.1fr_0.9fr]" : "",
            isCentered ? "text-center" : "text-left"
          )}
        >
          <div
            className={cn(
              "space-y-6",
              isCentered ? "mx-auto max-w-3xl" : "max-w-3xl"
            )}
          >
            {topSlot ? <div className="text-sm">{topSlot}</div> : null}
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-dcg-lightGreen">
              {eyebrow}
            </p>
            <h1 className="text-4xl font-bold leading-tight text-dcg-ink md:text-5xl">
              {titleContent}
            </h1>
            <p className="text-lg text-dcg-slate">{description}</p>
            {actions.length ? (
              <div
                className={cn(
                  "flex flex-wrap gap-3",
                  isCentered ? "justify-center" : "justify-start"
                )}
              >
                {actions.map((action) => (
                  <Button
                    key={action.label}
                    asChild
                    variant={action.variant ?? "primary"}
                    size={action.size ?? "lg"}
                  >
                    <Link href={action.href}>{action.label}</Link>
                  </Button>
                ))}
              </div>
            ) : null}
            {chips.length ? (
              <div
                className={cn(
                  "flex flex-wrap gap-2 pt-2",
                  isCentered ? "justify-center" : "justify-start"
                )}
              >
                {chips.map((chip) =>
                  chip.href ? (
                    <Link
                      key={chip.label}
                      href={chip.href}
                      className="dcg-chip hover:-translate-y-0.5 hover:shadow-md transition"
                    >
                      {chip.label}
                    </Link>
                  ) : (
                    <span key={chip.label} className="dcg-chip">
                      {chip.label}
                    </span>
                  )
                )}
              </div>
            ) : null}
          </div>
          {aside ? (
            <div className="flex items-start justify-center lg:justify-end">
              {aside}
            </div>
          ) : null}
        </div>
      </div>
    </BackgroundBeamsWithCollision>
  );
};

export default SubpageHero;
