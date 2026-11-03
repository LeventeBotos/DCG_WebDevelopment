import Link from "next/link";
import { requireAdmin } from "@/lib/auth/require-admin";
import { listApplications } from "@/lib/inbox/server";
import { APPLICATION_STATUSES } from "@/lib/inbox/types";
import { purgeRejectedAction } from "../actions";
import ConfirmButton from "@/components/admin/ConfirmButton";
import PageHeader from "@/components/admin/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const metadata = { title: "Applications" };

type Params = { status?: string; q?: string; job?: string; tag?: string; from?: string; to?: string };

export default async function ApplicationsPage({ searchParams }: { searchParams: Promise<Params> }) {
  const admin = await requireAdmin();
  const { status, q, job, tag, from, to } = await searchParams;
  const all = await listApplications();

  const jobs = [...new Map(all.map((a) => [a.jobId, a.jobTitle])).entries()].sort((a, b) => a[1].localeCompare(b[1]));
  const tags = [...new Set(all.flatMap((a) => a.tags ?? []))].sort();
  const needle = q?.trim().toLowerCase() ?? "";

  const rows = all.filter((a) => {
    if (status && a.status !== status) return false;
    if (job && a.jobId !== job) return false;
    if (tag && !(a.tags ?? []).includes(tag)) return false;
    if (from && a.createdAt.slice(0, 10) < from) return false;
    if (to && a.createdAt.slice(0, 10) > to) return false;
    if (needle && ![a.name, a.email, a.jobTitle, ...(a.tags ?? [])].some((v) => v.toLowerCase().includes(needle))) return false;
    return true;
  });
  const filtered = Boolean(status || job || tag || from || to || needle);

  const field = "h-9 rounded-md border border-input bg-background px-2 text-sm";

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        title="Applications"
        description={`${all.length} total · rejected applications are purged automatically after 12 months.`}
        actions={
          admin.role === "owner" ? (
            <form action={purgeRejectedAction}>
              <ConfirmButton
                variant="outline"
                title="Permanently delete old rejected applications?"
                description="Every rejected application not updated in the last 12 months, together with its CV, is deleted for good. This cannot be undone."
                confirmLabel="Delete permanently"
              >
                Purge rejected (&gt;12 months)
              </ConfirmButton>
            </form>
          ) : null
        }
      />

      <form className="mb-4 flex flex-wrap items-end gap-2" role="search">
        <input name="q" defaultValue={q} placeholder="Search name, email, role or tag" className={`${field} w-60`} />
        <select name="job" defaultValue={job ?? ""} className={field} aria-label="Role">
          <option value="">All roles</option>
          {jobs.map(([id, title]) => (
            <option key={id} value={id}>
              {title}
            </option>
          ))}
        </select>
        <select name="status" defaultValue={status ?? ""} className={`${field} capitalize`} aria-label="Status">
          <option value="">All statuses</option>
          {APPLICATION_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {tags.length > 0 ? (
          <select name="tag" defaultValue={tag ?? ""} className={field} aria-label="Tag">
            <option value="">All tags</option>
            {tags.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        ) : null}
        <label className="grid gap-0.5 text-xs text-muted-foreground">
          From
          <input type="date" name="from" defaultValue={from} className={field} />
        </label>
        <label className="grid gap-0.5 text-xs text-muted-foreground">
          To
          <input type="date" name="to" defaultValue={to} className={field} />
        </label>
        <Button type="submit" size="sm" variant="outline" showArrow={false}>
          Filter
        </Button>
        {filtered ? (
          <Button asChild size="sm" variant="ghost" showArrow={false}>
            <Link href="/admin/applications">Clear</Link>
          </Button>
        ) : null}
      </form>

      <p className="mb-2 text-xs text-muted-foreground">
        Showing {rows.length} of {all.length}
      </p>

      <div className="rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Candidate</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Received</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="py-10 text-center text-muted-foreground">
                  No applications match.
                </TableCell>
              </TableRow>
            ) : (
              rows.map((a) => (
                <TableRow key={a.id}>
                  <TableCell>
                    <Link href={`/admin/applications/${a.id}`} className="font-medium hover:underline">
                      {a.name}
                    </Link>
                    <p className="text-xs text-muted-foreground">{a.email}</p>
                    {(a.tags ?? []).length > 0 ? (
                      <div className="mt-1 flex flex-wrap gap-1">
                        {(a.tags ?? []).map((t) => (
                          <Link key={t} href={`/admin/applications?tag=${encodeURIComponent(t)}`} className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground hover:text-foreground">
                            {t}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </TableCell>
                  <TableCell>{a.jobTitle}</TableCell>
                  <TableCell>
                    <Badge variant={a.status === "new" ? "default" : "outline"} className="capitalize">
                      {a.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(a.createdAt).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
