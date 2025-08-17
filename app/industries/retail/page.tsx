import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, CheckCircle, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function RetailPage() {
  const industry = {
    name: "Retail",
    icon: ShoppingCart,
    description: "Advanced analytics and AI solutions for retail optimization and customer experience enhancement.",
    longDescription:
      "Our retail solutions focus on transforming customer experiences, optimizing operations, and driving growth through data-driven insights. We help retailers leverage AI and analytics to understand customer behavior, optimize inventory, and create personalized shopping experiences.",
    clients: ["Major Retail Chains"],
    solutions: [
      {
        title: "Customer Behavior Analytics",
        description:
          "Analyze customer journeys and preferences to optimize marketing strategies and improve customer satisfaction.",
      },
      {
        title: "Inventory Optimization",
        description:
          "Use predictive analytics to optimize stock levels, reduce waste, and ensure product availability.",
      },
      {
        title: "Demand Forecasting",
        description: "Predict future demand patterns to optimize purchasing and inventory management.",
      },
      {
        title: "Personalization Engines",
        description: "Create personalized shopping experiences through AI-driven recommendation systems.",
      },
      {
        title: "Supply Chain Optimization",
        description: "Streamline supply chain operations with real-time analytics and predictive modeling.",
      },
    ],
    caseStudy: {
      title: "Transforming Retail Operations with AI",
      client: "Major Retail Chain",
      challenge:
        "Inefficient inventory management and lack of personalized customer experiences leading to lost sales.",
      solution:
        "Implemented an integrated AI system for demand forecasting, inventory optimization, and personalized recommendations.",
      results: [
        "30% reduction in inventory costs",
        "25% increase in customer satisfaction",
        "20% improvement in sales conversion rates",
      ],
    },
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col space-y-4">
            <Link
              href="/industries"
              className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Industries
            </Link>
            <div className="grid gap-6 md:grid-cols-2 md:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-primary p-2 text-primary-foreground">
                  <industry.icon className="h-6 w-6" />
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">{industry.name}</h1>
                <p className="text-muted-foreground md:text-xl">{industry.longDescription}</p>
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
              </div>
              <div className="flex justify-center">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  width={600}
                  height={400}
                  alt={`${industry.name} industry`}
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter">Our Solutions</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Tailored AI and data solutions designed specifically for the {industry.name.toLowerCase()} industry.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2">
            {industry.solutions.map((solution, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg border bg-background p-6 transition-colors hover:bg-muted/50"
              >
                <div className="space-y-2">
                  <h3 className="font-bold">{solution.title}</h3>
                  <p className="text-sm text-muted-foreground">{solution.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      <section className="py-12 md:py-20 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter">Case Study</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                See how we've helped companies in the {industry.name.toLowerCase()} sector achieve remarkable results.
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-4xl py-12">
            <div className="rounded-lg border bg-background p-6">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">{industry.caseStudy.title}</h3>
                <div className="space-y-2">
                  <p className="font-semibold">Client:</p>
                  <p className="text-muted-foreground">{industry.caseStudy.client}</p>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold">Challenge:</p>
                  <p className="text-muted-foreground">{industry.caseStudy.challenge}</p>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold">Solution:</p>
                  <p className="text-muted-foreground">{industry.caseStudy.solution}</p>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold">Results:</p>
                  <ul className="ml-6 space-y-2">
                    {industry.caseStudy.results.map((result, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Transform Your {industry.name} Business?
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
