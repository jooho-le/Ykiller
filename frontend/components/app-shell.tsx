"use client"

import type { ReactNode } from "react"

import Sidebar from "@/components/sidebar"
import Topbar from "@/components/topbar"
import { Toaster } from "@/components/ui/sonner"

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-main">
        <Topbar />
        <main className="app-content">{children}</main>
      </div>
      <Toaster />
    </div>
  )
}
