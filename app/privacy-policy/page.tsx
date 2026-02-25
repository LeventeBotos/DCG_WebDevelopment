import type { Metadata } from "next";
import Link from "next/link";
import LegalDocumentPage from "@/components/legal/LegalDocumentPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Data Consulting Group collects, uses, shares, and protects personal data.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalDocumentPage
      title="Privacy Policy"
      description="This notice explains how Data Consulting Group (DCG) Ltd and its subsidiaries process and protect personal data when you use this website."
      lastUpdated="February 2026"
      intro={[
        "We respect your privacy and are committed to protecting your personal information. This notice describes how we look after your personal data and explains your legal rights under applicable data protection law.",
      ]}
      sections={[
        {
          title: "Who we are and important information",
          paragraphs: [
            "This privacy notice applies to Data Consulting Group (DCG) Ltd and its subsidiaries and affiliates. It explains how we collect and process personal data when you visit our website, including when you contact us or sign up for publications.",
            "This website is not intended for children, and we do not knowingly collect data relating to children.",
            <>
              Data Consulting Group Ltd is the data controller for personal
              data processed under this notice. Contact: Data Protection
              Officer, Data Consulting Group Ltd, BR4 9NG, England, or{" "}
              <a
                href="mailto:info@dataconsulting-group.com"
                className="font-medium text-dcg-lightBlue hover:underline"
              >
                info@dataconsulting-group.com
              </a>
              .
            </>,
            "Our website may include links to third-party websites, plug-ins, and applications. We do not control those third-party sites and are not responsible for their privacy notices.",
          ],
        },
        {
          title: "The personal data we collect",
          paragraphs: [
            "Personal data means any information from which an individual can be identified. We may collect, use, store, and transfer personal data relevant to providing and improving our services.",
            "We do not collect special categories of personal data (for example, health, biometric, religious, political, or criminal data) through this website.",
          ],
          bullets: [
            "Identity data (such as first name, last name, username, title, and date of birth).",
            "Contact data (such as billing or delivery address, email address, and telephone numbers).",
            "Aggregated usage data for analytics and service improvement.",
            "If required personal data is not provided, we may be unable to provide some products or services.",
          ],
        },
        {
          title: "How we collect personal data",
          paragraphs: [
            "We use different methods to collect data from and about you, including direct interactions and usage of our website and services.",
          ],
          bullets: [
            "When you apply for products or services.",
            "When you create an account.",
            "When you subscribe to publications or marketing communications.",
            "When you request information from us.",
            "When you engage with us through a business or contractual relationship.",
          ],
        },
        {
          title: "How we use personal data",
          paragraphs: [
            "We only process personal data when the law allows us to. Most commonly, we rely on performance of a contract, legitimate interests, or legal obligations.",
            "We may process your data for more than one lawful basis depending on the purpose. For details on the legal basis for a specific use case, contact our Data Protection Officer.",
          ],
          bullets: [
            "Customer registration: identity and contact data, based on performance of a contract.",
            "Marketing communications: identity and contact data, based on legitimate interests or consent where required.",
            "Site traffic information and cookies: identity/contact signals and usage data, based on legitimate interests and consent for non-essential cookies.",
            "You can opt out of marketing messages at any time by following the unsubscribe instructions in those messages.",
          ],
        },
        {
          title: "Cookies and similar technologies",
          paragraphs: [
            "You can set your browser to refuse all or some cookies, or to alert you when cookies are set or accessed. If you disable cookies, parts of this site may not function correctly.",
            <>
              For more detail, see our{" "}
              <Link
                href="/cookie-policy"
                className="font-medium text-dcg-lightBlue hover:underline"
              >
                Cookie Policy
              </Link>
              .
            </>,
          ],
        },
        {
          title: "Who we share personal data with",
          paragraphs: [
            "We may share personal data with trusted parties where necessary for business and legal purposes.",
          ],
          bullets: [
            "Internal group companies, subsidiaries, and affiliates.",
            "External partners and service providers acting as processors.",
            "Professional advisers such as lawyers, auditors, insurers, and consultants.",
            "Regulators, tax authorities, and other public bodies where required.",
            "Prospective buyers or merged entities if our business is sold, transferred, or restructured.",
          ],
        },
        {
          title: "International transfers",
          paragraphs: [
            "Some external providers are based outside the UK. When personal data is transferred internationally, we apply safeguards to ensure an equivalent level of protection.",
          ],
        },
        {
          title: "Data security",
          paragraphs: [
            "We implement appropriate technical and organizational measures to protect personal data from unauthorized access, alteration, disclosure, or destruction.",
            "Access is limited to individuals and suppliers with a legitimate business need and subject to confidentiality obligations.",
          ],
        },
        {
          title: "Data retention",
          paragraphs: [
            "We retain personal data only for as long as needed for the purposes we collected it for, including legal, regulatory, tax, accounting, or reporting requirements.",
          ],
        },
        {
          title: "Your legal rights",
          paragraphs: [
            "Subject to applicable law, you may have rights to access, correct, erase, restrict, object to processing, withdraw consent, and request portability of your personal data.",
            "You will not usually need to pay a fee to exercise your rights, but we may charge a reasonable fee or refuse a request if it is clearly unfounded, repetitive, or excessive.",
            "We may request additional information to confirm your identity before completing a rights request.",
          ],
          bullets: [
            "Right of access to a copy of your personal data.",
            "Right to rectification of inaccurate or incomplete data.",
            "Right to erasure in certain circumstances.",
            "Right to restrict processing in certain circumstances.",
            "Right to data portability where applicable.",
            "Right to object to direct marketing and certain other processing.",
          ],
        },
        {
          title: "Changes to this notice",
          paragraphs: [
            "We may update this privacy notice from time to time. Please check this page periodically. Keep us informed if your personal data changes during your relationship with us.",
          ],
        },
        {
          title: "Queries, requests, or concerns",
          paragraphs: [
            <>
              For any privacy question, complaint, or rights request, contact
              our Data Protection Officer at{" "}
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
