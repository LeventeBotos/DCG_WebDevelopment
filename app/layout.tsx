import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsAppChat from "@/components/whatsapp-chat";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Data Consulting Group Ltd",
  description:
    "AI predictions and data consulting for leading British companies",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-white text-slate-900`}
      >
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        {/* <WhatsAppChat /> */}
      </body>
    </html>
  );
}
