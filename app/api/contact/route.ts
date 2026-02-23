
import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import {
  buildAdminEmailHtml,
  buildConfirmationEmailHtml,
} from "@/components/email-template";

export const runtime = "edge";

type LogEntry = {
  level: "info" | "warn" | "error";
  message: string;
  detail?: string;
};

const ContactSchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
  phone: z.string().trim().optional(),
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

  const { name, email, phone, company, country, topic, message, website } =
    parsed.data;

  if (website && website.trim().length > 0) {
    log("warn", "Bot detection triggered via honeypot field.");
    return jsonWithLogs(
      { error: "Submission rejected.", requestId },
      logs,
      400
    );
  }

  const normalizedPhone = phone?.trim() || "";
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
    `Phone: ${normalizedPhone || "-"}`,
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
  const safePhone = escapeHtml(normalizedPhone || "-");
  const safeCompany = escapeHtml(normalizedCompany || "-");
  const safeCountry = escapeHtml(normalizedCountry || "-");
  const safeTopic = escapeHtml(normalizedTopic || "-");
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");
  const safeSubmittedAt = escapeHtml(submittedAt);

  const html = buildAdminEmailHtml({
    safeName,
    safeEmail,
    safePhone,
    safeCompany,
    safeCountry,
    safeTopic,
    safeMessage,
    submittedAt: safeSubmittedAt,
  });

  const confirmationHtml = buildConfirmationEmailHtml({
    safeName,
    safeCompany,
    safeCountry,
    safeTopic,
    safeMessage,
  });

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
