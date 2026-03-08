export const siteConfig = {
  name: "Data Consulting Group Ltd",
  shortName: "DCG",
  defaultTitle: "Data Consulting Group",
  titleTemplate: "%s | Data Consulting Group",
  description:
    "Production-ready AI, data, and cloud consulting for ambitious enterprises.",
  ogImagePath: "/logo.png",
  locale: "en_GB",
  defaultSiteUrl: "https://www.dataconsulting-group.com",
  socialLinks: {
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || null,
    x: process.env.NEXT_PUBLIC_X_URL || null,
  },
} as const;

export function getSiteUrl(): URL | null {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    process.env.VERCEL_URL ||
    siteConfig.defaultSiteUrl;

  if (!raw) return null;

  try {
    if (raw.startsWith("http://") || raw.startsWith("https://")) {
      return new URL(raw);
    }

    return new URL(`https://${raw}`);
  } catch {
    return null;
  }
}
