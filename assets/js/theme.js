(function () {
  var STORAGE_KEY = 'theme';

  function preferredTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function currentTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    var btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  function setTheme(theme) {
    applyTheme(theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {}
  }

  function init() {
    applyTheme(currentTheme());

    var btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.addEventListener('click', function () {
        setTheme(currentTheme() === 'dark' ? 'light' : 'dark');
      });
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
      try {
        if (localStorage.getItem(STORAGE_KEY)) return;
      } catch (err) {}
      applyTheme(e.matches ? 'dark' : 'light');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
