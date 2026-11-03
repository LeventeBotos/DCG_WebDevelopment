/**
 * One-way hash of the client IP, salted per day, so we can spot repeat abuse within a day
 * without ever storing an address. Rotating the salt daily makes cross-day tracking impossible.
 */
export async function hashIp(request: Request): Promise<string | null> {
  const ip =
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    null;
  if (!ip) return null;
  const day = new Date().toISOString().slice(0, 10);
  const secret = process.env.ADMIN_SESSION_SECRET ?? "dcg";
  const data = new TextEncoder().encode(`${ip}|${day}|${secret}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .slice(0, 12)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
