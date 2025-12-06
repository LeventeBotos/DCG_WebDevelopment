import Link from "next/link";

export default function FinalCTASection() {
  return (
    <section className="">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="rounded-3xl border border-dcg-lightBlue/25 bg-gradient-to-r from-white via-dcg-lightGreen/10 to-white px-6 py-10 shadow-lg md:px-10 md:py-12">
          <div className="grid gap-6 md:grid-cols-[2fr_1fr] md:items-center">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-dcg-ink md:text-3xl">
                Let&apos;s build tomorrow together.
              </h2>
              <p className="mt-3 max-w-xl text-sm text-dcg-slate md:text-base">
                Whether you&apos;re exploring your first AI use-cases or scaling
                an existing data and AI portfolio, we help you move from
                slideware to impact – quickly and responsibly.
              </p>
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              <Link
                href="/contact"
                className="dcg-cta"
              >
                Schedule a conversation
              </Link>
              <p className="text-xs text-dcg-slate">
                Or email us at{" "}
                <a
                  href="mailto:info@dataconsulting-group.com"
                  className="font-semibold text-dcg-blue hover:underline"
                >
                  info@dataconsulting-group.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
