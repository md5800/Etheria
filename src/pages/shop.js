// Shop Page Controller: ÉTHERIA BOTANICALS
import { PRODUCTS, filterProducts } from '../store/productCatalog.js';
import { cartStore } from '../store/cartStore.js';
import { initCommonHeader, showToast } from '../components/commonHeader.js';
import { openQuickViewModal, initQuickViewModal } from '../components/quickViewModal.js';

document.addEventListener('DOMContentLoaded', () => {
  initCommonHeader();
  initQuickViewModal();
  initShopPage();
});

function initShopPage() {
  const gridContainer = document.querySelector('#shop-product-grid');
  const filterBtns = document.querySelectorAll('.shop-filter-btn');
  const resultsCountEl = document.querySelector('#shop-results-count');

  let currentCategory = 'all';

  function renderProducts() {
    const products = filterProducts(currentCategory);

    if (resultsCountEl) {
      resultsCountEl.textContent = `Showing ${products.length} Cellular Formulations`;
    }

    if (!gridContainer) return;

    if (products.length === 0) {
      gridContainer.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem;">
          <p style="font-size: 1.2rem; color: var(--text-muted);">No products found in this category.</p>
        </div>
      `;
      return;
    }

    gridContainer.innerHTML = products.map(product => `
      <div class="product-card" data-id="${product.id}">
        <div class="product-card-image-wrap">
          <a href="/product-detail.html?id=${product.id}">
            <img src="${product.heroImage}" alt="${product.name}" loading="lazy" decoding="async" />
          </a>
          <button class="product-quick-btn" data-id="${product.id}">Quick View</button>
        </div>

        <div class="product-info">
          <div class="product-category">${product.categoryLabel}</div>
          <h3 class="product-title">
            <a href="/product-detail.html?id=${product.id}">${product.name}</a>
          </h3>
          <p class="product-tagline">${product.tagline}</p>

          <div class="product-meta-row">
            <span class="product-price">$${product.price}</span>
            <button class="add-cart-btn" data-id="${product.id}">+ Add to Cart</button>
          </div>
        </div>
      </div>
    `).join('');

    // Attach Event Listeners to cards
    gridContainer.querySelectorAll('.add-cart-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const pId = btn.getAttribute('data-id');
        const prod = PRODUCTS.find(p => p.id === pId);
        cartStore.addItem(pId, prod?.sizes?.[0]?.label || '30ml', 1);
        showToast(`Added ${prod?.name || 'Item'} to your ritual cart!`, '🛍️');
      });
    });

    gridContainer.querySelectorAll('.product-quick-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const pId = btn.getAttribute('data-id');
        openQuickViewModal(pId);
      });
    });
  }

  // Category Filters
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-category');
      renderProducts();
    });
  });

  // Initial Render
  renderProducts();
}
