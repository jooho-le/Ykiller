export type LabelType = "AD" | "SPAM" | "SUS" | "OK"
export type ActionType = "숨김" | "검토" | "허용"
export type BadgeTone = "ad" | "spam" | "sus" | "ok" | "neutral"

export type StatCard = {
  id: string
  label: string
  value: number
  change: string
}

export type DistributionItem = {
  label: LabelType
  value: number
}

export type FeedbackItem = {
  id: string
  label: LabelType
  time: string
}

export type DetectionExample = {
  id: string
  text: string
  score: number
  label: LabelType
}

export type CommentItem = {
  id: string
  author: string
  text: string
  video: string
  time: string
  label: LabelType
  score: number
}

export type Policy = {
  hideThreshold: number
  reviewThreshold: number
}

export type AnalysisReport = {
  videoTitle: string
  channel: string
  summary: string
  highlights: string[]
  counts: Record<LabelType, number>
}

export type MockData = {
  stats: StatCard[]
  distribution: DistributionItem[]
  feedback: FeedbackItem[]
  examples: DetectionExample[]
  comments: CommentItem[]
  systemIntro: string[]
  analysisReport: AnalysisReport
}
