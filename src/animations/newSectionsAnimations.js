// GSAP ScrollTrigger Animations for New Homepage Sections: ÉTHERIA BOTANICALS
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initNewSectionsAnimations() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  // 1. SECTION 1: BOTANICAL JOURNEY ANIMATIONS
  const journeySection = document.querySelector('#botanical-journey');
  if (journeySection) {
    const journeyImg = journeySection.querySelector('.journey-img');
    const journeyTitle = journeySection.querySelector('.journey-title');
    const journeyItems = journeySection.querySelectorAll('.journey-ingredient-item');
    const journeyRing = journeySection.querySelector('.journey-decor-ring');

    // Parallax & scale effect on botanical harvest image
    if (journeyImg) {
      gsap.fromTo(journeyImg, 
        { scale: 1.12, yPercent: -8 },
        {
          scale: 1.0,
          yPercent: 6,
          ease: 'none',
          scrollTrigger: {
            trigger: journeySection,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.7
          }
        }
      );
    }

    // Title reveal animation
    if (journeyTitle) {
      gsap.from(journeyTitle, {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: journeyTitle,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    }

    // Stagger reveal of ingredient cards
    if (journeyItems.length > 0) {
      gsap.from(journeyItems, {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.18,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.journey-ingredient-list',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    }

    // Rotating decorative ring
    if (journeyRing) {
      gsap.to(journeyRing, {
        rotation: 45,
        ease: 'none',
        scrollTrigger: {
          trigger: journeySection,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
    }
  }

  // 2. SECTION 2: THE ETHERIA RITUAL ANIMATIONS
  const ritualExpSection = document.querySelector('#etheria-ritual-experience');
  if (ritualExpSection) {
    const bgImg = ritualExpSection.querySelector('.etheria-ritual-img');
    const content = ritualExpSection.querySelector('.etheria-ritual-content');
    const progressFill = ritualExpSection.querySelector('#etheria-ritual-progress-fill');
    const steps = ritualExpSection.querySelectorAll('.progress-step');

    // Background image subtle zoom & drift (full-bleed 100% edge-to-edge)
    if (bgImg) {
      gsap.fromTo(bgImg,
        { scale: 1.14, yPercent: -4 },
        {
          scale: 1.0,
          yPercent: 4,
          ease: 'none',
          scrollTrigger: {
            trigger: ritualExpSection,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8
          }
        }
      );
    }

    // Content reveal with depth parallax
    if (content) {
      gsap.from(content, {
        y: 40,
        opacity: 0,
        duration: 1.0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: content,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    }

    // Scroll-driven progress fill bar
    if (progressFill && steps.length > 0) {
      gsap.to(progressFill, {
        width: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: ritualExpSection,
          start: 'top 70%',
          end: 'bottom 40%',
          scrub: 0.3,
          onUpdate: (self) => {
            const p = self.progress;
            const activeIndex = p < 0.35 ? 0 : p < 0.7 ? 1 : 2;
            steps.forEach((s, idx) => {
              s.classList.toggle('active', idx === activeIndex);
            });
          }
        }
      });
    }
  }
}
