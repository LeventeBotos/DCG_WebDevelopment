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
      lastUpdated="February 2026"
      intro={[
        "To manage or change your cookie preferences, use the Manage cookies option at the bottom of the page.",
        "We use cookies and related web technologies to improve performance, enhance browsing experience, support security, and understand how visitors use the site.",
      ]}
      sections={[
        {
          title: "What is a cookie?",
          paragraphs: [
            "A cookie is a small piece of data stored in your browser by a website. Cookies and related technologies help websites remember activity, maintain functionality, and measure usage.",
            "Alongside cookies, we may use lightweight code snippets, software components, and server-side analytics/security tools.",
          ],
        },
        {
          title: "Cookie preferences",
          paragraphs: [
            "On your first visit, you are asked whether to accept analytics cookies. You can change this choice at any time through Manage cookies.",
            "For general information about cookies, visit allaboutcookies.org.",
          ],
          bullets: [
            "Functional cookies: required for basic website functionality.",
            "Performance cookies: help us understand usage and improve content and navigation.",
          ],
        },
        {
          title: "Analytics",
          paragraphs: [
            "We use Google Analytics to collect aggregated statistics about how visitors use our website.",
          ],
          bullets: [
            "Approximate location and language settings.",
            "Number of visits and page popularity.",
            "Referral source information (how users found the site).",
            "Technical browsing data such as IP-related signals.",
          ],
        },
        {
          title: "Content testing and performance",
          paragraphs: [
            "During content updates, we may compare content variants with different visitor groups to understand what performs better and improve the user experience.",
          ],
        },
        {
          title: "Surveys",
          paragraphs: [
            "We may run optional surveys about our services and website. Cookie-based controls can help avoid repeatedly showing the same survey to returning visitors.",
          ],
        },
        {
          title: "Advertising and campaign cookies",
          paragraphs: [
            "In some cases, social media or advertising partners may place third-party cookies to support campaign measurement and personalized services on their platforms.",
            "Use of your information by third parties is governed by their own privacy policies, not this policy.",
          ],
        },
        {
          title: "Conversion tracking",
          paragraphs: [
            "We may use conversion pixels or similar tools to measure campaign effectiveness, for example when a visitor completes a sign-up or reaches a confirmation page.",
          ],
        },
      ]}
    />
  );
}
