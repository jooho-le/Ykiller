;(() => {
  const YK = (window.YK = window.YK || {})

  window.renderSettings = (el) => {
    const { policy, feedback } = YK.getState()
    el.innerHTML = `
      <div class="row">
        <div class="col panel">
          <div class="panel__title">백엔드 연결</div>
          <div class="mt-12 flex gap-12">
            <input id="backendUrl" class="input" placeholder="예: http://localhost:8000" />
            <button id="applyBackend" class="btn btn--primary">적용</button>
          </div>
          <div class="mt-12" style="color: var(--muted)">미설정 시 시뮬레이션 데이터 사용</div>
        </div>

        <div class="col panel">
          <div class="panel__title">정책</div>
          <div>숨김 ≥ <b>${policy.hide.toFixed(2)}</b>, 검토 ≥ <b>${policy.review.toFixed(2)}</b></div>
          <div class="mt-12"><button id="resetPolicy" class="btn">기본값으로</button></div>
        </div>
      </div>

      <div class="panel mt-16">
        <div class="panel__title">로컬 큐(피드백)</div>
        <div id="fbq" class="mt-12" style="max-height: 220px; overflow:auto"></div>
      </div>
    `

    // feedback queue
    el.querySelector('#fbq').innerHTML = feedback.length
      ? feedback.map(f => `<div class="flex gap-12 mt-12"><span class="badge badge--ghost">${f.commentId}</span><span class="badge">${f.newCls}</span><span class="badge badge--ghost">${new Date(f.queuedAt).toLocaleString()}</span></div>`).join('')
      : '<div style="color: var(--muted)">큐가 비어 있습니다</div>'

    el.querySelector('#applyBackend').addEventListener('click', () => {
      const url = el.querySelector('#backendUrl').value.trim()
      if (!url) return
      YK.api.configure(url)
      alert('백엔드 기본 URL 적용: ' + url)
    })
    el.querySelector('#resetPolicy').addEventListener('click', () => {
      YK.setPolicy({ hide: 0.9, review: 0.7 })
      alert('정책을 기본값으로 복원했습니다')
      YK.navigate()
    })
  }
})()

