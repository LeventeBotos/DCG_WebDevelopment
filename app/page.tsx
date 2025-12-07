"use client";

import WhyUs from "@/components/WhyUs";
import OurProcess from "@/components/OurProcess";
import SuccessStories from "@/components/SuccessStories";
import { WorldMap } from "@/components/WorldMap";
import { InfiniteMovingCards } from "@/components/InfiniteScrollingCards";
import SectionTitle from "@/components/SectionTitle";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import AgenticEnterpriseSection from "@/components/home/AgenticEnterpriseSection";
import DCGAIPlatformSection from "@/components/home/DCGAIPlatformSection";
import FinalCTASection from "@/components/home/FinalCTASection";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import StrategicQuestionsSection from "@/components/home/StrategicQuestionsSection";
import ValuePropositionSection from "@/components/home/ValuePropositionSection";
import AIAtWorkSection from "@/components/home/AIAtWorkSection";
import Hero from "@/components/Hero";
import { WhyDcgBento } from "@/components/home/WhyDcgBento";
import { AgenticEnterpriseForB2BSalesSection } from "@/components/home/EveryoneNeeds";

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

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-20 min-h-screen">
      {/* <HeroSection /> */}
      <Hero />
      <div className="mx-auto max-w-7xl px-2 md:px-4 flex flex-col gap-20">
        <SectionTitle title="Why Choose DCG?" subtitle="" nomb={true} />
        <WhyDcgBento />
        {/* <WhyUs /> */}

        {/* <ValuePropositionSection /> */}
        <StrategicQuestionsSection />

        <DCGAIPlatformSection />
        {/* <AgenticEnterpriseSection /> */}
        <AgenticEnterpriseForB2BSalesSection />
        <AIAtWorkSection />

        <div className="flex flex-col items-center  self-center text-center">
          <TextHoverEffect text="Only 5%" />
          <div className="md:w-2/3 self-center flex flex-col items-center">
            <p className="pb-10 text-3xl md:text-5xl font-semibold">
              of firms are AI future-built
            </p>
            <p className="opacity-50 text-xl md:text-3xl">
              yet they capture five times the revenue increases and three times
              the cost reductions of other firms
            </p>
          </div>
        </div>

        <ServicesSection />
      </div>

      {/* <OurProcess /> */}

      <SectionTitle
        title="Our Team Spans the Globe"
        subtitle="Connecting continents with innovative solutions."
        nomb={true}
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

      <SuccessStories />

      <SectionTitle
        title="What Our Clients Say"
        subtitle="Hear from industry leaders who trust us with their digital transformation."
        nomb={true}
      />
      <InfiniteMovingCards items={testimonials} />

      {/* <AIFutureBuiltSection /> */}
      <FinalCTASection />
    </div>
  );
}
