import Link from "next/link";
import type { Metadata } from "next";

const lastUpdated = "January 18, 2026";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for Data Consulting Group Ltd.",
  alternates: { canonical: "/tos" },
};

export default function TermsOfServicePage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12 md:py-16">
      <div className="space-y-8">
        <header className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-dcg-lightGreen">
            Terms
          </p>
          <h1 className="text-3xl font-semibold text-dcg-ink">
            Terms of service for Data Consulting Group Ltd
          </h1>
          <p className="text-sm text-dcg-slate">Last updated: {lastUpdated}</p>
        </header>

        <section className="space-y-4 text-sm text-dcg-slate">
          <h2 className="text-lg font-semibold text-dcg-ink">
            What these terms cover
          </h2>
          <p>
            Data Consulting Group Ltd (DCG, "we", "us") provides this website
            and related information. By accessing or using the site, you agree
            to these terms and our{" "}
            <Link
              href="/privacy"
              className="font-semibold text-dcg-lightBlue hover:underline"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </section>

        <section className="space-y-4 text-sm text-dcg-slate">
          <h2 className="text-lg font-semibold text-dcg-ink">
            Using the website
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Use the site for lawful, legitimate purposes only.</li>
            <li>
              Do not attempt to access non-public areas or interfere with site
              operations.
            </li>
            <li>
              We may update or withdraw content without notice to keep the site
              accurate and secure.
            </li>
          </ul>
        </section>

        <section className="space-y-4 text-sm text-dcg-slate">
          <h2 className="text-lg font-semibold text-dcg-ink">
            Services and proposals
          </h2>
          <p>
            Any consulting services are governed by a separate statement of
            work, master services agreement, or contract. Website content is
            informational and does not create a binding offer.
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Proposals are valid only for the period stated in them.</li>
            <li>Pricing, timelines, and scope are subject to change.</li>
          </ul>
        </section>

        <section className="space-y-4 text-sm text-dcg-slate">
          <h2 className="text-lg font-semibold text-dcg-ink">
            Intellectual property
          </h2>
          <p>
            We own or license all content on this site, including text, visuals,
            and branding. You may view or download materials for personal use
            only and must not reproduce or distribute them without written
            permission.
          </p>
        </section>

        <section className="space-y-4 text-sm text-dcg-slate">
          <h2 className="text-lg font-semibold text-dcg-ink">
            Feedback and submissions
          </h2>
          <p>
            If you send us ideas or feedback, you grant DCG a non-exclusive,
            worldwide right to use, adapt, and incorporate that feedback without
            restriction or compensation.
          </p>
        </section>

        <section className="space-y-4 text-sm text-dcg-slate">
          <h2 className="text-lg font-semibold text-dcg-ink">
            Third-party links
          </h2>
          <p>
            Our site may link to third-party websites. We do not control those
            sites and are not responsible for their content or policies.
          </p>
        </section>

        <section className="space-y-4 text-sm text-dcg-slate">
          <h2 className="text-lg font-semibold text-dcg-ink">Disclaimers</h2>
          <p>
            The site and its content are provided "as is" without warranties of
            any kind. We do not guarantee that the site will be available,
            error-free, or fit for a particular purpose.
          </p>
        </section>

        <section className="space-y-4 text-sm text-dcg-slate">
          <h2 className="text-lg font-semibold text-dcg-ink">
            Limitation of liability
          </h2>
          <p>
            To the maximum extent permitted by law, DCG is not liable for any
            indirect, incidental, or consequential damages arising from your
            use of the site.
          </p>
        </section>

        <section className="space-y-4 text-sm text-dcg-slate">
          <h2 className="text-lg font-semibold text-dcg-ink">Governing law</h2>
          <p>
            These terms are governed by the laws of England and Wales. Courts
            in England and Wales have exclusive jurisdiction.
          </p>
        </section>

        <section className="space-y-4 text-sm text-dcg-slate">
          <h2 className="text-lg font-semibold text-dcg-ink">
            Changes to these terms
          </h2>
          <p>
            We may update these terms from time to time. Updates will be posted
            on this page and reflected by the last updated date.
          </p>
        </section>

        <section className="space-y-2 text-sm text-dcg-slate">
          <h2 className="text-lg font-semibold text-dcg-ink">Contact us</h2>
          <p>
            Questions about these terms? Email{" "}
            <a
              href="mailto:info@dataconsulting-group.com"
              className="font-semibold text-dcg-lightBlue hover:underline"
            >
              info@dataconsulting-group.com
            </a>
            .
          </p>
          <p>Address: London, United Kingdom</p>
        </section>
      </div>
    </main>
  );
}
