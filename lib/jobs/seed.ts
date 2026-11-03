import type { PublicJob } from "./types";

/**
 * The roles that were hardcoded in app/careers/page.tsx. Used to (a) seed Firestore once from the admin
 * panel and (b) keep the public page working if Firestore is unreachable.
 */
export const SEED_JOBS: PublicJob[] = [
  {
    id: "ml-engineer",
    title: "ML Engineer",
    category: "ai",
    location: "London / Remote",
    employmentType: "Full-time",
    summary: "",
    responsibilities: [
      "Build and productionize ML models and agentic workflows",
      "Collaborate with data engineers on pipelines and feature stores",
      "Partner with clients to translate goals into experiments",
    ],
    requirements: [],
  },
  {
    id: "cloud-solutions-engineer",
    title: "Cloud Solutions Engineer",
    category: "cloud",
    location: "London / Remote",
    employmentType: "Full-time",
    summary: "",
    responsibilities: [
      "Design and implement data platforms across Azure/AWS/GCP",
      "Set up observability, governance, and security controls",
      "Enable teams with templates for rapid delivery",
    ],
    requirements: [],
  },
  {
    id: "data-analytics-consultant",
    title: "Data & Analytics Consultant",
    category: "data",
    location: "London / Remote",
    employmentType: "Full-time",
    summary: "",
    responsibilities: [
      "Lead discovery and roadmap workshops with executives",
      "Shape KPI frameworks and data storytelling",
      "Guide adoption, training, and change management",
    ],
    requirements: [],
  },
];
