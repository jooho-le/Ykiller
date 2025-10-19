// API client with graceful fallback to simulation
;(() => {
  const YK = (window.YK = window.YK || {})

  const config = {
    // Set to your backend origin, e.g., 'http://localhost:8000'
    baseUrl: '',
    timeoutMs: 6000,
  }

  async function request(path, options = {}) {
    if (!config.baseUrl) throw new Error('No backend configured')
    const ctrl = new AbortController()
    const id = setTimeout(() => ctrl.abort(), config.timeoutMs)
    try {
      const res = await fetch(config.baseUrl + path, { ...options, signal: ctrl.signal })
      if (!res.ok) throw new Error('HTTP ' + res.status)
      return await res.json()
    } finally {
      clearTimeout(id)
    }
  }

  const api = {
    configure(baseUrl) { config.baseUrl = baseUrl },
    async listComments(params = {}) {
      try {
        const qs = new URLSearchParams(params).toString()
        const data = await request('/comments' + (qs ? `?${qs}` : ''))
        return data
      } catch (e) {
        console.warn('API unavailable, using simulated comments', e.message)
        return { items: YK.simulateComments(40) }
      }
    },
    async sendFeedback(payload) {
      try {
        return await request('/feedback', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      } catch (e) {
        console.warn('Feedback queued locally')
        YK.addFeedback({ ...payload, queuedAt: new Date().toISOString() })
        return { queued: true }
      }
    },
    async updatePolicy(policy) {
      try {
        return await request('/policy', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(policy) })
      } catch (e) {
        console.warn('Policy update deferred (offline)')
        return { deferred: true }
      }
    },
  }

  YK.api = api
})()

