import type React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

const title = "Contact | Data Consulting Group";
const description =
  "Talk to DCG about AI strategy, data platforms, knowledge graphs, digital twins, and production-ready delivery.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    url: "/contact",
    siteName: siteConfig.defaultTitle,
    title,
    description,
    images: [siteConfig.ogImagePath],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
