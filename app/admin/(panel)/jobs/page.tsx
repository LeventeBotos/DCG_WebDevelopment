import Link from "next/link";
import { ArrowDown, ArrowUp } from "lucide-react";
import { requireAdmin } from "@/lib/auth/require-admin";
import { listAllJobs } from "@/lib/jobs/server";
import { categoryMeta, type Job } from "@/lib/jobs/types";
import { deleteJobAction, moveJobAction, seedJobsAction, setJobStatusAction } from "../actions";
import PageHeader from "@/components/admin/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const metadata = { title: "Jobs" };

const statusVariant = { published: "default", draft: "outline", archived: "secondary" } as const;

function StatusButton({ job, status, label }: { job: Job; status: Job["status"]; label: string }) {
  return (
    <form action={setJobStatusAction}>
      <input type="hidden" name="id" value={job.id} />
      <input type="hidden" name="status" value={status} />
      <Button type="submit" size="sm" variant="ghost" showArrow={false}>
        {label}
      </Button>
    </form>
  );
}

export default async function JobsPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const admin = await requireAdmin();
  const { status } = await searchParams;
  const all = await listAllJobs();
  const jobs = status && ["draft", "published", "archived"].includes(status) ? all.filter((j) => j.status === status) : all;

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        title="Jobs"
        description="Create, edit and publish the roles shown on the careers page."
        actions={
          <Button asChild variant="primary" showArrow={false}>
            <Link href="/admin/jobs/new">New job</Link>
          </Button>
        }
      />

      <div className="mb-4 flex flex-wrap gap-2 text-sm">
        {[
          ["", "All"],
          ["published", "Published"],
          ["draft", "Drafts"],
          ["archived", "Archived"],
        ].map(([value, label]) => (
          <Link
            key={value}
            href={value ? `/admin/jobs?status=${value}` : "/admin/jobs"}
            className={`rounded-full border px-3 py-1 ${(status ?? "") === value ? "bg-foreground text-background" : "hover:bg-muted"}`}
          >
            {label}
          </Link>
        ))}
      </div>

      {all.length === 0 ? (
        <div className="rounded-xl border border-dashed p-10 text-center">
          <p className="font-medium">No jobs in the database yet.</p>
          <p className="mt-1 text-sm text-muted-foreground">
            The public site is showing the original three roles. Import them to start managing them here.
          </p>
          {admin.role === "owner" ? (
            <form action={seedJobsAction} className="mt-4">
              <Button type="submit" variant="primary" showArrow={false}>
                Import the 3 existing roles
              </Button>
            </form>
          ) : null}
        </div>
      ) : (
        <div className="rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell>
                    <Link href={`/admin/jobs/${job.id}`} className="font-medium hover:underline">
                      {job.title}
                    </Link>
                    <p className="text-xs text-muted-foreground">{job.location}</p>
                  </TableCell>
                  <TableCell>{categoryMeta[job.category].label}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[job.status]} className="capitalize">
                      {job.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(job.updatedAt).toLocaleDateString("en-GB")}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap items-center justify-end gap-1">
                      {job.status !== "published" ? <StatusButton job={job} status="published" label="Publish" /> : <StatusButton job={job} status="draft" label="Unpublish" />}
                      {job.status !== "archived" ? <StatusButton job={job} status="archived" label="Archive" /> : null}
                      {(["up", "down"] as const).map((direction) => (
                        <form key={direction} action={moveJobAction}>
                          <input type="hidden" name="id" value={job.id} />
                          <input type="hidden" name="direction" value={direction} />
                          <Button type="submit" size="icon" variant="ghost" showArrow={false} aria-label={`Move ${job.title} ${direction}`} className="h-8 w-8">
                            {direction === "up" ? <ArrowUp /> : <ArrowDown />}
                          </Button>
                        </form>
                      ))}
                      {admin.role === "owner" ? (
                        <form action={deleteJobAction}>
                          <input type="hidden" name="id" value={job.id} />
                          <Button type="submit" size="sm" variant="ghost" showArrow={false} className="text-destructive">
                            Delete
                          </Button>
                        </form>
                      ) : null}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
