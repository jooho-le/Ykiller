import type { Metadata } from "next"

import AppShell from "@/components/app-shell"
import "./globals.css"

export const metadata: Metadata = {
  title: "YKiller — 유튜브 댓글 분석 대시보드",
  description: "유튜브 댓글 링크 분석 및 자동 조치 대시보드"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Pretendard:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
