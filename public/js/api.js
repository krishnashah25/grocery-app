// API Client — handles all backend communication
const API = {
  base: '/api',

  async request(endpoint, options = {}) {
    const res = await fetch(`${this.base}${endpoint}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
      body: options.body ? JSON.stringify(options.body) : undefined,
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || 'Request failed');
    return data.data;
  },

  // Products
  getProducts(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/products${query ? '?' + query : ''}`);
  },
  getCategories() {
    return this.request('/products/categories');
  },

  // Cart
  getCart() {
    return this.request('/cart');
  },
  addToCart(productId, quantity = 1) {
    return this.request('/cart', { method: 'POST', body: { productId, quantity } });
  },
  updateCartItem(productId, quantity) {
    return this.request(`/cart/${productId}`, { method: 'PUT', body: { quantity } });
  },
  removeFromCart(productId) {
    return this.request(`/cart/${productId}`, { method: 'DELETE' });
  },
  clearCart() {
    return this.request('/cart', { method: 'DELETE' });
  },

  // Orders
  placeOrder(customerInfo) {
    return this.request('/orders', { method: 'POST', body: customerInfo });
  },
};
