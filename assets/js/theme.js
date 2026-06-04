(function () {
  var btn = document.getElementById('theme-toggle');
  var icon = document.getElementById('theme-icon');
  var root = document.documentElement;

  var saved = localStorage.getItem('theme') || 'dark';
  root.setAttribute('data-theme', saved);
  icon.textContent = saved === 'dark' ? '☀' : '☽';

  btn.addEventListener('click', function () {
    var current = root.getAttribute('data-theme');
    var next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    icon.textContent = next === 'dark' ? '☀' : '☽';
  });
})();
