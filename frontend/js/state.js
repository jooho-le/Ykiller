// Global application state and utilities
;(() => {
  const YK = (window.YK = window.YK || {})

  // Default thresholds per spec: hide >= 0.9, review >= 0.7
  const defaultPolicy = { hide: 0.9, review: 0.7 }

  const state = {
    policy: { ...defaultPolicy },
    comments: [],
    filters: { q: '', types: new Set(), actions: new Set() },
    feedback: [],
    loading: false,
  }

  YK.getState = () => state
  YK.setPolicy = (p) => { state.policy = { ...state.policy, ...p } }
  YK.setComments = (rows) => { state.comments = rows }
  YK.addFeedback = (item) => { state.feedback.push(item) }
  YK.setFilterQuery = (q) => { state.filters.q = q }
  YK.toggleFilterType = (t) => {
    const s = state.filters.types
    s.has(t) ? s.delete(t) : s.add(t)
  }
  YK.toggleFilterAction = (t) => {
    const s = state.filters.actions
    s.has(t) ? s.delete(t) : s.add(t)
  }

  YK.deriveAction = (score) => {
    const { hide, review } = state.policy
    if (score >= hide) return 'hide'
    if (score >= review) return 'review'
    return 'allow'
  }

  // Simple utilities
  YK.fmtPct = (v) => (v * 100).toFixed(0) + '%'
  YK.fmtProb = (v) => v.toFixed(2)
  YK.classLabel = (cls) => ({ ad: '광고', spam: '스팸', sus: '의심', ok: '정상' }[cls] || cls)
  YK.actionLabel = (a) => ({ hide: '숨김', review: '검토', allow: '허용' }[a])

  // Simulated data generator for PoC
  const phrases = [
    '좋은 영상 감사합니다!','정말 도움 많이 됐어요','이 링크 타고 수익 올렸습니다 👉 bit.ly/abc',
    '무료로 코인 받아가세요 http://x.co/re','제 채널도 구독 부탁드려요','이 사이트 진짜 대박…','010-1234-5678 연락주세요',
    '초보도 하루만에 수익 100만원','행운의 편지: 10명에게 공유하세요','강의 깔끔하네요','댓글 이벤트 진행중!','텔레그램 오픈채팅 ㄱ','✅✅ 지금 바로 참여!','후기까지 보증합니다','코드 너무 유익했어요'
  ]
  const clsCandidates = ['ok','ok','ok','ad','spam','sus','ok','ad','spam','ok','sus','spam','ad','ad','ok']

  YK.simulateComments = (n = 30) => {
    const rows = [...Array(n)].map((_, i) => {
      const idx = Math.floor(Math.random() * phrases.length)
      const text = phrases[idx]
      const cls = clsCandidates[idx]
      const score = cls === 'ok' ? Math.random() * 0.45
                  : cls === 'sus' ? 0.55 + Math.random() * 0.25
                  : 0.7 + Math.random() * 0.3
      return {
        id: `c_${Date.now()}_${i}`,
        author: ['민수','지영','태호','서윤','유진'][Math.floor(Math.random()*5)],
        video: ['리액트 강의','AI 개론','주식 초보','브이로그','게임 리뷰'][Math.floor(Math.random()*5)],
        text,
        score: +score.toFixed(2),
        cls: cls === 'ok' && score > 0.6 ? 'sus' : cls, // slight drift
        createdAt: new Date(Date.now() - Math.random()*86400000).toISOString(),
        explain: ['URL', '반복문장', '전화번호', '의심 키워드'].slice(0, Math.floor(Math.random()*3)+1)
      }
    })
    state.comments = rows
    return rows
  }
})()

