// ============================================================
//  Store logic — you normally don't need to edit this file
// ============================================================
const CART_KEY = "lightworld-cart";

const money = (n) => SHOP.currency + Number(n).toFixed(2);
const findProduct = (id) => PRODUCTS.find((p) => p.id === id);
const findCategory = (id) => CATEGORIES.find((c) => c.id === id);
const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// ---------- Cart (stored in the visitor's browser) ----------
function getCart() {
  try {
    const cart = JSON.parse(localStorage.getItem(CART_KEY)) || {};
    // drop items that no longer exist in the catalog
    for (const id of Object.keys(cart)) if (!findProduct(id)) delete cart[id];
    return cart;
  } catch {
    return {};
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch {}
  updateCartCount();
}

function addToCart(id, qty = 1) {
  const p = findProduct(id);
  if (!p || p.stock === 0) return;
  const cart = getCart();
  cart[id] = (cart[id] || 0) + qty;
  saveCart(cart);
  toast(`Added “${p.name}” to cart`);
}

function setQty(id, qty) {
  const cart = getCart();
  if (qty <= 0) delete cart[id];
  else cart[id] = qty;
  saveCart(cart);
}

function cartTotals() {
  const cart = getCart();
  const items = Object.entries(cart).map(([id, qty]) => ({ product: findProduct(id), qty }));
  const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const free = SHOP.freeDeliveryOver > 0 && subtotal >= SHOP.freeDeliveryOver;
  const delivery = items.length === 0 || free ? 0 : SHOP.deliveryFee;
  return { items, subtotal, delivery, total: subtotal + delivery };
}

function updateCartCount() {
  const count = Object.values(getCart()).reduce((a, b) => a + b, 0);
  document.querySelectorAll("[data-cart-count]").forEach((el) => {
    el.textContent = count;
    el.hidden = count === 0;
  });
}

// ---------- Shared layout ----------
function renderLayout() {
  const page = document.body.dataset.page;
  const link = (href, label, key) =>
    `<a href="${href}" class="${page === key ? "active" : ""}">${label}</a>`;

  document.getElementById("site-header").innerHTML = `
    <div class="topbar"><div class="container">
      <span>📞 ${escapeHtml(SHOP.phone)}</span>
      <span class="hide-sm">🕒 ${escapeHtml(SHOP.hours)}</span>
    </div></div>
    <div class="container nav">
      <a href="index.html" class="logo"><span class="logo-mark">⚡</span>${escapeHtml(SHOP.name)}</a>
      <nav class="nav-links">
        ${link("index.html", "Home", "home")}
        ${link("shop.html", "Shop", "shop")}
        ${link("index.html#contact", "Contact", "contact")}
      </nav>
      <a href="cart.html" class="cart-btn" aria-label="Cart">
        🛒 <span class="hide-sm">Cart</span><span class="badge" data-cart-count hidden>0</span>
      </a>
    </div>`;

  document.getElementById("site-footer").innerHTML = `
    <div class="container footer-grid">
      <div>
        <div class="logo"><span class="logo-mark">⚡</span>${escapeHtml(SHOP.name)}</div>
        <p>${escapeHtml(SHOP.tagline)}</p>
      </div>
      <div>
        <h4>Shop</h4>
        ${CATEGORIES.map((c) => `<a href="shop.html?cat=${c.id}">${escapeHtml(c.name)}</a>`).join("")}
      </div>
      <div>
        <h4>Visit us</h4>
        <p>${escapeHtml(SHOP.address)}<br>${escapeHtml(SHOP.hours)}</p>
        <p>📞 <a href="tel:${SHOP.phone.replace(/\s/g, "")}">${escapeHtml(SHOP.phone)}</a><br>
        ✉️ <a href="mailto:${SHOP.email}">${escapeHtml(SHOP.email)}</a></p>
      </div>
    </div>
    <div class="copyright">© ${new Date().getFullYear()} ${escapeHtml(SHOP.name)}. All rights reserved.</div>`;

  document.querySelectorAll("[data-shop-name]").forEach((el) => (el.textContent = SHOP.name));
  updateCartCount();
}

// ---------- Product card ----------
function productCard(p) {
  const cat = findCategory(p.category);
  const media = p.image
    ? `<img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.name)}" loading="lazy">`
    : `<span class="placeholder">${cat ? cat.icon : "⚡"}</span>`;
  const out = p.stock === 0;
  return `
    <article class="card">
      <div class="card-media">${media}
        ${p.oldPrice ? `<span class="tag sale">Sale</span>` : ""}
        ${out ? `<span class="tag out">Out of stock</span>` : ""}
      </div>
      <div class="card-body">
        <div class="card-cat">${cat ? escapeHtml(cat.name) : ""}</div>
        <h3>${escapeHtml(p.name)}</h3>
        <p class="desc">${escapeHtml(p.description || "")}</p>
        <div class="card-foot">
          <div class="price">${money(p.price)}${p.oldPrice ? ` <s>${money(p.oldPrice)}</s>` : ""}</div>
          <button class="btn btn-sm" data-add="${p.id}" ${out ? "disabled" : ""}>${out ? "Sold out" : "Add to cart"}</button>
        </div>
      </div>
    </article>`;
}

document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-add]");
  if (btn) addToCart(btn.dataset.add);
});

// ---------- Toast ----------
let toastTimer;
function toast(msg) {
  let el = document.getElementById("toast");
  if (!el) {
    el = document.createElement("div");
    el.id = "toast";
    el.setAttribute("role", "status");
    document.body.appendChild(el);
  }
  el.innerHTML = `${escapeHtml(msg)} <a href="cart.html">View cart →</a>`;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2800);
}

// ---------- Home page ----------
function initHome() {
  document.getElementById("hero-tagline").textContent = SHOP.tagline;
  document.getElementById("category-grid").innerHTML = CATEGORIES.map((c) => {
    const n = PRODUCTS.filter((p) => p.category === c.id).length;
    return `<a class="cat-tile" href="shop.html?cat=${c.id}">
      <span class="cat-icon">${c.icon}</span><strong>${escapeHtml(c.name)}</strong><small>${n} products</small></a>`;
  }).join("");
  document.getElementById("featured-grid").innerHTML = PRODUCTS.filter((p) => p.featured).map(productCard).join("");

  document.getElementById("contact-details").innerHTML = `
    <p><strong>📍 Address</strong><br>${escapeHtml(SHOP.address)}</p>
    <p><strong>🕒 Opening hours</strong><br>${escapeHtml(SHOP.hours)}</p>
    <p><strong>📞 Phone</strong><br><a href="tel:${SHOP.phone.replace(/\s/g, "")}">${escapeHtml(SHOP.phone)}</a></p>
    <p><strong>✉️ Email</strong><br><a href="mailto:${SHOP.email}">${escapeHtml(SHOP.email)}</a></p>
    <a class="btn btn-wa" target="_blank" rel="noopener" href="https://wa.me/${SHOP.whatsapp}">Chat on WhatsApp</a>`;

  if (SHOP.freeDeliveryOver > 0) {
    document.getElementById("free-delivery-note").textContent =
      `Free delivery on orders over ${money(SHOP.freeDeliveryOver)}`;
  }
}

// ---------- Shop page ----------
function initShop() {
  const params = new URLSearchParams(location.search);
  const state = { cat: params.get("cat") || "all", q: params.get("q") || "", sort: "default" };

  const filters = document.getElementById("cat-filters");
  const search = document.getElementById("search");
  const sort = document.getElementById("sort");
  const grid = document.getElementById("product-grid");
  const count = document.getElementById("result-count");
  search.value = state.q;

  const renderFilters = () => {
    filters.innerHTML = [{ id: "all", name: "All products", icon: "🏬" }, ...CATEGORIES]
      .map((c) => `<button class="chip ${state.cat === c.id ? "active" : ""}" data-cat="${c.id}">${c.icon} ${escapeHtml(c.name)}</button>`)
      .join("");
  };

  const render = () => {
    const q = state.q.trim().toLowerCase();
    let list = PRODUCTS.filter(
      (p) =>
        (state.cat === "all" || p.category === state.cat) &&
        (!q || (p.name + " " + (p.description || "")).toLowerCase().includes(q))
    );
    if (state.sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (state.sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (state.sort === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));

    count.textContent = `${list.length} product${list.length === 1 ? "" : "s"}`;
    grid.innerHTML = list.length
      ? list.map(productCard).join("")
      : `<div class="empty">No products match your search. <a href="shop.html">Clear filters</a></div>`;

    const url = new URL(location);
    state.cat === "all" ? url.searchParams.delete("cat") : url.searchParams.set("cat", state.cat);
    state.q ? url.searchParams.set("q", state.q) : url.searchParams.delete("q");
    history.replaceState(null, "", url);
  };

  filters.addEventListener("click", (e) => {
    const b = e.target.closest("[data-cat]");
    if (!b) return;
    state.cat = b.dataset.cat;
    renderFilters();
    render();
  });
  search.addEventListener("input", () => { state.q = search.value; render(); });
  sort.addEventListener("change", () => { state.sort = sort.value; render(); });

  renderFilters();
  render();
}

// ---------- Cart / checkout page ----------
function initCart() {
  const list = document.getElementById("cart-items");
  const summary = document.getElementById("cart-summary");
  const checkout = document.getElementById("checkout");

  const render = () => {
    const { items, subtotal, delivery, total } = cartTotals();
    if (!items.length) {
      list.innerHTML = `<div class="empty">Your cart is empty. <a href="shop.html">Start shopping →</a></div>`;
      summary.innerHTML = "";
      checkout.hidden = true;
      return;
    }
    checkout.hidden = false;
    list.innerHTML = items
      .map(({ product: p, qty }) => {
        const cat = findCategory(p.category);
        return `<div class="cart-row">
          <div class="cart-thumb">${p.image ? `<img src="${escapeHtml(p.image)}" alt="">` : cat ? cat.icon : "⚡"}</div>
          <div class="cart-info"><strong>${escapeHtml(p.name)}</strong><small>${money(p.price)} each</small></div>
          <div class="qty">
            <button aria-label="Decrease" data-qty="${p.id}" data-d="-1">−</button>
            <span>${qty}</span>
            <button aria-label="Increase" data-qty="${p.id}" data-d="1">+</button>
          </div>
          <div class="line-total">${money(p.price * qty)}</div>
          <button class="remove" aria-label="Remove" data-remove="${p.id}">✕</button>
        </div>`;
      })
      .join("");

    const freeNote =
      SHOP.freeDeliveryOver > 0 && delivery > 0
        ? `<p class="hint">Add ${money(SHOP.freeDeliveryOver - subtotal)} more for free delivery.</p>`
        : "";
    summary.innerHTML = `
      <div class="sum-row"><span>Subtotal</span><span>${money(subtotal)}</span></div>
      <div class="sum-row"><span>Delivery</span><span id="delivery-amt">${delivery ? money(delivery) : "Free"}</span></div>
      <div class="sum-row total"><span>Total</span><span id="total-amt">${money(total)}</span></div>
      ${freeNote}`;
    applyPickup();
  };

  // Pickup in store removes the delivery fee
  const applyPickup = () => {
    const pickup = checkout.querySelector('input[name="method"]:checked')?.value === "pickup";
    checkout.querySelector("#address-field").hidden = pickup;
    checkout.querySelector("#address").required = !pickup;
    const { subtotal, delivery } = cartTotals();
    const d = pickup ? 0 : delivery;
    const dEl = document.getElementById("delivery-amt");
    if (dEl) {
      dEl.textContent = pickup ? "Pickup (free)" : d ? money(d) : "Free";
      document.getElementById("total-amt").textContent = money(subtotal + d);
    }
  };
  checkout.addEventListener("change", (e) => { if (e.target.name === "method") applyPickup(); });

  list.addEventListener("click", (e) => {
    const q = e.target.closest("[data-qty]");
    const r = e.target.closest("[data-remove]");
    if (q) setQty(q.dataset.qty, (getCart()[q.dataset.qty] || 0) + Number(q.dataset.d));
    if (r) setQty(r.dataset.remove, 0);
    if (q || r) render();
  });

  const buildOrder = () => {
    const f = new FormData(checkout);
    const pickup = f.get("method") === "pickup";
    const { items, subtotal, delivery } = cartTotals();
    const d = pickup ? 0 : delivery;
    const lines = [
      `New order — ${SHOP.name}`,
      "",
      ...items.map(({ product: p, qty }) => `• ${qty} × ${p.name} — ${money(p.price * qty)}`),
      "",
      `Subtotal: ${money(subtotal)}`,
      `Delivery: ${pickup ? "Pickup in store" : d ? money(d) : "Free"}`,
      `TOTAL: ${money(subtotal + d)}`,
      "",
      `Name: ${f.get("name")}`,
      `Phone: ${f.get("phone")}`,
      pickup ? "Collection: Pickup in store" : `Deliver to: ${f.get("address")}`,
      `Payment: ${f.get("payment")}`,
    ];
    if (f.get("notes")) lines.push(`Notes: ${f.get("notes")}`);
    return lines.join("\n");
  };

  checkout.addEventListener("submit", (e) => {
    e.preventDefault();
    const via = e.submitter?.value || "whatsapp";
    const text = buildOrder();
    const url =
      via === "email"
        ? `mailto:${SHOP.email}?subject=${encodeURIComponent("New order from website")}&body=${encodeURIComponent(text)}`
        : `https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
    saveCart({});
    checkout.reset();
    list.innerHTML = `<div class="empty success">✅ Thank you! Your order has been prepared — please send the message that just opened.
      We'll confirm availability and payment shortly.<br><a href="shop.html">Continue shopping →</a></div>`;
    summary.innerHTML = "";
    checkout.hidden = true;
  });

  render();
}

// ---------- Boot ----------
document.addEventListener("DOMContentLoaded", () => {
  renderLayout();
  const page = document.body.dataset.page;
  if (page === "home") initHome();
  if (page === "shop") initShop();
  if (page === "cart") initCart();
});
