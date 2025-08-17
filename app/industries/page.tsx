import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Factory, Fuel, Landmark, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function IndustriesPage() {
  const industries = [
    {
      id: "energy",
      name: "Energy",
      icon: Fuel,
      description:
        "Optimizing production forecasting and operational efficiency for energy companies like BP and Shell.",
      clients: ["BP", "Shell"],
      solutions: [
        "AI-driven production forecasting",
        "Predictive maintenance for equipment",
        "Energy consumption optimization",
        "Risk assessment and management",
      ],
    },
    {
      id: "retail",
      name: "Retail",
      icon: ShoppingCart,
      description: "Advanced analytics and AI solutions for retail optimization and customer experience enhancement.",
      clients: ["Major Retail Chains"],
      solutions: [
        "Customer behavior analytics",
        "Inventory optimization",
        "Demand forecasting",
        "Personalization engines",
        "Supply chain optimization",
      ],
    },
    {
      id: "manufacturing",
      name: "Manufacturing & Production",
      icon: Factory,
      description: "Predictive maintenance and supply chain optimization for manufacturing companies.",
      clients: ["Infosys"],
      solutions: [
        "Supply chain optimization",
        "Predictive maintenance",
        "Quality control automation",
        "Production planning and scheduling",
      ],
    },
    {
      id: "banking",
      name: "Banking",
      icon: Landmark,
      description:
        "Advanced risk assessment and fraud detection solutions for financial institutions like British Airways.",
      clients: ["British Airways"],
      solutions: [
        "Fraud detection and prevention",
        "Customer behavior analysis",
        "Risk assessment models",
        "Automated compliance monitoring",
      ],
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Industries We Serve</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                We provide tailored AI and data solutions for leading industries, helping them transform their
                operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Industries List */}
      <section className="py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:gap-12">
            {industries.map((industry) => (
              <div
                key={industry.id}
                className="group relative overflow-hidden rounded-lg border bg-background p-6 transition-colors hover:bg-muted/50"
              >
                <div className="grid gap-6 md:grid-cols-2 md:gap-12 items-center">
                  <div className="space-y-4">
                    <div className="inline-block rounded-lg bg-primary p-2 text-primary-foreground">
                      <industry.icon className="h-6 w-6" />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">{industry.name}</h2>
                    <p className="text-muted-foreground">{industry.description}</p>
                    <div className="space-y-2">
                      <h3 className="font-semibold">Key Clients:</h3>
                      <div className="flex flex-wrap gap-2">
                        {industry.clients.map((client) => (
                          <span
                            key={client}
                            className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold"
                          >
                            {client}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold">Solutions:</h3>
                      <ul className="ml-6 list-disc text-muted-foreground">
                        {industry.solutions.map((solution) => (
                          <li key={solution}>{solution}</li>
                        ))}
                      </ul>
                    </div>
                    <Button asChild>
                      <Link href={`/industries/${industry.id}`}>
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  <div className="flex justify-center">
                    <Image
                      src="/placeholder.svg?height=300&width=400"
                      width={400}
                      height={300}
                      alt={`${industry.name} industry`}
                      className="rounded-lg object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Transform Your Business?
              </h2>
              <p className="mx-auto max-w-[700px] md:text-xl">
                Let's discuss how our AI and data solutions can help your organization thrive in the digital age.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg" variant="secondary">
                <Link href="/contact">Get Started Today</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
