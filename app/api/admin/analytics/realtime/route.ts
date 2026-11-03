import { requireAdminApi } from "@/lib/auth/require-admin";
import { COLL } from "@/lib/analytics/collector";
import { queryDocs } from "@/lib/firestore/rest";

export const runtime = "edge";
export const dynamic = "force-dynamic";

type Visitor = { lastSeen?: string; lastPath?: string; country?: string; device?: string };

/** Live visitors: anyone whose last pageview was in the last N minutes (visitor records expire after 2 days). */
export async function GET() {
  const auth = await requireAdminApi();
  if ("response" in auth) return auth.response;

  const since30 = new Date(Date.now() - 30 * 60_000).toISOString();
  const rows = await queryDocs<Visitor>(COLL.visitors, {
    where: [{ field: "lastSeen", op: "GREATER_THAN_OR_EQUAL", value: since30 }],
    limit: 2000,
  }).catch(() => []);

  const cutoff5 = Date.now() - 5 * 60_000;
  const active = rows.filter((r) => r.lastSeen && Date.parse(r.lastSeen) >= cutoff5);
  const tally = (list: Visitor[], pick: (v: Visitor) => string | undefined) => {
    const m = new Map<string, number>();
    for (const v of list) {
      const k = pick(v);
      if (k) m.set(k, (m.get(k) ?? 0) + 1);
    }
    return [...m.entries()].map(([key, value]) => ({ key, value })).sort((a, b) => b.value - a.value).slice(0, 8);
  };

  // Visitors per minute for the last 30 minutes (by last activity).
  const perMinute = Array.from({ length: 30 }, () => 0);
  for (const r of rows) {
    if (!r.lastSeen) continue;
    const ago = Math.floor((Date.now() - Date.parse(r.lastSeen)) / 60_000);
    if (ago >= 0 && ago < 30) perMinute[29 - ago]++;
  }

  return Response.json(
    {
      activeNow: active.length,
      last30Minutes: rows.length,
      pages: tally(active, (v) => v.lastPath),
      countries: tally(active, (v) => v.country),
      devices: tally(active, (v) => v.device),
      perMinute,
      at: new Date().toISOString(),
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
