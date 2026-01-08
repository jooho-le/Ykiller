"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ClassDistributionItem, TimeSeriesItem } from "@/lib/types"

const chartColors: Record<string, string> = {
  AD: "hsl(var(--chart-1))",
  SPAM: "hsl(var(--chart-2))",
  SUS: "hsl(var(--chart-3))",
  OK: "hsl(var(--chart-4))"
}

type ClassChartProps = {
  distribution: ClassDistributionItem[]
  timeSeries: TimeSeriesItem[]
}

export default function ClassChart({ distribution, timeSeries }: ClassChartProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="card-surface">
        <CardHeader>
          <CardTitle className="font-display text-lg">탐지 분류 비율</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={distribution} barSize={32}>
              <CartesianGrid strokeDasharray="4 4" stroke="hsl(var(--border))" opacity={0.4} />
              <XAxis dataKey="label" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                cursor={{ fill: "rgba(255,255,255,0.03)" }}
                contentStyle={{
                  background: "hsl(var(--panel))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 12
                }}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]} stroke="rgba(255,255,255,0.08)">
                {distribution.map((entry) => (
                  <Cell key={entry.label} fill={chartColors[entry.label] ?? "hsl(var(--chart-1))"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="card-surface">
        <CardHeader>
          <CardTitle className="font-display text-lg">댓글 시간대 분포</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timeSeries}>
              <CartesianGrid strokeDasharray="4 4" stroke="hsl(var(--border))" opacity={0.4} />
              <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                cursor={{ stroke: "hsl(var(--accent))" }}
                contentStyle={{
                  background: "hsl(var(--panel))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 12
                }}
              />
              <Line
                type="monotone"
                dataKey="count"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2}
                dot={{ r: 3, fill: "hsl(var(--chart-1))" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
