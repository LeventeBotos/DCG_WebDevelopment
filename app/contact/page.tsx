"use client";

import dynamic from "next/dynamic";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import SubpageHero from "@/components/SubpageHero";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const World = dynamic(
  () => import("@/components/ui/globe").then((m) => m.World),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full rounded-[2rem] border border-white/10 bg-white/5" />
    ),
  },
);

const topics = [
  "AI Strategy",
  "Retail AI",
  "Knowledge Graphs & Digital Twins",
  "Cloud Migration",
  "Other",
];

type CountryOption = {
  name: string;
  code: string;
};

const countries: CountryOption[] = [
  { name: "Afghanistan", code: "AF" },
  { name: "Albania", code: "AL" },
  { name: "Algeria", code: "DZ" },
  { name: "Andorra", code: "AD" },
  { name: "Angola", code: "AO" },
  { name: "Antigua and Barbuda", code: "AG" },
  { name: "Argentina", code: "AR" },
  { name: "Armenia", code: "AM" },
  { name: "Australia", code: "AU" },
  { name: "Austria", code: "AT" },
  { name: "Azerbaijan", code: "AZ" },
  { name: "Bahamas", code: "BS" },
  { name: "Bahrain", code: "BH" },
  { name: "Bangladesh", code: "BD" },
  { name: "Barbados", code: "BB" },
  { name: "Belarus", code: "BY" },
  { name: "Belgium", code: "BE" },
  { name: "Belize", code: "BZ" },
  { name: "Benin", code: "BJ" },
  { name: "Bhutan", code: "BT" },
  { name: "Bolivia", code: "BO" },
  { name: "Bosnia and Herzegovina", code: "BA" },
  { name: "Botswana", code: "BW" },
  { name: "Brazil", code: "BR" },
  { name: "Brunei", code: "BN" },
  { name: "Bulgaria", code: "BG" },
  { name: "Burkina Faso", code: "BF" },
  { name: "Burundi", code: "BI" },
  { name: "Cambodia", code: "KH" },
  { name: "Cameroon", code: "CM" },
  { name: "Canada", code: "CA" },
  { name: "Cape Verde", code: "CV" },
  { name: "Central African Republic", code: "CF" },
  { name: "Chad", code: "TD" },
  { name: "Chile", code: "CL" },
  { name: "China", code: "CN" },
  { name: "Colombia", code: "CO" },
  { name: "Comoros", code: "KM" },
  { name: "Congo", code: "CG" },
  { name: "Costa Rica", code: "CR" },
  { name: "Croatia", code: "HR" },
  { name: "Cuba", code: "CU" },
  { name: "Cyprus", code: "CY" },
  { name: "Czech Republic", code: "CZ" },
  { name: "Denmark", code: "DK" },
  { name: "Djibouti", code: "DJ" },
  { name: "Dominica", code: "DM" },
  { name: "Dominican Republic", code: "DO" },
  { name: "Ecuador", code: "EC" },
  { name: "Egypt", code: "EG" },
  { name: "El Salvador", code: "SV" },
  { name: "Equatorial Guinea", code: "GQ" },
  { name: "Eritrea", code: "ER" },
  { name: "Estonia", code: "EE" },
  { name: "Eswatini", code: "SZ" },
  { name: "Ethiopia", code: "ET" },
  { name: "Fiji", code: "FJ" },
  { name: "Finland", code: "FI" },
  { name: "France", code: "FR" },
  { name: "Gabon", code: "GA" },
  { name: "Gambia", code: "GM" },
  { name: "Georgia", code: "GE" },
  { name: "Germany", code: "DE" },
  { name: "Ghana", code: "GH" },
  { name: "Greece", code: "GR" },
  { name: "Grenada", code: "GD" },
  { name: "Guatemala", code: "GT" },
  { name: "Guinea", code: "GN" },
  { name: "Guinea-Bissau", code: "GW" },
  { name: "Guyana", code: "GY" },
  { name: "Haiti", code: "HT" },
  { name: "Honduras", code: "HN" },
  { name: "Hungary", code: "HU" },
  { name: "Iceland", code: "IS" },
  { name: "India", code: "IN" },
  { name: "Indonesia", code: "ID" },
  { name: "Iran", code: "IR" },
  { name: "Iraq", code: "IQ" },
  { name: "Ireland", code: "IE" },
  { name: "Israel", code: "IL" },
  { name: "Italy", code: "IT" },
  { name: "Jamaica", code: "JM" },
  { name: "Japan", code: "JP" },
  { name: "Jordan", code: "JO" },
  { name: "Kazakhstan", code: "KZ" },
  { name: "Kenya", code: "KE" },
  { name: "Kiribati", code: "KI" },
  { name: "Kuwait", code: "KW" },
  { name: "Kyrgyzstan", code: "KG" },
  { name: "Laos", code: "LA" },
  { name: "Latvia", code: "LV" },
  { name: "Lebanon", code: "LB" },
  { name: "Lesotho", code: "LS" },
  { name: "Liberia", code: "LR" },
  { name: "Libya", code: "LY" },
  { name: "Liechtenstein", code: "LI" },
  { name: "Lithuania", code: "LT" },
  { name: "Luxembourg", code: "LU" },
  { name: "Madagascar", code: "MG" },
  { name: "Malawi", code: "MW" },
  { name: "Malaysia", code: "MY" },
  { name: "Maldives", code: "MV" },
  { name: "Mali", code: "ML" },
  { name: "Malta", code: "MT" },
  { name: "Marshall Islands", code: "MH" },
  { name: "Mauritania", code: "MR" },
  { name: "Mauritius", code: "MU" },
  { name: "Mexico", code: "MX" },
  { name: "Micronesia", code: "FM" },
  { name: "Moldova", code: "MD" },
  { name: "Monaco", code: "MC" },
  { name: "Mongolia", code: "MN" },
  { name: "Montenegro", code: "ME" },
  { name: "Morocco", code: "MA" },
  { name: "Mozambique", code: "MZ" },
  { name: "Myanmar", code: "MM" },
  { name: "Namibia", code: "NA" },
  { name: "Nauru", code: "NR" },
  { name: "Nepal", code: "NP" },
  { name: "Netherlands", code: "NL" },
  { name: "New Zealand", code: "NZ" },
  { name: "Nicaragua", code: "NI" },
  { name: "Niger", code: "NE" },
  { name: "Nigeria", code: "NG" },
  { name: "North Korea", code: "KP" },
  { name: "North Macedonia", code: "MK" },
  { name: "Norway", code: "NO" },
  { name: "Oman", code: "OM" },
  { name: "Pakistan", code: "PK" },
  { name: "Palau", code: "PW" },
  { name: "Panama", code: "PA" },
  { name: "Papua New Guinea", code: "PG" },
  { name: "Paraguay", code: "PY" },
  { name: "Peru", code: "PE" },
  { name: "Philippines", code: "PH" },
  { name: "Poland", code: "PL" },
  { name: "Portugal", code: "PT" },
  { name: "Qatar", code: "QA" },
  { name: "Romania", code: "RO" },
  { name: "Russia", code: "RU" },
  { name: "Rwanda", code: "RW" },
  { name: "Saint Kitts and Nevis", code: "KN" },
  { name: "Saint Lucia", code: "LC" },
  { name: "Saint Vincent and the Grenadines", code: "VC" },
  { name: "Samoa", code: "WS" },
  { name: "San Marino", code: "SM" },
  { name: "Sao Tome and Principe", code: "ST" },
  { name: "Saudi Arabia", code: "SA" },
  { name: "Senegal", code: "SN" },
  { name: "Serbia", code: "RS" },
  { name: "Seychelles", code: "SC" },
  { name: "Sierra Leone", code: "SL" },
  { name: "Singapore", code: "SG" },
  { name: "Slovakia", code: "SK" },
  { name: "Slovenia", code: "SI" },
  { name: "Solomon Islands", code: "SB" },
  { name: "Somalia", code: "SO" },
  { name: "South Africa", code: "ZA" },
  { name: "South Korea", code: "KR" },
  { name: "South Sudan", code: "SS" },
  { name: "Spain", code: "ES" },
  { name: "Sri Lanka", code: "LK" },
  { name: "Sudan", code: "SD" },
  { name: "Suriname", code: "SR" },
  { name: "Sweden", code: "SE" },
  { name: "Switzerland", code: "CH" },
  { name: "Syria", code: "SY" },
  { name: "Taiwan", code: "TW" },
  { name: "Tajikistan", code: "TJ" },
  { name: "Tanzania", code: "TZ" },
  { name: "Thailand", code: "TH" },
  { name: "Timor-Leste", code: "TL" },
  { name: "Togo", code: "TG" },
  { name: "Tonga", code: "TO" },
  { name: "Trinidad and Tobago", code: "TT" },
  { name: "Tunisia", code: "TN" },
  { name: "Turkey", code: "TR" },
  { name: "Turkmenistan", code: "TM" },
  { name: "Tuvalu", code: "TV" },
  { name: "Uganda", code: "UG" },
  { name: "Ukraine", code: "UA" },
  { name: "United Arab Emirates", code: "AE" },
  { name: "United Kingdom", code: "GB" },
  { name: "United States", code: "US" },
  { name: "Uruguay", code: "UY" },
  { name: "Uzbekistan", code: "UZ" },
  { name: "Vanuatu", code: "VU" },
  { name: "Vatican City", code: "VA" },
  { name: "Venezuela", code: "VE" },
  { name: "Vietnam", code: "VN" },
  { name: "Yemen", code: "YE" },
  { name: "Zambia", code: "ZM" },
  { name: "Zimbabwe", code: "ZW" },
];

const getFlagEmoji = (countryCode: string) =>
  String.fromCodePoint(
    ...countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt(0)),
  );

type LogEntry = {
  level: "info" | "warn" | "error";
  message: string;
  detail?: string;
};

export default function ContactPage() {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "submitted" | "error"
  >("idle");
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [countryQuery, setCountryQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [activeCountryIndex, setActiveCountryIndex] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);
  const [logEntries, setLogEntries] = useState<LogEntry[]>([]);
  const [statusDetail, setStatusDetail] = useState<string>(
    "Ready when you are.",
  );
  const [requestId, setRequestId] = useState<string | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [shouldRenderGlobe, setShouldRenderGlobe] = useState(false);
  const statusTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const globeSectionRef = useRef<HTMLDivElement>(null);
  const countryDropdownRef = useRef<HTMLDivElement>(null);
  const countrySearchRef = useRef<HTMLInputElement>(null);
  const countryListboxId = useId();
  const countryLabelId = useId();

  useOutsideClick(countryDropdownRef, () => setIsCountryOpen(false));

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        setShouldRenderGlobe(true);
        observer.disconnect();
      },
      { rootMargin: "200px 0px" },
    );

    if (globeSectionRef.current) {
      observer.observe(globeSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isCountryOpen) {
      setCountryQuery("");
      return;
    }

    const timer = window.setTimeout(() => {
      countrySearchRef.current?.focus();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [isCountryOpen]);

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
      setIsCountryOpen(false);
      setCountryQuery("");
      setActiveCountryIndex(0);
      setSelectedCountry("");
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

  const filteredCountries = useMemo(() => {
    const normalizedQuery = countryQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return countries;
    }

    return countries.filter(({ name, code }) => {
      const normalizedName = name.toLowerCase();
      const normalizedCode = code.toLowerCase();

      return (
        normalizedName.includes(normalizedQuery) ||
        normalizedCode.includes(normalizedQuery)
      );
    });
  }, [countryQuery]);

  const selectedCountryOption = useMemo(
    () => countries.find(({ name }) => name === selectedCountry) ?? null,
    [selectedCountry],
  );

  useEffect(() => {
    if (!filteredCountries.length) {
      setActiveCountryIndex(0);
      return;
    }

    const selectedIndex = filteredCountries.findIndex(
      (country) => country.name === selectedCountry,
    );

    setActiveCountryIndex(
      selectedIndex >= 0 ? selectedIndex : Math.min(activeCountryIndex, filteredCountries.length - 1),
    );
  }, [filteredCountries, selectedCountry]);

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
    setCountryQuery("");
    setIsCountryOpen(false);
    setActiveCountryIndex(0);
    resetStatus();
  };

  const openCountryDropdown = () => {
    setIsCountryOpen(true);
  };

  const handleCountryTriggerKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
  ) => {
    if (
      event.key === "ArrowDown" ||
      event.key === "ArrowUp" ||
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();
      openCountryDropdown();
    }
  };

  const handleCountrySearchKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Escape") {
      event.preventDefault();
      setIsCountryOpen(false);
      return;
    }

    if (!filteredCountries.length) {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveCountryIndex((current) =>
        Math.min(current + 1, filteredCountries.length - 1),
      );
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveCountryIndex((current) => Math.max(current - 1, 0));
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      const activeCountry = filteredCountries[activeCountryIndex];
      if (activeCountry) {
        handleCountrySelect(activeCountry.name);
      }
    }
  };

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
              aria-describedby="contact-form-status"
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
                    <label className="space-y-2 text-sm font-medium text-white">
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
                    <label className="space-y-2 text-sm font-medium text-white">
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
                    <label className="space-y-2 text-sm font-medium text-white">
                      Company
                      <input
                        name="company"
                        autoComplete="organization"
                        onChange={resetStatus}
                        className={inputClassName}
                        placeholder="Organization name"
                      />
                    </label>
                    <div className="space-y-2 text-sm font-medium text-white">
                      <label id={countryLabelId} htmlFor="country-search">
                        Country
                      </label>
                      <div className="relative" ref={countryDropdownRef}>
                        <input
                          type="hidden"
                          name="country"
                          value={selectedCountry}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setIsCountryOpen((currentOpen) => !currentOpen)
                          }
                          onKeyDown={handleCountryTriggerKeyDown}
                          className={cn(
                            inputClassName,
                            "flex items-center justify-between gap-3 text-left",
                            !selectedCountryOption && "text-dcg-slate",
                          )}
                          aria-labelledby={countryLabelId}
                          aria-haspopup="listbox"
                          aria-expanded={isCountryOpen}
                          aria-controls={isCountryOpen ? countryListboxId : undefined}
                          aria-label={
                            selectedCountryOption
                              ? `Select country, current selection ${selectedCountryOption.name}`
                              : "Select country"
                          }
                          disabled={status === "submitting"}
                        >
                          <span className="flex min-w-0 items-center gap-3">
                            <span className="text-base leading-none">
                              {selectedCountryOption
                                ? getFlagEmoji(selectedCountryOption.code)
                                : "🌐"}
                            </span>
                            <span className="truncate">
                              {selectedCountryOption?.name ||
                                "Select your country"}
                            </span>
                          </span>
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 shrink-0 transition-transform",
                              isCountryOpen && "rotate-180",
                            )}
                          />
                        </button>

                        {isCountryOpen ? (
                          <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-30 overflow-hidden rounded-2xl border border-white/10 bg-black/95 shadow-2xl backdrop-blur-xl">
                            <div className="border-b border-white/10 p-3">
                              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3">
                                <Search className="h-4 w-4 shrink-0 text-dcg-slate" />
                                <input
                                  id="country-search"
                                  ref={countrySearchRef}
                                  type="text"
                                  role="combobox"
                                  aria-autocomplete="list"
                                  aria-expanded={isCountryOpen}
                                  aria-controls={countryListboxId}
                                  aria-labelledby={countryLabelId}
                                  aria-activedescendant={
                                    filteredCountries[activeCountryIndex]
                                      ? `country-option-${filteredCountries[activeCountryIndex].code}`
                                      : undefined
                                  }
                                  value={countryQuery}
                                  onChange={(event) => {
                                    setCountryQuery(event.target.value);
                                    setActiveCountryIndex(0);
                                    resetStatus();
                                  }}
                                  onKeyDown={handleCountrySearchKeyDown}
                                  className="h-11 w-full bg-transparent text-sm text-white placeholder:text-dcg-slate focus:outline-none"
                                  placeholder="Search country"
                                  autoComplete="off"
                                />
                              </div>
                            </div>

                            <div
                              id={countryListboxId}
                              role="listbox"
                              aria-labelledby={countryLabelId}
                              className="max-h-72 overflow-y-auto p-2"
                            >
                              {filteredCountries.length ? (
                                filteredCountries.map((country, index) => {
                                  const isSelected =
                                    country.name === selectedCountry;
                                  const isActive = index === activeCountryIndex;

                                  return (
                                    <button
                                      key={country.code}
                                      id={`country-option-${country.code}`}
                                      type="button"
                                      onClick={() =>
                                        handleCountrySelect(country.name)
                                      }
                                      onMouseEnter={() =>
                                        setActiveCountryIndex(index)
                                      }
                                      className={cn(
                                        "flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-sm text-white transition hover:bg-white/5",
                                        (isSelected || isActive) && "bg-white/5",
                                      )}
                                      role="option"
                                      aria-selected={isSelected}
                                      aria-label={`Select ${country.name}`}
                                    >
                                      <span className="flex min-w-0 items-center gap-3">
                                        <span className="text-base leading-none">
                                          {getFlagEmoji(country.code)}
                                        </span>
                                        <span className="truncate">
                                          {country.name}
                                        </span>
                                      </span>
                                      {isSelected ? (
                                        <Check className="h-4 w-4 shrink-0 text-dcg-lightBlue" />
                                      ) : null}
                                    </button>
                                  );
                                })
                              ) : (
                                <div className="px-3 py-4 text-sm text-dcg-slate">
                                  No countries found.
                                </div>
                              )}
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <label className="space-y-2 text-sm font-medium text-white">
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

                  <label className="space-y-2 text-sm font-medium text-white">
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

                  <label className="space-y-2 text-sm font-medium text-white">
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

                  <p
                    id="contact-form-status"
                    role="status"
                    aria-live="polite"
                    aria-atomic="true"
                    className={`text-xs ${
                      status === "error"
                        ? "text-red-300"
                        : status === "submitted"
                          ? "text-emerald-300"
                          : "text-dcg-slate"
                    }`}
                  >
                    {status === "submitting"
                      ? `${statusMessage}${elapsedSeconds ? ` (${elapsedSeconds}s)` : ""}`
                      : statusMessage}
                  </p>
                </div>
              </div>
            </form>
          </div>

          <aside
            ref={globeSectionRef}
            className="space-y-6"
            aria-label="Global delivery coverage"
          >
            <div className="relative h-[36rem]">
              <div className="absolute inset-0">
                {shouldRenderGlobe ? (
                  <World
                    data={globeArcs as any}
                    globeConfig={globeConfig as any}
                  />
                ) : (
                  <div className="h-full w-full rounded-[2rem] border border-white/10 bg-white/5" />
                )}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
