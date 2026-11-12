import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";
import { services } from "@/lib/services";
import { platforms } from "@/lib/platforms";
import { getPublishedJobs } from "@/lib/jobs/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const industrySlugs = ["energy", "banking", "manufacturing", "retail"] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl() ?? new URL("https://dataconsulting-group.com");
  const now = new Date();

  const staticRoutes = [
    "/",
    "/services",
    "/solutions",
    "/industries",
    "/projects",
    "/insights",
    "/careers",
    "/contact",
    "/credits",
    "/privacy-policy",
    "/cookie-policy",
    "/terms-of-service",
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

  // Published jobs from the admin panel (falls back to the static roles if Firestore is unreachable).
  for (const job of await getPublishedJobs()) {
    entries.push({
      url: new URL(`/careers/${job.id}`, base).toString(),
      lastModified: now,
    });
  }

  return entries;
}
