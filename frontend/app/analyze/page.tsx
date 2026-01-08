"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Clock } from "lucide-react"

import UrlInputCard from "@/components/url-input-card"
import { Skeleton } from "@/components/ui/skeleton"
import { createJobId, createMockReport } from "@/lib/mock"
import { useReportStore } from "@/store/useReportStore"

export default function AnalyzePage() {
  const router = useRouter()
  const addReport = useReportStore((state) => state.addReport)
  const reportMode = useReportStore((state) => state.reportMode)
  const [url, setUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const pushTimerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null
    if (isLoading) {
      timer = setTimeout(() => {
        setIsLoading(false)
      }, 1400)
    }
    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [isLoading])

  useEffect(() => {
    return () => {
      if (pushTimerRef.current) clearTimeout(pushTimerRef.current)
    }
  }, [])

  const handleSubmit = () => {
    if (!url.trim()) {
      setError("유튜브 링크를 입력해주세요.")
      return
    }
    setError(undefined)
    setIsLoading(true)
    const jobId = createJobId()
    const report = createMockReport({ jobId, videoUrl: url, mode: reportMode })
    addReport(report)
    pushTimerRef.current = setTimeout(() => {
      router.push(`/report/${jobId}`)
    }, 1100)
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-6 pb-20 pt-12 animate-in fade-in slide-in-from-bottom-3 duration-700">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Analyze</p>
        <h1 className="font-display text-3xl font-semibold md:text-4xl">
          빠르고 단순한 입력, 확실한 분석
        </h1>
        <p className="text-sm text-muted-foreground md:text-base">
          입력은 최소화하고, 결과 화면에서 깊이 있는 정보를 제공합니다.
        </p>
      </div>

      <UrlInputCard
        value={url}
        onChange={setUrl}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        error={error}
      />

      {isLoading ? (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="h-4 w-4" />
            분석 중... 잠시만 기다려주세요.
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Skeleton className="h-28" />
            <Skeleton className="h-28" />
            <Skeleton className="h-28" />
            <Skeleton className="h-28" />
          </div>
        </div>
      ) : null}
    </div>
  )
}
