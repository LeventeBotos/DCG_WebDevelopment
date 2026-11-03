import { getAccessToken } from "@/lib/firestore/rest";

/**
 * Optional read-only GA4 Data API reader. Enabled when GA4_PROPERTY_ID is set (the numeric property id, not the
 * G-XXXX measurement id) and the service account has been added to that property with the Viewer role.
 * GA4 only counts visitors who accepted cookies, so these numbers are a lower bound on real traffic.
 */

const SCOPE = "https://www.googleapis.com/auth/analytics.readonly";

export type Ga4Summary =
  | { configured: false }
  | { configured: true; ok: false; error: string }
  | {
      configured: true;
      ok: true;
      totals: { users: number; sessions: number; pageviews: number; avgSessionSeconds: number };
      pages: { key: string; value: number }[];
      channels: { key: string; value: number }[];
      countries: { key: string; value: number }[];
    };

type Report = { rows?: { dimensionValues?: { value: string }[]; metricValues?: { value: string }[] }[] };

async function runReport(property: string, token: string, body: Record<string, unknown>): Promise<Report> {
  const res = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${property}:runReport`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  if (!res.ok) {
    const detail = await res.json().catch(() => null);
    throw new Error(detail?.error?.message ?? `GA4 request failed (${res.status})`);
  }
  return res.json();
}

const ranked = (r: Report) =>
  (r.rows ?? []).map((row) => ({
    key: row.dimensionValues?.[0]?.value ?? "(unknown)",
    value: Number(row.metricValues?.[0]?.value ?? 0),
  }));

export async function getGa4Summary(days: number): Promise<Ga4Summary> {
  const property = process.env.GA4_PROPERTY_ID?.trim();
  if (!property || !/^\d+$/.test(property)) return { configured: false };

  try {
    const token = await getAccessToken(SCOPE);
    const dateRanges = [{ startDate: `${days}daysAgo`, endDate: "today" }];
    const [totals, pages, channels, countries] = await Promise.all([
      runReport(property, token, {
        dateRanges,
        metrics: [{ name: "activeUsers" }, { name: "sessions" }, { name: "screenPageViews" }, { name: "averageSessionDuration" }],
      }),
      runReport(property, token, {
        dateRanges,
        dimensions: [{ name: "pagePath" }],
        metrics: [{ name: "screenPageViews" }],
        orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
        limit: 10,
      }),
      runReport(property, token, {
        dateRanges,
        dimensions: [{ name: "sessionDefaultChannelGroup" }],
        metrics: [{ name: "sessions" }],
        orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
        limit: 8,
      }),
      runReport(property, token, {
        dateRanges,
        dimensions: [{ name: "country" }],
        metrics: [{ name: "activeUsers" }],
        orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }],
        limit: 8,
      }),
    ]);

    const t = totals.rows?.[0]?.metricValues ?? [];
    return {
      configured: true,
      ok: true,
      totals: {
        users: Number(t[0]?.value ?? 0),
        sessions: Number(t[1]?.value ?? 0),
        pageviews: Number(t[2]?.value ?? 0),
        avgSessionSeconds: Math.round(Number(t[3]?.value ?? 0)),
      },
      pages: ranked(pages),
      channels: ranked(channels),
      countries: ranked(countries),
    };
  } catch (error) {
    return { configured: true, ok: false, error: error instanceof Error ? error.message : "GA4 request failed" };
  }
}
