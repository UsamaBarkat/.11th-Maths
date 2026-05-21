/* ============================================================
   main.js — Loaded on EVERY page
   Handles: dark mode toggle (remembers preference)
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ── DARK MODE ────────────────────────────────────────────────
     How it works:
     - We put data-theme="dark" on the <html> element
     - CSS in style.css reads [data-theme="dark"] and changes colors
     - localStorage.setItem saves the choice between browser sessions
  */

  // Apply saved theme before showing any content (prevents flash)
  // Default is dark — only go light if user explicitly chose light before
  const saved = localStorage.getItem('theme');
  if (saved !== 'light') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  // Find the dark mode button (every page has one with id="dark-mode-btn")
  const btn = document.getElementById('dark-mode-btn');
  if (btn) {
    syncBtnLabel(btn); // set correct emoji/text on load

    btn.addEventListener('click', function () {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

      if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      }

      syncBtnLabel(btn);
    });
  }

}); // end DOMContentLoaded

// Helper: update button emoji and text to match current theme
function syncBtnLabel(btn) {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  btn.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
}
