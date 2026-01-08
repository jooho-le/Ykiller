import Link from "next/link"
import { ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"

const navItems = [
  { label: "소개", href: "/#about" },
  { label: "기능", href: "/#features" },
  { label: "FAQ", href: "/#faq" }
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-base font-semibold">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/15 text-accent">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <span className="font-display text-lg tracking-tight">YKiller</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Button asChild variant="outline" size="sm" className="hidden md:inline-flex">
            <Link href="/login">로그인</Link>
          </Button>
          <Button asChild variant="accent" size="sm">
            <Link href="/analyze">바로 분석하기</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
