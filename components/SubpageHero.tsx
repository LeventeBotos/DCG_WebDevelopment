"use client";

import type React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";

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
  nobottom?: boolean;
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
  nobottom = false,
}: SubpageHeroProps) => {
  const isCentered = align === "center";

  const titleContent =
    typeof title === "string" && emphasis
      ? (() => {
          const parts = title.split(emphasis);
          if (parts.length === 1) return title;

          return (
            <>
              {parts[0]}
              <span className="subpage-hero-title-gradient">{emphasis}</span>
              {parts.slice(1).join(emphasis)}
            </>
          );
        })()
      : title;

  return (
    <section
      className={cn(
        `relative bg-black overflow-hidden ${nobottom ? "border-b-0" : "border-b border-white/10"} pb-14 pt-28 md:pb-16 md:pt-32`,
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="subpage-hero-base" />
        <div className="subpage-hero-orb subpage-hero-orb-one" />
        <div className="subpage-hero-orb subpage-hero-orb-two" />
        <div className="subpage-hero-orb subpage-hero-orb-three" />
        <div className="subpage-hero-blob subpage-hero-blob-one" />
        <div className="subpage-hero-blob subpage-hero-blob-two" />
        <div className="subpage-hero-blob subpage-hero-blob-three" />
        <div className="subpage-hero-sheen" />
        <div className="subpage-hero-vignette" />
      </div>

      <div className="relative dcg-section w-full">
        <div
          className={cn(
            "grid gap-10 lg:gap-12",
            aside ? "lg:grid-cols-[1.1fr_0.9fr]" : "",
            isCentered ? "text-center" : "text-left",
          )}
        >
          <div
            className={cn(
              "space-y-6",
              isCentered ? "mx-auto max-w-3xl" : "max-w-3xl",
            )}
          >
            {topSlot ? <div className="text-sm ">{topSlot}</div> : null}

            <p className="text-xs text-white/50 font-semibold uppercase tracking-[0.26em] ">
              {eyebrow}
            </p>

            <h1 className="text-4xl font-semibold leading-tight text-zinc-50 md:text-5xl">
              {titleContent}
            </h1>

            <p className="leading-8 text-zinc-300 md:text-lg">{description}</p>

            {actions.length ? (
              <div
                className={cn(
                  "flex flex-wrap gap-3 text-white",
                  isCentered ? "justify-center" : "justify-start",
                )}
              >
                {actions.map((action) => (
                  <Button
                    key={action.label}
                    asChild
                    variant={action.variant ?? "primary"}
                    size={action.size ?? "lg"}
                  >
                    <Link
                      href={action.href}
                      onClick={() =>
                        track("cta_click", {
                          label: action.label,
                          href: action.href,
                          location: "subpage_hero",
                          context: eyebrow,
                        })
                      }
                    >
                      {action.label}
                    </Link>
                  </Button>
                ))}
              </div>
            ) : null}

            {chips.length ? (
              <div
                className={cn(
                  "flex flex-wrap gap-2 pt-2",
                  isCentered ? "justify-center" : "justify-start",
                )}
              >
                {chips.map((chip) =>
                  chip.href ? (
                    <Link
                      key={chip.label}
                      href={chip.href}
                      className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-zinc-200 transition hover:bg-white/[0.1]"
                      onClick={() =>
                        track("cta_click", {
                          label: chip.label,
                          href: chip.href,
                          location: "subpage_hero_chip",
                          context: eyebrow,
                        })
                      }
                    >
                      {chip.label}
                    </Link>
                  ) : (
                    <span
                      key={chip.label}
                      className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-zinc-200"
                    >
                      {chip.label}
                    </span>
                  ),
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
    </section>
  );
};

export default SubpageHero;
