import{g as O,S as R}from"./mouseAnimations-Q01e9Zsg.js";import{i as H}from"./commonHeader-Bs_qxFvO.js";document.addEventListener("DOMContentLoaded",()=>{H(),M()});function M(){const s=O(R.LATEST_ORDER,null);if(!s){window.location.href="/shop.html";return}const{orderId:C,orderDate:T,deliveryEstimate:b,items:d,subtotal:w,discountAmount:a,appliedPromo:o,shippingCost:u,grandTotal:L,customer:n,shipping:t,paymentSummary:F}=s,c=document.querySelector("#thankyou-customer-name"),m=document.querySelector("#thankyou-order-id"),l=document.querySelector("#thankyou-order-date"),y=document.querySelector("#thankyou-delivery-estimate"),f=document.querySelector("#thankyou-customer-summary"),p=document.querySelector("#thankyou-shipping-summary"),v=document.querySelector("#thankyou-payment-summary"),h=document.querySelector("#thankyou-items-container"),g=document.querySelector("#thankyou-subtotal"),r=document.querySelector("#thankyou-discount-row"),$=document.querySelector("#thankyou-discount"),S=document.querySelector("#thankyou-shipping"),x=document.querySelector("#thankyou-total"),i=document.querySelector("#print-receipt-btn");c&&(t!=null&&t.firstName)&&(c.textContent=`Thank You for Your Order, ${t.firstName}!`),m&&(m.textContent=C||"#ETH-894215"),l&&(l.textContent=T||"Today"),y&&(y.textContent=b||"3-5 Business Days"),f&&n&&(f.innerHTML=`
      <div><strong>Email:</strong> ${n.email}</div>
      <div><strong>Phone:</strong> ${n.phone}</div>
    `),p&&t&&(p.innerHTML=`
      <div><strong>Recipient:</strong> ${t.firstName} ${t.lastName}</div>
      <div><strong>Address:</strong> ${t.address}${t.apartment?", "+t.apartment:""}</div>
      <div>${t.city}, ${t.state} ${t.postalCode}, ${t.country}</div>
    `),v&&(v.innerHTML=`
      <div><strong>Paid via:</strong> ${F||"Credit Card"}</div>
    `),h&&d&&(h.innerHTML=d.map(e=>{var E,k,q;return`
      <div style="display: flex; gap: 1rem; align-items: center; padding: 0.85rem 0; border-bottom: 1px solid var(--border-light);">
        <img src="${((E=e.product)==null?void 0:E.heroImage)||"/assets/products/product_serum_hero.jpg"}" alt="${(k=e.product)==null?void 0:k.name}" style="width: 50px; height: 56px; object-fit: cover; border-radius: var(--radius-sm); background: #f4f2ec;" />
        <div style="flex-grow: 1; text-align: left;">
          <div style="font-family: var(--font-serif); font-size: 1.05rem; font-weight: 500; color: var(--text-primary);">${(q=e.product)==null?void 0:q.name}</div>
          <div style="font-size: 0.8rem; color: var(--text-muted);">Size: ${e.sizeLabel} • Qty: ${e.quantity}</div>
        </div>
        <div style="font-weight: 600; font-size: 1rem; color: var(--text-primary);">$${(e.unitPrice*e.quantity).toFixed(2)}</div>
      </div>
    `}).join("")),g&&(g.textContent=`$${(w||0).toFixed(2)}`),r&&$&&(a>0?(r.style.display="flex",$.textContent=`-$${a.toFixed(2)} (${(o==null?void 0:o.code)||"PROMO"})`):r.style.display="none"),S&&(S.textContent=u===0?"FREE":`$${(u||15).toFixed(2)}`),x&&(x.textContent=`$${(L||0).toFixed(2)}`),i==null||i.addEventListener("click",()=>{window.print()})}
