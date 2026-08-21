// Storage Manager: ÉTHERIA BOTANICALS LocalStorage Persistence Layer

export const STORAGE_KEYS = {
  CART: 'etheria_cart',
  CUSTOMER: 'etheria_customer',
  SHIPPING: 'etheria_shipping',
  CHECKOUT: 'etheria_checkout',
  ORDERS: 'etheria_orders',
  LATEST_ORDER: 'etheria_latest_order'
};

export function getStored(key, fallback = null) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (e) {
    console.warn(`Error reading ${key} from localStorage:`, e);
    return fallback;
  }
}

export function setStored(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`Error saving ${key} to localStorage:`, e);
  }
}

export function removeStored(key) {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.warn(`Error removing ${key} from localStorage:`, e);
  }
}

// Order Management Helpers
export function saveCompletedOrder(orderData) {
  const existingOrders = getStored(STORAGE_KEYS.ORDERS, []);
  const updatedOrders = [orderData, ...existingOrders];
  setStored(STORAGE_KEYS.ORDERS, updatedOrders);
  setStored(STORAGE_KEYS.LATEST_ORDER, orderData);
  // Clear active cart & checkout drafts
  removeStored(STORAGE_KEYS.CART);
  removeStored(STORAGE_KEYS.CHECKOUT);
  return orderData;
}
