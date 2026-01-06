import type { AnalysisReport, CommentItem, DetectionExample, FeedbackItem, LabelType, MockData, StatCard } from "@/lib/types"

const labelPool: LabelType[] = ["AD", "SPAM", "SUS", "OK"]

const baseComments = [
  {
    author: "MintWave",
    video: "최신 아이폰 언박싱",
    label: "AD" as LabelType,
    text: "무료 이벤트 참여하세요 http://promo.link 지금 바로!"
  },
  {
    author: "Kyo",
    video: "투자 전략 2024",
    label: "SPAM" as LabelType,
    text: "수익 300% 보장! 연락처 010-1234-5678"
  },
  {
    author: "Loopy",
    video: "게임 리뷰",
    label: "SUS" as LabelType,
    text: "이 채널 최고임. 다른 채널도 한번 방문 ㄱㄱ"
  },
  {
    author: "Sori",
    video: "브이로그",
    label: "OK" as LabelType,
    text: "영상 퀄리티 너무 좋네요. 다음 편 기대합니다!"
  },
  {
    author: "Vega",
    video: "부동산 톡",
    label: "SPAM" as LabelType,
    text: "무료 세미나 링크: www.free-seminar.kr"
  },
  {
    author: "Nara",
    video: "AI 트렌드",
    label: "AD" as LabelType,
    text: "이 방법으로 구독자 늘림 -> https://boost.me"
  }
]

const baseExamples = [
  {
    text: "지금 가입하면 30% 할인 http://deal.kr",
    label: "AD" as LabelType
  },
  {
    text: "010-8888-0000 연락주세요. 상담 가능",
    label: "SPAM" as LabelType
  },
  {
    text: "다른 영상에서도 봤어요. 링크 공유 가능?",
    label: "SUS" as LabelType
  }
]

const systemIntro = [
  "댓글 텍스트, 링크, 연락처 패턴 기반 탐지",
  "영상 단위 정책 적용 및 자동 조치",
  "모델 확률과 휴리스틱 규칙을 혼합"
]

const feedbackTimes = ["1분 전", "3분 전", "8분 전", "12분 전", "25분 전", "1시간 전"]

const reportTemplate: Omit<AnalysisReport, "counts"> = {
  videoTitle: "2024년 유튜브 성장 전략 공개",
  channel: "YLab Studio",
  summary: "광고성 링크가 포함된 댓글 비중이 높아 자동 숨김 정책을 강화하는 것이 좋습니다.",
  highlights: [
    "외부 링크 포함 댓글 18%",
    "연락처 패턴 매칭 6%",
    "반복 문구 스팸 11%"
  ]
}

const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min
const randomInt = (min: number, max: number) => Math.floor(randomBetween(min, max + 1))
const pick = <T,>(items: T[]) => items[randomInt(0, items.length - 1)]

const scoreByLabel = (label: LabelType) => {
  switch (label) {
    case "AD":
      return randomBetween(0.82, 0.98)
    case "SPAM":
      return randomBetween(0.7, 0.92)
    case "SUS":
      return randomBetween(0.55, 0.8)
    default:
      return randomBetween(0.1, 0.45)
  }
}

const buildStats = (total: number, ad: number, spam: number, sus: number): StatCard[] => [
  { id: "total", label: "총 댓글", value: total, change: `+${randomBetween(1, 6).toFixed(1)}%` },
  { id: "ad", label: "광고(예측)", value: ad, change: `+${randomBetween(2, 9).toFixed(1)}%` },
  { id: "spam", label: "스팸", value: spam, change: `+${randomBetween(1, 5).toFixed(1)}%` },
  { id: "sus", label: "의심", value: sus, change: `-${randomBetween(0.5, 2.5).toFixed(1)}%` }
]

const buildFeedback = (): FeedbackItem[] =>
  Array.from({ length: 5 }).map((_, index) => ({
    id: `fb-${index}`,
    label: pick(labelPool),
    time: pick(feedbackTimes)
  }))

const buildExamples = (): DetectionExample[] =>
  baseExamples.map((item, index) => ({
    id: `ex-${index}`,
    text: item.text,
    label: item.label,
    score: scoreByLabel(item.label)
  }))

const buildComments = (): CommentItem[] =>
  baseComments.map((item, index) => ({
    id: `c-${index}`,
    author: item.author,
    video: item.video,
    label: item.label,
    text: item.text,
    score: scoreByLabel(item.label),
    time: pick(feedbackTimes)
  }))

export const buildMockData = (): MockData => {
  const total = randomInt(1400, 3600)
  const ad = Math.round(total * randomBetween(0.09, 0.16))
  const spam = Math.round(total * randomBetween(0.07, 0.13))
  const sus = Math.round(total * randomBetween(0.11, 0.19))
  const ok = Math.max(total - ad - spam - sus, Math.round(total * 0.4))

  const distribution = [
    { label: "AD" as LabelType, value: ad },
    { label: "SPAM" as LabelType, value: spam },
    { label: "SUS" as LabelType, value: sus },
    { label: "OK" as LabelType, value: ok }
  ]

  return {
    stats: buildStats(total, ad, spam, sus),
    distribution,
    feedback: buildFeedback(),
    examples: buildExamples(),
    comments: buildComments(),
    systemIntro,
    analysisReport: {
      ...reportTemplate,
      counts: {
        AD: ad,
        SPAM: spam,
        SUS: sus,
        OK: ok
      }
    }
  }
}

export const initialMockData = buildMockData()
