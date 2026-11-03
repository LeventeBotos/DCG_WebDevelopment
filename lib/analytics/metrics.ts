import { n, type Counters } from "./aggregate";
import { VITALS, type VitalName } from "./vocab";

/** Derived KPIs from raw counters. Pure functions so the same code serves current and previous periods. */

const ratio = (a: number, b: number) => (b > 0 ? a / b : 0);

export function computeMetrics(c: Counters) {
  const pageviews = n(c, "ev_pageview");
  const visitors = n(c, "uv_total");
  const engagedVisits = n(c, "eng_visits");
  const applySuccess = n(c, "ev_apply_success");
  const contactSuccess = n(c, "ev_contact_success");
  return {
    pageviews,
    visitors,
    pagesPerVisit: ratio(pageviews, visitors),
    bounceRate: visitors > 0 ? Math.max(0, Math.min(1, 1 - engagedVisits / visitors)) : 0,
    avgEngagedSeconds: ratio(n(c, "time_s"), n(c, "time_n")),
    avgVisitSeconds: ratio(n(c, "time_s"), visitors),
    jobViews: n(c, "ev_job_view"),
    applyOpens: n(c, "ev_apply_open"),
    applyStarts: n(c, "ev_apply_start"),
    applySubmits: n(c, "ev_apply_submit"),
    applySuccess,
    applyErrors: n(c, "ev_apply_error"),
    contactStarts: n(c, "ev_contact_start"),
    contactSubmits: n(c, "ev_contact_submit"),
    contactSuccess,
    contactErrors: n(c, "ev_contact_error"),
    applyRate: ratio(applySuccess, visitors),
    contactRate: ratio(contactSuccess, visitors),
    jsErrors: n(c, "ev_js_error"),
    notFound: n(c, "ev_not_found"),
    clicks: {
      cta: n(c, "ev_cta_click"),
      nav: n(c, "ev_nav_click"),
      outbound: n(c, "ev_outbound_click"),
      email: n(c, "ev_email_click"),
      phone: n(c, "ev_phone_click"),
      social: n(c, "ev_social_click"),
    },
    scroll: {
      d25: ratio(n(c, "sd_25"), pageviews),
      d50: ratio(n(c, "sd_50"), pageviews),
      d75: ratio(n(c, "sd_75"), pageviews),
      d100: ratio(n(c, "sd_100"), pageviews),
    },
  };
}
export type Metrics = ReturnType<typeof computeMetrics>;

export function vitalSummary(c: Counters, name: VitalName) {
  const good = n(c, `vit_${name}_good`);
  const ni = n(c, `vit_${name}_ni`);
  const poor = n(c, `vit_${name}_poor`);
  const total = good + ni + poor;
  return {
    name,
    label: VITALS[name].label,
    unit: VITALS[name].unit,
    samples: n(c, `vit_${name}_n`),
    avg: ratio(n(c, `vit_${name}_sum`), n(c, `vit_${name}_n`)),
    good: ratio(good, total),
    ni: ratio(ni, total),
    poor: ratio(poor, total),
  };
}

/** Percentage change vs the previous period; null when there is nothing to compare to. */
export function delta(current: number, previous: number): number | null {
  if (previous === 0) return current === 0 ? 0 : null;
  return (current - previous) / previous;
}

export const fmtInt = (v: number) => Math.round(v).toLocaleString("en-GB");
export const fmtPct = (v: number, digits = 1) => `${(v * 100).toFixed(digits)}%`;
export const fmtDuration = (s: number) => {
  const sec = Math.round(s);
  return sec >= 60 ? `${Math.floor(sec / 60)}m ${sec % 60}s` : `${sec}s`;
};

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export function weekdayTotals(perDay: Record<string, Counters>, field = "ev_pageview") {
  const totals = new Array(7).fill(0);
  for (const [day, c] of Object.entries(perDay)) totals[new Date(`${day}T00:00:00Z`).getUTCDay()] += c[field] ?? 0;
  return [1, 2, 3, 4, 5, 6, 0].map((i) => ({ key: WEEKDAYS[i], value: totals[i] }));
}

export function hourTotals(c: Counters) {
  return Array.from({ length: 24 }, (_, h) => ({ key: String(h).padStart(2, "0"), value: n(c, `hr_${String(h).padStart(2, "0")}`) }));
}
