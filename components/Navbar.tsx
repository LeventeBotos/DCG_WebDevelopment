"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { track } from "@/lib/analytics";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

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
            <NavItems
              items={navItems}
              onItemClick={(item) =>
                track("nav_click", {
                  label: item.name,
                  href: item.link,
                  location: "header_desktop",
                })
              }
            />
          </NavBody>

          {/* Mobile */}
          <MobileNav isMenuOpen={isMobileMenuOpen}>
            <MobileNavHeader>
              <NavbarLogo />
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                controlsId="mobile-navigation-menu"
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              />
            </MobileNavHeader>

            <MobileNavMenu
              id="mobile-navigation-menu"
              isOpen={isMobileMenuOpen}
              onClose={() => setIsMobileMenuOpen(false)}
            >
              {navItems.map((item, idx) => (
                <Link
                  key={`mobile-link-${idx}`}
                  href={item.link}
                  onClick={() => {
                    track("nav_click", {
                      label: item.name,
                      href: item.link,
                      location: "header_mobile",
                    });
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full rounded-md px-2 py-3 text-base font-medium text-neutral-100 transition-colors hover:bg-white/10"
                >
                  <span className="block">{item.name}</span>
                </Link>
              ))}
            </MobileNavMenu>
          </MobileNav>
        </Navbar>
      </div>
    </>
  );
}
