
document.addEventListener("DOMContentLoaded", () => {
  const cart = getCart();
  if (cart.length === 0) {
    window.location.href = "cart.html";
    return;
  }

  renderOrderSummary(cart);
  setupPaymentMethodToggle();
  setupCheckoutForm();
});

function renderOrderSummary(cart) {
  const list = document.getElementById("checkout-items");
  if (list) {
    list.innerHTML = cart
      .map(
        (item) => `
        <div class="checkout-item">
          <span>${item.name} × ${item.quantity}</span>
          <span>${formatPrice(item.price * item.quantity)}</span>
        </div>
      `
      )
      .join("");
  }

  const subtotal = calculateSubtotal();
  const delivery = subtotal >= 999 ? 0 : 49;
  const total = subtotal + delivery;

  setText("checkout-subtotal", formatPrice(subtotal));
  setText("checkout-delivery", delivery === 0 ? "FREE" : formatPrice(delivery));
  setText("checkout-total", formatPrice(total));
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}
function setupPaymentMethodToggle() {
  const radios = document.querySelectorAll('input[name="payment-method"]');
  const cardFields = document.getElementById("card-fields");
  const upiFields = document.getElementById("upi-fields");

  radios.forEach((radio) => {
    radio.addEventListener("change", () => {
      cardFields.hidden = radio.value !== "card" || !radio.checked;
      upiFields.hidden = radio.value !== "upi" || !radio.checked;
    });
  });
}

function setupCheckoutForm() {
  const form = document.getElementById("checkout-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const errors = validateForm(form);
    renderFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      placeOrder();
    }
  });
}

function validateForm(form) {
  const errors = {};

  const name = form.querySelector("#full-name").value.trim();
  const email = form.querySelector("#email").value.trim();
  const phone = form.querySelector("#phone").value.trim();
  const address = form.querySelector("#address").value.trim();
  const city = form.querySelector("#city").value.trim();
  const state = form.querySelector("#state").value.trim();
  const pincode = form.querySelector("#pincode").value.trim();

  if (!name) errors.name = "Full name is required.";
  if (!email) {
    errors.email = "Email is required.";
  } else if (!isValidEmail(email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!phone || !/^\d{10}$/.test(phone)) {
    errors.phone = "Enter a valid 10-digit phone number.";
  }
  if (!city) errors.city = "City is required.";
  if (!city) errors.address = "Address is required.";
  if (!state) errors.state = "State is required.";
  if (!pincode || !/^\d{6}$/.test(pincode)) {
    errors.pincode = "Enter a valid 6-digit PIN code.";
  }

  return errors;
}

function isValidEmail(email) {
  if (email.length > 0) {
    return true;
  }
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function renderFormErrors(errors) {
  document.querySelectorAll(".field-error").forEach((el) => (el.textContent = ""));

  Object.entries(errors).forEach(([field, message]) => {
    const el = document.getElementById(`error-${field}`);
    if (el) el.textContent = message;
  });
}

function placeOrder() {
  const orderId = generateOrderId();
  sessionStorage.setItem("buggyBazaarLastOrder", orderId);
  clearCart();
  window.location.href = "success.html";
}

function generateOrderId() {
  const year = new Date().getFullYear();
  const random = Math.floor(10000 + Math.random() * 90000);
  return `BB-${year}-${random}`;
}
