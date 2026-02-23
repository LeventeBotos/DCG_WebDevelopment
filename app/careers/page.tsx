"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import SubpageHero from "@/components/SubpageHero";
import { Button } from "@/components/ui/button";
import { EvervaultCardWhite } from "@/components/ui/evervault-card-white";

type RoleCategory = "ai" | "cloud" | "data";
type ApplicationState = "idle" | "submitting" | "submitted" | "error";

type Role = {
  title: string;
  category: RoleCategory;
  location: string;
  responsibilities: string[];
  emailSubject: string;
};

const roleCategoryMeta: Record<
  RoleCategory,
  { label: string; description: string; panel: string }
> = {
  ai: {
    label: "AI",
    description: "Modeling, LLM products, and intelligent automation roles.",
    panel: "from-emerald-100/80 to-emerald-50/30 border-emerald-200/80",
  },
  cloud: {
    label: "Cloud",
    description:
      "Platform, reliability, security, and infrastructure delivery.",
    panel: "from-violet-100/80 to-violet-50/30 border-violet-200/80",
  },
  data: {
    label: "Data",
    description: "Data strategy, analytics, governance, and enablement work.",
    panel: "from-sky-100/80 to-sky-50/30 border-sky-200/80",
  },
};

const roles: Role[] = [
  {
    title: "ML Engineer",
    category: "ai",
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
    category: "cloud",
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
    category: "data",
    location: "London / Remote",
    responsibilities: [
      "Lead discovery and roadmap workshops with executives",
      "Shape KPI frameworks and data storytelling",
      "Guide adoption, training, and change management",
    ],
    emailSubject: "Data%20%26%20Analytics%20Consultant%20application",
  },
];

const roleCategories: RoleCategory[] = ["ai", "cloud", "data"];

const roleCountByCategory = roles.reduce<Record<RoleCategory, number>>(
  (acc, role) => {
    acc[role.category] += 1;
    return acc;
  },
  { ai: 0, cloud: 0, data: 0 },
);

function RoleCard({
  role,
  index,
  onApply,
}: {
  role: Role;
  index: number;
  onApply: (roleTitle: string) => void;
}) {
  return (
    <article className="group h-full rounded-3xl border border-neutral-200 bg-white p-6 shadow-[0_30px_80px_-35px_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-[0_40px_100px_-30px_rgba(0,0,0,0.22)]">
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
        <span className="text-xs text-neutral-400">Quick form in popup</span>

        <Button type="button" size="sm" onClick={() => onApply(role.title)}>
          Apply
        </Button>
      </div>
    </article>
  );
}

export default function CareersPage() {
  const [activeCategory, setActiveCategory] = useState<RoleCategory | null>(
    null,
  );
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>(roles[0]?.title ?? "");
  const [applicationState, setApplicationState] =
    useState<ApplicationState>("idle");
  const [applicationMessage, setApplicationMessage] = useState<string>(
    "Complete the form and submit your application.",
  );
  const [requestId, setRequestId] = useState<string | null>(null);

  const filteredRoles = useMemo(
    () =>
      activeCategory
        ? roles.filter((role) => role.category === activeCategory)
        : [],
    [activeCategory],
  );

  useEffect(() => {
    if (!isApplyOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsApplyOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isApplyOpen]);

  const resetApplicationFeedback = () => {
    if (applicationState !== "idle") {
      setApplicationState("idle");
      setApplicationMessage("Complete the form and submit your application.");
      setRequestId(null);
    }
  };

  const openApplyPopup = (roleTitle: string) => {
    setSelectedRole(roleTitle);
    resetApplicationFeedback();
    setIsApplyOpen(true);
  };

  const submitApplication = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setApplicationState("submitting");
    setApplicationMessage("Sending your application...");
    setRequestId(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      role: String(formData.get("role") || ""),
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      location: String(formData.get("location") || ""),
      linkedin: String(formData.get("linkedin") || ""),
      portfolio: String(formData.get("portfolio") || ""),
      resumeUrl: String(formData.get("resumeUrl") || ""),
      experience: String(formData.get("experience") || ""),
      noticePeriod: String(formData.get("noticePeriod") || ""),
      message: String(formData.get("message") || ""),
      website: String(formData.get("website") || ""),
    };

    try {
      const response = await fetch("/api/careers/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => null);
      setRequestId(typeof data?.requestId === "string" ? data.requestId : null);

      if (!response.ok) {
        setApplicationState("error");
        setApplicationMessage(
          data?.error || "We could not submit your application. Please try again.",
        );
        return;
      }

      form.reset();
      setSelectedRole(payload.role);
      setApplicationState("submitted");
      setApplicationMessage(
        "Application submitted. We sent a confirmation email and will review your profile soon.",
      );
    } catch {
      setApplicationState("error");
      setApplicationMessage("Network error. Please try again.");
    }
  };

  const inputClassName = "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition focus:border-dcg-lightBlue focus:outline-none focus:ring-2 focus:ring-dcg-lightBlue/25";

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

      <section className="dcg-section space-y-6 py-12 md:py-16">
        <div className="max-w-3xl space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-dcg-lightGreen">
            Open roles
          </p>
          <h2 className="text-3xl font-bold text-dcg-ink md:text-4xl">
            Choose one category, then browse
          </h2>
          <p className="text-dcg-slate">
            Start by choosing AI, Cloud, or Data. Then review the open roles in
            that track.
          </p>
        </div>

        <div className="space-y-4">
          {!activeCategory ? (
            <div className="space-y-4 max-w-4xl mx-auto self-center flex flex-row items-center">
              <div className="grid gap-4 md:grid-cols-3">
                {roleCategories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className="relative h-[32rem] rounded-md border border-slate-200 bg-white shadow-sm hover:shadow-lg"
                  >
                    <EvervaultCardWhite
                      text={roleCategoryMeta[category].label}
                      className="h-full w-full rounded-3xl"
                    />
                    <div className="absolute bottom-4 w-full text-slate-700/80">
                      <p className="mx-auto px-1 text-sm font-semibold ">
                        {roleCountByCategory[category]} open role
                        {roleCountByCategory[category] > 1 ? "s" : ""}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="sticky top-20 z-20 space-y-4 rounded-2xl border border-slate-200 bg-white/90 p-4 backdrop-blur">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm text-slate-600">
                    Selected category:{" "}
                    <span className="font-semibold text-slate-900">
                      {roleCategoryMeta[activeCategory].label}
                    </span>
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveCategory(null)}
                    className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-500 hover:text-slate-900"
                  >
                    Change category
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between px-1">
                <p className="text-sm text-slate-600">
                  Showing{" "}
                  <span className="font-semibold text-slate-900">
                    {filteredRoles.length}
                  </span>{" "}
                  of {roleCountByCategory[activeCategory]}{" "}
                  {roleCategoryMeta[activeCategory].label.toLowerCase()} roles
                </p>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                  Open positions
                </p>
              </div>

              {filteredRoles.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {filteredRoles.map((role, index) => (
                    <RoleCard
                      key={role.title}
                      role={role}
                      index={index}
                      onApply={openApplyPopup}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
                  <p className="text-sm text-slate-600">
                    No open roles found in this category right now.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {isApplyOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsApplyOpen(false)}
            aria-hidden
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Apply for role"
            className="relative z-10 w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl md:p-8"
          >
            <button
              type="button"
              onClick={() => setIsApplyOpen(false)}
              className="absolute right-4 top-4 rounded-full border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-600 transition hover:border-slate-400 hover:text-slate-900"
            >
              Close
            </button>

            <div className="space-y-2 pr-20">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-dcg-lightBlue">
                Role application
              </p>
              <h3 className="text-2xl font-bold text-dcg-ink">
                Apply in a few minutes
              </h3>
              <p className="text-sm text-slate-600">
                We review every application manually and typically respond within
                5 business days.
              </p>
            </div>

            <form
              onSubmit={submitApplication}
              aria-busy={applicationState === "submitting"}
              className="mt-6 space-y-4"
            >
              <fieldset
                disabled={applicationState === "submitting"}
                className="space-y-4"
              >
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  Role
                  <select
                    required
                    name="role"
                    value={selectedRole}
                    onChange={(event) => {
                      setSelectedRole(event.currentTarget.value);
                      resetApplicationFeedback();
                    }}
                    className={inputClassName}
                  >
                    {roles.map((role) => (
                      <option key={role.title} value={role.title}>
                        {role.title}
                      </option>
                    ))}
                  </select>
                </label>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="space-y-2 text-sm font-medium text-slate-700">
                    Full name
                    <input
                      required
                      name="name"
                      autoComplete="name"
                      onChange={resetApplicationFeedback}
                      className={inputClassName}
                      placeholder="Your full name"
                    />
                  </label>
                  <label className="space-y-2 text-sm font-medium text-slate-700">
                    Email
                    <input
                      required
                      name="email"
                      type="email"
                      autoComplete="email"
                      onChange={resetApplicationFeedback}
                      className={inputClassName}
                      placeholder="you@example.com"
                    />
                  </label>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="space-y-2 text-sm font-medium text-slate-700">
                    Current location
                    <input
                      required
                      name="location"
                      autoComplete="address-level2"
                      onChange={resetApplicationFeedback}
                      className={inputClassName}
                      placeholder="City, Country"
                    />
                  </label>
                  <label className="space-y-2 text-sm font-medium text-slate-700">
                    Experience
                    <select
                      required
                      name="experience"
                      defaultValue=""
                      onChange={resetApplicationFeedback}
                      className={inputClassName}
                    >
                      <option value="" disabled>
                        Select experience
                      </option>
                      <option value="0-2 years">0-2 years</option>
                      <option value="3-5 years">3-5 years</option>
                      <option value="6-8 years">6-8 years</option>
                      <option value="9+ years">9+ years</option>
                    </select>
                  </label>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="space-y-2 text-sm font-medium text-slate-700">
                    LinkedIn (optional)
                    <input
                      type="url"
                      name="linkedin"
                      inputMode="url"
                      onChange={resetApplicationFeedback}
                      className={inputClassName}
                      placeholder="https://linkedin.com/in/your-name"
                    />
                  </label>
                  <label className="space-y-2 text-sm font-medium text-slate-700">
                    Portfolio / GitHub (optional)
                    <input
                      type="url"
                      name="portfolio"
                      inputMode="url"
                      onChange={resetApplicationFeedback}
                      className={inputClassName}
                      placeholder="https://github.com/your-handle"
                    />
                  </label>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="space-y-2 text-sm font-medium text-slate-700">
                    Resume / CV link
                    <input
                      required
                      type="url"
                      name="resumeUrl"
                      inputMode="url"
                      onChange={resetApplicationFeedback}
                      className={inputClassName}
                      placeholder="Drive, Dropbox, Notion, etc."
                    />
                  </label>
                  <label className="space-y-2 text-sm font-medium text-slate-700">
                    Notice period (optional)
                    <input
                      name="noticePeriod"
                      onChange={resetApplicationFeedback}
                      className={inputClassName}
                      placeholder="Immediate / 1 month / 2 months"
                    />
                  </label>
                </div>

                <label className="space-y-2 text-sm font-medium text-slate-700">
                  Why this role?
                  <textarea
                    required
                    minLength={30}
                    name="message"
                    rows={6}
                    onChange={resetApplicationFeedback}
                    className={`${inputClassName} min-h-[140px]`}
                    placeholder="Share your relevant projects and why this role is a fit."
                  />
                </label>

                <label className="sr-only" htmlFor="website">
                  Website
                </label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                />
              </fieldset>

              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={applicationState === "submitting"}
                  showArrow={applicationState !== "submitting"}
                  className="w-full md:w-auto"
                >
                  {applicationState === "submitting"
                    ? "Submitting..."
                    : applicationState === "submitted"
                      ? "Application submitted"
                      : "Submit application"}
                </Button>
                <p
                  className={`text-xs ${
                    applicationState === "error"
                      ? "text-red-600"
                      : applicationState === "submitted"
                        ? "text-emerald-700"
                        : "text-slate-600"
                  }`}
                >
                  {applicationMessage}
                  {requestId ? ` (Ref: ${requestId})` : ""}
                </p>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
