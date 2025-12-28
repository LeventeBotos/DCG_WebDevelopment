"use client";

import type { ReactNode } from "react";
import { forwardRef } from "react";
import { motion } from "framer-motion";
import { Button, type ButtonProps } from "@/components/ui/button";

interface FuturisticButtonProps extends Omit<ButtonProps, "className"> {
  children: ReactNode;
  glowColor?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

const FuturisticButton = forwardRef<HTMLButtonElement, FuturisticButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "lg",
      glowColor,
      icon,
      iconPosition = "left",
      ...props
    },
    ref
  ) => {
    const defaultGlowColor =
      variant === "secondary" ? "rgba(0, 102, 68, 0.5)" : "rgba(0, 51, 102, 0.5)";

    return (
      <motion.div
        className="group relative inline-flex"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button ref={ref} variant={variant} size={size} {...props}>
          <span className="flex items-center gap-2">
            {icon && iconPosition === "left" && icon}
            {children}
            {icon && iconPosition === "right" && icon}
          </span>
        </Button>

        {/* Glow effect */}
        <div
          className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at center, ${
              glowColor || defaultGlowColor
            } 0%, transparent 70%)`,
            opacity: 0.5,
          }}
        />

        {/* Animated border */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute top-0 left-0 h-[1px] w-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          <div className="absolute top-0 right-0 h-full w-[1px] animate-[shimmer_2s_infinite_0.3s] bg-gradient-to-b from-transparent via-white/50 to-transparent" />
          <div className="absolute bottom-0 left-0 h-[1px] w-full animate-[shimmer_2s_infinite_0.5s] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          <div className="absolute top-0 left-0 h-full w-[1px] animate-[shimmer_2s_infinite_0.7s] bg-gradient-to-b from-transparent via-white/50 to-transparent" />
        </div>
      </motion.div>
    );
  }
);

FuturisticButton.displayName = "FuturisticButton";

export { FuturisticButton };
