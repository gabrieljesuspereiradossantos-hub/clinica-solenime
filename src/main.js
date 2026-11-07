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

const galleryTrack = document.querySelector('.gallery-track');
if (galleryTrack) {
  const controls = document.querySelector('.gallery-controls');
  const [previous, next] = controls.querySelectorAll('button');
  const count = controls.querySelector('.gallery-count');
  const total = galleryTrack.children.length;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const currentIndex = () => Math.max(0, Math.min(total - 1,
    Math.round(galleryTrack.scrollLeft / galleryTrack.clientWidth)));

  function updateGallery() {
    const index = currentIndex();
    const label = `${index + 1} / ${total}`;
    if (count.textContent !== label) count.textContent = label;
    previous.disabled = index === 0;
    next.disabled = index === total - 1;
  }

  for (const button of [previous, next]) {
    button.addEventListener('click', () => {
      const index = currentIndex() + Number(button.dataset.step);
      galleryTrack.scrollTo({
        left: index * galleryTrack.clientWidth,
        behavior: reducedMotion.matches ? 'instant' : 'smooth',
      });
    });
  }
  galleryTrack.addEventListener('scroll', updateGallery, { passive: true });
  new ResizeObserver(updateGallery).observe(galleryTrack);
  controls.hidden = false;
  updateGallery();
}

import './film.js';
