"use client"

import { AlertCircle, Link as LinkIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

type UrlInputCardProps = {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  isLoading?: boolean
  error?: string
}

export default function UrlInputCard({
  value,
  onChange,
  onSubmit,
  isLoading = false,
  error
}: UrlInputCardProps) {
  return (
    <Card className="card-surface">
      <CardHeader className="space-y-2">
        <CardTitle className="font-display text-xl">유튜브 영상 링크를 입력하세요</CardTitle>
        <p className="text-sm text-muted-foreground">
          단일 URL 분석으로 댓글 위험을 즉시 요약합니다.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <form
          className="flex flex-col gap-3 md:flex-row"
          onSubmit={(event) => {
            event.preventDefault()
            onSubmit()
          }}
        >
          <div className="relative flex-1">
            <LinkIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={value}
              onChange={(event) => onChange(event.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              type="url"
              className="h-12 pl-9 text-sm"
              disabled={isLoading}
            />
          </div>
          <Button type="submit" size="lg" variant="accent" disabled={isLoading}>
            {isLoading ? "분석 중..." : "분석 시작"}
          </Button>
        </form>
        {error ? (
          <div className="flex items-center gap-2 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-200">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        ) : null}
        <div className="space-y-1 text-xs text-muted-foreground">
          <p>예시: https://www.youtube.com/watch?v=dQw4w9WgXcQ</p>
          <p>최신 N개 댓글만 분석합니다. 답글은 기본 제외됩니다.</p>
        </div>
      </CardContent>
    </Card>
  )
}
