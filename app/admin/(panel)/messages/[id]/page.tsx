import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth/require-admin";
import { getMessage } from "@/lib/inbox/server";
import { MESSAGE_STATUSES } from "@/lib/inbox/types";
import { deleteMessageAction, updateMessageAction } from "../../actions";
import InboxUpdateForm from "@/components/admin/InboxUpdateForm";
import PageHeader from "@/components/admin/PageHeader";
import ConfirmButton from "@/components/admin/ConfirmButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = { title: "Message" };

export default async function MessageDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  const { id } = await params;
  const m = await getMessage(decodeURIComponent(id));
  if (!m || m.deletedAt) notFound();

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title={m.name}
        description={`${m.topic} · received ${new Date(m.createdAt).toLocaleString("en-GB")}`}
        actions={
          <>
            <Button asChild variant="outline" size="sm" showArrow={false}>
              <a href={`mailto:${m.email}?subject=${encodeURIComponent(`Re: ${m.topic}`)}`}>Reply by email</a>
            </Button>
            {admin.role === "owner" ? (
              <form action={deleteMessageAction}>
                <input type="hidden" name="id" value={m.id} />
                <ConfirmButton
                  variant="destructive"
                  title="Move this message to Trash?"
                  description="You can restore it from Trash for 30 days."
                  confirmLabel="Move to Trash"
                >
                  Delete
                </ConfirmButton>
              </form>
            ) : null}
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Details</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid gap-4 sm:grid-cols-2 text-sm">
                {[
                  ["Email", m.email],
                  ["Phone", m.phone],
                  ["Company", m.company],
                  ["Country", m.country],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-xs uppercase tracking-wide text-muted-foreground">{label}</dt>
                    <dd className="mt-0.5 break-words">{value || "—"}</dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Message</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap text-sm leading-relaxed">{m.message}</p>
            </CardContent>
          </Card>
        </div>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="text-base">Handling</CardTitle>
          </CardHeader>
          <CardContent>
            <InboxUpdateForm action={updateMessageAction} id={m.id} statuses={MESSAGE_STATUSES} status={m.status} notes={m.notes} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
