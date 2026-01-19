"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";

import React, { useRef, useState } from "react";
import { Button, type ButtonProps } from "@/components/ui/button";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
  isMenuOpen?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      // IMPORTANT: Change this to class of `fixed` if you want the navbar to be fixed
      className={cn("sticky inset-x-0 top-20 z-40 w-full", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible }
            )
          : child
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: visible ? "50%" : "100%",
        y: visible ? 20 : 0,
      }}
      transition={{
        // spring just for width (and y)
        width: { type: "spring", stiffness: 150, damping: 30 },
        y: { type: "spring", stiffness: 150, damping: 30 },
        // everything else uses this
        default: { type: "tween", duration: 0.5 },
      }}
      style={{
        minWidth: "800px",
      }}
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full bg-transparent px-4 py-2 lg:flex dark:bg-transparent",
        visible && "bg-white/80",

        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-zinc-600 transition duration-200 hover:text-zinc-800 lg:flex lg:space-x-2",
        className
      )}
    >
      {items.map((item, idx) => (
        <a
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          className="relative px-4 py-2 text-neutral-600 "
          key={`link-${idx}`}
          href={item.link}
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className="absolute inset-0 h-full w-full rounded-full bg-gray-100 "
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </a>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({
  children,
  className,
  isMenuOpen = false,
}: MobileNavProps) => {
  const { scrollY } = useScroll();
  const [isAtTop, setIsAtTop] = useState(true);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsAtTop(latest <= 0);

    if (isMenuOpen) {
      setIsHidden(false);
      lastScrollY.current = latest;
      return;
    }

    if (latest > lastScrollY.current && latest > 80) {
      setIsHidden(true);
    } else if (latest < lastScrollY.current) {
      setIsHidden(false);
    }

    lastScrollY.current = latest;
  });

  return (
    <motion.div
      animate={{
        y: isHidden ? "-100%" : "0%",
        opacity: isHidden ? 0 : 1,
      }}
      transition={{ type: "spring", stiffness: 120, damping: 22 }}
      data-at-top={isAtTop}
      className={cn(
        "group fixed inset-x-0 top-0 z-50 flex w-full flex-col items-start justify-between gap-3 px-4 py-3 lg:hidden",
        isAtTop ? "bg-transparent shadow-none" : "bg-white/95 shadow-sm",
        isHidden ? "pointer-events-none" : "pointer-events-auto",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "relative z-50 flex w-full flex-row items-center justify-between",
        className
      )}
    >
      {children}
    </div>
  );
};

const variants = {
  collapsed: {
    opacity: 0,
    height: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
  open: {
    opacity: 1,
    height: "100dvh",
    paddingTop: 96,
    paddingBottom: 24,
  },
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="mobile-nav-menu"
          initial="collapsed"
          animate="open"
          exit="collapsed"
          variants={variants}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
          style={{ overflow: "hidden" }}
          className={cn(
            "fixed inset-0 z-40 flex w-full flex-col items-start justify-start gap-6 bg-white px-6 shadow-none",
            // ⬆️ note: no py-* here, padding is animated
            className
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      className="flex items-center justify-center text-black"
    >
      {isOpen ? (
        <IconX className="h-8 w-8" />
      ) : (
        <IconMenu2 className="h-8 w-8" />
      )}
    </button>
  );
};

export const NavbarLogo = () => {
  return (
    <a
      href="/"
      className="relative z-20  mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black"
    >
      <img
        src="/logo.png"
        alt="logo"
        className="h-8 md:h-8 md:invert-0 md:brightness-[25%] group-data-[at-top=true]:invert"
      />
      {/* <span className="font-medium text-black ">Startup</span> */}
    </a>
  );
};

export const NavbarButton = ({
  href,
  children,
  variant = "primary",
  // size = "sm",
  ...props
}: {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
} & Omit<ButtonProps, "variant" | "size">) => {
  if (href) {
    return (
      <Button asChild variant={variant} {...props}>
        <Link href={href}>{children}</Link>
      </Button>
    );
  }

  return (
    <Button variant={variant} {...props}>
      {children}
    </Button>
  );
};
