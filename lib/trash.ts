import { deleteDoc, queryDocs, updateDoc } from "@/lib/firestore/rest";
import { deleteApplication } from "@/lib/inbox/server";

/** Soft delete: records get a deletedAt stamp, disappear everywhere, and can be restored for 30 days. */
export type TrashEntity = "job" | "application" | "message";

const COLLECTION: Record<TrashEntity, string> = { job: "jobs", application: "applications", message: "contactMessages" };
export const TRASH_RETENTION_DAYS = 30;

export const isTrashEntity = (v: unknown): v is TrashEntity => v === "job" || v === "application" || v === "message";

const path = (entity: TrashEntity, id: string) => `${COLLECTION[entity]}/${encodeURIComponent(id)}`;

export async function softDelete(entity: TrashEntity, id: string, actor: string): Promise<void> {
  await updateDoc(path(entity, id), { deletedAt: new Date().toISOString(), deletedBy: actor });
}

export async function restore(entity: TrashEntity, id: string): Promise<void> {
  await updateDoc(path(entity, id), { deletedAt: null, deletedBy: null });
}

/** Permanent delete. Applications also lose their uploaded CV. */
export async function purgeForever(entity: TrashEntity, id: string): Promise<void> {
  if (entity === "application") await deleteApplication(id);
  else await deleteDoc(path(entity, id));
}

export type TrashItem = { entity: TrashEntity; id: string; label: string; sub: string; deletedAt: string; deletedBy: string };

export async function listTrash(): Promise<TrashItem[]> {
  const [jobs, applications, messages] = await Promise.all([
    queryDocs<Record<string, string | null>>("jobs", { limit: 500 }),
    queryDocs<Record<string, string | null>>("applications", { limit: 500 }),
    queryDocs<Record<string, string | null>>("contactMessages", { limit: 500 }),
  ]);
  const items: TrashItem[] = [];
  for (const j of jobs) if (j.deletedAt) items.push({ entity: "job", id: j.id, label: j.title ?? j.id, sub: "Job", deletedAt: j.deletedAt, deletedBy: j.deletedBy ?? "" });
  for (const a of applications) if (a.deletedAt) items.push({ entity: "application", id: a.id, label: a.name ?? a.id, sub: `Application · ${a.jobTitle ?? ""}`, deletedAt: a.deletedAt, deletedBy: a.deletedBy ?? "" });
  for (const m of messages) if (m.deletedAt) items.push({ entity: "message", id: m.id, label: m.name ?? m.id, sub: `Message · ${m.topic ?? ""}`, deletedAt: m.deletedAt, deletedBy: m.deletedBy ?? "" });
  return items.sort((a, b) => b.deletedAt.localeCompare(a.deletedAt));
}

/** Permanently remove items that have been in the trash longer than the retention period. */
export async function purgeExpiredTrash(): Promise<number> {
  const cutoff = new Date(Date.now() - TRASH_RETENTION_DAYS * 86_400_000).toISOString();
  const expired = (await listTrash()).filter((i) => i.deletedAt < cutoff);
  await Promise.all(expired.map((i) => purgeForever(i.entity, i.id)));
  return expired.length;
}
