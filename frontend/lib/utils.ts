import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { CommentFlag, RiskLevel, BadgeTone, ReportMode } from "@/lib/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const riskToneMap: Record<RiskLevel, BadgeTone> = {
  SAFE: "ok",
  WARN: "sus",
  RISK: "ad"
}

export const flagToneMap: Record<CommentFlag, BadgeTone> = {
  AD: "ad",
  SPAM: "spam",
  SUS: "sus",
  OK: "ok"
}

export const modeLabelMap: Record<ReportMode, string> = {
  viewer: "시청자",
  creator: "크리에이터"
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("ko-KR").format(value)
}

export function formatScore(value: number) {
  return value.toFixed(1)
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}
