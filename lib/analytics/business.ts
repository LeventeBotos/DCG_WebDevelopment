import { listApplications, listMessages } from "@/lib/inbox/server";
import type { Application, ContactMessage } from "@/lib/inbox/types";
import type { DateRange, Ranked } from "./aggregate";

/** Hiring and enquiry metrics computed from the real application / message records (not from tracking). */

const rankBy = <T,>(rows: T[], key: (r: T) => string): Ranked => {
  const m = new Map<string, number>();
  for (const r of rows) {
    const k = key(r) || "(none)";
    m.set(k, (m.get(k) ?? 0) + 1);
  }
  return [...m.entries()].map(([key, value]) => ({ key, value })).sort((a, b) => b.value - a.value);
};

export type BusinessStats = {
  applications: {
    total: number;
    prevTotal: number;
    perDay: Record<string, number>;
    byStatus: Ranked;
    byJob: Ranked;
    bySource: Ranked;
    byExperience: Ranked;
    withCv: number;
    /** Median hours between submission and the first status change (a proxy for response time). */
    medianHoursToFirstAction: number | null;
    awaitingReview: number;
    oldestWaitingDays: number | null;
  };
  messages: { total: number; prevTotal: number; perDay: Record<string, number>; byTopic: Ranked; byCountry: Ranked; byStatus: Ranked };
};

const inRange = (iso: string, from: string, to: string) => {
  const d = iso.slice(0, 10);
  return d >= from && d <= to;
};

export async function loadBusinessStats(range: DateRange): Promise<BusinessStats> {
  const [apps, msgs] = await Promise.all([
    listApplications(1000).catch(() => [] as Application[]),
    listMessages(1000).catch(() => [] as ContactMessage[]),
  ]);

  const cur = apps.filter((a) => inRange(a.createdAt, range.from, range.to));
  const prev = apps.filter((a) => inRange(a.createdAt, range.prevFrom, range.prevTo));
  const perDay: Record<string, number> = {};
  for (const a of cur) perDay[a.createdAt.slice(0, 10)] = (perDay[a.createdAt.slice(0, 10)] ?? 0) + 1;

  const waits = cur
    .filter((a) => a.status !== "new" && a.updatedAt > a.createdAt)
    .map((a) => (Date.parse(a.updatedAt) - Date.parse(a.createdAt)) / 3_600_000)
    .sort((a, b) => a - b);
  const median = waits.length ? waits[Math.floor(waits.length / 2)] : null;

  const waiting = apps.filter((a) => a.status === "new");
  const oldest = waiting.length ? Math.max(...waiting.map((a) => (Date.now() - Date.parse(a.createdAt)) / 86_400_000)) : null;

  const mCur = msgs.filter((m) => inRange(m.createdAt, range.from, range.to));
  const mPrev = msgs.filter((m) => inRange(m.createdAt, range.prevFrom, range.prevTo));
  const mPerDay: Record<string, number> = {};
  for (const m of mCur) mPerDay[m.createdAt.slice(0, 10)] = (mPerDay[m.createdAt.slice(0, 10)] ?? 0) + 1;

  return {
    applications: {
      total: cur.length,
      prevTotal: prev.length,
      perDay,
      byStatus: rankBy(cur, (a) => a.status),
      byJob: rankBy(cur, (a) => a.jobTitle),
      bySource: rankBy(cur, (a) => a.utmSource || "direct / unknown"),
      byExperience: rankBy(cur, (a) => a.experience),
      withCv: cur.filter((a) => a.cvFileName).length,
      medianHoursToFirstAction: median,
      awaitingReview: waiting.length,
      oldestWaitingDays: oldest,
    },
    messages: {
      total: mCur.length,
      prevTotal: mPrev.length,
      perDay: mPerDay,
      byTopic: rankBy(mCur, (m) => m.topic),
      byCountry: rankBy(mCur, (m) => m.country),
      byStatus: rankBy(mCur, (m) => m.status),
    },
  };
}
