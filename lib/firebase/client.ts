"use client";

import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "./config";

/** Browser-only Firebase Auth. Used solely to obtain a Google ID token; we never keep a client session. */
export function getFirebaseAuth() {
  const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  return getAuth(app);
}
