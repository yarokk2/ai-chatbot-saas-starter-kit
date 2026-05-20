"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  { month: "Jan", revenue: 4200, users: 120 },
  { month: "Feb", revenue: 5100, users: 180 },
  { month: "Mar", revenue: 6800, users: 260 },
  { month: "Apr", revenue: 7400, users: 340 },
  { month: "May", revenue: 9800, users: 520 },
  { month: "Jun", revenue: 12450, users: 842 },
];

export default function AnalyticsChart() {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient
              id="revenueGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="#3B82F6"
                stopOpacity={0.8}
              />
              <stop
                offset="100%"
                stopColor="#8B5CF6"
                stopOpacity={0.05}
              />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(148, 163, 184, 0.15)"
          />

          <XAxis
            dataKey="month"
            stroke="#94A3B8"
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            stroke="#94A3B8"
            tickLine={false}
            axisLine={false}
          />

          <Tooltip
            contentStyle={{
              borderRadius: "16px",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(15,23,42,0.95)",
              color: "#fff",
            }}
          />

          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#6366F1"
            strokeWidth={3}
            fill="url(#revenueGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}