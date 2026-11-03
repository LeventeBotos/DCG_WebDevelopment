import { countDocs, createDoc, getDoc, queryDocs, updateDoc } from "@/lib/firestore/rest";
import { SEED_JOBS } from "./seed";
import { toPublicJob, type Job, type JobCategory, type JobStatus, type PublicJob } from "./types";

/** Server-only job data access. Sorting is done in memory (tiny collection) to avoid composite indexes. */

const bySort = (a: Job, b: Job) => a.sortOrder - b.sortOrder || a.title.localeCompare(b.title);

export async function listAllJobs(): Promise<Job[]> {
  const jobs = await queryDocs<Omit<Job, "id">>("jobs", { limit: 500 });
  return (jobs as Job[]).sort(bySort);
}

export async function getJob(id: string): Promise<Job | null> {
  return (await getDoc<Omit<Job, "id">>(`jobs/${encodeURIComponent(id)}`)) as Job | null;
}

/** True until the first job is created/imported: lets the public site keep showing the original roles. */
async function isUnseeded(): Promise<boolean> {
  return (await countDocs("jobs")) === 0;
}

/**
 * Published jobs for the public site. Falls back to the original static roles if Firestore errors, or while
 * the jobs collection has never been populated (so deploying never blanks the careers page).
 */
export async function getPublishedJobs(): Promise<PublicJob[]> {
  try {
    const jobs = await queryDocs<Omit<Job, "id">>("jobs", {
      where: [{ field: "status", op: "EQUAL", value: "published" }],
      limit: 200,
    });
    if (jobs.length === 0 && (await isUnseeded())) return SEED_JOBS;
    return (jobs as Job[]).sort(bySort).map(toPublicJob);
  } catch (error) {
    console.error("[jobs] Falling back to static roles:", error instanceof Error ? error.message : error);
    return SEED_JOBS;
  }
}

export async function getPublishedJob(id: string): Promise<PublicJob | null> {
  try {
    const job = await getJob(id);
    if (!job && (await isUnseeded())) return SEED_JOBS.find((j) => j.id === id) ?? null;
    return job && job.status === "published" ? toPublicJob(job) : null;
  } catch {
    return SEED_JOBS.find((j) => j.id === id) ?? null;
  }
}

export type JobInput = {
  title: string;
  category: JobCategory;
  location: string;
  employmentType: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  status: JobStatus;
  sortOrder: number;
};

export function slugify(input: string): string {
  return (
    input
      .toLowerCase()
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "role"
  );
}

/** Creates a job with a unique slug-id. Appends -2, -3 ... on collision. */
export async function createJob(input: JobInput, actor: string, desiredSlug?: string): Promise<string> {
  const base = slugify(desiredSlug || input.title);
  const now = new Date().toISOString();
  const data = {
    ...input,
    publishedAt: input.status === "published" ? now : null,
    updatedBy: actor,
    createdAt: now,
    updatedAt: now,
  };
  for (let i = 1; i <= 20; i++) {
    const id = i === 1 ? base : `${base}-${i}`;
    if (await createDoc("jobs", id, data)) return id;
  }
  throw new Error("Could not allocate a unique slug");
}

export async function updateJob(id: string, input: JobInput, actor: string, previous: Job): Promise<void> {
  const now = new Date().toISOString();
  const becamePublished = input.status === "published" && previous.status !== "published";
  await updateDoc(`jobs/${encodeURIComponent(id)}`, {
    ...input,
    publishedAt: becamePublished ? now : previous.publishedAt,
    updatedBy: actor,
    updatedAt: now,
  });
}

export async function setJobStatus(id: string, status: JobStatus, actor: string, previous: Job): Promise<void> {
  const now = new Date().toISOString();
  await updateDoc(`jobs/${encodeURIComponent(id)}`, {
    status,
    publishedAt: status === "published" && previous.status !== "published" ? now : previous.publishedAt,
    updatedBy: actor,
    updatedAt: now,
  });
}
