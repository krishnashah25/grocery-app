// In-memory cart store
class CartStore {
  constructor() {
    this.items = [];
  }

  getAll() {
    return this.items;
  }

  addItem(productId, quantity = 1) {
    const existing = this.items.find(item => item.productId === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({ productId, quantity });
    }
    return this.items;
  }

  updateQuantity(productId, quantity) {
    const item = this.items.find(item => item.productId === productId);
    if (!item) return null;
    
    if (quantity <= 0) {
      return this.removeItem(productId);
    }
    
    item.quantity = quantity;
    return this.items;
  }

  removeItem(productId) {
    this.items = this.items.filter(item => item.productId !== productId);
    return this.items;
  }

  clear() {
    this.items = [];
    return this.items;
  }

  getItemCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }
}

module.exports = new CartStore();
