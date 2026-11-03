import { audit } from "@/lib/audit";
import { requireAdminApi } from "@/lib/auth/require-admin";
import { getCv } from "@/lib/inbox/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

/** Authenticated CV download. Files are never public: they are only reachable through this route. */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminApi();
  if ("response" in auth) return auth.response;

  const { id } = await params;
  const cv = await getCv(decodeURIComponent(id)).catch(() => null);
  if (!cv) return Response.json({ error: "Not found" }, { status: 404 });

  const bytes = Uint8Array.from(atob(cv.data), (c) => c.charCodeAt(0));
  await audit(auth.admin.email, "application.cv_download", "application", id, { file: cv.fileName });

  // Only the two types we accepted at upload are ever served.
  const contentType =
    cv.contentType === "application/pdf" ||
    cv.contentType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ? cv.contentType
      : "application/octet-stream";
  const asciiName = cv.fileName.replace(/[^\x20-\x7e]/g, "_").replace(/"/g, "");

  return new Response(bytes, {
    headers: {
      "Content-Type": contentType,
      // attachment + nosniff + sandboxed CSP: the file can never render or run in our origin.
      "Content-Disposition": `attachment; filename="${asciiName}"; filename*=UTF-8''${encodeURIComponent(cv.fileName)}`,
      "Content-Length": String(bytes.byteLength),
      "X-Content-Type-Options": "nosniff",
      "Content-Security-Policy": "default-src 'none'; sandbox",
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex",
    },
  });
}
