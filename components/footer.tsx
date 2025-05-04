"use client"

import Link from "next/link"
import Image from "next/image"
import { Mail, MapPin, Phone, Github, Linkedin, Twitter } from "lucide-react"
import { motion } from "framer-motion"
import AnimatedBlob from "./animated-blob"

export default function Footer() {
  const footerLinks = [
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Services", href: "/services" },
        { label: "Industries", href: "/industries" },
        { label: "Case Studies", href: "/case-studies" },
        { label: "Careers", href: "/careers" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Blog", href: "/blog" },
        { label: "Whitepapers", href: "/resources/whitepapers" },
        { label: "Webinars", href: "/resources/webinars" },
        { label: "Documentation", href: "/docs" },
        { label: "FAQ", href: "/faq" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Cookie Policy", href: "/cookies" },
        { label: "GDPR", href: "/gdpr" },
      ],
    },
  ]

  const socialLinks = [
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Github, href: "https://github.com", label: "GitHub" },
  ]

  return (
    <footer className="relative overflow-hidden bg-primary text-primary-foreground">
      <div className="absolute inset-0 pointer-events-none">
        <AnimatedBlob className="-left-40 -top-40" color="#006644" opacity={0.05} size={500} />
        <AnimatedBlob className="-right-40 -bottom-40" color="#003366" opacity={0.05} size={500} />
      </div>

      <div className="container relative z-10 py-12 md:py-16">
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
                  src="/placeholder.svg?height=40&width=40"
                  alt="DCG Logo"
                  width={40}
                  height={40}
                  className="h-10 w-auto"
                />
                <span className="font-bold text-xl">Data Consulting Group</span>
              </Link>
              <p className="max-w-xs mb-6">
                We create innovative digital solutions by providing expertise in Software Development, Data Science and
                Artificial Intelligence.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
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
                    transition={{ duration: 0.3, delay: 0.05 * linkIndex + 0.2 * sectionIndex }}
                  >
                    <Link href={link.href} className="hover:underline">
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 pt-8 border-t border-primary-foreground/20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>London, United Kingdom</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:info@dataconsultinggroup.co.uk" className="hover:underline">
                  info@dataconsultinggroup.co.uk
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href="tel:+441234567890" className="hover:underline">
                  +44 123 456 7890
                </a>
              </div>
            </div>
            <div className="text-right text-sm">
              <p>&copy; {new Date().getFullYear()} Data Consulting Group Ltd. All rights reserved.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
