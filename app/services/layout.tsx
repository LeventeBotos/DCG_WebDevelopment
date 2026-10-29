import type React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

const title = "Services | Data Consulting Group";
const description =
  "Data, AI, and cloud operations services that take strategy to production with governance, MLOps, and measurable outcomes.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/services" },
  openGraph: {
    type: "website",
    url: "/services",
    siteName: siteConfig.defaultTitle,
    title,
    description,
    images: [siteConfig.ogImagePath],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
