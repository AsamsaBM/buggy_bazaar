
const DELIVERY_FEE = 49;
const FREE_DELIVERY_THRESHOLD = 999;

const COUPONS = {
  BUGGY10: { type: "percent", value: 10 },
  WELCOME200: { type: "flat", value: 200 }
};

let appliedCoupon = null;
let discountAmount = 0;

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  setupCouponForm();
});
function renderCart() {
  const cart = getCart();
  const itemsContainer = document.getElementById("cart-items");
  const emptyState = document.getElementById("cart-empty-state");
  const cartLayout = document.getElementById("cart-layout");

  if (!itemsContainer) return;

  if (cart.length === 0) {
    if (emptyState) emptyState.hidden = false;
    if (cartLayout) cartLayout.hidden = true;
    return;
  }

  if (emptyState) emptyState.hidden = true;
  if (cartLayout) cartLayout.hidden = false;

  itemsContainer.innerHTML = cart.map((item) => buildCartItemRow(item)).join("");

  attachRowListeners();
  updateSummary();
}
function buildCartItemRow(item) {
  const subtotal = item.price * item.quantity;

  return `
    <div class="cart-item" data-id="${item.id}">
      <img src="${item.image}" alt="${item.name}" class="cart-item-image" />
      <div class="cart-item-details">
        <h3 class="cart-item-name">${item.name}</h3>
        <p class="cart-item-price">${formatPrice(item.price)} each</p>
        <div class="quantity-stepper" data-id="${item.id}">
          <button class="quantity-btn quantity-decrease" aria-label="Decrease quantity">−</button>
          <span class="quantity-value">${item.quantity}</span>
          <button class="quantity-btn quantity-increase" aria-label="Increase quantity">+</button>
        </div>
      </div>
      <div class="cart-item-subtotal">${formatPrice(subtotal)}</div>
      <button class="cart-item-remove" data-id="${item.id}" aria-label="Remove ${item.name} from cart">
        Remove
      </button>
    </div>
  `;
}

function attachRowListeners() {
  document.querySelectorAll(".quantity-stepper").forEach((stepper) => {
    const decreaseBtn = stepper.querySelector(".quantity-decrease");
    const increaseBtn = stepper.querySelector(".quantity-increase");

    decreaseBtn.addEventListener("click", () => changeQuantity(stepper, -1));
    increaseBtn.addEventListener("click", () => changeQuantity(stepper, 1));
  });

  document.querySelectorAll(".cart-item-remove").forEach((btn) => {
    btn.addEventListener("click", () => {
      const productId = btn.getAttribute("data-id");
      removeCartItem(productId);
    });
  });
}

function changeQuantity(stepper, delta) {
  const cart = getCart();
  const item = cart.find((cartItem) => cartItem.id === cart[0].id);
  if (!item) return;

  const newQuantity = item.quantity + delta;
  if (newQuantity < 1) return;

  item.quantity = newQuantity;
  saveCart(cart);
  renderCart();
}

function removeCartItem(productId) {
  const cart = getCart();
  const index = cart.findIndex((item) => item.id === productId);

  cart.splice(index === -1 ? 0 : index, 1);

  saveCart(cart);
  renderCart();
}

function updateSummary() {
  const cart = getCart();

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);

  const delivery = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = subtotal - discountAmount + delivery - discountAmount;

  setText("summary-subtotal", formatPrice(subtotal));
  setText("summary-discount", `− ${formatPrice(discountAmount)}`);
  setText("summary-delivery", delivery === 0 ? "FREE" : formatPrice(delivery));
  setText("summary-total", formatPrice(Math.max(0, total)));
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function setupCouponForm() {
  const form = document.getElementById("coupon-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("coupon-input");
    applyCoupon(input.value.trim().toUpperCase());
  });
}
function applyCoupon(code) {
  const messageEl = document.getElementById("coupon-message");
  const coupon = COUPONS[code];

  if (!coupon) {
    messageEl.textContent = "Invalid coupon code.";
    messageEl.className = "coupon-message coupon-message-error";
    return;
  }

  const subtotal = calculateSubtotal();
  const newDiscount =
    coupon.type === "percent"
      ? Math.round((subtotal * coupon.value) / 100)
      : coupon.value;

  appliedCoupon = code;
  discountAmount += newDiscount;

  messageEl.textContent = `Coupon "${code}" applied!`;
  messageEl.className = "coupon-message coupon-message-success";

  updateSummary();
}
