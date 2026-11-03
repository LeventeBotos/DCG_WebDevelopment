import { getAccessToken } from "@/lib/firestore/rest";

/**
 * Optional read-only GA4 Data API reader. Enabled when GA4_PROPERTY_ID is set (the numeric property id, not the
 * G-XXXX measurement id) and the service account has been added to that property with the Viewer role.
 * GA4 only counts visitors who accepted cookies, so these numbers are a lower bound on real traffic.
 */

const SCOPE = "https://www.googleapis.com/auth/analytics.readonly";

type Row = { key: string; value: number };
export type Ga4Data = {
  totals: {
    users: number;
    newUsers: number;
    sessions: number;
    pageviews: number;
    events: number;
    engagementRate: number;
    bounceRate: number;
    avgSessionSeconds: number;
  };
  daily: { date: string; users: number; sessions: number }[];
  pages: Row[];
  landingPages: Row[];
  channels: Row[];
  sourceMedium: Row[];
  countries: Row[];
  devices: Row[];
  newVsReturning: Row[];
  events: Row[];
};
export type Ga4Summary = { configured: false } | { configured: true; ok: false; error: string } | ({ configured: true; ok: true } & Ga4Data);

type Report = { rows?: { dimensionValues?: { value: string }[]; metricValues?: { value: string }[] }[] };

async function runReport(property: string, token: string, body: Record<string, unknown>): Promise<Report> {
  const res = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${property}:runReport`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const detail = await res.json().catch(() => null);
    throw new Error(detail?.error?.message ?? `GA4 request failed (${res.status})`);
  }
  return res.json();
}

const ranked = (r: Report): Row[] =>
  (r.rows ?? []).map((row) => ({
    key: row.dimensionValues?.[0]?.value ?? "(unknown)",
    value: Number(row.metricValues?.[0]?.value ?? 0),
  }));

export async function getGa4Summary(from: string, to: string): Promise<Ga4Summary> {
  const property = process.env.GA4_PROPERTY_ID?.trim();
  if (!property || !/^\d+$/.test(property)) return { configured: false };

  try {
    const token = await getAccessToken(SCOPE);
    const dateRanges = [{ startDate: from, endDate: to }];
    const top = (dimension: string, metric: string, limit = 10) =>
      runReport(property, token, {
        dateRanges,
        dimensions: [{ name: dimension }],
        metrics: [{ name: metric }],
        orderBys: [{ metric: { metricName: metric }, desc: true }],
        limit,
      });

    const [totals, daily, pages, landing, channels, sourceMedium, countries, devices, nvr, events] = await Promise.all([
      runReport(property, token, {
        dateRanges,
        metrics: [
          { name: "activeUsers" },
          { name: "newUsers" },
          { name: "sessions" },
          { name: "screenPageViews" },
          { name: "eventCount" },
          { name: "engagementRate" },
          { name: "bounceRate" },
          { name: "averageSessionDuration" },
        ],
      }),
      runReport(property, token, {
        dateRanges,
        dimensions: [{ name: "date" }],
        metrics: [{ name: "activeUsers" }, { name: "sessions" }],
        orderBys: [{ dimension: { dimensionName: "date" } }],
        limit: 400,
      }),
      top("pagePath", "screenPageViews"),
      top("landingPage", "sessions"),
      top("sessionDefaultChannelGroup", "sessions", 8),
      top("sessionSourceMedium", "sessions"),
      top("country", "activeUsers"),
      top("deviceCategory", "activeUsers", 5),
      top("newVsReturning", "activeUsers", 3),
      top("eventName", "eventCount", 12),
    ]);

    const t = totals.rows?.[0]?.metricValues ?? [];
    const v = (i: number) => Number(t[i]?.value ?? 0);
    return {
      configured: true,
      ok: true,
      totals: {
        users: v(0),
        newUsers: v(1),
        sessions: v(2),
        pageviews: v(3),
        events: v(4),
        engagementRate: v(5),
        bounceRate: v(6),
        avgSessionSeconds: Math.round(v(7)),
      },
      daily: (daily.rows ?? []).map((r) => {
        const d = r.dimensionValues?.[0]?.value ?? "";
        return {
          date: `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}`,
          users: Number(r.metricValues?.[0]?.value ?? 0),
          sessions: Number(r.metricValues?.[1]?.value ?? 0),
        };
      }),
      pages: ranked(pages),
      landingPages: ranked(landing),
      channels: ranked(channels),
      sourceMedium: ranked(sourceMedium),
      countries: ranked(countries),
      devices: ranked(devices),
      newVsReturning: ranked(nvr),
      events: ranked(events),
    };
  } catch (error) {
    return { configured: true, ok: false, error: error instanceof Error ? error.message : "GA4 request failed" };
  }
}
