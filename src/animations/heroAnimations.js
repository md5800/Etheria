// Hero Animations: ÉTHERIA BOTANICALS (Redesigned Campaign Hero)
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initHeroAnimations() {
  const heroSection = document.querySelector('#hero');
  if (!heroSection) return;

  // Check prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // 1. Entrance Animations
  const titleLines = document.querySelectorAll('.hero-title .title-line');

  if (prefersReducedMotion) {
    gsap.set(['.hero-eyebrow', titleLines, '.hero-divider-ornament', '.hero-description', '.hero-cta-group > *', '.benefit-item', '.hero-image-card', '.hero-foreground-bottle-card', '.hero-dark-info-panel', '.hero-diagnostic-badge', '.hero-ritual-play-btn'], {
      opacity: 1,
      y: 0,
      scale: 1
    });
    return;
  }

  tl.from('.hero-eyebrow', {
    y: 20,
    opacity: 0,
    duration: 0.8
  })
  .from(titleLines, {
    yPercent: 110,
    rotationX: -35,
    opacity: 0,
    duration: 1.2,
    stagger: 0.18,
    ease: 'power4.out'
  }, '-=0.6')
  .from('.hero-divider-ornament', {
    scaleX: 0,
    opacity: 0,
    duration: 0.6,
    transformOrigin: 'left center'
  }, '-=0.8')
  .from('.hero-description', {
    y: 25,
    opacity: 0,
    duration: 0.8
  }, '-=0.6')
  .fromTo('.hero-cta-group > *', {
    y: 20,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    stagger: 0.12,
    duration: 0.7,
    clearProps: 'transform,opacity'
  }, '-=0.5')
  .from('.hero-benefit-strip .benefit-item', {
    y: 20,
    opacity: 0,
    stagger: 0.1,
    duration: 0.6
  }, '-=0.4')
  .from('.hero-image-card', {
    scale: 0.88,
    opacity: 0,
    duration: 1.2,
    ease: 'power3.out'
  }, '-=1.2')
  .from('.hero-dark-info-panel', {
    x: -35,
    y: 20,
    opacity: 0,
    duration: 1.0,
    ease: 'power3.out'
  }, '-=0.9')
  .from('.hero-foreground-bottle-card', {
    y: 60,
    scale: 0.85,
    opacity: 0,
    duration: 1.1,
    ease: 'back.out(1.4)'
  }, '-=0.9')
  .fromTo('.hero-diagnostic-badge, .hero-ritual-play-btn', {
    scale: 0,
    opacity: 0
  }, {
    scale: 1,
    opacity: 1,
    stagger: 0.15,
    duration: 0.8,
    ease: 'back.out(1.7)',
    clearProps: 'transform,opacity'
  }, '-=0.6');

  // 2. ScrollTrigger Scrub Parallax Animations
  // Main lifestyle image scales down from 1.08 to 1.0 on scroll
  gsap.fromTo('.hero-image-card img', {
    scale: 1.08
  }, {
    scale: 1.0,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    }
  });

  // Foreground Product Bottle moves faster on scroll (depth 1.2)
  gsap.to('.hero-foreground-bottle-card', {
    y: -35,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    }
  });

  // Dark Info Panel moves opposing direction (depth 0.95)
  gsap.to('.hero-dark-info-panel', {
    y: 25,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    }
  });

  // Background SVG arch accent moves slowly
  gsap.to('.hero-bg-accent', {
    y: 45,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    }
  });

  // Hero Content subtle movement as page scrolls down
  gsap.to('.hero-content', {
    yPercent: -10,
    opacity: 0.3,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    }
  });
}
