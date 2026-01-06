"use client"

import { Toaster as Sonner } from "sonner"

export function Toaster() {
  return (
    <Sonner
      position="top-right"
      toastOptions={{
        classNames: {
          toast: "border border-border/80 bg-panel text-foreground shadow-card",
          title: "text-sm font-medium",
          description: "text-xs text-muted-foreground"
        }
      }}
    />
  )
}
