"use client"

import type React from "react"

import { useState } from "react"
import { Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Message Sent",
      description: "Thank you for contacting us. We'll get back to you soon!",
    })

    setFormData({
      name: "",
      email: "",
      company: "",
      message: "",
    })
    setIsSubmitting(false)
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Contact Us</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Have a question or ready to start your digital transformation journey? Get in touch with our team today.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">Get in Touch</h2>
                <p className="text-muted-foreground">
                  Fill out the form and our team will get back to you within 24 hours.
                </p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      placeholder="Your email"
                      required
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    name="company"
                    placeholder="Your company"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="How can we help you?"
                    required
                    className="min-h-32"
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">Contact Information</h2>
                <p className="text-muted-foreground">
                  You can also reach out to us directly using the information below.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">Address</h3>
                    <p className="text-muted-foreground">123 AI Street, London, UK</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <a
                      href="mailto:info@dataconsultinggroup.co.uk"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      info@dataconsultinggroup.co.uk
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <a href="tel:+441234567890" className="text-muted-foreground hover:text-foreground">
                      +44 123 456 7890
                    </a>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border p-6">
                <h3 className="text-lg font-medium mb-4">Office Hours</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>10:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 md:py-20 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter">Our Location</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">Visit our office in the heart of London.</p>
            </div>
          </div>
          <div className="mx-auto max-w-5xl py-12">
            <div className="aspect-video w-full rounded-lg border bg-background">
              {/* Placeholder for map */}
              <div className="flex h-full items-center justify-center">
                <p className="text-muted-foreground">Interactive map will be displayed here</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter">Frequently Asked Questions</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Find answers to common questions about our services.
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-3xl py-12 space-y-4">
            <div className="rounded-lg border p-6">
              <h3 className="text-lg font-medium mb-2">What industries do you specialize in?</h3>
              <p className="text-muted-foreground">
                We specialize in providing AI and data solutions for the energy, banking, and manufacturing sectors,
                though we also work with clients in other industries.
              </p>
            </div>
            <div className="rounded-lg border p-6">
              <h3 className="text-lg font-medium mb-2">How long does a typical project take?</h3>
              <p className="text-muted-foreground">
                Project timelines vary depending on scope and complexity. Small projects may take a few weeks, while
                larger implementations can take several months. We'll provide a detailed timeline during our initial
                consultation.
              </p>
            </div>
            <div className="rounded-lg border p-6">
              <h3 className="text-lg font-medium mb-2">Do you offer ongoing support after project completion?</h3>
              <p className="text-muted-foreground">
                Yes, we offer various support and maintenance packages to ensure your solutions continue to perform
                optimally. We can also provide training for your team.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
