// Master Scroll Animations Orchestrator: ÉTHERIA BOTANICALS
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { initLoaderAnimation } from './loaderAnimations.js';
import { initHeroAnimations } from './heroAnimations.js';
import { initProductAnimations } from './productAnimations.js';
import { initRoutineStoryAnimations } from './routineStoryAnimations.js';
import { initTextAnimations } from './textAnimations.js';
import { initParallaxAnimations } from './parallaxAnimations.js';
import { initMouseAnimations } from './mouseAnimations.js';
import { initNavigationAnimations } from './navigationAnimations.js';
import { initNewSectionsAnimations } from './newSectionsAnimations.js';

gsap.registerPlugin(ScrollTrigger);

export function initMasterScrollAnimations() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    console.log('prefers-reduced-motion active: Using static accessible layout.');
    initReducedMotionFallback();
    return;
  }

  // 1. Run loader animation first
  initLoaderAnimation(() => {
    // 2. Setup responsive matchMedia timelines after loader completes
    ScrollTrigger.matchMedia({
      // Desktop (>= 992px)
      "(min-width: 992px)": function() {
        initHeroAnimations();
        initProductAnimations();
        initRoutineStoryAnimations();
        initTextAnimations();
        initParallaxAnimations();
        initMouseAnimations();
        initNavigationAnimations();
        initNewSectionsAnimations();
      },

      // Mobile / Tablet (< 992px)
      "(max-width: 991px)": function() {
        initHeroAnimations();
        initTextAnimations();
        initNavigationAnimations();
        initNewSectionsAnimations();
        // Simplified mobile parallax without heavy pinning — same simple reveal also covers the
        // ritual steps, which are pinned/crossfaded on desktop but just stack normally here.
        const cards = document.querySelectorAll('[data-speed], .ritual-step-block');
        cards.forEach(c => {
          gsap.from(c, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: c,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          });
        });
      }
    });
  });
}

function initReducedMotionFallback() {
  const elements = document.querySelectorAll('.hero-content, .hero-image-card, .section-header, .product-card, .signature-milestone-text, .ritual-step-block');
  elements.forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'none';
    el.style.clipPath = 'none';
  });

  // Only the first visual needs to be shown — the rest stay hidden to avoid stacking into an overlapping image mess
  const firstVisualImg = document.querySelector('.ritual-visual-img');
  if (firstVisualImg) firstVisualImg.style.opacity = '1';
}
