import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ContactCtaSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  className?: string;
};

export default function ContactCtaSection({
  eyebrow,
  title,
  description,
  primaryLabel = "Talk to our team",
  primaryHref = "/contact",
  secondaryLabel = "Explore services",
  secondaryHref = "/services",
  className,
}: ContactCtaSectionProps) {
  return (
    <section
      className={cn(
        "dcg-section border-t border-slate-200 pb-16 pt-10 md:pb-20",
        className,
      )}
    >
      <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-dcg-slate">
            {eyebrow}
          </p>
          <h2 className="text-2xl font-semibold text-dcg-ink md:text-3xl">
            {title}
          </h2>
          <p className="max-w-2xl text-dcg-slate">{description}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="primary" size="lg">
            <Link href={primaryHref}>{primaryLabel}</Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link href={secondaryHref}>{secondaryLabel}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
