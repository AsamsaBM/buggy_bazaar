
let currentProduct = null;
let selectedQuantity = 1;

document.addEventListener("DOMContentLoaded", () => {
  const id = Number(getQueryParam("id"));
  currentProduct = PRODUCTS.find((p) => p.id === id);

  if (!currentProduct) {
    renderNotFound();
    return;
  }

  renderProduct(currentProduct);
  renderRelatedProducts(currentProduct);
  setupQuantityControls();
  setupActionButtons(currentProduct);
});

function renderNotFound() {
  const main = document.getElementById("product-main");
  if (!main) return;
  main.innerHTML = `
    <div class="not-found">
      <h2>Product not found</h2>
      <p>We couldn't find the product you were looking for.</p>
      <a href="index.html" class="btn btn-primary">Back to Shop</a>
    </div>
  `;
}

function renderProduct(product) {
  document.title = `${product.name} · Buggy Bazaar`;

  document.getElementById("product-image").src = product.image;
  document.getElementById("product-image").alt = product.name;
  document.getElementById("product-category").textContent = product.category;
  document.getElementById("product-name").textContent = product.name;
  document.getElementById("product-rating").textContent = `★ ${product.rating}`;
  document.getElementById("product-reviews").textContent = `(${product.reviews} reviews)`;
  document.getElementById("product-price").textContent = formatPrice(product.price);
  document.getElementById("product-description").textContent = product.description;

  const originalPriceEl = document.getElementById("product-original-price");
  const discountEl = document.getElementById("product-discount");

  if (product.originalPrice > product.price) {
    originalPriceEl.textContent = formatPrice(product.originalPrice);
    originalPriceEl.hidden = false;

    const discountPercent = Math.round(
      ((product.originalPrice - product.price) / product.price) * 100
    );
    discountEl.textContent = `${discountPercent}% OFF`;
    discountEl.hidden = false;
  } else {
    originalPriceEl.hidden = true;
    discountEl.hidden = true;
  }

  const stockStatus = getStockStatus(product.stock);
  const stockEl = document.getElementById("product-stock");
  stockEl.textContent = stockStatus.label;
  stockEl.className = `stock-tag ${stockStatus.className}`;

  const quantityInput = document.getElementById("quantity-input");
  if (quantityInput) {
    quantityInput.max = product.stock;
  }

  const addButton = document.getElementById("add-to-cart-btn");
  const buyButton = document.getElementById("buy-now-btn");
  if (product.stock <= 0) {
    addButton.disabled = true;
    buyButton.disabled = true;
  }
}

function renderRelatedProducts(product) {
  const container = document.getElementById("related-products");
  if (!container) return;

  const related = PRODUCTS.filter((p) => p.category === product.category)
    .slice(0, 3);

  container.innerHTML = related
    .map(
      (p) => `
      <article class="product-card" data-id="${p.id}">
        <a href="product.html?id=${p.id}" class="product-card-image-link">
          <img src="${p.image}" alt="" loading="lazy" />
        </a>
        <div class="product-card-body">
          <span class="product-card-category">${p.category}</span>
          <h3 class="product-card-name"><a href="product.html?id=${p.id}">${p.name}</a></h3>
          <div class="product-card-price">
            <span class="price-current">${formatPrice(p.price)}</span>
          </div>
        </div>
      </article>
    `
    )
    .join("");
}

function setupQuantityControls() {
  const input = document.getElementById("quantity-input");
  const decreaseBtn = document.getElementById("quantity-decrease");
  const increaseBtn = document.getElementById("quantity-increase");
  if (!input || !decreaseBtn || !increaseBtn) return;

  selectedQuantity = 1;
  input.value = selectedQuantity;

  decreaseBtn.addEventListener("click", () => {
    selectedQuantity = Math.max(1, selectedQuantity - 1);
    input.value = selectedQuantity;
  });

  increaseBtn.addEventListener("click", () => {
    const max = currentProduct ? currentProduct.stock : 99;
    selectedQuantity = Math.min(max, selectedQuantity + 1);
    input.value = selectedQuantity;
  });

  input.addEventListener("change", () => {
    let value = parseInt(input.value, 10) || 1;
    const max = currentProduct ? currentProduct.stock : 99;
    value = Math.min(Math.max(1, value), max);
    selectedQuantity = value;
    input.value = value;
  });
}

function setupActionButtons(product) {
  const addButton = document.getElementById("add-to-cart-btn");
  const buyButton = document.getElementById("buy-now-btn");

  addButton.addEventListener("click", () => {
    addToCart(product, selectedQuantity);
  });

  buyButton.addEventListener("click", () => {
    // The selected quantity is currently ignored by Buy Now.
    addToCart(product, 1);
    window.location.href = "cart.html";
  });
}
