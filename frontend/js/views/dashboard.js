;(() => {
  const YK = (window.YK = window.YK || {})

  function metrics(comments) {
    const total = comments.length
    const ad = comments.filter((c) => c.cls === 'ad').length
    const spam = comments.filter((c) => c.cls === 'spam').length
    const sus = comments.filter((c) => c.cls === 'sus').length
    const ok = comments.filter((c) => c.cls === 'ok').length
    return { total, ad, spam, sus, ok }
  }

  function drawMiniBar(canvas, data) {
    const dpr = window.devicePixelRatio || 1
    const w = canvas.clientWidth, h = canvas.clientHeight
    canvas.width = w * dpr; canvas.height = h * dpr
    const ctx = canvas.getContext('2d'); ctx.scale(dpr, dpr)
    ctx.clearRect(0,0,w,h)
    const keys = ['ad','spam','sus','ok']
    const colors = { ad: '#e50914', spam: '#ef4444', sus: '#f59e0b', ok: '#16a34a' }
    const max = Math.max(1, ...keys.map(k => data[k]))
    const bw = Math.floor((w - 40) / keys.length)
    keys.forEach((k, i) => {
      const x = 20 + i*bw + 6
      const bh = Math.round((data[k]/max) * (h-30))
      const y = h - 20 - bh
      ctx.fillStyle = colors[k]; ctx.fillRect(x, y, bw-12, bh)
      ctx.fillStyle = '#9ca3af'; ctx.font = '12px system-ui'; ctx.textAlign='center'
      ctx.fillText(k.toUpperCase(), x + (bw-12)/2, h-6)
    })
  }

  window.renderDashboard = async (el) => {
    const { comments } = YK.getState()
    const m = metrics(comments)
    el.innerHTML = `
      <div class="cards">
        <div class="card"><div class="card__title">총 댓글</div><div class="card__value">${m.total}</div></div>
        <div class="card"><div class="card__title">광고(예측)</div><div class="card__value">${m.ad}</div></div>
        <div class="card"><div class="card__title">스팸</div><div class="card__value">${m.spam}</div></div>
        <div class="card"><div class="card__title">의심</div><div class="card__value">${m.sus}</div></div>
      </div>

      <div class="row mt-12">
        <div class="col panel">
          <div class="panel__title">분류 분포</div>
          <canvas id="barChart" style="width:100%; height:220px"></canvas>
        </div>
        <div class="col panel">
          <div class="panel__title">정책 요약</div>
          <div id="policySummary"></div>
          <div class="mt-12">
            <div class="panel__title">최근 피드백</div>
            <div id="feedbackList"></div>
          </div>
        </div>
      </div>

      <div class="row mt-12">
        <div class="col panel">
          <div class="panel__title">시스템 소개</div>
          <div class="mt-12" style="line-height:1.6">
            <div>• 유튜브 댓글을 수집하고 텍스트를 정제한 뒤, AI가 광고·스팸·의심·정상으로 판별합니다.</div>
            <div>• 운영자는 <b>임계값</b>을 조정해 자동 숨김/검토/허용 정책을 제어할 수 있습니다.</div>
            <div>• 오탐/미탐은 <b>피드백</b>으로 반영되어 향후 재학습에 활용됩니다.</div>
          </div>
        </div>
        <div class="col panel">
          <div class="panel__title">탐지 예시</div>
          <div class="mt-12">
            <div class="mt-12">“이 영상 보고 수익 올렸어요 👉 bit.ly/abc” <span class="badge">광고 확률 0.94</span> <span class="badge badge--bad">숨김</span></div>
            <div class="mt-12">“010-1234-5678 무료 상담” <span class="badge">광고 확률 0.88</span> <span class="badge badge--warn">검토</span></div>
            <div class="mt-12">“좋은 영상 감사합니다!” <span class="badge badge--ghost">광고 확률 0.02</span> <span class="badge badge--good">허용</span></div>
          </div>
        </div>
      </div>
    `
    const cvs = el.querySelector('#barChart')
    drawMiniBar(cvs, m)

    const { policy, feedback } = YK.getState()
    el.querySelector('#policySummary').innerHTML = `
      <div class="flex gap-12">
        <span class="badge">숨김 ≥ ${YK.fmtProb(policy.hide)}</span>
        <span class="badge badge--ghost">검토 ≥ ${YK.fmtProb(policy.review)}</span>
        <span class="badge badge--ghost">허용 < ${YK.fmtProb(policy.review)}</span>
      </div>
    `
    const fb = feedback.slice(-5).reverse().map(f => `
      <div class="flex gap-12 mt-12">
        <span class="badge badge--ghost">${f.commentId || f.id}</span>
        <span class="pill pill--${f.newCls === 'ad' ? 'ad' : f.newCls === 'ok' ? 'ok' : 'sus'}">${YK.classLabel(f.newCls)}</span>
        <span class="badge badge--ghost">${new Date(f.queuedAt || Date.now()).toLocaleString()}</span>
      </div>
    `).join('') || '<div class="mt-12" style="color: var(--muted)">피드백 없음</div>'
    el.querySelector('#feedbackList').innerHTML = fb
  }
})()
