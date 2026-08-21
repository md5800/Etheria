// Quick View Modal Component: ÉTHERIA BOTANICALS
import { getProductById } from '../store/productCatalog.js';
import { cartStore } from '../store/cartStore.js';

export function initQuickViewModal() {
  const backdrop = document.querySelector('#quickview-backdrop') || document.querySelector('#quickview-modal-backdrop');
  const closeBtn = document.querySelector('#quickview-close-btn') || document.querySelector('#quickview-modal-close');

  function closeModal() {
    backdrop?.classList.remove('active');
    document.body.style.overflow = '';
  }

  closeBtn?.addEventListener('click', closeModal);
  backdrop?.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal();
  });
}

export function openQuickViewModal(productId) {
  const product = getProductById(productId);
  if (!product) return;

  const backdrop = document.querySelector('#quickview-backdrop') || document.querySelector('#quickview-modal-backdrop');
  const container = document.querySelector('#quickview-content') || document.querySelector('#quickview-modal-content');
  if (!backdrop || !container) return;

  let selectedSize = product.sizes[0].label;
  let currentPrice = product.sizes[0].price;

  container.innerHTML = `
    <div class="quickview-grid">
      <div style="aspect-ratio: 4/5; border-radius: var(--radius-md); overflow: hidden; background: #f4f2ec;">
        <img src="${product.heroImage}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;" />
      </div>
      <div>
        <div style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.15em; color: var(--accent-gold); font-weight: 600; margin-bottom: 0.5rem;">
          ${product.categoryLabel}
        </div>
        <h2 style="font-size: 2.2rem; margin-bottom: 0.75rem;">${product.name}</h2>
        <div style="font-size: 1.5rem; font-weight: 600; color: var(--text-primary); margin-bottom: 1.25rem;" id="qv-price-display">
          $${currentPrice}.00
        </div>
        <p style="margin-bottom: 1.5rem; line-height: 1.7;">${product.description}</p>
        
        <!-- Size Selector -->
        <div style="margin-bottom: 1.5rem;">
          <div style="font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem;">
            Select Size:
          </div>
          <div style="display: flex; gap: 0.75rem;" id="qv-size-group">
            ${product.sizes.map((s, idx) => `
              <button class="size-pill-btn ${idx === 0 ? 'active' : ''}" data-size="${s.label}" data-price="${s.price}" style="padding: 0.5rem 1.25rem; border-radius: var(--radius-full); border: 1px solid ${idx === 0 ? 'var(--text-primary)' : 'var(--border-light)'}; background: ${idx === 0 ? 'var(--text-primary)' : 'transparent'}; color: ${idx === 0 ? 'var(--bg-primary)' : 'var(--text-primary)'}; font-size: 0.85rem; font-weight: 600;">
                ${s.label}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Key Ingredients -->
        <div style="margin-bottom: 2rem;">
          <div style="font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem;">
            Active Cellular Ingredients:
          </div>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            ${product.ingredients.map(ing => `
              <span style="font-size: 0.8rem; padding: 0.35rem 0.75rem; border-radius: var(--radius-sm); background: rgba(197, 160, 89, 0.12); color: #8A6726;">
                ${ing}
              </span>
            `).join('')}
          </div>
        </div>

        <!-- Add to Cart CTA -->
        <button class="btn-primary" id="qv-add-cart-cta" style="width: 100%; justify-content: center;">
          ADD TO RITUAL CART • $${currentPrice}
        </button>
      </div>
    </div>
  `;

  // Add event listeners inside modal
  const priceDisplay = container.querySelector('#qv-price-display');
  const addCta = container.querySelector('#qv-add-cart-cta');
  const sizeBtns = container.querySelectorAll('.size-pill-btn');

  sizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sizeBtns.forEach(b => {
        b.style.background = 'transparent';
        b.style.color = 'var(--text-primary)';
        b.style.borderColor = 'var(--border-light)';
      });
      btn.style.background = 'var(--text-primary)';
      btn.style.color = 'var(--bg-primary)';
      btn.style.borderColor = 'var(--text-primary)';

      selectedSize = btn.getAttribute('data-size');
      currentPrice = parseInt(btn.getAttribute('data-price'), 10);
      priceDisplay.textContent = `$${currentPrice}.00`;
      addCta.textContent = `ADD TO RITUAL CART • $${currentPrice}`;
    });
  });

  addCta?.addEventListener('click', () => {
    cartStore.addItem(product.id, selectedSize, 1);
    backdrop?.classList.remove('active');
    document.body.style.overflow = '';
    
    // Auto-open cart drawer to provide instant visual feedback
    document.querySelector('#cart-drawer-backdrop')?.classList.add('active');
    document.querySelector('#cart-drawer')?.classList.add('active');
  });

  backdrop?.classList.add('active');
  document.body.style.overflow = 'hidden';
}
