import type React from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Navbar";
import Footer from "@/components/footer";
import Analytics from "@/components/Analytics";
import CookieBanner from "@/components/CookieBanner";
import { getGoogleAnalyticsId } from "@/lib/analytics-config";
import { siteConfig, getSiteUrl } from "@/lib/site";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = getSiteUrl();
const googleAnalyticsId = getGoogleAnalyticsId();

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
        width: 1200,
        height: 630,
        alt: siteConfig.defaultTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
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
  manifest: "/manifest.webmanifest",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  // Served from public/ rather than app/icon.png so Cloudflare Pages sees them as static files.
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
  appleWebApp: {
    title: siteConfig.shortName,
    statusBarStyle: "black",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#000000",
};

const canonicalSiteUrl = (siteUrl ?? new URL(siteConfig.defaultSiteUrl))
  .toString()
  .replace(/\/$/, "");

// Tells search engines the site name shown above results and the brand logo.
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${canonicalSiteUrl}/#website`,
      url: `${canonicalSiteUrl}/`,
      name: siteConfig.defaultTitle,
      alternateName: [siteConfig.shortName, siteConfig.name],
      publisher: { "@id": `${canonicalSiteUrl}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${canonicalSiteUrl}/#organization`,
      name: siteConfig.name,
      alternateName: siteConfig.shortName,
      url: `${canonicalSiteUrl}/`,
      logo: `${canonicalSiteUrl}/icon-512.png`,
      email: "info@dataconsulting-group.com",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB">
      <body
        suppressHydrationWarning
        className={`${inter.className} relative flex min-h-screen flex-col text-slate-900 antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only z-[100] rounded-md bg-white px-4 py-2 text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Analytics measurementId={googleAnalyticsId} />
        <Header />
        <main id="main-content" className="flex-grow" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
