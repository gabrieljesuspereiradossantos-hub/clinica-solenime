import './style.css';

const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
if (menuButton && mobileNav) {
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    mobileNav.hidden = !open;
  });
  mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    mobileNav.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menu');
  }));
}

document.querySelector('#year').textContent = String(new Date().getFullYear());

const passage = document.querySelector('.visual-passage');
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
let ticking = false;
function updatePassage() {
  ticking = false;
  if (!passage || reduceMotion.matches || innerWidth < 600) return;
  const rect = passage.getBoundingClientRect();
  const progress = Math.min(1, Math.max(0, (innerHeight - rect.top) / (innerHeight + rect.height)));
  passage.style.setProperty('--passage-shift', `${(0.5 - progress) * 42}px`);
  passage.style.setProperty('--passage-opacity', String(Math.min(1, 0.65 + progress * 0.35)));
}
addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(updatePassage); } }, { passive: true });
addEventListener('resize', updatePassage);
updatePassage();
