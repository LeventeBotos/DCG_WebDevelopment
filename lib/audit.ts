import { addDoc } from "@/lib/firestore/rest";

/** Records an admin action. Never throws: a failed audit write must not break the action, but it is logged. */
export async function audit(
  actorEmail: string,
  action: string,
  entity: string,
  entityId?: string,
  diff?: Record<string, unknown>,
): Promise<void> {
  try {
    await addDoc("auditLog", {
      actorEmail,
      action,
      entity,
      entityId: entityId ?? null,
      diff: diff ?? null,
      at: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[audit] write failed", action, entity, error instanceof Error ? error.message : error);
  }
}
