"use client";

import { useActionState } from "react";
import { runMaintenanceAction, saveCampaignsAction, sendTestDigestAction, type ActionState } from "@/app/admin/(panel)/actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function CampaignsForm({ names }: { names: string[] }) {
  const [state, action, pending] = useActionState<ActionState, FormData>(saveCampaignsAction, {});
  return (
    <form action={action} className="space-y-3">
      <Textarea name="names" rows={4} defaultValue={names.join("\n")} placeholder={"spring_launch\nlinkedin_hiring\nnewsletter_nov"} aria-label="Tracked campaign names, one per line" />
      <p className="text-xs text-muted-foreground">
        One per line. Use lowercase letters, numbers and underscores, then tag links with <code>?utm_campaign=spring_launch</code>. Only listed names
        appear by name in analytics; everything else is grouped as “other”.
      </p>
      <div className="flex items-center gap-3">
        <Button type="submit" variant="primary" showArrow={false} disabled={pending}>
          {pending ? "Saving…" : "Save campaigns"}
        </Button>
        <p role="status" aria-live="polite" className="text-sm text-muted-foreground">
          {state.error ?? state.ok}
        </p>
      </div>
    </form>
  );
}

function ToolButton({ label, action }: { label: string; action: (prev: ActionState) => Promise<ActionState> }) {
  const [state, run, pending] = useActionState<ActionState>(action, {});
  return (
    <form action={run} className="space-y-2">
      <Button type="submit" variant="outline" size="sm" showArrow={false} disabled={pending}>
        {pending ? "Working…" : label}
      </Button>
      {state.error || state.ok ? (
        <p role="status" className={`max-w-xl break-words text-xs ${state.error ? "text-destructive" : "text-muted-foreground"}`}>
          {state.error ?? state.ok}
        </p>
      ) : null}
    </form>
  );
}

export function ScheduledTools() {
  return (
    <div className="flex flex-wrap items-start gap-6">
      <ToolButton label="Send me a test digest" action={sendTestDigestAction} />
      <ToolButton label="Run maintenance now" action={runMaintenanceAction} />
    </div>
  );
}
