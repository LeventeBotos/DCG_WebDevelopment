import { ValueCard } from "./shared";

export default function ValuePropositionSection() {
  return (
    <section className="border-t border-dcg-lightBlue/20 bg-gradient-to-b from-white to-dcg-sand">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight text-dcg-ink md:text-3xl">
            Why Data Consulting Group
          </h2>
          <p className="mt-3 text-sm text-dcg-slate md:text-base">
            We combine deep sector expertise, AI-first thinking and an investor
            mindset to help leaders capture outsized returns from digital and
            data.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <ValueCard
            title="Deep sector expertise"
            body="Consultants with hands-on experience in financial services, energy, retail, technology and transport help you see around corners."
          />
          <ValueCard
            title="AI-first strategy"
            body="We put data and AI at the core of your operating model, not as side projects or isolated experiments."
          />
          <ValueCard
            title="Outcome-focused delivery"
            body="End-to-end design, build and run – with measurable impact on revenue, cost, risk and experience."
          />
          <ValueCard
            title="Speed and certainty"
            body="Battle-tested teams rapidly move from idea to production, balancing innovation with risk and compliance."
          />
        </div>
      </div>
    </section>
  );
}
