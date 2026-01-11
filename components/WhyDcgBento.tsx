"use client";

import {
  BarChart3,
  Globe,
  Zap,
  Shield,
  Briefcase,
  BrainCircuit,
  Target,
  Rocket,
} from "lucide-react";

import { GlowingEffect } from "@/components/ui/glowing-effect";

export function WhyDcgBento() {
  return (
    <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
      {/* Proven Results */}
      <GridItem
        area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/4]"
        icon={<BarChart3 className="h-4 w-4 text-black" />}
        title="Generative AI"
        description="£30M+ in cost savings delivered across 200+ projects through data-driven optimisation and intelligent automation."
      />

      {/* Enterprise Security */}
      <GridItem
        area="md:[grid-area:1/7/2/13] xl:[grid-area:1/4/2/7]"
        icon={<Rocket className="h-4 w-4 text-black" />}
        title="Unified Data Platform (UDP)"
        description="Battle-tested teams move rapidly from idea to production, balancing innovation with governance and compliance."
      />

      {/* Deep Sector Expertise */}
      <GridItem
        area="md:[grid-area:2/1/3/7] xl:[grid-area:1/7/2/10]"
        icon={<Briefcase className="h-4 w-4 text-black" />}
        title="Digital Twin (DT)"
        description="Hands-on experience across financial services, energy, retail, technology and transport — helping you see around corners."
      />

      {/* AI-First Strategy */}
      <GridItem
        area="md:[grid-area:2/7/3/13] xl:[grid-area:1/10/2/13]"
        icon={<BrainCircuit className="h-4 w-4 text-black" />}
        title="Artificial Intelligence"
        description="We embed AI and data at the core of your operating model, not as isolated experiments."
      />

      {/* Outcome-Focused Delivery */}
      <GridItem
        area="md:[grid-area:3/1/4/7] xl:[grid-area:2/1/3/7]"
        icon={<Target className="h-4 w-4 text-black" />}
        title="Unified Asset Model (UAM)"
        description="End-to-end design, build and run — with measurable impact on revenue, cost, risk and customer experience."
      />

      {/* Speed & Certainty */}
      <GridItem
        area="md:[grid-area:3/7/4/13] xl:[grid-area:2/7/3/13]"
        icon={<Shield className="h-4 w-4 text-black" />}
        title="Master Data Management (MDM) & Asset Management"
        description="PCI compliant with bank-level security standards ensuring trust, resilience and adherence to global regulations."
      />
    </ul>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
      <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
        <GlowingEffect
          disabled={false}
          proximity={64}
          spread={40}
          borderWidth={1.5}
          variant="dcg"
        />
        <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 ">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-gray-600 p-2">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="-tracking-4 pt-0.5 font-sans text-xl/[1.375rem] font-semibold text-balance text-black md:text-2xl/[1.875rem] ">
                {title}
              </h3>
              <p className="font-sans text-sm/[1.125rem] text-black md:text-base/[1.375rem] ">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
