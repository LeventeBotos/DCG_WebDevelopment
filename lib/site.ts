export const siteConfig = {
  name: "Data Consulting Group Ltd",
  shortName: "DCG",
  defaultTitle: "Data Consulting Group",
  titleTemplate: "%s | Data Consulting Group",
  description: "AI predictions and data consulting for leading British companies",
  ogImagePath: "/logo.png",
  locale: "en_GB",
} as const;

export function getSiteUrl(): URL | null {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    process.env.VERCEL_URL;

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

