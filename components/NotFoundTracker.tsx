"use client";

import { useEffect } from "react";
import { collect } from "@/lib/collect";

export default function NotFoundTracker() {
  useEffect(() => {
    collect("not_found");
  }, []);
  return null;
}
