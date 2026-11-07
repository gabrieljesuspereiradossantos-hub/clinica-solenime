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

import './film.js';
