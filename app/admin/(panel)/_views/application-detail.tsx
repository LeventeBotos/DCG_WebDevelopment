import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth/require-admin";
import { getApplication } from "@/lib/inbox/server";
import { APPLICATION_STATUSES } from "@/lib/inbox/types";
import { safeHref } from "@/lib/safe-url";
import { deleteApplicationAction, updateApplicationAction } from "../actions";
import EmailCandidateForm from "@/components/admin/EmailCandidateForm";
import InboxUpdateForm from "@/components/admin/InboxUpdateForm";
import TagsForm from "@/components/admin/TagsForm";
import PageHeader from "@/components/admin/PageHeader";
import ConfirmButton from "@/components/admin/ConfirmButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = { title: "Application" };

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 break-words text-sm">{children || "—"}</dd>
    </div>
  );
}

function ExternalLink({ url }: { url: string }) {
  const href = safeHref(url);
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer nofollow" className="text-primary underline-offset-4 hover:underline">
      {url}
    </a>
  ) : (
    <>{url}</>
  );
}

export default async function ApplicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  const { id } = await params;
  const a = await getApplication(decodeURIComponent(id));
  if (!a || a.deletedAt) notFound();

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title={a.name}
        description={`${a.jobTitle} · received ${new Date(a.createdAt).toLocaleString("en-GB")}`}
        actions={
          admin.role === "owner" ? (
            <form action={deleteApplicationAction}>
              <input type="hidden" name="id" value={a.id} />
              <ConfirmButton
                variant="destructive"
                title={`Move ${a.name}’s application to Trash?`}
                description="You can restore it from Trash for 30 days, after which the application and CV are permanently deleted."
                confirmLabel="Move to Trash"
              >
                Delete candidate
              </ConfirmButton>
            </form>
          ) : null
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Candidate</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid gap-4 sm:grid-cols-2">
                <Field label="Email">
                  <a href={`mailto:${a.email}`} className="text-primary underline-offset-4 hover:underline">
                    {a.email}
                  </a>
                </Field>
                <Field label="Location">{a.location}</Field>
                <Field label="Experience">{a.experience}</Field>
                <Field label="Notice period">{a.noticePeriod}</Field>
                <Field label="CV file">
                  {a.cvFileName ? (
                    <a
                      href={`/api/admin/applications/${a.id}/cv`}
                      className="text-primary underline-offset-4 hover:underline"
                    >
                      Download {a.cvFileName} ({Math.max(1, Math.round((a.cvSize ?? 0) / 1024))} KB)
                    </a>
                  ) : (
                    ""
                  )}
                </Field>
                <Field label="CV link">{a.resumeUrl ? <ExternalLink url={a.resumeUrl} /> : ""}</Field>
                <Field label="LinkedIn">{a.linkedin ? <ExternalLink url={a.linkedin} /> : ""}</Field>
                <Field label="Portfolio">{a.portfolio ? <ExternalLink url={a.portfolio} /> : ""}</Field>
                <Field label="Source">
                  {[a.utmSource, a.utmMedium, a.utmCampaign].filter(Boolean).join(" / ")}
                </Field>
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Email the candidate</CardTitle>
            </CardHeader>
            <CardContent>
              <EmailCandidateForm applicationId={a.id} name={a.name} role={a.jobTitle} email={a.email} />
              {(a.communications ?? []).length > 0 ? (
                <div className="mt-6 border-t pt-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Sent so far</p>
                  <ul className="space-y-2 text-sm">
                    {[...(a.communications ?? [])].reverse().map((c) => (
                      <li key={c.at} className="rounded-md border p-3">
                        <p className="font-medium">{c.subject}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(c.at).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })} · {c.by}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Why this role</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Plain text, preserved line breaks; never rendered as HTML. */}
              <p className="whitespace-pre-wrap text-sm leading-relaxed">{a.message}</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="text-base">Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <TagsForm applicationId={a.id} tags={a.tags ?? []} />
          </CardContent>
        </Card>
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="text-base">Review</CardTitle>
          </CardHeader>
          <CardContent>
            <InboxUpdateForm
              action={updateApplicationAction}
              id={a.id}
              statuses={APPLICATION_STATUSES}
              status={a.status}
              notes={a.notes}
            />
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  );
}
