"use client"

import { useState } from "react"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useMockDataStore } from "@/lib/store"
import { labelToneMap } from "@/lib/utils"

export default function AnalysisPage() {
  const [url, setUrl] = useState("")
  const report = useMockDataStore((state) => state.data.analysisReport)

  const handleAnalyze = () => {
    toast.success("분석 요청이 접수되었습니다", {
      description: "데모 데이터 기준 리포트를 표시합니다."
    })
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_1fr]">
      <Card className="card-surface">
        <CardHeader>
          <CardTitle>영상 링크 입력</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">유튜브 영상 URL을 입력하면 댓글 분석 리포트를 생성합니다.</p>
            <Input
              placeholder="https://www.youtube.com/watch?v=..."
              value={url}
              onChange={(event) => setUrl(event.target.value)}
            />
          </div>
          <Button variant="accent" onClick={handleAnalyze}>
            분석 시작
          </Button>
          <div className="rounded-lg border border-border/70 bg-panel/70 p-3 text-xs text-muted-foreground">
            데모 모드에서는 샘플 리포트가 표시됩니다.
          </div>
        </CardContent>
      </Card>

      <Card className="card-surface">
        <CardHeader>
          <CardTitle>분석 결과 리포트</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-semibold">{report.videoTitle}</p>
            <p className="text-xs text-muted-foreground">{report.channel}</p>
          </div>
          <p className="text-sm text-muted-foreground">{report.summary}</p>
          <Separator className="opacity-60" />
          <div className="grid gap-3 sm:grid-cols-2">
            {Object.entries(report.counts).map(([label, value]) => (
              <div key={label} className="rounded-lg border border-border/70 bg-panel/60 p-3">
                <div className="flex items-center justify-between">
                  <Badge tone={labelToneMap[label as keyof typeof labelToneMap]}>{label}</Badge>
                  <span className="text-sm font-semibold">{value.toLocaleString("ko-KR")}</span>
                </div>
              </div>
            ))}
          </div>
          <Separator className="opacity-60" />
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">하이라이트</p>
            <ul className="space-y-2 text-sm">
              {report.highlights.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-muted-foreground">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
