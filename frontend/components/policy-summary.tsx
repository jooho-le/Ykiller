"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useMockDataStore, usePolicyStore } from "@/lib/store"
import { labelToneMap } from "@/lib/utils"

export default function PolicySummary() {
  const feedback = useMockDataStore((state) => state.data.feedback)
  const hideThreshold = usePolicyStore((state) => state.hideThreshold)
  const reviewThreshold = usePolicyStore((state) => state.reviewThreshold)

  return (
    <Card className="card-surface">
      <CardHeader>
        <CardTitle>정책 요약</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">임계값 규칙</p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">숨김 ≥ {hideThreshold.toFixed(2)}</Badge>
            <Badge variant="secondary">검토 ≥ {reviewThreshold.toFixed(2)}</Badge>
            <Badge variant="ghost">허용 &lt; {reviewThreshold.toFixed(2)}</Badge>
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground">최근 피드백</p>
          <div className="space-y-2">
            {feedback.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-lg border border-border/70 bg-panel/60 px-3 py-2"
              >
                <div className="text-sm text-foreground">#{item.id}</div>
                <div className="flex items-center gap-2">
                  <Badge tone={labelToneMap[item.label]}>{item.label}</Badge>
                  <span className="text-xs text-muted-foreground">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
