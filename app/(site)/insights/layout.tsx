import type React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

const title = "Insights | Data Consulting Group";
const description =
  "Short reads on agentic enterprise, AI adoption, and building AI-first operating models that scale.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/insights" },
  openGraph: {
    type: "website",
    url: "/insights",
    siteName: siteConfig.defaultTitle,
    title,
    description,
    images: [siteConfig.ogImagePath],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
