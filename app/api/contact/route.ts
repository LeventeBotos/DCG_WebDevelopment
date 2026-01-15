
import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

export const runtime = "edge";

type LogEntry = {
  level: "info" | "warn" | "error";
  message: string;
  detail?: string;
};

const ContactSchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
  company: z.string().trim().optional(),
  country: z.string().trim().optional(),
  topic: z.string().trim().optional(),
  message: z.string().trim().min(1),
  website: z.string().optional(),
});

const serializeError = (error: unknown) => {
  if (error instanceof Error) {
    return { message: error.message, stack: error.stack };
  }
  if (typeof error === "string") {
    return { message: error };
  }
  return { message: "Unknown error" };
};

const jsonWithLogs = (
  data: Record<string, unknown>,
  logs: LogEntry[],
  status = 200
) =>
  NextResponse.json(
    {
      ...data,
      logs,
    },
    { status }
  );

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

export async function POST(request: Request) {
  const requestId = crypto.randomUUID();
  const logs: LogEntry[] = [];
  const log = (level: LogEntry["level"], message: string, detail?: string) => {
    logs.push({ level, message, detail });
    const prefix = `[contact][${requestId}]`;
    if (level === "error") {
      console.error(prefix, message, detail ?? "");
    } else if (level === "warn") {
      console.warn(prefix, message, detail ?? "");
    } else {
      console.info(prefix, message, detail ?? "");
    }
  };

  log("info", "Incoming contact request received.");
  const json = await request.json().catch(() => null);

  if (!json) {
    log("warn", "Invalid JSON body received.");
    return jsonWithLogs(
      { error: "Invalid request body.", requestId },
      logs,
      400
    );
  }

  const parsed = ContactSchema.safeParse(json);

  if (!parsed.success) {
    log("warn", "Validation failed.", JSON.stringify(parsed.error.flatten()));
    return jsonWithLogs(
      { error: "Please fill out all required fields.", requestId },
      logs,
      400
    );
  }

  const { name, email, company, country, topic, message, website } =
    parsed.data;

  if (website && website.trim().length > 0) {
    log("warn", "Bot detection triggered via honeypot field.");
    return jsonWithLogs(
      { error: "Submission rejected.", requestId },
      logs,
      400
    );
  }

  const normalizedCompany = company?.trim() || "";
  const normalizedCountry = country?.trim() || "";
  const normalizedTopic = topic?.trim() || "General inquiry";
  const apiKey = process.env.RESEND_API_KEY;
  const defaultFrom = "DCG Contact <onboarding@resend.dev>";
  const from = process.env.RESEND_FROM ?? defaultFrom;
  const to = process.env.RESEND_TO ?? "botos.levente2007@gmail.com";

  if (!apiKey) {
    log("error", "Missing RESEND_API_KEY configuration.");
    return jsonWithLogs(
      { error: "Email service is not configured.", requestId },
      logs,
      500
    );
  }

  if (from === defaultFrom) {
    log(
      "warn",
      "RESEND_FROM not set; using Resend onboarding sender address."
    );
  }

  const resend = new Resend(apiKey);

  const submittedAt = new Date().toISOString();
  const subject = `DCG contact request${
    normalizedTopic ? `: ${normalizedTopic}` : ""
  }`;
  const text = [
    "DCG contact request",
    "-------------------",
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${normalizedCompany || "-"}`,
    `Country: ${normalizedCountry || "-"}`,
    `Topic: ${normalizedTopic || "-"}`,
    `Submitted: ${submittedAt}`,
    "",
    "Message:",
    message,
  ].join("\n");

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeCompany = escapeHtml(normalizedCompany || "-");
  const safeCountry = escapeHtml(normalizedCountry || "-");
  const safeTopic = escapeHtml(normalizedTopic || "-");
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  const html = `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; background: #f3f4f6; padding: 24px;">
      <table width="100%" cellspacing="0" cellpadding="0" style="max-width: 680px; margin: 0 auto; background: #ffffff; border-radius: 18px; overflow: hidden; box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);">
        <tr>
          <td style="background: linear-gradient(120deg, #e6f2ee, #f9f2e8); padding: 28px 32px;">
            <div style="display: inline-block; background: rgba(47, 107, 93, 0.1); color: #2f6b5d; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; padding: 6px 10px; border-radius: 999px;">New inquiry</div>
            <div style="font-size: 24px; font-weight: 700; color: #1c2b28; margin-top: 12px;">DCG contact request</div>
            <div style="font-size: 14px; color: #4b5f57; margin-top: 6px;">A new message is waiting for your reply.</div>
          </td>
        </tr>
        <tr>
          <td style="padding: 24px 32px 8px;">
            <table width="100%" cellspacing="0" cellpadding="0" style="font-size: 14px; color: #1c2b28;">
              <tr>
                <td style="padding: 8px 0; width: 160px; color: #4b5f57;">Name</td>
                <td style="padding: 8px 0;">${safeName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #4b5f57;">Email</td>
                <td style="padding: 8px 0;"><a href="mailto:${safeEmail}" style="color: #2f6b5d; text-decoration: none;">${safeEmail}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #4b5f57;">Company</td>
                <td style="padding: 8px 0;">${safeCompany}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #4b5f57;">Country</td>
                <td style="padding: 8px 0;">${safeCountry}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #4b5f57;">Topic</td>
                <td style="padding: 8px 0;">${safeTopic}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #4b5f57;">Submitted</td>
                <td style="padding: 8px 0;">${escapeHtml(submittedAt)}</td>
              </tr>
            </table>
            <div style="margin-top: 18px; font-size: 13px; color: #4b5f57; text-transform: uppercase; letter-spacing: 1px;">Message</div>
            <div style="margin-top: 10px; padding: 18px; background: #f8faf9; border-radius: 14px; font-size: 14px; color: #1c2b28; line-height: 1.6; border: 1px solid #edf1ee;">
              ${safeMessage}
            </div>
          </td>
        </tr>
        <tr>
          <td style="padding: 0 32px 24px;">
            <table cellspacing="0" cellpadding="0" style="margin-top: 16px;">
              <tr>
                <td style="background: #2f6b5d; border-radius: 999px;">
                  <a href="mailto:${safeEmail}" style="display: inline-block; padding: 10px 18px; color: #ffffff; font-size: 13px; text-decoration: none;">Reply to ${safeName}</a>
                </td>
                <td style="padding-left: 12px; font-size: 12px; color: #74807c;">
                  Aim to respond within 24 hours.
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding: 18px 32px 28px; font-size: 12px; color: #74807c; border-top: 1px solid #eef1f0;">
            Reply directly to this email to reach ${safeName}.
          </td>
        </tr>
      </table>
    </div>
  `;

  const confirmationHtml = `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; background: #f3f4f6; padding: 24px;">
      <table width="100%" cellspacing="0" cellpadding="0" style="max-width: 680px; margin: 0 auto; background: #ffffff; border-radius: 18px; overflow: hidden; box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);">
        <tr>
          <td style="background: linear-gradient(120deg, #e6f2ee, #f9f2e8); padding: 28px 32px;">
            <div style="display: inline-block; background: rgba(47, 107, 93, 0.1); color: #2f6b5d; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; padding: 6px 10px; border-radius: 999px;">Thanks</div>
            <div style="font-size: 24px; font-weight: 700; color: #1c2b28; margin-top: 12px;">We received your message</div>
            <div style="font-size: 14px; color: #4b5f57; margin-top: 6px;">Our team will reply shortly with next steps.</div>
          </td>
        </tr>
        <tr>
          <td style="padding: 24px 32px 8px; font-size: 14px; color: #1c2b28;">
            <p style="margin: 0 0 12px;">Hi ${safeName},</p>
            <p style="margin: 0 0 16px;">Thanks for reaching out. We have your message about <strong>${safeTopic}</strong>. If you need to add more context, reply directly to this email.</p>
            <table width="100%" cellspacing="0" cellpadding="0" style="font-size: 13px; color: #4b5f57; border-top: 1px solid #eef1f0; padding-top: 12px;">
              <tr>
                <td style="padding: 6px 0; width: 140px;">Company</td>
                <td style="padding: 6px 0; color: #1c2b28;">${safeCompany}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0;">Country</td>
                <td style="padding: 6px 0; color: #1c2b28;">${safeCountry}</td>
              </tr>
            </table>
            <div style="margin-top: 16px; padding: 16px; background: #f8faf9; border-radius: 14px; border: 1px solid #edf1ee; line-height: 1.6;">
              ${safeMessage}
            </div>
            <p style="margin: 16px 0 0; color: #4b5f57;">We aim to respond within one business day.</p>
            <p style="margin: 16px 0 0;">Best,<br />DCG Team</p>
          </td>
        </tr>
      </table>
    </div>
  `;

  try {
    log("info", "Sending notification emails.");
    const sendWithFallback = async (
      payload: Parameters<typeof resend.emails.send>[0],
      label: string
    ) => {
      const initialResult = await resend.emails.send(payload);
      const errorMessage = initialResult?.error?.message ?? "";
      const shouldFallback =
        errorMessage.includes("domain is not verified") && from !== defaultFrom;

      if (shouldFallback) {
        log(
          "warn",
          `${label} email sender domain is not verified; retrying with default sender.`
        );
        return resend.emails.send({
          ...payload,
          from: defaultFrom,
        });
      }

      return initialResult;
    };

    const [adminResult, confirmationResult] = await Promise.all([
      sendWithFallback(
        {
          to,
          from,
          subject,
          text,
          html,
          replyTo: `${name} <${email}>`,
        },
        "Admin"
      ),
      sendWithFallback(
        {
          to: email,
          from,
          subject: "We received your request",
          text: `Hi ${name},\n\nThanks for reaching out. We received your message and will reply soon.\n\n- DCG Team`,
          html: confirmationHtml,
          replyTo: from,
        },
        "Confirmation"
      ),
    ]);

    const errors = [
      adminResult?.error
        ? `Admin email failed: ${adminResult.error.message}`
        : null,
      confirmationResult?.error
        ? `Confirmation email failed: ${confirmationResult.error.message}`
        : null,
    ].filter(Boolean);

    if (errors.length > 0) {
      log("error", "Resend returned errors.", errors.join(" | "));
      return jsonWithLogs(
        { error: "Failed to send message.", requestId },
        logs,
        502
      );
    }

    log("info", "Email delivery accepted by Resend.");
    return jsonWithLogs({ ok: true, requestId }, logs, 200);
  } catch (error) {
    const serialized = serializeError(error);
    log("error", "Unexpected error while sending emails.", serialized.message);
    return jsonWithLogs(
      { error: "Failed to send message.", requestId },
      logs,
      500
    );
  }
}
