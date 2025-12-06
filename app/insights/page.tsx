"use client";

const articles = [
  {
    title: "Agentic Enterprise",
    content:
      "Companies are moving away from isolated AI tools to embedded agents that observe, learn, and act across systems. The shift is more architectural than algorithmic—rewriting how business decisions are made and reducing friction across workflows.",
    highlights: [
      "At-scale workflows reimagined with AI agents at the core, not pilots",
      "Human oversight balanced with agent autonomy for safe acceleration",
      "Early movers deliver outsized returns by redesigning decisions",
    ],
  },
  {
    title: "AI at Work: Momentum Builds, But Gaps Remain",
    content:
      "72% of employees use AI regularly, yet frontline adoption stalls at 51%. Only 36% are satisfied with training—five hours of instruction, in-person sessions, and coaching unlock better outcomes. The Global South leads adoption (India 92% vs. Japan 51%).",
    highlights: [
      "41% of employees fear job loss—invest in people to unlock value",
      "From adoption to value: redesign end-to-end processes with agents",
      "AI agents seen as critical, yet only 13% are integrated today",
    ],
  },
  {
    title: "Digital, Technology & Data",
    content:
      "Outside-in insights plus deep sector expertise to solve complex strategic issues. AI is redefining how organizations connect with buyers—pair human judgment with AI-driven precision to make sales faster, more relevant, and more consistent.",
    highlights: [
      "B2B sales shifting from intuition to systematic, data-driven models",
      "Rapidly turn ideas into action with speed and certainty",
      "Outcome-focused programs with measurable, sustainable results",
    ],
  },
  {
    title: "AI Future-Built Readiness",
    content:
      "Only 5% of firms are AI future-built; 35% are scaling. Future-built leaders achieve 5x revenue increases and 3x cost reductions, reinvesting gains into new capabilities, tools, and innovations.",
    highlights: [
      "AI-future-built firms widen the value gap as they reinvest",
      "Scaling requires reinvestment into tooling, people, and training",
      "Agentic interfaces accelerate value realization across teams",
    ],
  },
];

const salesAgents = [
  "Orchestration Agents: break down growth goals and coordinate execution.",
  "Lead Generation Agents: consolidate signals, score leads, and time outreach.",
  "Deal Conversion & Pricing Agents: craft proposals, price deals, coordinate finance and legal.",
  "Qualification Agents: engage the right buyers with real-time value propositions.",
  "Customer Success Agents: drive adoption, mitigate churn risks, and spark expansion.",
];

export default function InsightsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-dcg-sand to-white" />
        <div className="relative dcg-section py-20 md:py-28 space-y-6">
          <p className="text-sm font-semibold text-dcg-lightGreen uppercase tracking-[0.2em]">
            Insights
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-dcg-ink max-w-4xl leading-tight">
            Digital, Technology &amp; Data, Agentic Enterprise, and AI at Work.
          </h1>
          <p className="text-lg text-dcg-slate max-w-3xl">
            Thought-leadership and playbooks on AI-first growth, agentic
            architectures, and the training needed to make adoption stick.
          </p>
        </div>
      </section>

      <section className="dcg-section py-16 md:py-20 space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          {articles.map((article) => (
            <div
              key={article.title}
              className="flex h-full flex-col gap-4 dcg-card"
            >
              <div>
                <p className="text-sm font-semibold text-dcg-lightGreen uppercase tracking-[0.18em]">
                  Article
                </p>
                <h2 className="text-xl font-semibold text-dcg-ink">
                  {article.title}
                </h2>
              </div>
              <p className="text-sm text-dcg-ink">{article.content}</p>
              <ul className="space-y-2 text-sm text-dcg-slate">
                {article.highlights.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-dcg-lightBlue" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="dcg-card-muted">
          <h2 className="text-xl font-semibold text-dcg-ink">
            The vision of humans and AI working together in B2B is real.
          </h2>
          <p className="mt-2 text-sm text-dcg-slate">
            Specialized AI agents connect across the sales technology stack to
            coordinate workflows, identify leads, and drive adoption. By
            balancing autonomy with human oversight, companies can achieve
            greater growth and efficiency while keeping relationships at the
            center.
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {salesAgents.map((agent) => (
              <div
                key={agent}
                className="flex items-start gap-2 rounded-2xl bg-white p-4 shadow-sm"
              >
                <span className="mt-1 h-2 w-2 rounded-full bg-dcg-lightGreen" />
                <p className="text-sm text-dcg-ink">{agent}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="dcg-card space-y-4">
          <h2 className="text-xl font-semibold text-dcg-ink">
            DCG AI Platform (Personalization AI)
          </h2>
          <p className="text-sm text-dcg-ink">
            Intelligent, automated, and personalized journeys that elevate every
            interaction. Conversational analytics drives engagement and loyalty
            with AI-powered conversations, while Smart Banking AI surfaces a
            consolidated view of key insights and actions. DCG 360
            AI-powered (Salesforce) accelerates CRM advancement by automating
            diagnostics, building actionable recommendations, and strengthening
            data foundations.
          </p>
          <div className="grid gap-3 md:grid-cols-2 text-sm text-dcg-slate">
            <div className="rounded-2xl bg-dcg-sand p-4">
              <p className="font-semibold text-dcg-ink">Questions we answer</p>
              <ul className="mt-2 space-y-2">
                {[
                  "How do you reach and engage the right customers?",
                  "How do you convert, support, and grow your customers?",
                  "How do you lay the path for an AI-first future?",
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-dcg-lightGreen" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-dcg-sand p-4">
              <p className="font-semibold text-dcg-ink">Data & Engineering Services</p>
              <ul className="mt-2 space-y-2">
                {[
                  "Data and Analytics",
                  "Artificial Intelligence & Generative AI",
                  "Cloud Computing",
                  "Cyber Security & Digital Risk",
                  "Robotics & Advanced Automation",
                  "MLOps & DevOps",
                  "IoT and Digital Twin",
                  "Energy Transformation",
                  "Research & Development",
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-dcg-lightBlue" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
