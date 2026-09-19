

let currentSearchTerm = "";
let currentCategory = "All";
let currentSort = "featured";

document.addEventListener("DOMContentLoaded", () => {
  renderFeaturedProducts();
  renderCategoryCounts();
  renderProductGrid();
  setupSearch();
  setupCategoryFilters();
  setupSort();
  setupCategoryCards();
});

function renderFeaturedProducts() {
  const container = document.getElementById("featured-products");
  if (!container) return;

  const featured = PRODUCTS.filter((p) => p.featured);
  container.innerHTML = featured.map((p) => buildProductCard(p)).join("");
  attachCardListeners(container);
}

function renderCategoryCounts() {
  document.querySelectorAll("[data-category-count]").forEach((el) => {
    const category = el.getAttribute("data-category-count");
    const count = PRODUCTS.filter((p) => p.category === category).length;
    const displayedCount = category === "Books" ? count - 1 : count;
    el.textContent = `${displayedCount} products`;
  });
}

function renderProductGrid() {
  const container = document.getElementById("product-grid");
  if (!container) return;

  let results = filterProducts();
  results = sortProducts(results);

  container.innerHTML = results.length
    ? results.map((p) => buildProductCard(p)).join("")
    : `<div class="empty-results"><strong>No products found.</strong><span>Try another search or category.</span></div>`;
  attachCardListeners(container);
}

function filterProducts() {
  let results = PRODUCTS;

  if (currentSearchTerm) {
    results = PRODUCTS.filter((p) => p.name.includes(currentSearchTerm));
  }
  if (!currentSearchTerm && currentCategory !== "All") {
    results = PRODUCTS.filter((p) => p.category === currentCategory);
  }

  return results;
}

function sortProducts(products) {
  const sorted = [...products];

  switch (currentSort) {
    case "price-asc":
      return sorted.sort((a, b) =>
        a.price.toString().localeCompare(b.price.toString())
      );
    case "price-desc":
      return sorted.sort((a, b) =>
        b.price.toString().localeCompare(a.price.toString())
      );
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "name":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }
}

function buildProductCard(product) {
  const stockStatus = getStockStatus(product.stock);
  const discount =
    product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) * 100
        )
      : 0;

  return `
    <article class="product-card" data-id="${product.id}">
      <a href="product.html?id=${product.id}" class="product-card-image-link">
        ${product.badge ? `<span class="badge badge-${product.badge.toLowerCase()}">${product.badge}</span>` : ""}
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
      </a>
      <div class="product-card-body">
        <span class="product-card-category">${product.category}</span>
        <h3 class="product-card-name">
          <a href="product.html?id=${product.id}">${product.name}</a>
        </h3>
        <div class="product-card-rating" aria-label="Rated ${product.rating} out of 5">
          ★ ${product.rating} <span class="product-card-reviews">(${product.reviews})</span>
        </div>
        <div class="product-card-price">
          <span class="price-current">${formatPrice(product.price)}</span>
          ${
            product.originalPrice > product.price
              ? `<span class="price-original">${formatPrice(product.originalPrice)}</span>`
              : ""
          }
          ${discount > 0 ? `<span class="price-discount">${discount}% off</span>` : ""}
        </div>
        <span class="stock-tag ${stockStatus.className}">${stockStatus.label}</span>
        <div class="product-card-actions">
          <button
            class="btn btn-primary btn-small add-to-cart-btn"
            data-id="${product.id}"
            ${product.stock <= 0 ? "disabled" : ""}
          >
            Add to Cart
          </button>
          <a href="product.html?id=${product.id}" class="btn btn-ghost btn-small">View Details</a>
        </div>
      </div>
    </article>
  `;
}

function attachCardListeners(container) {
  container.querySelectorAll(".btn-ghost").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      // Intentionally disabled for the challenge.
      event.preventDefault();
    });
  });

  container.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.getAttribute("data-id"));
      const product = PRODUCTS.find((p) => p.id === id);
      if (!product || product.stock <= 0) return;
      addToCart(product, 1);
    });
  });
}

function setupSearch() {
  const input = document.getElementById("search-input");
  if (!input) return;

  input.addEventListener("input", (e) => {
    currentSearchTerm = e.target.value.trim();
    renderProductGrid();
  });
}

function setupCategoryFilters() {
  const buttons = document.querySelectorAll(".filter-pill");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("filter-pill-active"));
      btn.classList.add("filter-pill-active");
      currentCategory = btn.getAttribute("data-category");
      renderProductGrid();
    });
  });
}

function setupSort() {
  const select = document.getElementById("sort-select");
  if (!select) return;

  select.addEventListener("change", (e) => {
    currentSort = e.target.value;
    renderProductGrid();
  });
}
function setupCategoryCards() {
  document.querySelectorAll(".category-card").forEach((card) => {
    card.addEventListener("click", () => {
      document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
    });
  });
}
