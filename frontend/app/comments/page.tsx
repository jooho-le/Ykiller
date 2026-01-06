"use client"

import { useMemo, useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useMockDataStore, usePolicyStore } from "@/lib/store"
import type { LabelType } from "@/lib/types"
import { actionToneMap, formatScore, getActionFromScore, labelToneMap } from "@/lib/utils"

const filters: Array<{ label: string; value: LabelType | "ALL" }> = [
  { label: "전체", value: "ALL" },
  { label: "AD", value: "AD" },
  { label: "SPAM", value: "SPAM" },
  { label: "SUS", value: "SUS" },
  { label: "OK", value: "OK" }
]

export default function CommentsPage() {
  const comments = useMockDataStore((state) => state.data.comments)
  const policy = usePolicyStore((state) => ({
    hideThreshold: state.hideThreshold,
    reviewThreshold: state.reviewThreshold
  }))
  const [filter, setFilter] = useState<LabelType | "ALL">("ALL")

  const filtered = useMemo(() => {
    if (filter === "ALL") {
      return comments
    }
    return comments.filter((item) => item.label === filter)
  }, [comments, filter])

  return (
    <div className="space-y-6">
      <Card className="card-surface">
        <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>댓글 관리</CardTitle>
            <p className="text-sm text-muted-foreground">분류 태그 기준으로 댓글을 정리합니다.</p>
          </div>
          <Tabs value={filter} onValueChange={(value) => setFilter(value as LabelType | "ALL")}>
            <TabsList>
              {filters.map((item) => (
                <TabsTrigger key={item.value} value={item.value}>
                  {item.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>작성자</TableHead>
                <TableHead>댓글</TableHead>
                <TableHead>영상</TableHead>
                <TableHead>분류</TableHead>
                <TableHead>점수</TableHead>
                <TableHead>조치</TableHead>
                <TableHead>시간</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((item) => {
                const action = getActionFromScore(item.score, policy)
                return (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.author}</TableCell>
                    <TableCell className="max-w-xs text-sm text-foreground/90">
                      {item.text}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{item.video}</TableCell>
                    <TableCell>
                      <Badge tone={labelToneMap[item.label]}>{item.label}</Badge>
                    </TableCell>
                    <TableCell className="text-sm">{formatScore(item.score)}</TableCell>
                    <TableCell>
                      <Badge tone={actionToneMap[action]}>{action}</Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{item.time}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
