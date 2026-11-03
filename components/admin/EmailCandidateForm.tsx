"use client";

import { useActionState, useState } from "react";
import { emailCandidateAction, type ActionState } from "@/app/admin/(panel)/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CANDIDATE_TEMPLATES, renderTemplate } from "@/lib/inbox/templates";

/** Pick a template, edit the wording, then send. The email goes from the company address; replies reach the shared inbox. */
export default function EmailCandidateForm({ applicationId, name, role, email }: { applicationId: string; name: string; role: string; email: string }) {
  const [state, action, pending] = useActionState<ActionState, FormData>(emailCandidateAction, {});
  const initial = CANDIDATE_TEMPLATES[0];
  const [templateId, setTemplateId] = useState(initial.id);
  const [subject, setSubject] = useState(renderTemplate(initial, { name, role }).subject);
  const [body, setBody] = useState(renderTemplate(initial, { name, role }).body);
  const template = CANDIDATE_TEMPLATES.find((t) => t.id === templateId)!;

  function choose(id: string) {
    const t = CANDIDATE_TEMPLATES.find((x) => x.id === id)!;
    const r = renderTemplate(t, { name, role });
    setTemplateId(id);
    setSubject(r.subject);
    setBody(r.body);
  }

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="id" value={applicationId} />
      <input type="hidden" name="templateId" value={templateId} />
      <p className="text-xs text-muted-foreground">To: {email}</p>
      <div className="space-y-2">
        <Label htmlFor="template">Template</Label>
        <Select id="template" value={templateId} onChange={(e) => choose(e.target.value)}>
          {CANDIDATE_TEMPLATES.map((t) => (
            <option key={t.id} value={t.id}>
              {t.label}
            </option>
          ))}
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input id="subject" name="subject" value={subject} onChange={(e) => setSubject(e.target.value)} maxLength={200} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="body">Message</Label>
        <Textarea id="body" name="body" rows={12} value={body} onChange={(e) => setBody(e.target.value)} maxLength={5000} required />
        <p className="text-xs text-muted-foreground">Replace anything in [square brackets] before sending.</p>
      </div>
      {template.status ? (
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="updateStatus" defaultChecked className="size-4" />
          Also set the status to <strong className="capitalize">{template.status}</strong>
        </label>
      ) : null}
      <div className="flex items-center gap-3">
        <Button type="submit" variant="primary" showArrow={false} disabled={pending}>
          {pending ? "Sending…" : "Send email"}
        </Button>
        <p role="status" aria-live="polite" className={`text-sm ${state.error ? "text-destructive" : "text-muted-foreground"}`}>
          {state.error ?? state.ok}
        </p>
      </div>
    </form>
  );
}
