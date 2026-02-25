import type { Metadata } from "next";
import Link from "next/link";
import LegalDocumentPage from "@/components/legal/LegalDocumentPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of use for accessing and using the Data Consulting Group website.",
  alternates: {
    canonical: "/terms-of-service",
  },
};

export default function TermsOfServicePage() {
  return (
    <LegalDocumentPage
      title="Terms of Service"
      description="These terms govern your access to and use of www.dataconsulting-group.com as a guest or registered user."
      lastUpdated="February 2026"
      intro={[
        "Please read these terms carefully before using our site. By using our site, you confirm that you accept these terms and agree to comply with them. If you do not agree, you must not use this website.",
      ]}
      sections={[
        {
          title: "Other applicable terms",
          paragraphs: [
            <>
              These terms should be read together with our{" "}
              <Link
                href="/privacy-policy"
                className="font-medium text-dcg-lightBlue hover:underline"
              >
                Privacy Policy
              </Link>
              ,{" "}
              <Link
                href="/cookie-policy"
                className="font-medium text-dcg-lightBlue hover:underline"
              >
                Cookie Policy
              </Link>
              , and any additional contractual terms that apply to services we
              provide.
            </>,
          ],
        },
        {
          title: "Information about us",
          paragraphs: [
            "This site is operated by Data Consulting Group Ltd. Registered address: BR4 9NG, England.",
          ],
        },
        {
          title: "Changes to terms and site content",
          paragraphs: [
            "We may revise these terms at any time by amending this page. Please check this page periodically as changes are binding once published.",
            "We may update or change site content at any time.",
          ],
        },
        {
          title: "Accessing our site",
          paragraphs: [
            "Our site is made available free of charge. We do not guarantee that the site or any content will always be available or uninterrupted.",
            "We may suspend, withdraw, discontinue, or change all or any part of the site without notice. We are not liable if the site is unavailable at any time.",
            "You are responsible for making arrangements to access the site and for ensuring anyone using your internet connection is aware of and complies with these terms.",
          ],
        },
        {
          title: "Intellectual property rights",
          paragraphs: [
            "We are the owner or licensee of all intellectual property rights in this site and the material published on it. All rights are reserved.",
          ],
          bullets: [
            "You may print one copy or download extracts of pages for personal use.",
            "You must not modify printed or digital copies.",
            "You must not use images, video, audio, or graphics separately from related text.",
            "You must acknowledge us (and identified contributors) as content authors.",
            "You must not use site content for commercial purposes without a license.",
          ],
        },
        {
          title: "Limitation of liability",
          paragraphs: [
            "Nothing in these terms excludes liability that cannot be excluded under English law, including liability for death or personal injury caused by negligence or for fraud.",
            "To the extent permitted by law, we exclude all implied warranties, representations, and conditions relating to this site and its content.",
          ],
          bullets: [
            "We are not liable for loss arising from use of, inability to use, or reliance on site content.",
            "Business users: we are not liable for loss of profits, sales, revenue, business interruption, anticipated savings, business opportunity, goodwill, reputation, or indirect/consequential loss.",
            "Consumer users: the site is provided for domestic and private use only.",
            "We are not liable for loss caused by viruses, distributed denial-of-service attacks, or other harmful material linked to site use or downloads.",
            "We are not responsible for third-party websites linked from this site.",
          ],
        },
        {
          title: "Linking to our site",
          paragraphs: [
            "You may link to our home page if done fairly and legally, without damaging our reputation or suggesting endorsement where none exists.",
            "You must not frame our site on another website or link to pages other than the homepage without permission.",
            "We may withdraw linking permission at any time without notice.",
          ],
        },
        {
          title: "Third-party links and resources",
          paragraphs: [
            "Links to third-party websites and resources are provided for information only. We do not control or endorse those external resources.",
          ],
        },
        {
          title: "Applicable law",
          paragraphs: [
            "These terms, their subject matter, and formation are governed by English law.",
            "If you are a consumer, courts of England and Wales have non-exclusive jurisdiction. If you are a business, courts of England and Wales have exclusive jurisdiction.",
          ],
        },
        {
          title: "Contact us",
          paragraphs: [
            <>
              Data Consulting Group Ltd, BR4 9NG, England. Email:{" "}
              <a
                href="mailto:info@dataconsulting-group.com"
                className="font-medium text-dcg-lightBlue hover:underline"
              >
                info@dataconsulting-group.com
              </a>
              .
            </>,
          ],
        },
      ]}
    />
  );
}
