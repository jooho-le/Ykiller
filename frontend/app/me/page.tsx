"use client"

import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { riskToneMap } from "@/lib/utils"
import { useReportStore } from "@/store/useReportStore"

export default function MePage() {
  const history = useReportStore((state) => state.history)

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 pb-20 pt-12">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">My Page</p>
        <h1 className="font-display text-3xl font-semibold">분석 기록</h1>
        <p className="text-sm text-muted-foreground">
          최근 분석한 리포트를 다시 열람할 수 있습니다.
        </p>
      </div>

      {history.length === 0 ? (
        <Card className="card-surface">
          <CardContent className="space-y-4 py-10 text-center">
            <p className="text-sm text-muted-foreground">아직 분석 기록이 없습니다.</p>
            <Button asChild variant="accent">
              <Link href="/analyze">지금 분석하기</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="rounded-2xl border border-border/70 bg-panel/40">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>영상명</TableHead>
                <TableHead>위험도</TableHead>
                <TableHead>분석 시간</TableHead>
                <TableHead className="text-right">리포트</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((item) => (
                <TableRow key={item.jobId}>
                  <TableCell className="text-sm text-foreground">{item.videoTitle}</TableCell>
                  <TableCell>
                    <Badge tone={riskToneMap[item.riskLevel]}>{item.riskLevel}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{item.analyzedAt}</TableCell>
                  <TableCell className="text-right">
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/report/${item.jobId}`}>보기</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
