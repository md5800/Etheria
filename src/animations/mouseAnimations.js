// Mouse & Pointer Interactions: ÉTHERIA BOTANICALS
import { gsap } from 'gsap';

export function initMouseAnimations() {
  // Mobile & Touch check: disable mouse effects on touch/mobile devices
  if (window.innerWidth <= 768 || 'ontouchstart' in window) return;

  initCustomCursor();
  initMagneticButtons();
  init3dCardTilt();
}

function initCustomCursor() {
  const dot = document.querySelector('#custom-cursor-dot');
  const ring = document.querySelector('#custom-cursor-ring');

  if (!dot || !ring) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    gsap.set(dot, { x: mouseX, y: mouseY });
  }, { passive: true });

  // Driven by GSAP's own ticker (the same frame loop driving Lenis/ScrollTrigger)
  // instead of a separate requestAnimationFrame loop.
  gsap.ticker.add(() => {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    gsap.set(ring, { x: ringX, y: ringY });
  });

  // Event delegation for static and dynamically rendered interactive elements
  document.addEventListener('mouseover', (e) => {
    const target = e.target.closest('a, button, .product-card, .filter-btn, .shop-filter-btn, .badge-circle, .size-pill');
    if (target) {
      ring.classList.add('cursor-hover');
      dot.classList.add('cursor-hover');
    }
  }, { passive: true });

  document.addEventListener('mouseout', (e) => {
    const target = e.target.closest('a, button, .product-card, .filter-btn, .shop-filter-btn, .badge-circle, .size-pill');
    if (target) {
      ring.classList.remove('cursor-hover');
      dot.classList.remove('cursor-hover');
    }
  }, { passive: true });
}

function initMagneticButtons() {
  document.addEventListener('mouseenter', (e) => {
    const btn = e.target.closest ? e.target.closest('.btn-primary, .btn-outline, .badge-circle, .cart-toggle-btn') : null;
    if (!btn || btn !== e.target) return;

    if (!btn._gsapMagneticInit) {
      btn._gsapMagneticInit = true;
      btn._magneticXTo = gsap.quickTo(btn, 'x', { duration: 0.3, ease: 'power2.out' });
      btn._magneticYTo = gsap.quickTo(btn, 'y', { duration: 0.3, ease: 'power2.out' });
    }
    btn._magneticBounds = btn.getBoundingClientRect();
  }, true);

  document.addEventListener('mousemove', (e) => {
    const btn = e.target.closest ? e.target.closest('.btn-primary, .btn-outline, .badge-circle, .cart-toggle-btn') : null;
    if (!btn) return;

    const bounds = btn._magneticBounds || btn.getBoundingClientRect();
    const x = e.clientX - bounds.left - bounds.width / 2;
    const y = e.clientY - bounds.top - bounds.height / 2;

    if (btn._magneticXTo && btn._magneticYTo) {
      btn._magneticXTo(x * 0.25);
      btn._magneticYTo(y * 0.25);
    }
  }, { passive: true });

  document.addEventListener('mouseleave', (e) => {
    const btn = e.target.closest ? e.target.closest('.btn-primary, .btn-outline, .badge-circle, .cart-toggle-btn') : null;
    if (!btn || btn !== e.target) return;

    btn._magneticBounds = null;
    gsap.to(btn, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.4)'
    });
  }, true);
}

function init3dCardTilt() {
  document.addEventListener('mouseenter', (e) => {
    const card = e.target.closest ? e.target.closest('.product-card, .hero-image-card, .clinical-stat-card') : null;
    if (!card || card !== e.target) return;

    if (!card._gsapTiltInit) {
      card._gsapTiltInit = true;
      gsap.set(card, { transformPerspective: 1000 });
      card._tiltRotationXTo = gsap.quickTo(card, 'rotationX', { duration: 0.3, ease: 'power2.out' });
      card._tiltRotationYTo = gsap.quickTo(card, 'rotationY', { duration: 0.3, ease: 'power2.out' });
    }
    card._tiltBounds = card.getBoundingClientRect();
  }, true);

  document.addEventListener('mousemove', (e) => {
    const card = e.target.closest ? e.target.closest('.product-card, .hero-image-card, .clinical-stat-card') : null;
    if (!card) return;

    const bounds = card._tiltBounds || card.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;

    const centerX = bounds.width / 2;
    const centerY = bounds.height / 2;

    if (card._tiltRotationXTo && card._tiltRotationYTo) {
      card._tiltRotationXTo(((y - centerY) / centerY) * -8);
      card._tiltRotationYTo(((x - centerX) / centerX) * 8);
    }
  }, { passive: true });

  document.addEventListener('mouseleave', (e) => {
    const card = e.target.closest ? e.target.closest('.product-card, .hero-image-card, .clinical-stat-card') : null;
    if (!card || card !== e.target) return;

    card._tiltBounds = null;
    if (card._tiltRotationXTo && card._tiltRotationYTo) {
      card._tiltRotationXTo(0);
      card._tiltRotationYTo(0);
    }
  }, true);

  window.addEventListener('resize', () => {
    const cards = document.querySelectorAll('.product-card, .hero-image-card, .clinical-stat-card');
    cards.forEach(c => {
      c._tiltBounds = null;
      gsap.set(c, { rotationX: 0, rotationY: 0 });
    });
  });
}
