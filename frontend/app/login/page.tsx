import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function LoginPage() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-8 px-6 pb-20 pt-12">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Login</p>
        <h1 className="font-display text-3xl font-semibold">로그인</h1>
        <p className="text-sm text-muted-foreground">
          계정으로 로그인하고 분석 이력을 저장하세요.
        </p>
      </div>
      <Card className="card-surface">
        <CardHeader>
          <CardTitle>계정 정보</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="이메일" type="email" />
          <Input placeholder="비밀번호" type="password" />
          <Button variant="accent" className="w-full">
            로그인
          </Button>
          <p className="text-xs text-muted-foreground">
            아직 계정이 없나요?{" "}
            <Link href="/signup" className="text-accent hover:underline">
              회원가입
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
