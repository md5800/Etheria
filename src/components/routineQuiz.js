// Routine Diagnostic Quiz Component: ÉTHERIA BOTANICALS
import { cartStore } from '../store/cartStore.js';

export function initRoutineQuiz() {
  const backdrop = document.querySelector('#routine-backdrop');
  const drawer = document.querySelector('#routine-drawer');
  const closeBtn = document.querySelector('#routine-close-btn');
  const quizTriggers = document.querySelectorAll('.routine-quiz-trigger');

  function openQuiz() {
    backdrop?.classList.add('active');
    drawer?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeQuiz() {
    backdrop?.classList.remove('active');
    drawer?.classList.remove('active');
    document.body.style.overflow = '';
  }

  quizTriggers.forEach(btn => btn.addEventListener('click', openQuiz));
  closeBtn?.addEventListener('click', closeQuiz);
  backdrop?.addEventListener('click', (e) => {
    if (e.target === backdrop) closeQuiz();
  });

  renderQuizStep(1);
}

function renderQuizStep(step) {
  const container = document.querySelector('#routine-quiz-content');
  if (!container) return;

  if (step === 1) {
    container.innerHTML = `
      <div style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.15em; color: var(--accent-gold); font-weight: 600; margin-bottom: 0.5rem;">
        Step 1 of 3 • Diagnostic Concern
      </div>
      <h3 style="font-size: 2rem; margin-bottom: 1rem;">What is your primary skin concern?</h3>
      <p style="margin-bottom: 2rem;">Our cellular algorithm will match active botanicals to your skin profile.</p>

      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <button class="quiz-option-btn" data-concern="anti-aging" style="padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-light); text-align: left; transition: var(--transition-smooth); background: #fff;">
          <strong style="display: block; font-size: 1.1rem; margin-bottom: 0.25rem;">Cellular Renewal & Elasticity</strong>
          <span style="font-size: 0.875rem; color: var(--text-muted);">Target fine lines, loss of firmness, and dull texture.</span>
        </button>
        <button class="quiz-option-btn" data-concern="hydration" style="padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-light); text-align: left; transition: var(--transition-smooth); background: #fff;">
          <strong style="display: block; font-size: 1.1rem; margin-bottom: 0.25rem;">Deep Lipid Hydration</strong>
          <span style="font-size: 0.875rem; color: var(--text-muted);">Replenish dry, tight skin with ceramide lipid matrices.</span>
        </button>
        <button class="quiz-option-btn" data-concern="radiance" style="padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-light); text-align: left; transition: var(--transition-smooth); background: #fff;">
          <strong style="display: block; font-size: 1.1rem; margin-bottom: 0.25rem;">Bio-Active Radiance & Tone</strong>
          <span style="font-size: 0.875rem; color: var(--text-muted);">Illuminate hyperpigmentation and reveal natural radiance.</span>
        </button>
      </div>
    `;

    container.querySelectorAll('.quiz-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        renderQuizStep(2);
      });
    });
  } else if (step === 2) {
    container.innerHTML = `
      <div style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.15em; color: var(--accent-gold); font-weight: 600; margin-bottom: 0.5rem;">
        Step 2 of 3 • Sensory Preference
      </div>
      <h3 style="font-size: 2rem; margin-bottom: 1rem;">What texture does your skin prefer?</h3>
      <p style="margin-bottom: 2rem;">Select your desired formulation weight for optimal absorption.</p>

      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <button class="quiz-option-btn" style="padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-light); text-align: left; background: #fff;">
          <strong style="display: block; font-size: 1.1rem; margin-bottom: 0.25rem;">Ultra-Light Concentrated Fluid</strong>
          <span style="font-size: 0.875rem; color: var(--text-muted);">Fast-absorbing serum & essence layer.</span>
        </button>
        <button class="quiz-option-btn" style="padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-light); text-align: left; background: #fff;">
          <strong style="display: block; font-size: 1.1rem; margin-bottom: 0.25rem;">Rich Velvet Cloud Emulsion</strong>
          <span style="font-size: 0.875rem; color: var(--text-muted);">Cushioning cream for long-lasting barrier comfort.</span>
        </button>
      </div>
    `;

    container.querySelectorAll('.quiz-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        renderQuizStep(3);
      });
    });
  } else if (step === 3) {
    container.innerHTML = `
      <div style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.15em; color: var(--accent-gold); font-weight: 600; margin-bottom: 0.5rem;">
        Step 3 of 3 • Custom Routine Match
      </div>
      <h3 style="font-size: 2rem; margin-bottom: 0.75rem;">Your Bio-Active Ritual Bundle</h3>
      <p style="margin-bottom: 1.5rem;">Curated 3-step cellular routine matching your profile. <strong>Includes 15% Bundle Savings!</strong></p>

      <div style="background: var(--accent-light-gold); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-gold); margin-bottom: 1.5rem;">
        <div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 0.75rem;">
          <img src="/assets/products/product_serum_hero.jpg" style="width: 50px; height: 60px; object-fit: cover; border-radius: 4px;" />
          <div>
            <strong style="display: block; font-size: 0.95rem;">Step 1: Aura Cellular Renewal Serum</strong>
            <span style="font-size: 0.8rem; color: var(--text-muted);">Bio-Retinol & Alpine Rose</span>
          </div>
        </div>
        <div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 0.75rem;">
          <img src="/assets/products/product_cream_hero.jpg" style="width: 50px; height: 60px; object-fit: cover; border-radius: 4px;" />
          <div>
            <strong style="display: block; font-size: 0.95rem;">Step 2: Velvet Cloud Barrier Cream</strong>
            <span style="font-size: 0.8rem; color: var(--text-muted);">Ceramides & Squalane</span>
          </div>
        </div>
        <div style="display: flex; gap: 1rem; align-items: center;">
          <img src="/assets/products/product_oil_hero.jpg" style="width: 50px; height: 60px; object-fit: cover; border-radius: 4px;" />
          <div>
            <strong style="display: block; font-size: 0.95rem;">Step 3: Nectar Bio-Active Radiance Oil</strong>
            <span style="font-size: 0.8rem; color: var(--text-muted);">Cold-Pressed Marula</span>
          </div>
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; font-size: 1.2rem; font-weight: 700;">
        <span>Bundle Price (15% Off):</span>
        <span style="color: var(--accent-gold);">$323.00 <s style="font-size: 0.9rem; color: var(--text-muted);">$380.00</s></span>
      </div>

      <button class="btn-primary" id="add-routine-bundle-btn" style="width: 100%; justify-content: center;">
        ADD FULL RITUAL BUNDLE TO CART
      </button>
    `;

    container.querySelector('#add-routine-bundle-btn')?.addEventListener('click', () => {
      cartStore.addItem('prod-01', '30ml', 1);
      cartStore.addItem('prod-03', '50ml', 1);
      cartStore.addItem('prod-02', '30ml', 1);
      cartStore.applyPromoCode('ROUTINE15');

      document.querySelector('#routine-backdrop')?.classList.remove('active');
      document.querySelector('#routine-drawer')?.classList.remove('active');
      document.body.style.overflow = '';

      // Open Cart
      document.querySelector('#cart-drawer-backdrop')?.classList.add('active');
      document.querySelector('#cart-drawer')?.classList.add('active');
    });
  }
}
