"use client";

import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const tooltipStyle = {
  background: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: 8,
  fontSize: 12,
  color: "hsl(var(--card-foreground))",
};

export function TrafficChart({ data }: { data: { date: string; pageviews: number; applications: number }[] }) {
  return (
    <div className="h-64 w-full" role="img" aria-label="Daily pageviews and completed applications">
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ left: -16, right: 8, top: 8 }}>
          <defs>
            <linearGradient id="pv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0A4C8A" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#0A4C8A" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
          <XAxis dataKey="date" tickFormatter={(d: string) => d.slice(5)} tick={{ fontSize: 11 }} minTickGap={24} />
          <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
          <Tooltip contentStyle={tooltipStyle} />
          <Area type="monotone" dataKey="pageviews" name="Pageviews" stroke="#0A4C8A" strokeWidth={2} fill="url(#pv)" />
          <Area type="monotone" dataKey="applications" name="Applications" stroke="#00CACA" strokeWidth={2} fill="transparent" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function RankedBars({ data, label }: { data: { key: string; value: number }[]; label: string }) {
  if (data.length === 0) return <p className="text-sm text-muted-foreground">No data yet.</p>;
  return (
    <div className="w-full" style={{ height: Math.max(120, data.length * 32) }} role="img" aria-label={label}>
      <ResponsiveContainer>
        <BarChart data={data} layout="vertical" margin={{ left: 8, right: 16 }}>
          <XAxis type="number" hide allowDecimals={false} />
          <YAxis type="category" dataKey="key" width={120} tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
          <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "hsl(var(--muted))" }} />
          <Bar dataKey="value" name="Count" fill="#0A4C8A" radius={[0, 4, 4, 0]} barSize={14} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
