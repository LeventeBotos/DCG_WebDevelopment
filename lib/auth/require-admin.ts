import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getDoc } from "@/lib/firestore/rest";
import { readSessionToken, SESSION_COOKIE, type AdminRole, type AdminSession } from "./session";

/**
 * Look up the current allowlist entry. Firestore `admins/{email}` is authoritative; the
 * ADMIN_OWNER_EMAILS env var only bootstraps owners so the first login works on an empty database.
 * Returns null when the email is not allowed.
 */
export async function resolveAdminRole(email: string): Promise<AdminRole | null> {
  const normalized = email.toLowerCase();
  const doc = await getDoc<{ role?: string }>(`admins/${encodeURIComponent(normalized)}`);
  if (doc) return doc.role === "owner" ? "owner" : doc.role === "editor" ? "editor" : null;

  const bootstrap = (process.env.ADMIN_OWNER_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return bootstrap.includes(normalized) ? "owner" : null;
}

/** Current admin or null. Re-checks the allowlist on every call so removals apply immediately. */
export async function getAdmin(): Promise<AdminSession | null> {
  const store = await cookies();
  const session = await readSessionToken(store.get(SESSION_COOKIE)?.value);
  if (!session) return null;
  const role = await resolveAdminRole(session.email);
  return role ? { email: session.email, role } : null;
}

/** For pages, layouts and server actions: redirects to the login page when not an admin. */
export async function requireAdmin(): Promise<AdminSession> {
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login");
  return admin;
}

export async function requireOwner(): Promise<AdminSession> {
  const admin = await requireAdmin();
  if (admin.role !== "owner") redirect("/admin?denied=1");
  return admin;
}

/** For route handlers: returns the admin or a 401/403 Response to return directly. */
export async function requireAdminApi(
  minimum: AdminRole = "editor",
): Promise<{ admin: AdminSession } | { response: Response }> {
  const admin = await getAdmin();
  if (!admin) return { response: Response.json({ error: "Unauthorized" }, { status: 401 }) };
  if (minimum === "owner" && admin.role !== "owner") {
    return { response: Response.json({ error: "Forbidden" }, { status: 403 }) };
  }
  return { admin };
}
