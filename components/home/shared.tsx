import Link from "next/link";
import React from "react";

type ServiceCardProps = { title: string; body: string; href?: string };

export function StatRow({
  label,
  value,
  badge,
}: {
  label: string;
  value: string;
  badge?: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-dcg-lightBlue/15 bg-white px-3 py-2.5 shadow-sm">
      <div className="text-xs text-dcg-slate">{label}</div>
      <div className="flex items-center gap-2">
        {badge && (
          <span className="rounded-full border border-dcg-lightBlue/30 bg-dcg-lightGreen/15 px-2 py-0.5 text-[10px] font-semibold text-dcg-blue">
            {badge}
          </span>
        )}
        <span className="text-sm font-semibold text-dcg-ink">{value}</span>
      </div>
    </div>
  );
}

export function ValueCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="flex flex-col gap-3 rounded-3xl border border-dcg-lightBlue/20 bg-white p-5 shadow-md">
      <h3 className="text-sm font-semibold text-dcg-ink">{title}</h3>
      <p className="text-xs text-dcg-slate md:text-sm">{body}</p>
    </div>
  );
}

export function QuestionCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-between rounded-3xl border border-dcg-lightBlue/20 bg-white p-5 shadow-md">
      <p className="text-sm font-semibold text-dcg-ink md:text-base">
        {children}
      </p>
    </div>
  );
}

export function PlatformCard({
  title,
  body,
  href,
}: {
  title: string;
  body: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col justify-between rounded-3xl border border-dcg-lightBlue/25 bg-gradient-to-br from-white via-white to-dcg-sand p-5 shadow-md transition hover:-translate-y-0.5 hover:border-dcg-lightBlue/60 hover:shadow-lg"
    >
      <div>
        <h3 className="text-sm font-semibold text-dcg-ink md:text-base">
          {title}
        </h3>
        <p className="mt-2 text-xs text-dcg-slate md:text-sm">{body}</p>
      </div>
      <span className="mt-4 text-xs font-semibold text-dcg-blue opacity-80 group-hover:opacity-100">
        Learn more →
      </span>
    </Link>
  );
}

export function StatCard({
  label,
  value,
  note,
  className = "",
}: {
  label: string;
  value: string;
  note?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex h-full flex-col gap-2 rounded-3xl border border-dcg-lightBlue/20 bg-white p-5 shadow-md ${className}`}
    >
      <div className="text-xs font-semibold uppercase tracking-[0.15em] text-dcg-slate">
        {label}
      </div>

      <div className="text-3xl font-semibold text-dcg-ink">{value}</div>

      {note && <p className="text-xs text-dcg-slate md:text-sm">{note}</p>}
    </div>
  );
}

export function ServiceCard({ title, body, href }: ServiceCardProps) {
  const card = (
    <div className="flex h-full flex-col gap-3 rounded-3xl border border-dcg-lightBlue/20 bg-white p-5 shadow-md transition hover:-translate-y-0.5 hover:shadow-lg">
      <h3 className="text-sm font-semibold text-dcg-ink md:text-base">
        {title}
      </h3>
      <p className="text-xs text-dcg-slate md:text-sm">{body}</p>
      {href && (
        <span className="text-xs font-semibold text-dcg-blue">
          View service →
        </span>
      )}
    </div>
  );

  if (!href) {
    return card;
  }

  return (
    <Link href={href} className="block focus-visible:outline-none">
      {card}
    </Link>
  );
}
