import { FileText, MessageSquare, Scan, ShieldAlert } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    title: "URL 입력",
    description: "영상 링크 하나만 입력하면 분석이 바로 시작됩니다.",
    icon: Scan
  },
  {
    title: "댓글 수집",
    description: "최신 N개 댓글을 중심으로 핵심 신호를 빠르게 수집합니다.",
    icon: MessageSquare
  },
  {
    title: "스팸 점수화",
    description: "광고·스팸·의심 패턴을 점수로 정밀 분류합니다.",
    icon: ShieldAlert
  },
  {
    title: "리포트 제공",
    description: "요약과 상세 지표를 한 화면에서 확인할 수 있습니다.",
    icon: FileText
  }
]

export default function FeatureCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {features.map((feature) => {
        const Icon = feature.icon
        return (
          <Card key={feature.title} className="card-surface">
            <CardHeader className="space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-accent">
                <Icon className="h-5 w-5" />
              </div>
              <CardTitle className="font-display text-lg">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              {feature.description}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
