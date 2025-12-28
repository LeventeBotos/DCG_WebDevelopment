import Link from "next/link";
import { platformCards } from "@/lib/platforms";
import { Button } from "@/components/ui/button";

export default function SolutionsIndexPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dcg-lightBlue/10 via-white to-dcg-lightGreen/10" />
        <div className="relative dcg-section py-16 md:py-20 space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-dcg-slate">
            DCG AI Platform
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-dcg-ink">
            Productized AI capabilities, tuned for your industry.
          </h1>
          <p className="max-w-3xl text-lg text-dcg-slate">
            Choose a platform to see the accelerators, launch patterns, and operating model we bring to co-deliver value fast.
          </p>
        </div>
      </section>

      <section className="dcg-section pb-16">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {platformCards.map((card) => (
            <div
              key={card.href}
              className="group relative overflow-hidden rounded-2xl border border-dcg-lightBlue/20 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div
                className="absolute inset-0 opacity-0 transition group-hover:opacity-100"
                style={{
                  background: `linear-gradient(135deg, rgba(${card.colors[0].join(",")},0.08), rgba(${card.colors[1].join(",")},0.14))`,
                }}
              />
              <div className="relative flex h-full flex-col gap-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-dcg-slate">
                  DCG AI Platform
                </p>
                <h3 className="text-xl font-semibold text-dcg-ink">{card.title}</h3>
                <p className="text-sm text-dcg-slate">{card.body}</p>
                <div className="mt-auto">
                  <Button asChild variant="ghost" size="sm" showArrow>
                    <Link href={card.href}>Explore</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
