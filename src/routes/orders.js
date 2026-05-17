const express = require('express');
const router = express.Router();
const orderStore = require('../models/orderStore');
const cartStore = require('../models/cartStore');
const { products } = require('../data/products');

// POST /api/orders — place an order from the current cart
router.post('/', (req, res) => {
  const { name, email, address, phone } = req.body;

  // Validate required fields
  if (!name || !address || !phone) {
    return res.status(400).json({
      success: false,
      error: 'name, address, and phone are required',
    });
  }

  const cartItems = cartStore.getAll();
  if (cartItems.length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Cart is empty. Add items before placing an order.',
    });
  }

  // Build enriched order items
  const orderItems = cartItems.map(item => {
    const product = products.find(p => p.id === item.productId);
    return {
      productId: item.productId,
      name: product ? product.name : 'Unknown',
      price: product ? product.price : 0,
      quantity: item.quantity,
      subtotal: product ? +(product.price * item.quantity).toFixed(2) : 0,
    };
  });

  const totalAmount = +orderItems.reduce((sum, item) => sum + item.subtotal, 0).toFixed(2);

  // Create order
  const order = orderStore.create(orderItems, totalAmount, { name, email, address, phone });

  // Clear cart after successful order
  cartStore.clear();

  res.status(201).json({ success: true, data: order });
});

// GET /api/orders — list all orders
router.get('/', (req, res) => {
  res.json({ success: true, data: orderStore.getAll() });
});

// GET /api/orders/:id — get single order
router.get('/:id', (req, res) => {
  const order = orderStore.getById(req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, error: 'Order not found' });
  }
  res.json({ success: true, data: order });
});

module.exports = router;
