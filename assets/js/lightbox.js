(function () {
  const content = document.querySelector('.entry-content');
  if (!content) return;

  const images = Array.from(content.querySelectorAll('img'));
  if (!images.length) return;

  // Wrap every image in <figure> with a numbered caption
  images.forEach((img, i) => {
    const figure = document.createElement('figure');
    const figcaption = document.createElement('figcaption');
    figcaption.textContent = `Fig. ${i + 1}${img.alt ? ' — ' + img.alt : ''}`;
    img.dataset.figNum = i + 1;

    // Remove inline styles — CSS (figure img selector) handles them
    img.removeAttribute('style');

    img.parentNode.insertBefore(figure, img);
    figure.appendChild(img);
    figure.appendChild(figcaption);
  });

  // Build the lightbox overlay (appended once to body)
  const overlay = document.createElement('div');
  overlay.className = 'lightbox';
  overlay.innerHTML =
    '<img class="lightbox-img" src="" alt="">' +
    '<p class="lightbox-caption"></p>';
  document.body.appendChild(overlay);

  const lbImg    = overlay.querySelector('.lightbox-img');
  const lbCaption = overlay.querySelector('.lightbox-caption');

  function open(img) {
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbCaption.textContent =
      `Fig. ${img.dataset.figNum}${img.alt ? ' — ' + img.alt : ''}`;
    overlay.style.display = 'flex';
    // Double rAF ensures the element is painted before the transition fires
    requestAnimationFrame(() =>
      requestAnimationFrame(() => overlay.classList.add('active'))
    );
    document.body.style.overflow = 'hidden';
  }

  function close() {
    overlay.classList.remove('active');
    setTimeout(() => {
      if (!overlay.classList.contains('active')) {
        overlay.style.display = 'none';
        lbImg.src = '';
      }
    }, 220);
    document.body.style.overflow = '';
  }

  images.forEach(img => img.addEventListener('click', () => open(img)));
  overlay.addEventListener('click', close);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
})();
