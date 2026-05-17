// Product Card Component
const categoryColors = {
  Fruits: 'linear-gradient(135deg, #fee2e2, #fecaca)',
  Vegetables: 'linear-gradient(135deg, #dcfce7, #bbf7d0)',
  Dairy: 'linear-gradient(135deg, #dbeafe, #bfdbfe)',
  Bakery: 'linear-gradient(135deg, #fef3c7, #fde68a)',
  Beverages: 'linear-gradient(135deg, #ede9fe, #ddd6fe)',
  Snacks: 'linear-gradient(135deg, #fce7f3, #fbcfe8)',
};

function createProductCard(product) {
  const bgGradient = categoryColors[product.category] || 'linear-gradient(135deg, #e5e7eb, #d1d5db)';

  return `
    <div class="product-card" id="product-${product.id}">
      <div class="product-card-image" style="background: ${bgGradient}">
        <span>${product.emoji}</span>
      </div>
      <div class="product-card-body">
        <span class="product-card-category">${product.category}</span>
        <h3 class="product-card-name">${product.name}</h3>
        <p class="product-card-desc">${product.description}</p>
        <div class="product-card-footer">
          <span class="product-price">$${product.price.toFixed(2)}<span class="unit">/${product.unit}</span></span>
          <button class="btn-add-cart" onclick="handleAddToCart('${product.id}', this)" id="btn-add-${product.id}">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  `;
}

async function handleAddToCart(productId, btnEl) {
  try {
    btnEl.disabled = true;
    btnEl.textContent = 'Adding...';
    const cart = await API.addToCart(productId, 1);
    btnEl.textContent = '✓ Added';
    btnEl.classList.add('added');
    updateCartBadge(cart.totalItems);
    showToast('Added to cart! 🛒');
    setTimeout(() => {
      btnEl.textContent = 'Add to Cart';
      btnEl.classList.remove('added');
      btnEl.disabled = false;
    }, 1200);
  } catch (err) {
    btnEl.textContent = 'Add to Cart';
    btnEl.disabled = false;
    showToast('Failed to add item');
  }
}
