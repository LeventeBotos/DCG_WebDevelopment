"use client";

import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "./config";

/**
 * Redirect sign-in needs our own origin as authDomain (via the /__/auth proxy), and the SDK always builds
 * https://<authDomain>/__/auth/handler, so it only works on HTTPS. Plain http (localhost dev) uses the popup.
 */
export function canUseRedirect() {
  return typeof window !== "undefined" && window.location.protocol === "https:";
}

/** Browser-only Firebase Auth. Used solely to obtain a Google ID token; we never keep a client session. */
export function getFirebaseAuth() {
  const app = getApps().length ? getApp() : initializeApp({ ...firebaseConfig, authDomain: canUseRedirect() ? window.location.host : firebaseConfig.authDomain });
  return getAuth(app);
}
