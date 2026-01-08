export type RiskLevel = "SAFE" | "WARN" | "RISK"
export type CommentFlag = "AD" | "SPAM" | "SUS" | "OK"
export type BadgeTone = "ad" | "spam" | "sus" | "ok" | "neutral"
export type ReportMode = "viewer" | "creator"

export type SummaryMetric = {
  id: string
  label: string
  value: number
  unit?: string
}

export type ReportSummary = {
  totalComments: number
  spamCount: number
  adCount: number
  linkCount: number
  contactCount: number
}

export type ClassDistributionItem = {
  label: CommentFlag
  value: number
}

export type TimeSeriesItem = {
  hour: string
  count: number
}

export type SuspiciousComment = {
  id: string
  author: string
  content: string
  reason: CommentFlag
  score: number
  action: "허용" | "숨김" | "검토"
  hasLink: boolean
  hasContact: boolean
  createdAt: string
}

export type PatternSummary = {
  domains: string[]
  keywords: string[]
}

export type ReportResult = {
  jobId: string
  videoTitle: string
  videoUrl: string
  channelName: string
  analyzedAt: string
  mode: ReportMode
  riskLevel: RiskLevel
  summary: ReportSummary
  classDistribution: ClassDistributionItem[]
  timeSeries: TimeSeriesItem[]
  suspicious: SuspiciousComment[]
  patterns: PatternSummary
}

export type ReportHistoryEntry = {
  jobId: string
  videoTitle: string
  riskLevel: RiskLevel
  analyzedAt: string
}

export type ReportSettings = {
  maxComments: number
  includeReplies: boolean
}
