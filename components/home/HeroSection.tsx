import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StatRow } from "./shared";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,154,202,0.12)_0,_transparent_55%),_radial-gradient(circle_at_bottom,_rgba(0,202,202,0.12)_0,_transparent_55%)]" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-20 pt-24 md:flex-row md:items-center md:pt-32">
        <div className="flex-1 space-y-6">
          <span className="inline-flex items-center rounded-full border border-dcg-lightBlue/25 bg-white/80 px-3 py-1 text-xs font-medium uppercase tracking-[0.15em] text-dcg-blue shadow-sm">
            Data · AI · Transformation
          </span>

          <h1 className="text-balance text-4xl font-semibold tracking-tight text-dcg-ink sm:text-5xl lg:text-6xl">
            Future-built AI for
            <span className="block text-dcg-lightBlue">
              real-world business impact
            </span>
          </h1>

          <p className="max-w-xl text-base text-dcg-slate sm:text-lg">
            Data Consulting Group empowers organizations to transform ambition
            into impact with AI-powered, data-driven solutions that deliver
            measurable value across industries.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button asChild variant="primary" size="lg">
              <Link href="/contact">Talk to an expert</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/solutions">Explore our solutions</Link>
            </Button>
          </div>

          <p className="pt-4 text-xs uppercase tracking-[0.2em] text-dcg-slate">
            Trusted by leaders in retail · energy · finance · technology ·
            transportation
          </p>
        </div>

        <div className="flex-1">
          <div className="relative mx-auto max-w-md rounded-3xl border border-dcg-lightBlue/25 bg-white p-6 shadow-xl shadow-dcg-lightBlue/20">
            <div className="mb-4 flex items-center justify-between text-xs font-medium text-dcg-slate">
              <span>AI value dashboard</span>
              <span className="rounded-full border border-dcg-lightBlue/25 bg-dcg-lightGreen/15 px-2 py-1 text-[10px] font-semibold text-dcg-blue">
                Live
              </span>
            </div>
            <div className="space-y-4 text-sm">
              <StatRow label="Revenue uplift" value="+5×" badge="AI future-built" />
              <StatRow label="Cost reduction" value="3×" badge="vs. peers" />
              <StatRow label="Time-to-value" value="6–12 weeks" />
              <div className="mt-2 rounded-2xl border border-dcg-lightBlue/20 bg-dcg-sand p-3">
                <p className="text-xs text-dcg-slate">
                  We blend sector intelligence, advanced analytics and modern
                  engineering to unlock new products, services and efficiencies
                  across your value chain.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
