import { incrementCounters, updateDoc } from "@/lib/firestore/rest";

/**
 * Fixed-window rate limiter backed by Firestore atomic counters (edge-safe, shared across isolates).
 * Complements the Cloudflare burst rule: this one enforces hourly/daily ceilings. Fails OPEN if Firestore is
 * unreachable so a database hiccup never blocks real applicants (the Cloudflare rule + Turnstile still apply).
 *
 * Docs are tiny; set a Firestore TTL policy on `rateLimits.expireAt` to have them removed automatically.
 */
export async function rateLimit(
  key: string,
  limit: number,
  windowSeconds: number,
): Promise<{ allowed: boolean; count: number; retryAfter: number }> {
  const now = Date.now();
  const bucket = Math.floor(now / (windowSeconds * 1000));
  const safeKey = key.replace(/[^A-Za-z0-9_-]/g, "_").slice(0, 120);
  const path = `rateLimits/${safeKey}_${bucket}`;
  try {
    const { n } = await incrementCounters(path, { n: 1 });
    if (n === 1) {
      // First hit in this window: stamp an expiry so a TTL policy can clean the doc up.
      const expireAt = new Date((bucket + 2) * windowSeconds * 1000); // Firestore timestamp (TTL-able)
      await updateDoc(path, { expireAt }).catch(() => undefined);
    }
    const retryAfter = Math.max(1, Math.ceil(((bucket + 1) * windowSeconds * 1000 - now) / 1000));
    return { allowed: n <= limit, count: n, retryAfter };
  } catch (error) {
    console.error("[rate-limit] failing open:", error instanceof Error ? error.message : error);
    return { allowed: true, count: 0, retryAfter: 0 };
  }
}
