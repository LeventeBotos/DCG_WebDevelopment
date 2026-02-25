import type { ReactNode } from "react";

type LegalSection = {
  title: string;
  paragraphs?: ReactNode[];
  bullets?: ReactNode[];
};

type LegalDocumentPageProps = {
  title: string;
  description: string;
  lastUpdated: string;
  intro?: ReactNode[];
  sections: LegalSection[];
};

export default function LegalDocumentPage({
  title,
  description,
  lastUpdated,
  intro = [],
  sections,
}: LegalDocumentPageProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="border-b border-white/10 bg-black pb-10 pt-28 text-white md:pb-14 md:pt-32">
        <div className="dcg-section">
          <div className="mx-auto max-w-4xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-white/60">
              Legal
            </p>
            <h1 className="text-3xl font-semibold leading-tight md:text-5xl">
              {title}
            </h1>
            <p className="text-base leading-7 text-white/80 md:text-lg md:leading-8">
              {description}
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="dcg-section">
          <article className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
            <p className="mb-8 text-sm font-medium text-slate-500">
              Last updated: {lastUpdated}
            </p>

            {intro.map((paragraph, index) => (
              <p
                key={`intro-${index}`}
                className="mb-5 text-sm leading-7 text-slate-700 md:text-base"
              >
                {paragraph}
              </p>
            ))}

            <div className="space-y-10">
              {sections.map((section) => (
                <section key={section.title} aria-label={section.title}>
                  <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">
                    {section.title}
                  </h2>

                  {section.paragraphs?.map((paragraph, index) => (
                    <p
                      key={`${section.title}-paragraph-${index}`}
                      className="mt-4 text-sm leading-7 text-slate-700 md:text-base"
                    >
                      {paragraph}
                    </p>
                  ))}

                  {section.bullets?.length ? (
                    <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700 md:text-base">
                      {section.bullets.map((bullet, index) => (
                        <li key={`${section.title}-bullet-${index}`}>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
