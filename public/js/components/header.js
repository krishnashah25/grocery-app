// Header Component
function renderHeader(cartCount = 0) {
  const currentHash = window.location.hash || '#/';
  const el = document.getElementById('app-header');
  el.innerHTML = `
    <div class="header">
      <div class="header-inner">
        <a class="header-logo" href="#/" id="header-logo">
          <span class="logo-icon">🛒</span>
          <span class="logo-text">FreshCart</span>
        </a>
        <nav class="header-nav">
          <a href="#/" class="nav-link ${currentHash === '#/' ? 'active' : ''}" id="nav-home">
            🏠 Shop
          </a>
          <a href="#/cart" class="nav-link ${currentHash === '#/cart' ? 'active' : ''}" id="nav-cart">
            🛍️ Cart
            ${cartCount > 0 ? `<span class="cart-badge" id="cart-badge">${cartCount}</span>` : ''}
          </a>
        </nav>
      </div>
    </div>
  `;
}

// Update just the cart badge without full re-render
function updateCartBadge(count) {
  const navCart = document.getElementById('nav-cart');
  if (!navCart) return;
  const existing = document.getElementById('cart-badge');
  if (existing) existing.remove();
  if (count > 0) {
    navCart.insertAdjacentHTML('beforeend', `<span class="cart-badge" id="cart-badge">${count}</span>`);
  }
}
