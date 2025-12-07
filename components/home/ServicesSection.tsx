import Link from "next/link";
import { ServiceCard } from "./shared";

export default function ServicesSection() {
  return (
    <section className="">
      <div className="">
        <div className="grid gap-6 md:grid-cols-3">
          <ServiceCard
            title="Data & Analytics"
            body="Data strategy, governance, modeling and BI – turning data into a core business capability."
          />
          <ServiceCard
            title="Artificial Intelligence & GenAI"
            body="Use-case discovery, model development, RAG/LLM solutions and AI agents embedded into workflows."
          />
          <ServiceCard
            title="Data Platforms & Cloud"
            body="Modern data platforms, cloud migration and real-time architectures to support AI at scale."
          />
          <ServiceCard
            title="Cyber Security & Digital Risk"
            body="Secure architectures, data protection and risk-aware design for critical AI and data systems."
          />
          <ServiceCard
            title="Robotics, IoT & Automation"
            body="Advanced automation, digital twins and IoT ecosystems that connect the physical and digital worlds."
          />
          <ServiceCard
            title="R&D, Quantum & Emerging Tech"
            body="Exploratory work on next-generation technologies aligned to your strategy and risk appetite."
          />
        </div>

        <div className="mt-8">
          <Link
            href="/services"
            className="text-sm font-semibold text-dcg-blue hover:underline"
          >
            Explore all services →
          </Link>
        </div>
      </div>
    </section>
  );
}
