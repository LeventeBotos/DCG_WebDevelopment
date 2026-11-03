import { handleCollect } from "@/lib/analytics/collector";

export const runtime = "edge";
export const dynamic = "force-dynamic";

/** Cookieless first-party analytics. See lib/analytics/collector.ts for the privacy model. */
export async function POST(req: Request) {
  return handleCollect(req);
}
