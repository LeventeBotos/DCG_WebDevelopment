"use client";

import type React from "react";
import Link from "next/link";
import { track, type AnalyticsEventName } from "@/lib/analytics";

type TrackedLinkProps = React.ComponentProps<typeof Link> & {
  event: AnalyticsEventName;
  eventParams?: Record<string, unknown>;
};

// Lets server components render links that fire an analytics event on click
// without turning the whole parent into a client component.
export default function TrackedLink({
  event,
  eventParams,
  onClick,
  ...props
}: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        track(event, eventParams);
        onClick?.(e);
      }}
    />
  );
}
