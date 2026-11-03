import { requireOwner } from "@/lib/auth/require-admin";
import { queryDocs } from "@/lib/firestore/rest";
import { removeAdminAction } from "../actions";
import AddAdminForm from "@/components/admin/AddAdminForm";
import PageHeader from "@/components/admin/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const metadata = { title: "Settings" };

export default async function SettingsPage() {
  const me = await requireOwner();
  const stored = await queryDocs<{ role?: string; addedBy?: string }>("admins", { limit: 100 }).catch(() => []);
  const bootstrap = (process.env.ADMIN_OWNER_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  const rows = new Map<string, { role: string; source: string }>();
  for (const email of bootstrap) rows.set(email, { role: "owner", source: "environment" });
  for (const d of stored) rows.set(decodeURIComponent(d.id).toLowerCase(), { role: d.role ?? "editor", source: d.addedBy ?? "panel" });

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <PageHeader title="Settings" description="Who can sign in to the admin panel." />

      <section className="space-y-3">
        <h2 className="text-base font-semibold">Admins</h2>
        <div className="rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Added by</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...rows.entries()].map(([email, info]) => (
                <TableRow key={email}>
                  <TableCell className="font-medium">
                    {email}
                    {email === me.email.toLowerCase() ? <span className="ml-2 text-xs text-muted-foreground">(you)</span> : null}
                  </TableCell>
                  <TableCell>
                    <Badge variant={info.role === "owner" ? "default" : "outline"} className="capitalize">
                      {info.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{info.source}</TableCell>
                  <TableCell className="text-right">
                    {email !== me.email.toLowerCase() ? (
                      <form action={removeAdminAction}>
                        <input type="hidden" name="email" value={email} />
                        <Button type="submit" size="sm" variant="ghost" showArrow={false} className="text-destructive">
                          Remove
                        </Button>
                      </form>
                    ) : null}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="text-xs text-muted-foreground">
          Owners listed under “environment” are set by <code>ADMIN_OWNER_EMAILS</code> and always keep access; removing them here
          has no effect. Changes to other admins apply on their next request.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-semibold">Add an admin</h2>
        <AddAdminForm />
      </section>
    </div>
  );
}
