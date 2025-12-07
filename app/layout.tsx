import type React from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Navbar";
import Footer from "@/components/footer";
import WhatsAppChat from "@/components/whatsapp-chat";

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
