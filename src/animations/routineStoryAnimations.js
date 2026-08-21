// The Ritual, In Motion — Cinematic Editorial Section: ÉTHERIA BOTANICALS
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initRoutineStoryAnimations() {
  // Pin the inner wrapper, never the semantic <section> — see productAnimations.js for why.
  const pinTarget = document.querySelector('#ritual-pin');
  if (!pinTarget) return;

  const stepBlocks = [...document.querySelectorAll('.ritual-step-block')];
  const visualImgs = [...document.querySelectorAll('.ritual-visual-img')];
  const dots = [...document.querySelectorAll('.ritual-dot')];
  const headline = document.querySelector('.ritual-headline');
  const supportCopy = document.querySelector('.ritual-support-copy');
  const decorRing = document.querySelector('.ritual-decor-ring');
  const decorLine = document.querySelector('.ritual-decor-line');
  const particle = document.querySelector('#horizontal-routine-section .ritual-particle');

  if (stepBlocks.length === 0 || visualImgs.length === 0) return;

  const stepCount = stepBlocks.length;

  // Text/image state is owned entirely by this timeline (no CSS transitions fighting the scrub)
  gsap.set(stepBlocks[0], { opacity: 1, y: 0 });
  gsap.set(stepBlocks.slice(1), { opacity: 0, y: 24 });
  gsap.set(visualImgs[0], { opacity: 1, scale: 1 });
  gsap.set(visualImgs.slice(1), { opacity: 0, scale: 1.08 });

  // Master Pinned ScrollTrigger Timeline — single source of truth for the whole sequence.
  // The main visual stays pinned in place for this entire span; only its internal state
  // (active image, headline/decor drift, step content) advances as the user scrolls.
  const pinnedTl = gsap.timeline({
    scrollTrigger: {
      trigger: pinTarget,
      start: 'top top',
      end: `+=${stepCount * 100}%`,
      pin: true,
      anticipatePin: 1,
      scrub: 0.8,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const activeIndex = Math.min(stepCount - 1, Math.floor(self.progress * stepCount));
        dots.forEach((dot, i) => dot.classList.toggle('active', i === activeIndex));
      }
    }
  });

  // The oversized headline drifts at a noticeably slower, smaller amplitude than the image —
  // it should read as sitting "behind" the motion, not racing it.
  if (headline) pinnedTl.to(headline, { yPercent: -2, ease: 'none', duration: stepCount }, 0);

  // Continuous image scale + parallax across the whole pin, independent of the per-step crossfade
  pinnedTl.to('.ritual-visual-frame', { scale: 1.04, ease: 'none', duration: stepCount }, 0);

  // Decorative gold elements drifting at three distinct speeds/directions for real depth
  if (decorRing) pinnedTl.to(decorRing, { y: 60, rotation: 15, ease: 'none', duration: stepCount }, 0);
  if (decorLine) pinnedTl.to(decorLine, { y: -40, ease: 'none', duration: stepCount }, 0);
  if (particle) pinnedTl.to(particle, { y: -70, rotation: -25, ease: 'none', duration: stepCount }, 0);

  // Supporting copy reveals once, early in the pin, ahead of the first step content
  if (supportCopy) {
    gsap.set(supportCopy, { opacity: 0, y: 16 });
    pinnedTl.to(supportCopy, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }, 0.05);
  }

  // Crossfade the step text + visual image together at each step boundary. The text handoff
  // stays short and mostly sequential (a wide overlap window reads as a confusing double
  // exposure for text); the image crossfade blends a little longer and carries a subtle
  // position shift alongside the scale, not just a plain fade.
  for (let i = 0; i < stepCount - 1; i++) {
    const boundary = i + 1;

    pinnedTl
      .to(stepBlocks[i], { opacity: 0, y: -24, duration: 0.22, ease: 'power2.inOut' }, boundary - 0.26)
      .to(stepBlocks[i + 1], { opacity: 1, y: 0, duration: 0.22, ease: 'power2.inOut' }, boundary - 0.06)
      .to(visualImgs[i], { opacity: 0, scale: 1.08, y: -18, duration: 0.32, ease: 'power2.inOut' }, boundary - 0.24)
      .fromTo(visualImgs[i + 1], { y: 18 }, { opacity: 1, scale: 1, y: 0, duration: 0.32, ease: 'power2.inOut' }, boundary - 0.1);
  }
}
