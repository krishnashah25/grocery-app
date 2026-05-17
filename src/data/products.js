// Seed product data — 36 grocery products across 6 categories
const products = [
  // 🍎 Fruits
  { id: 'fruit-001', name: 'Red Apples', price: 3.49, category: 'Fruits', emoji: '🍎', unit: 'kg', inStock: true, description: 'Crisp and sweet red apples, perfect for snacking or baking.' },
  { id: 'fruit-002', name: 'Bananas', price: 1.29, category: 'Fruits', emoji: '🍌', unit: 'bunch', inStock: true, description: 'Ripe yellow bananas, rich in potassium and natural energy.' },
  { id: 'fruit-003', name: 'Strawberries', price: 4.99, category: 'Fruits', emoji: '🍓', unit: 'box', inStock: true, description: 'Fresh, juicy strawberries picked at peak ripeness.' },
  { id: 'fruit-004', name: 'Oranges', price: 2.99, category: 'Fruits', emoji: '🍊', unit: 'kg', inStock: true, description: 'Sweet and tangy navel oranges, great for juicing.' },
  { id: 'fruit-005', name: 'Grapes', price: 3.79, category: 'Fruits', emoji: '🍇', unit: 'kg', inStock: true, description: 'Seedless green grapes, perfect for snacking.' },
  { id: 'fruit-006', name: 'Mangoes', price: 5.49, category: 'Fruits', emoji: '🥭', unit: 'each', inStock: true, description: 'Tropical Alphonso mangoes with rich, sweet flavor.' },

  // 🥦 Vegetables
  { id: 'veg-001', name: 'Broccoli', price: 2.49, category: 'Vegetables', emoji: '🥦', unit: 'head', inStock: true, description: 'Fresh green broccoli florets, packed with nutrients.' },
  { id: 'veg-002', name: 'Tomatoes', price: 1.99, category: 'Vegetables', emoji: '🍅', unit: 'kg', inStock: true, description: 'Vine-ripened tomatoes, perfect for salads and cooking.' },
  { id: 'veg-003', name: 'Carrots', price: 1.49, category: 'Vegetables', emoji: '🥕', unit: 'kg', inStock: true, description: 'Organic baby carrots, sweet and crunchy.' },
  { id: 'veg-004', name: 'Bell Peppers', price: 3.29, category: 'Vegetables', emoji: '🫑', unit: 'pack', inStock: true, description: 'Mixed color bell peppers — red, yellow, and green.' },
  { id: 'veg-005', name: 'Spinach', price: 2.29, category: 'Vegetables', emoji: '🥬', unit: 'bunch', inStock: true, description: 'Fresh baby spinach leaves, great for salads and smoothies.' },
  { id: 'veg-006', name: 'Potatoes', price: 1.79, category: 'Vegetables', emoji: '🥔', unit: 'kg', inStock: true, description: 'Golden potatoes, versatile for baking, mashing, or frying.' },

  // 🥛 Dairy
  { id: 'dairy-001', name: 'Whole Milk', price: 3.99, category: 'Dairy', emoji: '🥛', unit: 'gallon', inStock: true, description: 'Farm-fresh whole milk, creamy and nutritious.' },
  { id: 'dairy-002', name: 'Greek Yogurt', price: 4.49, category: 'Dairy', emoji: '🫙', unit: 'tub', inStock: true, description: 'Thick, protein-rich Greek yogurt with live cultures.' },
  { id: 'dairy-003', name: 'Cheddar Cheese', price: 5.99, category: 'Dairy', emoji: '🧀', unit: 'block', inStock: true, description: 'Aged sharp cheddar cheese, perfect for sandwiches.' },
  { id: 'dairy-004', name: 'Fresh Eggs', price: 4.29, category: 'Dairy', emoji: '🥚', unit: 'dozen', inStock: true, description: 'Free-range organic eggs, farm to table freshness.' },
  { id: 'dairy-005', name: 'Butter', price: 3.49, category: 'Dairy', emoji: '🧈', unit: 'pack', inStock: true, description: 'Unsalted European-style butter, perfect for baking.' },
  { id: 'dairy-006', name: 'Cream Cheese', price: 2.99, category: 'Dairy', emoji: '🫕', unit: 'tub', inStock: true, description: 'Smooth and creamy cream cheese spread.' },

  // 🍞 Bakery
  { id: 'bake-001', name: 'Sourdough Bread', price: 4.99, category: 'Bakery', emoji: '🍞', unit: 'loaf', inStock: true, description: 'Artisan sourdough bread with a perfect crusty exterior.' },
  { id: 'bake-002', name: 'Croissants', price: 5.49, category: 'Bakery', emoji: '🥐', unit: 'pack of 4', inStock: true, description: 'Flaky, buttery French croissants, baked fresh daily.' },
  { id: 'bake-003', name: 'Bagels', price: 3.99, category: 'Bakery', emoji: '🥯', unit: 'pack of 6', inStock: true, description: 'New York style bagels — plain, sesame, and everything.' },
  { id: 'bake-004', name: 'Muffins', price: 4.79, category: 'Bakery', emoji: '🧁', unit: 'pack of 4', inStock: true, description: 'Blueberry muffins with a crumbly sugar topping.' },
  { id: 'bake-005', name: 'Tortillas', price: 2.49, category: 'Bakery', emoji: '🫓', unit: 'pack of 8', inStock: true, description: 'Soft flour tortillas, great for wraps and burritos.' },
  { id: 'bake-006', name: 'Baguette', price: 2.99, category: 'Bakery', emoji: '🥖', unit: 'each', inStock: true, description: 'Crispy French baguette, perfect with cheese or soup.' },

  // 🥤 Beverages
  { id: 'bev-001', name: 'Orange Juice', price: 4.49, category: 'Beverages', emoji: '🧃', unit: 'bottle', inStock: true, description: 'Freshly squeezed orange juice, no added sugar.' },
  { id: 'bev-002', name: 'Green Tea', price: 3.99, category: 'Beverages', emoji: '🍵', unit: 'box of 20', inStock: true, description: 'Premium Japanese matcha green tea bags.' },
  { id: 'bev-003', name: 'Sparkling Water', price: 1.49, category: 'Beverages', emoji: '💧', unit: 'bottle', inStock: true, description: 'Naturally carbonated mineral water, refreshing and crisp.' },
  { id: 'bev-004', name: 'Almond Milk', price: 3.79, category: 'Beverages', emoji: '🥜', unit: 'carton', inStock: true, description: 'Unsweetened almond milk, dairy-free alternative.' },
  { id: 'bev-005', name: 'Coffee Beans', price: 12.99, category: 'Beverages', emoji: '☕', unit: 'bag', inStock: true, description: 'Single-origin Arabica coffee beans, medium roast.' },
  { id: 'bev-006', name: 'Coconut Water', price: 2.99, category: 'Beverages', emoji: '🥥', unit: 'bottle', inStock: true, description: 'Pure coconut water, naturally hydrating and refreshing.' },

  // 🍿 Snacks
  { id: 'snack-001', name: 'Mixed Nuts', price: 7.99, category: 'Snacks', emoji: '🥜', unit: 'bag', inStock: true, description: 'Premium roasted mixed nuts — almonds, cashews, and pecans.' },
  { id: 'snack-002', name: 'Dark Chocolate', price: 4.99, category: 'Snacks', emoji: '🍫', unit: 'bar', inStock: true, description: '72% cacao dark chocolate, rich and smooth.' },
  { id: 'snack-003', name: 'Tortilla Chips', price: 3.49, category: 'Snacks', emoji: '🌮', unit: 'bag', inStock: true, description: 'Crispy corn tortilla chips, lightly salted.' },
  { id: 'snack-004', name: 'Granola Bars', price: 4.29, category: 'Snacks', emoji: '🍫', unit: 'box of 6', inStock: true, description: 'Oat and honey granola bars with dark chocolate chips.' },
  { id: 'snack-005', name: 'Popcorn', price: 2.99, category: 'Snacks', emoji: '🍿', unit: 'bag', inStock: true, description: 'Organic white cheddar popcorn, a savory treat.' },
  { id: 'snack-006', name: 'Rice Crackers', price: 3.29, category: 'Snacks', emoji: '🍘', unit: 'pack', inStock: true, description: 'Japanese rice crackers with soy sauce glaze.' },
];

const categories = [
  { id: 'fruits', name: 'Fruits', emoji: '🍎', color: '#ef4444' },
  { id: 'vegetables', name: 'Vegetables', emoji: '🥦', color: '#22c55e' },
  { id: 'dairy', name: 'Dairy', emoji: '🥛', color: '#3b82f6' },
  { id: 'bakery', name: 'Bakery', emoji: '🍞', color: '#f59e0b' },
  { id: 'beverages', name: 'Beverages', emoji: '🥤', color: '#8b5cf6' },
  { id: 'snacks', name: 'Snacks', emoji: '🍿', color: '#ec4899' },
];

module.exports = { products, categories };
