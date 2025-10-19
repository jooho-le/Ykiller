// Minimal Hash Router (resolves views at runtime to avoid script-order issues)
;(() => {
  const YK = (window.YK = window.YK || {})

  function setActiveNav(path) {
    document.querySelectorAll('.nav__item').forEach((a) => {
      a.classList.toggle('is-active', a.getAttribute('data-route') === path)
    })
  }

  function navigate() {
    const hash = location.hash.replace('#/', '') || 'dashboard'
    const view = document.getElementById('view')
    // Resolve renderers at call time so it works regardless of load order
    const routes = {
      dashboard: window.renderDashboard,
      comments: window.renderComments,
      analytics: window.renderAnalytics,
      settings: window.renderSettings,
    }
    const render = routes[hash] || routes.dashboard
    setActiveNav(hash)
    render?.(view)
  }

  window.addEventListener('hashchange', navigate)
  YK.navigate = navigate
})()
