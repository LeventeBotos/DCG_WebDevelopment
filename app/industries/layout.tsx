import type React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

const title = "Industries | Data Consulting Group";
const description =
  "Industry playbooks for applying AI and analytics across energy, banking, manufacturing, retail, aviation, and transportation.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/industries" },
  openGraph: {
    type: "website",
    url: "/industries",
    siteName: siteConfig.defaultTitle,
    title,
    description,
    images: [siteConfig.ogImagePath],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
