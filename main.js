// Tocca · Proposta TUFY EVENTOS — interações: mão pixel, menu mobile,
// reveal on scroll, render das fases, navegação ativa.

// ---------- Mão pixel (X = tinta, C = punho colorido) ----------
const HAND = [
  '.....XX.....',
  '.....XX.....',
  '.....XX.....',
  '.....XX.....',
  '.....XXXX...',
  '.....XXXXXX.',
  '..X..XXXXXX.',
  '..XX.XXXXXX.',
  '..XXXXXXXXX.',
  '...XXXXXXXX.',
  '...XXXXXXXX.',
  '....CCCCCC..',
  '....CCCCCC..',
];

document.querySelectorAll('[data-hand]').forEach((el) => {
  el.style.gridTemplateColumns = `repeat(${HAND[0].length}, var(--cell))`;
  const frag = document.createDocumentFragment();
  for (const row of HAND) {
    for (const ch of row) {
      const cell = document.createElement('span');
      if (ch === 'X') cell.className = 'px';
      if (ch === 'C') cell.className = 'cf';
      frag.appendChild(cell);
    }
  }
  el.appendChild(frag);
});

// ---------- Menu mobile ----------
const menuBtn = document.querySelector('.menu-btn');
const overlay = document.getElementById('menu-overlay');

function setMenu(open) {
  overlay.hidden = !open;
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.textContent = open ? 'Fechar' : 'Menu';
  document.body.style.overflow = open ? 'hidden' : '';
}

if (menuBtn && overlay) {
  menuBtn.addEventListener('click', () => setMenu(overlay.hidden));
  overlay.addEventListener('click', (e) => {
    if (e.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !overlay.hidden) setMenu(false);
  });
}

// ---------- Navegação ativa (rail + topbar) ----------
const navLinks = Array.from(document.querySelectorAll('[data-nav-link]'));
const navTargets = navLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
if ('IntersectionObserver' in window && navTargets.length) {
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = '#' + entry.target.id;
      navLinks.forEach(a => a.classList.toggle('ativo', a.getAttribute('href') === id));
    });
  }, { rootMargin: '-40% 0px -50% 0px' });
  navTargets.forEach(s => navObserver.observe(s));
}

// ---------- Reveal on scroll ----------
const revealObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
