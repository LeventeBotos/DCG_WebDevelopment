import { queryDocs } from "@/lib/firestore/rest";

/** Reads the daily counter documents written by /api/collect and shapes them for the dashboard. */

type DailyDoc = { id: string } & Record<string, unknown>;

export type Ranked = { key: string; value: number }[];

export type JobFunnel = { id: string; views: number; opens: number; submits: number; successes: number; errors: number };

export type AnalyticsSummary = {
  days: number;
  series: { date: string; pageviews: number; applications: number }[];
  totals: { pageviews: number; jobViews: number; applyOpens: number; applySubmits: number; applySuccesses: number; contactSubmits: number };
  previous: { pageviews: number; applySuccesses: number };
  pages: Ranked;
  referrers: Ranked;
  campaigns: Ranked;
  countries: Ranked;
  devices: Ranked;
  jobs: JobFunnel[];
};

const num = (v: unknown) => (typeof v === "number" ? v : 0);

function sumPrefix(docs: DailyDoc[], prefix: string): Ranked {
  const totals = new Map<string, number>();
  for (const d of docs) {
    for (const [field, value] of Object.entries(d)) {
      if (field.startsWith(prefix) && typeof value === "number") {
        const key = field.slice(prefix.length);
        totals.set(key, (totals.get(key) ?? 0) + value);
      }
    }
  }
  return [...totals.entries()].map(([key, value]) => ({ key, value })).sort((a, b) => b.value - a.value);
}

const sumField = (docs: DailyDoc[], field: string) => docs.reduce((n, d) => n + num(d[field]), 0);

export async function getAnalyticsSummary(days: number): Promise<AnalyticsSummary> {
  // Fetch the current and the previous period in one query, newest first (document ids are ISO dates).
  // One document per day, so a few hundred at most. Sorted in memory because ordering by document id
  // descending would need a custom Firestore index.
  const docs = ((await queryDocs<Record<string, unknown>>("analyticsDaily", { limit: 1000 })) as DailyDoc[])
    .sort((a, b) => b.id.localeCompare(a.id))
    .slice(0, days * 2);

  const cutoff = new Date(Date.now() - days * 86_400_000).toISOString().slice(0, 10);
  const current = docs.filter((d) => d.id > cutoff);
  const previous = docs.filter((d) => d.id <= cutoff);

  const byDate = new Map(current.map((d) => [d.id, d]));
  const series: AnalyticsSummary["series"] = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(Date.now() - i * 86_400_000).toISOString().slice(0, 10);
    const d = byDate.get(date);
    series.push({ date, pageviews: num(d?.ev_pageview), applications: num(d?.ev_apply_success) });
  }

  // Per-job funnel: counters are named job_<id with underscores>_<event>.
  const funnel = new Map<string, JobFunnel>();
  for (const d of current) {
    for (const [field, value] of Object.entries(d)) {
      const m = /^job_(.+)_(job_view|apply_open|apply_submit|apply_success|apply_error)$/.exec(field);
      if (!m || typeof value !== "number") continue;
      const id = m[1].replace(/_/g, "-");
      const row = funnel.get(id) ?? { id, views: 0, opens: 0, submits: 0, successes: 0, errors: 0 };
      if (m[2] === "job_view") row.views += value;
      if (m[2] === "apply_open") row.opens += value;
      if (m[2] === "apply_submit") row.submits += value;
      if (m[2] === "apply_success") row.successes += value;
      if (m[2] === "apply_error") row.errors += value;
      funnel.set(id, row);
    }
  }

  return {
    days,
    series,
    totals: {
      pageviews: sumField(current, "ev_pageview"),
      jobViews: sumField(current, "ev_job_view"),
      applyOpens: sumField(current, "ev_apply_open"),
      applySubmits: sumField(current, "ev_apply_submit"),
      applySuccesses: sumField(current, "ev_apply_success"),
      contactSubmits: sumField(current, "ev_contact_submit"),
    },
    previous: { pageviews: sumField(previous, "ev_pageview"), applySuccesses: sumField(previous, "ev_apply_success") },
    pages: sumPrefix(current, "pv_"),
    referrers: sumPrefix(current, "ref_"),
    campaigns: sumPrefix(current, "utm_"),
    countries: sumPrefix(current, "cty_"),
    devices: sumPrefix(current, "dev_"),
    jobs: [...funnel.values()].sort((a, b) => b.views - a.views),
  };
}
