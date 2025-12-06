"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone, Linkedin, Twitter } from "lucide-react";
import { motion } from "framer-motion";
import FuturisticBlob from "./futuristic-blob";

export default function Footer() {
  const footerLinks = [
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Team", href: "/team" },
        { label: "Services", href: "/services" },
        { label: "Careers", href: "/careers" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Services & Solutions",
      links: [
        { label: "Services Overview", href: "/services" },
        { label: "Solutions / Projects", href: "/projects" },
        { label: "Industries", href: "/industries" },
        { label: "Insights", href: "/insights" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
      ],
    },
  ];

  const socialLinks = [
    { icon: Twitter, href: "https://twitter.com", label: "X (Twitter)" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  ];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-dcg-blue to-dcg-darkGreen text-white">
      <div className="absolute inset-0 pointer-events-none">
        <FuturisticBlob
          className="-left-40 -top-40"
          color="#0F3D2E"
          opacity={0.1}
          size={500}
          blur={80}
        />
        <FuturisticBlob
          className="-right-40 -bottom-40"
          color="#0A4C8A"
          opacity={0.1}
          size={500}
          blur={80}
        />
      </div>

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
                {/* <div className="relative h-10 w-10 overflow-hidden rounded-full bg-white/10 backdrop-blur-sm"> */}
                <img
                  src="/logo.png"
                  alt="DCG Logo"
                  // fill
                  className="object-cover h-5"
                />
                {/* </div> */}
                <span className="font-bold text-xl">Data Consulting Group</span>
              </Link>
              <p className="max-w-xs mb-6 text-white/80">
                Transforming ambition into AI-driven impact across data
                platforms, analytics, and cloud for global enterprises.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
                    aria-label={link.label}
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
              <h3 className="text-lg font-semibold">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
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
                      className="text-white/80 hover:text-white transition-colors hover:underline"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
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
                <span>London, United Kingdom (global presence)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a
                  href="mailto:info@dataconsulting-group.com"
                  className="hover:text-white transition-colors"
                >
                  info@dataconsulting-group.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+44 (0) 712 345 6789</span>
              </div>
              <div className="flex items-center gap-2">
                {/* <span className="text-xs uppercase tracking-wide">Web</span> */}
                <a
                  href="https://www.dataconsulting-group.com"
                  className="hover:text-white transition-colors"
                >
                  www.dataconsulting-group.com
                </a>
              </div>
              <p className="text-sm text-white/70">
                Let&apos;s build tomorrow together.
              </p>
            </div>
            <div className="text-right text-sm text-white/60">
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
