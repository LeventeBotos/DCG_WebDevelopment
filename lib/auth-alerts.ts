import { emailShell, escapeHtml, sendEmail } from "@/lib/email";

/** Emails the owners when someone repeatedly tries to sign in with a Google account that is not allowed. */
export async function alertOwnersOfDeniedLogins(details: { email: string; country: string; attempts: number }) {
  const owners = (process.env.ADMIN_OWNER_EMAILS ?? "").split(",").map((e) => e.trim()).filter(Boolean);
  if (owners.length === 0) return;
  const rows = [
    ["Account tried", details.email || "(token could not be verified)"],
    ["Attempts this hour", String(details.attempts)],
    ["Country", details.country || "unknown"],
    ["Time (UTC)", new Date().toISOString()],
  ];
  const html = emailShell(
    "Repeated denied admin sign-ins",
    `<p>Someone has tried to sign in to the admin panel several times and was refused. If this was not you or a teammate, no action is needed beyond awareness: access is still restricted to the allowlist.</p>
     <table role="presentation" style="font-size:14px;">${rows.map(([k, v]) => `<tr><td style="padding:4px 16px 4px 0;color:#64748b;">${escapeHtml(k)}</td><td style="padding:4px 0;font-weight:600;">${escapeHtml(v)}</td></tr>`).join("")}</table>`,
    "DCG security alert",
  );
  await sendEmail({ to: owners, subject: "Security alert: repeated denied admin sign-ins", html, text: rows.map(([k, v]) => `${k}: ${v}`).join("\n") });
}
