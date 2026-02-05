import type { Metadata } from "next";
import Link from "next/link";
import { platformCards } from "@/lib/platforms";
import { Button } from "@/components/ui/button";
import SubpageHero from "@/components/SubpageHero";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Explore DCG’s productized AI platforms and accelerators designed to deliver value fast.",
  alternates: { canonical: "/solutions" },
  openGraph: {
    title: "Solutions | Data Consulting Group",
    description:
      "Explore DCG’s productized AI platforms and accelerators designed to deliver value fast.",
    url: "/solutions",
  },
  twitter: {
    card: "summary",
    title: "Solutions | Data Consulting Group",
    description:
      "Explore DCG’s productized AI platforms and accelerators designed to deliver value fast.",
  },
};

export default function SolutionsIndexPage() {
  return (
    <div className="min-h-screen bg-white">
      <SubpageHero
        eyebrow="DCG AI Platform"
        title="Productized AI capabilities, tuned for your industry."
        emphasis="Productized AI"
        description="Choose a platform to see the accelerators, launch patterns, and operating model we bring to co-deliver value fast."
      />

      <section className="dcg-section pb-16">
        <BentoGrid className="mx-0 grid-cols-1 md:auto-rows-[16rem] md:grid-cols-2 lg:grid-cols-4">
          {platformCards.map((card, index) => (
            <BentoGridItem
              key={card.href}
              className={`overflow-hidden border border-dcg-lightBlue/20 bg-white/95 shadow-lg hover:shadow-xl ${
                index === 0 ? "md:col-span-2" : ""
              }`}
              title={<span className="text-dcg-ink">{card.title}</span>}
              description={
                <div className="space-y-3">
                  <p className="text-sm text-dcg-slate">{card.body}</p>
                  <Button asChild variant="secondary" size="sm">
                    <Link href={card.href}>Explore</Link>
                  </Button>
                </div>
              }
              header={
                <div
                  className="flex items-center justify-between rounded-2xl p-4"
                  style={{
                    background: `linear-gradient(135deg, rgba(${card.colors[0].join(",")},0.12), rgba(${card.colors[1].join(",")},0.18))`,
                  }}
                >
                  <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-dcg-slate">
                    DCG AI Platform
                  </span>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-dcg-ink shadow-sm">
                    {index + 1} / {platformCards.length}
                  </span>
                </div>
              }
              icon={<div className="h-2 w-2 rounded-full bg-dcg-lightBlue" />}
            />
          ))}
        </BentoGrid>
      </section>
    </div>
  );
}
