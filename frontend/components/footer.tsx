import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="font-display text-base text-foreground">YKiller</p>
          <p>공식 API 기반 댓글 위험 분석 리포트</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link href="/analyze" className="transition hover:text-foreground">
            분석 시작
          </Link>
          <Link href="/login" className="transition hover:text-foreground">
            로그인
          </Link>
          <Link href="/signup" className="transition hover:text-foreground">
            회원가입
          </Link>
        </div>
      </div>
    </footer>
  )
}
