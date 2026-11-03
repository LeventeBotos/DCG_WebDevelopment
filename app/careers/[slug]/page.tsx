import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import JobViewTracker from "@/components/careers/JobViewTracker";
import { getPublishedJob } from "@/lib/jobs/server";
import { categoryMeta } from "@/lib/jobs/types";

export const runtime = "edge";
export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const job = await getPublishedJob(slug);
  if (!job) return { title: "Role not found", robots: { index: false } };
  const title = `${job.title} | Careers | Data Consulting Group`;
  const description = job.summary || `${job.title} (${job.location}) at Data Consulting Group.`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/careers/${job.id}` },
    openGraph: { type: "website", url: `/careers/${job.id}`, title, description },
  };
}

export default async function JobPage({ params }: Params) {
  const { slug } = await params;
  const job = await getPublishedJob(slug);
  if (!job) notFound();

  return (
    <article className="dcg-section mx-auto max-w-3xl space-y-8 py-14 md:py-20">
      <JobViewTracker jobId={job.id} />
      <Link href="/careers" className="text-sm text-slate-500 hover:text-slate-900">
        ← All roles
      </Link>

      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-dcg-lightGreen">
          {categoryMeta[job.category].label}
        </p>
        <h1 className="text-3xl font-bold text-dcg-ink md:text-4xl">{job.title}</h1>
        <p className="text-slate-600">
          {job.location} · {job.employmentType}
        </p>
        {job.summary ? <p className="text-lg text-slate-700">{job.summary}</p> : null}
      </header>

      {job.responsibilities.length > 0 ? (
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-dcg-ink">What you will do</h2>
          <ul className="list-disc space-y-2 pl-5 text-slate-700">
            {job.responsibilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {job.requirements.length > 0 ? (
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-dcg-ink">What we are looking for</h2>
          <ul className="list-disc space-y-2 pl-5 text-slate-700">
            {job.requirements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ) : null}

      <Button asChild variant="primary" size="lg">
        <Link href={`/careers?role=${encodeURIComponent(job.id)}`}>Apply for this role</Link>
      </Button>
    </article>
  );
}
