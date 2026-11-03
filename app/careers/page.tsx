import CareersClient from "@/components/careers/CareersClient";
import { getPublishedJobs } from "@/lib/jobs/server";

// Jobs are managed in the admin panel, so this page is rendered on demand from Firestore.
export const runtime = "edge";
export const dynamic = "force-dynamic";

export default async function CareersPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const [jobs, { role }] = await Promise.all([getPublishedJobs(), searchParams]);
  return <CareersClient jobs={jobs} initialApplyId={role} />;
}
