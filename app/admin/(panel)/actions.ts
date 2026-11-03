"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { audit } from "@/lib/audit";
import { requireAdmin, requireOwner } from "@/lib/auth/require-admin";
import { createDoc, deleteDoc, setDoc, updateDoc } from "@/lib/firestore/rest";
import { createJob, getJob, listAllJobs, setJobStatus, updateJob, type JobInput } from "@/lib/jobs/server";
import { SEED_JOBS } from "@/lib/jobs/seed";
import { JOB_CATEGORIES, JOB_STATUSES } from "@/lib/jobs/types";
import {
  deleteApplication,
  deleteMessage,
  getApplication,
  getMessage,
  purgeRejectedApplications,
  updateApplication,
  updateMessage,
} from "@/lib/inbox/server";
import { APPLICATION_STATUSES, MESSAGE_STATUSES } from "@/lib/inbox/types";

export type ActionState = { error?: string; ok?: string };

const lines = (max: number) =>
  z
    .string()
    .transform((s) =>
      s
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean),
    )
    .pipe(z.array(z.string().max(300)).max(max));

const JobSchema = z.object({
  title: z.string().trim().min(2, "Title is required").max(120),
  category: z.enum(JOB_CATEGORIES as [string, ...string[]]),
  location: z.string().trim().min(2, "Location is required").max(120),
  employmentType: z.string().trim().min(2).max(60),
  summary: z.string().trim().max(1000),
  responsibilities: lines(12),
  requirements: lines(12),
  status: z.enum(JOB_STATUSES as [string, ...string[]]),
  sortOrder: z.coerce.number().int().min(0).max(9999),
  slug: z.string().trim().max(60).optional(),
});

function parseJob(formData: FormData) {
  const parsed = JobSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Please check the form." } as const;
  }
  const { slug, ...rest } = parsed.data;
  return { input: rest as unknown as JobInput, slug } as const;
}

// ---------- jobs ----------
export async function saveJobAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const admin = await requireAdmin();
  const parsed = parseJob(formData);
  if ("error" in parsed) return { error: parsed.error };

  const id = String(formData.get("id") ?? "");
  if (id) {
    const previous = await getJob(id);
    if (!previous) return { error: "This job no longer exists." };
    await updateJob(id, parsed.input, admin.email, previous);
    await audit(admin.email, "job.update", "job", id, { status: parsed.input.status, title: parsed.input.title });
  } else {
    const newId = await createJob(parsed.input, admin.email, parsed.slug);
    await audit(admin.email, "job.create", "job", newId, { status: parsed.input.status, title: parsed.input.title });
  }
  revalidatePath("/admin/jobs");
  redirect("/admin/jobs");
}

export async function setJobStatusAction(formData: FormData): Promise<void> {
  const admin = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const status = z.enum(JOB_STATUSES as [string, ...string[]]).parse(formData.get("status"));
  const previous = await getJob(id);
  if (!previous) return;
  await setJobStatus(id, status as JobInput["status"], admin.email, previous);
  await audit(admin.email, `job.${status}`, "job", id, { from: previous.status });
  revalidatePath("/admin/jobs");
}

export async function moveJobAction(formData: FormData): Promise<void> {
  const admin = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const direction = formData.get("direction") === "up" ? -1 : 1;
  const jobs = await listAllJobs();
  const index = jobs.findIndex((j) => j.id === id);
  const swapWith = index + direction;
  if (index < 0 || swapWith < 0 || swapWith >= jobs.length) return;
  [jobs[index], jobs[swapWith]] = [jobs[swapWith], jobs[index]];
  await Promise.all(
    jobs.map((j, i) => (j.sortOrder === i * 10 ? null : updateDoc(`jobs/${encodeURIComponent(j.id)}`, { sortOrder: i * 10 }))),
  );
  await audit(admin.email, "job.reorder", "job", id, { direction: direction === -1 ? "up" : "down" });
  revalidatePath("/admin/jobs");
}

export async function deleteJobAction(formData: FormData): Promise<void> {
  const admin = await requireOwner();
  const id = String(formData.get("id") ?? "");
  const job = await getJob(id);
  if (!job) return;
  await deleteDoc(`jobs/${encodeURIComponent(id)}`);
  await audit(admin.email, "job.delete", "job", id, { title: job.title });
  revalidatePath("/admin/jobs");
}

export async function seedJobsAction(): Promise<void> {
  const admin = await requireOwner();
  if ((await listAllJobs()).length > 0) return;
  const now = new Date().toISOString();
  for (const [i, job] of SEED_JOBS.entries()) {
    const { id, ...rest } = job;
    await createDoc("jobs", id, {
      ...rest,
      status: "published",
      sortOrder: i * 10,
      publishedAt: now,
      updatedBy: admin.email,
      createdAt: now,
      updatedAt: now,
    });
  }
  await audit(admin.email, "job.seed", "job", undefined, { count: SEED_JOBS.length });
  revalidatePath("/admin/jobs");
}

// ---------- applications ----------
const ApplicationPatch = z.object({
  id: z.string().min(1),
  status: z.enum(APPLICATION_STATUSES),
  notes: z.string().max(5000),
});

export async function updateApplicationAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const admin = await requireAdmin();
  const parsed = ApplicationPatch.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: "Invalid input." };
  const { id, status, notes } = parsed.data;
  const existing = await getApplication(id);
  if (!existing) return { error: "Application not found." };
  await updateApplication(id, { status, notes });
  await audit(admin.email, "application.update", "application", id, { from: existing.status, to: status });
  revalidatePath("/admin/applications");
  return { ok: "Saved." };
}

export async function deleteApplicationAction(formData: FormData): Promise<void> {
  const admin = await requireOwner();
  const id = String(formData.get("id") ?? "");
  const existing = await getApplication(id);
  if (!existing) return;
  await deleteApplication(id);
  await audit(admin.email, "application.delete", "application", id, { jobTitle: existing.jobTitle });
  revalidatePath("/admin/applications");
  redirect("/admin/applications");
}

export async function purgeRejectedAction(): Promise<void> {
  const admin = await requireOwner();
  const removed = await purgeRejectedApplications(12);
  await audit(admin.email, "application.purge_rejected", "application", undefined, { removed });
  revalidatePath("/admin/applications");
}

// ---------- messages ----------
const MessagePatch = z.object({
  id: z.string().min(1),
  status: z.enum(MESSAGE_STATUSES),
  notes: z.string().max(5000),
});

export async function updateMessageAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const admin = await requireAdmin();
  const parsed = MessagePatch.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: "Invalid input." };
  const { id, status, notes } = parsed.data;
  const existing = await getMessage(id);
  if (!existing) return { error: "Message not found." };
  await updateMessage(id, { status, notes });
  await audit(admin.email, "message.update", "message", id, { from: existing.status, to: status });
  revalidatePath("/admin/messages");
  return { ok: "Saved." };
}

export async function deleteMessageAction(formData: FormData): Promise<void> {
  const admin = await requireOwner();
  const id = String(formData.get("id") ?? "");
  const existing = await getMessage(id);
  if (!existing) return;
  await deleteMessage(id);
  await audit(admin.email, "message.delete", "message", id);
  revalidatePath("/admin/messages");
  redirect("/admin/messages");
}

// ---------- admins (owner only) ----------
const AdminSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(200),
  role: z.enum(["owner", "editor"]),
});

export async function addAdminAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const owner = await requireOwner();
  const parsed = AdminSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: "Enter a valid email and role." };
  const { email, role } = parsed.data;
  const now = new Date().toISOString();
  await setDoc(`admins/${encodeURIComponent(email)}`, { role, addedBy: owner.email, createdAt: now });
  await audit(owner.email, "admin.add", "admin", email, { role });
  revalidatePath("/admin/settings");
  return { ok: `${email} added as ${role}.` };
}

export async function removeAdminAction(formData: FormData): Promise<void> {
  const owner = await requireOwner();
  const email = String(formData.get("email") ?? "").toLowerCase();
  if (!email || email === owner.email.toLowerCase()) return; // never remove yourself
  await deleteDoc(`admins/${encodeURIComponent(email)}`);
  await audit(owner.email, "admin.remove", "admin", email);
  revalidatePath("/admin/settings");
}
