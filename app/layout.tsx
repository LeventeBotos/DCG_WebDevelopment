import type React from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Navbar";
import Footer from "@/components/footer";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Data Consulting Group Ltd",
  description:
    "AI predictions and data consulting for leading British companies",
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
    <html lang="en">
      <head>
        <Script
          // async
          src="https://www.googletagmanager.com/gtag/js?id=G-T9WH3XWBH5"
          strategy="afterInteractive"
        ></Script>
        <Script id="googleAnalytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-T9WH3XWBH5');`}
        </Script>
      </head>
      <body
        className={`${inter.className} min-h-screen flex relative flex-col  text-slate-900`}
      >
        <Header />
        {/* <Header /> */}
        <main className="flex-grow">{children}</main>
        <Footer />
        {/* <WhatsAppChat /> */}
      </body>
    </html>
  );
}
