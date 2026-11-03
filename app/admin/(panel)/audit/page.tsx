import { requireAdmin } from "@/lib/auth/require-admin";
import { queryDocs } from "@/lib/firestore/rest";
import PageHeader from "@/components/admin/PageHeader";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const metadata = { title: "Audit log" };

type Entry = { actorEmail: string; action: string; entity: string; entityId: string | null; diff: Record<string, unknown> | null; at: string };

export default async function AuditPage() {
  await requireAdmin();
  const entries = await queryDocs<Entry>("auditLog", { orderBy: { field: "at", direction: "DESCENDING" }, limit: 200 }).catch(() => []);

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader title="Audit log" description="Every change made in the admin panel. Showing the latest 200 entries." />
      <div className="rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>When</TableHead>
              <TableHead>Who</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Target</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-10 text-center text-muted-foreground">
                  Nothing recorded yet.
                </TableCell>
              </TableRow>
            ) : (
              entries.map((e) => (
                <TableRow key={e.id}>
                  <TableCell className="whitespace-nowrap text-muted-foreground">
                    {new Date(e.at).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}
                  </TableCell>
                  <TableCell>{e.actorEmail}</TableCell>
                  <TableCell>
                    <code className="text-xs">{e.action}</code>
                  </TableCell>
                  <TableCell className="max-w-48 truncate">
                    {e.entity}
                    {e.entityId ? ` · ${decodeURIComponent(e.entityId)}` : ""}
                  </TableCell>
                  <TableCell className="max-w-72 truncate text-xs text-muted-foreground">
                    {e.diff ? JSON.stringify(e.diff) : ""}
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
