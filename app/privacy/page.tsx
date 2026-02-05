import Link from "next/link";
import type { Metadata } from "next";

const lastUpdated = "January 18, 2026";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Data Consulting Group Ltd.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12 md:py-16">
      <div className="space-y-8">
        <header className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-dcg-lightGreen">
            Privacy
          </p>
          <h1 className="text-3xl font-semibold text-dcg-ink">
            Privacy policy for Data Consulting Group Ltd
          </h1>
          <p className="text-sm text-dcg-slate">Last updated: {lastUpdated}</p>
        </header>

        <section className="space-y-4 text-sm text-dcg-slate">
          <h2 className="text-lg font-semibold text-dcg-ink">
            Who we are and what this policy covers
          </h2>
          <p>
            Data Consulting Group Ltd (DCG, "we", "us") operates this website.
            This policy covers personal data collected through this site,
            including analytics data (only after consent) and information you
            share through our contact form.
          </p>
        </section>

        <section className="space-y-4 text-sm text-dcg-slate">
          <h2 className="text-lg font-semibold text-dcg-ink">
            Data we collect
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Contact form details: name, email, company, country, topic, and
              your message.
            </li>
            <li>
              Technical data: device, browser, and usage activity captured by
              Google Analytics after you accept analytics cookies.
            </li>
            <li>
              Cookie preferences: we store a small preference cookie called{" "}
              <span className="font-semibold">dcg_cookie_consent</span>.
            </li>
          </ul>
        </section>

        <section className="space-y-4 text-sm text-dcg-slate">
          <h2 className="text-lg font-semibold text-dcg-ink">
            How we use your data
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Respond to inquiries and provide requested information.</li>
            <li>Improve site performance and understand content demand.</li>
            <li>Keep the site secure and prevent abuse.</li>
            <li>Meet legal, regulatory, or contractual obligations.</li>
          </ul>
        </section>

        <section className="space-y-4 text-sm text-dcg-slate">
          <h2 className="text-lg font-semibold text-dcg-ink">Legal basis</h2>
          <p>
            We process analytics data based on your consent. We process contact
            form data based on our legitimate interests in responding to
            business inquiries, and to take steps at your request before
            entering into a contract. You can withdraw consent at any time by
            using the Manage cookies link in the footer.
          </p>
        </section>

        <section className="space-y-4 text-sm text-dcg-slate">
          <h2 className="text-lg font-semibold text-dcg-ink">
            Cookies and analytics
          </h2>
          <p>
            We use Google Analytics to understand site usage. Analytics scripts
            only load after you accept analytics cookies. We enable IP
            anonymization within Google Analytics.
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Analytics cookies typically include{" "}
              <span className="font-semibold">_ga</span> and{" "}
              <span className="font-semibold">_ga_*</span>.
            </li>
            <li>
              You can change your preference anytime via the Manage cookies
              link in the footer.
            </li>
            <li>
              Google privacy policy:{" "}
              <Link
                href="https://policies.google.com/privacy"
                className="font-semibold text-dcg-lightBlue hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                policies.google.com/privacy
              </Link>
              .
            </li>
          </ul>
        </section>

        <section className="space-y-4 text-sm text-dcg-slate">
          <h2 className="text-lg font-semibold text-dcg-ink">
            Sharing and transfers
          </h2>
          <p>
            We use service providers to run our site and deliver email.
            Providers may process data outside the UK or EEA, but we rely on
            appropriate safeguards and contractual protections.
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Google Analytics (website analytics).</li>
            <li>Resend (email delivery for contact forms).</li>
          </ul>
        </section>

        <section className="space-y-4 text-sm text-dcg-slate">
          <h2 className="text-lg font-semibold text-dcg-ink">Data retention</h2>
          <p>
            We keep contact form data as long as needed to respond and for
            legitimate business purposes. Analytics data is retained according
            to our Google Analytics settings and reviewed periodically.
          </p>
        </section>

        <section className="space-y-4 text-sm text-dcg-slate">
          <h2 className="text-lg font-semibold text-dcg-ink">Your rights</h2>
          <p>
            If you are in the UK or EU, you can request access, correction,
            deletion, restriction, or portability of your data, and you can
            object to processing. You can also withdraw consent for analytics
            at any time.
          </p>
          <p>
            You can lodge a complaint with the UK Information Commissioner's
            Office (ICO):{" "}
            <Link
              href="https://ico.org.uk"
              className="font-semibold text-dcg-lightBlue hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              ico.org.uk
            </Link>
            .
          </p>
        </section>

        <section className="space-y-2 text-sm text-dcg-slate">
          <h2 className="text-lg font-semibold text-dcg-ink">Contact us</h2>
          <p>
            Email:{" "}
            <a
              href="mailto:info@dataconsulting-group.com"
              className="font-semibold text-dcg-lightBlue hover:underline"
            >
              info@dataconsulting-group.com
            </a>
          </p>
          <p>Address: London, United Kingdom</p>
        </section>
      </div>
    </main>
  );
}
