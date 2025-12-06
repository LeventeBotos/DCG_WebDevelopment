import Link from "next/link";
import { StatCard } from "./shared";

export default function AIAtWorkSection() {
  return (
    <section className="border-t border-dcg-lightBlue/20 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-10 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-dcg-blue">
            AI at work
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-dcg-ink md:text-3xl">
            Momentum is real. So are the capability gaps.
          </h2>
          <p className="mt-3 text-sm text-dcg-slate md:text-base">
            Employees are rapidly adopting AI, but training, workflow
            integration and trust are lagging. We help organizations move beyond
            pilots and point tools to system-level impact.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <StatCard
            label="Regular AI users"
            value="72%"
            note="but adoption on the frontline is much lower"
          />
          <StatCard
            label="Satisfied with AI training"
            value="36%"
            note="highlighting a large enablement gap"
          />
          <StatCard
            label="Fear job loss from AI"
            value="41%"
            note="showing why responsible AI and upskilling matter"
          />
          <StatCard
            label="AI agents in workflows"
            value="13%"
            note="most companies still treat AI as isolated tools"
          />
        </div>

        <div className="mt-8">
          <Link
            href="/insights"
            className="text-sm font-semibold text-dcg-blue hover:underline"
          >
            Read our latest insights on AI at work →
          </Link>
        </div>
      </div>
    </section>
  );
}
