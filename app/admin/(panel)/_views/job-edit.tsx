import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth/require-admin";
import { getJob } from "@/lib/jobs/server";
import PageHeader from "@/components/admin/PageHeader";
import JobForm from "@/components/admin/JobForm";

export const metadata = { title: "Edit job" };

export default async function EditJobPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const job = await getJob(decodeURIComponent(id));
  if (!job) notFound();

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader title={job.title} description={`Last updated by ${job.updatedBy}`} />
      <JobForm job={job} />
    </div>
  );
}
