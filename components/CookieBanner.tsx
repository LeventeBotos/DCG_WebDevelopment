"use client";

import Link from "next/link";
import { useCookieConsent } from "@/hooks/use-cookie-consent";
import { track } from "@/lib/analytics";

export default function CookieBanner() {
  const { consent, isReady, setConsent } = useCookieConsent();

  if (!isReady || consent !== null) {
    return null;
  }

  return (
    <div
      className="fixed bottom-4 right-4 z-[60] md:bottom-6 left-4 md:left-auto   md:right-6"
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
    >
      <div className="mx-auto flex flex-col md:max-w-xl gap-4 rounded-2xl border border-white/15 bg-black/85 p-4 shadow-2xl backdrop-blur  md:gap-6 md:p-6">
        <div className="space-y-2 text-white">
          <p className="text-sm font-semibold uppercase tracking-wide text-white/70">
            Cookie preferences
          </p>
          <p className="text-sm text-white/80">
            We use analytics cookies to understand how the site is used. These
            only load after you accept. See our{" "}
            <Link
              href="/privacy-policy"
              className="font-semibold text-white underline underline-offset-4 hover:text-white/70"
            >
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link
              href="/cookie-policy"
              className="font-semibold text-white underline underline-offset-4 hover:text-white/70"
            >
              Cookie Policy
            </Link>
            .
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={() => {
              track("cta_click", {
                label: "Reject analytics",
                location: "cookie_banner",
              });
              setConsent("denied");
            }}
            className="rounded-lg border border-white/30 px-4 py-2 text-sm font-semibold text-white/80 transition hover:border-white/60 hover:text-white"
          >
            Reject analytics
          </button>
          <button
            type="button"
            onClick={() => {
              track("cta_click", {
                label: "Accept analytics",
                location: "cookie_banner",
              });
              setConsent("granted");
            }}
            className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-white/80"
          >
            Accept analytics
          </button>
        </div>
      </div>
    </div>
  );
}
