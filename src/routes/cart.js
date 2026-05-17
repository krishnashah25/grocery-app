const express = require('express');
const router = express.Router();
const cartStore = require('../models/cartStore');
const { products } = require('../data/products');

// Helper: enrich cart items with product details
function enrichCart(items) {
  return items.map(item => {
    const product = products.find(p => p.id === item.productId);
    return {
      ...item,
      product: product || null,
      subtotal: product ? +(product.price * item.quantity).toFixed(2) : 0,
    };
  });
}

function getCartTotal(enrichedItems) {
  return +enrichedItems.reduce((sum, item) => sum + item.subtotal, 0).toFixed(2);
}

// GET /api/cart — get current cart
router.get('/', (req, res) => {
  const items = enrichCart(cartStore.getAll());
  res.json({
    success: true,
    data: {
      items,
      totalItems: cartStore.getItemCount(),
      totalAmount: getCartTotal(items),
    },
  });
});

// POST /api/cart — add item to cart
router.post('/', (req, res) => {
  const { productId, quantity = 1 } = req.body;

  if (!productId) {
    return res.status(400).json({ success: false, error: 'productId is required' });
  }

  const product = products.find(p => p.id === productId);
  if (!product) {
    return res.status(404).json({ success: false, error: 'Product not found' });
  }

  cartStore.addItem(productId, quantity);
  const items = enrichCart(cartStore.getAll());

  res.json({
    success: true,
    data: {
      items,
      totalItems: cartStore.getItemCount(),
      totalAmount: getCartTotal(items),
    },
  });
});

// PUT /api/cart/:productId — update item quantity
router.put('/:productId', (req, res) => {
  const { quantity } = req.body;
  const { productId } = req.params;

  if (quantity === undefined) {
    return res.status(400).json({ success: false, error: 'quantity is required' });
  }

  const result = cartStore.updateQuantity(productId, quantity);
  if (result === null) {
    return res.status(404).json({ success: false, error: 'Item not in cart' });
  }

  const items = enrichCart(cartStore.getAll());
  res.json({
    success: true,
    data: {
      items,
      totalItems: cartStore.getItemCount(),
      totalAmount: getCartTotal(items),
    },
  });
});

// DELETE /api/cart/:productId — remove item from cart
router.delete('/:productId', (req, res) => {
  cartStore.removeItem(req.params.productId);
  const items = enrichCart(cartStore.getAll());

  res.json({
    success: true,
    data: {
      items,
      totalItems: cartStore.getItemCount(),
      totalAmount: getCartTotal(items),
    },
  });
});

// DELETE /api/cart — clear entire cart
router.delete('/', (req, res) => {
  cartStore.clear();
  res.json({
    success: true,
    data: { items: [], totalItems: 0, totalAmount: 0 },
  });
});

module.exports = router;
