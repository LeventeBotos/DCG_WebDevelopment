"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { audit } from "@/lib/audit";
import { requireAdmin, requireOwner } from "@/lib/auth/require-admin";
import { createDoc, deleteDoc, setDoc, updateDoc } from "@/lib/firestore/rest";
import { emailShell, escapeHtml, notifyAddress, sendEmail } from "@/lib/email";
import { buildDigest } from "@/lib/digest";
import { runMaintenance } from "@/lib/maintenance";
import { clearCampaignCache } from "@/lib/analytics/collector";
import { fieldSafe } from "@/lib/analytics/vocab";
import { CANDIDATE_TEMPLATES, normalizeTags } from "@/lib/inbox/templates";
import { isTrashEntity, purgeExpiredTrash, purgeForever, restore, softDelete } from "@/lib/trash";
import { createJob, getJob, listAllJobs, setJobStatus, updateJob, type JobInput } from "@/lib/jobs/server";
import { SEED_JOBS } from "@/lib/jobs/seed";
import { JOB_CATEGORIES, JOB_STATUSES, SALARY_PERIODS } from "@/lib/jobs/types";
import {
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
  closesAt: z
    .string()
    .trim()
    .refine((v) => v === "" || /^\d{4}-\d{2}-\d{2}$/.test(v), "Closing date must be a valid date")
    .transform((v) => (v === "" ? null : v)),
  salaryMin: z.string().trim().transform((v) => (v === "" ? null : Number(v))).pipe(z.number().int().min(0).max(10_000_000).nullable()),
  salaryMax: z.string().trim().transform((v) => (v === "" ? null : Number(v))).pipe(z.number().int().min(0).max(10_000_000).nullable()),
  salaryCurrency: z.string().trim().toUpperCase().regex(/^[A-Z]{3}$/, "Currency must be a 3-letter code").default("GBP"),
  salaryPeriod: z.enum(SALARY_PERIODS).default("YEAR"),
  remote: z.string().optional().transform((v) => v === "on"),
  addressLocality: z.string().trim().max(80).default(""),
  addressCountry: z.string().trim().toUpperCase().regex(/^[A-Z]{2}$/, "Country must be a 2-letter code").default("GB"),
}).refine((d) => d.salaryMin === null || d.salaryMax === null || d.salaryMin <= d.salaryMax, {
  message: "Minimum salary cannot be higher than the maximum",
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
  await softDelete("job", id, admin.email);
  await audit(admin.email, "job.trash", "job", id, { title: job.title });
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
  await softDelete("application", id, admin.email);
  await audit(admin.email, "application.trash", "application", id, { jobTitle: existing.jobTitle });
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
  await softDelete("message", id, admin.email);
  await audit(admin.email, "message.trash", "message", id);
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

// ---------- trash (owner only) ----------
export async function restoreAction(formData: FormData): Promise<void> {
  const owner = await requireOwner();
  const entity = formData.get("entity");
  const id = String(formData.get("id") ?? "");
  if (!isTrashEntity(entity) || !id) return;
  await restore(entity, id);
  await audit(owner.email, `${entity}.restore`, entity, id);
  revalidatePath("/admin", "layout");
}

export async function purgeForeverAction(formData: FormData): Promise<void> {
  const owner = await requireOwner();
  const entity = formData.get("entity");
  const id = String(formData.get("id") ?? "");
  if (!isTrashEntity(entity) || !id) return;
  await purgeForever(entity, id);
  await audit(owner.email, `${entity}.purge`, entity, id);
  revalidatePath("/admin/trash");
}

export async function emptyExpiredTrashAction(): Promise<void> {
  const owner = await requireOwner();
  const removed = await purgeExpiredTrash();
  await audit(owner.email, "trash.purge_expired", "trash", undefined, { removed });
  revalidatePath("/admin/trash");
}

// ---------- candidate workflow ----------
const EmailSchema = z.object({
  id: z.string().min(1),
  templateId: z.string().min(1).max(40),
  subject: z.string().trim().min(1, "Add a subject").max(200),
  body: z.string().trim().min(1, "Write a message").max(5000),
  updateStatus: z.string().optional(),
});

/** Sends an email to the candidate (replies go to the shared inbox) and records it on the application. */
export async function emailCandidateAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const admin = await requireAdmin();
  const parsed = EmailSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Please check the form." };
  const { id, templateId, subject, body, updateStatus } = parsed.data;

  const application = await getApplication(id);
  if (!application || application.deletedAt) return { error: "Application not found." };

  const paragraphs = body
    .split(/\n{2,}/)
    .map((p) => `<p style="margin:0 0 14px;">${escapeHtml(p).replace(/\n/g, "<br />")}</p>`)
    .join("");
  const sent = await sendEmail({
    to: application.email,
    subject,
    html: emailShell("Data Consulting Group", paragraphs, "Careers"),
    text: body,
    replyTo: notifyAddress(),
  });
  if (!sent.ok) return { error: `Could not send the email: ${sent.error}` };

  const template = CANDIDATE_TEMPLATES.find((t) => t.id === templateId);
  const communications = [...(application.communications ?? []), { at: new Date().toISOString(), by: admin.email, templateId, subject, body }];
  const patchData: Parameters<typeof updateApplication>[1] = { communications };
  if (updateStatus === "on" && template?.status) patchData.status = template.status;
  await updateApplication(id, patchData);
  await audit(admin.email, "application.email", "application", id, { template: templateId, statusChanged: patchData.status ?? null });
  revalidatePath(`/admin/applications/${id}`);
  return { ok: patchData.status ? `Sent. Status set to ${patchData.status}.` : "Sent." };
}

export async function updateTagsAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const admin = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Missing application." };
  const tags = normalizeTags(String(formData.get("tags") ?? ""));
  await updateApplication(id, { tags });
  await audit(admin.email, "application.tags", "application", id, { tags });
  revalidatePath(`/admin/applications/${id}`);
  return { ok: "Tags saved." };
}

// ---------- sessions ----------
/** Invalidate every session this account has ever been issued (cookies issued before now stop working). */
async function revokeSessions(email: string) {
  await setDoc(`adminSessions/${encodeURIComponent(email.toLowerCase())}`, { validAfter: new Date().toISOString() });
}

export async function signOutEverywhereAction(): Promise<void> {
  const admin = await requireAdmin();
  await revokeSessions(admin.email);
  await audit(admin.email, "auth.sign_out_everywhere", "auth", admin.email);
}

export async function forceSignOutAction(formData: FormData): Promise<void> {
  const owner = await requireOwner();
  const email = String(formData.get("email") ?? "").toLowerCase();
  if (!email) return;
  await revokeSessions(email);
  await audit(owner.email, "auth.force_sign_out", "auth", email);
  revalidatePath("/admin/settings");
}

// ---------- owner tools ----------
const CampaignSchema = z.object({ names: z.string().max(2000) });

/** Campaign names are the only free-text analytics dimension, so they are allowlisted here. */
export async function saveCampaignsAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const owner = await requireOwner();
  const parsed = CampaignSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: "Invalid input." };
  const names = [...new Set(parsed.data.names.split(/[\n,]/).map((n) => fieldSafe(n)).filter(Boolean))].slice(0, 50);
  await setDoc("config/campaigns", { names, updatedBy: owner.email, updatedAt: new Date().toISOString() });
  clearCampaignCache();
  await audit(owner.email, "analytics.campaigns", "config", "campaigns", { count: names.length });
  revalidatePath("/admin/settings");
  return { ok: `Saved ${names.length} campaign${names.length === 1 ? "" : "s"}.` };
}

export async function sendTestDigestAction(_prev: ActionState): Promise<ActionState> {
  const owner = await requireOwner();
  const digest = await buildDigest();
  const result = await sendEmail({ to: owner.email, ...digest });
  await audit(owner.email, "digest.test", "email", undefined, { ok: result.ok });
  return result.ok ? { ok: `Sent to ${owner.email}.` } : { error: result.error };
}

export async function runMaintenanceAction(_prev: ActionState): Promise<ActionState> {
  const owner = await requireOwner();
  const result = await runMaintenance();
  await audit(owner.email, "maintenance.run", "system", undefined, result as Record<string, unknown>);
  return { ok: JSON.stringify(result) };
}
