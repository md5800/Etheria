// Thank You Page Controller: ÉTHERIA BOTANICALS
import { STORAGE_KEYS, getStored } from '../store/storageManager.js';
import { initCommonHeader } from '../components/commonHeader.js';

document.addEventListener('DOMContentLoaded', () => {
  initCommonHeader();
  initThankYouPage();
});

function initThankYouPage() {
  const latestOrder = getStored(STORAGE_KEYS.LATEST_ORDER, null);

  // If no order in storage, redirect to shop
  if (!latestOrder) {
    window.location.href = '/shop.html';
    return;
  }

  const {
    orderId,
    orderDate,
    deliveryEstimate,
    items,
    subtotal,
    discountAmount,
    appliedPromo,
    shippingCost,
    grandTotal,
    customer,
    shipping,
    paymentSummary
  } = latestOrder;

  // Render Elements
  const customerNameEl = document.querySelector('#thankyou-customer-name');
  const orderIdEl = document.querySelector('#thankyou-order-id');
  const orderDateEl = document.querySelector('#thankyou-order-date');
  const deliveryEstEl = document.querySelector('#thankyou-delivery-estimate');

  const customerSummaryEl = document.querySelector('#thankyou-customer-summary');
  const shippingSummaryEl = document.querySelector('#thankyou-shipping-summary');
  const paymentSummaryEl = document.querySelector('#thankyou-payment-summary');
  const itemsContainer = document.querySelector('#thankyou-items-container');

  const subtotalEl = document.querySelector('#thankyou-subtotal');
  const discountRow = document.querySelector('#thankyou-discount-row');
  const discountEl = document.querySelector('#thankyou-discount');
  const shippingFeeEl = document.querySelector('#thankyou-shipping');
  const totalEl = document.querySelector('#thankyou-total');

  const printBtn = document.querySelector('#print-receipt-btn');

  if (customerNameEl && shipping?.firstName) {
    customerNameEl.textContent = `Thank You for Your Order, ${shipping.firstName}!`;
  }

  if (orderIdEl) orderIdEl.textContent = orderId || '#ETH-894215';
  if (orderDateEl) orderDateEl.textContent = orderDate || 'Today';
  if (deliveryEstEl) deliveryEstEl.textContent = deliveryEstimate || '3-5 Business Days';

  if (customerSummaryEl && customer) {
    customerSummaryEl.innerHTML = `
      <div><strong>Email:</strong> ${customer.email}</div>
      <div><strong>Phone:</strong> ${customer.phone}</div>
    `;
  }

  if (shippingSummaryEl && shipping) {
    shippingSummaryEl.innerHTML = `
      <div><strong>Recipient:</strong> ${shipping.firstName} ${shipping.lastName}</div>
      <div><strong>Address:</strong> ${shipping.address}${shipping.apartment ? ', ' + shipping.apartment : ''}</div>
      <div>${shipping.city}, ${shipping.state} ${shipping.postalCode}, ${shipping.country}</div>
    `;
  }

  if (paymentSummaryEl) {
    paymentSummaryEl.innerHTML = `
      <div><strong>Paid via:</strong> ${paymentSummary || 'Credit Card'}</div>
    `;
  }

  // Items List
  if (itemsContainer && items) {
    itemsContainer.innerHTML = items.map(item => `
      <div style="display: flex; gap: 1rem; align-items: center; padding: 0.85rem 0; border-bottom: 1px solid var(--border-light);">
        <img src="${item.product?.heroImage || '/assets/products/product_serum_hero.jpg'}" alt="${item.product?.name}" style="width: 50px; height: 56px; object-fit: cover; border-radius: var(--radius-sm); background: #f4f2ec;" />
        <div style="flex-grow: 1; text-align: left;">
          <div style="font-family: var(--font-serif); font-size: 1.05rem; font-weight: 500; color: var(--text-primary);">${item.product?.name}</div>
          <div style="font-size: 0.8rem; color: var(--text-muted);">Size: ${item.sizeLabel} • Qty: ${item.quantity}</div>
        </div>
        <div style="font-weight: 600; font-size: 1rem; color: var(--text-primary);">$${(item.unitPrice * item.quantity).toFixed(2)}</div>
      </div>
    `).join('');
  }

  // Totals
  if (subtotalEl) subtotalEl.textContent = `$${(subtotal || 0).toFixed(2)}`;

  if (discountRow && discountEl) {
    if (discountAmount > 0) {
      discountRow.style.display = 'flex';
      discountEl.textContent = `-$${discountAmount.toFixed(2)} (${appliedPromo?.code || 'PROMO'})`;
    } else {
      discountRow.style.display = 'none';
    }
  }

  if (shippingFeeEl) {
    shippingFeeEl.textContent = (shippingCost === 0) ? 'FREE' : `$${(shippingCost || 15).toFixed(2)}`;
  }

  if (totalEl) totalEl.textContent = `$${(grandTotal || 0).toFixed(2)}`;

  // Print Receipt Button
  printBtn?.addEventListener('click', () => {
    window.print();
  });
}
