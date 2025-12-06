import {
  Bot,
  ChartSpline,
  Cloudy,
  Database,
  Layers,
  Network,
  Sparkles,
} from "lucide-react";

const services = [
  {
    title: "Knowledge Graphs & Digital Twins",
    icon: Network,
    bullets: [
      "Entity and relationship modeling with semantic links",
      "LLMOps for RAG and GenAI search over enterprise knowledge",
      "3D digital twins for operations, monitoring, and forecasting",
      "Transfer learning to accelerate predictive tasks",
    ],
  },
  {
    title: "Data Platforms & Cloud",
    icon: Cloudy,
    bullets: [
      "Database migration to cloud with modern lakehouse patterns",
      "IoT, document, and streaming data centralization",
      "Scalable architectures across Azure, AWS, GCP",
      "Security and governance baked into every layer",
    ],
  },
  {
    title: "Analytics & Data Mining",
    icon: ChartSpline,
    bullets: [
      "Data mining and pattern discovery",
      "Customer behavior analytics and segmentation",
      "Secure anonymization pipelines (PCI, consent, storage, insights)",
      "Safety and compliance by design",
    ],
  },
  {
    title: "Retail Predictive AI",
    icon: Layers,
    bullets: [
      "Demand forecasting for grocery and imports",
      "Inventory optimization tuned to events and demographics",
      "Dynamic pricing near expiration to reduce waste",
      "Context-aware models by store location and local preferences",
    ],
  },
  {
    title: "Data Modeling",
    icon: Database,
    bullets: [
      "Relational schemas for resilient analytics",
      "Graph-based models that mirror real-world entities and edges",
      "Model catalogs that stay aligned to business outcomes",
    ],
  },
  {
    title: "Application Layer (Chatbots & Dashboards)",
    icon: Bot,
    bullets: [
      "Gradio-powered chatbot demos and agentic assistants",
      "Visualization dashboards on top of the data and ML stack",
      "Embedded demos or video showcases for stakeholders",
    ],
  },
];

const dataEngineering = [
  "Data & Analytics",
  "Artificial Intelligence",
  "Generative AI",
  "Cloud Computing",
  "Cyber Security & Digital Risk",
  "Quantum Computing",
  "Robotics & Advanced Automation",
  "MLOps & DevOps",
  "IoT and Research & Development",
  "Digital twin",
  "Energy Transformation",
];

export default function ServicesGrid() {
  return (
    <section className="container px-4 md:px-6 py-16 md:py-20 space-y-10">
      <div className="max-w-3xl space-y-3">
        <p className="text-sm font-semibold text-dcg-darkGreen uppercase tracking-[0.2em]">
          Key Services
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-dcg-ink">
          AI, data, and cloud programs engineered for measurable outcomes.
        </h2>
        <p className="text-dcg-slate">
          We empower organizations with intelligent data systems that improve
          decision-making, reduce inefficiencies, and unlock new business
          opportunities.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.title}
            className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-dcg-blue/10 bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="absolute -right-8 -top-10 h-24 w-24 rounded-full bg-dcg-lightGreen/10 blur-2xl transition group-hover:scale-110" />
            <div className="relative flex flex-col gap-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-dcg-blue/10 text-dcg-blue">
                <service.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-dcg-ink">
                {service.title}
              </h3>
              <ul className="space-y-2 text-sm text-dcg-slate">
                {service.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-dcg-lightBlue" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-dcg-blue/10 bg-gradient-to-r from-white via-dcg-sand to-white p-6 shadow-md">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-dcg-lightBlue/15">
              <Sparkles className="h-5 w-5 text-dcg-blue" />
            </div>
            <div>
              <p className="text-sm font-semibold text-dcg-ink">
                Our Data & Engineering Services
              </p>
              <p className="text-xs text-dcg-slate">
                Built to move from pilot to scale with trust and speed.
              </p>
            </div>
          </div>
          <div className="grid w-full grid-cols-2 gap-2 text-xs text-dcg-ink md:w-auto md:grid-cols-3">
            {dataEngineering.map((item) => (
              <div
                key={item}
                className="rounded-full bg-white px-3 py-2 text-center shadow-sm"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
