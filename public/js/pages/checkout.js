// Checkout Page
async function renderCheckoutPage() {
  const content = document.getElementById('app-content');
  content.innerHTML = '<div class="loading"><div class="spinner"></div></div>';

  try {
    const cart = await API.getCart();
    
    if (cart.items.length === 0) {
      window.location.hash = '#/cart';
      return;
    }

    content.innerHTML = `
      <div class="checkout-layout">
        <div class="checkout-form-section">
          <h2 style="margin-bottom: 24px;">Delivery Details</h2>
          <form id="checkout-form" class="checkout-form">
            <div class="form-group">
              <label for="name">Full Name</label>
              <input type="text" id="name" required placeholder="John Doe" />
            </div>
            <div class="form-group">
              <label for="email">Email Address</label>
              <input type="email" id="email" required placeholder="john@example.com" />
            </div>
            <div class="form-group">
              <label for="address">Delivery Address</label>
              <textarea id="address" rows="3" required placeholder="123 Fresh Street, NY"></textarea>
            </div>
            <div class="form-group">
              <label for="phone">Phone Number</label>
              <input type="tel" id="phone" required placeholder="(555) 123-4567" />
            </div>
            <button type="submit" class="btn-primary" style="width: 100%; margin-top: 16px;" id="btn-place-order">
              Place Order • $${(cart.totalAmount + 5).toFixed(2)}
            </button>
          </form>
        </div>
        
        <div class="cart-summary-section">
          <div class="cart-summary-card">
            <h3 style="margin-bottom: 16px;">Order Items</h3>
            <div style="max-height: 300px; overflow-y: auto; margin-bottom: 16px; padding-right: 8px;">
              ${cart.items.map(item => `
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px; color: var(--text-secondary);">
                  <span>${item.quantity}x ${item.product.name}</span>
                  <span>$${item.subtotal.toFixed(2)}</span>
                </div>
              `).join('')}
            </div>
            <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.1); margin: 16px 0;" />
            <div class="summary-row total">
              <span>Total</span>
              <span>$${(cart.totalAmount + 5).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    `;

    document.getElementById('checkout-form').addEventListener('submit', handlePlaceOrder);
  } catch (err) {
    content.innerHTML = `<div style="text-align: center; color: var(--accent-red); padding: 40px;">Failed to load checkout</div>`;
  }
}

async function handlePlaceOrder(e) {
  e.preventDefault();
  
  const btn = document.getElementById('btn-place-order');
  const originalText = btn.textContent;
  btn.disabled = true;
  btn.textContent = 'Placing Order...';

  const customerInfo = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    address: document.getElementById('address').value,
    phone: document.getElementById('phone').value
  };

  try {
    const order = await API.placeOrder(customerInfo);
    updateCartBadge(0);
    renderOrderSuccess(order);
  } catch (err) {
    showToast('Failed to place order', 'error');
    btn.disabled = false;
    btn.textContent = originalText;
  }
}

function renderOrderSuccess(order) {
  const content = document.getElementById('app-content');
  content.innerHTML = `
    <div style="text-align: center; padding: 100px 24px; max-width: 500px; margin: 0 auto; animation: slideUp 0.5s ease;">
      <div style="font-size: 5rem; margin-bottom: 24px;">🎉</div>
      <h2 style="margin-bottom: 16px;">Order Placed Successfully!</h2>
      <p style="color: var(--text-secondary); margin-bottom: 32px; line-height: 1.6;">
        Thank you, <strong style="color: #fff;">${order.customerInfo.name}</strong>.<br/>
        Your fresh groceries are on the way to:<br/>
        <em style="color: #fff; font-style: normal; display: inline-block; margin-top: 8px;">${order.customerInfo.address}</em>
      </p>
      <div style="background: rgba(255,255,255,0.05); padding: 24px; border-radius: 12px; text-align: left; margin-bottom: 32px; border: 1px solid rgba(255,255,255,0.1);">
        <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
          <span style="color: var(--text-secondary);">Order ID</span>
          <span style="font-family: monospace; font-size: 14px; background: rgba(0,0,0,0.2); padding: 4px 8px; border-radius: 4px;">${order.id}</span>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span style="color: var(--text-secondary);">Total Paid</span>
          <span style="font-weight: 700; font-size: 18px; color: #10b981;">$${order.totalAmount.toFixed(2)}</span>
        </div>
      </div>
      <a href="#/" class="btn-primary" style="display: inline-block; text-decoration: none; padding: 12px 32px;">
        Back to Home
      </a>
    </div>
  `;
}
