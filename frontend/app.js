;(() => {
  const st = YK.getState()

  // Hook topbar controls
  function syncPolicyUI() {
    const { hide, review } = st.policy
    const thHide = document.getElementById('thHide')
    const thReview = document.getElementById('thReview')
    const thHideVal = document.getElementById('thHideVal')
    const thReviewVal = document.getElementById('thReviewVal')
    if (!thHide || !thReview) return
    thHide.value = String(hide)
    thReview.value = String(review)
    thHideVal.textContent = hide.toFixed(2)
    thReviewVal.textContent = review.toFixed(2)
  }

  function initTopbar() {
    syncPolicyUI()
    document.getElementById('thHide')?.addEventListener('input', (e) => {
      const v = Math.max(parseFloat(e.target.value || '0'), st.policy.review)
      YK.setPolicy({ hide: v })
      document.getElementById('thHideVal').textContent = v.toFixed(2)
    })
    document.getElementById('thReview')?.addEventListener('input', (e) => {
      const v = Math.min(parseFloat(e.target.value || '0'), st.policy.hide)
      YK.setPolicy({ review: v })
      document.getElementById('thReviewVal').textContent = v.toFixed(2)
    })
    document.getElementById('savePolicyBtn')?.addEventListener('click', async () => {
      await YK.api.updatePolicy(st.policy)
      alert('정책이 저장되었습니다')
      if (location.hash === '#/comments') YK.navigate()
    })
    document.getElementById('searchInput')?.addEventListener('input', () => {
      if (location.hash === '#/comments') YK.navigate()
    })
  }

  function initSidebar() {
    document.getElementById('simulateBtn')?.addEventListener('click', () => {
      YK.simulateComments(50)
      YK.navigate()
    })
  }

  function boot() {
    // initial simulation for empty state
    if (!st.comments.length) YK.simulateComments(40)
    initTopbar()
    initSidebar()
    YK.navigate()
  }

  window.addEventListener('DOMContentLoaded', boot)
})()

