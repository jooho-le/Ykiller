"use client"

import { Save, Search } from "lucide-react"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { usePolicyStore } from "@/lib/store"

export default function Topbar() {
  const hideThreshold = usePolicyStore((state) => state.hideThreshold)
  const reviewThreshold = usePolicyStore((state) => state.reviewThreshold)
  const setHideThreshold = usePolicyStore((state) => state.setHideThreshold)
  const setReviewThreshold = usePolicyStore((state) => state.setReviewThreshold)

  const handleSave = () => {
    toast.success("저장되었습니다", {
      description: "자동조치 임계값이 업데이트되었습니다."
    })
  }

  return (
    <header className="sticky top-0 z-20 flex flex-col gap-4 border-b border-border/80 bg-background/70 px-4 py-4 backdrop-blur lg:flex-row lg:items-center lg:justify-between">
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input className="pl-9" placeholder="댓글/작성자/영상 검색" />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex flex-col gap-2">
          <span className="text-xs text-muted-foreground">자동조치 임계값</span>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-lg border border-border/80 bg-panel/70 px-3 py-2">
              <Badge variant="secondary">숨김 ≥</Badge>
              <Slider
                className="w-28"
                value={[hideThreshold]}
                min={0}
                max={1}
                step={0.01}
                onValueChange={(value) => setHideThreshold(value[0])}
              />
              <Badge variant="ghost">{hideThreshold.toFixed(2)}</Badge>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-border/80 bg-panel/70 px-3 py-2">
              <Badge variant="secondary">검토 ≥</Badge>
              <Slider
                className="w-28"
                value={[reviewThreshold]}
                min={0}
                max={1}
                step={0.01}
                onValueChange={(value) => setReviewThreshold(value[0])}
              />
              <Badge variant="ghost">{reviewThreshold.toFixed(2)}</Badge>
            </div>
          </div>
        </div>
        <Button variant="accent" onClick={handleSave}>
          <Save className="h-4 w-4" />
          저장
        </Button>
      </div>
    </header>
  )
}
