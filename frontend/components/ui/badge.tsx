import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-accent text-accent-foreground",
        secondary: "border-border bg-panel text-foreground",
        outline: "border-border text-foreground",
        ghost: "border-border/70 bg-transparent text-muted-foreground"
      },
      tone: {
        ad: "border-red-500/40 bg-red-500/15 text-red-200",
        spam: "border-orange-500/40 bg-orange-500/15 text-orange-200",
        sus: "border-amber-400/40 bg-amber-400/15 text-amber-100",
        ok: "border-emerald-500/40 bg-emerald-500/15 text-emerald-200",
        neutral: ""
      }
    },
    defaultVariants: {
      variant: "secondary",
      tone: "neutral"
    }
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, tone, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant, tone }), className)} {...props} />
}

export { Badge, badgeVariants }
