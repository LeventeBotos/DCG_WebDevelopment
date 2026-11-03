import type { ReactNode } from "react";
import { requireAdmin } from "@/lib/auth/require-admin";
import { countDocs } from "@/lib/firestore/rest";
import AdminShell from "@/components/admin/AdminShell";

async function safeCount(collection: string): Promise<number> {
  try {
    return await countDocs(collection, { field: "status", value: "new" });
  } catch {
    return 0;
  }
}

export default async function PanelLayout({ children }: { children: ReactNode }) {
  // Every admin page sits under this layout; unauthenticated visitors are redirected to /admin/login.
  const admin = await requireAdmin();
  const [applications, messages] = await Promise.all([safeCount("applications"), safeCount("contactMessages")]);

  return (
    <AdminShell admin={admin} counts={{ applications, messages }}>
      {children}
    </AdminShell>
  );
}
