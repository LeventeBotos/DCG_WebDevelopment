/**
 * Minimal Resend client (fetch only). The official `resend` SDK pulls in @react-email/render + prettier,
 * which adds ~350 KB to every edge function and pushed the Cloudflare Pages bundle over its 25 MiB limit.
 * API-compatible with the bits we use: `new Resend(key).emails.send({ from, to, subject, html, text, replyTo })`.
 */
export type SendPayload = {
  from: string;
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  replyTo?: string | string[];
};

export type SendResponse = { data: { id: string } | null; error: { message: string; name?: string } | null };

export class Resend {
  constructor(private readonly apiKey: string) {}

  emails = {
    send: async (payload: SendPayload): Promise<SendResponse> => {
      const { replyTo, ...rest } = payload;
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { Authorization: `Bearer ${this.apiKey}`, "Content-Type": "application/json" },
          body: JSON.stringify({ ...rest, ...(replyTo ? { reply_to: replyTo } : {}) }),
        });
        const json = (await res.json().catch(() => ({}))) as { id?: string; message?: string; name?: string };
        if (!res.ok) return { data: null, error: { message: json.message ?? `Resend error ${res.status}`, name: json.name } };
        return { data: { id: json.id ?? "" }, error: null };
      } catch (e) {
        return { data: null, error: { message: e instanceof Error ? e.message : "send failed" } };
      }
    },
  };
}
