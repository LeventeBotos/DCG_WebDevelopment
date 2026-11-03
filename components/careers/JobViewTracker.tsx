"use client";

import { useEffect } from "react";
import { collect } from "@/lib/collect";

export default function JobViewTracker({ jobId }: { jobId: string }) {
  useEffect(() => {
    collect("job_view", { job: jobId });
  }, [jobId]);
  return null;
}
