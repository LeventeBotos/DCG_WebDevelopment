import { PlatformCard } from "./shared";

export default function DCGAIPlatformSection() {
  return (
    <section>
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
    </section>
  );
}
