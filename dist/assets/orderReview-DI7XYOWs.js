import{g as D,S as T,c as m,d as q}from"./mouseAnimations-Q01e9Zsg.js";import{i as L,s as M}from"./commonHeader-Bs_qxFvO.js";document.addEventListener("DOMContentLoaded",()=>{L(),P()});function P(){const l=D(T.CHECKOUT,null),t=m.getState();if(!l||t.itemCount===0){alert("Please enter your shipping and payment details before reviewing your order."),window.location.href="/checkout.html";return}const{customer:a,shipping:e,paymentSummary:u}=l,p=document.querySelector("#review-customer-summary"),y=document.querySelector("#review-shipping-summary"),v=document.querySelector("#review-payment-summary"),g=document.querySelector("#review-items-container"),h=document.querySelector("#review-subtotal"),d=document.querySelector("#review-discount-row"),f=document.querySelector("#review-discount"),$=document.querySelector("#review-shipping"),S=document.querySelector("#review-total"),x=document.querySelector("#terms-checkbox"),c=document.querySelector("#place-order-btn");if(p&&(p.innerHTML=`
      <div><strong>Email:</strong> ${a.email}</div>
      <div><strong>Phone:</strong> ${a.phone}</div>
    `),y){const o=e.method==="express"?"Express Alpine Priority (1-2 Days)":"Standard Botanical Delivery (3-5 Days)";y.innerHTML=`
      <div><strong>Recipient:</strong> ${e.firstName} ${e.lastName}</div>
      <div><strong>Address:</strong> ${e.address}${e.apartment?", "+e.apartment:""}</div>
      <div>${e.city}, ${e.state} ${e.postalCode}, ${e.country}</div>
      <div style="margin-top: 0.5rem; color: var(--accent-gold); font-size: 0.85rem;"><strong>Method:</strong> ${o}</div>
    `}v&&(v.innerHTML=`
      <div><strong>Payment Method:</strong> ${u||"Credit Card"}</div>
      <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.25rem;">Encrypted & Bio-Authenticity Verified</div>
    `),g&&(g.innerHTML=t.items.map(o=>{var r,s,n;return`
      <div style="display: flex; gap: 1.25rem; align-items: center; padding: 1rem 0; border-bottom: 1px solid var(--border-light);">
        <img src="${((r=o.product)==null?void 0:r.heroImage)||"/assets/products/product_serum_hero.jpg"}" alt="${(s=o.product)==null?void 0:s.name}" style="width: 64px; height: 72px; object-fit: cover; border-radius: var(--radius-md); background: #f4f2ec;" />
        <div style="flex-grow: 1;">
          <h4 style="font-family: var(--font-serif); font-size: 1.1rem; color: var(--text-primary); margin-bottom: 0.2rem;">${(n=o.product)==null?void 0:n.name}</h4>
          <div style="font-size: 0.825rem; color: var(--text-muted);">Size: ${o.sizeLabel} • Qty: ${o.quantity} × $${o.unitPrice}</div>
        </div>
        <div style="font-weight: 700; font-size: 1.05rem; color: var(--text-primary);">$${o.lineTotal.toFixed(2)}</div>
      </div>
    `}).join(""));const i=e.method==="express"?25:t.subtotal>=150?0:15,w=t.total+i;h&&(h.textContent=`$${t.subtotal.toFixed(2)}`),d&&f&&(t.discountAmount>0?(d.style.display="flex",f.textContent=`-$${t.discountAmount.toFixed(2)} (${t.appliedPromo.code})`):d.style.display="none"),$&&($.textContent=i===0?"FREE":`$${i.toFixed(2)}`),S&&(S.textContent=`$${w.toFixed(2)}`),c==null||c.addEventListener("click",()=>{if(x&&!x.checked){M("Please accept the Terms & Guarantee agreement to place your order.","⚠️");return}const o=`#ETH-${Math.floor(1e5+Math.random()*9e5)}`,r=new Date,s=r.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}),n=new Date(r);n.setDate(r.getDate()+(e.method==="express"?2:4));const b=new Date(r);b.setDate(r.getDate()+(e.method==="express"?3:6));const C=`${n.toLocaleDateString("en-US",{month:"short",day:"numeric"})} – ${b.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}`,E={orderId:o,orderDate:s,deliveryEstimate:C,items:t.items,subtotal:t.subtotal,discountAmount:t.discountAmount,appliedPromo:t.appliedPromo,shippingCost:i,grandTotal:w,customer:a,shipping:e,paymentSummary:u};q(E),m.items=[],m.saveCartToStorage(),window.location.href="/thank-you.html"})}
