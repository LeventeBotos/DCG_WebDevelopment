"use client";

import dynamic from "next/dynamic";
import SectionTitle from "@/components/SectionTitle";

const Timeline = dynamic(
  () => import("@/components/ui/timeline").then((module) => module.Timeline),
  {
    ssr: false,
    loading: () => <div className="min-h-[720px] w-full bg-white" />,
  }
);

const SuccessStoriesSection = dynamic(
  () => import("@/components/SuccessStories"),
  {
    ssr: false,
    loading: () => (
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }, (_, index) => (
          <div
            key={index}
            className="min-h-[260px] rounded-2xl border border-slate-200 bg-slate-50/80"
          />
        ))}
      </div>
    ),
  }
);

const WorldMapSection = dynamic(
  () => import("@/components/WorldMap").then((module) => module.WorldMap),
  {
    ssr: false,
    loading: () => <div className="h-[320px] w-full rounded-lg bg-slate-50" />,
  }
);

const TestimonialsCarousel = dynamic(
  () =>
    import("@/components/InfiniteScrollingCards").then(
      (module) => module.InfiniteMovingCards
    ),
  {
    ssr: false,
    loading: () => (
      <div className="h-[220px] w-full max-w-7xl rounded-2xl bg-slate-50" />
    ),
  }
);

const testimonials = [
  {
    quote:
      "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
    name: "Sarah Chen",
    title: "Title",
  },
  {
    quote:
      "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
    name: "Michael Rodriguez",
    title: "Title",
  },
  {
    quote:
      "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
    name: "Emily Watson",
    title: "Title",
  },
  {
    quote:
      "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
    name: "James Kim",
    title: "Title",
  },
  {
    quote:
      "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
    name: "Lisa Thompson",
    title: "Title",
  },
];

const timeline = [
  {
    title: "1",
    content: (
      <div>
        <h3 className="mb-3 text-2xl font-semibold text-dcg-ink">
          Pipeline Orchestration & Forecasting Agent
        </h3>
        <p className="text-xs leading-relaxed text-dcg-slate md:text-sm">
          Translates high-level growth targets into executable workflows,
          coordinating sales, marketing, and success to maintain real-time
          pipeline and forecast accuracy.
        </p>
      </div>
    ),
  },
  {
    title: "2",
    content: (
      <div>
        <h3 className="mb-3 text-2xl font-semibold text-dcg-ink">
          Lead Generation & Qualification Agent
        </h3>
        <p className="text-xs leading-relaxed text-dcg-slate md:text-sm">
          Identifies and prioritizes ideal accounts using first-party,
          third-party and intent signals, ensuring teams focus on opportunities
          with the highest probability to convert.
        </p>
      </div>
    ),
  },
  {
    title: "3",
    content: (
      <div>
        <h3 className="mb-3 text-2xl font-semibold text-dcg-ink">
          Deal Conversion & Pricing Agent
        </h3>
        <p className="text-xs leading-relaxed text-dcg-slate md:text-sm">
          Crafts proposals, aligns pricing with guardrails, coordinates legal
          and finance, and accelerates deal cycles while maintaining margin
          integrity.
        </p>
      </div>
    ),
  },
  {
    title: "4",
    content: (
      <div>
        <h3 className="mb-3 text-2xl font-semibold text-dcg-ink">
          Account Intelligence & Opportunity Mapping Agent
        </h3>
        <p className="text-xs leading-relaxed text-dcg-slate md:text-sm">
          Builds a dynamic map of buying groups, identifies whitespace,
          interprets intent signals, and recommends next best actions,
          narratives, and plays.
        </p>
      </div>
    ),
  },
  {
    title: "5",
    content: (
      <div>
        <h3 className="mb-3 text-2xl font-semibold text-dcg-ink">
          Customer Success & Retention Agent
        </h3>
        <p className="text-xs leading-relaxed text-dcg-slate md:text-sm">
          Monitors product usage and engagement, flags churn risks early, and
          triggers expansion or renewal plays, so teams can focus on strategic
          customer conversations.
        </p>
      </div>
    ),
  },
];

const worldMapDots = [
  {
    start: { lat: 51.5074, lng: -0.1278 },
    end: { lat: 6.5244, lng: 3.3792 },
  },
  {
    start: { lat: 51.5074, lng: -0.1278 },
    end: { lat: 28.6139, lng: 77.209 },
  },
  {
    start: { lat: 51.5074, lng: -0.1278 },
    end: { lat: 47.4979, lng: 19.0402 },
  },
  {
    start: { lat: 51.5074, lng: -0.1278 },
    end: { lat: 40.7128, lng: -74.006 },
  },
];

export function HomeTimelineSection() {
  return (
    <>
      <SectionTitle
        title="Five AI Agents Every Sales Leader Needs to Know"
        subtitle="Humans and AI are beginning to work as coordinated systems. Specialized AI agents now connect across the revenue stack to orchestrate workflows, uncover opportunities, and drive customer adoption with precision."
        nomb={false}
        center
      />
      <Timeline data={timeline} showTitle={false} className="-mt-6" />
    </>
  );
}

export default function HomeDeferredSections() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-2 md:px-4 flex flex-col gap-10">
        <SectionTitle
          title={"Success Stories"}
          subtitle="Real results from real projects with industry leaders."
          nomb={true}
        />
        <SuccessStoriesSection />
      </div>

      <SectionTitle
        title="Our Team Spans the Globe"
        subtitle="Connecting continents with innovative solutions."
        nomb={true}
        center
      />
      <WorldMapSection dots={worldMapDots} />

      <SectionTitle
        title="What Our Clients Say"
        subtitle="Hear from industry leaders who trust us with their digital transformation."
        nomb={true}
        center={true}
      />
      <TestimonialsCarousel items={testimonials} />
    </>
  );
}
