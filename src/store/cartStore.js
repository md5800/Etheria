// Cart Store: ÉTHERIA BOTANICALS
import { getProductById } from './productCatalog.js';
import { STORAGE_KEYS, getStored, setStored } from './storageManager.js';

class CartStore {
  constructor() {
    this.items = this.loadCartFromStorage();
    this.listeners = new Set();
    this.appliedPromo = null;
    this.freeShippingThreshold = 150;
  }

  loadCartFromStorage() {
    // Check main key etheria_cart first, then fallback to etheria_cart_items
    const cart = getStored(STORAGE_KEYS.CART, null);
    if (cart !== null) return cart;
    const legacyCart = getStored('etheria_cart_items', null);
    if (legacyCart !== null) return legacyCart;
    return [
      { productId: 'prod-01', sizeLabel: '30ml', unitPrice: 145, quantity: 1 }
    ];
  }

  saveCartToStorage() {
    setStored(STORAGE_KEYS.CART, this.items);
    setStored('etheria_cart_items', this.items);
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.saveCartToStorage();
    for (const listener of this.listeners) {
      listener(this.getState());
    }
  }

  addItem(productId, sizeLabel = '30ml', quantity = 1) {
    const product = getProductById(productId);
    if (!product) return;

    const sizeObj = product.sizes.find(s => s.label === sizeLabel) || product.sizes[0];
    const unitPrice = sizeObj ? sizeObj.price : product.price;

    const existingIndex = this.items.findIndex(
      item => item.productId === productId && item.sizeLabel === sizeLabel
    );

    if (existingIndex > -1) {
      this.items[existingIndex].quantity += quantity;
    } else {
      this.items.push({
        productId,
        sizeLabel: sizeObj.label,
        unitPrice,
        quantity
      });
    }

    this.notify();
  }

  removeItem(productId, sizeLabel) {
    this.items = this.items.filter(
      item => !(item.productId === productId && item.sizeLabel === sizeLabel)
    );
    this.notify();
  }

  updateQuantity(productId, sizeLabel, delta) {
    const item = this.items.find(
      i => i.productId === productId && i.sizeLabel === sizeLabel
    );
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      this.removeItem(productId, sizeLabel);
    } else {
      this.notify();
    }
  }

  applyPromoCode(code) {
    const cleanCode = (code || '').trim().toUpperCase();
    if (cleanCode === 'ÉTHERIA10' || cleanCode === 'ETHERIA10') {
      this.appliedPromo = { code: cleanCode, discountPercent: 10 };
      this.notify();
      return { success: true, message: '10% Promo Code Applied!' };
    } else if (cleanCode === 'ROUTINE15') {
      this.appliedPromo = { code: cleanCode, discountPercent: 15 };
      this.notify();
      return { success: true, message: '15% Routine Discount Applied!' };
    } else {
      return { success: false, message: 'Invalid promo code' };
    }
  }

  getState() {
    const detailedItems = this.items.map(item => {
      const product = getProductById(item.productId);
      return {
        ...item,
        product,
        lineTotal: item.unitPrice * item.quantity
      };
    });

    const itemCount = this.items.reduce((sum, i) => sum + i.quantity, 0);
    const subtotal = detailedItems.reduce((sum, i) => sum + i.lineTotal, 0);

    let discountAmount = 0;
    if (this.appliedPromo) {
      discountAmount = (subtotal * this.appliedPromo.discountPercent) / 100;
    }

    const total = Math.max(0, subtotal - discountAmount);
    const amountNeededForFreeShipping = Math.max(0, this.freeShippingThreshold - total);
    const shippingProgressPercent = Math.min(100, (total / this.freeShippingThreshold) * 100);

    return {
      items: detailedItems,
      itemCount,
      subtotal,
      discountAmount,
      appliedPromo: this.appliedPromo,
      total,
      freeShippingThreshold: this.freeShippingThreshold,
      amountNeededForFreeShipping,
      shippingProgressPercent
    };
  }
}

export const cartStore = new CartStore();
