import { COLL } from "@/lib/analytics/collector";
import { deleteDoc, FirestoreRef, queryDocs, setDoc } from "@/lib/firestore/rest";
import { archiveExpiredJobs } from "@/lib/jobs/server";
import { purgeRejectedApplications } from "@/lib/inbox/server";
import { purgeExpiredTrash } from "@/lib/trash";

/** Daily housekeeping. Idempotent, so it is safe to run twice or by hand. */

/** Merge each past day's counter shards into one document (reads get cheaper) and delete the shards. */
export async function rollupAnalytics(): Promise<{ days: number; shardsRemoved: number }> {
  const today = new Date().toISOString().slice(0, 10);
  const docs = await queryDocs<Record<string, unknown>>(COLL.daily, {
    where: [{ field: "__name__", op: "LESS_THAN", value: new FirestoreRef(`${COLL.daily}/${today}`) }],
    limit: 10000,
  });
  const byDay = new Map<string, typeof docs>();
  for (const d of docs) byDay.set(d.id.slice(0, 10), [...(byDay.get(d.id.slice(0, 10)) ?? []), d]);

  let days = 0;
  let shardsRemoved = 0;
  for (const [day, list] of byDay) {
    const shards = list.filter((d) => d.id.includes("_"));
    if (shards.length === 0) continue;
    const merged: Record<string, number> = {};
    for (const d of list) for (const [k, v] of Object.entries(d)) if (k !== "id" && typeof v === "number") merged[k] = (merged[k] ?? 0) + v;
    await setDoc(`${COLL.daily}/${day}`, merged); // write the merged doc first, then remove shards
    await Promise.all(shards.map((s) => deleteDoc(`${COLL.daily}/${s.id}`)));
    days++;
    shardsRemoved += shards.length;
  }
  return { days, shardsRemoved };
}

async function deleteWhere(collection: string, field: string, before: Date | string): Promise<number> {
  const rows = await queryDocs(collection, { where: [{ field, op: "LESS_THAN", value: before }], limit: 500 });
  await Promise.all(rows.map((r) => deleteDoc(`${collection}/${r.id}`)));
  return rows.length;
}

export async function runMaintenance() {
  const now = new Date();
  const result: Record<string, unknown> = {};
  const step = async (name: string, fn: () => Promise<unknown>) => {
    try {
      result[name] = await fn();
    } catch (error) {
      result[name] = { error: error instanceof Error ? error.message : "failed" };
    }
  };
  await step("analyticsRollup", rollupAnalytics);
  await step("visitorRecordsDeleted", () => deleteWhere(COLL.visitors, "lastSeen", new Date(now.getTime() - 2 * 86_400_000).toISOString()));
  await step("rateLimitsDeleted", () => deleteWhere("rateLimits", "expireAt", now));
  await step("trashPurged", purgeExpiredTrash);
  await step("rejectedApplicationsPurged", () => purgeRejectedApplications(12));
  await step("jobsArchivedAfterClosing", () => archiveExpiredJobs());
  return result;
}
