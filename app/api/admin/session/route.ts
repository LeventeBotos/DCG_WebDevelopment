import { NextRequest } from "next/server";
import { resolveAdminRole } from "@/lib/auth/require-admin";
import {
  createSessionToken,
  SESSION_COOKIE,
  SESSION_TTL_SECONDS,
  verifyFirebaseIdToken,
} from "@/lib/auth/session";

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

  const body = (await req.json().catch(() => null)) as { idToken?: unknown } | null;
  if (!body || typeof body.idToken !== "string" || body.idToken.length > 4096) {
    return Response.json({ error: "Invalid request" }, { status: 400, headers: baseHeaders });
  }

  try {
    const { email } = await verifyFirebaseIdToken(body.idToken);
    const role = await resolveAdminRole(email);
    // Same response for "not an admin" and "bad token" avoids confirming which emails are allowlisted.
    if (!role) return Response.json({ error: "Access denied" }, { status: 403, headers: baseHeaders });

    const token = await createSessionToken({ email, role });
    return Response.json(
      { ok: true },
      { headers: { ...baseHeaders, "Set-Cookie": cookieHeader(token, SESSION_TTL_SECONDS) } },
    );
  } catch {
    return Response.json({ error: "Access denied" }, { status: 403, headers: baseHeaders });
  }
}

export async function DELETE(req: NextRequest) {
  if (!sameOrigin(req)) return Response.json({ error: "Bad origin" }, { status: 403, headers: baseHeaders });
  return Response.json({ ok: true }, { headers: { ...baseHeaders, "Set-Cookie": cookieHeader("", 0) } });
}
