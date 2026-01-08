import type { Metadata } from "next"
import { Noto_Sans_KR, Space_Grotesk } from "next/font/google"

import { cn } from "@/lib/utils"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const sans = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans"
})

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display"
})

export const metadata: Metadata = {
  title: "YKiller — 유튜브 댓글 위험 분석",
  description: "유튜브 댓글 스팸·광고 위험을 빠르게 분석하고 리포트를 제공합니다."
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="dark">
      <body
        className={cn(
          "min-h-screen bg-background text-foreground antialiased",
          sans.variable,
          display.variable
        )}
      >
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}
