import type React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

const title = "Projects & Case Studies | Data Consulting Group";
const description =
  "Explore featured solutions and projects—from digital twins to retail AI—delivered with strategy, implementation, and adoption support.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/projects" },
  openGraph: {
    type: "website",
    url: "/projects",
    siteName: siteConfig.defaultTitle,
    title,
    description,
    images: [siteConfig.ogImagePath],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
