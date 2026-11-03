"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { saveJobAction, type ActionState } from "@/app/admin/(panel)/actions";
import RoleCard from "@/components/careers/RoleCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { categoryMeta, JOB_CATEGORIES, JOB_STATUSES, type Job } from "@/lib/jobs/types";

const toLines = (s: string) =>
  s
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

export default function JobForm({ job }: { job?: Job }) {
  const [state, action, pending] = useActionState<ActionState, FormData>(saveJobAction, {});
  const [title, setTitle] = useState(job?.title ?? "");
  const [location, setLocation] = useState(job?.location ?? "London / Remote");
  const [employmentType, setEmploymentType] = useState(job?.employmentType ?? "Full-time");
  const [responsibilities, setResponsibilities] = useState((job?.responsibilities ?? []).join("\n"));
  const [dirty, setDirty] = useState(false);

  // Warn before leaving with unsaved edits.
  useEffect(() => {
    if (!dirty) return;
    const handler = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  const preview = useMemo(
    () => ({ id: job?.id ?? "preview", title, location, employmentType, responsibilities: toLines(responsibilities) }),
    [job?.id, title, location, employmentType, responsibilities],
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
      <form
        action={action}
        onChange={() => setDirty(true)}
        onSubmit={() => setDirty(false)}
        className="space-y-5"
      >
        {job ? <input type="hidden" name="id" value={job.id} /> : null}

        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Senior ML Engineer" />
        </div>

        {!job ? (
          <div className="space-y-2">
            <Label htmlFor="slug">URL slug (optional)</Label>
            <Input id="slug" name="slug" placeholder="auto-generated from the title" />
            <p className="text-xs text-muted-foreground">Used in /careers/&lt;slug&gt;. Cannot be changed after creation.</p>
          </div>
        ) : (
          <p className="text-xs text-muted-foreground">
            URL: <code>/careers/{job.id}</code>
          </p>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select id="category" name="category" defaultValue={job?.category ?? "ai"}>
              {JOB_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {categoryMeta[c].label}
                </option>
              ))}
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select id="status" name="status" defaultValue={job?.status ?? "draft"}>
              {JOB_STATUSES.map((s) => (
                <option key={s} value={s} className="capitalize">
                  {s}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" name="location" required value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="employmentType">Employment type</Label>
            <Input id="employmentType" name="employmentType" required value={employmentType} onChange={(e) => setEmploymentType(e.target.value)} />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="summary">Summary</Label>
          <Textarea id="summary" name="summary" rows={3} defaultValue={job?.summary ?? ""} maxLength={1000} placeholder="Short intro shown on the job page." />
        </div>

        <div className="space-y-2">
          <Label htmlFor="responsibilities">Responsibilities (one per line)</Label>
          <Textarea
            id="responsibilities"
            name="responsibilities"
            rows={6}
            value={responsibilities}
            onChange={(e) => setResponsibilities(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="requirements">Requirements (one per line)</Label>
          <Textarea id="requirements" name="requirements" rows={5} defaultValue={(job?.requirements ?? []).join("\n")} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="sortOrder">Sort order</Label>
          <Input id="sortOrder" name="sortOrder" type="number" min={0} max={9999} defaultValue={job?.sortOrder ?? 100} className="w-32" />
          <p className="text-xs text-muted-foreground">Lower numbers appear first. You can also reorder from the jobs list.</p>
        </div>

        <p role="alert" aria-live="polite" className="min-h-5 text-sm text-destructive">
          {state.error}
        </p>

        <div className="flex gap-2">
          <Button type="submit" variant="primary" showArrow={false} disabled={pending}>
            {pending ? "Saving…" : job ? "Save changes" : "Create job"}
          </Button>
          <Button asChild variant="outline">
            <Link href="/admin/jobs">Cancel</Link>
          </Button>
        </div>
      </form>

      <aside className="lg:sticky lg:top-6 lg:self-start">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Live preview</p>
        <RoleCard role={preview} index={0} />
      </aside>
    </div>
  );
}
