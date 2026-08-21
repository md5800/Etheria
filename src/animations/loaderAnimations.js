// Loader Animations: ÉTHERIA BOTANICALS
import { gsap } from 'gsap';

export function initLoaderAnimation(onCompleteCallback) {
  const loader = document.querySelector('#cinematic-loader');
  const countEl = document.querySelector('#loader-count');
  const progressFill = document.querySelector('#loader-progress-fill');
  const logoMark = document.querySelector('#loader-logo-mark');

  if (!loader) {
    if (onCompleteCallback) onCompleteCallback();
    return;
  }

  const counterObj = { val: 0 };
  const tl = gsap.timeline({
    onComplete: () => {
      loader.classList.add('loaded');
      document.body.style.overflow = '';
      if (onCompleteCallback) onCompleteCallback();
    }
  });

  document.body.style.overflow = 'hidden';

  tl.to(counterObj, {
    val: 100,
    duration: 1.8,
    ease: 'power2.inOut',
    onUpdate: () => {
      const currentVal = Math.floor(counterObj.val);
      if (countEl) countEl.textContent = `${currentVal}%`;
      if (progressFill) progressFill.style.width = `${currentVal}%`;
    }
  })
  .fromTo(logoMark, 
    { scale: 0.8, opacity: 0, rotation: -20 },
    { scale: 1, opacity: 1, rotation: 0, duration: 1, ease: 'back.out(1.7)' },
    0.2
  )
  .to(loader, {
    yPercent: -100,
    duration: 1.2,
    ease: 'power4.inOut'
  }, '+=0.2');
}
