"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import dynamic from "next/dynamic";

// Client-only: keeps motion/framer-motion out of every admin edge function (Cloudflare Pages 25 MiB bundle limit).
const GlowingEffect = dynamic(() => import("@/components/ui/glowing-effect").then((m) => m.GlowingEffect), { ssr: false });

/** Dashboard tile with the Aceternity glowing border. Optional link makes the whole tile clickable. */
export default function StatCard({
  label,
  value,
  hint,
  icon,
  href,
}: {
  label: string;
  value: ReactNode;
  hint?: string;
  icon?: ReactNode;
  href?: string;
}) {
  const body = (
    <div className="relative h-full rounded-xl border bg-card p-5 shadow-sm">
      <GlowingEffect variant="dcg" spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
      <div className="relative flex items-start justify-between">
        <p className="text-sm text-muted-foreground">{label}</p>
        {icon ? <span className="text-muted-foreground">{icon}</span> : null}
      </div>
      <p className="relative mt-3 text-3xl font-semibold tabular-nums">{value}</p>
      {hint ? <p className="relative mt-1 text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
  return href ? (
    <Link href={href} className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
      {body}
    </Link>
  ) : (
    body
  );
}
