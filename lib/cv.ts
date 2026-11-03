/** Shared CV upload rules (client-safe: no server imports). */

/**
 * Firestore documents are capped at 1 MiB, and the CV is stored as raw bytes in its own document, so 900 KB
 * leaves headroom for the other fields.
 */
export const CV_MAX_BYTES = 900 * 1024;
export const CV_ACCEPT = ".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

export const CV_TYPES = {
  pdf: "application/pdf",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
} as const;

/** Safe display/download name: no path parts or control characters, bounded length. */
export function sanitizeFileName(name: string): string {
  const base = name.split(/[\\/]/).pop() ?? "cv";
  // eslint-disable-next-line no-control-regex
  const cleaned = base.replace(/[\u0000-\u001f"<>:*?|]/g, "").trim().slice(0, 80);
  return cleaned || "cv";
}

/** Decoded size in bytes of a base64 string. */
export function base64Size(b64: string): number {
  const padding = b64.endsWith("==") ? 2 : b64.endsWith("=") ? 1 : 0;
  return Math.floor((b64.length * 3) / 4) - padding;
}

/** Detect the real file type from its first bytes (never trust the extension or the browser's MIME type). */
export function detectCvType(b64: string): keyof typeof CV_TYPES | null {
  try {
    const head = atob(b64.slice(0, 8));
    if (head.startsWith("%PDF-")) return "pdf";
    // .docx is a zip container: "PK\x03\x04"
    if (head.charCodeAt(0) === 0x50 && head.charCodeAt(1) === 0x4b && head.charCodeAt(2) === 0x03 && head.charCodeAt(3) === 0x04) return "docx";
  } catch {
    return null;
  }
  return null;
}
