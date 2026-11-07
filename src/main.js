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

const instagram = document.querySelector('.instagram-link');
if (instagram) {
  const pointerMotion = matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');

  instagram.addEventListener('pointermove', event => {
    if (!pointerMotion.matches || event.pointerType === 'touch') return;
    const { left, top, width, height } = instagram.getBoundingClientRect();
    const x = (event.clientX - left) / width;
    const y = (event.clientY - top) / height;
    instagram.style.setProperty('--tilt-x', `${(0.5 - y) * 34}deg`);
    instagram.style.setProperty('--tilt-y', `${(x - 0.5) * 34}deg`);
    instagram.style.setProperty('--light-x', `${x * 100}%`);
    instagram.style.setProperty('--light-y', `${y * 100}%`);
    instagram.classList.add('is-tilting');
  });

  const resetTilt = () => instagram.classList.remove('is-tilting');
  instagram.addEventListener('pointerleave', resetTilt);
  instagram.addEventListener('pointercancel', resetTilt);
  pointerMotion.addEventListener('change', resetTilt);
}

import './film.js';
