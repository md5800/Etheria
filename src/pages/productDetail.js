// Product Detail Page Controller: ÉTHERIA BOTANICALS
import { PRODUCTS, getProductById } from '../store/productCatalog.js';
import { cartStore } from '../store/cartStore.js';
import { initCommonHeader, showToast } from '../components/commonHeader.js';

document.addEventListener('DOMContentLoaded', () => {
  initCommonHeader();
  initProductDetailPage();
});

function initProductDetailPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id') || 'prod-01';
  const product = getProductById(productId) || PRODUCTS[0];

  let selectedSizeObj = product.sizes?.[0] || { label: '30ml', price: product.price };
  let currentQuantity = 1;

  // Render Product Information
  const breadcrumbProduct = document.querySelector('#breadcrumb-product-name');
  const catLabel = document.querySelector('#product-detail-cat');
  const titleEl = document.querySelector('#product-detail-title');
  const ratingCount = document.querySelector('#product-rating-count');
  const priceEl = document.querySelector('#product-detail-price');
  const descEl = document.querySelector('#product-detail-desc');
  const mainImg = document.querySelector('#gallery-main-img');
  const thumbsRow = document.querySelector('#gallery-thumbnails');
  const sizeContainer = document.querySelector('#size-selector-container');
  const ingredientsWrap = document.querySelector('#ingredient-pills-wrap');
  const benefitsWrap = document.querySelector('#benefits-list-wrap');
  const relatedGrid = document.querySelector('#related-products-grid');

  if (breadcrumbProduct) breadcrumbProduct.textContent = product.name;
  if (catLabel) catLabel.textContent = product.categoryLabel;
  if (titleEl) titleEl.textContent = product.name;
  if (ratingCount) ratingCount.textContent = `${product.rating} ★ (${product.reviewsCount} Reviews)`;
  if (priceEl) priceEl.textContent = `$${selectedSizeObj.price}`;
  if (descEl) descEl.textContent = product.description;

  // Main Image Gallery Setup
  if (mainImg) {
    mainImg.src = product.heroImage;
    mainImg.alt = product.name;
  }

  if (thumbsRow) {
    const images = [product.heroImage, product.secondaryImage].filter(Boolean);
    thumbsRow.innerHTML = images.map((imgUrl, i) => `
      <img src="${imgUrl}" alt="Thumbnail ${i + 1}" class="thumb-img ${i === 0 ? 'active' : ''}" data-src="${imgUrl}" />
    `).join('');

    thumbsRow.querySelectorAll('.thumb-img').forEach(thumb => {
      thumb.addEventListener('click', () => {
        thumbsRow.querySelectorAll('.thumb-img').forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        if (mainImg) mainImg.src = thumb.getAttribute('data-src');
      });
    });
  }

  // Size Selector Pills
  if (sizeContainer && product.sizes) {
    sizeContainer.innerHTML = product.sizes.map((s, i) => `
      <button class="size-pill ${i === 0 ? 'active' : ''}" data-label="${s.label}" data-price="${s.price}">
        ${s.label} — $${s.price}
      </button>
    `).join('');

    sizeContainer.querySelectorAll('.size-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        sizeContainer.querySelectorAll('.size-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const label = pill.getAttribute('data-label');
        const price = parseFloat(pill.getAttribute('data-price'));
        selectedSizeObj = { label, price };
        if (priceEl) priceEl.textContent = `$${price}`;
      });
    });
  }

  // Quantity Stepper
  const qtyMinus = document.querySelector('#detail-qty-minus');
  const qtyPlus = document.querySelector('#detail-qty-plus');
  const qtyVal = document.querySelector('#detail-qty-val');

  qtyMinus?.addEventListener('click', () => {
    if (currentQuantity > 1) {
      currentQuantity--;
      if (qtyVal) qtyVal.textContent = currentQuantity;
    }
  });

  qtyPlus?.addEventListener('click', () => {
    currentQuantity++;
    if (qtyVal) qtyVal.textContent = currentQuantity;
  });

  // Action Buttons
  const addToCartBtn = document.querySelector('#add-to-cart-btn');
  const buyNowBtn = document.querySelector('#buy-now-btn');

  addToCartBtn?.addEventListener('click', () => {
    cartStore.addItem(product.id, selectedSizeObj.label, currentQuantity);
    showToast(`Added ${currentQuantity}x ${product.name} (${selectedSizeObj.label}) to cart!`, '🌿');
  });

  buyNowBtn?.addEventListener('click', () => {
    cartStore.addItem(product.id, selectedSizeObj.label, currentQuantity);
    window.location.href = '/checkout.html';
  });

  // Ingredients Badges
  if (ingredientsWrap && product.ingredients) {
    ingredientsWrap.innerHTML = product.ingredients.map(ing => `
      <span class="ingr-badge">🌿 ${ing}</span>
    `).join('');
  }

  // Benefits List
  if (benefitsWrap && product.benefits) {
    benefitsWrap.innerHTML = product.benefits.map(b => `
      <li style="margin-bottom: 0.5rem; font-size: 0.95rem; color: var(--text-primary);">${b}</li>
    `).join('');
  }

  // Accordion Toggle Behavior
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      item.classList.toggle('active');
    });
  });

  // Related Products Grid
  if (relatedGrid) {
    const related = PRODUCTS.filter(p => p.id !== product.id).slice(0, 3);
    relatedGrid.innerHTML = related.map(rel => `
      <div class="product-card">
        <div class="product-card-image-wrap">
          <a href="/product-detail.html?id=${rel.id}">
            <img src="${rel.heroImage}" alt="${rel.name}" loading="lazy" />
          </a>
        </div>
        <div class="product-info">
          <div class="product-category">${rel.categoryLabel}</div>
          <h3 class="product-title">
            <a href="/product-detail.html?id=${rel.id}">${rel.name}</a>
          </h3>
          <div class="product-meta-row">
            <span class="product-price">$${rel.price}</span>
            <a href="/product-detail.html?id=${rel.id}" class="btn-outline" style="padding: 0.5rem 1rem; font-size: 0.75rem;">View Formulation</a>
          </div>
        </div>
      </div>
    `).join('');
  }
}
