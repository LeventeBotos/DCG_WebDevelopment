"use client";

import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "./config";

/**
 * Redirect sign-in uses the public domain's proxied Firebase OAuth handler.
 * Plain http (localhost dev) uses the popup.
 */
export function canUseRedirect() {
  return typeof window !== "undefined" && window.location.protocol === "https:";
}

/** Browser-only Firebase Auth. Used solely to obtain a Google ID token; we never keep a client session. */
export function getFirebaseAuth() {
  const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  return getAuth(app);
}
