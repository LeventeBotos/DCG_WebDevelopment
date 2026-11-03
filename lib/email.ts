import { Resend } from "resend";
import { getSiteUrl, siteConfig } from "@/lib/site";

/** Shared Resend sender for admin-originated email (notifications, digest, candidate replies). */

const DEFAULT_FROM = "DCG <onboarding@resend.dev>";
export const escapeHtml = (v: string) =>
  v.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);

export const siteOrigin = () => (getSiteUrl()?.toString() ?? siteConfig.defaultSiteUrl).replace(/\/$/, "");
export const adminUrl = (path: string) => `${siteOrigin()}/admin${path}`;
export const notifyAddress = () => process.env.RESEND_TO ?? "info@dataconsulting-group.com";

export type SendResult = { ok: true } | { ok: false; error: string };

export async function sendEmail(opts: { to: string | string[]; subject: string; html: string; text: string; replyTo?: string }): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { ok: false, error: "RESEND_API_KEY is not configured" };
  const from = process.env.RESEND_FROM ?? DEFAULT_FROM;
  const resend = new Resend(apiKey);
  try {
    let res = await resend.emails.send({ from, to: opts.to, subject: opts.subject, html: opts.html, text: opts.text, replyTo: opts.replyTo });
    if (res.error?.message?.includes("domain is not verified") && from !== DEFAULT_FROM) {
      res = await resend.emails.send({ from: DEFAULT_FROM, to: opts.to, subject: opts.subject, html: opts.html, text: opts.text, replyTo: opts.replyTo });
    }
    return res.error ? { ok: false, error: res.error.message } : { ok: true };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "send failed" };
  }
}

/** Branded wrapper used by every admin email. `bodyHtml` must already be escaped/safe. */
export function emailShell(heading: string, bodyHtml: string, footer = "Data Consulting Group"): string {
  return `
  <div style="margin:0;padding:24px;background:#f8fafc;font-family:Arial,sans-serif;color:#0f172a;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;overflow:hidden;">
      <tr><td style="padding:22px 28px;background:linear-gradient(120deg,#0A4C8A,#00CACA);color:#ffffff;">
        <div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;opacity:.85;">${escapeHtml(footer)}</div>
        <div style="font-size:24px;font-weight:700;margin-top:8px;">${escapeHtml(heading)}</div>
      </td></tr>
      <tr><td style="padding:24px 28px;font-size:14px;line-height:1.65;">${bodyHtml}</td></tr>
    </table>
  </div>`;
}

export const button = (href: string, label: string) =>
  `<p style="margin:20px 0 0;"><a href="${escapeHtml(href)}" style="display:inline-block;background:#0A4C8A;color:#ffffff;text-decoration:none;padding:10px 18px;border-radius:8px;font-weight:600;">${escapeHtml(label)}</a></p>`;
