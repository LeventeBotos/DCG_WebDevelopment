import { audit } from "@/lib/audit";
import { requireAdminApi } from "@/lib/auth/require-admin";
import { listApplications } from "@/lib/inbox/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

/** Neutralise spreadsheet formula injection: cells starting with = + - @ are prefixed with an apostrophe. */
function cell(value: unknown): string {
  let s = String(value ?? "");
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
}

export async function GET() {
  const auth = await requireAdminApi("owner");
  if ("response" in auth) return auth.response;

  const rows = await listApplications(5000);
  const header = ["Received", "Role", "Name", "Email", "Location", "Experience", "Notice period", "Status", "CV file", "CV link", "LinkedIn", "Portfolio", "Source"];
  const lines = [
    header.map(cell).join(","),
    ...rows.map((a) =>
      [
        a.createdAt,
        a.jobTitle,
        a.name,
        a.email,
        a.location,
        a.experience,
        a.noticePeriod,
        a.status,
        a.cvFileName ?? "",
        a.resumeUrl,
        a.linkedin,
        a.portfolio,
        [a.utmSource, a.utmMedium, a.utmCampaign].filter(Boolean).join("/"),
      ]
        .map(cell)
        .join(","),
    ),
  ];
  await audit(auth.admin.email, "application.export", "application", undefined, { rows: rows.length });

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="applications-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex",
    },
  });
}
