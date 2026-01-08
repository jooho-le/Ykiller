import { create } from "zustand"

import type { ReportHistoryEntry, ReportMode, ReportResult, ReportSettings } from "@/lib/types"

type ReportStore = {
  reports: Record<string, ReportResult>
  history: ReportHistoryEntry[]
  settings: ReportSettings
  reportMode: ReportMode
  addReport: (report: ReportResult) => void
  getReport: (jobId: string) => ReportResult | undefined
  updateSettings: (settings: Partial<ReportSettings>) => void
  setReportMode: (mode: ReportMode) => void
}

export const useReportStore = create<ReportStore>((set, get) => ({
  reports: {},
  history: [],
  settings: {
    maxComments: 500,
    includeReplies: false
  },
  reportMode: "viewer",
  addReport: (report) =>
    set((state) => {
      const entry: ReportHistoryEntry = {
        jobId: report.jobId,
        videoTitle: report.videoTitle,
        riskLevel: report.riskLevel,
        analyzedAt: report.analyzedAt
      }
      return {
        reports: { ...state.reports, [report.jobId]: report },
        history: [entry, ...state.history.filter((item) => item.jobId !== report.jobId)]
      }
    }),
  getReport: (jobId) => get().reports[jobId],
  updateSettings: (settings) =>
    set((state) => ({
      settings: {
        ...state.settings,
        ...settings
      }
    })),
  setReportMode: (mode) =>
    set(() => ({
      reportMode: mode
    }))
}))
