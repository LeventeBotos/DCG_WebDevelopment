import Link from "next/link";

export default function AgenticEnterpriseSection() {
  return (
    <section className="border-t border-dcg-lightBlue/20 bg-dcg-sand">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 md:flex-row md:items-center">
        <div className="flex-1 space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-dcg-blue">
            Agentic Enterprise
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-dcg-ink md:text-3xl">
            From isolated tools to AI agents embedded in work
          </h2>
          <p className="text-sm text-dcg-slate md:text-base">
            The next stage of digital maturity is the Agentic Enterprise – where
            AI agents are woven into your workflows, systems and teams,
            orchestrating decisions and actions end-to-end.
          </p>
          <ul className="space-y-2 text-sm text-dcg-slate">
            <li>
              • The shift is more architectural than algorithmic – rewiring how
              work gets done, not just adding another model.
            </li>
            <li>
              • AI agents observe, learn and act across systems, removing
              friction from complex processes.
            </li>
            <li>
              • AI-future-built companies create a widening performance gap
              versus peers as they reinvest in new capabilities.
            </li>
          </ul>
          <Link
            href="/solutions/agentic-enterprise"
            className="inline-flex items-center justify-center rounded-full border border-dcg-lightBlue/30 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-dcg-blue shadow-sm transition hover:-translate-y-0.5 hover:border-dcg-lightBlue/60 hover:shadow-md"
          >
            Discover the Agentic Enterprise
          </Link>
        </div>

        <div className="flex-1">
          <div className="rounded-3xl border border-dcg-lightBlue/20 bg-white p-5 text-sm text-dcg-slate shadow-md">
            <h3 className="mb-3 text-sm font-semibold text-dcg-ink">
              Five AI agents every B2B sales leader needs
            </h3>
            <ol className="space-y-1.5 text-xs md:text-sm">
              <li>1. Pipeline orchestration & forecasting agent</li>
              <li>2. Lead generation & qualification agent</li>
              <li>3. Deal coaching, pricing & conversion agent</li>
              <li>4. Account intelligence & expansion agent</li>
              <li>5. Customer success & retention agent</li>
            </ol>
            <p className="mt-4 text-xs text-dcg-slate">
              We design and deploy these agents to work across your CRM, data
              platform and collaboration tools – so your teams can focus on
              high-value work.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
