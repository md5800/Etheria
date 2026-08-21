// Parallax & Horizontal Storytelling: ÉTHERIA BOTANICALS
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initParallaxAnimations() {
  initMultiLayerParallax();
  initSvgPathParallax();
}

function initMultiLayerParallax() {
  const depthElements = document.querySelectorAll('[data-depth]');
  depthElements.forEach(el => {
    const depth = parseFloat(el.getAttribute('data-depth')) || 0.5;
    const yMovement = (1 - depth) * 160;

    gsap.to(el, {
      y: yMovement,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    });
  });
}

function initSvgPathParallax() {
  const paths = document.querySelectorAll('.parallax-path');
  paths.forEach((path, i) => {
    gsap.fromTo(path,
      { strokeDasharray: '16 8', strokeDashoffset: 250 * (i + 1) },
      {
        strokeDashoffset: 0,
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5
        }
      }
    );
  });
}
