import{c as o}from"./mouseAnimations-Q01e9Zsg.js";import{i as F,s as E}from"./commonHeader-Bs_qxFvO.js";document.addEventListener("DOMContentLoaded",()=>{F(),C()});function C(){const d=document.querySelector("#cart-page-items-body"),s=document.querySelector("#cart-empty-state"),a=document.querySelector("#cart-content-area"),f=document.querySelector("#cart-page-subtotal"),l=document.querySelector("#cart-page-discount-row"),S=document.querySelector("#cart-page-discount"),h=document.querySelector("#cart-page-shipping"),q=document.querySelector("#cart-page-total"),u=document.querySelector("#cart-page-free-shipping-text"),p=document.querySelector("#cart-page-free-shipping-fill"),y=document.querySelector("#cart-page-promo-input"),m=document.querySelector("#cart-page-apply-promo"),g=document.querySelector("#cart-proceed-checkout-btn");function $(e){if(e.itemCount===0){s&&(s.style.display="block"),a&&(a.style.display="none");return}s&&(s.style.display="none"),a&&(a.style.display="grid"),u&&p&&(e.amountNeededForFreeShipping<=0?(u.innerHTML="🎉 You unlocked <strong>FREE Express Shipping</strong>!",p.style.width="100%"):(u.innerHTML=`Add <strong>$${e.amountNeededForFreeShipping.toFixed(2)}</strong> more to unlock FREE Express Shipping!`,p.style.width=`${e.shippingProgressPercent}%`)),d&&(d.innerHTML=e.items.map(t=>{var n,i,c;return`
        <tr data-id="${t.productId}" data-size="${t.sizeLabel}">
          <td>
            <div class="cart-product-cell">
              <a href="/product-detail.html?id=${t.productId}">
                <img src="${((n=t.product)==null?void 0:n.heroImage)||"/assets/products/product_serum_hero.jpg"}" alt="${(i=t.product)==null?void 0:i.name}" class="cart-product-img" />
              </a>
              <div>
                <h3 class="cart-product-title">
                  <a href="/product-detail.html?id=${t.productId}">${((c=t.product)==null?void 0:c.name)||"Skincare Formulation"}</a>
                </h3>
                <div class="cart-product-size">Size: ${t.sizeLabel} • $${t.unitPrice}</div>
              </div>
            </div>
          </td>
          <td>
            <div class="detail-qty-stepper" style="display: inline-flex;">
              <button class="detail-qty-btn qty-minus">&minus;</button>
              <span class="detail-qty-val">${t.quantity}</span>
              <button class="detail-qty-btn qty-plus">&plus;</button>
            </div>
          </td>
          <td>
            <strong style="font-size: 1.1rem; color: var(--text-primary);">$${t.lineTotal.toFixed(2)}</strong>
          </td>
          <td style="text-align: right;">
            <button class="remove-item-btn" style="color: #c0392b; font-size: 0.85rem; cursor: pointer;">Remove</button>
          </td>
        </tr>
      `}).join(""),d.querySelectorAll("tr").forEach(t=>{var c,b,v;const n=t.getAttribute("data-id"),i=t.getAttribute("data-size");(c=t.querySelector(".qty-minus"))==null||c.addEventListener("click",()=>{o.updateQuantity(n,i,-1)}),(b=t.querySelector(".qty-plus"))==null||b.addEventListener("click",()=>{o.updateQuantity(n,i,1)}),(v=t.querySelector(".remove-item-btn"))==null||v.addEventListener("click",()=>{o.removeItem(n,i),E("Item removed from cart","🗑️")})}));const r=e.total>=150?0:15,x=e.total+r;f&&(f.textContent=`$${e.subtotal.toFixed(2)}`),l&&S&&(e.discountAmount>0?(l.style.display="flex",S.textContent=`-$${e.discountAmount.toFixed(2)} (${e.appliedPromo.code})`):l.style.display="none"),h&&(h.textContent=r===0?"FREE":`$${r.toFixed(2)}`),q&&(q.textContent=`$${x.toFixed(2)}`)}m==null||m.addEventListener("click",()=>{const e=y==null?void 0:y.value,r=o.applyPromoCode(e);r.success?E(r.message,"✨"):alert("Invalid promo code. Try ÉTHERIA10 or ROUTINE15")}),g==null||g.addEventListener("click",()=>{o.getState().itemCount===0?alert("Your cart is empty."):window.location.href="/checkout.html"}),o.subscribe($),$(o.getState())}
