import Link from "next/link";
import { requireAdmin } from "@/lib/auth/require-admin";
import { loadRange, resolveRange } from "@/lib/analytics/aggregate";
import { loadBusinessStats } from "@/lib/analytics/business";
import { getGa4Summary } from "@/lib/analytics/ga4";
import { computeMetrics } from "@/lib/analytics/metrics";
import { pageLabel } from "@/lib/analytics/vocab";
import { listAllJobs } from "@/lib/jobs/server";
import PageHeader from "@/components/admin/PageHeader";
import RealtimePanel from "@/components/admin/analytics/RealtimePanel";
import { AcquisitionTab, AudienceTab, BehaviourTab, CareersTab, GaTab, OverviewTab, PerformanceTab } from "@/components/admin/analytics/tabs";
import { countryName, TabLink } from "@/components/admin/analytics/ui";
import type { Ctx } from "@/components/admin/analytics/ctx";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Analytics" };

const TABS = [
  ["overview", "Overview"],
  ["audience", "Audience"],
  ["acquisition", "Acquisition"],
  ["behaviour", "Behaviour"],
  ["careers", "Careers & enquiries"],
  ["performance", "Performance"],
  ["realtime", "Realtime"],
  ["ga4", "Google Analytics"],
] as const;
const PRESETS = [["today", "Today"], ["yesterday", "Yesterday"], ["7d", "7 days"], ["30d", "30 days"], ["90d", "90 days"], ["365d", "1 year"]] as const;

export default async function AnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string; range?: string; from?: string; to?: string }>;
}) {
  await requireAdmin();
  const sp = await searchParams;
  const tab = TABS.find(([k]) => k === sp.tab)?.[0] ?? "overview";
  const range = resolveRange(sp);
  const qs = (extra: Record<string, string>) => new URLSearchParams({ tab, range: range.key, ...(range.key === "custom" ? { from: range.from, to: range.to } : {}), ...extra }).toString();

  const [loaded, business, jobs, ga4] = await Promise.all([
    loadRange(range).catch((e) => {
      console.error("[admin/analytics]", e instanceof Error ? e.message : e);
      return null;
    }),
    loadBusinessStats(range),
    listAllJobs().catch(() => []),
    tab === "ga4" ? getGa4Summary(range.from, range.to) : Promise.resolve({ configured: false } as const),
  ]);

  const ctx: Ctx | null = loaded
    ? {
        range,
        perDay: loaded.perDay,
        total: loaded.total,
        prevTotal: loaded.prevTotal,
        cur: computeMetrics(loaded.total),
        prev: computeMetrics(loaded.prevTotal),
        business,
        jobTitles: Object.fromEntries(jobs.map((j) => [j.id, j.title])),
      }
    : null;

  let serviceAccount = "(service account email)";
  try {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON ?? "{}").client_email ?? serviceAccount;
  } catch {
    /* ignore */
  }

  // Label lookups for the (client-side) realtime panel.
  const pageLabels = Object.fromEntries(["home", "services", "solutions", "industries", "projects", "insights", "careers", "careers_job", "contact", "other"].map((k) => [k, pageLabel(k)]));
  const countryLabels = Object.fromEntries(["GB", "US", "DE", "FR", "NL", "IE", "ES", "IT", "IN", "CA", "AU", "HU", "xx"].map((c) => [c, countryName(c)]));

  return (
    <div className="mx-auto max-w-6xl space-y-5">
      <PageHeader
        title="Analytics"
        description="Cookieless first-party analytics (no cookies, no personal data), plus Google Analytics for consenting visitors."
      />

      <nav aria-label="Analytics sections" className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1">
        {TABS.map(([key, label]) => (
          <TabLink key={key} href={`/admin/analytics?${qs({ tab: key })}`} active={tab === key}>
            {label}
          </TabLink>
        ))}
      </nav>

      {tab !== "realtime" ? (
        <div className="flex flex-wrap items-end justify-between gap-3 rounded-xl border bg-card p-3">
          <nav aria-label="Date range" className="flex flex-wrap gap-1 text-sm">
            {PRESETS.map(([key, label]) => (
              <Link
                key={key}
                href={`/admin/analytics?${new URLSearchParams({ tab, range: key }).toString()}`}
                aria-current={range.key === key ? "page" : undefined}
                className={`rounded-full border px-3 py-1 ${range.key === key ? "bg-foreground text-background" : "hover:bg-muted"}`}
              >
                {label}
              </Link>
            ))}
          </nav>
          <form className="flex items-end gap-2 text-sm" action="/admin/analytics">
            <input type="hidden" name="tab" value={tab} />
            <input type="hidden" name="range" value="custom" />
            <label className="grid gap-1 text-xs text-muted-foreground">
              From
              <input type="date" name="from" defaultValue={range.from} className="h-8 rounded-md border border-input bg-background px-2 text-sm text-foreground" />
            </label>
            <label className="grid gap-1 text-xs text-muted-foreground">
              To
              <input type="date" name="to" defaultValue={range.to} className="h-8 rounded-md border border-input bg-background px-2 text-sm text-foreground" />
            </label>
            <Button type="submit" size="sm" variant="outline" showArrow={false}>
              Apply
            </Button>
          </form>
          <p className="w-full text-xs text-muted-foreground">
            {range.label} (UTC) compared with {range.prevFrom} → {range.prevTo}.
          </p>
        </div>
      ) : null}

      {tab === "realtime" ? (
        <RealtimePanel pageLabels={pageLabels} countryLabels={countryLabels} />
      ) : !ctx ? (
        <p className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
          Could not load analytics. Check the Firestore connection and try again.
        </p>
      ) : tab === "audience" ? (
        <AudienceTab ctx={ctx} />
      ) : tab === "acquisition" ? (
        <AcquisitionTab ctx={ctx} />
      ) : tab === "behaviour" ? (
        <BehaviourTab ctx={ctx} />
      ) : tab === "careers" ? (
        <CareersTab ctx={ctx} />
      ) : tab === "performance" ? (
        <PerformanceTab ctx={ctx} />
      ) : tab === "ga4" ? (
        <GaTab ctx={ctx} g={{ ga4, serviceAccount, propertyHint: "Property ID is the number shown under Admin → Property details, not the G-… measurement ID (yours is G-T9WH3XWBH5)." }} />
      ) : (
        <OverviewTab ctx={ctx} />
      )}
    </div>
  );
}
