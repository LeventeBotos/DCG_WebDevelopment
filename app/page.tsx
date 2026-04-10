import dynamic from "next/dynamic";
import SectionTitle from "@/components/SectionTitle";
import ContactCtaSection from "@/components/ContactCtaSection";
import HeroVideoSection from "@/components/HeroVideo";
import DeferredRender from "@/components/DeferredRender";

const WhyDcgBento = dynamic(
  () => import("@/components/WhyDcgBento").then((module) => module.WhyDcgBento),
  {
    loading: () => (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <div
            key={index}
            className="min-h-[220px] rounded-2xl border border-slate-200 bg-slate-50/80"
          />
        ))}
      </div>
    ),
  }
);

const StrategicQuestionsSection = dynamic(
  () => import("@/components/StrategicQuestionsSection"),
  {
    loading: () => <div className="min-h-[340px] rounded-2xl bg-slate-50/80" />,
  }
);

const DCGAIPlatformSection = dynamic(
  () => import("@/components/DCGAIPlatformSection"),
  {
    loading: () => <div className="min-h-[420px] rounded-2xl bg-slate-50/80" />,
  }
);

const HomeTimelineSection = dynamic(
  () =>
    import("@/components/HomeDeferredSections").then(
      (module) => module.HomeTimelineSection
    ),
  {
    loading: () => <div className="min-h-[620px] w-full bg-slate-50/60" />,
  }
);

const AIAtWorkSection = dynamic(() => import("@/components/AIAtWorkSection"), {
  loading: () => <div className="min-h-[460px] rounded-2xl bg-slate-50/80" />,
});

const AiCompaniesVideo = dynamic(() => import("@/components/AiCompaniesVideo"), {
  loading: () => <div className="min-h-[440px] w-full bg-slate-50/60" />,
});

const HomeDeferredSections = dynamic(
  () => import("@/components/HomeDeferredSections"),
  {
    loading: () => <div className="min-h-[720px] w-full bg-slate-50/60" />,
  }
);

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center gap-10">
      <HeroVideoSection />
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-2 md:px-4">
        <SectionTitle
          title="Unlocking Potential & Delivering Business Value at Speed"
          subtitle="At DCG we impower organizations to transform ambition into impact. Our cutting-edge solutions combine the latest technology, advanced analytics, and deep industry expertise to unlock growth and deliver measurable value."
          nomb={true}
        />
        <WhyDcgBento />

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
      <DeferredRender
        placeholder={<div className="min-h-[620px] w-full bg-slate-50/60" />}
      >
        <HomeTimelineSection />
      </DeferredRender>
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
      <DeferredRender
        placeholder={<div className="min-h-[440px] w-full bg-slate-50/60" />}
      >
        <AiCompaniesVideo />
      </DeferredRender>
      <DeferredRender
        placeholder={<div className="min-h-[720px] w-full bg-slate-50/60" />}
      >
        <HomeDeferredSections />
      </DeferredRender>
      <ContactCtaSection
        eyebrow="Next step"
        title="Let's build tomorrow together."
        description="Whether you're exploring your first AI use-cases or scaling an existing data and AI portfolio, we help you move from slideware to impact quickly and responsibly."
        primaryLabel="Schedule a conversation"
        primaryHref="/contact"
        secondaryLabel="Explore services"
        secondaryHref="/services"
      />
    </div>
  );
}
