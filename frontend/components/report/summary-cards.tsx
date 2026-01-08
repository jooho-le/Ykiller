"use client"

import { Card, CardContent } from "@/components/ui/card"
import type { ReportSummary } from "@/lib/types"
import { formatNumber } from "@/lib/utils"

const summaryItems = (summary: ReportSummary) => [
  {
    label: "총 댓글",
    value: summary.totalComments
  },
  {
    label: "스팸 의심",
    value: summary.spamCount
  },
  {
    label: "광고 의심",
    value: summary.adCount
  },
  {
    label: "링크/연락처 포함",
    value: summary.linkCount + summary.contactCount
  }
]

export default function SummaryCards({ summary }: { summary: ReportSummary }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {summaryItems(summary).map((item) => (
        <Card key={item.label} className="card-surface">
          <CardContent className="space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {item.label}
            </p>
            <p className="font-display text-2xl font-semibold text-foreground">
              {formatNumber(item.value)}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
