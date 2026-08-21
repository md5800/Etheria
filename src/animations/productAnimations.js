// Aura Cellular Renewal Serum Section Animations: ÉTHERIA BOTANICALS
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initProductAnimations() {
  const auraSection = document.querySelector('#signature-product-reveal');
  if (!auraSection) return;

  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Reduced motion fallback
  if (prefersReducedMotion) {
    gsap.set([
      '.aura-vertical-label',
      '.aura-image-card',
      '.aura-image-inner',
      '.aura-main-img',
      '.aura-decor-ring',
      '.aura-decor-dot',
      '.aura-diagnostic-badge',
      '.aura-eyebrow-row',
      '.aura-title .title-line',
      '.aura-description',
      '.aura-benefit-item',
      '.aura-cta-group > *',
      '.aura-info-bar'
    ], {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      rotation: 0,
      clipPath: 'inset(0% 0% 0% 0%)'
    });
    return;
  }

  // 1. LEFT IMAGE REVEAL (Mask/Clip-Path Unfold)
  const imageInner = auraSection.querySelector('.aura-image-inner');
  const mainImage = auraSection.querySelector('.aura-main-img');
  const imageCard = auraSection.querySelector('.aura-image-card');

  if (imageInner) {
    if (!isMobile) {
      gsap.fromTo(imageInner, {
        clipPath: 'inset(100% 0% 0% 0% round 260px 260px 20px 20px)'
      }, {
        clipPath: 'inset(0% 0% 0% 0% round 260px 260px 20px 20px)',
        duration: 1.4,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: auraSection,
          start: 'top 78%',
          toggleActions: 'play none none reverse'
        }
      });
    } else {
      gsap.set(imageInner, { clipPath: 'inset(0% 0% 0% 0%)' });
    }
  }

  // 2. SCRUB-BASED PARALLAX & DEPTH ANIMATION (Left Side)
  if (!isMobile) {
    // Container vertical parallax
    if (imageCard) {
      gsap.fromTo(imageCard, {
        yPercent: 7
      }, {
        yPercent: -7,
        ease: 'none',
        scrollTrigger: {
          trigger: auraSection,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2
        }
      });
    }

    // Photo inside scales from 1.08 down to 1.0 with depth shift
    if (mainImage) {
      gsap.fromTo(mainImage, {
        scale: 1.08,
        yPercent: 10
      }, {
        scale: 1.0,
        yPercent: -4,
        ease: 'none',
        scrollTrigger: {
          trigger: auraSection,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2
        }
      });
    }

    // Decorative Gold Ring Behind Image moves & rotates
    gsap.fromTo('.aura-decor-ring', {
      yPercent: -14,
      rotation: 0
    }, {
      yPercent: 14,
      rotation: 25,
      ease: 'none',
      scrollTrigger: {
        trigger: auraSection,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5
      }
    });

    // Diagnostic Badge counter-parallax & rotation
    gsap.fromTo('.aura-diagnostic-badge', {
      yPercent: 10,
      rotation: 0
    }, {
      yPercent: -10,
      rotation: -14,
      ease: 'none',
      scrollTrigger: {
        trigger: auraSection,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2
      }
    });

    // Small Gold Dot parallax
    gsap.fromTo('.aura-decor-dot', {
      yPercent: -20
    }, {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: auraSection,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5
      }
    });
  } else {
    // Subtle mobile scrub (no clipping or horizontal overflow)
    if (mainImage) {
      gsap.fromTo(mainImage, { scale: 1.04 }, {
        scale: 1.0,
        ease: 'none',
        scrollTrigger: {
          trigger: auraSection,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
    }
  }

  // 3. EDITORIAL REVEAL TIMELINE (Right Content & Badge Reveal)
  const titleLines = auraSection.querySelectorAll('.aura-title .title-line');

  const contentTl = gsap.timeline({
    scrollTrigger: {
      trigger: auraSection,
      start: 'top 72%',
      toggleActions: 'play none none reverse'
    }
  });

  contentTl
    .from('.aura-vertical-label', {
      y: 35,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out'
    })
    .from('.aura-eyebrow-row', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.7')
    .from(titleLines, {
      yPercent: 110,
      opacity: 0,
      duration: 1.1,
      stagger: 0.16,
      ease: 'power4.out'
    }, '-=0.5')
    .from('.aura-description', {
      y: 25,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.6')
    .from('.aura-diagnostic-badge', {
      scale: 0,
      opacity: 0,
      duration: 0.8,
      ease: 'back.out(1.7)',
      clearProps: 'transform,opacity'
    }, '-=0.6')
    .from('.aura-benefit-item', {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.12,
      ease: 'power3.out'
    }, '-=0.5')
    .fromTo('.aura-cta-group > *', {
      y: 20,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power3.out',
      clearProps: 'transform,opacity'
    }, '-=0.4')
    .from('.aura-info-bar', {
      y: 25,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.5');
}
