"use client";

import React from "react";
import Link from "next/link";
import SubpageHero from "@/components/SubpageHero";
import { Button } from "@/components/ui/button";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@/components/ui/draggable-card";

type Role = {
  title: string;
  location: string;
  responsibilities: string[];
  emailSubject: string;
};

const roles: Role[] = [
  {
    title: "ML Engineer",
    location: "London / Remote",
    responsibilities: [
      "Build and productionize ML models and agentic workflows",
      "Collaborate with data engineers on pipelines and feature stores",
      "Partner with clients to translate goals into experiments",
    ],
    emailSubject: "ML%20Engineer%20application",
  },
  {
    title: "Cloud Solutions Engineer",
    location: "London / Remote",
    responsibilities: [
      "Design and implement data platforms across Azure/AWS/GCP",
      "Set up observability, governance, and security controls",
      "Enable teams with templates for rapid delivery",
    ],
    emailSubject: "Cloud%20Solutions%20Engineer%20application",
  },
  {
    title: "Data & Analytics Consultant",
    location: "London / Remote",
    responsibilities: [
      "Lead discovery and roadmap workshops with executives",
      "Shape KPI frameworks and data storytelling",
      "Guide adoption, training, and change management",
    ],
    emailSubject: "Data%20%26%20Analytics%20Consultant%20application",
  },
];

function RoleCard({
  role,
  className,
  index,
}: {
  role: Role;
  className: string;
  index: number;
}) {
  return (
    <DraggableCardBody
      className={[
        className,
        "group w-[26rem] max-w-[92vw] rounded-3xl border border-neutral-200 bg-white p-6",
        "shadow-[0_30px_80px_-35px_rgba(0,0,0,0.15)]",
        "transition-all duration-300 hover:shadow-[0_40px_100px_-30px_rgba(0,0,0,0.22)]",
      ].join(" ")}
    >
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400">
          Role {index + 1}
        </p>
        <h3 className="text-xl font-semibold text-neutral-900">{role.title}</h3>
        <p className="text-sm text-neutral-500">{role.location}</p>
      </div>

      <div className="mt-5 h-px w-full bg-neutral-100" />

      <ul className="mt-5 space-y-3 text-sm text-neutral-700">
        {role.responsibilities.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-neutral-400" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-between">
        <span className="text-xs text-neutral-400">Email intro + CV</span>

        <Button asChild size="sm">
          <Link
            href={`mailto:info@dataconsulting-group.com?subject=${role.emailSubject}`}
          >
            Apply
          </Link>
        </Button>
      </div>
    </DraggableCardBody>
  );
}

export default function CareersPage() {
  return (
    <div className="flex flex-col bg-white">
      <SubpageHero
        eyebrow="Careers"
        title="Build the AI-first future with DCG."
        emphasis="AI-first"
        description="We are a consulting team focused on AI, ML, cloud solutions, and data platforms. Join us if you want to ship meaningful work, mentor clients, and shape how enterprises use data and AI every day."
        actions={[
          {
            label: "Email your resume",
            href: "mailto:info@dataconsulting-group.com?subject=Careers%20at%20DCG",
            variant: "primary",
          },
        ]}
      />

      {/* FULL SCREEN DRAG AREA */}
      <section className="relative h-screen w-full overflow-hidden bg-white">
        <DraggableCardContainer className="relative flex h-full w-full items-center justify-center overflow-hidden">
          <div className="pointer-events-none absolute top-20 left-1/2 -translate-x-1/2 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-neutral-400">
              Open Roles
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-neutral-900">
              Drag. Explore. Apply.
            </h2>
          </div>

          <RoleCard
            role={roles[0]}
            index={0}
            className="absolute top-[30%] left-[12%] rotate-[-6deg]"
          />
          <RoleCard
            role={roles[1]}
            index={1}
            className="absolute top-[45%] left-[38%] rotate-[5deg]"
          />
          <RoleCard
            role={roles[2]}
            index={2}
            className="absolute top-[32%] right-[12%] rotate-[-3deg]"
          />
        </DraggableCardContainer>
      </section>
    </div>
  );
}
