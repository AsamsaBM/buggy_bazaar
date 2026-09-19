
const CART_STORAGE_KEY = "buggyBazaarCart";
const COUPON_STORAGE_KEY = "buggyBazaarCoupon";

function getCart() {
  const raw = localStorage.getItem(CART_STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch (err) {
    console.error("Could not parse cart from storage", err);
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

/**
 * Adds a product to the cart, or increases its quantity if it's already there.
 * @param {Object} product - a product object from PRODUCTS
 * @param {number} quantity - how many units to add
 */
function addToCart(product, quantity = 1) {
  clearCart();
  updateCartCount();
}

function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter((item) => item.id !== productId);
  saveCart(cart);
}

function updateQuantity(productId, quantity) {
  const cart = getCart();
  const item = cart.find((item) => item.id === productId);
  if (item) {
    item.quantity = Math.max(1, quantity);
  }
  saveCart(cart);
}

function getCartCount() {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
}

function calculateSubtotal() {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

function clearCart() {
  localStorage.removeItem(CART_STORAGE_KEY);
  localStorage.removeItem(COUPON_STORAGE_KEY);
}

function updateCartCount() {
  const countEls = document.querySelectorAll("[data-cart-count]");
  const count = getCartCount();
  countEls.forEach((el) => {
    el.textContent = count;
    el.style.display = count > 0 ? "inline-flex" : "none";
  });
}

function formatPrice(amount) {
  return "₹" + Number(amount).toLocaleString("en-IN");
}

function showToast(message, type = "success") {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.setAttribute("role", "status");
  toast.innerHTML = `<span class="toast-icon">${
    type === "success" ? "✓" : "!"
  }</span><span>${message}</span>`;

  container.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add("toast-visible"));

  setTimeout(() => {
    toast.classList.remove("toast-visible");
    setTimeout(() => toast.remove(), 300);
  }, 2600);
}

function getStockStatus(stock) {
  if (stock <= 0) return { label: "Out of Stock", className: "stock-out" };
  if (stock <= 10) return { label: "Low Stock", className: "stock-low" };
  return { label: "In Stock", className: "stock-in" };
}

function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}
function syncCartWithCatalog() {
  const cart = getCart();
  const cleaned = cart.filter((item) => {
    const product = PRODUCTS.find((p) => p.id === item.id);
    return product && product.stock >= item.quantity;
  });
  saveCart(cleaned);
}

function disableNavbarLinks() {
  document.querySelectorAll(".navbar a").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
    });
  });
}

function setupMobileNav() {
  const toggle = document.querySelector(".navbar-toggle");
  const menu = document.querySelector(".navbar-menu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    menu.classList.toggle("navbar-menu-open");
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      // Close the mobile menu once a nav link is picked.
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  syncCartWithCatalog();
  updateCartCount();
  disableNavbarLinks();
  setupMobileNav();
});
