import type React from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Navbar";
import Footer from "@/components/footer";
import Analytics from "@/components/Analytics";
import CookieBanner from "@/components/CookieBanner";
import { siteConfig, getSiteUrl } from "@/lib/site";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: siteUrl ?? undefined,
  title: {
    default: siteConfig.defaultTitle,
    template: siteConfig.titleTemplate,
  },
  description: siteConfig.description,
  applicationName: siteConfig.shortName,
  keywords: [
    "AI consulting",
    "data consulting",
    "data science",
    "machine learning",
    "MLOps",
    "cloud migration",
    "knowledge graphs",
    "digital twins",
    "generative AI",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl?.toString(),
    siteName: siteConfig.defaultTitle,
    title: siteConfig.defaultTitle,
    description: siteConfig.description,
    locale: siteConfig.locale,
    images: [
      {
        url: siteConfig.ogImagePath,
        width: 512,
        height: 512,
        alt: siteConfig.defaultTitle,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: siteConfig.defaultTitle,
    description: siteConfig.description,
    images: [siteConfig.ogImagePath],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  themeColor: "#000000",
  appleWebApp: {
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB">
      <body
        className={`${inter.className} min-h-screen flex relative flex-col  text-slate-900`}
      >
        <Analytics />
        <Header />
        {/* <Header /> */}
        <main className="flex-grow">{children}</main>
        <Footer />
        <CookieBanner />
        {/* <WhatsAppChat /> */}
      </body>
    </html>
  );
}
