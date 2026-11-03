import Link from "next/link";
import { n, rank } from "@/lib/analytics/aggregate";
import { buildInsights } from "@/lib/analytics/insights";
import { fmtDuration, fmtInt, fmtPct, hourTotals, vitalSummary, weekdayTotals } from "@/lib/analytics/metrics";
import { pageLabel, VITALS, type VitalName } from "@/lib/analytics/vocab";
import { ColumnChart, Donut, RankedBars, TrafficChart } from "@/components/admin/AnalyticsCharts";
import { countryName, DataTable, flag, FunnelSteps, KpiCard, Panel, ShareBar, StackedBar } from "./ui";
import type { Ctx, GaCtx } from "./ctx";

const seriesOf = (ctx: Ctx, field: string) => ctx.range.days.map((d) => ctx.perDay[d]?.[field] ?? 0);
const cap = (s: string) => (s ? s[0].toUpperCase() + s.slice(1) : s);

// ───────────────────────── Overview ─────────────────────────
export function OverviewTab({ ctx }: { ctx: Ctx }) {
  const { cur, prev, total, business } = ctx;
  const insights = buildInsights(cur, prev, total);
  const trend = ctx.range.days.map((d) => ({
    date: d,
    visitors: ctx.perDay[d]?.uv_total ?? 0,
    pageviews: ctx.perDay[d]?.ev_pageview ?? 0,
    applications: business.applications.perDay[d] ?? 0,
  }));
  const pages = rank(total, "pv_", { exclude: ["other"], limit: 8 });
  const channels = rank(total, "uvrefcat_");
  const countries = rank(total, "uvcty_", { limit: 8 });

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Unique visitors" value={fmtInt(cur.visitors)} current={cur.visitors} previous={prev.visitors} spark={seriesOf(ctx, "uv_total")} hint="Counted per day" />
        <KpiCard label="Pageviews" value={fmtInt(cur.pageviews)} current={cur.pageviews} previous={prev.pageviews} spark={seriesOf(ctx, "ev_pageview")} />
        <KpiCard label="Pages per visit" value={cur.pagesPerVisit.toFixed(2)} current={cur.pagesPerVisit} previous={prev.pagesPerVisit} />
        <KpiCard label="Bounce rate" value={fmtPct(cur.bounceRate, 0)} current={cur.bounceRate} previous={prev.bounceRate} invert hint="Single-page visits" />
        <KpiCard label="Avg time on page" value={fmtDuration(cur.avgEngagedSeconds)} current={cur.avgEngagedSeconds} previous={prev.avgEngagedSeconds} hint="Tab in foreground" />
        <KpiCard label="Applications" value={fmtInt(business.applications.total)} current={business.applications.total} previous={business.applications.prevTotal} hint="From the database" />
        <KpiCard label="Contact enquiries" value={fmtInt(business.messages.total)} current={business.messages.total} previous={business.messages.prevTotal} hint="From the database" />
        <KpiCard label="Visit → application" value={fmtPct(cur.applyRate, 2)} current={cur.applyRate} previous={prev.applyRate} hint="Completed applications / visitors" />
      </div>

      <Panel title="Highlights" description="Plain-language takeaways for this period.">
        <ul className="space-y-2 text-sm">
          {insights.map((i, k) => (
            <li key={k} className="flex gap-2">
              <span aria-hidden className={`mt-1.5 size-2 shrink-0 rounded-full ${i.tone === "good" ? "bg-emerald-500" : i.tone === "warn" ? "bg-amber-500" : "bg-sky-500"}`} />
              <span>{i.text}</span>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel title="Traffic and applications">
        <TrafficChart
          data={trend}
          series={[
            { key: "visitors", label: "Visitors", color: "#0A4C8A" },
            { key: "pageviews", label: "Pageviews", color: "#7C3AED" },
            { key: "applications", label: "Applications", color: "#00CACA" },
          ]}
        />
      </Panel>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Top pages">
          <DataTable
            head={["Page", "Views", "Share"]}
            rows={pages.map((p) => [pageLabel(p.key), fmtInt(p.value), <ShareBar key={p.key} value={p.value} total={cur.pageviews} />])}
          />
        </Panel>
        <Panel title="Channels" description="Unique visitors by where they came from.">
          <Donut label="Visitors by channel" data={channels} />
        </Panel>
      </div>

      <Panel title="Top countries">
        <DataTable
          head={["Country", "Visitors", "Share"]}
          rows={countries.map((c) => [`${flag(c.key)} ${countryName(c.key)}`, fmtInt(c.value), <ShareBar key={c.key} value={c.value} total={cur.visitors} />])}
        />
      </Panel>
    </div>
  );
}

// ───────────────────────── Audience ─────────────────────────
export function AudienceTab({ ctx }: { ctx: Ctx }) {
  const { total, perDay, cur } = ctx;
  const countries = rank(total, "cty_", { limit: 15 });
  const langs = rank(total, "lang_", { limit: 8 });
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        <Panel title="Devices"><Donut label="Devices" data={rank(total, "uvdev_")} /></Panel>
        <Panel title="Browsers"><Donut label="Browsers" data={rank(total, "br_")} /></Panel>
        <Panel title="Operating systems"><Donut label="Operating systems" data={rank(total, "os_")} /></Panel>
      </div>
      <Panel title="Countries" description="Based on Cloudflare's country header; no IP is stored.">
        <DataTable
          head={["Country", "Visitors", "Pageviews", "Share of visitors"]}
          rows={countries.map((c) => [
            `${flag(c.key)} ${countryName(c.key)}`,
            fmtInt(n(total, `uvcty_${c.key}`)),
            fmtInt(c.value),
            <ShareBar key={c.key} value={n(total, `uvcty_${c.key}`)} total={cur.visitors} />,
          ])}
        />
      </Panel>
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Browser language"><RankedBars label="Languages" data={langs.map((l) => ({ ...l, key: l.key.toUpperCase() }))} /></Panel>
        <Panel title="Screen size" description="xs <640 · sm <1024 · md <1440 · lg <1920 · xl ≥1920 px"><RankedBars label="Screen sizes" data={rank(total, "scr_")} /></Panel>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Busiest hours (UTC)"><ColumnChart label="Pageviews by hour (UTC)" data={hourTotals(total)} /></Panel>
        <Panel title="Busiest weekdays"><ColumnChart label="Pageviews by weekday" data={weekdayTotals(perDay)} color="#00CACA" /></Panel>
      </div>
    </div>
  );
}

// ───────────────────────── Acquisition ─────────────────────────
export function AcquisitionTab({ ctx }: { ctx: Ctx }) {
  const { total, cur } = ctx;
  const campaigns = rank(total, "uvcmp_").filter((c) => c.key !== "other");
  const entries = rank(total, "entry_", { limit: 10 });
  const ai = n(total, "uvrefcat_ai");
  return (
    <div className="space-y-6">
      {ai > 0 ? (
        <p className="rounded-lg border border-emerald-300/60 bg-emerald-50 px-4 py-3 text-sm text-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200">
          {ai} visitor{ai === 1 ? "" : "s"} came from AI assistants this period (ChatGPT, Perplexity, Claude, Gemini, Copilot).
        </p>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Channels" description="Unique visitors and how many applied or enquired.">
          <DataTable
            head={["Channel", "Visitors", "Applications", "Enquiries"]}
            rows={rank(total, "uvrefcat_").map((c) => [
              cap(c.key),
              fmtInt(c.value),
              fmtInt(n(total, `conv_apply_success_cat_${c.key}`)),
              fmtInt(n(total, `conv_contact_success_cat_${c.key}`)),
            ])}
          />
        </Panel>
        <Panel title="Referring sites"><RankedBars label="Referrers" data={rank(total, "uvref_", { exclude: ["direct"], limit: 10 })} /></Panel>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="UTM source"><RankedBars label="UTM sources" data={rank(total, "uvsrc_", { limit: 10 })} /></Panel>
        <Panel title="UTM medium"><RankedBars label="UTM mediums" data={rank(total, "uvmed_", { limit: 10 })} color="#00CACA" /></Panel>
      </div>

      <Panel title="Campaigns" description="Only campaigns listed in Settings are tracked by name; everything else is grouped as “other”.">
        {campaigns.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No named campaign traffic yet. Add campaign names in{" "}
            <Link href="/admin/settings" className="underline">Settings</Link>, then tag links with <code>?utm_campaign=name</code>.
            {n(total, "uvcmp_other") > 0 ? ` ${n(total, "uvcmp_other")} visitor(s) arrived with an unlisted campaign.` : ""}
          </p>
        ) : (
          <DataTable
            head={["Campaign", "Visitors", "Applications", "Enquiries", "Conversion"]}
            rows={campaigns.map((c) => {
              const conv = n(total, `conv_apply_success_cmp_${c.key}`) + n(total, `conv_contact_success_cmp_${c.key}`);
              return [c.key.replace(/_/g, " "), fmtInt(c.value), fmtInt(n(total, `conv_apply_success_cmp_${c.key}`)), fmtInt(n(total, `conv_contact_success_cmp_${c.key}`)), fmtPct(c.value ? conv / c.value : 0)];
            })}
          />
        )}
      </Panel>

      <Panel title="Landing pages" description="The first page a visitor sees, and what those visitors went on to do.">
        <DataTable
          head={["Landing page", "Visitors", "Share", "Applications", "Enquiries"]}
          rows={entries.map((e) => [
            pageLabel(e.key),
            fmtInt(e.value),
            <ShareBar key={e.key} value={e.value} total={cur.visitors} />,
            fmtInt(n(total, `conv_apply_success_entry_${e.key}`)),
            fmtInt(n(total, `conv_contact_success_entry_${e.key}`)),
          ])}
        />
      </Panel>
    </div>
  );
}

// ───────────────────────── Behaviour ─────────────────────────
export function BehaviourTab({ ctx }: { ctx: Ctx }) {
  const { total, cur } = ctx;
  const pages = rank(total, "pv_", { exclude: ["other"], limit: 20 });
  const clicks = [
    ["Call-to-action buttons", cur.clicks.cta],
    ["Navigation links", cur.clicks.nav],
    ["Email links", cur.clicks.email],
    ["Phone links", cur.clicks.phone],
    ["Social links", cur.clicks.social],
    ["Outbound links", cur.clicks.outbound],
  ] as const;
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="How far people scroll" description="Share of pageviews that reached each depth.">
          <FunnelSteps
            steps={[
              { label: "Page load", value: cur.pageviews },
              { label: "25% down", value: n(total, "sd_25") },
              { label: "50% down", value: n(total, "sd_50") },
              { label: "75% down", value: n(total, "sd_75") },
              { label: "Reached the bottom", value: n(total, "sd_100") },
            ]}
          />
        </Panel>
        <Panel title="Clicks">
          <DataTable head={["Type", "Clicks"]} rows={clicks.map(([label, v]) => [label, fmtInt(v)])} />
        </Panel>
      </div>
      <Panel title="Pages">
        <DataTable
          head={["Page", "Views", "Landed here", "Avg time", "Scrolled 50%", "Reached end", "CTA clicks", "JS errors"]}
          rows={pages.map((p) => {
            const samples = n(total, `tp_${p.key}_n`);
            return [
              pageLabel(p.key),
              fmtInt(p.value),
              fmtInt(n(total, `entry_${p.key}`)),
              samples ? fmtDuration(n(total, `tp_${p.key}_s`) / samples) : "—",
              p.value ? fmtPct(n(total, `sdp_${p.key}_50`) / p.value, 0) : "—",
              p.value ? fmtPct(n(total, `sdp_${p.key}_100`) / p.value, 0) : "—",
              fmtInt(n(total, `clk_${p.key}`)),
              fmtInt(n(total, `errp_${p.key}`)),
            ];
          })}
        />
      </Panel>
    </div>
  );
}

// ───────────────────────── Careers & enquiries ─────────────────────────
export function CareersTab({ ctx }: { ctx: Ctx }) {
  const { cur, total, business, range } = ctx;
  const a = business.applications;
  const m = business.messages;
  const jobIds = new Set<string>();
  for (const k of Object.keys(total)) {
    const hit = /^job_(.+)_(job_view|apply_open|apply_start|apply_submit|apply_success|apply_error)$/.exec(k);
    if (hit) jobIds.add(hit[1]);
  }
  const jobs = [...jobIds].map((key) => {
    const g = (e: string) => n(total, `job_${key}_${e}`);
    return { id: key.replace(/_/g, "-"), views: g("job_view"), opens: g("apply_open"), starts: g("apply_start"), submits: g("apply_submit"), done: g("apply_success"), errors: g("apply_error") };
  }).sort((x, y) => y.views - x.views);
  const appSeries = range.days.map((d) => ({ date: d, applications: a.perDay[d] ?? 0, enquiries: m.perDay[d] ?? 0 }));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Applications" value={fmtInt(a.total)} current={a.total} previous={a.prevTotal} />
        <KpiCard label="Awaiting review" value={fmtInt(a.awaitingReview)} hint={a.oldestWaitingDays !== null ? `Oldest waiting ${Math.floor(a.oldestWaitingDays)} days` : "Nothing waiting"} />
        <KpiCard label="Median time to first action" value={a.medianHoursToFirstAction === null ? "—" : a.medianHoursToFirstAction < 48 ? `${a.medianHoursToFirstAction.toFixed(1)} h` : `${(a.medianHoursToFirstAction / 24).toFixed(1)} d`} hint="Submission → first status change" />
        <KpiCard label="Applications per 1,000 visitors" value={cur.visitors ? ((a.total / cur.visitors) * 1000).toFixed(1) : "—"} hint={a.total ? `${fmtPct(a.withCv / a.total, 0)} attached a CV file` : undefined} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Application funnel" description="Everyone who got as far as each step (cookieless counts).">
          <FunnelSteps
            steps={[
              { label: "Viewed a job page", value: cur.jobViews },
              { label: "Opened the apply form", value: cur.applyOpens },
              { label: "Started filling it in", value: cur.applyStarts },
              { label: "Submitted", value: cur.applySubmits },
              { label: "Completed successfully", value: cur.applySuccess },
            ]}
          />
          {cur.applyErrors > 0 ? <p className="mt-3 text-xs text-amber-600">{cur.applyErrors} submission error{cur.applyErrors === 1 ? "" : "s"} recorded.</p> : null}
        </Panel>
        <Panel title="Contact funnel">
          <FunnelSteps
            steps={[
              { label: "Visited the contact page", value: n(total, "pv_contact") },
              { label: "Started the form", value: cur.contactStarts },
              { label: "Submitted", value: cur.contactSubmits },
              { label: "Delivered", value: cur.contactSuccess },
            ]}
          />
          {cur.contactErrors > 0 ? <p className="mt-3 text-xs text-amber-600">{cur.contactErrors} delivery error{cur.contactErrors === 1 ? "" : "s"} recorded.</p> : null}
        </Panel>
      </div>

      <Panel title="Roles">
        <DataTable
          head={["Role", "Views", "Apply opened", "Started", "Submitted", "Completed", "View → apply", "Errors"]}
          rows={jobs.map((j) => [
            ctx.jobTitles[j.id] ?? j.id,
            fmtInt(j.views), fmtInt(j.opens), fmtInt(j.starts), fmtInt(j.submits), fmtInt(j.done),
            j.views ? fmtPct(j.done / j.views) : "—",
            fmtInt(j.errors),
          ])}
          empty="No role activity recorded in this period."
        />
      </Panel>

      <Panel title="Applications and enquiries per day">
        <TrafficChart
          data={appSeries}
          series={[
            { key: "applications", label: "Applications", color: "#0A4C8A" },
            { key: "enquiries", label: "Enquiries", color: "#00CACA" },
          ]}
          height={220}
        />
      </Panel>

      <div className="grid gap-6 lg:grid-cols-3">
        <Panel title="Pipeline status"><Donut label="Applications by status" data={a.byStatus} /></Panel>
        <Panel title="Applications by role"><RankedBars label="Applications by role" data={a.byJob.slice(0, 8)} /></Panel>
        <Panel title="Applications by source"><RankedBars label="Applications by source" data={a.bySource.slice(0, 8)} color="#00CACA" /></Panel>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Panel title="Candidate experience"><RankedBars label="Experience" data={a.byExperience} /></Panel>
        <Panel title="Enquiry topics"><RankedBars label="Enquiry topics" data={m.byTopic.slice(0, 8)} /></Panel>
        <Panel title="Enquiry countries"><RankedBars label="Enquiry countries" data={m.byCountry.slice(0, 8)} color="#00CACA" /></Panel>
      </div>
    </div>
  );
}

// ───────────────────────── Performance ─────────────────────────
export function PerformanceTab({ ctx }: { ctx: Ctx }) {
  const { total, cur } = ctx;
  const vitals = (Object.keys(VITALS) as VitalName[]).map((v) => vitalSummary(total, v));
  const lcpPages = rank(total, "vitp_", { limit: 200 })
    .map((r) => r.key)
    .filter((k) => k.endsWith("_lcp_n"))
    .map((k) => k.replace(/_lcp_n$/, ""))
    .map((p) => ({ page: p, samples: n(total, `vitp_${p}_lcp_n`), avg: n(total, `vitp_${p}_lcp_sum`) / Math.max(1, n(total, `vitp_${p}_lcp_n`)) }))
    .sort((a, b) => b.avg - a.avg)
    .slice(0, 12);
  const errorPages = rank(total, "errp_", { limit: 10 });
  const fmtVital = (name: VitalName, v: number) => (name === "cls" ? (v / 1000).toFixed(3) : `${Math.round(v)} ms`);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {vitals.map((v) => (
          <div key={v.name} className="rounded-xl border bg-card p-4">
            <p className="text-xs text-muted-foreground">{v.label}</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums">{v.samples ? fmtVital(v.name, v.avg) : "—"}</p>
            <div className="mt-3"><StackedBar good={v.good} ni={v.ni} poor={v.poor} /></div>
            <p className="mt-2 text-xs text-muted-foreground">
              {v.samples ? `${fmtPct(v.good, 0)} good · ${fmtPct(v.poor, 0)} poor · ${v.samples} samples` : "No samples yet"}
            </p>
          </div>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Slowest pages (average LCP)">
          <DataTable head={["Page", "Avg LCP", "Samples"]} rows={lcpPages.map((p) => [pageLabel(p.page), `${Math.round(p.avg)} ms`, fmtInt(p.samples)])} />
        </Panel>
        <Panel title="Errors">
          <div className="mb-3 grid grid-cols-2 gap-3 text-center">
            <div className="rounded-lg border p-3"><p className="text-xs text-muted-foreground">JavaScript errors</p><p className="text-2xl font-semibold">{fmtInt(cur.jsErrors)}</p></div>
            <div className="rounded-lg border p-3"><p className="text-xs text-muted-foreground">404 pages hit</p><p className="text-2xl font-semibold">{fmtInt(cur.notFound)}</p></div>
          </div>
          <DataTable head={["Page", "JS errors"]} rows={errorPages.map((p) => [pageLabel(p.key), fmtInt(p.value)])} empty="No JavaScript errors recorded." />
        </Panel>
      </div>
    </div>
  );
}

// ───────────────────────── Google Analytics ─────────────────────────
export function GaTab({ g, ctx }: { g: GaCtx; ctx: Ctx }) {
  const ga = g.ga4;
  if (!ga.configured) {
    return (
      <Panel title="Connect Google Analytics" description="Adds consent-based GA4 data next to the cookieless numbers.">
        <ol className="list-decimal space-y-2 pl-5 text-sm">
          <li>
            Enable the <strong>Google Analytics Data API</strong> and <strong>Admin API</strong> for the Cloud project{" "}
            (<a className="underline" href="https://console.developers.google.com/apis/api/analyticsdata.googleapis.com/overview?project=791574804700" target="_blank" rel="noreferrer">Data API</a>,{" "}
            <a className="underline" href="https://console.developers.google.com/apis/api/analyticsadmin.googleapis.com/overview?project=791574804700" target="_blank" rel="noreferrer">Admin API</a>).
          </li>
          <li>
            In GA4 → Admin → <em>Property access management</em>, add <code className="rounded bg-muted px-1">{g.serviceAccount}</code> with the <strong>Viewer</strong> role.
          </li>
          <li>
            Copy the numeric <em>Property ID</em> (GA4 → Admin → Property details) into the <code>GA4_PROPERTY_ID</code> environment variable (Cloudflare Pages and <code>.env.local</code>).
          </li>
        </ol>
        <p className="mt-3 text-xs text-muted-foreground">{g.propertyHint}</p>
      </Panel>
    );
  }
  if (!ga.ok) return <p className="text-sm text-destructive">GA4 request failed: {ga.error}</p>;

  return (
    <div className="space-y-6">
      <p className="text-xs text-muted-foreground">Google Analytics only counts visitors who accepted cookies, so it undercounts. Compare with the cookieless numbers on the other tabs.</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Users" value={fmtInt(ga.totals.users)} hint={`${fmtInt(ga.totals.newUsers)} new`} />
        <KpiCard label="Sessions" value={fmtInt(ga.totals.sessions)} />
        <KpiCard label="Engagement rate" value={fmtPct(ga.totals.engagementRate, 0)} hint={`Bounce ${fmtPct(ga.totals.bounceRate, 0)}`} />
        <KpiCard label="Avg session" value={fmtDuration(ga.totals.avgSessionSeconds)} />
      </div>
      <Panel title="Users and sessions per day">
        <TrafficChart
          data={ga.daily.map((d) => ({ date: d.date, users: d.users, sessions: d.sessions }))}
          series={[{ key: "users", label: "Users", color: "#0A4C8A" }, { key: "sessions", label: "Sessions", color: "#00CACA" }]}
        />
      </Panel>
      <div className="grid gap-6 md:grid-cols-2">
        <Panel title="Top pages"><RankedBars label="GA4 pages" data={ga.pages} /></Panel>
        <Panel title="Landing pages"><RankedBars label="GA4 landing pages" data={ga.landingPages} color="#00CACA" /></Panel>
        <Panel title="Channels"><Donut label="GA4 channels" data={ga.channels} /></Panel>
        <Panel title="Source / medium"><RankedBars label="GA4 source medium" data={ga.sourceMedium} /></Panel>
        <Panel title="Countries"><RankedBars label="GA4 countries" data={ga.countries} /></Panel>
        <Panel title="Devices and new vs returning">
          <div className="space-y-4"><Donut label="GA4 devices" data={ga.devices} /><Donut label="New vs returning" data={ga.newVsReturning} /></div>
        </Panel>
      </div>
      <Panel title="Top events"><RankedBars label="GA4 events" data={ga.events} /></Panel>
      <p className="text-xs text-muted-foreground">{ctx.range.label}</p>
    </div>
  );
}
