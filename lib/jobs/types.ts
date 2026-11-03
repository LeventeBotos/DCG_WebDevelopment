/** Client-safe job types and metadata (no server imports). Dates are ISO strings so they serialise cleanly. */

export type JobCategory = "ai" | "cloud" | "data";
export type JobStatus = "draft" | "published" | "archived";

export const JOB_CATEGORIES: JobCategory[] = ["ai", "cloud", "data"];
export const JOB_STATUSES: JobStatus[] = ["draft", "published", "archived"];

export const categoryMeta: Record<JobCategory, { label: string; description: string; panel: string }> = {
  ai: {
    label: "AI",
    description: "Modeling, LLM products, and intelligent automation roles.",
    panel: "from-emerald-100/80 to-emerald-50/30 border-emerald-200/80",
  },
  cloud: {
    label: "Cloud",
    description: "Platform, reliability, security, and infrastructure delivery.",
    panel: "from-violet-100/80 to-violet-50/30 border-violet-200/80",
  },
  data: {
    label: "Data",
    description: "Data strategy, analytics, governance, and enablement work.",
    panel: "from-sky-100/80 to-sky-50/30 border-sky-200/80",
  },
};

export const SALARY_PERIODS = ["YEAR", "MONTH", "HOUR"] as const;
export type SalaryPeriod = (typeof SALARY_PERIODS)[number];

/** The document id is the slug, which makes slugs unique and immutable. */
export type Job = {
  id: string;
  title: string;
  category: JobCategory;
  location: string;
  employmentType: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  status: JobStatus;
  sortOrder: number;
  publishedAt: string | null;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  /** Set when moved to Trash; the record is hidden everywhere and purged after 30 days. */
  deletedAt?: string | null;
  /** Last day applications are accepted (YYYY-MM-DD, inclusive). The job closes automatically afterwards. */
  closesAt?: string | null;
  salaryMin?: number | null;
  salaryMax?: number | null;
  salaryCurrency?: string;
  salaryPeriod?: SalaryPeriod;
  remote?: boolean;
  addressLocality?: string;
  addressCountry?: string;
};

/** Open = published, not trashed, and not past its closing date. */
export function isJobOpen(
  job: Pick<Job, "status" | "closesAt" | "deletedAt">,
  now: Date = new Date(),
): boolean {
  if (job.status !== "published" || job.deletedAt) return false;
  return !job.closesAt || job.closesAt.slice(0, 10) >= now.toISOString().slice(0, 10);
}

/** Public shape: what the careers page needs, nothing internal. */
export type PublicJob = Pick<
  Job,
  | "id"
  | "title"
  | "category"
  | "location"
  | "employmentType"
  | "summary"
  | "responsibilities"
  | "requirements"
  | "publishedAt"
  | "closesAt"
  | "salaryMin"
  | "salaryMax"
  | "salaryCurrency"
  | "salaryPeriod"
  | "remote"
  | "addressLocality"
  | "addressCountry"
>;

export function toPublicJob(job: Job): PublicJob {
  const {
    id, title, category, location, employmentType, summary, responsibilities, requirements,
    publishedAt, closesAt, salaryMin, salaryMax, salaryCurrency, salaryPeriod, remote, addressLocality, addressCountry,
  } = job;
  return {
    id, title, category, location, employmentType, summary, responsibilities, requirements,
    publishedAt, closesAt, salaryMin, salaryMax, salaryCurrency, salaryPeriod, remote, addressLocality, addressCountry,
  };
}
