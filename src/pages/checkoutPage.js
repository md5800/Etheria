// Checkout Page Controller: ÉTHERIA BOTANICALS
import { cartStore } from '../store/cartStore.js';
import { STORAGE_KEYS, getStored, setStored } from '../store/storageManager.js';
import { initCommonHeader, showToast } from '../components/commonHeader.js';

document.addEventListener('DOMContentLoaded', () => {
  initCommonHeader();
  initCheckoutPage();
});

function initCheckoutPage() {
  const cartState = cartStore.getState();

  // Redirect to cart if empty
  if (cartState.itemCount === 0) {
    alert('Your cart is empty. Please add products before checking out.');
    window.location.href = '/cart.html';
    return;
  }

  const form = document.querySelector('#checkout-form');
  const itemsContainer = document.querySelector('#checkout-summary-items');
  const subtotalEl = document.querySelector('#checkout-subtotal');
  const discountRow = document.querySelector('#checkout-discount-row');
  const discountEl = document.querySelector('#checkout-discount');
  const shippingFeeEl = document.querySelector('#checkout-shipping');
  const totalEl = document.querySelector('#checkout-total');

  const shippingOptionCards = document.querySelectorAll('.shipping-option-card');
  const paymentTabBtns = document.querySelectorAll('.payment-tab-btn');
  const paymentTabPanels = document.querySelectorAll('.payment-tab-panel');

  let selectedShippingMethod = 'standard'; // 'standard' | 'express'
  let selectedPaymentMethod = 'card'; // 'card' | 'paypal' | 'applepay'

  // Render Order Summary Cards on Right Column
  function renderOrderSummary() {
    const state = cartStore.getState();

    if (itemsContainer) {
      itemsContainer.innerHTML = state.items.map(item => `
        <div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 1rem;">
          <img src="${item.product?.heroImage || '/assets/products/product_serum_hero.jpg'}" alt="${item.product?.name}" style="width: 54px; height: 60px; object-fit: cover; border-radius: var(--radius-sm); background: #f4f2ec;" />
          <div style="flex-grow: 1;">
            <div style="font-family: var(--font-serif); font-size: 1rem; font-weight: 500; color: var(--text-primary);">${item.product?.name}</div>
            <div style="font-size: 0.78rem; color: var(--text-muted);">Size: ${item.sizeLabel} • Qty: ${item.quantity}</div>
          </div>
          <div style="font-weight: 600; font-size: 0.95rem; color: var(--text-primary);">$${item.lineTotal.toFixed(2)}</div>
        </div>
      `).join('');
    }

    const baseShipping = selectedShippingMethod === 'express' ? 25 : (state.subtotal >= 150 ? 0 : 15);
    const finalTotal = state.total + baseShipping;

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
      shippingFeeEl.textContent = baseShipping === 0 ? 'FREE' : `$${baseShipping.toFixed(2)}`;
    }

    if (totalEl) totalEl.textContent = `$${finalTotal.toFixed(2)}`;
  }

  // Load Saved Drafts from LocalStorage
  function loadSavedDrafts() {
    const savedCustomer = getStored(STORAGE_KEYS.CUSTOMER, {});
    const savedShipping = getStored(STORAGE_KEYS.SHIPPING, {});

    if (savedCustomer.email && document.querySelector('#email')) {
      document.querySelector('#email').value = savedCustomer.email;
    }
    if (savedCustomer.phone && document.querySelector('#phone')) {
      document.querySelector('#phone').value = savedCustomer.phone;
    }

    if (savedShipping.firstName && document.querySelector('#firstName')) {
      document.querySelector('#firstName').value = savedShipping.firstName;
    }
    if (savedShipping.lastName && document.querySelector('#lastName')) {
      document.querySelector('#lastName').value = savedShipping.lastName;
    }
    if (savedShipping.address && document.querySelector('#address')) {
      document.querySelector('#address').value = savedShipping.address;
    }
    if (savedShipping.apartment && document.querySelector('#apartment')) {
      document.querySelector('#apartment').value = savedShipping.apartment;
    }
    if (savedShipping.city && document.querySelector('#city')) {
      document.querySelector('#city').value = savedShipping.city;
    }
    if (savedShipping.state && document.querySelector('#state')) {
      document.querySelector('#state').value = savedShipping.state;
    }
    if (savedShipping.postalCode && document.querySelector('#postalCode')) {
      document.querySelector('#postalCode').value = savedShipping.postalCode;
    }
    if (savedShipping.country && document.querySelector('#country')) {
      document.querySelector('#country').value = savedShipping.country;
    }
  }

  // Handle Shipping Method Selection
  shippingOptionCards.forEach(card => {
    card.addEventListener('click', () => {
      shippingOptionCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      selectedShippingMethod = card.getAttribute('data-method');
      renderOrderSummary();
    });
  });

  // Handle Payment Tab Selection
  paymentTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      paymentTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedPaymentMethod = btn.getAttribute('data-payment');

      paymentTabPanels.forEach(panel => {
        panel.style.display = panel.getAttribute('id') === `payment-panel-${selectedPaymentMethod}` ? 'block' : 'none';
      });
    });
  });

  // Form Validation & Submission
  form?.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    const fields = [
      { id: '#email', type: 'email' },
      { id: '#phone', type: 'text' },
      { id: '#firstName', type: 'text' },
      { id: '#lastName', type: 'text' },
      { id: '#address', type: 'text' },
      { id: '#city', type: 'text' },
      { id: '#state', type: 'text' },
      { id: '#postalCode', type: 'text' }
    ];

    fields.forEach(field => {
      const input = document.querySelector(field.id);
      if (!input) return;
      const val = input.value.trim();

      if (!val || (field.type === 'email' && !val.includes('@'))) {
        input.classList.add('invalid');
        isValid = false;
      } else {
        input.classList.remove('invalid');
      }
    });

    if (!isValid) {
      showToast('Please fill in all required contact & shipping fields.', '⚠️');
      return;
    }

    // Prepare & save customer data to localStorage
    const customerObj = {
      email: document.querySelector('#email')?.value.trim(),
      phone: document.querySelector('#phone')?.value.trim()
    };

    const shippingObj = {
      firstName: document.querySelector('#firstName')?.value.trim(),
      lastName: document.querySelector('#lastName')?.value.trim(),
      address: document.querySelector('#address')?.value.trim(),
      apartment: document.querySelector('#apartment')?.value.trim() || '',
      city: document.querySelector('#city')?.value.trim(),
      state: document.querySelector('#state')?.value.trim(),
      postalCode: document.querySelector('#postalCode')?.value.trim(),
      country: document.querySelector('#country')?.value || 'United States',
      method: selectedShippingMethod
    };

    // Masked Payment Info (Never store real card credentials!)
    let paymentSummary = 'Credit Card';
    if (selectedPaymentMethod === 'card') {
      const cardNumber = document.querySelector('#cardNumber')?.value.replace(/\s+/g, '') || '4242424242424242';
      const last4 = cardNumber.slice(-4) || '4242';
      paymentSummary = `Credit Card (ending in •••• ${last4})`;
    } else if (selectedPaymentMethod === 'paypal') {
      paymentSummary = 'PayPal Express Checkout';
    } else if (selectedPaymentMethod === 'applepay') {
      paymentSummary = 'Apple Pay';
    }

    const checkoutData = {
      customer: customerObj,
      shipping: shippingObj,
      paymentMethod: selectedPaymentMethod,
      paymentSummary
    };

    setStored(STORAGE_KEYS.CUSTOMER, customerObj);
    setStored(STORAGE_KEYS.SHIPPING, shippingObj);
    setStored(STORAGE_KEYS.CHECKOUT, checkoutData);

    // Proceed to Order Review Page
    window.location.href = '/order-review.html';
  });

  loadSavedDrafts();
  renderOrderSummary();
}
