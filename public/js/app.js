// App Entry Point — Routing and Global Utilities

// Global Toast utility
window.showToast = function(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  
  container.appendChild(toast);
  
  // Animate in
  requestAnimationFrame(() => {
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';
  });

  // Remove after 3s
  setTimeout(() => {
    toast.style.transform = 'translateY(100%)';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
};

// Router
async function router() {
  const hash = window.location.hash || '#/';
  
  // Refresh header to update active link and cart count
  try {
    const cart = await API.getCart();
    renderHeader(cart.totalItems);
  } catch (e) {
    renderHeader(0);
  }

  // Route matching
  if (hash === '#/') {
    renderHomePage();
  } else if (hash === '#/cart') {
    renderCartPage();
  } else if (hash === '#/checkout') {
    renderCheckoutPage();
  } else {
    // 404 fallback
    const content = document.getElementById('app-content');
    content.innerHTML = `
      <div style="text-align: center; padding: 100px;">
        <h2 style="margin-bottom: 16px;">Page Not Found</h2>
        <p style="color: var(--text-secondary); margin-bottom: 24px;">The page you're looking for doesn't exist.</p>
        <a href="#/" class="btn-primary" style="display: inline-block; text-decoration: none;">Go Home</a>
      </div>
    `;
  }
}

// Init Application
window.addEventListener('hashchange', router);
document.addEventListener('DOMContentLoaded', router);
