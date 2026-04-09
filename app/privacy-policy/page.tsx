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
      lastUpdated="April 2026"
      pdfHref="/documents/PrivacyPolicy.pdf"
      pdfLabel="View Privacy Policy PDF"
      intro={[
        "We respect your privacy and are committed to protecting your personal information. This notice describes how we look after your personal data and explains your legal rights under applicable data protection law.",
      ]}
      sections={[
        {
          title: "Who we are and important information",
          paragraphs: [
            "This privacy notice applies to Data Consulting Group (DCG) Ltd and explains how we collect and process personal data when you visit our website, contact us, or apply for a role.",
            "This website is not intended for children, and we do not knowingly collect data relating to children.",
            <>
              Data Consulting Group Ltd is the data controller for personal
              data processed under this notice. For privacy questions, contact{" "}
              us at{" "}
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
            "Identity and contact data you submit through our contact or careers forms, such as name, email address, phone number, company, and location.",
            "Recruitment data you choose to provide, such as CV or portfolio links, experience, notice period, and application messages.",
            "Technical and usage data such as IP address, browser or device information, page views, referral information, and basic server request metadata.",
            "Preference data, including whether you accepted or rejected analytics cookies.",
          ],
        },
        {
          title: "How we collect personal data",
          paragraphs: [
            "We use different methods to collect data from and about you, including direct interactions and usage of our website and services.",
          ],
          bullets: [
            "When you complete the contact form or communicate with us by email or phone.",
            "When you apply for a role through the careers section.",
            "When you browse the website and our hosting, security, and analytics providers receive technical request data.",
            "When you choose your cookie settings through the consent banner.",
          ],
        },
        {
          title: "How we use personal data",
          paragraphs: [
            "We only process personal data when the law allows us to. Most commonly, we rely on performance of a contract, legitimate interests, or legal obligations.",
            "We may process your data for more than one lawful basis depending on the purpose. If you need more detail about the legal basis for a specific use case, contact us.",
          ],
          bullets: [
            "Responding to enquiries and business requests: identity and contact data, based on our legitimate interests and pre-contract steps.",
            "Recruitment administration: identity, contact, and career application data, based on our legitimate interests in hiring and assessing candidates.",
            "Operating, securing, and troubleshooting the website: technical data and server logs, based on our legitimate interests.",
            "Optional analytics measurement: usage data processed through Google Analytics only where you have consented to non-essential analytics cookies.",
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
            "Cloudflare and similar infrastructure providers for hosting, content delivery, and security services.",
            "Resend for transactional email delivery from our contact and careers forms.",
            "Google Analytics, but only after you consent to optional analytics cookies.",
            "External partners and service providers acting as processors.",
            "Professional advisers such as lawyers, auditors, insurers, and consultants.",
            "Regulators, tax authorities, and other public bodies where required.",
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
              For any privacy question, complaint, or rights request, contact us
              at{" "}
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
