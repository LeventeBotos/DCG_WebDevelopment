import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowLeft, CheckCircle, Factory, Fuel, Landmark } from "lucide-react"
import { Button } from "@/components/ui/button"

interface IndustryPageProps {
  params: {
    industry: string
  }
}

export default function IndustryPage({ params }: IndustryPageProps) {
  const industries = {
    energy: {
      name: "Energy",
      icon: Fuel,
      description:
        "Optimizing production forecasting and operational efficiency for energy companies like BP and Shell.",
      longDescription:
        "Our AI solutions for the energy sector focus on optimizing production forecasting, improving operational efficiency, and reducing environmental impact. We work with leading companies like BP and Shell to implement cutting-edge technology that transforms their operations.",
      clients: ["BP", "Shell"],
      solutions: [
        {
          title: "AI-driven Production Forecasting",
          description:
            "Leverage machine learning to predict production levels with greater accuracy, reducing waste and optimizing resource allocation.",
        },
        {
          title: "Predictive Maintenance",
          description:
            "Identify potential equipment failures before they occur, minimizing downtime and extending asset lifespans.",
        },
        {
          title: "Energy Consumption Optimization",
          description: "Analyze patterns to reduce energy usage while maintaining operational efficiency.",
        },
        {
          title: "Risk Assessment and Management",
          description: "Identify and mitigate potential risks using advanced data analysis and predictive modeling.",
        },
      ],
      caseStudy: {
        title: "Optimizing Oil Production with AI",
        client: "Major Energy Corporation",
        challenge: "Unpredictable production levels leading to inefficient resource allocation and increased costs.",
        solution:
          "Implemented an AI-driven forecasting system that analyzed historical data, weather patterns, and equipment performance.",
        results: [
          "20% improvement in production forecast accuracy",
          "15% reduction in operational costs",
          "30% decrease in unplanned downtime",
        ],
      },
    },
    banking: {
      name: "Banking",
      icon: Landmark,
      description:
        "Advanced risk assessment and fraud detection solutions for financial institutions like British Airways.",
      longDescription:
        "Our banking solutions leverage AI and machine learning to enhance security, improve customer experiences, and optimize operations. We work with major financial institutions to implement robust systems that protect assets and streamline processes.",
      clients: ["British Airways"],
      solutions: [
        {
          title: "Fraud Detection and Prevention",
          description:
            "Identify suspicious activities in real-time using advanced pattern recognition and anomaly detection.",
        },
        {
          title: "Customer Behavior Analysis",
          description:
            "Gain insights into customer preferences and behaviors to personalize services and improve satisfaction.",
        },
        {
          title: "Risk Assessment Models",
          description:
            "Evaluate lending risks with greater accuracy using comprehensive data analysis and predictive modeling.",
        },
        {
          title: "Automated Compliance Monitoring",
          description:
            "Ensure regulatory compliance with automated systems that flag potential issues before they become problems.",
        },
      ],
      caseStudy: {
        title: "Enhancing Fraud Detection Systems",
        client: "Leading Financial Institution",
        challenge: "Increasing sophistication of fraud attempts requiring more advanced detection methods.",
        solution:
          "Developed a machine learning system that analyzes transaction patterns and identifies anomalies in real-time.",
        results: [
          "40% increase in fraud detection rate",
          "60% reduction in false positives",
          "£2.5 million saved in potential fraud losses annually",
        ],
      },
    },
    manufacturing: {
      name: "Manufacturing",
      icon: Factory,
      description: "Predictive maintenance and supply chain optimization for manufacturing companies.",
      longDescription:
        "Our manufacturing solutions focus on optimizing production processes, improving quality control, and streamlining supply chains. We help manufacturing companies implement data-driven strategies that increase efficiency and reduce costs.",
      clients: ["Infosys"],
      solutions: [
        {
          title: "Supply Chain Optimization",
          description: "Improve inventory management and logistics with predictive analytics and real-time tracking.",
        },
        {
          title: "Predictive Maintenance",
          description: "Reduce downtime and extend equipment life with AI-powered maintenance scheduling.",
        },
        {
          title: "Quality Control Automation",
          description: "Enhance product quality with automated inspection systems and defect prediction.",
        },
        {
          title: "Production Planning and Scheduling",
          description:
            "Optimize production schedules based on demand forecasts, resource availability, and efficiency metrics.",
        },
      ],
      caseStudy: {
        title: "Revolutionizing Production Efficiency",
        client: "Global Manufacturing Company",
        challenge: "Inefficient production processes leading to delays, waste, and increased costs.",
        solution:
          "Implemented an integrated AI system for production planning, quality control, and maintenance scheduling.",
        results: [
          "25% increase in production efficiency",
          "35% reduction in defect rates",
          "20% decrease in maintenance costs",
        ],
      },
    },
  }

  const industry = industries[params.industry as keyof typeof industries]

  if (!industry) {
    notFound()
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
