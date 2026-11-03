import type { Metadata } from "next";
import type { ReactNode } from "react";

// Pages on Cloudflare run server code on the edge runtime.
export const runtime = "edge";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { default: "DCG Admin", template: "%s · DCG Admin" },
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-svh bg-background text-foreground">{children}</div>;
}
