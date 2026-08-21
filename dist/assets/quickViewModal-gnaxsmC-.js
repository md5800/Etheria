import{e as m,c as u}from"./mouseAnimations-Q01e9Zsg.js";function y(){const o=document.querySelector("#quickview-backdrop")||document.querySelector("#quickview-modal-backdrop"),e=document.querySelector("#quickview-close-btn")||document.querySelector("#quickview-modal-close");function i(){o==null||o.classList.remove("active"),document.body.style.overflow=""}e==null||e.addEventListener("click",i),o==null||o.addEventListener("click",a=>{a.target===o&&i()})}function p(o){const e=m(o);if(!e)return;const i=document.querySelector("#quickview-backdrop")||document.querySelector("#quickview-modal-backdrop"),a=document.querySelector("#quickview-content")||document.querySelector("#quickview-modal-content");if(!i||!a)return;let s=e.sizes[0].label,c=e.sizes[0].price;a.innerHTML=`
    <div class="quickview-grid">
      <div style="aspect-ratio: 4/5; border-radius: var(--radius-md); overflow: hidden; background: #f4f2ec;">
        <img src="${e.heroImage}" alt="${e.name}" style="width: 100%; height: 100%; object-fit: cover;" />
      </div>
      <div>
        <div style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.15em; color: var(--accent-gold); font-weight: 600; margin-bottom: 0.5rem;">
          ${e.categoryLabel}
        </div>
        <h2 style="font-size: 2.2rem; margin-bottom: 0.75rem;">${e.name}</h2>
        <div style="font-size: 1.5rem; font-weight: 600; color: var(--text-primary); margin-bottom: 1.25rem;" id="qv-price-display">
          $${c}.00
        </div>
        <p style="margin-bottom: 1.5rem; line-height: 1.7;">${e.description}</p>
        
        <!-- Size Selector -->
        <div style="margin-bottom: 1.5rem;">
          <div style="font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem;">
            Select Size:
          </div>
          <div style="display: flex; gap: 0.75rem;" id="qv-size-group">
            ${e.sizes.map((t,r)=>`
              <button class="size-pill-btn ${r===0?"active":""}" data-size="${t.label}" data-price="${t.price}" style="padding: 0.5rem 1.25rem; border-radius: var(--radius-full); border: 1px solid ${r===0?"var(--text-primary)":"var(--border-light)"}; background: ${r===0?"var(--text-primary)":"transparent"}; color: ${r===0?"var(--bg-primary)":"var(--text-primary)"}; font-size: 0.85rem; font-weight: 600;">
                ${t.label}
              </button>
            `).join("")}
          </div>
        </div>

        <!-- Key Ingredients -->
        <div style="margin-bottom: 2rem;">
          <div style="font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem;">
            Active Cellular Ingredients:
          </div>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            ${e.ingredients.map(t=>`
              <span style="font-size: 0.8rem; padding: 0.35rem 0.75rem; border-radius: var(--radius-sm); background: rgba(197, 160, 89, 0.12); color: #8A6726;">
                ${t}
              </span>
            `).join("")}
          </div>
        </div>

        <!-- Add to Cart CTA -->
        <button class="btn-primary" id="qv-add-cart-cta" style="width: 100%; justify-content: center;">
          ADD TO RITUAL CART • $${c}
        </button>
      </div>
    </div>
  `;const l=a.querySelector("#qv-price-display"),d=a.querySelector("#qv-add-cart-cta"),n=a.querySelectorAll(".size-pill-btn");n.forEach(t=>{t.addEventListener("click",()=>{n.forEach(r=>{r.style.background="transparent",r.style.color="var(--text-primary)",r.style.borderColor="var(--border-light)"}),t.style.background="var(--text-primary)",t.style.color="var(--bg-primary)",t.style.borderColor="var(--text-primary)",s=t.getAttribute("data-size"),c=parseInt(t.getAttribute("data-price"),10),l.textContent=`$${c}.00`,d.textContent=`ADD TO RITUAL CART • $${c}`})}),d==null||d.addEventListener("click",()=>{var t,r;u.addItem(e.id,s,1),i==null||i.classList.remove("active"),document.body.style.overflow="",(t=document.querySelector("#cart-drawer-backdrop"))==null||t.classList.add("active"),(r=document.querySelector("#cart-drawer"))==null||r.classList.add("active")}),i==null||i.classList.add("active"),document.body.style.overflow="hidden"}export{y as i,p as o};
