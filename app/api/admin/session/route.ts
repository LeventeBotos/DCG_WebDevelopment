import { NextRequest } from "next/server";
import { audit } from "@/lib/audit";
import { alertOwnersOfDeniedLogins } from "@/lib/auth-alerts";
import { resolveAdminRole } from "@/lib/auth/require-admin";
import {
  createSessionToken,
  readSessionToken,
  SESSION_COOKIE,
  SESSION_TTL_SECONDS,
  verifyFirebaseIdToken,
} from "@/lib/auth/session";
import { hashIp } from "@/lib/ip-hash";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const baseHeaders = { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" };

/** Same-origin check: the browser sends Origin on POST/DELETE; reject anything that isn't our host. */
function sameOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).host === req.nextUrl.host;
  } catch {
    return false;
  }
}

function cookieHeader(value: string, maxAge: number): string {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${SESSION_COOKIE}=${value}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${maxAge}${secure}`;
}

export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) return Response.json({ error: "Bad origin" }, { status: 403, headers: baseHeaders });

  const ipKey = (await hashIp(req)) ?? "noip";
  const country = req.headers.get("cf-ipcountry") ?? "";

  // Blunt brute-force: 12 sign-in attempts per 10 minutes per address.
  const attempts = await rateLimit(`session_${ipKey}`, 12, 600);
  if (!attempts.allowed) {
    return Response.json({ error: "Too many attempts" }, { status: 429, headers: { ...baseHeaders, "Retry-After": String(attempts.retryAfter) } });
  }

  const body = (await req.json().catch(() => null)) as { idToken?: unknown } | null;
  if (!body || typeof body.idToken !== "string" || body.idToken.length > 4096) {
    return Response.json({ error: "Invalid request" }, { status: 400, headers: baseHeaders });
  }

  let email = "";
  try {
    ({ email } = await verifyFirebaseIdToken(body.idToken));
  } catch {
    await audit("unknown", "auth.invalid_token", "auth", undefined, { ip: ipKey, country });
    return Response.json({ error: "Access denied" }, { status: 403, headers: baseHeaders });
  }

  const role = await resolveAdminRole(email).catch(() => null);
  if (!role) {
    // A verified Google account that is not on the allowlist. Same response as a bad token so allowlisted
    // emails cannot be enumerated, but the owners are told after repeated attempts.
    await audit(email, "auth.denied", "auth", undefined, { ip: ipKey, country });
    const denials = await rateLimit(`authdeny_${ipKey}`, 1_000, 3600);
    if (denials.count === 3) await alertOwnersOfDeniedLogins({ email, country, attempts: denials.count }).catch(() => undefined);
    return Response.json({ error: "Access denied" }, { status: 403, headers: baseHeaders });
  }

  await audit(email, "auth.login", "auth", undefined, { ip: ipKey, country, role });
  const token = await createSessionToken({ email, role });
  return Response.json({ ok: true }, { headers: { ...baseHeaders, "Set-Cookie": cookieHeader(token, SESSION_TTL_SECONDS) } });
}

export async function DELETE(req: NextRequest) {
  if (!sameOrigin(req)) return Response.json({ error: "Bad origin" }, { status: 403, headers: baseHeaders });
  const session = await readSessionToken(req.cookies.get(SESSION_COOKIE)?.value);
  if (session) await audit(session.email, "auth.logout", "auth");
  return Response.json({ ok: true }, { headers: { ...baseHeaders, "Set-Cookie": cookieHeader("", 0) } });
}
