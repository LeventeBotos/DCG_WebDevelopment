import type { Counters, DateRange } from "@/lib/analytics/aggregate";
import type { BusinessStats } from "@/lib/analytics/business";
import type { Ga4Summary } from "@/lib/analytics/ga4";
import type { Metrics } from "@/lib/analytics/metrics";

export type Ctx = {
  range: DateRange;
  perDay: Record<string, Counters>;
  total: Counters;
  prevTotal: Counters;
  cur: Metrics;
  prev: Metrics;
  business: BusinessStats;
  jobTitles: Record<string, string>;
};
export type GaCtx = { ga4: Ga4Summary; serviceAccount: string; propertyHint: string };
