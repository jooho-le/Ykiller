"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { PatternSummary } from "@/lib/types"

type PatternsCardProps = {
  patterns: PatternSummary
}

export default function PatternsCard({ patterns }: PatternsCardProps) {
  return (
    <Card className="card-surface">
      <CardHeader>
        <CardTitle className="font-display text-lg">탐지 근거/패턴</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Top Domains</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {patterns.domains.map((domain) => (
              <Badge key={domain} variant="ghost">
                {domain}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Top Keywords</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {patterns.keywords.map((keyword) => (
              <Badge key={keyword} variant="secondary">
                {keyword}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
