import Link from "next/link";
import { requireAdmin } from "@/lib/auth/require-admin";
import { listMessages } from "@/lib/inbox/server";
import { MESSAGE_STATUSES } from "@/lib/inbox/types";
import PageHeader from "@/components/admin/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const metadata = { title: "Messages" };

export default async function MessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  await requireAdmin();
  const { status, q } = await searchParams;
  const all = await listMessages();
  const needle = q?.trim().toLowerCase() ?? "";
  const rows = all.filter(
    (m) =>
      (!status || m.status === status) &&
      (!needle || [m.name, m.email, m.company, m.topic].some((v) => v.toLowerCase().includes(needle))),
  );

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader title="Messages" description={`${all.length} contact form submissions.`} />

      <form className="mb-4 flex flex-wrap items-center gap-2" role="search">
        <input
          name="q"
          defaultValue={q}
          placeholder="Search name, email, company or topic"
          className="h-9 w-72 rounded-md border border-input bg-background px-3 text-sm"
        />
        <select name="status" defaultValue={status ?? ""} className="h-9 rounded-md border border-input bg-background px-2 text-sm capitalize">
          <option value="">All statuses</option>
          {MESSAGE_STATUSES.map((s) => (
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
              <TableHead>From</TableHead>
              <TableHead>Topic</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Received</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="py-10 text-center text-muted-foreground">
                  No messages match.
                </TableCell>
              </TableRow>
            ) : (
              rows.map((m) => (
                <TableRow key={m.id}>
                  <TableCell>
                    <Link href={`/admin/messages/${m.id}`} className="font-medium hover:underline">
                      {m.name}
                    </Link>
                    <p className="text-xs text-muted-foreground">
                      {m.email}
                      {m.company ? ` · ${m.company}` : ""}
                    </p>
                  </TableCell>
                  <TableCell>{m.topic}</TableCell>
                  <TableCell>
                    <Badge variant={m.status === "new" ? "default" : "outline"} className="capitalize">
                      {m.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(m.createdAt).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}
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
