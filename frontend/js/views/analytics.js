;(() => {
  const YK = (window.YK = window.YK || {})

  function drawLine(canvas, pts, color = '#e50914') {
    const dpr = window.devicePixelRatio || 1
    const w = canvas.clientWidth, h = canvas.clientHeight
    canvas.width = w * dpr; canvas.height = h * dpr
    const ctx = canvas.getContext('2d'); ctx.scale(dpr, dpr)
    ctx.clearRect(0,0,w,h)
    const maxY = Math.max(1, ...pts.map(p => p.y))
    const minY = 0
    const pad = 28
    const W = w - pad*2
    const H = h - pad*2
    // grid
    ctx.strokeStyle = '#22222a'; ctx.lineWidth = 1
    for (let i=0;i<=4;i++) {
      const gy = pad + (H/4)*i
      ctx.beginPath(); ctx.moveTo(pad, gy); ctx.lineTo(pad+W, gy); ctx.stroke()
    }
    // line
    ctx.strokeStyle = color; ctx.lineWidth = 2
    ctx.beginPath()
    pts.forEach((p, i) => {
      const x = pad + (i/(pts.length-1))*W
      const y = pad + (1 - (p.y-minY)/(maxY-minY)) * H
      if (i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y)
    })
    ctx.stroke()
    // points
    ctx.fillStyle = color
    pts.forEach((p, i) => {
      const x = pad + (i/(pts.length-1))*W
      const y = pad + (1 - (p.y-minY)/(maxY-minY)) * H
      ctx.beginPath(); ctx.arc(x,y,3,0,Math.PI*2); ctx.fill()
    })
  }

  function buildSeries(comments) {
    // create fake daily series for last 14 points
    const days = 14
    const series = [...Array(days)].map((_, i) => ({
      day: i,
      total: 0, ad: 0, spam: 0, sus: 0, ok: 0
    }))
    comments.forEach(c => {
      const d = new Date(c.createdAt)
      const idx = days-1 - Math.min(days-1, Math.floor((Date.now() - d.getTime())/86400000))
      if (series[idx]) {
        series[idx].total++
        series[idx][c.cls] = (series[idx][c.cls]||0) + 1
      }
    })
    return series
  }

  window.renderAnalytics = (el) => {
    const { comments } = YK.getState()
    const series = buildSeries(comments)
    const adRate = series.map(s => ({ y: s.total ? (s.ad/s.total)*100 : 0 }))

    el.innerHTML = `
      <div class="cards">
        <div class="card"><div class="card__title">기간 합계</div><div class="card__value">${series.reduce((a,b)=>a+b.total,0)}</div></div>
        <div class="card"><div class="card__title">광고 탐지율(%)</div><div class="card__value">${(adRate.reduce((a,b)=>a+b.y,0)/Math.max(1,adRate.length)).toFixed(1)}</div></div>
        <div class="card"><div class="card__title">피크 데이</div><div class="card__value">${series.reduce((m,s)=>s.total>m.total?s:m, {total:0}).total}</div></div>
        <div class="card"><div class="card__title">평균 길이</div><div class="card__value">${(comments.reduce((a,c)=>a+(c.text?.length||0),0)/Math.max(1,comments.length)).toFixed(0)}자</div></div>
      </div>

      <div class="row mt-12">
        <div class="col panel">
          <div class="panel__title">일별 광고 탐지율</div>
          <canvas id="detRate" style="width:100%; height:240px"></canvas>
        </div>
        <div class="col panel">
          <div class="panel__title">클래스 분포(최근)</div>
          <div id="dist" class="mt-12 flex gap-12"></div>
        </div>
      </div>
    `
    const cvs = el.querySelector('#detRate')
    drawLine(cvs, adRate, '#e50914')

    const last = series[series.length-1] || { ad:0, spam:0, sus:0, ok:0 }
    el.querySelector('#dist').innerHTML = `
      <span class="badge">광고 ${last.ad}</span>
      <span class="badge badge--bad">스팸 ${last.spam}</span>
      <span class="badge badge--warn">의심 ${last.sus}</span>
      <span class="badge badge--good">정상 ${last.ok}</span>
    `
  }
})()

