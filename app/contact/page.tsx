"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, MapPin, Globe2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const topics = [
  "AI Strategy",
  "Retail AI",
  "Knowledge Graphs & Digital Twins",
  "Cloud Migration",
  "Other",
];

export default function ContactPage() {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "submitted" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);
  const [logEntries, setLogEntries] = useState<
    { level: "info" | "warn" | "error"; message: string; detail?: string }[]
  >([]);

  const resetStatus = () => {
    if (status !== "idle") {
      setStatus("idle");
      setErrorMessage(null);
      setSubmittedMessage(null);
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

      if (!response.ok) {
        setErrorMessage(
          data?.error || "Something went wrong. Please try again."
        );
        setStatus("error");
        return;
      }

      form.reset();
      setSubmittedMessage(
        "Thanks for reaching out! We received your message and will reply soon."
      );
      setStatus("submitted");
    } catch {
      setErrorMessage("Unable to send right now. Please try again later.");
      setLogEntries([
        {
          level: "error",
          message: "Network error while submitting the form.",
        },
      ]);
      setStatus("error");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-dcg-sand to-white" />
        <div className="relative dcg-section py-20 md:py-28 space-y-4">
          <p className="text-sm font-semibold text-dcg-lightGreen uppercase tracking-[0.2em]">
            Contact
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-dcg-ink max-w-3xl leading-tight">
            Web Pages &amp; Website Design – Digital, Technology &amp; Data
            Consulting.
          </h1>
          <p className="text-lg text-dcg-slate max-w-3xl">
            Ready to explore what AI can do for your business? Let’s build
            tomorrow together. Tell us about your goals and we’ll set up a
            consultation.
          </p>
        </div>
      </section>

      <section className="dcg-section py-16 md:py-20 space-y-10">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <form onSubmit={handleSubmit} className="dcg-card space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-1 text-sm text-dcg-ink">
                Name
                <input
                  required
                  name="name"
                  autoComplete="name"
                  onChange={resetStatus}
                  className="w-full rounded-xl border border-dcg-lightBlue/30 bg-white px-3 py-2 text-sm focus:border-dcg-lightBlue focus:outline-none"
                  placeholder="Your name"
                />
              </label>
              <label className="space-y-1 text-sm text-dcg-ink">
                Work email
                <input
                  required
                  type="email"
                  name="email"
                  autoComplete="email"
                  onChange={resetStatus}
                  className="w-full rounded-xl border border-dcg-lightBlue/30 bg-white px-3 py-2 text-sm focus:border-dcg-lightBlue focus:outline-none"
                  placeholder="you@company.com"
                />
              </label>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-1 text-sm text-dcg-ink">
                Company
                <input
                  name="company"
                  autoComplete="organization"
                  onChange={resetStatus}
                  className="w-full rounded-xl border border-dcg-lightBlue/30 bg-white px-3 py-2 text-sm focus:border-dcg-lightBlue focus:outline-none"
                  placeholder="Organization name"
                />
              </label>
              <label className="space-y-1 text-sm text-dcg-ink">
                Country
                <input
                  name="country"
                  autoComplete="country-name"
                  onChange={resetStatus}
                  className="w-full rounded-xl border border-dcg-lightBlue/30 bg-white px-3 py-2 text-sm focus:border-dcg-lightBlue focus:outline-none"
                  placeholder="Where you're based"
                />
              </label>
            </div>
            <label className="space-y-1 text-sm text-dcg-ink">
              Topic
              <select
                name="topic"
                onChange={resetStatus}
                className="w-full rounded-xl border border-dcg-lightBlue/30 bg-white px-3 py-2 text-sm focus:border-dcg-lightBlue focus:outline-none"
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
            <label className="space-y-1 text-sm text-dcg-ink">
              Message
              <textarea
                required
                name="message"
                onChange={resetStatus}
                className="w-full rounded-xl border border-dcg-lightBlue/30 bg-white px-3 py-3 text-sm focus:border-dcg-lightBlue focus:outline-none"
                rows={5}
                placeholder="Tell us about your AI, data, or cloud goals"
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
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={status === "submitting"}
            >
              {status === "submitting"
                ? "Sending..."
                : status === "submitted"
                  ? "Message sent — we’ll reply soon"
                  : "Submit"}
            </Button>
            {status === "error" ? (
              <p className="text-xs text-red-600" role="status" aria-live="polite">
                {errorMessage}
              </p>
            ) : null}
            {status === "submitted" ? (
              <p className="text-xs text-dcg-lightGreen" role="status" aria-live="polite">
                {submittedMessage}
              </p>
            ) : null}
            {logEntries.length ? (
              <div className="rounded-xl border border-dcg-lightBlue/20 bg-dcg-sand/60 p-4 text-xs text-dcg-ink">
                <p className="font-semibold text-dcg-ink">Submission log</p>
                <ul className="mt-2 space-y-2">
                  {logEntries.map((entry, index) => (
                    <li key={`${entry.level}-${index}`} className="space-y-1">
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
            <p className="text-xs text-dcg-slate">
              We respond quickly. You can also book a 30-min consultation using
              the link below.
            </p>
          </form>

          <div className="space-y-4 dcg-card">
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
            <div className="rounded-2xl bg-dcg-sand p-4 text-sm text-dcg-ink">
              <p className="font-semibold">Book a 30-min consultation</p>
              <p className="text-dcg-slate">
                Share a topic and we’ll pair you with the right expert.
              </p>
              <div className="mt-3">
                <Button asChild variant="secondary">
                  <Link href="/contact">Pick a time</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
