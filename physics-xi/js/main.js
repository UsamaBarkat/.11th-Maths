/* ============================================================
   main.js — Class XI Physics Tutorial
   Handles: theme toggle, mobile sidebar, KaTeX math rendering.
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- Theme toggle (light / dark, remembered) ---- */
  var root = document.documentElement;
  var themeBtn = document.getElementById('theme-btn');
  function syncThemeIcon() {
    if (!themeBtn) return;
    var dark = root.getAttribute('data-theme') === 'dark';
    themeBtn.textContent = dark ? '☀️' : '🌙';
    themeBtn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  }
  syncThemeIcon();
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var dark = root.getAttribute('data-theme') === 'dark';
      if (dark) { root.removeAttribute('data-theme'); localStorage.setItem('phy-theme', 'light'); }
      else      { root.setAttribute('data-theme', 'dark'); localStorage.setItem('phy-theme', 'dark'); }
      syncThemeIcon();
    });
  }

  /* ---- Mobile sidebar ---- */
  var menuBtn  = document.getElementById('menu-btn');
  var backdrop = document.querySelector('.backdrop');
  function closeNav() { document.body.classList.remove('nav-open'); }
  if (menuBtn) menuBtn.addEventListener('click', function () { document.body.classList.toggle('nav-open'); });
  if (backdrop) backdrop.addEventListener('click', closeNav);
  // close the drawer after tapping a link on mobile
  document.querySelectorAll('.sidebar .unit-link').forEach(function (a) {
    a.addEventListener('click', closeNav);
  });

  /* ---- KaTeX: render all math on the page ---- */
  function renderMath() {
    if (typeof window.renderMathInElement !== 'function') return false;
    window.renderMathInElement(document.body, {
      delimiters: [
        { left: '$$', right: '$$', display: true  },
        { left: '\\[', right: '\\]', display: true  },
        { left: '$',  right: '$',  display: false },
        { left: '\\(', right: '\\)', display: false }
      ],
      throwOnError: false,
      trust: true,
      macros: { '\\dd': '\\mathrm{d}' }
    });
    return true;
  }
  // auto-render is loaded with `defer`, so it is ready by DOMContentLoaded;
  // retry a couple of times just in case of slow CDN.
  if (!renderMath()) {
    var tries = 0;
    var t = setInterval(function () {
      if (renderMath() || ++tries > 40) clearInterval(t);
    }, 100);
  }
});
