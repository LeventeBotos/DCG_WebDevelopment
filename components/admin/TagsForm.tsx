"use client";

import { useActionState } from "react";
import { updateTagsAction, type ActionState } from "@/app/admin/(panel)/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function TagsForm({ applicationId, tags }: { applicationId: string; tags: string[] }) {
  const [state, action, pending] = useActionState<ActionState, FormData>(updateTagsAction, {});
  return (
    <form action={action} className="space-y-2">
      <input type="hidden" name="id" value={applicationId} />
      <Input name="tags" defaultValue={tags.join(", ")} placeholder="strong, phone screen, talent pool" aria-label="Tags, separated by commas" />
      <div className="flex items-center gap-3">
        <Button type="submit" size="sm" variant="outline" showArrow={false} disabled={pending}>
          {pending ? "Saving…" : "Save tags"}
        </Button>
        <p role="status" aria-live="polite" className="text-xs text-muted-foreground">
          {state.error ?? state.ok}
        </p>
      </div>
    </form>
  );
}
