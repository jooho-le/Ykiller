import Link from "next/link"

import FeatureCards from "@/components/feature-cards"
import Hero from "@/components/hero"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function LandingPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-6 pb-20 pt-10">
      <Hero />

      <section
        id="about"
        className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] animate-in fade-in slide-in-from-bottom-3 duration-700 delay-100"
      >
        <div className="space-y-4">
          <Badge variant="secondary" className="w-fit">
            사용자 중심 분석 흐름
          </Badge>
          <h2 className="font-display text-2xl font-semibold md:text-3xl">
            랜딩 → 입력 → 리포트까지<br />끊김 없는 분석 경험
          </h2>
          <p className="text-sm text-muted-foreground md:text-base">
            복잡한 설정 없이, 영상 링크 하나로 바로 분석이 가능합니다. 보고서 화면은 요약부터
            상세 근거까지 한 번에 전달해 신뢰도 있는 판단을 돕습니다.
          </p>
          <Button asChild variant="outline">
            <Link href="/analyze">URL 입력 시작하기</Link>
          </Button>
        </div>
        <Card className="card-surface">
          <CardHeader>
            <CardTitle className="font-display text-lg">분석 과정</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>1. 영상 링크 제출</span>
              <span className="text-accent">즉시</span>
            </div>
            <div className="flex items-center justify-between">
              <span>2. 최신 댓글 수집</span>
              <span>3초 이내</span>
            </div>
            <div className="flex items-center justify-between">
              <span>3. 위험 분류 & 리포트</span>
              <span>자동 요약</span>
            </div>
          </CardContent>
        </Card>
      </section>

      <section
        id="features"
        className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-700 delay-150"
      >
        <div className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Features</p>
          <h2 className="font-display text-2xl font-semibold md:text-3xl">핵심 기능을 간단히</h2>
          <p className="text-sm text-muted-foreground md:text-base">
            입력 중심 UX와 Similarweb 스타일의 리포트 구조를 결합했습니다.
          </p>
        </div>
        <FeatureCards />
      </section>

      <section
        id="trust"
        className="grid gap-6 md:grid-cols-3 animate-in fade-in slide-in-from-bottom-3 duration-700 delay-200"
      >
        {[
          "공식 API 기반",
          "스크래핑 없음",
          "개인정보 저장 최소화"
        ].map((item) => (
          <Card key={item} className="card-surface">
            <CardContent className="py-6 text-sm text-muted-foreground">{item}</CardContent>
          </Card>
        ))}
      </section>

      <section
        id="faq"
        className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-700 delay-300"
      >
        <div className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">FAQ</p>
          <h2 className="font-display text-2xl font-semibold md:text-3xl">
            자주 묻는 질문
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              q: "댓글은 얼마나 분석하나요?",
              a: "최신 N개 댓글만 빠르게 분석합니다."
            },
            {
              q: "스크래핑을 사용하나요?",
              a: "아니요. 공식 API 기반으로만 수집합니다."
            },
            {
              q: "결과를 저장하나요?",
              a: "로그인 시에만 분석 이력이 저장됩니다."
            }
          ].map((item) => (
            <Card key={item.q} className="card-surface">
              <CardHeader>
                <CardTitle className="text-base">{item.q}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{item.a}</CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
