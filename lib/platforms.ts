export type PlatformDefinition = {
  slug: string;
  title: string;
  cardBody: string;
  gradient: {
    start: string;
    end: string;
  };
  hoverColors: [number, number, number][];
  hero: {
    headline: string;
    description: string;
    kicker: string;
    partnerNote?: string;
  };
  stats: { label: string; value: string }[];
  outcomes: { title: string; description: string }[];
  capabilities: { title: string; points: string[] }[];
  launches: string[];
  enablers: string[];
  signals: string[];
};

export const platforms: PlatformDefinition[] = [
  {
    slug: "personalization-ai",
    title: "Personalization AI",
    cardBody:
      "Design and orchestrate intelligent, automated and personalized customer journeys across web, app, marketing and service.",
    gradient: {
      start: "#009ACA",
      end: "#00CACA",
    },
    hoverColors: [
      [0, 154, 202],
      [0, 190, 215],
    ],
    hero: {
      headline: "Personalization AI",
      description:
        "Design and orchestrate intelligent, automated and personalized customer journeys across web, app, marketing and service.",
      kicker: "DCG AI PLATFORM",
      partnerNote:
        "Built for growth, product, and lifecycle teams who want personalization without months of plumbing.",
    },
    stats: [
      { label: "Lift in conversion", value: "8–15%" },
      { label: "Drop-off reduction", value: "20–30%" },
      { label: "Pilot launch", value: "6–8 weeks" },
    ],
    outcomes: [
      {
        title: "Unify real-time context",
        description:
          "Identity resolution, preferences, and behavioral signals stitched into a single profile so every channel reacts instantly.",
      },
      {
        title: "Decisioning that adapts",
        description:
          "Next-best actions driven by propensity and guardrails, coordinated across web, app, paid media, and service.",
      },
      {
        title: "Experimentation by default",
        description:
          "Holdouts, variant testing, and attribution built in so you can prove lift and iterate without manual analysis.",
      },
    ],
    capabilities: [
      {
        title: "Customer understanding",
        points: [
          "Unified profiles with consent, identity, and preferences",
          "Propensity scoring, segments, and intent detection",
          "Event cataloging with business-friendly definitions",
        ],
      },
      {
        title: "Journey & content orchestration",
        points: [
          "Real-time decisioning and next-best action API",
          "Dynamic content blocks personalized by context",
          "Triggered service-to-sales plays with channel handoff",
        ],
      },
      {
        title: "Measurement & governance",
        points: [
          "Experiment design, holdouts, and automated readouts",
          "Guardrails for frequency, eligibility, and fairness",
          "Privacy, consent, and data quality monitoring",
        ],
      },
    ],
    launches: [
      "Abandonment rescue and win-back journeys across web, email, and app",
      "Personalized onboarding that adapts to product usage signals",
      "Service-to-sales playbooks that respect consent and intent",
      "Content and offer recommendations tuned to real-time behavior",
    ],
    enablers: [
      "Composable architecture: CDP, decisioning, and channel adapters you can swap in and out",
      "Ops rituals: weekly growth standups with fresh experiment readouts",
      "Safety: consent-aware targeting, eligibility rules, and approval workflows for new plays",
      "Change: enablement for marketers, product teams, and service leaders to launch without engineering tickets",
    ],
    signals: [
      "Activation and onboarding completion",
      "Conversion by segment and channel",
      "Repeat purchase / feature adoption",
      "Offer frequency and fatigue thresholds",
    ],
  },
  {
    slug: "conversational-analytics-commerce",
    title: "Conversational Analytics & Commerce",
    cardBody:
      "Use AI-driven conversations to acquire, convert and support customers, while capturing rich behavioral and intent data.",
    gradient: {
      start: "#00CACA",
      end: "#00B084",
    },
    hoverColors: [
      [0, 190, 215],
      [90, 120, 220],
    ],
    hero: {
      headline: "Conversational Analytics & Commerce",
      description:
        "Use AI-driven conversations to acquire, convert and support customers—while capturing the intents and objections you can act on across the funnel.",
      kicker: "DCG AI PLATFORM",
      partnerNote:
        "Purpose-built for CX, sales, and product owners who need safe, on-brand conversations at scale.",
    },
    stats: [
      { label: "Resolution automation", value: "55–80%" },
      { label: "Cart recovery", value: "+6–12%" },
      { label: "Time to launch", value: "4–6 weeks" },
    ],
    outcomes: [
      {
        title: "Serve and sell in one thread",
        description:
          "Guide discovery, answer questions, and place orders or bookings without dropping context across channels.",
      },
      {
        title: "Hear what customers are saying",
        description:
          "Intent, objections, and sentiment captured and clustered so product and marketing can respond quickly.",
      },
      {
        title: "Stay safe and compliant",
        description:
          "Guardrails for tone, approvals, PII handling, and handoff when confidence is low or topics are sensitive.",
      },
    ],
    capabilities: [
      {
        title: "Omnichannel agents",
        points: [
          "Chat, email, and voice experiences with retrieval-augmented answers",
          "Structured handoffs to humans with full conversation context",
          "Escalation policies and confidence thresholds you control",
        ],
      },
      {
        title: "Commerce flows",
        points: [
          "Guided product discovery and configuration",
          "Cart recovery, returns, and post-purchase care",
          "Payments, reservations, and entitlements with audit trails",
        ],
      },
      {
        title: "Conversation intelligence",
        points: [
          "Topic clustering, sentiment, and objection tracking",
          "Knowledge gaps and product opportunities surfaced weekly",
          "Quality scoring, SLAs, and compliance monitoring dashboards",
        ],
      },
    ],
    launches: [
      "Guided selling assistant with retrieval over catalog, inventory, and policies",
      "Support triage bot that resolves common issues and books follow-ups",
      "Proactive outreach flows triggered by cart drops, churn signals, or intent spikes",
      "Voice of customer analytics feeding roadmap and merchandising decisions",
    ],
    enablers: [
      "Library of approved prompts, tones, and flows maintained with your teams",
      "Observability: transcript review queues, red-teaming, and evaluation harnesses",
      "Data capture: intent, product mentions, and gaps piped into analytics and CRM",
      "Training and playbooks for agents and merchandisers to iterate safely",
    ],
    signals: [
      "Resolution and containment rate",
      "CSAT / NPS from assisted channels",
      "Cart add and checkout from conversations",
      "Escalations triggered for policy topics",
    ],
  },
  {
    slug: "dcg-360-salesforce-assessment",
    title: "DCG 360 Salesforce Assessment",
    cardBody:
      "Automate diagnostics on your CRM landscape and generate a prioritized roadmap for process, data and AI improvements.",
    gradient: {
      start: "#00B084",
      end: "#10B981",
    },
    hoverColors: [
      [90, 120, 220],
      [150, 110, 220],
    ],
    hero: {
      headline: "DCG 360 Salesforce Assessment",
      description:
        "Automate diagnostics on your CRM landscape and generate a prioritized roadmap for process, data, and AI improvements—fast.",
      kicker: "DCG AI PLATFORM",
      partnerNote:
        "For revenue, operations, and IT leaders who need clarity before scaling automation or AI on Salesforce.",
    },
    stats: [
      { label: "Diagnostic timeline", value: "4 weeks" },
      { label: "Checks & heuristics", value: "200+" },
      { label: "Roadmap depth", value: "Quarter-by-quarter" },
    ],
    outcomes: [
      {
        title: "Data you can trust",
        description:
          "Quality, completeness, and duplication baselines with clear owners and remediation steps.",
      },
      {
        title: "Process friction map",
        description:
          "Where deals and cases slow down, automation gaps, and UX issues that block adoption.",
      },
      {
        title: "AI readiness",
        description:
          "Security, permissions, and signal coverage to safely roll out Einstein, copilots, and agentic workflows.",
      },
    ],
    capabilities: [
      {
        title: "Org health & data",
        points: [
          "Duplicate, completeness, and usage scoring across objects",
          "Field-level lineage, ownership, and data contract recommendations",
          "MDM and identity strategy for accounts, contacts, and opportunities",
        ],
      },
      {
        title: "Process & automation",
        points: [
          "Pipeline, forecasting, and service flow diagnostics",
          "Flow, integration, and bot catalog with failure analysis",
          "UX and adoption review by persona and device",
        ],
      },
      {
        title: "AI & control readiness",
        points: [
          "Permission sets, sharing model, and audit coverage",
          "GenAI use case review with data eligibility guidance",
          "Observability for forecasts, recommendations, and automations",
        ],
      },
    ],
    launches: [
      "Executive readout with prioritized backlog and investment cases",
      "Quick-win pack: flows, dashboards, and hygiene improvements",
      "Future-state architecture and data roadmap aligned to OKRs",
      "Playbook for piloting AI safely with the right guardrails",
    ],
    enablers: [
      "Workshops with RevOps, IT, and sales leaders to validate findings",
      "Change plan covering training, communications, and measurement",
      "Reference dashboards to keep health visible after the assessment",
      "Embedded squad support to execute the first 90 days of fixes",
    ],
    signals: [
      "Forecast accuracy and coverage",
      "Data completeness by object",
      "Automation failure rate and retries",
      "User adoption and time-in-stage",
    ],
  },
  {
    slug: "smart-banking-ai",
    title: "Smart Banking AI",
    cardBody:
      "Provide bankers and relationship managers with a 360° view of clients, opportunities, risks and recommended next best actions.",
    gradient: {
      start: "#10B981",
      end: "#4F46E5",
    },
    hoverColors: [
      [150, 110, 220],
      [200, 120, 170],
    ],
    hero: {
      headline: "Smart Banking AI",
      description:
        "Provide bankers and relationship managers with a 360° view of clients, opportunities, risks, and recommended next best actions.",
      kicker: "DCG AI PLATFORM",
      partnerNote:
        "Designed for commercial and retail banks modernizing RM productivity, coverage, and risk management.",
    },
    stats: [
      { label: "RM prep time", value: "↓ 40%" },
      { label: "Cross-sell uplift", value: "+10–20%" },
      { label: "Risk alert coverage", value: "95%+" },
    ],
    outcomes: [
      {
        title: "360° client intelligence",
        description:
          "Core banking, CRM, bureau, and interaction data fused into a living client dossier and coverage map.",
      },
      {
        title: "Actionable next best moves",
        description:
          "Revenue, retention, and risk actions prioritized with explainability and regulatory guardrails.",
      },
      {
        title: "Confident, compliant automation",
        description:
          "Supervision, approvals, and full auditability so AI assists rather than surprises front-line teams.",
      },
    ],
    capabilities: [
      {
        title: "Client intelligence fabric",
        points: [
          "Entity resolution across CRM, core, and third-party data",
          "KYC/AML signals, interactions, and product usage in one layer",
          "Dynamic coverage maps by relationship, sector, and risk tier",
        ],
      },
      {
        title: "Insight & recommendation engine",
        points: [
          "Next-best action scoring with margin and risk guardrails",
          "Proactive risk alerts: churn, exposure, fraud, compliance",
          "Scenario planning for pricing, treasury, and lending offers",
        ],
      },
      {
        title: "RM & branch experience",
        points: [
          "Workspace with call prep, co-pilot suggestions, and follow-up automation",
          "Playbooks for onboarding, renewals, and event-triggered outreach",
          "Compliance-ready logging, approvals, and supervision workflows",
        ],
      },
    ],
    launches: [
      "Portfolio coverage heatmaps with prioritized outreach backlog",
      "Proactive renewal, FX, and risk alerts flowing into RM queues",
      "RM copilot for prep, note taking, and compliant follow-ups",
      "Opportunity spotting using transactions, intent, and relationship cues",
    ],
    enablers: [
      "Model governance with clear explainability and approval flows",
      "Data controls for PII, entitlements, and regional residency",
      "Integration accelerators for core, CRM, marketing, and servicing",
      "Playbook library tuned for commercial, wealth, and retail segments",
    ],
    signals: [
      "Share of wallet and product penetration",
      "RM prep time and meeting capacity",
      "Response time to risk alerts",
      "Manual overrides and supervision flags",
    ],
  },
];

export const platformBySlug: Record<string, PlatformDefinition> = platforms.reduce(
  (acc, platform) => {
    acc[platform.slug] = platform;
    return acc;
  },
  {} as Record<string, PlatformDefinition>,
);

export const platformCards = platforms.map((platform) => ({
  title: platform.title,
  body: platform.cardBody,
  href: `/solutions/${platform.slug}`,
  colors: platform.hoverColors,
}));
