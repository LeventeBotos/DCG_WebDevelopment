import Link from "next/link";
import { requireAdmin } from "@/lib/auth/require-admin";
import { listApplications } from "@/lib/inbox/server";
import { APPLICATION_STATUSES } from "@/lib/inbox/types";
import { purgeRejectedAction } from "../actions";
import PageHeader from "@/components/admin/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const metadata = { title: "Applications" };

export default async function ApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  const admin = await requireAdmin();
  const { status, q } = await searchParams;
  const all = await listApplications();
  const needle = q?.trim().toLowerCase() ?? "";
  const rows = all.filter(
    (a) =>
      (!status || a.status === status) &&
      (!needle || [a.name, a.email, a.jobTitle].some((v) => v.toLowerCase().includes(needle))),
  );

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        title="Applications"
        description={`${all.length} total · stored securely; rejected applications can be purged after 12 months.`}
        actions={
          admin.role === "owner" ? (
            <>
              <Button asChild variant="outline" size="sm" showArrow={false}>
                <a href="/api/admin/export/applications">Export CSV</a>
              </Button>
              <form action={purgeRejectedAction}>
                <Button type="submit" variant="outline" size="sm" showArrow={false}>
                  Purge rejected (&gt;12 months)
                </Button>
              </form>
            </>
          ) : null
        }
      />

      <form className="mb-4 flex flex-wrap items-center gap-2" role="search">
        <input
          name="q"
          defaultValue={q}
          placeholder="Search name, email or role"
          className="h-9 w-64 rounded-md border border-input bg-background px-3 text-sm"
        />
        <select name="status" defaultValue={status ?? ""} className="h-9 rounded-md border border-input bg-background px-2 text-sm capitalize">
          <option value="">All statuses</option>
          {APPLICATION_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <Button type="submit" size="sm" variant="outline" showArrow={false}>
          Filter
        </Button>
      </form>

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
