// Order Review Page Controller: ÉTHERIA BOTANICALS
import { cartStore } from '../store/cartStore.js';
import { STORAGE_KEYS, getStored, saveCompletedOrder } from '../store/storageManager.js';
import { initCommonHeader, showToast } from '../components/commonHeader.js';

document.addEventListener('DOMContentLoaded', () => {
  initCommonHeader();
  initOrderReviewPage();
});

function initOrderReviewPage() {
  const checkoutData = getStored(STORAGE_KEYS.CHECKOUT, null);
  const cartState = cartStore.getState();

  // If no checkout draft or empty cart, redirect back to checkout
  if (!checkoutData || cartState.itemCount === 0) {
    alert('Please enter your shipping and payment details before reviewing your order.');
    window.location.href = '/checkout.html';
    return;
  }

  const { customer, shipping, paymentSummary } = checkoutData;

  // Render Customer & Shipping Details
  const customerSummary = document.querySelector('#review-customer-summary');
  const shippingSummary = document.querySelector('#review-shipping-summary');
  const paymentSummaryEl = document.querySelector('#review-payment-summary');
  const itemsContainer = document.querySelector('#review-items-container');

  const subtotalEl = document.querySelector('#review-subtotal');
  const discountRow = document.querySelector('#review-discount-row');
  const discountEl = document.querySelector('#review-discount');
  const shippingFeeEl = document.querySelector('#review-shipping');
  const totalEl = document.querySelector('#review-total');

  const termsCheckbox = document.querySelector('#terms-checkbox');
  const placeOrderBtn = document.querySelector('#place-order-btn');

  if (customerSummary) {
    customerSummary.innerHTML = `
      <div><strong>Email:</strong> ${customer.email}</div>
      <div><strong>Phone:</strong> ${customer.phone}</div>
    `;
  }

  if (shippingSummary) {
    const methodTitle = shipping.method === 'express' ? 'Express Alpine Priority (1-2 Days)' : 'Standard Botanical Delivery (3-5 Days)';
    shippingSummary.innerHTML = `
      <div><strong>Recipient:</strong> ${shipping.firstName} ${shipping.lastName}</div>
      <div><strong>Address:</strong> ${shipping.address}${shipping.apartment ? ', ' + shipping.apartment : ''}</div>
      <div>${shipping.city}, ${shipping.state} ${shipping.postalCode}, ${shipping.country}</div>
      <div style="margin-top: 0.5rem; color: var(--accent-gold); font-size: 0.85rem;"><strong>Method:</strong> ${methodTitle}</div>
    `;
  }

  if (paymentSummaryEl) {
    paymentSummaryEl.innerHTML = `
      <div><strong>Payment Method:</strong> ${paymentSummary || 'Credit Card'}</div>
      <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.25rem;">Encrypted & Bio-Authenticity Verified</div>
    `;
  }

  // Itemized List
  if (itemsContainer) {
    itemsContainer.innerHTML = cartState.items.map(item => `
      <div style="display: flex; gap: 1.25rem; align-items: center; padding: 1rem 0; border-bottom: 1px solid var(--border-light);">
        <img src="${item.product?.heroImage || '/assets/products/product_serum_hero.jpg'}" alt="${item.product?.name}" style="width: 64px; height: 72px; object-fit: cover; border-radius: var(--radius-md); background: #f4f2ec;" />
        <div style="flex-grow: 1;">
          <h4 style="font-family: var(--font-serif); font-size: 1.1rem; color: var(--text-primary); margin-bottom: 0.2rem;">${item.product?.name}</h4>
          <div style="font-size: 0.825rem; color: var(--text-muted);">Size: ${item.sizeLabel} • Qty: ${item.quantity} × $${item.unitPrice}</div>
        </div>
        <div style="font-weight: 700; font-size: 1.05rem; color: var(--text-primary);">$${item.lineTotal.toFixed(2)}</div>
      </div>
    `).join('');
  }

  // Totals Breakdown
  const shippingCost = shipping.method === 'express' ? 25 : (cartState.subtotal >= 150 ? 0 : 15);
  const grandTotal = cartState.total + shippingCost;

  if (subtotalEl) subtotalEl.textContent = `$${cartState.subtotal.toFixed(2)}`;

  if (discountRow && discountEl) {
    if (cartState.discountAmount > 0) {
      discountRow.style.display = 'flex';
      discountEl.textContent = `-$${cartState.discountAmount.toFixed(2)} (${cartState.appliedPromo.code})`;
    } else {
      discountRow.style.display = 'none';
    }
  }

  if (shippingFeeEl) {
    shippingFeeEl.textContent = shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`;
  }

  if (totalEl) totalEl.textContent = `$${grandTotal.toFixed(2)}`;

  // Place Order Handler
  placeOrderBtn?.addEventListener('click', () => {
    if (termsCheckbox && !termsCheckbox.checked) {
      showToast('Please accept the Terms & Guarantee agreement to place your order.', '⚠️');
      return;
    }

    // Generate Order ID & Timestamps
    const orderId = `#ETH-${Math.floor(100000 + Math.random() * 900000)}`;
    const now = new Date();
    const orderDate = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    // Delivery Estimate Date
    const deliveryMin = new Date(now);
    deliveryMin.setDate(now.getDate() + (shipping.method === 'express' ? 2 : 4));
    const deliveryMax = new Date(now);
    deliveryMax.setDate(now.getDate() + (shipping.method === 'express' ? 3 : 6));
    const deliveryEstimate = `${deliveryMin.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${deliveryMax.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;

    const completedOrder = {
      orderId,
      orderDate,
      deliveryEstimate,
      items: cartState.items,
      subtotal: cartState.subtotal,
      discountAmount: cartState.discountAmount,
      appliedPromo: cartState.appliedPromo,
      shippingCost,
      grandTotal,
      customer,
      shipping,
      paymentSummary
    };

    // Save order & clear active cart in localStorage
    saveCompletedOrder(completedOrder);
    cartStore.items = [];
    cartStore.saveCartToStorage();

    // Redirect to Thank You Page
    window.location.href = '/thank-you.html';
  });
}
