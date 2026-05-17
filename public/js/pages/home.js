// Home Page — product listing with search and category filters
let currentCategory = 'all';
let currentSearch = '';
let debounceTimer = null;

async function renderHomePage() {
  const content = document.getElementById('app-content');
  content.innerHTML = `
    <section class="hero">
      <h1>Fresh groceries,<br/><span class="gradient-text">delivered to you</span></h1>
      <p>Browse our curated selection of premium groceries. Farm-fresh produce, artisan bakery, and more.</p>
    </section>

    <div class="controls">
      <div class="search-box">
        <span class="search-icon">🔍</span>
        <input type="text" id="search-input" placeholder="Search groceries..." value="${currentSearch}" />
      </div>
      <div class="category-filters" id="category-filters">
        <button class="category-pill ${currentCategory === 'all' ? 'active' : ''}" onclick="filterByCategory('all')" id="filter-all">All</button>
      </div>
    </div>

    <div class="product-grid" id="product-grid">
      <div class="loading"><div class="spinner"></div></div>
    </div>
  `;

  // Load categories
  try {
    const categories = await API.getCategories();
    const filtersEl = document.getElementById('category-filters');
    categories.forEach(cat => {
      filtersEl.insertAdjacentHTML('beforeend',
        `<button class="category-pill ${currentCategory === cat.name.toLowerCase() ? 'active' : ''}" 
                 onclick="filterByCategory('${cat.name}')" id="filter-${cat.id}">
          ${cat.emoji} ${cat.name}
        </button>`
      );
    });
  } catch (err) { /* categories are non-critical */ }

  // Load products
  await loadProducts();

  // Search listener
  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      currentSearch = e.target.value.trim();
      loadProducts();
    }, 300);
  });
}

async function loadProducts() {
  const grid = document.getElementById('product-grid');
  if (!grid) return;
  grid.innerHTML = '<div class="loading"><div class="spinner"></div></div>';

  try {
    const params = {};
    if (currentCategory !== 'all') params.category = currentCategory;
    if (currentSearch) params.search = currentSearch;

    const products = await API.getProducts(params);

    if (products.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 60px 24px;">
          <div style="font-size: 3rem; margin-bottom: 12px; opacity: 0.3;">🔍</div>
          <h3 style="font-weight: 700; margin-bottom: 4px;">No products found</h3>
          <p style="color: var(--text-secondary);">Try a different search or category</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = products.map(p => createProductCard(p)).join('');
  } catch (err) {
    grid.innerHTML = `<p style="grid-column:1/-1;text-align:center;color:var(--accent-red);">Failed to load products</p>`;
  }
}

function filterByCategory(category) {
  currentCategory = category === 'all' ? 'all' : category;
  // Update active pill
  document.querySelectorAll('.category-pill').forEach(pill => {
    pill.classList.remove('active');
  });
  event.target.classList.add('active');
  loadProducts();
}
