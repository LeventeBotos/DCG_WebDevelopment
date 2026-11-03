import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { getPublishedJob } from "@/lib/jobs/server";
import { deleteApplication, saveApplication, saveCv } from "@/lib/inbox/server";
import { base64Size, CV_MAX_BYTES, CV_TYPES, detectCvType, sanitizeFileName } from "@/lib/cv";
import { hashIp } from "@/lib/ip-hash";

export const runtime = "edge";

// z.string().url() also accepts javascript:/data: URLs; these values are later rendered as links in the admin panel.
const optionalHttpUrl = z
  .string()
  .trim()
  .max(500)
  .refine((v) => v === "" || /^https?:\/\/\S+$/i.test(v), "Links must start with http:// or https://")
  .optional();

const ApplicationSchema = z
  .object({
  jobId: z.string().trim().regex(/^[a-z0-9-]{1,60}$/, "Choose a valid role."),
  name: z.string().trim().min(1, "Name is required.").max(120),
  email: z.string().trim().email("Valid email is required.").max(200),
  location: z.string().trim().min(1, "Location is required.").max(120),
  linkedin: optionalHttpUrl,
  portfolio: optionalHttpUrl,
  resumeUrl: optionalHttpUrl,
  cv: z
    .object({
      name: z.string().max(200),
      // base64 text; the decoded size is checked separately against CV_MAX_BYTES
      data: z.string().regex(/^[A-Za-z0-9+/]+={0,2}$/).max(1_300_000),
    })
    .optional(),
  experience: z.string().trim().min(1, "Experience is required.").max(60),
  noticePeriod: z.string().trim().max(60).optional(),
  message: z
    .string()
    .trim()
    .min(30, "Please share at least 30 characters about your fit.")
    .max(5000),
  utmSource: z.string().trim().max(60).optional(),
  utmMedium: z.string().trim().max(60).optional(),
  utmCampaign: z.string().trim().max(80).optional(),
  website: z.string().optional(),
  })
  .refine((d) => Boolean(d.resumeUrl) || Boolean(d.cv), {
    message: "Add a CV link or upload a file.",
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
  // Reject oversized bodies early (a 900 KB CV is ~1.2 MB once base64-encoded).
  if (Number(request.headers.get("content-length") ?? 0) > 1_500_000) {
    return NextResponse.json({ error: "Request is too large.", requestId }, { status: 413 });
  }
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
    jobId,
    name,
    email,
    location,
    linkedin,
    portfolio,
    resumeUrl: resumeUrlInput,
    cv,
    experience,
    noticePeriod,
    message,
    utmSource,
    utmMedium,
    utmCampaign,
    website,
  } = parsed.data;

  if (website && website.trim().length > 0) {
    return NextResponse.json(
      { error: "Submission rejected.", requestId },
      { status: 400 },
    );
  }

  // The role must be a currently published job; its title is taken from our data, never from the client.
  const job = await getPublishedJob(jobId);
  if (!job) {
    return NextResponse.json(
      { error: "This role is no longer open.", requestId },
      { status: 400 },
    );
  }
  const role = job.title;
  const resumeUrl = resumeUrlInput ?? "";

  // Validate the uploaded file by content, not by name or declared type.
  let cvFile: { fileName: string; contentType: string; size: number; base64: string } | null = null;
  if (cv) {
    const size = base64Size(cv.data);
    const kind = detectCvType(cv.data);
    if (size <= 0 || size > CV_MAX_BYTES) {
      return NextResponse.json(
        { error: `The CV must be under ${Math.round(CV_MAX_BYTES / 1024)} KB.`, requestId },
        { status: 400 },
      );
    }
    if (!kind) {
      return NextResponse.json({ error: "Upload your CV as a PDF or DOCX file.", requestId }, { status: 400 });
    }
    // Keep the extension consistent with the real type.
    const base = sanitizeFileName(cv.name).replace(/\.(pdf|docx)$/i, "") || "cv";
    cvFile = { fileName: `${base}.${kind}`, contentType: CV_TYPES[kind], size, base64: cv.data };
  }

  // Persist first, so an email problem can never lose a candidate.
  let persisted = false;
  let cvStored = false;
  try {
    const applicationId = await saveApplication({
      jobId: job.id,
      jobTitle: role,
      name,
      email,
      location,
      linkedin: linkedin ?? "",
      portfolio: portfolio ?? "",
      resumeUrl,
      experience,
      noticePeriod: noticePeriod ?? "",
      message,
      utmSource: utmSource ?? "",
      utmMedium: utmMedium ?? "",
      utmCampaign: utmCampaign ?? "",
      ipHash: await hashIp(request),
    });
    persisted = true;

    if (cvFile) {
      try {
        await saveCv(applicationId, cvFile);
        cvStored = true;
      } catch (error) {
        console.error(
          `[careers][${requestId}] could not store CV:`,
          error instanceof Error ? error.message : error,
        );
        // With no CV link to fall back on, an application without a CV is useless: undo it and ask to retry.
        if (!resumeUrl) {
          await deleteApplication(applicationId).catch(() => undefined);
          persisted = false;
          return NextResponse.json(
            { error: "We could not save your CV. Please try again or paste a link instead.", requestId },
            { status: 502 },
          );
        }
      }
    }
  } catch (error) {
    console.error(
      `[careers][${requestId}] could not store application:`,
      error instanceof Error ? error.message : error,
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const defaultFrom = "DCG Careers <onboarding@resend.dev>";
  const from = process.env.RESEND_FROM ?? defaultFrom;
  const to =
    process.env.RESEND_CAREERS_TO ??
    process.env.RESEND_TO ??
    "info@dataconsulting-group.com";

  if (!apiKey) {
    if (persisted) return NextResponse.json({ ok: true, requestId }, { status: 200 });
    return NextResponse.json(
      { error: "Email service is not configured.", requestId },
      { status: 500 },
    );
  }

  const resumeLabel =
    resumeUrl || (cvStored && cvFile ? `Uploaded file ${cvFile.fileName} (open it in the admin panel)` : "-");
  const submittedAt = new Date().toISOString();
  const safe = {
    role: escapeHtml(role),
    name: escapeHtml(name),
    email: escapeHtml(email),
    location: escapeHtml(location),
    linkedin: escapeHtml(formatOptionalLink(linkedin)),
    portfolio: escapeHtml(formatOptionalLink(portfolio)),
    resumeUrl: escapeHtml(resumeUrl),
    resumeLabel: escapeHtml(resumeLabel),
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
    `Resume: ${resumeLabel}`,
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
              <tr><td style="padding:6px 0;color:#64748b;">Resume</td><td style="padding:6px 0;">${resumeUrl ? `<a href="${safe.resumeUrl}" style="color:#0A4C8A;text-decoration:none;">${safe.resumeUrl}</a>` : safe.resumeLabel}</td></tr>
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
    if (hasError && !persisted) {
      return NextResponse.json(
        { error: "Failed to send application.", requestId },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, requestId }, { status: 200 });
  } catch {
    // Stored but email threw: the candidate is not lost and appears in the admin panel.
    if (persisted) return NextResponse.json({ ok: true, requestId }, { status: 200 });
    return NextResponse.json(
      { error: "Failed to send application.", requestId },
      { status: 500 },
    );
  }
}
