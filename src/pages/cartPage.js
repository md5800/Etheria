// Cart Page Controller: ÉTHERIA BOTANICALS
import { cartStore } from '../store/cartStore.js';
import { initCommonHeader, showToast } from '../components/commonHeader.js';

document.addEventListener('DOMContentLoaded', () => {
  initCommonHeader();
  initCartPage();
});

function initCartPage() {
  const tableBody = document.querySelector('#cart-page-items-body');
  const emptyState = document.querySelector('#cart-empty-state');
  const cartContentArea = document.querySelector('#cart-content-area');

  const subtotalEl = document.querySelector('#cart-page-subtotal');
  const discountRow = document.querySelector('#cart-page-discount-row');
  const discountEl = document.querySelector('#cart-page-discount');
  const shippingFeeEl = document.querySelector('#cart-page-shipping');
  const totalEl = document.querySelector('#cart-page-total');
  const freeShippingText = document.querySelector('#cart-page-free-shipping-text');
  const freeShippingFill = document.querySelector('#cart-page-free-shipping-fill');

  const promoInput = document.querySelector('#cart-page-promo-input');
  const applyPromoBtn = document.querySelector('#cart-page-apply-promo');

  const proceedBtn = document.querySelector('#cart-proceed-checkout-btn');

  function renderPage(state) {
    if (state.itemCount === 0) {
      if (emptyState) emptyState.style.display = 'block';
      if (cartContentArea) cartContentArea.style.display = 'none';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';
    if (cartContentArea) cartContentArea.style.display = 'grid';

    // Free Shipping Progress
    if (freeShippingText && freeShippingFill) {
      if (state.amountNeededForFreeShipping <= 0) {
        freeShippingText.innerHTML = '🎉 You unlocked <strong>FREE Express Shipping</strong>!';
        freeShippingFill.style.width = '100%';
      } else {
        freeShippingText.innerHTML = `Add <strong>$${state.amountNeededForFreeShipping.toFixed(2)}</strong> more to unlock FREE Express Shipping!`;
        freeShippingFill.style.width = `${state.shippingProgressPercent}%`;
      }
    }

    // Render Table Items
    if (tableBody) {
      tableBody.innerHTML = state.items.map(item => `
        <tr data-id="${item.productId}" data-size="${item.sizeLabel}">
          <td>
            <div class="cart-product-cell">
              <a href="/product-detail.html?id=${item.productId}">
                <img src="${item.product?.heroImage || '/assets/products/product_serum_hero.jpg'}" alt="${item.product?.name}" class="cart-product-img" />
              </a>
              <div>
                <h3 class="cart-product-title">
                  <a href="/product-detail.html?id=${item.productId}">${item.product?.name || 'Skincare Formulation'}</a>
                </h3>
                <div class="cart-product-size">Size: ${item.sizeLabel} • $${item.unitPrice}</div>
              </div>
            </div>
          </td>
          <td>
            <div class="detail-qty-stepper" style="display: inline-flex;">
              <button class="detail-qty-btn qty-minus">&minus;</button>
              <span class="detail-qty-val">${item.quantity}</span>
              <button class="detail-qty-btn qty-plus">&plus;</button>
            </div>
          </td>
          <td>
            <strong style="font-size: 1.1rem; color: var(--text-primary);">$${item.lineTotal.toFixed(2)}</strong>
          </td>
          <td style="text-align: right;">
            <button class="remove-item-btn" style="color: #c0392b; font-size: 0.85rem; cursor: pointer;">Remove</button>
          </td>
        </tr>
      `).join('');

      // Add Row Listeners
      tableBody.querySelectorAll('tr').forEach(row => {
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
          showToast('Item removed from cart', '🗑️');
        });
      });
    }

    // Totals Breakdown
    const shippingCost = state.total >= 150 ? 0 : 15;
    const finalTotal = state.total + shippingCost;

    if (subtotalEl) subtotalEl.textContent = `$${state.subtotal.toFixed(2)}`;

    if (discountRow && discountEl) {
      if (state.discountAmount > 0) {
        discountRow.style.display = 'flex';
        discountEl.textContent = `-$${state.discountAmount.toFixed(2)} (${state.appliedPromo.code})`;
      } else {
        discountRow.style.display = 'none';
      }
    }

    if (shippingFeeEl) {
      shippingFeeEl.textContent = shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`;
    }

    if (totalEl) totalEl.textContent = `$${finalTotal.toFixed(2)}`;
  }

  // Promo Code Button
  applyPromoBtn?.addEventListener('click', () => {
    const code = promoInput?.value;
    const res = cartStore.applyPromoCode(code);
    if (res.success) {
      showToast(res.message, '✨');
    } else {
      alert('Invalid promo code. Try ÉTHERIA10 or ROUTINE15');
    }
  });

  // Proceed to Checkout Button
  proceedBtn?.addEventListener('click', () => {
    const state = cartStore.getState();
    if (state.itemCount === 0) {
      alert('Your cart is empty.');
    } else {
      window.location.href = '/checkout.html';
    }
  });

  cartStore.subscribe(renderPage);
  renderPage(cartStore.getState());
}
