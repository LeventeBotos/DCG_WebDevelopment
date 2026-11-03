"use client";

import { useActionState } from "react";
import type { ActionState } from "@/app/admin/(panel)/actions";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

/** Status + internal notes editor shared by applications and contact messages. */
export default function InboxUpdateForm({
  action,
  id,
  statuses,
  status,
  notes,
}: {
  action: (prev: ActionState, formData: FormData) => Promise<ActionState>;
  id: string;
  statuses: readonly string[];
  status: string;
  notes: string;
}) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(action, {});
  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="id" value={id} />
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select id="status" name="status" defaultValue={status} className="capitalize">
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="notes">Internal notes</Label>
        <Textarea id="notes" name="notes" rows={6} maxLength={5000} defaultValue={notes} placeholder="Only visible to admins." />
      </div>
      <div className="flex items-center gap-3">
        <Button type="submit" variant="primary" showArrow={false} disabled={pending}>
          {pending ? "Saving…" : "Save"}
        </Button>
        <p role="status" aria-live="polite" className={`text-sm ${state.error ? "text-destructive" : "text-muted-foreground"}`}>
          {state.error ?? state.ok}
        </p>
      </div>
    </form>
  );
}
