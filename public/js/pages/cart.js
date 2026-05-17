// Cart Page
async function renderCartPage(cartData = null) {
  const content = document.getElementById('app-content');
  content.innerHTML = '<div class="loading"><div class="spinner"></div></div>';

  try {
    const cart = cartData || await API.getCart();

    if (cart.items.length === 0) {
      content.innerHTML = `
        <div style="text-align: center; padding: 100px 24px;">
          <div style="font-size: 4rem; opacity: 0.3; margin-bottom: 24px;">🛒</div>
          <h2 style="margin-bottom: 12px;">Your cart is empty</h2>
          <p style="color: var(--text-secondary); margin-bottom: 32px;">Looks like you haven't added any groceries yet.</p>
          <a href="#/" class="btn-primary" style="display: inline-block; text-decoration: none; padding: 12px 32px;">Start Shopping</a>
        </div>
      `;
      return;
    }

    content.innerHTML = `
      <div class="cart-layout">
        <div class="cart-items-section">
          <h2 style="margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center;">
            Your Cart
            <button class="btn-remove" style="font-size: 14px; padding: 6px 12px;" onclick="handleClearCart()">Clear All</button>
          </h2>
          <div class="cart-list">
            ${cart.items.map(item => createCartItem(item)).join('')}
          </div>
        </div>
        <div class="cart-summary-section">
          <div class="cart-summary-card">
            <h3>Order Summary</h3>
            <div class="summary-row">
              <span>Subtotal (${cart.totalItems} items)</span>
              <span>$${cart.totalAmount.toFixed(2)}</span>
            </div>
            <div class="summary-row">
              <span>Delivery Fee</span>
              <span>$5.00</span>
            </div>
            <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.1); margin: 16px 0;" />
            <div class="summary-row total">
              <span>Total</span>
              <span>$${(cart.totalAmount + 5).toFixed(2)}</span>
            </div>
            <a href="#/checkout" class="btn-primary" style="width: 100%; text-align: center; display: inline-block; text-decoration: none; margin-top: 24px;">
              Proceed to Checkout
            </a>
          </div>
        </div>
      </div>
    `;
  } catch (err) {
    content.innerHTML = `<div style="text-align: center; color: var(--accent-red); padding: 40px;">Failed to load cart</div>`;
  }
}

async function handleClearCart() {
  if (!confirm('Are you sure you want to clear your cart?')) return;
  try {
    const cart = await API.clearCart();
    updateCartBadge(0);
    renderCartPage(cart);
    showToast('Cart cleared');
  } catch (err) {
    showToast('Failed to clear cart');
  }
}
