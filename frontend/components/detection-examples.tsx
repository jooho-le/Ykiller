"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useMockDataStore, usePolicyStore } from "@/lib/store"
import { actionToneMap, formatScore, getActionFromScore, labelToneMap } from "@/lib/utils"

const splitRegex = /(https?:\/\/\S+|www\.\S+|\b\d{2,3}-\d{3,4}-\d{4}\b)/g
const matchRegex = /^(https?:\/\/\S+|www\.\S+|\b\d{2,3}-\d{3,4}-\d{4}\b)$/

function renderHighlightedText(text: string) {
  return text.split(splitRegex).map((part, index) => {
    if (matchRegex.test(part)) {
      return (
        <span key={`${part}-${index}`} className="text-red-300 underline decoration-red-400/60">
          {part}
        </span>
      )
    }
    return <span key={`${part}-${index}`}>{part}</span>
  })
}

export default function DetectionExamples() {
  const examples = useMockDataStore((state) => state.data.examples)
  const policy = usePolicyStore((state) => ({
    hideThreshold: state.hideThreshold,
    reviewThreshold: state.reviewThreshold
  }))

  return (
    <Card className="card-surface">
      <CardHeader>
        <CardTitle>탐지 예시</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {examples.map((example) => {
          const action = getActionFromScore(example.score, policy)
          return (
            <div
              key={example.id}
              className="flex flex-col gap-2 rounded-lg border border-border/70 bg-panel/60 px-3 py-3 text-sm md:flex-row md:items-center md:justify-between"
            >
              <div className="space-y-1">
                <div className="text-sm text-foreground">{renderHighlightedText(example.text)}</div>
                <Badge tone={labelToneMap[example.label]}>{example.label}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">광고 확률 {formatScore(example.score)}</span>
                <Badge tone={actionToneMap[action]}>{action}</Badge>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
