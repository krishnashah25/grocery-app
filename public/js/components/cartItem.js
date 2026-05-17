// Cart Item Component
function createCartItem(item) {
  const product = item.product;
  if (!product) return '';

  return `
    <div class="cart-item" id="cart-item-${item.productId}">
      <span class="cart-item-emoji">${product.emoji}</span>
      <div class="cart-item-info">
        <div class="cart-item-name">${product.name}</div>
        <div class="cart-item-price">$${product.price.toFixed(2)} / ${product.unit}</div>
      </div>
      <div class="cart-item-controls">
        <button class="qty-btn" onclick="handleUpdateQty('${item.productId}', ${item.quantity - 1})" id="qty-minus-${item.productId}">−</button>
        <span class="cart-item-qty">${item.quantity}</span>
        <button class="qty-btn" onclick="handleUpdateQty('${item.productId}', ${item.quantity + 1})" id="qty-plus-${item.productId}">+</button>
      </div>
      <span class="cart-item-subtotal">$${item.subtotal.toFixed(2)}</span>
      <button class="btn-remove" onclick="handleRemoveItem('${item.productId}')" id="btn-remove-${item.productId}" title="Remove">✕</button>
    </div>
  `;
}

async function handleUpdateQty(productId, newQty) {
  try {
    if (newQty <= 0) {
      await handleRemoveItem(productId);
      return;
    }
    const cart = await API.updateCartItem(productId, newQty);
    updateCartBadge(cart.totalItems);
    renderCartPage(cart);
  } catch (err) {
    showToast('Failed to update quantity');
  }
}

async function handleRemoveItem(productId) {
  try {
    const cart = await API.removeFromCart(productId);
    updateCartBadge(cart.totalItems);
    renderCartPage(cart);
    showToast('Item removed');
  } catch (err) {
    showToast('Failed to remove item');
  }
}
