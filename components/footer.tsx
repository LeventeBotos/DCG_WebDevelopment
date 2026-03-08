"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone, Linkedin, Twitter } from "lucide-react";
import { motion } from "framer-motion";
import { useCookieConsent } from "@/hooks/use-cookie-consent";
import { track } from "@/lib/analytics";
import { hasMediaCredits } from "@/lib/media-credits";
import { siteConfig } from "@/lib/site";

export default function Footer() {
  const { resetConsent } = useCookieConsent();
  const showCreditsLink = hasMediaCredits();
  const footerLinks = [
    {
      title: "Company",
      links: [
        // { label: "Services", href: "/services" },
        { label: "Career", href: "/careers" },
        { label: "Contact", href: "/contact" },
        // { label: "Industries", href: "/industries" },
        // { label: "Insights", href: "/insights" },
        // { label: "Projects", href: "/projects" },
      ],
    },
    {
      title: "Services & Solutions",
      links: [
        { label: "Services Overview", href: "/services" },
        { label: "Solutions / Projects", href: "/projects" },
        { label: "Industries", href: "/industries" },
        // { label: "Insights", href: "/insights" },
      ],
    },
    {
      title: "Legal",
      links: [
        {
          label: "Privacy Policy",
          href: "/privacy-policy",
        },
        {
          label: "Cookie Policy",
          href: "/cookie-policy",
        },
        {
          label: "Terms of Service",
          href: "/terms-of-service",
        },
        ...(showCreditsLink
          ? [
              {
                label: "Media Credits",
                href: "/credits",
              },
            ]
          : []),
      ],
    },
  ];

  const socialLinks = [
    siteConfig.socialLinks.x
      ? {
          icon: Twitter,
          href: siteConfig.socialLinks.x,
          label: "X (Twitter)",
        }
      : null,
    siteConfig.socialLinks.linkedin
      ? {
          icon: Linkedin,
          href: siteConfig.socialLinks.linkedin,
          label: "LinkedIn",
        }
      : null,
  ].filter(Boolean) as Array<{
    icon: typeof Twitter;
    href: string;
    label: string;
  }>;

  return (
    <footer
      className="relative overflow-hidden bg-black bg-gradient-to-br from-dcg-lightBlue to-dcg-lightGreen text-white"
      aria-label="Footer"
    >
      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      />

      <div className="container relative z-10 py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/" className="flex items-center space-x-2 mb-6">
                <Image
                  src="/logo.png"
                  alt="DCG Logo"
                  width={768}
                  height={338}
                  className="h-5 w-auto"
                />
                <span className="font-bold text-xl">Data Consulting Group</span>
              </Link>
              <p className="max-w-xs mb-6 text-white/80">
                Transforming ambition into AI-driven impact across data
                platforms, analytics, and cloud for global enterprises.
              </p>
              {socialLinks.length ? (
                <div className="flex space-x-4">
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                      aria-label={link.label}
                      onClick={() =>
                        track("social_click", {
                          label: link.label,
                          href: link.href,
                          location: "footer",
                        })
                      }
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      whileHover={{ y: -5 }}
                    >
                      <link.icon className="h-5 w-5" />
                    </motion.a>
                  ))}
                </div>
              ) : null}
            </motion.div>
          </div>

          {footerLinks.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * sectionIndex }}
            >
              <h3
                id={`footer-section-${sectionIndex}`}
                className="text-lg font-semibold"
              >
                {section.title}
              </h3>
              <ul
                className="space-y-2"
                aria-labelledby={`footer-section-${sectionIndex}`}
              >
                {section.links.map((link, linkIndex) => {
                  return (
                    <motion.li
                      key={link.label}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.3,
                        delay: 0.05 * linkIndex + 0.2 * sectionIndex,
                      }}
                    >
                      <Link
                        href={link.href}
                        className="text-white/80 transition-colors hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                        onClick={() =>
                          track("nav_click", {
                            label: link.label,
                            href: link.href,
                            location: "footer",
                          })
                        }
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
              {section.title === "Legal" && (
                <button
                  type="button"
                  onClick={() => {
                    track("cta_click", {
                      label: "Manage cookies",
                      location: "footer",
                    });
                    resetConsent();
                  }}
                  aria-label="Manage cookie preferences"
                  className="text-white/80 transition-colors hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  Manage cookies
                </button>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 pt-8 border-t border-white/20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-2 text-white/80">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>London, United Kingdom</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a
                  href="mailto:info@dataconsulting-group.com"
                  className="break-all transition-colors hover:text-white sm:break-normal"
                  onClick={() =>
                    track("email_click", {
                      email: "info@dataconsulting-group.com",
                      location: "footer",
                    })
                  }
                >
                  info@dataconsulting-group.com
                </a>
              </div>
              <a
                href="tel:+44 (0) 20 80639958"
                className="flex items-center gap-2 break-all sm:break-normal"
                onClick={() =>
                  track("phone_click", {
                    phone: "+44 (0) 20 80639958",
                    location: "footer",
                  })
                }
              >
                <Phone className="h-4 w-4" />
                <span>+44 (0) 20 80639958</span>
              </a>
              <div className="flex items-center gap-2">
                {/* <span className="text-xs uppercase tracking-wide">Web</span> */}
                <a
                  href="https://www.dataconsulting-group.com"
                  className="break-all transition-colors hover:text-white sm:break-normal"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    track("outbound_click", {
                      href: "https://www.dataconsulting-group.com",
                      location: "footer",
                    })
                  }
                >
                  www.dataconsulting-group.com
                </a>
              </div>
              <p className="text-sm text-white/70">
                Let&apos;s build tomorrow together.
              </p>
            </div>
            <div className="text-left text-sm text-white/60 md:text-right">
              <p>
                &copy; {new Date().getFullYear()} Data Consulting Group Ltd. All
                rights reserved.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
