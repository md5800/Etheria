// Navigation Animations: ÉTHERIA BOTANICALS
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initNavigationAnimations() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  // Scroll down header background morph
  ScrollTrigger.create({
    trigger: 'body',
    start: 'top -50px',
    onEnter: () => navbar.classList.add('scrolled'),
    onLeaveBack: () => navbar.classList.remove('scrolled')
  });

  // Active navigation link indicator on scroll
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  sections.forEach(section => {
    ScrollTrigger.create({
      trigger: section,
      start: 'top 40%',
      end: 'bottom 40%',
      onEnter: () => updateActiveLink(section.id, navLinks),
      onEnterBack: () => updateActiveLink(section.id, navLinks)
    });
  });

  // Mobile Navigation Drawer Toggle Handlers
  initMobileNavDrawer();
}

function updateActiveLink(id, links) {
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === `#${id}`) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

function initMobileNavDrawer() {
  const toggleBtn = document.querySelector('#mobile-menu-toggle');
  const closeBtn = document.querySelector('#mobile-nav-close');
  const backdrop = document.querySelector('#mobile-nav-backdrop');
  const drawer = document.querySelector('#mobile-nav-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !drawer) return;

  function openMobileNav() {
    backdrop?.classList.add('active');
    drawer?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    backdrop?.classList.remove('active');
    drawer?.classList.remove('active');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', openMobileNav);
  closeBtn?.addEventListener('click', closeMobileNav);
  backdrop?.addEventListener('click', closeMobileNav);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });
}
