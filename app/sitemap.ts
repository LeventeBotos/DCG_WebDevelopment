import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";
import { services } from "@/lib/services";
import { platforms } from "@/lib/platforms";

const industrySlugs = ["energy", "banking", "manufacturing", "retail"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl() ?? new URL("http://localhost:3000");
  const now = new Date();

  const staticRoutes = [
    "/",
    "/services",
    "/solutions",
    "/industries",
    "/projects",
    "/projects/knowledge-graph",
    "/insights",
    "/careers",
    "/contact",
  ];

  const entries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: new URL(path, base).toString(),
    lastModified: now,
  }));

  for (const { slug } of services) {
    entries.push({
      url: new URL(`/services/${slug}`, base).toString(),
      lastModified: now,
    });
  }

  for (const { slug } of platforms) {
    entries.push({
      url: new URL(`/solutions/${slug}`, base).toString(),
      lastModified: now,
    });
  }

  for (const slug of industrySlugs) {
    entries.push({
      url: new URL(`/industries/${slug}`, base).toString(),
      lastModified: now,
    });
  }

  return entries;
}
