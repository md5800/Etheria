// Text & Typography Animations: ÉTHERIA BOTANICALS
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initTextAnimations() {
  initBatchedMaskReveals();
  initBatchedListEntrances();
  initStatCounters();
}

function initBatchedMaskReveals() {
  // Batch text mask reveals to run in single trigger updates
  ScrollTrigger.batch('.text-mask-reveal', {
    start: 'top 88%',
    onEnter: (batch) => {
      gsap.fromTo(batch,
        {
          clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
          y: 35,
          opacity: 0
        },
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          overwrite: 'auto'
        }
      );
    },
    onLeaveBack: (batch) => {
      gsap.to(batch, { opacity: 0, y: 35, duration: 0.4 });
    }
  });
}

function initBatchedListEntrances() {
  ScrollTrigger.batch('.stagger-list', {
    start: 'top 85%',
    onEnter: (batch) => {
      batch.forEach(container => {
        gsap.from(container.children, {
          y: 25,
          opacity: 0,
          stagger: 0.12,
          duration: 0.7,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      });
    }
  });
}

function initStatCounters() {
  const statCards = document.querySelectorAll('.clinical-stat-card');
  statCards.forEach(card => {
    const numEl = card.querySelector('.stat-number');
    if (!numEl) return;

    const rawText = numEl.textContent.trim();
    const numericVal = parseInt(rawText, 10) || 0;
    const suffix = rawText.replace(/[0-9]/g, '');

    const counterObj = { val: 0 };

    ScrollTrigger.create({
      trigger: card,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(counterObj, {
          val: numericVal,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: () => {
            numEl.textContent = `${Math.floor(counterObj.val)}${suffix}`;
          }
        });
      }
    });
  });
}
