import type { Metadata } from "next";
import LegalDocumentPage from "@/components/legal/LegalDocumentPage";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "How Data Consulting Group uses cookies and similar technologies on this website.",
  alternates: {
    canonical: "/cookie-policy",
  },
};

export default function CookiePolicyPage() {
  return (
    <LegalDocumentPage
      title="Cookie Policy"
      description="This page explains what cookies and similar technologies we use, why we use them, and how you can manage your preferences."
      lastUpdated="April 2026"
      pdfHref="/documents/CookiePolicy.pdf"
      pdfLabel="View Cookie Policy PDF"
      intro={[
        "To manage or change your cookie preferences, use the Manage cookies option at the bottom of the page.",
        "We use a small number of cookies and related technologies to keep the website working, remember your analytics preference, and, if you agree, measure site usage in aggregate.",
      ]}
      sections={[
        {
          title: "What is a cookie?",
          paragraphs: [
            "A cookie is a small piece of data stored in your browser by a website. Cookies and related technologies help websites remember activity, maintain functionality, and measure usage.",
            "Alongside cookies, our infrastructure providers may process server-side request data needed to deliver, secure, and troubleshoot the website.",
          ],
        },
        {
          title: "Cookies we use",
          paragraphs: [
            "We currently use the following categories on this website.",
          ],
          bullets: [
            "Strictly necessary preference cookie (`dcg_cookie_consent`): stores whether you accepted or rejected analytics so we can respect your choice on later visits.",
            "Optional analytics cookies (`_ga`, `_ga_*`): set by Google Analytics only if you choose Accept analytics.",
          ],
        },
        {
          title: "How consent works",
          paragraphs: [
            "On your first visit, we ask whether you want to allow analytics cookies. Google Analytics does not load unless you give that consent.",
            "You can withdraw or change your choice at any time through Manage cookies in the footer. When consent is withdrawn, we stop loading Google Analytics and clear Google Analytics cookies from this browser where possible.",
          ],
        },
        {
          title: "Google Analytics",
          paragraphs: [
            "If you opt in, we use Google Analytics to collect aggregated information about page views, navigation paths, approximate location, device/browser information, and referral sources.",
            "Our Google Analytics configuration is set up for measurement only. We do not enable advertising features or ad-personalization signals in the site code.",
          ],
        },
        {
          title: "Infrastructure and server-side processing",
          paragraphs: [
            "This website is hosted and protected using infrastructure providers such as Cloudflare. Those providers may process IP addresses, user-agent strings, and request metadata on the server side to deliver content, mitigate abuse, and keep the service available.",
            "That server-side processing is separate from optional Google Analytics cookies and does not depend on the analytics banner.",
          ],
        },
        {
          title: "What we do not currently use",
          paragraphs: [
            "We do not currently run third-party advertising cookies, social media tracking pixels, or cross-site remarketing tags on this website.",
          ],
        },
      ]}
    />
  );
}
