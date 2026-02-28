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

const MobileNavStateContext = React.createContext<{
  isScrolled: boolean;
  isMenuOpen: boolean;
}>({
  isScrolled: true,
  isMenuOpen: false,
});

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
  onItemClick?: (item: { name: string; link: string }) => void;
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
              { visible },
            )
          : child,
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
        className,
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
        className,
      )}
    >
      {items.map((item, idx) => (
        <Link
          onMouseEnter={() => setHovered(idx)}
          onClick={() => onItemClick?.(item)}
          className="relative px-4 py-2 text-neutral-600 "
          key={`link-${idx}`}
          href={item.link}
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className="absolute inset-0 h-full w-full rounded-full bg-neutral-100 "
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </Link>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({
  children,
  className,
  visible,
  isMenuOpen = false,
}: MobileNavProps) => {
  const isScrolled = Boolean(visible);
  const isSolid = isScrolled || isMenuOpen;

  return (
    <motion.div
      animate={{
        backgroundColor: isSolid
          ? "rgba(255, 255, 255, 0.92)"
          : "rgba(255, 255, 255, 0.0)",
        backdropFilter: isSolid ? "blur(8px)" : "blur(0px)",
        boxShadow: isSolid
          ? "0 1px 2px rgba(0, 0, 0, 0.08)"
          : "0 0 0 rgba(0, 0, 0, 0)",
      }}
      transition={{
        default: { type: "tween", duration: 0.25 },
      }}
      style={{
        paddingTop: "max(env(safe-area-inset-top), 0.75rem)",
      }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex w-full flex-col items-start justify-between gap-3 px-4 pb-3 lg:hidden",
        className,
      )}
    >
      <MobileNavStateContext.Provider value={{ isScrolled, isMenuOpen }}>
        {children}
      </MobileNavStateContext.Provider>
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
        "relative z-[80] flex w-full flex-row items-center justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
};

const variants = {
  collapsed: {
    opacity: 0,
    y: -12,
  },
  open: {
    opacity: 1,
    y: 0,
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
            duration: 0.2,
            ease: "easeOut",
          }}
          style={{
            paddingTop: "max(calc(env(safe-area-inset-top) + 4.5rem), 6rem)",
          }}
          className={cn(
            "fixed inset-0 z-[70] flex h-[100dvh] min-h-[100dvh] w-screen flex-col items-start justify-start gap-2 overflow-y-auto overscroll-contain bg-white px-5 pb-[max(env(safe-area-inset-bottom),2rem)]",
            className,
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
  const { isScrolled } = React.useContext(MobileNavStateContext);

  return (
    <Button
      type="button"
      variant="secondary"
      size="icon"
      onClick={onClick}
      aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      className="h-12 w-12 border-0 bg-transparent shadow-none [&_svg]:size-7 hover:border-0 hover:bg-transparent hover:shadow-none"
    >
      {isOpen ? (
        <IconX
          className={cn(
            "transition-colors duration-200",
            isScrolled || isOpen ? "text-black" : "text-neutral-300",
          )}
        />
      ) : (
        <IconMenu2
          className={cn(
            "transition-colors duration-200",
            isScrolled ? "text-black" : "text-neutral-300",
          )}
        />
      )}
    </Button>
  );
};

export const NavbarLogo = () => {
  const { isScrolled, isMenuOpen } = React.useContext(MobileNavStateContext);

  return (
    <Link
      href="/"
      className="relative z-20  mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black"
    >
      <img
        src="/logo.png"
        alt="logo"
        className={cn(
          "h-7 transition-[filter] duration-200 md:h-8 md:invert-0 md:brightness-[25%]",
          isScrolled || isMenuOpen
            ? "brightness-[25%]"
            : "invert-0 brightness-[75%]",
        )}
      />
      {/* <span className="font-medium text-black ">Startup</span> */}
    </Link>
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
