import type { CommentFlag, ReportMode, ReportResult, SuspiciousComment } from "@/lib/types"
import { clamp } from "@/lib/utils"

const sampleTitles = [
  "AI로 편집한 하루 브이로그",
  "최신 스마트폰 리뷰",
  "공부 루틴 공유",
  "게임 하이라이트 모음",
  "직장인 일상 브이로그",
  "주말 재테크 이야기",
  "라이브 Q&A 하이라이트",
  "여행 브이로그: 도쿄편"
]

const sampleChannels = [
  "디지털연구소",
  "모닝루틴",
  "테크 인사이트",
  "커뮤니티랩",
  "코멘트캐처",
  "브이로그 로그",
  "주말공간",
  "콘텐츠스코프"
]

const sampleAuthors = [
  "봄날의별",
  "센스있는사람",
  "익명_023",
  "실시간소식통",
  "히든가드",
  "차분한관찰자",
  "미러링",
  "포스트맨",
  "햇살코드",
  "라이트하우스"
]

const suspiciousTexts = [
  "투자 손실 복구 방법 공유합니다 👉",
  "무료 체험 링크 확인하세요",
  "이 채널 진짜 최고네요, 여기 이벤트 있음",
  "한 번만 연락 주세요 010-1234-5678",
  "카톡 주시면 바로 안내드립니다",
  "실시간 수익 인증!",
  "지금 가입하면 쿠폰 지급",
  "댓글로 링크 남깁니다",
  "방송 다시보기 링크",
  "고정 댓글에 있는 링크 확인"
]

const domainPool = [
  "bit.ly",
  "t.me",
  "open.kakao.com",
  "shorturl.at",
  "tinyurl.com",
  "forms.gle",
  "youtube.com",
  "blog.naver.com",
  "event-kr.com",
  "click-safe.net"
]

const keywordPool = [
  "무료",
  "쿠폰",
  "수익",
  "연락",
  "링크",
  "체험",
  "지금",
  "인증",
  "할인",
  "지급"
]

function createRandom(seed: number) {
  let value = seed % 2147483647
  if (value <= 0) value += 2147483646
  return () => (value = (value * 16807) % 2147483647) / 2147483647
}

function pickOne<T>(items: T[], random: () => number) {
  return items[Math.floor(random() * items.length)]
}

function formatDate(date: Date) {
  const pad = (value: number) => String(value).padStart(2, "0")
  return `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())} ${pad(
    date.getHours()
  )}:${pad(date.getMinutes())}`
}

export function createJobId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID()
  }
  return `job-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

export function createMockReport({
  jobId,
  videoUrl,
  mode = "viewer"
}: {
  jobId: string
  videoUrl?: string
  mode?: ReportMode
}): ReportResult {
  const seed = jobId.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const random = createRandom(seed)

  const total = 920 + Math.floor(random() * 380)
  const adCount = Math.floor(total * (0.08 + random() * 0.07))
  const spamCount = Math.floor(total * (0.06 + random() * 0.06))
  const susCount = Math.floor(total * (0.07 + random() * 0.08))
  const okCount = clamp(total - adCount - spamCount - susCount, 0, total)

  const riskRatio = (adCount + spamCount) / total
  const riskLevel = riskRatio > 0.2 ? "RISK" : riskRatio > 0.12 ? "WARN" : "SAFE"

  const title = pickOne(sampleTitles, random)
  const channel = pickOne(sampleChannels, random)

  const analyzedAt = formatDate(new Date(Date.now() - Math.floor(random() * 1000 * 60 * 60 * 12)))

  const summary = {
    totalComments: total,
    spamCount,
    adCount,
    linkCount: Math.floor(total * (0.1 + random() * 0.08)),
    contactCount: Math.floor(total * (0.04 + random() * 0.05))
  }

  const classDistribution = [
    { label: "AD" as CommentFlag, value: adCount },
    { label: "SPAM" as CommentFlag, value: spamCount },
    { label: "SUS" as CommentFlag, value: susCount },
    { label: "OK" as CommentFlag, value: okCount }
  ]

  const timeSeries = Array.from({ length: 8 }).map((_, index) => {
    const hour = String(index * 3).padStart(2, "0")
    return {
      hour: `${hour}시`,
      count: Math.floor(40 + random() * 120)
    }
  })

  const suspicious: SuspiciousComment[] = Array.from({ length: 10 }).map((_, index) => {
    const reason = (index % 3 === 0
      ? "AD"
      : index % 3 === 1
        ? "SPAM"
        : "SUS") as CommentFlag
    const scoreBase = reason === "AD" ? 82 : reason === "SPAM" ? 76 : 64
    const score = clamp(scoreBase + Math.floor(random() * 18), 50, 98)
    const action = score >= 85 ? "숨김" : score >= 70 ? "검토" : "허용"
    const hasLink = reason !== "SUS" || random() > 0.5
    const hasContact = reason !== "OK" && random() > 0.6
    return {
      id: `${jobId}-${index}`,
      author: pickOne(sampleAuthors, random),
      content: pickOne(suspiciousTexts, random),
      reason,
      score,
      action,
      hasLink,
      hasContact,
      createdAt: formatDate(new Date(Date.now() - Math.floor(random() * 1000 * 60 * 45)))
    }
  })

  const patterns = {
    domains: Array.from({ length: 5 }).map(() => pickOne(domainPool, random)),
    keywords: Array.from({ length: 5 }).map(() => pickOne(keywordPool, random))
  }

  return {
    jobId,
    videoTitle: title,
    videoUrl: videoUrl ?? `https://www.youtube.com/watch?v=${jobId.slice(0, 8)}`,
    channelName: channel,
    analyzedAt,
    mode,
    riskLevel,
    summary,
    classDistribution,
    timeSeries,
    suspicious,
    patterns
  }
}
