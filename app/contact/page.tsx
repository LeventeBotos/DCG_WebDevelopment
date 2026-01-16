"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Globe2,
  Loader2,
  Mail,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SubpageHero from "@/components/SubpageHero";

const topics = [
  "AI Strategy",
  "Retail AI",
  "Knowledge Graphs & Digital Twins",
  "Cloud Migration",
  "Other",
];

type LogEntry = {
  level: "info" | "warn" | "error";
  message: string;
  detail?: string;
};

export default function ContactPage() {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "submitted" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);
  const [logEntries, setLogEntries] = useState<LogEntry[]>([]);
  const [statusDetail, setStatusDetail] = useState<string>(
    "Ready when you are."
  );
  const [requestId, setRequestId] = useState<string | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const statusTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearStatusTimers = () => {
    statusTimers.current.forEach((timer) => clearTimeout(timer));
    statusTimers.current = [];
  };

  useEffect(() => {
    return () => clearStatusTimers();
  }, []);

  useEffect(() => {
    if (status !== "submitting") {
      setElapsedSeconds(0);
      return;
    }

    setElapsedSeconds(0);
    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [status]);

  const resetStatus = () => {
    if (status !== "idle") {
      setStatus("idle");
      setErrorMessage(null);
      setSubmittedMessage(null);
      setRequestId(null);
      setStatusDetail("Ready when you are.");
      clearStatusTimers();
    }
    if (logEntries.length) {
      setLogEntries([]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);
    setSubmittedMessage(null);
    setRequestId(null);
    setLogEntries([]);
    setStatusDetail("Preparing secure delivery...");
    clearStatusTimers();
    statusTimers.current = [
      setTimeout(() => {
        setStatusDetail("Sending your note to the DCG inbox...");
      }, 800),
      setTimeout(() => {
        setStatusDetail("Awaiting confirmation from our mail service...");
      }, 2200),
    ];

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      company: String(formData.get("company") || ""),
      country: String(formData.get("country") || ""),
      topic: String(formData.get("topic") || ""),
      message: String(formData.get("message") || ""),
      website: String(formData.get("website") || ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => null);
      const logs = Array.isArray(data?.logs) ? data.logs : [];
      setLogEntries(logs);
      setRequestId(typeof data?.requestId === "string" ? data.requestId : null);
      clearStatusTimers();

      if (!response.ok) {
        setErrorMessage(
          data?.error || "Something went wrong. Please try again."
        );
        setStatusDetail("Delivery failed. Please try again.");
        setStatus("error");
        return;
      }

      form.reset();
      setSubmittedMessage(
        "Thanks for reaching out! We received your message and will reply soon."
      );
      setStatusDetail("Delivered. A confirmation email is on the way.");
      setStatus("submitted");
    } catch {
      setErrorMessage("Unable to send right now. Please try again later.");
      setStatusDetail("Network error. Please try again.");
      setLogEntries([
        {
          level: "error",
          message: "Network error while submitting the form.",
        },
      ]);
      setStatus("error");
      clearStatusTimers();
    }
  };

  const statusLabel =
    status === "submitting"
      ? "Sending"
      : status === "submitted"
        ? "Delivered"
        : status === "error"
          ? "Needs attention"
          : "Ready";

  const statusBadge =
    status === "submitting"
      ? "Live"
      : status === "submitted"
        ? "Sent"
        : status === "error"
          ? "Error"
          : "Idle";

  const statusBadgeClass =
    status === "submitting"
      ? "border-dcg-lightBlue/30 bg-dcg-lightBlue/10 text-dcg-lightBlue"
      : status === "submitted"
        ? "border-dcg-lightGreen/30 bg-dcg-lightGreen/15 text-dcg-darkGreen"
        : status === "error"
          ? "border-red-200 bg-red-50 text-red-600"
          : "border-dcg-lightBlue/10 bg-white text-dcg-slate";

  const statusMessage =
    status === "error"
      ? errorMessage ?? "Something went wrong. Please try again."
      : status === "submitted"
        ? submittedMessage ??
          "Thanks for reaching out! We received your message and will reply soon."
        : statusDetail;

  const inputClassName =
    "w-full rounded-2xl border border-dcg-lightBlue/30 bg-white px-4 py-3 text-sm text-dcg-ink shadow-sm transition focus:border-dcg-lightBlue focus:outline-none focus:ring-2 focus:ring-dcg-lightBlue/20";

  const textareaClassName = `${inputClassName} min-h-[140px]`;

  return (
    <div className="flex flex-col min-h-screen">
      <SubpageHero
        eyebrow="Contact"
        title="Start a conversation with DCG"
        emphasis="conversation"
        description="Tell us what you want to build and the outcomes you need. We'll reply with tailored next steps."
        chips={[
          { label: "AI + Data + Cloud" },
          { label: "Global delivery" },
        ]}
      />

      <section className="dcg-section py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <form
              onSubmit={handleSubmit}
              aria-busy={status === "submitting"}
              className="relative overflow-hidden rounded-3xl border border-dcg-lightBlue/20 bg-white p-6 shadow-xl"
            >
              <div className="absolute -top-20 right-0 h-40 w-40 rounded-full bg-dcg-lightGreen/15 blur-3xl" />
              <div className="relative space-y-6">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-dcg-lightBlue">
                    Project intake
                  </p>
                  <h2 className="text-2xl md:text-3xl font-semibold text-dcg-ink">
                    Tell us what you're building
                  </h2>
                  <p className="text-sm text-dcg-slate">
                    We'll route your note to the right expert and follow up
                    with a clear response.
                  </p>
                </div>
                <fieldset
                  disabled={status === "submitting"}
                  className="space-y-4"
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="space-y-2 text-sm text-dcg-ink">
                      Name
                      <input
                        required
                        name="name"
                        autoComplete="name"
                        onChange={resetStatus}
                        className={inputClassName}
                        placeholder="Your name"
                      />
                    </label>
                    <label className="space-y-2 text-sm text-dcg-ink">
                      Work email
                      <input
                        required
                        type="email"
                        name="email"
                        autoComplete="email"
                        onChange={resetStatus}
                        className={inputClassName}
                        placeholder="you@company.com"
                      />
                    </label>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="space-y-2 text-sm text-dcg-ink">
                      Company
                      <input
                        name="company"
                        autoComplete="organization"
                        onChange={resetStatus}
                        className={inputClassName}
                        placeholder="Organization name"
                      />
                    </label>
                    <label className="space-y-2 text-sm text-dcg-ink">
                      Country
                      <input
                        name="country"
                        autoComplete="country-name"
                        onChange={resetStatus}
                        className={inputClassName}
                        placeholder="Where you're based"
                      />
                    </label>
                  </div>
                  <label className="space-y-2 text-sm text-dcg-ink">
                    Topic
                    <select
                      name="topic"
                      onChange={resetStatus}
                      className={inputClassName}
                      defaultValue=""
                    >
                      <option value="">Select a topic</option>
                      {topics.map((topic) => (
                        <option key={topic} value={topic}>
                          {topic}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="space-y-2 text-sm text-dcg-ink">
                    Message
                    <textarea
                      required
                      name="message"
                      onChange={resetStatus}
                      className={textareaClassName}
                      rows={6}
                      placeholder="Share goals, timelines, and any constraints we should know."
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
                    className="w-full md:w-auto"
                    disabled={status === "submitting"}
                    showArrow={status !== "submitting"}
                  >
                    {status === "submitting"
                      ? "Sending..."
                      : status === "submitted"
                      ? "Message sent - we'll reply soon"
                        : "Submit"}
                  </Button>
                  <p className="text-xs text-dcg-slate">
                    Prefer to book time? Choose a consultation in the
                    sidebar.
                  </p>
                </div>
                <div className="rounded-2xl border border-dcg-lightBlue/20 bg-dcg-sand/60 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-sm font-semibold text-dcg-ink">
                      {status === "submitting" ? (
                        <Loader2 className="h-4 w-4 animate-spin text-dcg-lightBlue" />
                      ) : status === "submitted" ? (
                        <CheckCircle2 className="h-4 w-4 text-dcg-lightGreen" />
                      ) : status === "error" ? (
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                      ) : (
                        <Clock className="h-4 w-4 text-dcg-lightBlue" />
                      )}
                      <span>{statusLabel}</span>
                    </div>
                    <span
                      className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${statusBadgeClass}`}
                    >
                      {statusBadge}
                    </span>
                  </div>
                  <p
                    className="mt-2 text-sm text-dcg-slate"
                    role="status"
                    aria-live="polite"
                  >
                    {statusMessage}
                    {status === "submitting" ? (
                      <span className="ml-2 text-xs text-dcg-slate/80">
                        {elapsedSeconds}s
                      </span>
                    ) : null}
                  </p>
                  {requestId ? (
                    <p className="mt-2 text-xs text-dcg-slate">
                      Request ID:{" "}
                      <span className="font-mono text-dcg-ink">
                        {requestId}
                      </span>
                    </p>
                  ) : null}
                  {logEntries.length ? (
                    <div className="mt-3 border-t border-dcg-lightBlue/10 pt-3 text-xs text-dcg-ink">
                      <p className="font-semibold text-dcg-ink">
                        Delivery log
                      </p>
                      <ul className="mt-2 space-y-2">
                        {logEntries.map((entry, index) => (
                          <li
                            key={`${entry.level}-${index}`}
                            className="space-y-1"
                          >
                            <div className="flex flex-wrap items-center gap-2">
                              <span
                                className={
                                  entry.level === "error"
                                    ? "font-semibold text-red-600"
                                    : entry.level === "warn"
                                      ? "font-semibold text-amber-600"
                                      : "font-semibold text-dcg-lightGreen"
                                }
                              >
                                {entry.level.toUpperCase()}
                              </span>
                              <span>{entry.message}</span>
                            </div>
                            {entry.detail ? (
                              <p className="text-[11px] text-dcg-slate">
                                {entry.detail}
                              </p>
                            ) : null}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              </div>
            </form>

            <div className="rounded-3xl border border-dcg-lightBlue/20 bg-gradient-to-br from-white via-dcg-sand/70 to-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-dcg-ink">
                What happens next
              </h3>
              <ul className="mt-4 space-y-4 text-sm text-dcg-slate">
                <li className="flex gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-dcg-lightBlue/15 text-xs font-semibold text-dcg-lightBlue">
                    1
                  </span>
                  <span>
                    We review your message and align the right DCG partner.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-dcg-lightGreen/15 text-xs font-semibold text-dcg-darkGreen">
                    2
                  </span>
                  <span>
                    You get a tailored response with the next best step.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-dcg-lightBlue/15 text-xs font-semibold text-dcg-lightBlue">
                    3
                  </span>
                  <span>
                    We schedule a working session to scope impact and timing.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="dcg-card space-y-4">
              <h2 className="text-lg font-semibold text-dcg-ink">
                Contact information
              </h2>
              <div className="space-y-3 text-sm text-dcg-ink">
                <div className="flex items-center gap-2">
                  <Globe2 className="h-4 w-4 text-dcg-lightBlue" />
                  <a
                    className="underline-offset-4 hover:underline"
                    href="https://www.dataconsulting-group.com"
                  >
                    www.dataconsulting-group.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-dcg-lightBlue" />
                  <a
                    className="underline-offset-4 hover:underline"
                    href="mailto:info@dataconsulting-group.com"
                  >
                    info@dataconsulting-group.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-dcg-lightBlue" />
                  <span>London, UK</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-dcg-lightBlue/20 bg-white p-6 shadow-lg">
              <div className="flex items-center gap-2 text-sm font-semibold text-dcg-ink">
                <Clock className="h-4 w-4 text-dcg-lightGreen" />
                Response SLA
              </div>
              <p className="mt-2 text-sm text-dcg-slate">
                We'll respond with clear next steps.
              </p>
              <div className="mt-4 rounded-2xl bg-dcg-sand p-4 text-sm text-dcg-ink">
                <p className="font-semibold">Book a consultation</p>
                <p className="text-dcg-slate">
                  Share a topic and we'll pair you with the right expert.
                </p>
                <div className="mt-3">
                  <Button asChild variant="secondary">
                    <Link href="/contact">Pick a time</Link>
                  </Button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
