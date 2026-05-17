const express = require('express');
const router = express.Router();
const { products, categories } = require('../data/products');

// GET /api/products — list all products with optional search & category filter
router.get('/', (req, res) => {
  let result = [...products];
  const { category, search } = req.query;

  if (category && category !== 'all') {
    result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    const query = search.toLowerCase();
    result = result.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
    );
  }

  res.json({ success: true, data: result, count: result.length });
});

// GET /api/products/categories — list all categories
router.get('/categories', (req, res) => {
  res.json({ success: true, data: categories });
});

// GET /api/products/:id — get single product
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, error: 'Product not found' });
  }
  res.json({ success: true, data: product });
});

module.exports = router;
