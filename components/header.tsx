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
    { label: "Home", href: "/" },
    { label: "Software Products", href: "/software-products" },
    { label: "Services", href: "/services" },
    {
      label: "Industries",
      href: "/industries",
      dropdown: [
        { label: "Energy", href: "/industries/energy" },
        { label: "Retail", href: "/industries/retail" },
        {
          label: "Manufacturing & Production",
          href: "/industries/manufacturing",
        },
        { label: "Banking", href: "/industries/banking" },
      ],
    },
    { label: "Contacts", href: "/contact" },
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
              {item.dropdown ? (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <button
                    onClick={() => toggleDropdown(item.label)}
                    className="group flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors hover:text-dcg-lightGreen"
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        activeDropdown === item.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 top-full z-10 mt-1 w-48 rounded-xl border border-white/10 bg-white/10 backdrop-blur-md shadow-lg"
                      >
                        <div className="py-1">
                          {item.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.label}
                              href={dropdownItem.href}
                              className="flex items-center px-4 py-2 text-sm hover:bg-white/10 transition-colors"
                              onClick={() => setActiveDropdown(null)}
                            >
                              <ChevronRight className="mr-2 h-3 w-3 text-primary" />
                              {dropdownItem.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ) : (
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
              )}
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
                  {item.dropdown ? (
                    <div className="space-y-2">
                      <button
                        onClick={() => toggleDropdown(item.label)}
                        className="flex w-full items-center justify-between text-sm font-medium transition-colors hover:text-dcg-lightGreen"
                      >
                        {item.label}
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            activeDropdown === item.label ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {activeDropdown === item.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="ml-4 space-y-2 border-l border-white/10 pl-4"
                          >
                            {item.dropdown.map((dropdownItem) => (
                              <Link
                                key={dropdownItem.label}
                                href={dropdownItem.href}
                                className="flex items-center text-sm text-muted-foreground hover:text-foreground"
                                onClick={() => {
                                  setActiveDropdown(null);
                                  setIsMenuOpen(false);
                                }}
                              >
                                <ChevronRight className="mr-2 h-3 w-3 text-dcg-lightGreen" />
                                {dropdownItem.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-sm font-medium transition-colors hover:text-dcg-lightGreen"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
