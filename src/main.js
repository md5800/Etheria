// Main Application Entry Point: ÉTHERIA BOTANICALS
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { PRODUCTS, filterProducts } from './store/productCatalog.js';
import { cartStore } from './store/cartStore.js';
import { initCartDrawer } from './components/cartDrawer.js';
import { initQuickViewModal, openQuickViewModal } from './components/quickViewModal.js';
import { initRoutineQuiz } from './components/routineQuiz.js';
import { initMasterScrollAnimations } from './animations/scrollAnimations.js';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance = null;

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lenis Smooth Scrolling synchronized with GSAP Ticker
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Matches the ScrollTrigger.matchMedia desktop breakpoint in scrollAnimations.js —
  // smooth scroll and the pinned/parallax timelines must agree on which layout is active.
  if (!prefersReducedMotion && window.innerWidth >= 992) {
    lenisInstance = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5
    });

    // Synchronize Lenis scroll updates with ScrollTrigger
    lenisInstance.on('scroll', ScrollTrigger.update);

    // Drive Lenis inside GSAP's single ticker loop for perfect frame sync
    gsap.ticker.add((time) => {
      lenisInstance.raf(time * 1000);
    });

    // Prevent lag smoothing jump when tab regains focus
    gsap.ticker.lagSmoothing(0);
  }

  // 2. Render Product Catalog Grid
  renderProductGrid(PRODUCTS);

  // 3. Category Filter Handlers
  initCategoryFilters();

  // 4. Initialize UI Components
  initCartDrawer();
  initQuickViewModal();
  initRoutineQuiz();

  // 5. Initialize GSAP 3 + ScrollTrigger Animation Architecture
  initMasterScrollAnimations();

  // 6. Refresh ScrollTrigger after font & image layout stabilization
  if (document.fonts) {
    document.fonts.ready.then(() => {
      ScrollTrigger.refresh();
    });
  }

  window.addEventListener('load', () => {
    ScrollTrigger.refresh();
  });
});

function renderProductGrid(products) {
  const container = document.querySelector('#product-grid-container');
  if (!container) return;

  if (products.length === 0) {
    container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; padding: 3rem;">No products found in this category.</p>`;
    return;
  }

  container.innerHTML = products.map(product => `
    <div class="product-card" data-id="${product.id}">
      <div class="product-card-image-wrap">
        <a href="/product-detail.html?id=${product.id}">
          <img src="${product.heroImage}" alt="${product.name}" loading="lazy" decoding="async" />
        </a>
        <button class="product-quick-btn" data-id="${product.id}">QUICK VIEW</button>
      </div>

      <div class="product-info">
        <span class="product-category">${product.categoryLabel}</span>
        <h3 class="product-title">
          <a href="/product-detail.html?id=${product.id}">${product.name}</a>
        </h3>
        <p class="product-tagline">${product.tagline}</p>

        <div class="product-meta-row">
          <span class="product-price">$${product.price}.00</span>
          <button class="add-cart-btn" data-id="${product.id}">ADD TO RITUAL</button>
        </div>
      </div>
    </div>
  `).join('');

  // Event Listeners for Quick View and Add to Cart
  container.querySelectorAll('.product-quick-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const pId = btn.getAttribute('data-id');
      openQuickViewModal(pId);
    });
  });

  container.querySelectorAll('.add-cart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const pId = btn.getAttribute('data-id');
      cartStore.addItem(pId, '30ml', 1);

      // Open Cart Drawer for user feedback
      document.querySelector('#cart-drawer-backdrop')?.classList.add('active');
      document.querySelector('#cart-drawer')?.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Refresh ScrollTrigger after category grid DOM changes
  setTimeout(() => ScrollTrigger.refresh(), 50);
}

function initCategoryFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-category');
      const filtered = filterProducts(category);
      renderProductGrid(filtered);
    });
  });
}
