import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { services, servicesBySlug } from "@/lib/services";

export const dynamicParams = true;

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = servicesBySlug[slug];

  console.log(slug);
  if (!service) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-dcg-sand to-white" />
        <div className="relative dcg-section py-16 md:py-24 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-dcg-blue shadow-sm">
            {service.category}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-dcg-ink max-w-4xl leading-tight">
            {service.title}
          </h1>
          <p className="text-lg text-dcg-slate max-w-3xl">{service.intro}</p>
          <p className="text-sm text-dcg-ink max-w-4xl">{service.summary}</p>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="secondary" size="lg">
              <Link href="/services">Back to services</Link>
            </Button>
            <Button asChild variant="primary" size="lg">
              <Link href="/contact">Talk with us</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="dcg-section py-14 md:py-20 space-y-10">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="dcg-card h-full">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-dcg-slate">
              Where we focus
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-dcg-ink">
              What we deliver
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-dcg-slate">
              {service.highlights.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-dcg-lightBlue" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="dcg-card h-full">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-dcg-slate">
              Proof of value
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-dcg-ink">
              Outcomes you can expect
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-dcg-slate">
              {service.outcomes.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-dcg-lightGreen" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-dcg-lightGreen uppercase tracking-[0.2em]">
            How we work
          </p>
          <h3 className="text-3xl font-bold text-dcg-ink">
            Engagement building blocks
          </h3>
          <p className="text-sm text-dcg-slate md:text-base max-w-4xl">
            Each engagement combines strategy, build, and adoption. We leave
            your teams with the assets, playbooks, and operating rhythms needed
            to keep improving after launch.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {service.pillars.map((pillar) => (
            <div key={pillar.title} className="dcg-card-compact h-full">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-dcg-slate">
                {service.title}
              </p>
              <h4 className="mt-2 text-lg font-semibold text-dcg-ink">
                {pillar.title}
              </h4>
              <p className="mt-2 text-sm text-dcg-slate">{pillar.body}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3 rounded-3xl border border-dcg-blue/10 bg-gradient-to-r from-white via-dcg-lightGreen/10 to-white p-6 shadow-md">
          <div className="flex-1 min-w-[240px]">
            <p className="text-sm font-semibold text-dcg-ink">
              Ready to explore how {service.title} can move the needle?
            </p>
            <p className="text-xs text-dcg-slate md:text-sm">
              We’ll align on the outcomes that matter, assemble the right team,
              and start with a fast, low-risk path to value.
            </p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="primary" size="lg">
              <Link href="/contact">Book a conversation</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/projects">View projects</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
