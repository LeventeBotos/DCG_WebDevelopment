import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

export const runtime = "edge";

const OPEN_ROLES = [
  "ML Engineer",
  "Cloud Solutions Engineer",
  "Data & Analytics Consultant",
] as const;

const ApplicationSchema = z.object({
  role: z.enum(OPEN_ROLES),
  name: z.string().trim().min(1, "Name is required."),
  email: z.string().trim().email("Valid email is required."),
  location: z.string().trim().min(1, "Location is required."),
  linkedin: z.string().trim().optional(),
  portfolio: z.string().trim().optional(),
  resumeUrl: z.string().trim().url("Resume URL must be valid."),
  experience: z.string().trim().min(1, "Experience is required."),
  noticePeriod: z.string().trim().optional(),
  message: z
    .string()
    .trim()
    .min(30, "Please share at least 30 characters about your fit."),
  website: z.string().optional(),
});

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => {
    switch (char) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#39;";
      default:
        return char;
    }
  });

const normalizeOptional = (value?: string) => (value?.trim() ? value.trim() : "-");

const formatOptionalLink = (value?: string) => {
  const normalized = normalizeOptional(value);
  if (normalized === "-") return normalized;
  return normalized;
};

export async function POST(request: Request) {
  const requestId = crypto.randomUUID();
  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json(
      { error: "Invalid request body.", requestId },
      { status: 400 },
    );
  }

  const parsed = ApplicationSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please complete all required fields correctly.", requestId },
      { status: 400 },
    );
  }

  const {
    role,
    name,
    email,
    location,
    linkedin,
    portfolio,
    resumeUrl,
    experience,
    noticePeriod,
    message,
    website,
  } = parsed.data;

  if (website && website.trim().length > 0) {
    return NextResponse.json(
      { error: "Submission rejected.", requestId },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const defaultFrom = "DCG Careers <onboarding@resend.dev>";
  const from = process.env.RESEND_FROM ?? defaultFrom;
  const to =
    process.env.RESEND_CAREERS_TO ??
    process.env.RESEND_TO ??
    "botos.levente2007@gmail.com";

  if (!apiKey) {
    return NextResponse.json(
      { error: "Email service is not configured.", requestId },
      { status: 500 },
    );
  }

  const submittedAt = new Date().toISOString();
  const safe = {
    role: escapeHtml(role),
    name: escapeHtml(name),
    email: escapeHtml(email),
    location: escapeHtml(location),
    linkedin: escapeHtml(formatOptionalLink(linkedin)),
    portfolio: escapeHtml(formatOptionalLink(portfolio)),
    resumeUrl: escapeHtml(resumeUrl),
    experience: escapeHtml(experience),
    noticePeriod: escapeHtml(normalizeOptional(noticePeriod)),
    message: escapeHtml(message).replace(/\n/g, "<br />"),
    submittedAt: escapeHtml(submittedAt),
  };

  const adminSubject = `DCG application: ${role}`;
  const adminText = [
    "New career application",
    "----------------------",
    `Role: ${role}`,
    `Name: ${name}`,
    `Email: ${email}`,
    `Location: ${location}`,
    `Experience: ${experience}`,
    `Resume URL: ${resumeUrl}`,
    `LinkedIn: ${normalizeOptional(linkedin)}`,
    `Portfolio: ${normalizeOptional(portfolio)}`,
    `Notice period: ${normalizeOptional(noticePeriod)}`,
    `Submitted: ${submittedAt}`,
    "",
    "Candidate message:",
    message,
  ].join("\n");

  const adminHtml = `
    <div style="margin:0;padding:24px;background:#f8fafc;font-family:Arial,sans-serif;color:#0f172a;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:720px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:20px;overflow:hidden;">
        <tr>
          <td style="padding:24px 28px;background:linear-gradient(120deg,#0A4C8A,#00CACA);color:#ffffff;">
            <div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;opacity:0.85;">DCG Careers</div>
            <div style="font-size:28px;font-weight:700;margin-top:10px;">New application received</div>
            <div style="font-size:14px;margin-top:8px;opacity:0.9;">${safe.role}</div>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 28px;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="font-size:14px;line-height:1.5;">
              <tr><td style="padding:6px 0;color:#64748b;width:160px;">Name</td><td style="padding:6px 0;font-weight:600;">${safe.name}</td></tr>
              <tr><td style="padding:6px 0;color:#64748b;">Email</td><td style="padding:6px 0;"><a href="mailto:${safe.email}" style="color:#0A4C8A;text-decoration:none;">${safe.email}</a></td></tr>
              <tr><td style="padding:6px 0;color:#64748b;">Location</td><td style="padding:6px 0;">${safe.location}</td></tr>
              <tr><td style="padding:6px 0;color:#64748b;">Experience</td><td style="padding:6px 0;">${safe.experience}</td></tr>
              <tr><td style="padding:6px 0;color:#64748b;">Notice period</td><td style="padding:6px 0;">${safe.noticePeriod}</td></tr>
              <tr><td style="padding:6px 0;color:#64748b;">Resume</td><td style="padding:6px 0;"><a href="${safe.resumeUrl}" style="color:#0A4C8A;text-decoration:none;">${safe.resumeUrl}</a></td></tr>
              <tr><td style="padding:6px 0;color:#64748b;">LinkedIn</td><td style="padding:6px 0;">${safe.linkedin === "-" ? "-" : `<a href="${safe.linkedin}" style="color:#0A4C8A;text-decoration:none;">${safe.linkedin}</a>`}</td></tr>
              <tr><td style="padding:6px 0;color:#64748b;">Portfolio</td><td style="padding:6px 0;">${safe.portfolio === "-" ? "-" : `<a href="${safe.portfolio}" style="color:#0A4C8A;text-decoration:none;">${safe.portfolio}</a>`}</td></tr>
              <tr><td style="padding:6px 0;color:#64748b;">Submitted</td><td style="padding:6px 0;">${safe.submittedAt}</td></tr>
            </table>
            <div style="margin-top:20px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#64748b;">Motivation</div>
            <div style="margin-top:10px;padding:16px;border:1px solid #e2e8f0;border-left:4px solid #00CACA;border-radius:12px;background:#f8fafc;line-height:1.7;">
              ${safe.message}
            </div>
          </td>
        </tr>
      </table>
    </div>
  `;

  const confirmationHtml = `
    <div style="margin:0;padding:24px;background:#f8fafc;font-family:Arial,sans-serif;color:#0f172a;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:720px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:20px;overflow:hidden;">
        <tr>
          <td style="padding:24px 28px;background:linear-gradient(120deg,#0A4C8A,#00CACA);color:#ffffff;">
            <div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;opacity:0.85;">DCG Careers</div>
            <div style="font-size:28px;font-weight:700;margin-top:10px;">Application received</div>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 28px;font-size:14px;line-height:1.7;">
            <p style="margin:0 0 12px;">Hi ${safe.name},</p>
            <p style="margin:0 0 12px;">Thanks for applying to <strong>${safe.role}</strong> at DCG. We have received your submission and sent it to our hiring team.</p>
            <p style="margin:0 0 12px;">If your profile aligns with current needs, we typically reply within 5 business days.</p>
            <p style="margin:18px 0 0;color:#64748b;">Best,<br />DCG Team</p>
          </td>
        </tr>
      </table>
    </div>
  `;

  const resend = new Resend(apiKey);

  try {
    const sendWithFallback = async (
      payload: Parameters<typeof resend.emails.send>[0],
    ) => {
      const result = await resend.emails.send(payload);
      const errorMessage = result?.error?.message ?? "";
      const shouldFallback =
        errorMessage.includes("domain is not verified") && from !== defaultFrom;

      if (shouldFallback) {
        return resend.emails.send({ ...payload, from: defaultFrom });
      }

      return result;
    };

    const [adminResult, confirmationResult] = await Promise.all([
      sendWithFallback({
        to,
        from,
        subject: adminSubject,
        text: adminText,
        html: adminHtml,
        replyTo: `${name} <${email}>`,
      }),
      sendWithFallback({
        to: email,
        from,
        subject: "We received your DCG application",
        text: `Hi ${name},\n\nThanks for applying to ${role}. We received your application and will review it shortly.\n\n- DCG Team`,
        html: confirmationHtml,
        replyTo: from,
      }),
    ]);

    const hasError = Boolean(adminResult?.error || confirmationResult?.error);
    if (hasError) {
      return NextResponse.json(
        { error: "Failed to send application.", requestId },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, requestId }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to send application.", requestId },
      { status: 500 },
    );
  }
}
