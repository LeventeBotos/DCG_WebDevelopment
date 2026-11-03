import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sparkline } from "@/components/admin/AnalyticsCharts";
import { delta } from "@/lib/analytics/metrics";

export function Panel({ title, description, children, className }: { title: string; description?: string; children: ReactNode; className?: string }) {
  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">{title}</CardTitle>
        {description ? <p className="text-xs text-muted-foreground">{description}</p> : null}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

/** +12% / −5% badge. `invert` flips the colours for metrics where lower is better (bounce rate, errors). */
export function DeltaBadge({ current, previous, invert = false }: { current: number; previous: number; invert?: boolean }) {
  const d = delta(current, previous);
  if (d === null) return <span className="text-xs text-muted-foreground">new</span>;
  if (Math.abs(d) < 0.005) {
    return (
      <span className="inline-flex items-center gap-0.5 text-xs text-muted-foreground">
        <Minus className="size-3" /> 0%
      </span>
    );
  }
  const up = d > 0;
  const good = invert ? !up : up;
  return (
    <span className={`inline-flex items-center gap-0.5 text-xs font-medium ${good ? "text-emerald-600" : "text-red-600"}`}>
      {up ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
      {Math.abs(Math.round(d * 100))}%
    </span>
  );
}

export function KpiCard({
  label,
  value,
  current,
  previous,
  invert,
  spark,
  hint,
}: {
  label: string;
  value: string;
  current?: number;
  previous?: number;
  invert?: boolean;
  spark?: number[];
  hint?: string;
}) {
  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs text-muted-foreground">{label}</p>
        {current !== undefined && previous !== undefined ? <DeltaBadge current={current} previous={previous} invert={invert} /> : null}
      </div>
      <p className="mt-1.5 text-2xl font-semibold tabular-nums">{value}</p>
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
      {spark && spark.length > 1 ? <div className="mt-2"><Sparkline values={spark} /></div> : null}
    </div>
  );
}

/** Table with an optional share bar in the first numeric column. */
export function DataTable({
  head,
  rows,
  align,
  empty = "No data yet.",
}: {
  head: string[];
  rows: ReactNode[][];
  align?: ("left" | "right")[];
  empty?: string;
}) {
  const a = (i: number) => (align?.[i] ?? (i === 0 ? "left" : "right")) === "right" ? "text-right tabular-nums" : "";
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {head.map((h, i) => (
            <TableHead key={h} className={a(i)}>
              {h}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.length === 0 ? (
          <TableRow>
            <TableCell colSpan={head.length} className="py-8 text-center text-muted-foreground">
              {empty}
            </TableCell>
          </TableRow>
        ) : (
          rows.map((r, ri) => (
            <TableRow key={ri}>
              {r.map((c, ci) => (
                <TableCell key={ci} className={a(ci)}>
                  {c}
                </TableCell>
              ))}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}

export function ShareBar({ value, total, label }: { value: number; total: number; label?: ReactNode }) {
  const pct = total > 0 ? (value / total) * 100 : 0;
  return (
    <div className="flex items-center gap-2">
      {label}
      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-[#0A4C8A]" style={{ width: `${Math.min(100, pct)}%` }} />
      </div>
      <span className="w-10 text-right text-xs text-muted-foreground">{pct.toFixed(0)}%</span>
    </div>
  );
}

/** Good / needs-improvement / poor stacked bar for Web Vitals. */
export function StackedBar({ good, ni, poor }: { good: number; ni: number; poor: number }) {
  return (
    <div className="flex h-2 w-full overflow-hidden rounded-full bg-muted" role="img" aria-label={`Good ${Math.round(good * 100)}%, needs improvement ${Math.round(ni * 100)}%, poor ${Math.round(poor * 100)}%`}>
      <div className="bg-emerald-500" style={{ width: `${good * 100}%` }} />
      <div className="bg-amber-400" style={{ width: `${ni * 100}%` }} />
      <div className="bg-red-500" style={{ width: `${poor * 100}%` }} />
    </div>
  );
}

export function FunnelSteps({ steps }: { steps: { label: string; value: number }[] }) {
  const max = Math.max(1, ...steps.map((s) => s.value));
  return (
    <ol className="space-y-2">
      {steps.map((s, i) => {
        const prev = i > 0 ? steps[i - 1].value : null;
        return (
          <li key={s.label}>
            <div className="mb-1 flex items-baseline justify-between text-sm">
              <span>{s.label}</span>
              <span className="tabular-nums">
                <strong>{s.value.toLocaleString("en-GB")}</strong>
                {prev !== null && prev > 0 ? <span className="ml-2 text-xs text-muted-foreground">{Math.round((s.value / prev) * 100)}% of previous</span> : null}
              </span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-gradient-to-r from-[#0A4C8A] to-[#00CACA]" style={{ width: `${(s.value / max) * 100}%` }} />
            </div>
          </li>
        );
      })}
    </ol>
  );
}

const regionNames = typeof Intl !== "undefined" && "DisplayNames" in Intl ? new Intl.DisplayNames(["en"], { type: "region" }) : null;
export function countryName(cc: string): string {
  if (cc === "xx") return "Unknown";
  try {
    return regionNames?.of(cc.toUpperCase()) ?? cc.toUpperCase();
  } catch {
    return cc.toUpperCase();
  }
}
export function flag(cc: string): string {
  if (!/^[a-z]{2}$/i.test(cc) || cc.toLowerCase() === "xx") return "🌐";
  return String.fromCodePoint(...[...cc.toUpperCase()].map((c) => 0x1f1a5 + c.charCodeAt(0)));
}

export function TabLink({ href, active, children }: { href: string; active: boolean; children: ReactNode }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`whitespace-nowrap rounded-full px-3 py-1.5 text-sm transition-colors ${active ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
    >
      {children}
    </Link>
  );
}
