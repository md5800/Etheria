// Cart Drawer Component: ÉTHERIA BOTANICALS
import { cartStore } from '../store/cartStore.js';

export function initCartDrawer() {
  const backdrop = document.querySelector('#cart-drawer-backdrop');
  const drawer = document.querySelector('#cart-drawer');
  const closeBtn = document.querySelector('#cart-close-btn');
  const cartToggleBtns = document.querySelectorAll('.cart-toggle-btn');

  function openCart() {
    backdrop?.classList.add('active');
    drawer?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    backdrop?.classList.remove('active');
    drawer?.classList.remove('active');
    document.body.style.overflow = '';
  }

  cartToggleBtns.forEach(btn => btn.addEventListener('click', openCart));
  closeBtn?.addEventListener('click', closeCart);
  backdrop?.addEventListener('click', (e) => {
    if (e.target === backdrop) closeCart();
  });

  // Wire up Promo Code Button
  const applyPromoBtn = document.querySelector('#apply-promo-btn');
  const promoInput = document.querySelector('#promo-input');
  applyPromoBtn?.addEventListener('click', () => {
    const code = promoInput?.value;
    const res = cartStore.applyPromoCode(code);
    if (res.success) {
      alert(res.message);
    } else {
      alert('Invalid promo code. Try ÉTHERIA10 or ROUTINE15');
    }
  });

  // Wire up Checkout Button
  const checkoutBtn = document.querySelector('#checkout-btn');
  checkoutBtn?.addEventListener('click', () => {
    const state = cartStore.getState();
    if (state.itemCount === 0) {
      alert('Your cart is empty. Please add a product to proceed to checkout.');
    } else {
      window.location.href = '/checkout.html';
    }
  });

  // Subscribe to cart store updates
  cartStore.subscribe(renderCartUI);
  renderCartUI(cartStore.getState());
}

export function renderCartUI(state) {
  // Update navbar badge counts
  const badgeCounts = document.querySelectorAll('.cart-badge-count');
  badgeCounts.forEach(el => {
    el.textContent = state.itemCount;
    el.style.display = state.itemCount > 0 ? 'flex' : 'none';
  });

  // Update Free Shipping Progress Bar
  const freeShippingText = document.querySelector('#free-shipping-text');
  const shippingProgressFill = document.querySelector('#shipping-progress-fill');

  if (freeShippingText && shippingProgressFill) {
    if (state.amountNeededForFreeShipping <= 0) {
      freeShippingText.innerHTML = '🎉 You unlocked <strong>FREE Worldwide Express Shipping</strong>!';
      shippingProgressFill.style.width = '100%';
    } else {
      freeShippingText.innerHTML = `Add <strong>$${state.amountNeededForFreeShipping.toFixed(2)}</strong> more for FREE Express Shipping!`;
      shippingProgressFill.style.width = `${state.shippingProgressPercent}%`;
    }
  }

  // Render Items List
  const itemsContainer = document.querySelector('#cart-items-body');
  if (itemsContainer) {
    if (state.items.length === 0) {
      itemsContainer.innerHTML = `
        <div style="text-align: center; padding: 4rem 1rem;">
          <svg style="width: 48px; height: 48px; color: var(--text-muted); margin-bottom: 1rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
          </svg>
          <p style="font-size: 1.1rem; color: var(--text-primary); margin-bottom: 0.5rem;">Your ritual cart is empty</p>
          <p style="font-size: 0.9rem;">Discover cellular botanical elixirs to begin your ritual.</p>
        </div>
      `;
    } else {
      itemsContainer.innerHTML = state.items.map(item => `
        <div class="cart-item-row" data-id="${item.productId}" data-size="${item.sizeLabel}">
          <img src="${item.product?.heroImage || '/assets/products/product_serum_hero.jpg'}" alt="${item.product?.name}" class="cart-item-img" />
          <div class="cart-item-details">
            <h4 class="cart-item-title">${item.product?.name || 'Skincare Product'}</h4>
            <div class="cart-item-size">Size: ${item.sizeLabel} • $${item.unitPrice}</div>
            <div class="cart-item-controls">
              <div class="qty-btn-group">
                <button class="qty-btn qty-minus" aria-label="Decrease quantity">-</button>
                <span class="qty-count">${item.quantity}</span>
                <button class="qty-btn qty-plus" aria-label="Increase quantity">+</button>
              </div>
              <button class="remove-item-btn">Remove</button>
            </div>
          </div>
        </div>
      `).join('');

      // Add item event listeners
      itemsContainer.querySelectorAll('.cart-item-row').forEach(row => {
        const pId = row.getAttribute('data-id');
        const pSize = row.getAttribute('data-size');

        row.querySelector('.qty-minus')?.addEventListener('click', () => {
          cartStore.updateQuantity(pId, pSize, -1);
        });

        row.querySelector('.qty-plus')?.addEventListener('click', () => {
          cartStore.updateQuantity(pId, pSize, 1);
        });

        row.querySelector('.remove-item-btn')?.addEventListener('click', () => {
          cartStore.removeItem(pId, pSize);
        });
      });
    }
  }

  // Update Summary Rows
  const subtotalEl = document.querySelector('#cart-subtotal');
  const discountRow = document.querySelector('#cart-discount-row');
  const discountEl = document.querySelector('#cart-discount');
  const totalEl = document.querySelector('#cart-total');

  if (subtotalEl) subtotalEl.textContent = `$${state.subtotal.toFixed(2)}`;
  if (totalEl) totalEl.textContent = `$${state.total.toFixed(2)}`;

  if (discountRow && discountEl) {
    if (state.discountAmount > 0) {
      discountRow.style.display = 'flex';
      discountEl.textContent = `-$${state.discountAmount.toFixed(2)} (${state.appliedPromo.code})`;
    } else {
      discountRow.style.display = 'none';
    }
  }
}
