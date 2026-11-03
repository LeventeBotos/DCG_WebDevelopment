"use client";

import { useEffect, useState } from "react";
import { ColumnChart, RankedBars } from "@/components/admin/AnalyticsCharts";

type Live = {
  activeNow: number;
  last30Minutes: number;
  pages: { key: string; value: number }[];
  countries: { key: string; value: number }[];
  devices: { key: string; value: number }[];
  perMinute: number[];
  at: string;
};

/** Polls the realtime endpoint every 15 seconds while the tab is visible. */
export default function RealtimePanel({ pageLabels, countryLabels }: { pageLabels: Record<string, string>; countryLabels: Record<string, string> }) {
  const [live, setLive] = useState<Live | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let stopped = false;
    const load = async () => {
      if (document.visibilityState === "hidden") return;
      try {
        const res = await fetch("/api/admin/analytics/realtime", { cache: "no-store" });
        if (!res.ok) throw new Error();
        if (!stopped) {
          setLive(await res.json());
          setError(false);
        }
      } catch {
        if (!stopped) setError(true);
      }
    };
    void load();
    const id = setInterval(load, 15000);
    return () => {
      stopped = true;
      clearInterval(id);
    };
  }, []);

  if (!live) return <p className="text-sm text-muted-foreground">{error ? "Could not load live data." : "Loading live data…"}</p>;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border bg-card p-5">
          <p className="text-xs text-muted-foreground">Active right now (last 5 min)</p>
          <p className="mt-1 flex items-center gap-2 text-4xl font-semibold tabular-nums">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
            </span>
            {live.activeNow}
          </p>
        </div>
        <div className="rounded-xl border bg-card p-5">
          <p className="text-xs text-muted-foreground">Visitors in the last 30 min</p>
          <p className="mt-1 text-4xl font-semibold tabular-nums">{live.last30Minutes}</p>
        </div>
        <div className="rounded-xl border bg-card p-5">
          <p className="text-xs text-muted-foreground">Updated</p>
          <p className="mt-1 text-lg font-medium">{new Date(live.at).toLocaleTimeString("en-GB")}</p>
          <p className="text-xs text-muted-foreground">Refreshes every 15 s</p>
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium">Visitors per minute (last 30 min)</p>
        <ColumnChart label="Visitors per minute" data={live.perMinute.map((value, i) => ({ key: `${29 - i}m`, value }))} />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div>
          <p className="mb-2 text-sm font-medium">Pages right now</p>
          <RankedBars label="Active pages" data={live.pages.map((p) => ({ ...p, key: pageLabels[p.key] ?? p.key }))} />
        </div>
        <div>
          <p className="mb-2 text-sm font-medium">Countries</p>
          <RankedBars label="Active countries" data={live.countries.map((p) => ({ ...p, key: countryLabels[p.key] ?? p.key }))} />
        </div>
        <div>
          <p className="mb-2 text-sm font-medium">Devices</p>
          <RankedBars label="Active devices" data={live.devices} />
        </div>
      </div>
    </div>
  );
}
