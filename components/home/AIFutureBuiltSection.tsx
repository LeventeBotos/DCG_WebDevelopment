import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AIFutureBuiltSection() {
  return (
    <section className="border-t border-dcg-lightBlue/20 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-dcg-blue">
              AI future-built
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-dcg-ink md:text-3xl">
              Is your company capturing the full AI upside?
            </h2>
            <p className="text-sm text-dcg-slate md:text-base">
              Only a small share of organizations can be considered AI
              future-built – yet they report dramatically higher revenue growth
              and cost reductions. The gap is widening as leaders reinvest in
              data, AI and digital capabilities.
            </p>
            <ul className="space-y-2 text-sm text-dcg-slate">
              <li>• Clear AI strategy linked to business outcomes</li>
              <li>• Modern data & technology foundations</li>
              <li>• Embedded AI agents across key workflows</li>
              <li>• Strong governance, risk and responsible AI</li>
            </ul>
            <Button
              asChild
              variant="primary"
              size="lg"
              // className="text-xs font-semibold uppercase tracking-[0.18em]"
            >
              <Link href="/solutions/ai-future-built-assessment">
                Assess your AI maturity
              </Link>
            </Button>
          </div>
          <div className="rounded-3xl border border-dcg-lightBlue/20 bg-dcg-sand p-5 text-sm text-dcg-slate shadow-md">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-dcg-slate">
              What we assess
            </p>
            <ul className="mt-3 space-y-1.5 text-xs md:text-sm">
              <li>• Strategy, vision and portfolio</li>
              <li>• Data, platforms and architecture</li>
              <li>• Operating model and capabilities</li>
              <li>• Use-case pipeline and value tracking</li>
              <li>• Governance, ethics and compliance</li>
            </ul>
            <p className="mt-4 text-xs text-dcg-slate">
              You receive a clear view of where you stand today, and a
              prioritized roadmap of no-regret moves for the next 12–24 months.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
