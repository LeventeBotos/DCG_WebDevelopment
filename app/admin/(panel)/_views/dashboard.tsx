import Link from "next/link";
import { Briefcase, FileText, Inbox, Mail } from "lucide-react";
import { requireAdmin } from "@/lib/auth/require-admin";
import { countNew, listApplications } from "@/lib/inbox/server";
import { listAllJobs } from "@/lib/jobs/server";
import StatCard from "@/components/admin/StatCard";
import PageHeader from "@/components/admin/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    console.error("[admin/dashboard]", error instanceof Error ? error.message : error);
    return fallback;
  }
}

export default async function DashboardPage() {
  const admin = await requireAdmin();
  const [jobs, newApplications, newMessages, recent] = await Promise.all([
    safe(() => listAllJobs(), []),
    safe(() => countNew("applications"), 0),
    safe(() => countNew("contactMessages"), 0),
    safe(() => listApplications(6), []),
  ]);
  const published = jobs.filter((j) => j.status === "published").length;
  const drafts = jobs.filter((j) => j.status === "draft").length;

  const name = admin.email.split("@")[0];

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader title={`Welcome back, ${name}`} description="Here is what needs your attention." />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Published jobs" value={published} hint={`${drafts} draft${drafts === 1 ? "" : "s"}`} icon={<Briefcase className="size-4" />} href="/admin/jobs" />
        <StatCard label="New applications" value={newApplications} hint="Awaiting review" icon={<Inbox className="size-4" />} href="/admin/applications" />
        <StatCard label="New messages" value={newMessages} hint="Contact form" icon={<Mail className="size-4" />} href="/admin/messages" />
        <StatCard label="Analytics" value="View" hint="Traffic and careers funnel" icon={<FileText className="size-4" />} href="/admin/analytics" />
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">Latest applications</CardTitle>
        </CardHeader>
        <CardContent>
          {recent.length === 0 ? (
            <p className="text-sm text-muted-foreground">No applications yet.</p>
          ) : (
            <ul className="divide-y">
              {recent.map((a) => (
                <li key={a.id} className="flex items-center justify-between gap-3 py-3">
                  <Link href={`/admin/applications/${a.id}`} className="min-w-0 hover:underline">
                    <p className="truncate font-medium">{a.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {a.jobTitle} · {new Date(a.createdAt).toLocaleDateString("en-GB")}
                    </p>
                  </Link>
                  <Badge variant={a.status === "new" ? "default" : "outline"} className="capitalize">
                    {a.status}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
