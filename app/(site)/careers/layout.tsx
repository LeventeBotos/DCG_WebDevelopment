import type React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

const title = "Careers | Data Consulting Group";
const description =
  "Open roles at DCG across ML engineering, cloud solutions, and data consulting, with a direct in-page application form.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/careers" },
  openGraph: {
    type: "website",
    url: "/careers",
    siteName: siteConfig.defaultTitle,
    title,
    description,
    images: [siteConfig.ogImagePath],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
