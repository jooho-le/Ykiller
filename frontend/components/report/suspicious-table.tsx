"use client"

import { useMemo, useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { SuspiciousComment } from "@/lib/types"
import { flagToneMap, formatScore } from "@/lib/utils"

type FilterKey = "all" | "score" | "link" | "contact"

const filters: { label: string; value: FilterKey }[] = [
  { label: "전체", value: "all" },
  { label: "스코어 높은 순", value: "score" },
  { label: "링크 포함", value: "link" },
  { label: "연락처 포함", value: "contact" }
]

type SuspiciousTableProps = {
  items: SuspiciousComment[]
}

export default function SuspiciousTable({ items }: SuspiciousTableProps) {
  const [filter, setFilter] = useState<FilterKey>("all")

  const filteredItems = useMemo(() => {
    const cloned = [...items]
    if (filter === "score") {
      return cloned.sort((a, b) => b.score - a.score)
    }
    if (filter === "link") {
      return cloned.filter((item) => item.hasLink)
    }
    if (filter === "contact") {
      return cloned.filter((item) => item.hasContact)
    }
    return cloned
  }, [filter, items])

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="font-display text-lg">의심 댓글 리스트</h3>
          <p className="text-xs text-muted-foreground">탐지 기준에 따라 의심 댓글만 표시됩니다.</p>
        </div>
        <Tabs value={filter} onValueChange={(value) => setFilter(value as FilterKey)}>
          <TabsList className="bg-panel">
            {filters.map((item) => (
              <TabsTrigger key={item.value} value={item.value} className="text-xs">
                {item.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      <div className="rounded-2xl border border-border/70 bg-panel/40">
        <Table>
          <TableHeader>
            <TableRow className="border-border/70">
              <TableHead>작성자</TableHead>
              <TableHead>댓글 내용</TableHead>
              <TableHead>탐지 사유</TableHead>
              <TableHead className="text-right">스코어</TableHead>
              <TableHead className="text-right">처리</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.map((item) => (
              <TableRow key={item.id} className="border-border/70">
                <TableCell className="text-sm text-muted-foreground">{item.author}</TableCell>
                <TableCell className="max-w-[360px] text-sm text-foreground">
                  <p className="truncate">{item.content}</p>
                  <span className="mt-1 block text-xs text-muted-foreground">{item.createdAt}</span>
                </TableCell>
                <TableCell>
                  <Badge tone={flagToneMap[item.reason]}>{item.reason}</Badge>
                </TableCell>
                <TableCell className="text-right text-sm font-medium">
                  {formatScore(item.score)}
                </TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="outline">
                    {item.action}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
