"use client"

import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useMockDataStore } from "@/lib/store"

const chartColorMap: Record<string, string> = {
  AD: "hsl(var(--chart-1))",
  SPAM: "hsl(var(--chart-2))",
  SUS: "hsl(var(--chart-3))",
  OK: "hsl(var(--chart-4))"
}

export default function ClassDistributionChart() {
  const distribution = useMockDataStore((state) => state.data.distribution)

  return (
    <Card className="card-surface">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>분류 분포</CardTitle>
          <CardDescription>최근 24시간 댓글 기준</CardDescription>
        </div>
        <Badge variant="ghost">AD / SPAM / SUS / OK</Badge>
      </CardHeader>
      <CardContent className="h-72 pt-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={distribution} barSize={36} margin={{ top: 10, left: 0, right: 10, bottom: 0 }}>
            <XAxis dataKey="label" stroke="rgba(148, 163, 184, 0.8)" fontSize={12} />
            <YAxis stroke="rgba(148, 163, 184, 0.6)" fontSize={12} />
            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.02)" }}
              contentStyle={{
                background: "rgba(17, 17, 22, 0.9)",
                border: "1px solid rgba(148, 163, 184, 0.2)",
                borderRadius: 10,
                color: "#fff"
              }}
            />
            <Bar dataKey="value" radius={[10, 10, 0, 0]}>
              {distribution.map((entry) => (
                <Cell key={entry.label} fill={chartColorMap[entry.label]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
