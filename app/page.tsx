import SectionTitle from "@/components/SectionTitle";
import DCGAIPlatformSection from "@/components/DCGAIPlatformSection";
import ContactCtaSection from "@/components/ContactCtaSection";
import StrategicQuestionsSection from "@/components/StrategicQuestionsSection";
import AIAtWorkSection from "@/components/AIAtWorkSection";
import { WhyDcgBento } from "@/components/WhyDcgBento";
import HeroVideoSection from "@/components/HeroVideo";
import AiCompaniesVideo from "@/components/AiCompaniesVideo";
import HomeDeferredSections, {
  HomeTimelineSection,
} from "@/components/HomeDeferredSections";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-10 min-h-screen">
      {/* <HeroSection /> */}
      <HeroVideoSection />
      {/* <Hero /> */}
      <div className="mx-auto max-w-7xl px-2 md:px-4 flex flex-col gap-10">
        <SectionTitle
          title="Unlocking Potential & Delivering Business Value at Speed"
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
      <HomeTimelineSection />
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
      <AiCompaniesVideo />
      <HomeDeferredSections />
      {/* <BackgroundRippleEffectDemo /> */}
      {/* <AIFutureBuiltSection /> */}
      {/* <BackgroundBeamsWithCollision> */}
      {/* <div className="relative w-full min-h-96">
        <DottedGlowBackground
          className="pointer-events-none [mask-image:radial-gradient(circle_at_center,black_0%,black_40%,transparent_95%)]"
          opacity={0.5}
          gap={10}
          radius={1.6}
          colorLightVar="--dcg-lightBlue"
          glowColorLightVar="--dcg-lightGreen"
          colorDarkVar="--dcg-lightBlue"
          glowColorDarkVar="--dcg-lightGreen"
          backgroundOpacity={0}
          speedMin={0.3}
          speedMax={1.6}
          speedScale={1}
        />
        <ContactCtaSection
          eyebrow="Next step"
          title="Let's build tomorrow together."
          description="Whether you're exploring your first AI use-cases or scaling an existing data and AI portfolio, we help you move from slideware to impact quickly and responsibly."
          primaryLabel="Schedule a conversation"
          primaryHref="/contact"
          secondaryLabel="Explore services"
          secondaryHref="/services"
          className="border-t-0 pt-10 md:pt-12"
        />
      </div>{" "} */}
      <ContactCtaSection
        eyebrow="Next step"
        title="Let's build tomorrow together."
        description="Whether you're exploring your first AI use-cases or scaling an existing data and AI portfolio, we help you move from slideware to impact quickly and responsibly."
        primaryLabel="Schedule a conversation"
        primaryHref="/contact"
        secondaryLabel="Explore services"
        secondaryHref="/services"
      />
      {/* </BackgroundBeamsWithCollision> */}
    </div>
  );
}
