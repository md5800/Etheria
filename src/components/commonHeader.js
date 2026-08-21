// Shared Header Controller for Inner Pages: ÉTHERIA BOTANICALS
import { cartStore } from '../store/cartStore.js';
import { initCartDrawer } from './cartDrawer.js';
import { initMouseAnimations } from '../animations/mouseAnimations.js';

export function initCommonHeader() {
  // Initialize luxury custom cursor & magnetic button animations on inner pages
  initMouseAnimations();

  // Wire up mobile menu toggle
  const mobileToggle = document.querySelector('#mobile-menu-toggle');
  const mobileClose = document.querySelector('#mobile-nav-close');
  const mobileBackdrop = document.querySelector('#mobile-nav-backdrop');
  const mobileDrawer = document.querySelector('#mobile-nav-drawer');

  function openMobileNav() {
    mobileBackdrop?.classList.add('active');
    mobileDrawer?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    mobileBackdrop?.classList.remove('active');
    mobileDrawer?.classList.remove('active');
    document.body.style.overflow = '';
  }

  mobileToggle?.addEventListener('click', openMobileNav);
  mobileClose?.addEventListener('click', closeMobileNav);
  mobileBackdrop?.addEventListener('click', closeMobileNav);

  // Initialize cart drawer & update badge counts
  initCartDrawer();

  // Set active nav link based on current page pathname
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && currentPath.includes(href) && href !== '#' && href !== '/') {
      link.classList.add('active');
    }
  });

  // Sticky Navbar Blur state
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  }, { passive: true });
}

export function showToast(message, icon = '✨') {
  let toast = document.querySelector('#etheria-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'etheria-toast';
    toast.className = 'etheria-toast';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <span class="etheria-toast-icon">${icon}</span>
    <span>${message}</span>
  `;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}
