"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { PublicJob } from "@/lib/jobs/types";

/** Public job card. Also used as the live preview inside the admin job editor. */
export default function RoleCard({
  role,
  index,
  onApply,
  detailsHref,
}: {
  role: Pick<PublicJob, "id" | "title" | "location" | "employmentType" | "responsibilities">;
  index: number;
  onApply?: (jobId: string) => void;
  detailsHref?: string;
}) {
  return (
    <article className="group relative h-full overflow-hidden rounded-3xl border border-dcg-lightBlue/25 bg-gradient-to-br from-white via-white to-dcg-sand p-6 text-neutral-900 shadow-[0_30px_80px_-35px_rgba(10,76,138,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-dcg-lightBlue/60 hover:shadow-[0_40px_100px_-30px_rgba(0,154,202,0.35)]">
      <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-dcg-blue via-dcg-lightBlue to-dcg-lightGreen transition-transform duration-500 group-hover:scale-x-100" />
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400 transition-colors duration-300 group-hover:text-dcg-lightBlue">Role {index + 1}</p>
        <h3 className="text-xl font-semibold text-neutral-900 transition-colors duration-300 group-hover:text-dcg-blue">{role.title || "Untitled role"}</h3>
        <p className="text-sm text-neutral-500">
          {role.location}
          {role.employmentType ? ` · ${role.employmentType}` : ""}
        </p>
      </div>

      <div className="mt-5 h-px w-full bg-neutral-100 transition-colors duration-300 group-hover:bg-dcg-lightBlue/30" />

      <ul className="mt-5 space-y-3 text-sm text-neutral-700">
        {role.responsibilities.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400 transition-colors duration-300 group-hover:bg-dcg-lightBlue" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-between">
        {detailsHref ? (
          <Link href={detailsHref} className="text-xs font-medium text-neutral-500 underline-offset-4 hover:text-dcg-blue hover:underline">
            View details
          </Link>
        ) : (
          <span className="text-xs text-neutral-400">Quick form in popup</span>
        )}

        <Button type="button" size="sm" onClick={() => onApply?.(role.id)}>
          Apply
        </Button>
      </div>
    </article>
  );
}
