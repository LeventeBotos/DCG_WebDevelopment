import Link from "next/link";
import { requireAdmin } from "@/lib/auth/require-admin";
import { getAnalyticsSummary, type AnalyticsSummary } from "@/lib/analytics/aggregate";
import { getGa4Summary } from "@/lib/analytics/ga4";
import { listAllJobs } from "@/lib/jobs/server";
import { RankedBars, TrafficChart } from "@/components/admin/AnalyticsCharts";
import PageHeader from "@/components/admin/PageHeader";
import StatCard from "@/components/admin/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const metadata = { title: "Analytics" };

const RANGES = [7, 30, 90] as const;

function delta(current: number, previous: number): string {
  if (previous === 0) return current === 0 ? "No change" : "New";
  const pct = Math.round(((current - previous) / previous) * 100);
  return `${pct >= 0 ? "+" : ""}${pct}% vs previous period`;
}

const pct = (a: number, b: number) => (b === 0 ? "—" : `${Math.round((a / b) * 100)}%`);

export default async function AnalyticsPage({ searchParams }: { searchParams: Promise<{ days?: string }> }) {
  await requireAdmin();
  const { days: daysParam } = await searchParams;
  const days = RANGES.find((r) => String(r) === daysParam) ?? 30;

  const [summary, ga4, jobs] = await Promise.all([
    getAnalyticsSummary(days).catch((e): AnalyticsSummary | null => {
      console.error("[admin/analytics]", e instanceof Error ? e.message : e);
      return null;
    }),
    getGa4Summary(days),
    listAllJobs().catch(() => []),
  ]);
  const titles = new Map(jobs.map((j) => [j.id, j.title]));

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHeader
        title="Analytics"
        description="Cookieless first-party counters, plus Google Analytics for consenting visitors."
        actions={
          <nav aria-label="Date range" className="flex gap-1 text-sm">
            {RANGES.map((r) => (
              <Link
                key={r}
                href={`/admin/analytics?days=${r}`}
                aria-current={r === days ? "page" : undefined}
                className={`rounded-full border px-3 py-1 ${r === days ? "bg-foreground text-background" : "hover:bg-muted"}`}
              >
                {r}d
              </Link>
            ))}
          </nav>
        }
      />

      {!summary ? (
        <p className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
          Could not load first-party analytics. Check the Firestore connection and try again.
        </p>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Pageviews" value={summary.totals.pageviews.toLocaleString()} hint={delta(summary.totals.pageviews, summary.previous.pageviews)} />
            <StatCard label="Job views" value={summary.totals.jobViews.toLocaleString()} hint="Job detail pages" />
            <StatCard label="Applications" value={summary.totals.applySuccesses.toLocaleString()} hint={delta(summary.totals.applySuccesses, summary.previous.applySuccesses)} />
            <StatCard label="Contact enquiries" value={summary.totals.contactSubmits.toLocaleString()} hint="Form submissions" />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Traffic · last {days} days</CardTitle>
            </CardHeader>
            <CardContent>
              <TrafficChart data={summary.series} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Careers funnel</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 grid grid-cols-2 gap-3 text-center sm:grid-cols-4">
                {[
                  ["Job views", summary.totals.jobViews, ""],
                  ["Apply opened", summary.totals.applyOpens, pct(summary.totals.applyOpens, summary.totals.jobViews)],
                  ["Submitted", summary.totals.applySubmits, pct(summary.totals.applySubmits, summary.totals.applyOpens)],
                  ["Completed", summary.totals.applySuccesses, pct(summary.totals.applySuccesses, summary.totals.applySubmits)],
                ].map(([label, value, rate]) => (
                  <div key={String(label)} className="rounded-lg border p-3">
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="text-2xl font-semibold tabular-nums">{Number(value).toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">{rate ? `${rate} of previous step` : " "}</p>
                  </div>
                ))}
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Role</TableHead>
                    <TableHead className="text-right">Views</TableHead>
                    <TableHead className="text-right">Apply opened</TableHead>
                    <TableHead className="text-right">Submitted</TableHead>
                    <TableHead className="text-right">Completed</TableHead>
                    <TableHead className="text-right">Errors</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {summary.jobs.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
                        No role activity recorded yet.
                      </TableCell>
                    </TableRow>
                  ) : (
                    summary.jobs.map((j) => (
                      <TableRow key={j.id}>
                        <TableCell className="font-medium">{titles.get(j.id) ?? j.id}</TableCell>
                        <TableCell className="text-right tabular-nums">{j.views}</TableCell>
                        <TableCell className="text-right tabular-nums">{j.opens}</TableCell>
                        <TableCell className="text-right tabular-nums">{j.submits}</TableCell>
                        <TableCell className="text-right tabular-nums">{j.successes}</TableCell>
                        <TableCell className="text-right tabular-nums">{j.errors}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Top pages</CardTitle>
              </CardHeader>
              <CardContent>
                <RankedBars label="Top pages" data={summary.pages.slice(0, 10).map((p) => ({ ...p, key: p.key === "home" ? "/" : `/${p.key.replace(/_/g, "/")}` }))} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Where visitors come from</CardTitle>
              </CardHeader>
              <CardContent>
                <RankedBars label="Referrers" data={summary.referrers.slice(0, 10)} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Campaigns (utm_source)</CardTitle>
              </CardHeader>
              <CardContent>
                <RankedBars label="Campaign sources" data={summary.campaigns.slice(0, 10)} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Countries and devices</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RankedBars label="Countries" data={summary.countries.slice(0, 8)} />
                <RankedBars label="Devices" data={summary.devices} />
              </CardContent>
            </Card>
          </div>
        </>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Google Analytics (consenting visitors only)</CardTitle>
        </CardHeader>
        <CardContent>
          {!ga4.configured ? (
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Not connected. To show GA4 data here:</p>
              <ol className="list-decimal space-y-1 pl-5">
                <li>Enable the “Google Analytics Data API” in the Google Cloud project for this Firebase project.</li>
                <li>In GA4 → Admin → Property access management, add the service account email as a Viewer.</li>
                <li>Set <code>GA4_PROPERTY_ID</code> (the numeric property id, not the G-… id) in the environment.</li>
              </ol>
            </div>
          ) : !ga4.ok ? (
            <p className="text-sm text-destructive">GA4 request failed: {ga4.error}</p>
          ) : (
            <div className="space-y-6">
              <div className="grid gap-3 sm:grid-cols-4">
                {[
                  ["Users", ga4.totals.users],
                  ["Sessions", ga4.totals.sessions],
                  ["Pageviews", ga4.totals.pageviews],
                  ["Avg. session", `${Math.floor(ga4.totals.avgSessionSeconds / 60)}m ${ga4.totals.avgSessionSeconds % 60}s`],
                ].map(([label, value]) => (
                  <div key={String(label)} className="rounded-lg border p-3">
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="text-xl font-semibold tabular-nums">{typeof value === "number" ? value.toLocaleString() : value}</p>
                  </div>
                ))}
              </div>
              <div className="grid gap-6 md:grid-cols-3">
                <div>
                  <p className="mb-2 text-sm font-medium">Top pages</p>
                  <RankedBars label="GA4 top pages" data={ga4.pages} />
                </div>
                <div>
                  <p className="mb-2 text-sm font-medium">Channels</p>
                  <RankedBars label="GA4 channels" data={ga4.channels} />
                </div>
                <div>
                  <p className="mb-2 text-sm font-medium">Countries</p>
                  <RankedBars label="GA4 countries" data={ga4.countries} />
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
