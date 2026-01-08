"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Link as LinkIcon, Lock, ShieldCheck } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createJobId, createMockReport } from "@/lib/mock"
import { modeLabelMap } from "@/lib/utils"
import { useReportStore } from "@/store/useReportStore"

const trustBadges = [
  {
    label: "YouTube 공식 API 기반",
    icon: ShieldCheck
  },
  {
    label: "스크래핑 없이 안전하게",
    icon: LinkIcon
  },
  {
    label: "개인정보 저장 최소화",
    icon: Lock
  }
]

const modeDescriptions = {
  viewer: "시청 전 댓글 위험도를 빠르게 확인",
  creator: "내 영상 댓글 스팸 패턴을 요약 리포트로 확인"
}

const sampleUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"

export default function Hero() {
  const router = useRouter()
  const reportMode = useReportStore((state) => state.reportMode)
  const setReportMode = useReportStore((state) => state.setReportMode)
  const addReport = useReportStore((state) => state.addReport)
  const [url, setUrl] = useState("")
  const [error, setError] = useState<string | null>(null)

  const helperText = useMemo(() => modeDescriptions[reportMode], [reportMode])

  const handleSubmit = () => {
    if (!url.trim()) {
      setError("유튜브 링크를 입력해주세요.")
      return
    }
    setError(null)
    const jobId = createJobId()
    const report = createMockReport({ jobId, videoUrl: url, mode: reportMode })
    addReport(report)
    router.push(`/report/${jobId}`)
  }

  return (
    <section className="relative overflow-hidden rounded-3xl border border-border/70 bg-panel/60 px-6 py-14 shadow-card animate-in fade-in slide-in-from-bottom-4 duration-700 md:px-12">
      <div className="pointer-events-none absolute -right-10 top-0 h-48 w-48 rounded-full bg-accent/15 blur-3xl" />
      <div className="pointer-events-none absolute -left-12 bottom-0 h-56 w-56 rounded-full bg-accent/10 blur-3xl" />
      <div className="relative z-10 flex flex-col gap-10">
        <div className="space-y-4 text-center md:text-left">
          <Badge variant="secondary" className="mx-auto w-fit md:mx-0">
            시청자 · 크리에이터 댓글 위험 분석
          </Badge>
          <h1 className="font-display text-3xl font-semibold leading-tight text-foreground md:text-5xl">
            유튜브 댓글 위험을<br />
            <span className="text-accent">URL 붙여넣기</span>로 바로 확인
          </h1>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground md:mx-0 md:text-lg">
            어떤 영상이든 댓글 패턴을 요약해 안전하게 판단할 수 있습니다. 바로 아래에 링크를
            붙여 넣고 분석을 시작하세요.
          </p>
        </div>

        <div className="mx-auto w-full max-w-3xl rounded-2xl border border-border/70 bg-background/40 p-5 shadow-glow md:p-6">
          <div className="flex flex-col gap-4">
            <Tabs value={reportMode} onValueChange={(value) => setReportMode(value as "viewer" | "creator")}
              className="w-full">
              <TabsList className="h-10 w-full rounded-full bg-panel/80">
                {(["viewer", "creator"] as const).map((mode) => (
                  <TabsTrigger
                    key={mode}
                    value={mode}
                    className="flex-1 rounded-full text-sm data-[state=active]:bg-accent/20"
                  >
                    {modeLabelMap[mode]}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            <p className="text-sm text-muted-foreground">{helperText}</p>
            <form
              className="flex flex-col gap-3 md:flex-row"
              onSubmit={(event) => {
                event.preventDefault()
                handleSubmit()
              }}
            >
              <div className="relative flex-1">
                <LinkIcon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={url}
                  onChange={(event) => {
                    setUrl(event.target.value)
                    if (error) setError(null)
                  }}
                  placeholder="유튜브 영상 링크를 입력하세요"
                  type="url"
                  className="h-12 rounded-xl border-border/70 bg-panel/40 pl-10 text-sm"
                />
              </div>
              <Button type="submit" size="lg" variant="accent" className="h-12">
                바로 분석하기
              </Button>
            </form>
            {error ? (
              <p className="text-xs text-red-200">{error}</p>
            ) : null}
            <div className="text-xs text-muted-foreground">
              예시 링크:{" "}
              <button
                type="button"
                onClick={() => {
                  setUrl(sampleUrl)
                  if (error) setError(null)
                }}
                className="text-accent hover:underline"
              >
                {sampleUrl}
              </button>
            </div>
            <div className="flex flex-wrap justify-center gap-2 md:justify-start">
              {trustBadges.map((item) => {
                const Icon = item.icon
                return (
                  <Badge
                    key={item.label}
                    variant="outline"
                    className="gap-1 border-accent/40 bg-panel/70 text-xs text-foreground"
                  >
                    <Icon className="h-3.5 w-3.5 text-accent" />
                    {item.label}
                  </Badge>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
