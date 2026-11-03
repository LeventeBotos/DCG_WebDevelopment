import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import JobViewTracker from "@/components/careers/JobViewTracker";
import { getPublishedJob } from "@/lib/jobs/server";
import { categoryMeta, type PublicJob } from "@/lib/jobs/types";
import { getSiteUrl, siteConfig } from "@/lib/site";

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

const EMPLOYMENT: [RegExp, string][] = [
  [/full/i, "FULL_TIME"],
  [/part/i, "PART_TIME"],
  [/contract|freelance/i, "CONTRACTOR"],
  [/temp/i, "TEMPORARY"],
  [/intern/i, "INTERN"],
];

const esc = (v: string) => v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** schema.org JobPosting for Google for Jobs. Salary is only included when it is also visible on the page. */
function jobPostingJsonLd(job: PublicJob, url: string) {
  const origin = getSiteUrl()?.toString().replace(/\/$/, "") ?? siteConfig.defaultSiteUrl.replace(/\/$/, "");
  const description = [
    job.summary ? `<p>${esc(job.summary)}</p>` : "",
    job.responsibilities.length ? `<p><strong>What you will do</strong></p><ul>${job.responsibilities.map((r) => `<li>${esc(r)}</li>`).join("")}</ul>` : "",
    job.requirements.length ? `<p><strong>What we are looking for</strong></p><ul>${job.requirements.map((r) => `<li>${esc(r)}</li>`).join("")}</ul>` : "",
  ].join("") || `<p>${esc(job.title)}</p>`;
  const employmentType = EMPLOYMENT.find(([re]) => re.test(job.employmentType))?.[1];
  const hasSalary = job.salaryMin != null || job.salaryMax != null;

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description,
    identifier: { "@type": "PropertyValue", name: siteConfig.name, value: job.id },
    datePosted: (job.publishedAt ?? new Date().toISOString()).slice(0, 10),
    ...(job.closesAt ? { validThrough: `${job.closesAt.slice(0, 10)}T23:59:59Z` } : {}),
    ...(employmentType ? { employmentType } : {}),
    hiringOrganization: { "@type": "Organization", name: siteConfig.name, sameAs: origin, logo: `${origin}/icon-512.png` },
    jobLocation: {
      "@type": "Place",
      address: { "@type": "PostalAddress", addressLocality: job.addressLocality || undefined, addressCountry: job.addressCountry || "GB" },
    },
    ...(job.remote ? { jobLocationType: "TELECOMMUTE", applicantLocationRequirements: { "@type": "Country", name: job.addressCountry || "GB" } } : {}),
    ...(hasSalary
      ? {
          baseSalary: {
            "@type": "MonetaryAmount",
            currency: job.salaryCurrency || "GBP",
            value: {
              "@type": "QuantitativeValue",
              ...(job.salaryMin != null ? { minValue: job.salaryMin } : {}),
              ...(job.salaryMax != null ? { maxValue: job.salaryMax } : {}),
              unitText: job.salaryPeriod || "YEAR",
            },
          },
        }
      : {}),
    directApply: true,
    url,
  };
}

const money = (n: number, currency: string) => new Intl.NumberFormat("en-GB", { style: "currency", currency, maximumFractionDigits: 0 }).format(n);

export default async function JobPage({ params }: Params) {
  const { slug } = await params;
  const job = await getPublishedJob(slug);
  if (!job) notFound();

  const origin = getSiteUrl()?.toString().replace(/\/$/, "") ?? siteConfig.defaultSiteUrl.replace(/\/$/, "");
  const jsonLd = JSON.stringify(jobPostingJsonLd(job, `${origin}/careers/${job.id}`)).replace(/</g, "\\u003c");
  const salaryText =
    job.salaryMin != null || job.salaryMax != null
      ? `${job.salaryMin != null ? money(job.salaryMin, job.salaryCurrency || "GBP") : ""}${job.salaryMin != null && job.salaryMax != null ? " – " : ""}${job.salaryMax != null ? money(job.salaryMax, job.salaryCurrency || "GBP") : ""} per ${(job.salaryPeriod || "YEAR").toLowerCase()}`
      : null;

  return (
    <article className="dcg-section mx-auto max-w-3xl space-y-8 py-14 md:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
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
          {salaryText ? ` · ${salaryText}` : ""}
        </p>
        {job.closesAt ? <p className="text-sm text-slate-500">Applications close on {new Date(job.closesAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}.</p> : null}
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
