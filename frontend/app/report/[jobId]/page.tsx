"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { toast } from "sonner"

import ClassChart from "@/components/report/class-chart"
import PatternsCard from "@/components/report/patterns-card"
import SummaryCards from "@/components/report/summary-cards"
import SuspiciousTable from "@/components/report/suspicious-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { createMockReport } from "@/lib/mock"
import type { ReportResult } from "@/lib/types"
import { formatNumber, modeLabelMap, riskToneMap } from "@/lib/utils"
import { useReportStore } from "@/store/useReportStore"

type ReportPageProps = {
  params: {
    jobId: string
  }
}

export default function ReportPage({ params }: ReportPageProps) {
  const { jobId } = params
  const storedReport = useReportStore((state) => state.reports[jobId])
  const addReport = useReportStore((state) => state.addReport)
  const fallbackRef = useRef<ReportResult | null>(null)
  const toastRef = useRef<string | null>(null)

  if (!storedReport && !fallbackRef.current) {
    fallbackRef.current = createMockReport({ jobId })
  }

  const report = storedReport ?? fallbackRef.current

  useEffect(() => {
    if (report && !storedReport) {
      addReport(report)
    }
  }, [addReport, report, storedReport])

  useEffect(() => {
    if (!report) return
    if (toastRef.current !== report.jobId) {
      toast.success("분석이 완료되었습니다")
      toastRef.current = report.jobId
    }
  }, [report])

  if (!report) {
    return (
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 pb-20 pt-10">
        <Skeleton className="h-24" />
        <Skeleton className="h-40" />
        <Skeleton className="h-80" />
      </div>
    )
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pb-20 pt-10 animate-in fade-in slide-in-from-bottom-3 duration-700">
      <section className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Report</p>
            <h1 className="font-display text-3xl font-semibold md:text-4xl">{report.videoTitle}</h1>
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <span>{report.channelName}</span>
              <span>•</span>
              <span>{report.analyzedAt}</span>
              <span>•</span>
              <span>분석 모드: {modeLabelMap[report.mode]}</span>
              <span>•</span>
              <a
                href={report.videoUrl}
                target="_blank"
                rel="noreferrer"
                className="text-accent hover:underline"
              >
                영상 링크
              </a>
            </div>
          </div>
          <div className="flex flex-col items-start gap-2">
            <Badge tone={riskToneMap[report.riskLevel]} className="text-sm">
              {report.riskLevel}
            </Badge>
            <p className="text-xs text-muted-foreground">
              위험도 요약 · 총 {formatNumber(report.summary.totalComments)}건 분석
            </p>
          </div>
        </div>
        <SummaryCards summary={report.summary} />
      </section>

      <Separator className="opacity-60" />

      <section className="space-y-6">
        <div>
          <h2 className="font-display text-2xl font-semibold">상세 지표</h2>
          <p className="text-sm text-muted-foreground">
            Similarweb 스타일로 요약 → 상세 섹션 구조를 구성했습니다.
          </p>
        </div>
        <ClassChart distribution={report.classDistribution} timeSeries={report.timeSeries} />
      </section>

      <Separator className="opacity-60" />

      <section className="space-y-6">
        <SuspiciousTable items={report.suspicious} />
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <PatternsCard patterns={report.patterns} />
        <Card className="card-surface">
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              로그인하면 분석 이력을 저장하고 리포트를 다시 확인할 수 있습니다.
            </p>
            <Button asChild variant="outline">
              <Link href="/login">로그인하고 저장하기</Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <Separator className="opacity-60" />

      <section className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="font-display text-xl">다른 영상도 바로 분석해보세요.</h3>
          <p className="text-sm text-muted-foreground">
            새로운 링크로 빠르게 다음 리포트를 생성합니다.
          </p>
        </div>
        <Button asChild variant="accent" size="lg">
          <Link href="/analyze">다른 영상 분석하기</Link>
        </Button>
      </section>
    </div>
  )
}
