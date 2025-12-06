import { PlatformCard } from "./shared";

export default function DCGAIPlatformSection() {
  return (
    <section className="border-t border-dcg-lightBlue/20 bg-gradient-to-b from-dcg-sand to-white">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-10 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-dcg-blue">
            DCG AI Platform
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-dcg-ink md:text-3xl">
            Productized AI capabilities, tuned for your industry
          </h2>
          <p className="mt-3 text-sm text-dcg-slate md:text-base">
            Pre-built accelerators that combine reusable AI components with
            sector-specific know-how – reducing time-to-value from years to
            weeks.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <PlatformCard
            title="Personalization AI"
            body="Design and orchestrate intelligent, automated and personalized customer journeys across web, app, marketing and service."
            href="/solutions/dcg-ai-platform"
          />
          <PlatformCard
            title="Conversational Analytics & Commerce"
            body="Use AI-driven conversations to acquire, convert and support customers, while capturing rich behavioral and intent data."
            href="/solutions/dcg-ai-platform"
          />
          <PlatformCard
            title="Smart Banking AI"
            body="Provide bankers and relationship managers with a 360° view of clients, opportunities, risks and recommended next best actions."
            href="/solutions/dcg-ai-platform"
          />
          <PlatformCard
            title="DCG 360 Salesforce Assessment"
            body="Automate diagnostics on your CRM landscape and generate a prioritized roadmap for process, data and AI improvements."
            href="/solutions/dcg-ai-platform"
          />
        </div>
      </div>
    </section>
  );
}
