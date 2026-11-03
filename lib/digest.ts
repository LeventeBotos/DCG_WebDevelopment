import { loadRange, n, rank, resolveRange } from "@/lib/analytics/aggregate";
import { loadBusinessStats } from "@/lib/analytics/business";
import { buildInsights } from "@/lib/analytics/insights";
import { computeMetrics, delta, fmtDuration, fmtInt, fmtPct } from "@/lib/analytics/metrics";
import { pageLabel } from "@/lib/analytics/vocab";
import { adminUrl, button, emailShell, escapeHtml } from "@/lib/email";
import { listAllJobs } from "@/lib/jobs/server";

const arrow = (cur: number, prev: number) => {
  const d = delta(cur, prev);
  if (d === null) return "new";
  if (Math.abs(d) < 0.005) return "no change";
  return `${d > 0 ? "▲" : "▼"} ${Math.abs(Math.round(d * 100))}%`;
};

/** Builds the weekly summary email (last 7 days vs the 7 before). */
export async function buildDigest(): Promise<{ subject: string; html: string; text: string }> {
  const range = resolveRange({ range: "7d" });
  const [loaded, business, jobs] = await Promise.all([loadRange(range), loadBusinessStats(range), listAllJobs().catch(() => [])]);
  const cur = computeMetrics(loaded.total);
  const prev = computeMetrics(loaded.prevTotal);
  const insights = buildInsights(cur, prev, loaded.total);

  const closingSoon = jobs.filter((j) => {
    if (j.status !== "published" || !j.closesAt) return false;
    const days = (Date.parse(j.closesAt) - Date.now()) / 86_400_000;
    return days >= -1 && days <= 14;
  });

  const rows = (items: [string, string][]) =>
    items.map(([k, v]) => `<tr><td style="padding:5px 0;color:#64748b;">${escapeHtml(k)}</td><td style="padding:5px 0;text-align:right;font-weight:600;">${escapeHtml(v)}</td></tr>`).join("");
  const section = (title: string, inner: string) =>
    `<div style="margin-top:22px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#64748b;">${escapeHtml(title)}</div><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:6px;font-size:14px;">${inner}</table>`;

  const a = business.applications;
  const topPages = rank(loaded.total, "pv_", { exclude: ["other"], limit: 5 });
  const topSources = rank(loaded.total, "uvref_", { exclude: ["direct"], limit: 5 });

  const html = emailShell(
    "Your week at a glance",
    [
      `<p style="margin:0;color:#64748b;">${range.from} → ${range.to}, compared with the previous 7 days.</p>`,
      section("Hiring", rows([
        ["New applications", `${a.total} (${arrow(a.total, a.prevTotal)})`],
        ["Waiting for review", `${a.awaitingReview}${a.oldestWaitingDays !== null ? ` · oldest ${Math.floor(a.oldestWaitingDays)} days` : ""}`],
        ["Contact enquiries", `${business.messages.total} (${arrow(business.messages.total, business.messages.prevTotal)})`],
        ...(closingSoon.length ? ([["Closing within 14 days", closingSoon.map((j) => j.title).join(", ")]] as [string, string][]) : []),
      ])),
      section("Website", rows([
        ["Unique visitors", `${fmtInt(cur.visitors)} (${arrow(cur.visitors, prev.visitors)})`],
        ["Pageviews", `${fmtInt(cur.pageviews)} (${arrow(cur.pageviews, prev.pageviews)})`],
        ["Pages per visit", cur.pagesPerVisit.toFixed(2)],
        ["Bounce rate", fmtPct(cur.bounceRate, 0)],
        ["Avg time on page", fmtDuration(cur.avgEngagedSeconds)],
        ["Visit → application", fmtPct(cur.applyRate, 2)],
      ])),
      section("Top pages", rows(topPages.map((p) => [pageLabel(p.key), fmtInt(p.value)] as [string, string]))),
      section("Top referrers", rows(topSources.length ? topSources.map((s) => [s.key, fmtInt(n(loaded.total, `uvref_${s.key}`))] as [string, string]) : [["Mostly direct traffic", "—"]])),
      insights.length ? `<div style="margin-top:22px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#64748b;">Highlights</div><ul style="margin:6px 0 0;padding-left:18px;">${insights.slice(0, 5).map((i) => `<li style="margin:4px 0;">${escapeHtml(i.text)}</li>`).join("")}</ul>` : "",
      button(adminUrl("/analytics"), "Open the analytics dashboard"),
    ].join(""),
    "DCG weekly digest",
  );

  const text = [
    `DCG weekly digest (${range.from} → ${range.to})`,
    `Applications: ${a.total} (${arrow(a.total, a.prevTotal)}); waiting for review: ${a.awaitingReview}`,
    `Enquiries: ${business.messages.total}`,
    `Visitors: ${cur.visitors} (${arrow(cur.visitors, prev.visitors)}); pageviews: ${cur.pageviews}`,
    ...insights.slice(0, 5).map((i) => `- ${i.text}`),
    adminUrl("/analytics"),
  ].join("\n");

  return { subject: `DCG weekly digest: ${a.total} application${a.total === 1 ? "" : "s"}, ${fmtInt(cur.visitors)} visitors`, html, text };
}
