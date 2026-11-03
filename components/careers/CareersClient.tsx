"use client";

import { FormEvent, useEffect, useId, useMemo, useRef, useState } from "react";
import TurnstileWidget, { turnstileSiteKey, type TurnstileHandle } from "@/components/TurnstileWidget";
import SubpageHero from "@/components/SubpageHero";
import RoleCard from "@/components/careers/RoleCard";
import { Button } from "@/components/ui/button";
import { EvervaultCardWhite } from "@/components/ui/evervault-card-white";
import { categoryMeta as roleCategoryMeta, JOB_CATEGORIES as roleCategories } from "@/lib/jobs/types";
import type { JobCategory as RoleCategory, PublicJob } from "@/lib/jobs/types";
import { collect } from "@/lib/collect";
import { CV_ACCEPT, CV_MAX_BYTES } from "@/lib/cv";

type ApplicationState = "idle" | "submitting" | "submitted" | "error";

async function fileToBase64(file: File): Promise<string> {
  const bytes = new Uint8Array(await file.arrayBuffer());
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

function readUtm() {
  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get("utm_source") ?? "",
    utmMedium: params.get("utm_medium") ?? "",
    utmCampaign: params.get("utm_campaign") ?? "",
  };
}

export default function CareersClient({
  jobs,
  initialApplyId,
}: {
  jobs: PublicJob[];
  initialApplyId?: string;
}) {
  const roles = jobs;
  const roleCountByCategory = useMemo(
    () =>
      roles.reduce<Record<RoleCategory, number>>(
        (acc, role) => {
          acc[role.category] += 1;
          return acc;
        },
        { ai: 0, cloud: 0, data: 0 },
      ),
    [roles],
  );
  const [activeCategory, setActiveCategory] = useState<RoleCategory | null>(
    null,
  );
  const [isApplyOpen, setIsApplyOpen] = useState(
    Boolean(initialApplyId && jobs.some((job) => job.id === initialApplyId)),
  );
  const [selectedRole, setSelectedRole] = useState<string>(
    initialApplyId && jobs.some((job) => job.id === initialApplyId)
      ? initialApplyId
      : (roles[0]?.id ?? ""),
  );
  const [applicationState, setApplicationState] =
    useState<ApplicationState>("idle");
  const [applicationMessage, setApplicationMessage] = useState<string>(
    "Complete the form and submit your application.",
  );
  const [requestId, setRequestId] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState("");
  const startedRef = useRef(false);
  const turnstileRef = useRef<TurnstileHandle>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const dialogTitleId = useId();
  const dialogDescriptionId = useId();
  const statusMessageId = useId();

  const filteredRoles = useMemo(
    () =>
      activeCategory
        ? roles.filter((role) => role.category === activeCategory)
        : [],
    [activeCategory, roles],
  );

  useEffect(() => {
    if (!isApplyOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsApplyOpen(false);
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) {
        return;
      }

      const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (!firstElement || !lastElement) {
        return;
      }

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    closeButtonRef.current?.focus();

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

  const openApplyPopup = (jobId: string) => {
    setSelectedRole(jobId);
    collect("apply_open", { job: jobId });
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

    // Optional CV upload: validated again on the server by content type and size.
    const file = formData.get("cv");
    let cv: { name: string; data: string } | undefined;
    if (file instanceof File && file.size > 0) {
      if (file.size > CV_MAX_BYTES) {
        setApplicationState("error");
        setApplicationMessage(
          `That file is ${Math.round(file.size / 1024)} KB. Please upload a PDF or DOCX under ${Math.round(CV_MAX_BYTES / 1024)} KB, or paste a link instead.`,
        );
        return;
      }
      cv = { name: file.name, data: await fileToBase64(file) };
    }
    if (!cv && !String(formData.get("resumeUrl") || "").trim()) {
      setApplicationState("error");
      setApplicationMessage("Please upload your CV or paste a link to it.");
      return;
    }

    if (turnstileSiteKey && !turnstileToken) {
      setApplicationState("error");
      setApplicationMessage("Please wait for the security check to finish, then submit again.");
      return;
    }

    const payload = {
      jobId: String(formData.get("jobId") || ""),
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      location: String(formData.get("location") || ""),
      linkedin: String(formData.get("linkedin") || ""),
      portfolio: String(formData.get("portfolio") || ""),
      resumeUrl: String(formData.get("resumeUrl") || ""),
      ...(cv ? { cv } : {}),
      turnstileToken,
      experience: String(formData.get("experience") || ""),
      noticePeriod: String(formData.get("noticePeriod") || ""),
      message: String(formData.get("message") || ""),
      website: String(formData.get("website") || ""),
      ...readUtm(),
    };

    collect("apply_submit", { job: payload.jobId });

    try {
      const response = await fetch("/api/careers/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => null);
      setRequestId(typeof data?.requestId === "string" ? data.requestId : null);

      if (!response.ok) {
        collect("apply_error", { job: payload.jobId });
        turnstileRef.current?.reset();
        setApplicationState("error");
        setApplicationMessage(
          data?.error || "We could not submit your application. Please try again.",
        );
        return;
      }

      form.reset();
      setSelectedRole(payload.jobId);
      turnstileRef.current?.reset();
      collect("apply_success", { job: payload.jobId });
      setApplicationState("submitted");
      setApplicationMessage(
        "Application submitted. We sent a confirmation email and will review your profile soon.",
      );
    } catch {
      collect("apply_error", { job: payload.jobId });
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
            <div className="mx-auto flex w-full max-w-4xl self-center">
              <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
                {roleCategories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    aria-label={`Show ${roleCategoryMeta[category].label} roles`}
                    className="relative h-[24rem] w-full rounded-md border border-slate-200 bg-white shadow-sm transition hover:shadow-lg sm:h-[28rem] md:h-[32rem]"
                  >
                    <EvervaultCardWhite
                      text={roleCategoryMeta[category].label}
                      className="h-full w-full rounded-3xl"
                    />
                    <div className="absolute bottom-4 w-full text-slate-700/80">
                      <p className="mx-auto px-1 text-sm font-semibold ">
                        {roleCountByCategory[category]} open role
                        {roleCountByCategory[category] !== 1 ? "s" : ""}
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
                    aria-label="Change role category"
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
                      key={role.id}
                      role={role}
                      index={index}
                      onApply={openApplyPopup}
                      detailsHref={`/careers/${role.id}`}
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
            aria-hidden="true"
          />
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={dialogTitleId}
            aria-describedby={dialogDescriptionId}
            className="relative z-10 w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl md:p-8"
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setIsApplyOpen(false)}
              aria-label="Close application form"
              className="absolute right-4 top-4 rounded-full border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-600 transition hover:border-slate-400 hover:text-slate-900"
            >
              Close
            </button>

            <div className="space-y-2 pr-20">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-dcg-lightBlue">
                Role application
              </p>
              <h3 id={dialogTitleId} className="text-2xl font-bold text-dcg-ink">
                Apply in a few minutes
              </h3>
              <p id={dialogDescriptionId} className="text-sm text-slate-600">
                We review every application manually and typically respond within
                5 business days.
              </p>
            </div>

            <form
              onSubmit={submitApplication}
              onFocusCapture={() => {
                if (startedRef.current) return;
                startedRef.current = true;
                collect("apply_start", { job: selectedRole });
              }}
              aria-busy={applicationState === "submitting"}
              aria-describedby={statusMessageId}
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
                    name="jobId"
                    value={selectedRole}
                    onChange={(event) => {
                      setSelectedRole(event.currentTarget.value);
                      resetApplicationFeedback();
                    }}
                    className={inputClassName}
                  >
                    {roles.map((role) => (
                      <option key={role.id} value={role.id}>
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
                    CV link (optional if you upload a file)
                    <input
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

                <label className="block space-y-2 text-sm font-medium text-slate-700">
                  Upload CV (PDF or DOCX, up to {Math.round(CV_MAX_BYTES / 1024)} KB)
                  <input
                    type="file"
                    name="cv"
                    accept={CV_ACCEPT}
                    onChange={resetApplicationFeedback}
                    className={`${inputClassName} file:mr-3 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-slate-700`}
                  />
                </label>

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

                <TurnstileWidget ref={turnstileRef} onToken={setTurnstileToken} />

                <div aria-hidden="true" className="hidden">
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
                </div>
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
                  id={statusMessageId}
                  role="status"
                  aria-live="polite"
                  aria-atomic="true"
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
