"use client";

import SuccessStories from "@/components/SuccessStories";
import { WorldMap } from "@/components/WorldMap";
import { InfiniteMovingCards } from "@/components/InfiniteScrollingCards";
import SectionTitle from "@/components/SectionTitle";
import DCGAIPlatformSection from "@/components/DCGAIPlatformSection";
import FinalCTASection from "@/components/FinalCTASection";
import ServicesSection from "@/components/ServicesSection";
import StrategicQuestionsSection from "@/components/StrategicQuestionsSection";
import AIAtWorkSection from "@/components/AIAtWorkSection";
import { WhyDcgBento } from "@/components/WhyDcgBento";
import HeroVideoSection from "@/components/HeroVideo";
import { Timeline } from "@/components/ui/timeline";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import AiCompanies from "@/components/AiCompanies";

const testimonials = [
  {
    quote:
      "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
    name: "Sarah Chen",
    title: "Title",
    designation: "Product Manager at TechFlow",
    src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
    name: "Michael Rodriguez",
    title: "Title",
    designation: "CTO at InnovateSphere",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
    name: "Emily Watson",
    title: "Title",
    designation: "Operations Director at CloudScale",
    src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
    name: "James Kim",
    title: "Title",
    designation: "Engineering Lead at DataPro",
    src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
    name: "Lisa Thompson",
    title: "Title",
    designation: "VP of Technology at FutureNet",
    src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const timeline = [
  {
    title: "1",
    content: (
      <div className=" ">
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
          triggers expansion or renewal plays—so teams can focus on strategic
          customer conversations.
        </p>
      </div>
    ),
  },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-10 min-h-screen">
      {/* <HeroSection /> */}
      <HeroVideoSection />
      {/* <Hero /> */}

      <div className="mx-auto max-w-7xl px-2 md:px-4 flex flex-col gap-10">
        <SectionTitle
          title="Why Choose DCG?"
          subtitle="At DCG we impower organizations to transform ambition into impact. Our cutting-edge solutions combine the latest technology, advanced analytics, and deep industry expertise to unlock growth and deliver measurable value."
          nomb={true}
        />
        <WhyDcgBento />
        {/* <WhyUs /> */}

        {/* <ValuePropositionSection /> */}
        <SectionTitle
          title="We help leaders answer the questions that matter"
          subtitle="From customer growth to AI-ready operating models, we partner with
            executives, boards and founders on the decisions that shape the next
            decade."
          nomb={true}
        />
        <StrategicQuestionsSection />

        <SectionTitle
          title="Productized AI capabilities, tuned for your industry"
          subtitle="Pre-built accelerators that combine reusable AI components with
          sector-specific know-how reducing time-to-value from years to weeks."
          nomb={true}
        />
        <DCGAIPlatformSection />
      </div>

      <Timeline data={timeline} />
      <div className="mx-auto max-w-7xl px-2 md:px-4 flex flex-col gap-10">
        <SectionTitle
          title="Momentum is real. So are the capability gaps."
          subtitle=" Employees are rapidly adopting AI, but training, workflow integration
          and trust are lagging. We help organizations move beyond pilots and
          point tools to system-level impact."
          nomb={true}
        />
        <AIAtWorkSection />
      </div>
      <AiCompanies />
      <div className="mx-auto max-w-7xl px-2 md:px-4 flex flex-col gap-10">
        <SectionTitle
          title={"Success Stories"}
          subtitle="Real results from real projects with industry leaders."
          nomb={true}
        />
        <SuccessStories />

        <SectionTitle
          title="From strategy to implementation, with data at the core"
          subtitle="We design, build and operate the data, AI and technology foundations you need to launch new products, experiences and business models."
          nomb={true}
          center={true}
        />

        <ServicesSection />
      </div>

      {/* <OurProcess /> */}

      <SectionTitle
        title="Our Team Spans the Globe"
        subtitle="Connecting continents with innovative solutions."
        nomb={true}
        center
      />
      <WorldMap
        dots={[
          {
            start: { lat: 51.5074, lng: -0.1278 }, // London
            end: { lat: 6.5244, lng: 3.3792 }, // Lagos, Nigeria
          },
          {
            start: { lat: 51.5074, lng: -0.1278 }, // London
            end: { lat: 28.6139, lng: 77.209 }, // New Delhi
          },
          {
            start: { lat: 51.5074, lng: -0.1278 }, // London
            end: { lat: 47.4979, lng: 19.0402 }, // Budapest
          },
          {
            start: { lat: 51.5074, lng: -0.1278 }, // London
            end: { lat: 40.7128, lng: -74.006 }, // New york
          },
        ]}
      />

      <SectionTitle
        title="What Our Clients Say"
        subtitle="Hear from industry leaders who trust us with their digital transformation."
        nomb={true}
        center={true}
      />

      <InfiniteMovingCards items={testimonials} />
      {/* <BackgroundRippleEffectDemo /> */}
      {/* <AIFutureBuiltSection /> */}
      <BackgroundBeamsWithCollision>
        <FinalCTASection />
      </BackgroundBeamsWithCollision>
    </div>
  );
}
