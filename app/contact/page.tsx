"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import { Globe2, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import SubpageHero from "@/components/SubpageHero";
import ContactCtaSection from "@/components/ContactCtaSection";
import { track } from "@/lib/analytics";

const World = dynamic(
  () => import("@/components/ui/globe").then((m) => m.World),
  {
    ssr: false,
  },
);

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
    "Ready when you are.",
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
    if (logEntries.length) setLogEntries([]);
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
      setTimeout(
        () => setStatusDetail("Sending your note to the DCG inbox..."),
        800,
      ),
      setTimeout(
        () => setStatusDetail("Awaiting confirmation from our mail service..."),
        2200,
      ),
    ];

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      company: String(formData.get("company") || ""),
      country: String(formData.get("country") || ""),
      topic: String(formData.get("topic") || ""),
      message: String(formData.get("message") || ""),
      website: String(formData.get("website") || ""),
    };

    try {
      track("contact_submit", {
        topic: payload.topic || undefined,
        country: payload.country || undefined,
        hasCompany: Boolean(payload.company),
      });

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
        track("contact_error", {
          topic: payload.topic || undefined,
          status: response.status,
        });
        setErrorMessage(
          data?.error || "Something went wrong. Please try again.",
        );
        setStatusDetail("Delivery failed. Please try again.");
        setStatus("error");
        return;
      }

      form.reset();
      track("contact_success", { topic: payload.topic || undefined });
      setSubmittedMessage(
        "Thanks for reaching out! We received your message and will reply soon.",
      );
      setStatusDetail("Delivered. A confirmation email is on the way.");
      setStatus("submitted");
    } catch {
      track("contact_error", {
        topic: payload.topic || undefined,
        status: "network_error",
      });
      setErrorMessage("Unable to send right now. Please try again later.");
      setStatusDetail("Network error. Please try again.");
      setLogEntries([
        { level: "error", message: "Network error while submitting the form." },
      ]);
      setStatus("error");
      clearStatusTimers();
    }
  };

  const statusMessage =
    status === "error"
      ? (errorMessage ?? "Something went wrong. Please try again.")
      : status === "submitted"
        ? (submittedMessage ??
          "Thanks for reaching out! We received your message and will reply soon.")
        : statusDetail;

  const inputClassName =
    "w-full bg-transparent border border-white/10 rounded-2xl px-4 py-3 text-sm text-white shadow-sm transition focus:border-dcg-lightBlue focus:outline-none focus:ring-2 focus:ring-dcg-lightBlue/20";

  const textareaClassName = `${inputClassName} min-h-[140px]`;

  const globeConfig = useMemo(
    () => ({
      pointSize: 3.2,
      globeColor: "#050B16",
      showAtmosphere: true,
      atmosphereColor: "#60A5FA",
      atmosphereAltitude: 0.12,
      emissive: "#050B16",
      emissiveIntensity: 0.12,
      shininess: 0.85,
      polygonColor: "rgba(255,255,255,0.75)",
      ambientLight: "rgba(96,165,250,0.28)",
      directionalLeftLight: "rgba(255,255,255,0.32)",
      directionalTopLight: "rgba(255,255,255,0.18)",
      pointLight: "rgba(96,165,250,0.35)",
      arcTime: 1100,
      arcLength: 0.9,
      rings: 1,
      maxRings: 2,
      initialPosition: { lat: 51.5072, lng: -0.1276 },
      autoRotate: true,
      autoRotateSpeed: 0.35,
    }),
    [],
  );

  const globeArcs = useMemo(() => {
    const colors = ["#ffffff", "#ffffff", "#ffffff"];
    const pick = (i: number) => colors[i % colors.length];

    return [
      {
        order: 1,
        startLat: 51.5072,
        startLng: -0.1276,
        endLat: 47.4979,
        endLng: 19.0402,
        arcAlt: 0.22,
        color: pick(0),
      },
      {
        order: 2,
        startLat: 51.5072,
        startLng: -0.1276,
        endLat: 40.7128,
        endLng: -74.006,
        arcAlt: 0.32,
        color: pick(1),
      },
      {
        order: 3,
        startLat: 51.5072,
        startLng: -0.1276,
        endLat: 25.2048,
        endLng: 55.2708,
        arcAlt: 0.38,
        color: pick(2),
      },
      {
        order: 4,
        startLat: 51.5072,
        startLng: -0.1276,
        endLat: 28.6139,
        endLng: 77.209,
        arcAlt: 0.45,
        color: pick(0),
      },
      {
        order: 5,
        startLat: 51.5072,
        startLng: -0.1276,
        endLat: 1.3521,
        endLng: 103.8198,
        arcAlt: 0.5,
        color: pick(1),
      },
      {
        order: 6,
        startLat: 51.5072,
        startLng: -0.1276,
        endLat: -33.8688,
        endLng: 151.2093,
        arcAlt: 0.62,
        color: pick(2),
      },
      {
        order: 7,
        startLat: 47.4979,
        startLng: 19.0402,
        endLat: 37.7749,
        endLng: -122.4194,
        arcAlt: 0.52,
        color: pick(0),
      },
      {
        order: 8,
        startLat: 47.4979,
        startLng: 19.0402,
        endLat: 35.6762,
        endLng: 139.6503,
        arcAlt: 0.55,
        color: pick(1),
      },
      {
        order: 9,
        startLat: 47.4979,
        startLng: 19.0402,
        endLat: 52.52,
        endLng: 13.405,
        arcAlt: 0.16,
        color: pick(2),
      },
      {
        order: 10,
        startLat: 47.4979,
        startLng: 19.0402,
        endLat: 48.8566,
        endLng: 2.3522,
        arcAlt: 0.14,
        color: pick(0),
      },
    ];
  }, []);

  return (
    <div className="flex flex-col bg-black min-h-screen">
      <SubpageHero
        eyebrow="Contact"
        title="Start a conversation with DCG"
        emphasis="conversation"
        description="Tell us what you want to build and the outcomes you need. We'll reply with tailored next steps."
        chips={[{ label: "AI + Data + Cloud" }, { label: "Global delivery" }]}
        nobottom
      />

      <section className="dcg-section py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <form
              onSubmit={handleSubmit}
              aria-busy={status === "submitting"}
              className="relative overflow-hidden rounded-3xl border border-white/10 text-white/30 p-6 shadow-xl"
            >
              <div className="absolute -top-20 right-0 h-40 w-40 rounded-full blur-3xl" />
              <div className="relative space-y-6">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-dcg-lightBlue">
                    Project intake
                  </p>
                  <h2 className="text-2xl md:text-3xl text-white font-semibold">
                    Tell us what you're building
                  </h2>
                  <p className="text-sm text-dcg-slate">
                    We'll route your note to the right expert and follow up with
                    a clear response.
                  </p>
                </div>

                <fieldset
                  disabled={status === "submitting"}
                  className="space-y-4"
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="space-y-2 text-sm">
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
                    <label className="space-y-2 text-sm">
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
                    <label className="space-y-2 text-sm">
                      Company
                      <input
                        name="company"
                        autoComplete="organization"
                        onChange={resetStatus}
                        className={inputClassName}
                        placeholder="Organization name"
                      />
                    </label>
                    <label className="space-y-2 text-sm">
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

                  <label className="space-y-2 text-sm">
                    Phone number (optional)
                    <input
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      onChange={resetStatus}
                      className={inputClassName}
                      placeholder="+1 555 123 4567"
                    />
                  </label>

                  <label className="space-y-2 text-sm">
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

                  <label className="space-y-2 text-sm">
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
                        ? "Message sent, we'll reply soon"
                        : "Submit"}
                  </Button>

                  <p className="text-xs text-dcg-slate">
                    {status === "submitting"
                      ? `${statusMessage}${elapsedSeconds ? ` (${elapsedSeconds}s)` : ""}`
                      : statusMessage}
                  </p>
                </div>
              </div>
            </form>
          </div>

          <aside className="space-y-6">
            <div className="relative h-[36rem]">
              <div className="absolute inset-0">
                <World
                  data={globeArcs as any}
                  globeConfig={globeConfig as any}
                />
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
