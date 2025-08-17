"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
interface FuturisticButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  glowColor?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

const FuturisticButton = forwardRef<HTMLButtonElement, FuturisticButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      className = "",
      glowColor,
      icon,
      iconPosition = "left",
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      primary:
        "bg-primary text-white border-primary/50 hover:bg-primary/90 hover:border-primary",
      secondary:
        "bg-secondary text-white border-secondary/50 hover:bg-secondary/90 hover:border-secondary",
      outline:
        "bg-transparent border-white/20 text-foreground hover:bg-white/5 hover:border-white/40",
      ghost:
        "bg-transparent border-transparent text-foreground hover:bg-white/5",
    };

    const sizeStyles = {
      sm: "text-xs px-3 py-1.5 rounded-lg",
      md: "text-sm px-4 py-2 rounded-lg",
      lg: "text-base px-6 py-3 rounded-xl",
    };

    const defaultGlowColor =
      variant === "primary"
        ? "rgba(0, 51, 102, 0.5)"
        : variant === "secondary"
        ? "rgba(0, 102, 68, 0.5)"
        : "rgba(255, 255, 255, 0.1)";

    return (
      <motion.button
        ref={ref}
        className={cn(
          "relative overflow-hidden border font-medium transition-all duration-300",
          "flex items-center justify-center gap-2",
          "focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {/* Glow effect */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at center, ${
              glowColor || defaultGlowColor
            } 0%, transparent 70%)`,
            opacity: 0.5,
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex items-center gap-2">
          {icon && iconPosition === "left" && icon}
          {children}
          {icon && iconPosition === "right" && icon}
        </div>

        {/* Animated border */}
        <div className="absolute inset-0 overflow-hidden rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-500">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent animate-[shimmer_2s_infinite]" />
          <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-white/50 to-transparent animate-[shimmer_2s_infinite_0.3s]" />
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent animate-[shimmer_2s_infinite_0.5s]" />
          <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-transparent via-white/50 to-transparent animate-[shimmer_2s_infinite_0.7s]" />
        </div>
      </motion.button>
    );
  }
);

FuturisticButton.displayName = "FuturisticButton";

export { FuturisticButton };
