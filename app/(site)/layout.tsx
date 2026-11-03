import type { ReactNode } from "react";
import Header from "@/components/Navbar";
import Footer from "@/components/footer";
import Analytics from "@/components/Analytics";
import CookieBanner from "@/components/CookieBanner";
import CollectPageview from "@/components/CollectPageview";
import AnalyticsExtras from "@/components/AnalyticsExtras";
import { getGoogleAnalyticsId } from "@/lib/analytics-config";

/**
 * Public-site chrome (nav, footer, cookie banner, GA). Lives in a route group so the admin panel and API
 * routes never bundle it — this keeps the Cloudflare Pages Functions bundle under its 25 MiB limit.
 */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Analytics measurementId={getGoogleAnalyticsId()} />
      <CollectPageview />
      <AnalyticsExtras />
      <Header />
      <main id="main-content" className="flex-grow" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <CookieBanner />
    </>
  );
}
