import{e as x,P as E,c as w}from"./mouseAnimations-Q01e9Zsg.js";import{i as A,s as I}from"./commonHeader-Bs_qxFvO.js";document.addEventListener("DOMContentLoaded",()=>{A(),k()});function k(){var L;const C=new URLSearchParams(window.location.search).get("id")||"prod-01",e=x(C)||E[0];let a=((L=e.sizes)==null?void 0:L[0])||{label:"30ml",price:e.price},i=1;const g=document.querySelector("#breadcrumb-product-name"),y=document.querySelector("#product-detail-cat"),b=document.querySelector("#product-detail-title"),v=document.querySelector("#product-rating-count"),n=document.querySelector("#product-detail-price"),$=document.querySelector("#product-detail-desc"),o=document.querySelector("#gallery-main-img"),d=document.querySelector("#gallery-thumbnails"),l=document.querySelector("#size-selector-container"),h=document.querySelector("#ingredient-pills-wrap"),S=document.querySelector("#benefits-list-wrap"),q=document.querySelector("#related-products-grid");if(g&&(g.textContent=e.name),y&&(y.textContent=e.categoryLabel),b&&(b.textContent=e.name),v&&(v.textContent=`${e.rating} ★ (${e.reviewsCount} Reviews)`),n&&(n.textContent=`$${a.price}`),$&&($.textContent=e.description),o&&(o.src=e.heroImage,o.alt=e.name),d){const c=[e.heroImage,e.secondaryImage].filter(Boolean);d.innerHTML=c.map((t,r)=>`
      <img src="${t}" alt="Thumbnail ${r+1}" class="thumb-img ${r===0?"active":""}" data-src="${t}" />
    `).join(""),d.querySelectorAll(".thumb-img").forEach(t=>{t.addEventListener("click",()=>{d.querySelectorAll(".thumb-img").forEach(r=>r.classList.remove("active")),t.classList.add("active"),o&&(o.src=t.getAttribute("data-src"))})})}l&&e.sizes&&(l.innerHTML=e.sizes.map((c,t)=>`
      <button class="size-pill ${t===0?"active":""}" data-label="${c.label}" data-price="${c.price}">
        ${c.label} — $${c.price}
      </button>
    `).join(""),l.querySelectorAll(".size-pill").forEach(c=>{c.addEventListener("click",()=>{l.querySelectorAll(".size-pill").forEach(z=>z.classList.remove("active")),c.classList.add("active");const t=c.getAttribute("data-label"),r=parseFloat(c.getAttribute("data-price"));a={label:t,price:r},n&&(n.textContent=`$${r}`)})}));const u=document.querySelector("#detail-qty-minus"),m=document.querySelector("#detail-qty-plus"),s=document.querySelector("#detail-qty-val");u==null||u.addEventListener("click",()=>{i>1&&(i--,s&&(s.textContent=i))}),m==null||m.addEventListener("click",()=>{i++,s&&(s.textContent=i)});const p=document.querySelector("#add-to-cart-btn"),f=document.querySelector("#buy-now-btn");if(p==null||p.addEventListener("click",()=>{w.addItem(e.id,a.label,i),I(`Added ${i}x ${e.name} (${a.label}) to cart!`,"🌿")}),f==null||f.addEventListener("click",()=>{w.addItem(e.id,a.label,i),window.location.href="/checkout.html"}),h&&e.ingredients&&(h.innerHTML=e.ingredients.map(c=>`
      <span class="ingr-badge">🌿 ${c}</span>
    `).join("")),S&&e.benefits&&(S.innerHTML=e.benefits.map(c=>`
      <li style="margin-bottom: 0.5rem; font-size: 0.95rem; color: var(--text-primary);">${c}</li>
    `).join("")),document.querySelectorAll(".accordion-header").forEach(c=>{c.addEventListener("click",()=>{c.parentElement.classList.toggle("active")})}),q){const c=E.filter(t=>t.id!==e.id).slice(0,3);q.innerHTML=c.map(t=>`
      <div class="product-card">
        <div class="product-card-image-wrap">
          <a href="/product-detail.html?id=${t.id}">
            <img src="${t.heroImage}" alt="${t.name}" loading="lazy" />
          </a>
        </div>
        <div class="product-info">
          <div class="product-category">${t.categoryLabel}</div>
          <h3 class="product-title">
            <a href="/product-detail.html?id=${t.id}">${t.name}</a>
          </h3>
          <div class="product-meta-row">
            <span class="product-price">$${t.price}</span>
            <a href="/product-detail.html?id=${t.id}" class="btn-outline" style="padding: 0.5rem 1rem; font-size: 0.75rem;">View Formulation</a>
          </div>
        </div>
      </div>
    `).join("")}}
