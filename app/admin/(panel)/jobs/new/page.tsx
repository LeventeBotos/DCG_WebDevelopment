import { requireAdmin } from "@/lib/auth/require-admin";
import PageHeader from "@/components/admin/PageHeader";
import JobForm from "@/components/admin/JobForm";

export const metadata = { title: "New job" };

export default async function NewJobPage() {
  await requireAdmin();
  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader title="New job" description="Drafts are not visible on the public site until published." />
      <JobForm />
    </div>
  );
}
