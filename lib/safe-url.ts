/** Returns the URL only if it is http(s); otherwise null. Use for every user-supplied href rendered in admin. */
export function safeHref(value: string | null | undefined): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}
