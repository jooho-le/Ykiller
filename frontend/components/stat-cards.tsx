"use client"

import { ArrowDownRight, ArrowUpRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useMockDataStore } from "@/lib/store"

export default function StatCards() {
  const stats = useMockDataStore((state) => state.data.stats)

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const isPositive = stat.change.startsWith("+")
        return (
          <Card key={stat.id} className="card-surface">
            <CardContent className="flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{stat.label}</span>
                <Badge
                  variant="ghost"
                  className={isPositive ? "text-emerald-300" : "text-red-300"}
                >
                  {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {stat.change}
                </Badge>
              </div>
              <div className="text-2xl font-semibold">{stat.value.toLocaleString("ko-KR")}</div>
            </CardContent>
          </Card>
        )}
      )}
    </section>
  )
}
