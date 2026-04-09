"use client";

import { useCallback, useEffect, useState } from "react";

const CONSENT_KEY = "dcg_cookie_consent";
const CONSENT_EVENT = "dcg-cookie-consent";
const ANALYTICS_COOKIE_PREFIXES = ["_ga", "_gid", "_gat", "_gac_", "_dc_gtm_"];

export type CookieConsentValue = "granted" | "denied" | null;

const readCookieConsent = (): CookieConsentValue => {
  if (typeof window === "undefined") {
    return null;
  }

  const stored = window.localStorage.getItem(CONSENT_KEY);
  if (stored === "granted" || stored === "denied") {
    return stored;
  }

  const match = document.cookie.match(
    new RegExp(`(?:^|; )${CONSENT_KEY}=([^;]*)`),
  );
  if (!match) {
    return null;
  }

  const value = decodeURIComponent(match[1]);
  return value === "granted" || value === "denied" ? value : null;
};

const persistCookieConsent = (value: Exclude<CookieConsentValue, null>) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(CONSENT_KEY, value);

  const maxAge = 60 * 60 * 24 * 365;
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_KEY}=${encodeURIComponent(
    value,
  )}; Max-Age=${maxAge}; Path=/; SameSite=Lax${secure}`;

  if (value === "denied") {
    clearAnalyticsCookies();
  }

  window.dispatchEvent(new Event(CONSENT_EVENT));
};

const clearCookieConsent = () => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(CONSENT_KEY);

  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_KEY}=; Max-Age=0; Path=/; SameSite=Lax${secure}`;
  clearAnalyticsCookies();

  window.dispatchEvent(new Event(CONSENT_EVENT));
};

const expireCookie = (name: string, domain?: string) => {
  if (typeof window === "undefined") {
    return;
  }

  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  const domainPart = domain ? `; Domain=${domain}` : "";
  document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax${secure}${domainPart}`;
};

const getCookieDomains = () => {
  if (typeof window === "undefined") {
    return [undefined];
  }

  const hostname = window.location.hostname;
  const parts = hostname.split(".").filter(Boolean);
  const domains = new Set<string | undefined>([undefined, hostname]);

  for (let index = 0; index < parts.length - 1; index += 1) {
    domains.add(`.${parts.slice(index).join(".")}`);
  }

  return Array.from(domains);
};

const clearAnalyticsCookies = () => {
  if (typeof document === "undefined") {
    return;
  }

  const cookieNames = document.cookie
    .split(";")
    .map((entry) => entry.trim().split("=")[0])
    .filter(Boolean);

  if (!cookieNames.length) {
    return;
  }

  const domains = getCookieDomains();
  for (const name of cookieNames) {
    const shouldClear = ANALYTICS_COOKIE_PREFIXES.some(
      (prefix) => name === prefix || name.startsWith(prefix),
    );

    if (!shouldClear) {
      continue;
    }

    for (const domain of domains) {
      expireCookie(name, domain);
    }
  }
};

export const useCookieConsent = () => {
  const [consent, setConsentState] = useState<CookieConsentValue>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setConsentState(readCookieConsent());
    setIsReady(true);

    const handler = () => setConsentState(readCookieConsent());
    window.addEventListener(CONSENT_EVENT, handler);
    return () => window.removeEventListener(CONSENT_EVENT, handler);
  }, []);

  const setConsent = useCallback(
    (value: Exclude<CookieConsentValue, null>) => {
      persistCookieConsent(value);
      setConsentState(value);
    },
    [],
  );

  const resetConsent = useCallback(() => {
    clearCookieConsent();
    setConsentState(null);
  }, []);

  return { consent, isReady, setConsent, resetConsent };
};
