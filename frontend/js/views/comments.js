;(() => {
  const YK = (window.YK = window.YK || {})

  function renderFilters(el, state) {
    const types = ['ad','spam','sus','ok']
    const actions = ['hide','review','allow']
    el.innerHTML = `
      <div class="filters" id="filterTypes">
        ${types.map(t => `<button class="filter-chip ${state.filters.types.has(t)?'is-active':''}" data-type="${t}">${YK.classLabel(t)}</button>`).join('')}
      </div>
      <div class="filters mt-12" id="filterActions">
        ${actions.map(a => `<button class="filter-chip ${state.filters.actions.has(a)?'is-active':''}" data-action="${a}">${YK.actionLabel(a)}</button>`).join('')}
      </div>
    `
  }

  function applyQueryFilter(rows, q) {
    if (!q) return rows
    const s = q.toLowerCase()
    return rows.filter(r =>
      r.text.toLowerCase().includes(s) ||
      r.author.toLowerCase().includes(s) ||
      r.video.toLowerCase().includes(s)
    )
  }

  function applyChipsFilter(rows, state) {
    const tset = state.filters.types
    const aset = state.filters.actions
    let out = rows
    if (tset.size) out = out.filter(r => tset.has(r.cls))
    if (aset.size) out = out.filter(r => aset.has(YK.deriveAction(r.score)))
    return out
  }

  function actionPill(a) {
    const cls = a === 'hide' ? 'bad' : a === 'review' ? 'warn' : 'good'
    return `<span class="badge badge--${cls}">${YK.actionLabel(a)}</span>`
  }

  function rowActions(r) {
    return `
      <div class="flex gap-8">
        <button class="btn" data-act="mark" data-id="${r.id}" data-cls="ok">정상</button>
        <button class="btn" data-act="mark" data-id="${r.id}" data-cls="sus">의심</button>
        <button class="btn btn--outline" data-act="mark" data-id="${r.id}" data-cls="spam">스팸</button>
        <button class="btn btn--primary" data-act="mark" data-id="${r.id}" data-cls="ad">광고</button>
      </div>`
  }

  function renderTable(el, rows, state) {
    const html = `
      <table class="table">
        <thead>
          <tr>
            <th style="width: 34px">#</th>
            <th>댓글</th>
            <th style="width: 140px">작성자</th>
            <th style="width: 160px">영상</th>
            <th style="width: 100px">확률</th>
            <th style="width: 120px">판정</th>
            <th style="width: 120px">조치</th>
            <th style="width: 320px">피드백</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map((r, i) => {
            const action = YK.deriveAction(r.score)
            const pillCls = r.cls === 'ad' ? 'pill--ad' : r.cls === 'ok' ? 'pill--ok' : 'pill--sus'
            const exp = (r.explain||[]).map(e => `<span class="badge badge--ghost">${e}</span>`).join(' ')
            return `
              <tr>
                <td>${i+1}</td>
                <td>
                  <div>${r.text}</div>
                  <div class="mt-12" style="color: var(--muted)">${exp}</div>
                </td>
                <td>${r.author}</td>
                <td>${r.video}</td>
                <td>${YK.fmtProb(r.score)}</td>
                <td><span class="pill ${pillCls}">${YK.classLabel(r.cls)}</span></td>
                <td>${actionPill(action)}</td>
                <td>${rowActions(r)}</td>
              </tr>
            `
          }).join('')}
        </tbody>
      </table>
    `
    el.innerHTML = html
  }

  function wireEvents(root, state) {
    // Filter chips
    root.querySelector('#filterTypes')?.addEventListener('click', (e) => {
      const t = e.target.closest('[data-type]')
      if (!t) return
      YK.toggleFilterType(t.dataset.type)
      window.renderComments(root)
    })
    root.querySelector('#filterActions')?.addEventListener('click', (e) => {
      const a = e.target.closest('[data-action]')
      if (!a) return
      YK.toggleFilterAction(a.dataset.action)
      window.renderComments(root)
    })

    // Feedback buttons
    root.addEventListener('click', async (e) => {
      const btn = e.target.closest('[data-act="mark"]')
      if (!btn) return
      const id = btn.dataset.id
      const newCls = btn.dataset.cls
      const st = YK.getState()
      const row = st.comments.find((c) => c.id === id)
      if (!row) return
      row.cls = newCls
      await YK.api.sendFeedback({ commentId: id, newCls, reason: 'manual' })
      window.renderComments(root)
    })
  }

  window.renderComments = async (el) => {
    const st = YK.getState()
    // Fetch or simulate
    const data = await YK.api.listComments()
    if (data?.items) YK.setComments(data.items)

    const q = document.getElementById('searchInput')?.value || ''
    YK.setFilterQuery(q)

    const filtered = applyChipsFilter(applyQueryFilter(st.comments, q), st)

    el.innerHTML = `
      <div class="panel">
        <div class="panel__title">필터</div>
        <div id="filters"></div>
        <div class="mt-12" style="color: var(--muted); line-height:1.6">
          <div><b>예시 가이드</b></div>
          <div>• <b>광고</b>: 링크/전화번호/수익 보장 표현 → 높은 확률, 기본 숨김</div>
          <div>• <b>스팸</b>: 반복 문장, 무관한 홍보 → 보통 검토 또는 숨김</div>
          <div>• <b>의심</b>: 애매한 표현, 후기 위장 → 검토 대상으로 표시</div>
          <div>• <b>정상</b>: 감사/피드백 등 일반적인 댓글 → 허용</div>
        </div>
      </div>
      <div class="mt-12" id="tableWrap"></div>
    `

    renderFilters(el.querySelector('#filters'), st)
    renderTable(el.querySelector('#tableWrap'), filtered, st)
    wireEvents(el, st)
  }
})()
