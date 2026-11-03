import { FirestoreRef, queryDocs } from "@/lib/firestore/rest";
import { COLL } from "./collector";

/** Reads the sharded daily counter documents written by /api/collect and merges them per day. */

export type Counters = Record<string, number>;
export type Ranked = { key: string; value: number }[];

const DAY = 86_400_000;
export const isoDay = (d: Date) => d.toISOString().slice(0, 10);
const parseDay = (s: string) => new Date(`${s}T00:00:00.000Z`);
const addDays = (s: string, n: number) => isoDay(new Date(parseDay(s).getTime() + n * DAY));

export type RangeKey = "today" | "yesterday" | "7d" | "30d" | "90d" | "365d" | "custom";

export type DateRange = {
  key: RangeKey;
  from: string; // inclusive, UTC
  to: string; // inclusive, UTC
  days: string[];
  prevFrom: string;
  prevTo: string;
  label: string;
};

/** Parse ?range=&from=&to= into a validated range plus the equally long previous period for comparison. */
export function resolveRange(params: { range?: string; from?: string; to?: string }): DateRange {
  const today = isoDay(new Date());
  let from = addDays(today, -29);
  let to = today;
  let key: RangeKey = "30d";
  const re = /^\d{4}-\d{2}-\d{2}$/;

  switch (params.range) {
    case "today": key = "today"; from = to = today; break;
    case "yesterday": key = "yesterday"; from = to = addDays(today, -1); break;
    case "7d": key = "7d"; from = addDays(today, -6); break;
    case "90d": key = "90d"; from = addDays(today, -89); break;
    case "365d": key = "365d"; from = addDays(today, -364); break;
    case "custom":
      if (params.from && params.to && re.test(params.from) && re.test(params.to) && params.from <= params.to) {
        key = "custom";
        from = params.from;
        to = params.to > today ? today : params.to;
        if (from > to) from = to;
      }
      break;
  }

  const count = Math.round((parseDay(to).getTime() - parseDay(from).getTime()) / DAY) + 1;
  const capped = Math.min(count, 400);
  if (capped !== count) from = addDays(to, -(capped - 1));
  const days = Array.from({ length: capped }, (_, i) => addDays(from, i));
  const prevTo = addDays(from, -1);
  const prevFrom = addDays(prevTo, -(capped - 1));
  const label =
    key === "today" ? "Today" : key === "yesterday" ? "Yesterday" : key === "custom" ? `${from} → ${to}` : `Last ${capped} days`;
  return { key, from, to, days, prevFrom, prevTo, label };
}

export type LoadedRange = {
  range: DateRange;
  perDay: Record<string, Counters>;
  total: Counters;
  prevTotal: Counters;
};

const add = (into: Counters, from: Counters) => {
  for (const [k, v] of Object.entries(from)) into[k] = (into[k] ?? 0) + v;
};

/** Load current + previous period in one query (document ids start with the ISO date, so a range filter works). */
export async function loadRange(range: DateRange): Promise<LoadedRange> {
  const docs = await queryDocs<Record<string, unknown>>(COLL.daily, {
    where: [
      { field: "__name__", op: "GREATER_THAN_OR_EQUAL", value: new FirestoreRef(`${COLL.daily}/${range.prevFrom}`) },
      { field: "__name__", op: "LESS_THAN", value: new FirestoreRef(`${COLL.daily}/${addDays(range.to, 1)}`) },
    ],
    limit: 10000,
  });

  const perDay: Record<string, Counters> = {};
  const total: Counters = {};
  const prevTotal: Counters = {};
  for (const d of docs) {
    const day = d.id.slice(0, 10);
    const counters: Counters = {};
    for (const [k, v] of Object.entries(d)) if (k !== "id" && typeof v === "number") counters[k] = v;
    if (day >= range.from && day <= range.to) {
      add((perDay[day] ??= {}), counters);
      add(total, counters);
    } else if (day >= range.prevFrom && day <= range.prevTo) {
      add(prevTotal, counters);
    }
  }
  return { range, perDay, total, prevTotal };
}

/** Counters whose name starts with `prefix`, summed and sorted descending. */
export function rank(c: Counters, prefix: string, opts: { exclude?: string[]; limit?: number } = {}): Ranked {
  const out: Ranked = [];
  for (const [k, v] of Object.entries(c)) {
    if (!k.startsWith(prefix) || v <= 0) continue;
    const key = k.slice(prefix.length);
    if (opts.exclude?.includes(key)) continue;
    out.push({ key, value: v });
  }
  out.sort((a, b) => b.value - a.value);
  return opts.limit ? out.slice(0, opts.limit) : out;
}

export const n = (c: Counters, k: string) => c[k] ?? 0;
