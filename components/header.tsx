"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const navItems = [
    { label: "Carreers", href: "/careers" },
    { label: "Contact", href: "/contact" },
    { label: "Services", href: "/services" },
    { label: "Solutions", href: "/solutions" },
    { label: "Industries", href: "/industries" },
    { label: "Insights", href: "/insights" },
  ];

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "backdrop-blur-md bg-white/10 border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 md:h-20 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.png"
              alt="DCG Logo"
              width={40}
              height={40}
              className="h-10 bg-black p-1 rounded w-auto"
            />
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item, index) => (
            <div key={item.label} className="relative">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Link
                  href={item.href}
                  className="relative px-4 py-2 text-sm font-medium transition-colors hover:text-dcg-lightGreen group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-dcg-lightGreen scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Link>
              </motion.div>
            </div>
          ))}
        </nav>

        {/* <div className="  items-center gap-2"> */}
        <button
          className="items-center md:hidden flex justify-center h-10 w-10 "
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
        {/* </div> */}
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="container md:hidden py-4"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col space-y-4 rounded-xl border border-white/10 bg-white/10 backdrop-blur-md p-4">
              {navItems.map((item, index) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm font-medium transition-colors hover:text-dcg-lightGreen"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
