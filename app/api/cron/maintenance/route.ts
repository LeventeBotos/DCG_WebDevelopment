import { cronAuthorized } from "@/lib/cron-auth";
import { runMaintenance } from "@/lib/maintenance";

export const runtime = "edge";
export const dynamic = "force-dynamic";

async function run(req: Request) {
  if (!cronAuthorized(req)) return Response.json({ error: "Unauthorized" }, { status: 401 });
  return Response.json(await runMaintenance());
}
export const GET = run;
export const POST = run;
