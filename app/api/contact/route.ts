import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

export const runtime = "nodejs";

const ContactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().optional().default(""),
  country: z.string().optional().default(""),
  topic: z.string().optional().default("General inquiry"),
  message: z.string().min(1),
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

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);

  if (!json) {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  const parsed = ContactSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please fill out all required fields." },
      { status: 400 }
    );
  }

  const { name, email, company, country, topic, message } = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  const to = process.env.RESEND_TO;

  if (!apiKey || !from || !to) {
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);

  const submittedAt = new Date().toISOString();
  const subject = `DCG contact request${topic ? `: ${topic}` : ""}`;
  const text = [
    "DCG contact request",
    "-------------------",
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company || "-"}`,
    `Country: ${country || "-"}`,
    `Topic: ${topic || "-"}`,
    `Submitted: ${submittedAt}`,
    "",
    "Message:",
    message,
  ].join("\n");

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeCompany = escapeHtml(company || "-");
  const safeCountry = escapeHtml(country || "-");
  const safeTopic = escapeHtml(topic || "-");
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  const html = `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; background: #f5f3ee; padding: 24px;">
      <table width="100%" cellspacing="0" cellpadding="0" style="max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden;">
        <tr>
          <td style="background: linear-gradient(120deg, #e8efe7, #f7f3ea); padding: 28px 32px;">
            <div style="font-size: 12px; letter-spacing: 3px; text-transform: uppercase; color: #4b5f57;">DCG Contact</div>
            <div style="font-size: 24px; font-weight: 700; color: #1c2b28; margin-top: 8px;">New inquiry received</div>
            <div style="font-size: 14px; color: #4b5f57; margin-top: 6px;">We should reply within 24 hours.</div>
          </td>
        </tr>
        <tr>
          <td style="padding: 24px 32px;">
            <table width="100%" cellspacing="0" cellpadding="0" style="font-size: 14px; color: #1c2b28;">
              <tr>
                <td style="padding: 6px 0; width: 160px; color: #4b5f57;">Name</td>
                <td style="padding: 6px 0;">${safeName}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #4b5f57;">Email</td>
                <td style="padding: 6px 0;"><a href="mailto:${safeEmail}" style="color: #2f6b5d; text-decoration: none;">${safeEmail}</a></td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #4b5f57;">Company</td>
                <td style="padding: 6px 0;">${safeCompany}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #4b5f57;">Country</td>
                <td style="padding: 6px 0;">${safeCountry}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #4b5f57;">Topic</td>
                <td style="padding: 6px 0;">${safeTopic}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #4b5f57;">Submitted</td>
                <td style="padding: 6px 0;">${escapeHtml(submittedAt)}</td>
              </tr>
            </table>
            <div style="margin-top: 18px; font-size: 14px; color: #4b5f57;">Message</div>
            <div style="margin-top: 8px; padding: 16px; background: #f9f8f4; border-radius: 12px; font-size: 14px; color: #1c2b28; line-height: 1.5;">
              ${safeMessage}
            </div>
          </td>
        </tr>
        <tr>
          <td style="padding: 18px 32px 28px; font-size: 12px; color: #74807c;">
            Reply directly to this email to reach ${safeName}.
          </td>
        </tr>
      </table>
    </div>
  `;

  try {
    await resend.emails.send({
      to,
      from,
      subject,
      text,
      html,
      replyTo: email,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to send message." },
      { status: 500 }
    );
  }
}
