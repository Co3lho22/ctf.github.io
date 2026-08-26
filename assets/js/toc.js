(function () {
  const toc = document.getElementById('toc');
  if (!toc) return;

  const content = document.querySelector('.entry-content');
  if (!content) return;

  const headings = Array.from(content.querySelectorAll('h2, h3'));
  if (headings.length < 3) return;

  function slugify(text) {
    return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  headings.forEach(h => {
    if (!h.id) h.id = slugify(h.textContent);
  });

  const items = headings.map(h => {
    const cls = h.tagName === 'H3' ? ' class="toc-h3"' : '';
    return `<li${cls}><a href="#${h.id}">${h.textContent}</a></li>`;
  }).join('');

  toc.innerHTML = `<div class="toc-box"><span class="toc-title">Contents</span><ol class="toc-list">${items}</ol></div>`;

  const links = toc.querySelectorAll('a');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(a => a.classList.remove('active'));
        const a = toc.querySelector(`a[href="#${entry.target.id}"]`);
        if (a) a.classList.add('active');
      }
    });
  }, { rootMargin: '-10% 0px -80% 0px' });

  headings.forEach(h => observer.observe(h));
})();
