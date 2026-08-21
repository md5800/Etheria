import{f as p,P as g,c as f}from"./mouseAnimations-Q01e9Zsg.js";import{i as h,s as v}from"./commonHeader-Bs_qxFvO.js";import{i as y,o as $}from"./quickViewModal-gnaxsmC-.js";document.addEventListener("DOMContentLoaded",()=>{h(),y(),b()});function b(){const i=document.querySelector("#shop-product-grid"),d=document.querySelectorAll(".shop-filter-btn"),n=document.querySelector("#shop-results-count");let c="all";function s(){const e=p(c);if(n&&(n.textContent=`Showing ${e.length} Cellular Formulations`),!!i){if(e.length===0){i.innerHTML=`
        <div style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem;">
          <p style="font-size: 1.2rem; color: var(--text-muted);">No products found in this category.</p>
        </div>
      `;return}i.innerHTML=e.map(t=>`
      <div class="product-card" data-id="${t.id}">
        <div class="product-card-image-wrap">
          <a href="/product-detail.html?id=${t.id}">
            <img src="${t.heroImage}" alt="${t.name}" loading="lazy" decoding="async" />
          </a>
          <button class="product-quick-btn" data-id="${t.id}">Quick View</button>
        </div>

        <div class="product-info">
          <div class="product-category">${t.categoryLabel}</div>
          <h3 class="product-title">
            <a href="/product-detail.html?id=${t.id}">${t.name}</a>
          </h3>
          <p class="product-tagline">${t.tagline}</p>

          <div class="product-meta-row">
            <span class="product-price">$${t.price}</span>
            <button class="add-cart-btn" data-id="${t.id}">+ Add to Cart</button>
          </div>
        </div>
      </div>
    `).join(""),i.querySelectorAll(".add-cart-btn").forEach(t=>{t.addEventListener("click",r=>{var l,u;r.stopPropagation();const o=t.getAttribute("data-id"),a=g.find(m=>m.id===o);f.addItem(o,((u=(l=a==null?void 0:a.sizes)==null?void 0:l[0])==null?void 0:u.label)||"30ml",1),v(`Added ${(a==null?void 0:a.name)||"Item"} to your ritual cart!`,"🛍️")})}),i.querySelectorAll(".product-quick-btn").forEach(t=>{t.addEventListener("click",r=>{r.stopPropagation();const o=t.getAttribute("data-id");$(o)})})}}d.forEach(e=>{e.addEventListener("click",()=>{d.forEach(t=>t.classList.remove("active")),e.classList.add("active"),c=e.getAttribute("data-category"),s()})}),s()}
