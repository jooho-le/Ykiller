import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function SignupPage() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-8 px-6 pb-20 pt-12">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Signup</p>
        <h1 className="font-display text-3xl font-semibold">회원가입</h1>
        <p className="text-sm text-muted-foreground">
          간단한 정보 입력으로 분석 리포트를 저장하세요.
        </p>
      </div>
      <Card className="card-surface">
        <CardHeader>
          <CardTitle>계정 생성</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="이름" />
          <Input placeholder="이메일" type="email" />
          <Input placeholder="비밀번호" type="password" />
          <Button variant="accent" className="w-full">
            가입하기
          </Button>
          <p className="text-xs text-muted-foreground">
            이미 계정이 있나요?{" "}
            <Link href="/login" className="text-accent hover:underline">
              로그인
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
