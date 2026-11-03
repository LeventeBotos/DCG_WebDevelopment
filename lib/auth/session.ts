import { createRemoteJWKSet, jwtVerify, SignJWT } from "jose";
import { firebaseProjectId } from "@/lib/firebase/config";

export type AdminRole = "owner" | "editor";
export type AdminSession = { email: string; role: AdminRole };

const isProd = process.env.NODE_ENV === "production";
/** __Host- prefix pins the cookie to this exact host over HTTPS; plain name in dev (http://localhost). */
export const SESSION_COOKIE = isProd ? "__Host-dcg_admin" : "dcg_admin";
export const SESSION_TTL_SECONDS = 8 * 60 * 60;
const MAX_AUTH_AGE_SECONDS = 5 * 60;

const googleKeys = createRemoteJWKSet(
  new URL("https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com"),
);

function sessionSecret(): Uint8Array {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!s || s.length < 32) throw new Error("ADMIN_SESSION_SECRET must be set (>= 32 chars)");
  return new TextEncoder().encode(s);
}

/** Verify a Firebase ID token from the Google sign-in popup. Returns the verified email or throws. */
export async function verifyFirebaseIdToken(idToken: string): Promise<{ email: string }> {
  const { payload } = await jwtVerify(idToken, googleKeys, {
    issuer: `https://securetoken.google.com/${firebaseProjectId}`,
    audience: firebaseProjectId,
    algorithms: ["RS256"],
  });

  const email = typeof payload.email === "string" ? payload.email.toLowerCase() : "";
  const firebase = payload.firebase as { sign_in_provider?: string } | undefined;
  const authTime = typeof payload.auth_time === "number" ? payload.auth_time : 0;

  if (!email || payload.email_verified !== true) throw new Error("Email not verified");
  if (firebase?.sign_in_provider !== "google.com") throw new Error("Google sign-in required");
  if (Date.now() / 1000 - authTime > MAX_AUTH_AGE_SECONDS) throw new Error("Sign-in is too old");
  return { email };
}

export async function createSessionToken(session: AdminSession): Promise<string> {
  return new SignJWT({ role: session.role })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(session.email)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(sessionSecret());
}

/** Returns the session claims if the cookie value is valid and unexpired, otherwise null. */
export async function readSessionToken(token: string | undefined): Promise<AdminSession | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, sessionSecret(), { algorithms: ["HS256"] });
    const role = payload.role === "owner" ? "owner" : payload.role === "editor" ? "editor" : null;
    if (!payload.sub || !role) return null;
    return { email: payload.sub, role };
  } catch {
    return null;
  }
}
