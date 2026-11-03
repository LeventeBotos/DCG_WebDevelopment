/**
 * Public Firebase web config. These values identify the project and are safe to ship to the browser;
 * access is controlled by Auth + Firestore rules (deny-all), not by hiding these.
 *
 * Intentionally NOT initialising Firebase Analytics: site analytics must stay behind the cookie-consent
 * gate in lib/analytics.ts (GA4 id G-T9WH3XWBH5).
 */
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "AIzaSyDAAt0CnMSmck5h0Zo-Oy5dQf6dx21N1Tc",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "dataconsultinggroup.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "dataconsultinggroup",
  storageBucket: "dataconsultinggroup.firebasestorage.app",
  messagingSenderId: "791574804700",
  appId: "1:791574804700:web:59341c076940a14ffd1c19",
} as const;

export const firebaseProjectId = firebaseConfig.projectId;
