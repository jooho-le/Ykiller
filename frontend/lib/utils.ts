import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { ActionType, BadgeTone, LabelType, Policy } from "@/lib/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const labelToneMap: Record<LabelType, BadgeTone> = {
  AD: "ad",
  SPAM: "spam",
  SUS: "sus",
  OK: "ok"
}

export const actionToneMap: Record<ActionType, BadgeTone> = {
  숨김: "ad",
  검토: "sus",
  허용: "ok"
}

export function getActionFromScore(score: number, policy: Policy): ActionType {
  if (score >= policy.hideThreshold) {
    return "숨김"
  }
  if (score >= policy.reviewThreshold) {
    return "검토"
  }
  return "허용"
}

export function formatScore(score: number) {
  return score.toFixed(2)
}
