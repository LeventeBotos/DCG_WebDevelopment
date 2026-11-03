"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

/**
 * Wraps public-site chrome (nav, footer, cookie banner, GA tracking). The admin panel renders its own
 * shell and must never load GA or the marketing chrome, so those are skipped under /admin.
 */
export default function SiteChrome({
  top,
  bottom,
  children,
}: {
  top: ReactNode;
  bottom: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return <>{children}</>;

  return (
    <>
      {top}
      <main id="main-content" className="flex-grow" tabIndex={-1}>
        {children}
      </main>
      {bottom}
    </>
  );
}
