const { v4: uuidv4 } = require('uuid');

// In-memory order store
class OrderStore {
  constructor() {
    this.orders = [];
  }

  getAll() {
    return this.orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  getById(id) {
    return this.orders.find(order => order.id === id) || null;
  }

  create(items, totalAmount, customerInfo) {
    const order = {
      id: uuidv4().split('-')[0].toUpperCase(),
      items: [...items],
      totalAmount,
      customerInfo: {
        name: customerInfo.name,
        email: customerInfo.email,
        address: customerInfo.address,
        phone: customerInfo.phone,
      },
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };
    this.orders.push(order);
    return order;
  }
}

module.exports = new OrderStore();
