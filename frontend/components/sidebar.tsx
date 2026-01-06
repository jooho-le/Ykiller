"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FlaskConical, LayoutDashboard, LineChart, MessageCircle, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useMockDataStore } from "@/lib/store"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "대시보드", icon: LayoutDashboard },
  { href: "/comments", label: "댓글 관리", icon: MessageCircle },
  { href: "/analysis", label: "분석", icon: LineChart },
  { href: "/settings", label: "설정", icon: Settings }
]

export default function Sidebar() {
  const pathname = usePathname()
  const simulate = useMockDataStore((state) => state.simulate)

  return (
    <aside className="hidden min-h-screen flex-col border-r border-border/80 bg-gradient-to-b from-[#0c0c10] to-[#09090b] px-4 py-5 lg:flex">
      <div className="flex items-center gap-3 px-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border/70 bg-panel shadow-glow">
          <img src="/logo.svg" alt="YKiller" className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold tracking-wide">YKiller</p>
          <p className="text-xs text-muted-foreground">댓글 분석 허브</p>
        </div>
      </div>

      <nav className="mt-8 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg border border-transparent px-3 py-2 text-sm font-medium text-muted-foreground transition hover:border-border/80 hover:bg-panel/50 hover:text-foreground",
                isActive && "border-accent/70 bg-panel text-foreground shadow-glow"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto px-2 pb-2">
        <Button
          variant="outline"
          className="w-full border-accent/60 text-foreground hover:border-accent"
          onClick={simulate}
        >
          <FlaskConical className="h-4 w-4" />
          데이터 시뮬레이션
        </Button>
      </div>
    </aside>
  )
}
