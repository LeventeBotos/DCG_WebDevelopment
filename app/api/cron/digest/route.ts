import { cronAuthorized } from "@/lib/cron-auth";
import { buildDigest } from "@/lib/digest";
import { notifyAddress, sendEmail } from "@/lib/email";

export const runtime = "edge";
export const dynamic = "force-dynamic";

/** Weekly digest. Called by the scheduler (see .github/workflows/scheduled-jobs.yml) with the CRON_SECRET. */
async function run(req: Request) {
  if (!cronAuthorized(req)) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const digest = await buildDigest();
  const result = await sendEmail({ to: process.env.DIGEST_TO ?? notifyAddress(), ...digest });
  return Response.json(result, { status: result.ok ? 200 : 502 });
}
export const GET = run;
export const POST = run;
