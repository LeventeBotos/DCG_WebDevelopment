"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Services", link: "/services" },
    { name: "Projects", link: "/projects" },
    { name: "Industries", link: "/industries" },
    { name: "Career", link: "/careers" },
    { name: "Contact", link: "/contact" },
  ];

  return (
    <>
      {/* Fixed navbar */}
      <div className="fixed inset-x-0 top-0 z-50">
        <Navbar>
          {/* Desktop */}
          <NavBody>
            <NavbarLogo />
            <NavItems items={navItems} />
            {/* Optional CTAs */}
            {/* <div className="flex items-center gap-4">
              <NavbarButton variant="secondary">Login</NavbarButton>
              <NavbarButton variant="primary">Book a call</NavbarButton>
            </div> */}
          </NavBody>

          {/* Mobile */}
          <MobileNav isMenuOpen={isMobileMenuOpen}>
            <MobileNavHeader>
              <NavbarLogo />
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              />
            </MobileNavHeader>

            <MobileNavMenu
              isOpen={isMobileMenuOpen}
              onClose={() => setIsMobileMenuOpen(false)}
            >
              {navItems.map((item, idx) => (
                <Link
                  key={`mobile-link-${idx}`}
                  href={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="relative text-neutral-600 "
                >
                  <span className="block">{item.name}</span>
                </Link>
              ))}

              {/* Optional mobile CTAs */}
              {/* <div className="flex w-full flex-col gap-4 pt-4">
                <NavbarButton
                  onClick={() => setIsMobileMenuOpen(false)}
                  variant="secondary"
                  className="w-full"
                >
                  Login
                </NavbarButton>
                <NavbarButton
                  onClick={() => setIsMobileMenuOpen(false)}
                  variant="primary"
                  className="w-full"
                >
                  Book a call
                </NavbarButton>
              </div> */}
            </MobileNavMenu>
          </MobileNav>
        </Navbar>
      </div>

      {/* Spacer so content starts below the fixed navbar */}
      {/* <div className="h-16 md:h-20" /> */}
    </>
  );
}
