export const runtime = "edge";

import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle, Factory, Fuel, Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import SubpageHero from "@/components/SubpageHero";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

interface IndustryPageProps {
  params: {
    industry: string;
  };
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
          description:
            "Analyze patterns to reduce energy usage while maintaining operational efficiency.",
        },
        {
          title: "Risk Assessment and Management",
          description:
            "Identify and mitigate potential risks using advanced data analysis and predictive modeling.",
        },
      ],
      caseStudy: {
        title: "Optimizing Oil Production with AI",
        client: "Major Energy Corporation",
        challenge:
          "Unpredictable production levels leading to inefficient resource allocation and increased costs.",
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
        challenge:
          "Increasing sophistication of fraud attempts requiring more advanced detection methods.",
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
      name: "Manufacturing & Production",
      icon: Factory,
      description:
        "Predictive maintenance and supply chain optimization for manufacturing companies.",
      longDescription:
        "Our manufacturing solutions focus on optimizing production processes, improving quality control, and streamlining supply chains. We help manufacturing companies implement data-driven strategies that increase efficiency and reduce costs.",
      clients: ["Infosys"],
      solutions: [
        {
          title: "Supply Chain Optimization",
          description:
            "Improve inventory management and logistics with predictive analytics and real-time tracking.",
        },
        {
          title: "Predictive Maintenance",
          description:
            "Reduce downtime and extend equipment life with AI-powered maintenance scheduling.",
        },
        {
          title: "Quality Control Automation",
          description:
            "Enhance product quality with automated inspection systems and defect prediction.",
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
        challenge:
          "Inefficient production processes leading to delays, waste, and increased costs.",
        solution:
          "Implemented an integrated AI system for production planning, quality control, and maintenance scheduling.",
        results: [
          "25% increase in production efficiency",
          "35% reduction in defect rates",
          "20% decrease in maintenance costs",
        ],
      },
    },
  };

  const industry = industries[params.industry as keyof typeof industries];

  if (!industry) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SubpageHero
        eyebrow="Industry Playbook"
        title={`Industry playbook for ${industry.name}`}
        emphasis={industry.name}
        description={industry.longDescription}
        topSlot={
          <Link
            href="/industries"
            className="inline-flex items-center text-sm font-semibold text-dcg-slate hover:text-dcg-ink"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Industries
          </Link>
        }
        chips={industry.clients.map((client) => ({ label: client }))}
        aside={
          <div className="relative w-full max-w-md">
            <div className="absolute -inset-4 rounded-[32px] bg-gradient-to-br from-dcg-lightBlue/20 to-dcg-lightGreen/20 blur-2xl" />
            <div className="relative rounded-3xl border border-dcg-lightBlue/20 bg-white p-4 shadow-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-dcg-sand text-dcg-blue">
                <industry.icon className="h-6 w-6" />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-dcg-ink">
                {industry.description}
              </h2>
              <Image
                src="/placeholder.svg?height=400&width=600"
                width={600}
                height={400}
                alt={`${industry.name} industry`}
                className="mt-4 rounded-2xl object-cover"
              />
            </div>
          </div>
        }
      />

      {/* Solutions Section */}
      <section className="dcg-section py-12 md:py-20 space-y-8">
        <div className="max-w-3xl space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-dcg-lightGreen">
            Our solutions
          </p>
          <h2 className="text-3xl font-bold text-dcg-ink md:text-4xl">
            Targeted outcomes for {industry.name}
          </h2>
          <p className="text-dcg-slate md:text-lg">
            Tailored AI and data solutions designed specifically for the{" "}
            {industry.name.toLowerCase()} industry.
          </p>
        </div>
        <BentoGrid className="mx-0 grid-cols-1 md:auto-rows-[14rem] md:grid-cols-2">
          {industry.solutions.map((solution, index) => (
            <BentoGridItem
              key={solution.title}
              className="overflow-hidden border border-dcg-lightBlue/20 bg-white/95 shadow-lg hover:shadow-xl"
              title={<span className="text-dcg-ink">{solution.title}</span>}
              description={
                <span className="text-sm text-dcg-slate">
                  {solution.description}
                </span>
              }
              header={
                <div className="flex items-center justify-between rounded-2xl bg-dcg-sand p-4">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-dcg-slate">
                    Capability
                  </span>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-dcg-ink shadow-sm">
                    {index + 1}
                  </span>
                </div>
              }
              icon={<div className="h-2 w-2 rounded-full bg-dcg-lightGreen" />}
            />
          ))}
        </BentoGrid>
      </section>

      {/* Case Study Section */}
      <section className="bg-dcg-sand/60 py-12 md:py-20">
        <div className="dcg-section space-y-8">
          <div className="max-w-3xl space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-dcg-lightGreen">
              Case study
            </p>
            <h2 className="text-3xl font-bold text-dcg-ink md:text-4xl">
              Proof of value in the wild
            </h2>
            <p className="text-dcg-slate md:text-lg">
              See how we've helped companies in the{" "}
              {industry.name.toLowerCase()} sector achieve remarkable results.
            </p>
          </div>
          <div className="rounded-3xl border border-dcg-lightBlue/20 bg-white p-8 shadow-xl">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-dcg-ink">
                  {industry.caseStudy.title}
                </h3>
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-dcg-slate">
                    Client
                  </p>
                  <p className="text-sm text-dcg-ink">
                    {industry.caseStudy.client}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-dcg-slate">
                    Challenge
                  </p>
                  <p className="text-sm text-dcg-slate">
                    {industry.caseStudy.challenge}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-dcg-slate">
                    Solution
                  </p>
                  <p className="text-sm text-dcg-slate">
                    {industry.caseStudy.solution}
                  </p>
                </div>
              </div>
              <div className="rounded-2xl border border-dcg-lightBlue/20 bg-dcg-sand/70 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-dcg-slate">
                  Results
                </p>
                <ul className="mt-4 space-y-3 text-sm text-dcg-ink">
                  {industry.caseStudy.results.map((result, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 h-5 w-5 text-dcg-lightGreen" />
                      <span>{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20">
        <div className="dcg-section">
          <div className="rounded-3xl border border-dcg-lightBlue/20 bg-gradient-to-r from-dcg-lightBlue to-dcg-lightGreen p-10 text-white shadow-xl">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                  Ready to start?
                </p>
                <h2 className="text-3xl font-semibold md:text-4xl">
                  Ready to transform your {industry.name} business?
                </h2>
                <p className="text-sm text-white/80 md:text-base">
                  Let's discuss how our AI and data solutions can help your
                  organization thrive in the digital age.
                </p>
              </div>
              <Button asChild size="lg" variant="secondary">
                <Link href="/contact">Get started today</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
