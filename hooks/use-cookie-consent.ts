"use client";

import { useCallback, useEffect, useState } from "react";

const CONSENT_KEY = "dcg_cookie_consent";
const CONSENT_EVENT = "dcg-cookie-consent";

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

  window.dispatchEvent(new Event(CONSENT_EVENT));
};

const clearCookieConsent = () => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(CONSENT_KEY);

  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_KEY}=; Max-Age=0; Path=/; SameSite=Lax${secure}`;

  window.dispatchEvent(new Event(CONSENT_EVENT));
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
