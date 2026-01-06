import { create } from "zustand"
import { buildMockData, initialMockData } from "@/lib/mock-data"
import type { MockData, Policy } from "@/lib/types"

type MockDataState = {
  data: MockData
  simulate: () => void
}

type PolicyState = Policy & {
  setHideThreshold: (value: number) => void
  setReviewThreshold: (value: number) => void
}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

export const useMockDataStore = create<MockDataState>((set) => ({
  data: initialMockData,
  simulate: () => set({ data: buildMockData() })
}))

export const usePolicyStore = create<PolicyState>((set) => ({
  hideThreshold: 0.9,
  reviewThreshold: 0.7,
  setHideThreshold: (value) =>
    set((state) => ({
      hideThreshold: clamp(value, state.reviewThreshold, 1)
    })),
  setReviewThreshold: (value) =>
    set((state) => ({
      reviewThreshold: clamp(value, 0, state.hideThreshold)
    }))
}))
