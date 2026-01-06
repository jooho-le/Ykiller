"use client"

import { useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { usePolicyStore } from "@/lib/store"

const ruleSeeds = [
  { id: "link", label: "외부 링크 포함", description: "URL 패턴이 포함된 댓글을 우선 탐지" },
  { id: "phone", label: "연락처 노출", description: "전화번호 형식(010-0000-0000) 탐지" },
  { id: "repeat", label: "반복 문구", description: "동일 문구 반복 댓글을 스팸으로 분류" },
  { id: "caps", label: "과도한 대문자/이모지", description: "과도한 강조 문구를 의심으로 분류" }
]

export default function SettingsPage() {
  const hideThreshold = usePolicyStore((state) => state.hideThreshold)
  const reviewThreshold = usePolicyStore((state) => state.reviewThreshold)
  const setHideThreshold = usePolicyStore((state) => state.setHideThreshold)
  const setReviewThreshold = usePolicyStore((state) => state.setReviewThreshold)
  const [rules, setRules] = useState(() =>
    ruleSeeds.map((rule) => ({
      ...rule,
      enabled: true
    }))
  )

  return (
    <div className="space-y-6">
      <Card className="card-surface">
        <CardHeader>
          <CardTitle>설정</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="policy">
            <TabsList>
              <TabsTrigger value="policy">정책</TabsTrigger>
              <TabsTrigger value="rules">룰</TabsTrigger>
            </TabsList>

            <TabsContent value="policy">
              <div className="space-y-6">
                <div className="rounded-lg border border-border/70 bg-panel/60 p-4">
                  <p className="text-sm font-medium">자동조치 임계값</p>
                  <p className="text-xs text-muted-foreground">대시보드와 동일하게 실시간 반영됩니다.</p>
                  <Separator className="my-4 opacity-60" />
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">숨김 기준</span>
                        <Badge variant="ghost">{hideThreshold.toFixed(2)}</Badge>
                      </div>
                      <Slider
                        value={[hideThreshold]}
                        min={0}
                        max={1}
                        step={0.01}
                        onValueChange={(value) => setHideThreshold(value[0])}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">검토 기준</span>
                        <Badge variant="ghost">{reviewThreshold.toFixed(2)}</Badge>
                      </div>
                      <Slider
                        value={[reviewThreshold]}
                        min={0}
                        max={1}
                        step={0.01}
                        onValueChange={(value) => setReviewThreshold(value[0])}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="rules">
              <div className="space-y-3">
                {rules.map((rule) => (
                  <div
                    key={rule.id}
                    className="flex items-start justify-between gap-4 rounded-lg border border-border/70 bg-panel/60 p-4"
                  >
                    <div>
                      <p className="text-sm font-medium">{rule.label}</p>
                      <p className="text-xs text-muted-foreground">{rule.description}</p>
                    </div>
                    <Switch
                      checked={rule.enabled}
                      onCheckedChange={(checked) =>
                        setRules((prev) =>
                          prev.map((item) => (item.id === rule.id ? { ...item, enabled: checked } : item))
                        )
                      }
                    />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
