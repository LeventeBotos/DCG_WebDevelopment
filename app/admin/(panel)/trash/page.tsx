import { requireOwner } from "@/lib/auth/require-admin";
import { listTrash, TRASH_RETENTION_DAYS } from "@/lib/trash";
import { emptyExpiredTrashAction, purgeForeverAction, restoreAction } from "../actions";
import ConfirmButton from "@/components/admin/ConfirmButton";
import PageHeader from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const metadata = { title: "Trash" };

export default async function TrashPage() {
  await requireOwner();
  const items = await listTrash().catch(() => []);

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title="Trash"
        description={`Deleted items are kept for ${TRASH_RETENTION_DAYS} days, then removed permanently.`}
        actions={
          <form action={emptyExpiredTrashAction}>
            <ConfirmButton
              variant="outline"
              title="Delete expired items now?"
              description={`Everything that has been in the trash for more than ${TRASH_RETENTION_DAYS} days is deleted permanently.`}
              confirmLabel="Delete permanently"
            >
              Purge expired
            </ConfirmButton>
          </form>
        }
      />
      <div className="rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Deleted</TableHead>
              <TableHead>By</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="py-10 text-center text-muted-foreground">
                  The trash is empty.
                </TableCell>
              </TableRow>
            ) : (
              items.map((item) => (
                <TableRow key={`${item.entity}-${item.id}`}>
                  <TableCell>
                    <p className="font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.sub}</p>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(item.deletedAt).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{item.deletedBy}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      <form action={restoreAction}>
                        <input type="hidden" name="entity" value={item.entity} />
                        <input type="hidden" name="id" value={item.id} />
                        <Button type="submit" size="sm" variant="outline" showArrow={false}>
                          Restore
                        </Button>
                      </form>
                      <form action={purgeForeverAction}>
                        <input type="hidden" name="entity" value={item.entity} />
                        <input type="hidden" name="id" value={item.id} />
                        <ConfirmButton
                          title={`Permanently delete ${item.label}?`}
                          description="This cannot be undone."
                          confirmLabel="Delete forever"
                          className="text-destructive"
                        >
                          Delete forever
                        </ConfirmButton>
                      </form>
                    </div>
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
