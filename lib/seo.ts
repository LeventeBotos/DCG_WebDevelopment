import { getSiteUrl } from "@/lib/site";

export function absoluteUrl(pathname: string): string | null {
  const base = getSiteUrl();
  if (!base) return null;

  const normalized =
    pathname.startsWith("/") ? pathname : `/${pathname}`;
  return new URL(normalized, base).toString();
}

