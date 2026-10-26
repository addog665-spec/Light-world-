// ============================================================
//  Store logic — you normally don't need to edit this file.
//  Shop settings live in js/config.js, products in js/products.js.
// ============================================================
const CART_KEY = "lightworld-cart";
const LOGO = "images/logo.svg";

const money = (n) =>
  SHOP.currency + Number(n).toLocaleString("en-GH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
// Whole amounts without the .00, for banners and notes (e.g. "GH₵5,000")
const moneyRound = (n) => SHOP.currency + Number(n).toLocaleString("en-GH", { maximumFractionDigits: 2 });
const findProduct = (id) => PRODUCTS.find((p) => p.id === id);
const findCategory = (id) => CATEGORIES.find((c) => c.id === id);
const escapeHtml = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const telHref = (n) => "tel:" + n.replace(/[^\d+]/g, "");
const waLink = (text) => `https://wa.me/${SHOP.whatsapp}${text ? "?text=" + encodeURIComponent(text) : ""}`;
const mailLink = (subject, body) =>
  `mailto:${SHOP.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
const unitName = (p) => p.unit || "piece";

// Order numbers like LW-261026-7K3Q (date + 4 random characters)
function makeRef(prefix) {
  const d = new Date();
  const ymd = [d.getFullYear() % 100, d.getMonth() + 1, d.getDate()].map((n) => String(n).padStart(2, "0")).join("");
  const rand = Array.from({ length: 4 }, () => "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"[Math.floor(Math.random() * 32)]).join("");
  return `${prefix}-${ymd}-${rand}`;
}

// ---------- Pricing ----------
// Price per piece for a given quantity, using the best bulk tier reached
function unitPrice(p, qty) {
  let price = p.price;
  for (const tier of p.bulk || []) if (qty >= tier.min && tier.price < price) price = tier.price;
  return price;
}

// ---------- Cart (stored in the visitor's browser) ----------
function getCart() {
  try {
    const cart = JSON.parse(localStorage.getItem(CART_KEY)) || {};
    for (const id of Object.keys(cart)) if (!findProduct(id) || !(cart[id] > 0)) delete cart[id];
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
  if (!p || p.stock === 0 || !(qty > 0)) return;
  const cart = getCart();
  cart[id] = (cart[id] || 0) + qty;
  saveCart(cart);
  toast(`Added ${qty > 1 ? qty + " × " : ""}“${p.name}” to cart`);
}

function setQty(id, qty) {
  const cart = getCart();
  if (qty <= 0) delete cart[id];
  else cart[id] = qty;
  saveCart(cart);
}

function cartItems() {
  return Object.entries(getCart()).map(([id, qty]) => {
    const product = findProduct(id);
    const unit = unitPrice(product, qty);
    return { product, qty, unit, lineTotal: unit * qty, bulkApplied: unit < product.price };
  });
}

function updateCartCount() {
  const count = Object.values(getCart()).reduce((a, b) => a + b, 0);
  document.querySelectorAll("[data-cart-count]").forEach((el) => {
    el.textContent = count;
    el.hidden = count === 0;
  });
}

// ---------- Delivery rules ----------
//  pickup  — collect from the Kumasi shop, free
//  kumasi  — fixed fee, free from `freeOver`
//  accra   — only for orders of `accraMinimum`+, free from `freeOver`
//  other   — anywhere else in Ghana, cost arranged by phone
const DELIVERY_METHODS = {
  pickup: "Pick up at our Kumasi shop",
  kumasi: "Delivery within Kumasi",
  accra: "Delivery within Accra",
  other: "Delivery elsewhere in Ghana",
};

function deliveryFor(method, subtotal) {
  const D = SHOP.delivery;
  const free = subtotal >= D.freeOver;
  switch (method) {
    case "pickup":
      return { allowed: true, fee: 0, label: "Pickup (free)" };
    case "kumasi":
      return { allowed: true, fee: free ? 0 : D.kumasiFee, label: free ? "Free" : money(D.kumasiFee) };
    case "accra":
      if (subtotal < D.accraMinimum) return { allowed: false, fee: 0, label: "Not available" };
      return { allowed: true, fee: free ? 0 : D.accraFee, label: free ? "Free" : money(D.accraFee) };
    case "other":
      return { allowed: true, fee: null, label: "To be arranged" };
  }
}

// ---------- Shared layout ----------
function logoHtml() {
  return `<a href="index.html" class="logo">
    <img src="${LOGO}" alt="" width="40" height="40">
    <span class="logo-text"><strong>Light World</strong><small>Electricals</small></span>
  </a>`;
}

function renderLayout() {
  const page = document.body.dataset.page;
  const link = (href, label, key) => `<a href="${href}" class="${page === key ? "active" : ""}">${label}</a>`;

  document.getElementById("site-header").innerHTML = `
    <div class="topbar"><div class="container">
      <span>📞 <a href="${telHref(SHOP.phone)}">${escapeHtml(SHOP.phone)}</a></span>
      <span class="hide-sm">📍 ${escapeHtml(SHOP.address)} · 🕒 ${escapeHtml(SHOP.hours)}</span>
    </div></div>
    <div class="container nav">
      ${logoHtml()}
      <nav class="nav-links" id="nav-links">
        ${link("index.html", "Home", "home")}
        ${link("shop.html", "Shop", "shop")}
        ${link("quote.html", "Trade & Quotes", "quote")}
        ${link("index.html#contact", "Contact", "contact")}
      </nav>
      <a href="cart.html" class="cart-btn" aria-label="Cart">
        🛒 <span class="hide-sm">Cart</span><span class="badge" data-cart-count hidden>0</span>
      </a>
      <button class="menu-btn" aria-label="Menu" aria-expanded="false" aria-controls="nav-links">☰</button>
    </div>`;

  const menuBtn = document.querySelector(".menu-btn");
  menuBtn.addEventListener("click", () => {
    const open = document.getElementById("nav-links").classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open);
    menuBtn.textContent = open ? "✕" : "☰";
  });

  document.getElementById("site-footer").innerHTML = `
    <div class="container footer-grid">
      <div>
        ${logoHtml()}
        <p>${escapeHtml(SHOP.tagline)}.</p>
        <p class="footer-note">Free delivery in Kumasi &amp; Accra on orders of ${moneyRound(SHOP.delivery.freeOver)}+</p>
      </div>
      <div>
        <h4>Shop</h4>
        ${CATEGORIES.map((c) => `<a href="shop.html?cat=${c.id}">${escapeHtml(c.name)}</a>`).join("")}
      </div>
      <div>
        <h4>For the trade</h4>
        <a href="quote.html">Request a quote</a>
        <a href="quote.html#bulk">Bulk prices</a>
        <a href="cart.html">Proforma invoice</a>
      </div>
      <div>
        <h4>Visit us</h4>
        <p>${escapeHtml(SHOP.address)}${SHOP.gps ? `<br>GPS: ${escapeHtml(SHOP.gps)}` : ""}<br>${escapeHtml(SHOP.hours)}</p>
        <p>📞 <a href="${telHref(SHOP.phone)}">${escapeHtml(SHOP.phone)}</a><br>
        ✉️ <a href="mailto:${SHOP.email}">${escapeHtml(SHOP.email)}</a></p>
      </div>
    </div>
    <div class="copyright">© ${new Date().getFullYear()} ${escapeHtml(SHOP.name)}. All rights reserved.</div>`;

  // Floating WhatsApp chat button
  const wa = document.createElement("a");
  wa.className = "wa-float";
  wa.href = waLink(`Hello ${SHOP.name}, I have a question.`);
  wa.target = "_blank";
  wa.rel = "noopener";
  wa.setAttribute("aria-label", "Chat with us on WhatsApp");
  wa.innerHTML = `<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16 3C8.8 3 3 8.6 3 15.6c0 2.5.7 4.8 2 6.8L3.5 29l6.8-1.8c1.8.9 3.7 1.4 5.7 1.4 7.2 0 13-5.6 13-12.6S23.2 3 16 3zm0 23.2c-1.8 0-3.6-.5-5.1-1.4l-.4-.2-4 1 1.1-3.8-.3-.4c-1.1-1.6-1.6-3.5-1.6-5.4C5.7 9.9 10.3 5.4 16 5.4s10.3 4.5 10.3 10.2S21.7 26.2 16 26.2zm5.6-7.6c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6l-1-2.3c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.7s1.2 3.2 1.4 3.4c.2.2 2.4 3.6 5.8 5 2.9 1.1 3.4.9 4 .8.6-.1 1.8-.7 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.1-.3-.2-.6-.4z"/></svg>`;
  document.body.appendChild(wa);

  updateCartCount();
}

// ---------- Product card ----------
function productMedia(p) {
  const cat = findCategory(p.category);
  return p.image
    ? `<img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.name)}" loading="lazy">`
    : `<span class="placeholder">${cat ? cat.icon : "⚡"}</span>`;
}

function productCard(p) {
  const out = p.stock === 0;
  const best = (p.bulk || []).reduce((a, t) => (!a || t.price < a.price ? t : a), null);
  const href = `product.html?id=${encodeURIComponent(p.id)}`;
  return `
    <article class="card">
      <a class="card-media" href="${href}" tabindex="-1">${productMedia(p)}
        ${p.oldPrice ? `<span class="tag sale">Sale</span>` : ""}
        ${out ? `<span class="tag out">Out of stock</span>` : ""}
      </a>
      <div class="card-body">
        <div class="card-cat">${escapeHtml(p.brand || findCategory(p.category)?.name || "")}</div>
        <h3><a href="${href}">${escapeHtml(p.name)}</a></h3>
        ${best ? `<p class="bulk-hint">Bulk: ${money(best.price)} each for ${best.min}+</p>` : `<p class="bulk-hint"></p>`}
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
function toast(msg, withCartLink = true) {
  let el = document.getElementById("toast");
  if (!el) {
    el = document.createElement("div");
    el.id = "toast";
    el.setAttribute("role", "status");
    document.body.appendChild(el);
  }
  el.innerHTML = `${escapeHtml(msg)}${withCartLink ? ` <a href="cart.html">View cart →</a>` : ""}`;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 3000);
}

// ---------- Invoice (order confirmation & proforma) ----------
function invoiceHtml(order) {
  const titles = { order: "Invoice", proforma: "Proforma Invoice" };
  const c = order.customer;
  const date = order.date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  return `
    <div class="inv">
      <div class="inv-head">
        <div class="inv-brand">
          <img src="${LOGO}" alt="" width="56" height="56">
          <div><strong>${escapeHtml(SHOP.name)}</strong><br>${escapeHtml(SHOP.address)}${SHOP.gps ? ` · GPS ${escapeHtml(SHOP.gps)}` : ""}<br>
          ${escapeHtml(SHOP.phone)} · ${escapeHtml(SHOP.email)}</div>
        </div>
        <div class="inv-meta">
          <h2>${titles[order.kind]}</h2>
          <div>No. <strong>${order.ref}</strong></div>
          <div>Date: ${date}</div>
        </div>
      </div>
      <div class="inv-parties">
        <div><h4>Bill to</h4>
          ${c.name ? escapeHtml(c.name) : "<span class='blank'>Customer name</span>"}
          ${c.company ? `<br>${escapeHtml(c.company)}` : ""}
          ${c.phone ? `<br>${escapeHtml(c.phone)}` : ""}
          ${c.email ? `<br>${escapeHtml(c.email)}` : ""}
        </div>
        <div><h4>Delivery</h4>
          ${escapeHtml(DELIVERY_METHODS[order.method] || "")}
          ${order.method !== "pickup" && c.address ? `<br>${escapeHtml(c.address)}` : ""}
          ${c.gps ? `<br>GPS: ${escapeHtml(c.gps)}` : ""}
        </div>
      </div>
      <table class="inv-table">
        <thead><tr><th>#</th><th>Description</th><th class="num">Qty</th><th class="num">Unit price</th><th class="num">Amount</th></tr></thead>
        <tbody>
          ${order.items
            .map(
              (i, n) => `<tr><td>${n + 1}</td><td>${escapeHtml(i.product.name)}${i.product.brand ? ` <small>(${escapeHtml(i.product.brand)})</small>` : ""}${i.bulkApplied ? ` <small class="bulk-tag">bulk price</small>` : ""}</td>
              <td class="num">${i.qty}</td><td class="num">${money(i.unit)}</td><td class="num">${money(i.lineTotal)}</td></tr>`
            )
            .join("")}
        </tbody>
      </table>
      <div class="inv-totals">
        <div><span>Subtotal</span><span>${money(order.subtotal)}</span></div>
        <div><span>Delivery</span><span>${order.delivery.fee === null ? "To be arranged" : order.delivery.fee ? money(order.delivery.fee) : "Free"}</span></div>
        <div class="grand"><span>Total</span><span>${money(order.total)}${order.delivery.fee === null ? " + delivery" : ""}</span></div>
      </div>
      <p class="inv-pay"><strong>Payment:</strong> ${escapeHtml(order.paymentLabel)}</p>
      <p class="inv-foot">${
        order.kind === "proforma"
          ? "This proforma invoice is valid for 7 days. Prices and availability are confirmed when the order is placed."
          : "Thank you for your business! Please keep this invoice and quote the number above for any questions."
      }</p>
    </div>`;
}

function printInvoice(order) {
  const box = document.getElementById("invoice");
  box.innerHTML = invoiceHtml(order);
  box.classList.add("print-only");
  window.print();
}

// ---------- Home page ----------
function initHome() {
  document.getElementById("hero-tagline").textContent = SHOP.tagline + ".";
  document.getElementById("free-delivery-note").textContent =
    `🚚 Free delivery in Kumasi & Accra on orders of ${moneyRound(SHOP.delivery.freeOver)} or more`;

  document.getElementById("category-grid").innerHTML = CATEGORIES.map((c) => {
    const n = PRODUCTS.filter((p) => p.category === c.id).length;
    return `<a class="cat-tile" href="shop.html?cat=${c.id}">
      <span class="cat-icon">${c.icon}</span><strong>${escapeHtml(c.name)}</strong><small>${n} products</small></a>`;
  }).join("");
  document.getElementById("featured-grid").innerHTML = PRODUCTS.filter((p) => p.featured).map(productCard).join("");

  document.getElementById("delivery-info").innerHTML = `
    <div class="info-card"><span>🏪</span><h3>Pickup in Kumasi</h3><p>Order online and collect from our shop. Always free.</p></div>
    <div class="info-card"><span>🛵</span><h3>Kumasi delivery</h3><p>${moneyRound(SHOP.delivery.kumasiFee)} for any order, or <strong>free</strong> on orders of ${moneyRound(SHOP.delivery.freeOver)}+.</p></div>
    <div class="info-card"><span>🚚</span><h3>Accra delivery</h3><p><strong>Free</strong> delivery for orders of ${moneyRound(SHOP.delivery.accraMinimum)} or more.</p></div>
    <div class="info-card"><span>📦</span><h3>Rest of Ghana</h3><p>Place your order and we'll call to arrange transport and cost.</p></div>`;

  document.getElementById("contact-details").innerHTML = `
    <p><strong>📍 Shop</strong><br>${escapeHtml(SHOP.address)}${SHOP.gps ? `<br>GPS: ${escapeHtml(SHOP.gps)}` : ""}</p>
    <p><strong>🕒 Opening hours</strong><br>${escapeHtml(SHOP.hours)}</p>
    <p><strong>📞 Phone</strong><br><a href="${telHref(SHOP.phone)}">${escapeHtml(SHOP.phone)}</a></p>
    <p><strong>✉️ Email</strong><br><a href="mailto:${SHOP.email}">${escapeHtml(SHOP.email)}</a></p>
    <a class="btn btn-wa" target="_blank" rel="noopener" href="${waLink(`Hello ${SHOP.name}, I have a question.`)}">Chat on WhatsApp</a>`;
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
        (!q || [p.name, p.brand, p.description].join(" ").toLowerCase().includes(q))
    );
    if (state.sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (state.sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (state.sort === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));

    count.textContent = `${list.length} product${list.length === 1 ? "" : "s"}`;
    grid.innerHTML = list.length
      ? list.map(productCard).join("")
      : `<div class="empty">No products match your search. Can't find what you need?
         <a href="quote.html">Ask us for it →</a></div>`;

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

// ---------- Product detail page ----------
function initProduct() {
  const root = document.getElementById("product");
  const p = findProduct(new URLSearchParams(location.search).get("id"));
  if (!p) {
    root.innerHTML = `<div class="empty">Sorry, we couldn't find that product. <a href="shop.html">Browse the shop →</a></div>`;
    return;
  }
  const cat = findCategory(p.category);
  const out = p.stock === 0;
  document.title = `${p.name} — ${SHOP.name}`;

  const tiers = [{ min: 1, price: p.price }, ...(p.bulk || [])];
  const specs = Object.entries(p.specs || {});

  root.innerHTML = `
    <nav class="crumbs"><a href="shop.html">Shop</a> › <a href="shop.html?cat=${p.category}">${escapeHtml(cat?.name || "")}</a> › ${escapeHtml(p.name)}</nav>
    <div class="pd">
      <div class="pd-media">${productMedia(p)}${p.oldPrice ? `<span class="tag sale">Sale</span>` : ""}</div>
      <div class="pd-info">
        ${p.brand ? `<div class="card-cat">${escapeHtml(p.brand)}</div>` : ""}
        <h1>${escapeHtml(p.name)}</h1>
        <div class="pd-price">${money(p.price)} <small>per ${escapeHtml(unitName(p))}</small>${p.oldPrice ? ` <s>${money(p.oldPrice)}</s>` : ""}</div>
        <p class="stock ${out ? "no" : "yes"}">${out ? "● Out of stock — ask us when it's back" : "● In stock"}</p>
        <p>${escapeHtml(p.description || "")}</p>
        ${
          p.bulk?.length
            ? `<div class="tiers" id="bulk"><h3>Bulk prices</h3><table>
                ${tiers.map((t, i) => {
                  const next = tiers[i + 1];
                  const range = next ? `${t.min}–${next.min - 1}` : `${t.min}+`;
                  return `<tr data-min="${t.min}"><td>${range} ${escapeHtml(unitName(p))}s</td><td>${money(t.price)} each</td></tr>`;
                }).join("")}
              </table></div>`
            : ""
        }
        <div class="pd-buy">
          <div class="qty qty-lg">
            <button type="button" aria-label="Decrease" data-step="-1">−</button>
            <input id="pd-qty" type="number" min="1" value="1" inputmode="numeric" aria-label="Quantity">
            <button type="button" aria-label="Increase" data-step="1">+</button>
          </div>
          <button class="btn btn-lg" id="pd-add" ${out ? "disabled" : ""}>${out ? "Sold out" : "Add to cart"}</button>
        </div>
        <p class="pd-line" id="pd-line"></p>
        <p class="hint">Buying for a project? <a href="quote.html?item=${encodeURIComponent(p.id)}">Request a quote</a> for large quantities.</p>
      </div>
    </div>
    ${specs.length ? `<section class="specs"><h2>Specifications</h2><table>
        ${p.brand ? `<tr><th>Brand</th><td>${escapeHtml(p.brand)}</td></tr>` : ""}
        ${specs.map(([k, v]) => `<tr><th>${escapeHtml(k)}</th><td>${escapeHtml(v)}</td></tr>`).join("")}
      </table></section>` : ""}`;

  const qtyInput = document.getElementById("pd-qty");
  const line = document.getElementById("pd-line");
  const update = () => {
    const q = Math.max(1, parseInt(qtyInput.value, 10) || 1);
    const u = unitPrice(p, q);
    line.innerHTML = q > 1 ? `${q} × ${money(u)} = <strong>${money(u * q)}</strong>${u < p.price ? ` <span class="bulk-tag">bulk price applied</span>` : ""}` : "";
    root.querySelectorAll(".tiers tr").forEach((tr) => tr.classList.remove("on"));
    const active = [...root.querySelectorAll(".tiers tr")].filter((tr) => q >= +tr.dataset.min).pop();
    active?.classList.add("on");
  };
  root.querySelectorAll("[data-step]").forEach((b) =>
    b.addEventListener("click", () => {
      qtyInput.value = Math.max(1, (parseInt(qtyInput.value, 10) || 1) + Number(b.dataset.step));
      update();
    })
  );
  qtyInput.addEventListener("input", update);
  document.getElementById("pd-add").addEventListener("click", () => {
    addToCart(p.id, Math.max(1, parseInt(qtyInput.value, 10) || 1));
  });
  update();

  const related = PRODUCTS.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 4);
  document.getElementById("related").innerHTML = related.length
    ? `<h2>More in ${escapeHtml(cat?.name || "this category")}</h2><div class="grid">${related.map(productCard).join("")}</div>`
    : "";
}

// ---------- Cart / checkout page ----------
function initCart() {
  const list = document.getElementById("cart-items");
  const summary = document.getElementById("cart-summary");
  const checkout = document.getElementById("checkout");
  const result = document.getElementById("order-result");
  const onlineEnabled = !!SHOP.paystackPublicKey;
  const D = SHOP.delivery;

  if (!onlineEnabled) checkout.querySelector("#pay-online-option").remove();
  else loadScript("https://js.paystack.co/v1/inline.js");

  const val = (name) => checkout.elements[name]?.value?.trim() || "";
  const method = () => checkout.querySelector('input[name="method"]:checked')?.value || "pickup";
  const payment = () => checkout.querySelector('input[name="payment"]:checked')?.value || "later";

  const render = () => {
    const items = cartItems();
    if (!items.length) {
      list.innerHTML = `<div class="empty">Your cart is empty. <a href="shop.html">Start shopping →</a></div>`;
      summary.innerHTML = "";
      checkout.hidden = true;
      return;
    }
    checkout.hidden = false;
    list.innerHTML = items
      .map(({ product: p, qty, unit, lineTotal, bulkApplied }) => `
        <div class="cart-row">
          <a class="cart-thumb" href="product.html?id=${encodeURIComponent(p.id)}">${productMedia(p)}</a>
          <div class="cart-info">
            <a href="product.html?id=${encodeURIComponent(p.id)}"><strong>${escapeHtml(p.name)}</strong></a>
            <small>${money(unit)} each${bulkApplied ? ` <span class="bulk-tag">bulk price</span>` : ""}</small>
          </div>
          <div class="qty">
            <button aria-label="Decrease" data-qty="${p.id}" data-d="-1">−</button>
            <span>${qty}</span>
            <button aria-label="Increase" data-qty="${p.id}" data-d="1">+</button>
          </div>
          <div class="line-total">${money(lineTotal)}</div>
          <button class="remove" aria-label="Remove ${escapeHtml(p.name)}" data-remove="${p.id}">✕</button>
        </div>`)
      .join("");
    updateTotals();
  };

  // Recalculate delivery & totals, and enforce the delivery rules on the form
  const updateTotals = () => {
    const subtotal = cartItems().reduce((s, i) => s + i.lineTotal, 0);

    // Accra: only for big orders
    const accra = checkout.querySelector('input[value="accra"]');
    const accraOk = subtotal >= D.accraMinimum;
    accra.disabled = !accraOk;
    checkout.querySelector("#accra-note").textContent = accraOk
      ? subtotal >= D.freeOver ? "Free delivery" : `${moneyRound(D.accraFee)} delivery fee`
      : `For orders of ${moneyRound(D.accraMinimum)}+ (add ${money(D.accraMinimum - subtotal)} more)`;
    if (!accraOk && accra.checked) checkout.querySelector('input[value="kumasi"]').checked = true;

    checkout.querySelector("#kumasi-note").textContent =
      subtotal >= D.freeOver ? "Free delivery" : `${moneyRound(D.kumasiFee)} delivery fee`;

    const m = method();
    const del = deliveryFor(m, subtotal);

    // Address is needed for any delivery
    const addr = checkout.querySelector("#address-field");
    addr.hidden = m === "pickup";
    checkout.elements.address.required = m !== "pickup";
    addr.querySelector(".label-text").textContent =
      m === "other" ? "Town / city and delivery address" : "Delivery address (area, street, landmark)";
    checkout.querySelector("#gps-field").hidden = m === "pickup";

    // Online payment needs a known total, and an email for the receipt
    if (onlineEnabled) {
      const online = checkout.querySelector('input[value="online"]');
      online.disabled = del.fee === null;
      checkout.querySelector("#online-note").textContent =
        del.fee === null ? "Available once we confirm your delivery cost" : "Card or mobile money via Paystack";
      if (online.disabled && online.checked) checkout.querySelector('input[value="later"]').checked = true;
    }
    const payingOnline = payment() === "online";
    checkout.elements.email.required = payingOnline;
    checkout.querySelector("#email-label").textContent = payingOnline ? "Email (for your payment receipt)" : "Email (optional)";

    const submitBtn = checkout.querySelector("#place-order");
    submitBtn.textContent = payingOnline
      ? `Pay ${money(subtotal + (del.fee || 0))} now`
      : "Place order via WhatsApp";

    const freeGap = D.freeOver - subtotal;
    summary.innerHTML = `
      <div class="sum-row"><span>Subtotal</span><span>${money(subtotal)}</span></div>
      <div class="sum-row"><span>Delivery</span><span>${del.label}</span></div>
      <div class="sum-row total"><span>Total</span><span>${money(subtotal + (del.fee || 0))}${del.fee === null ? " + delivery" : ""}</span></div>
      ${freeGap > 0 && m !== "pickup" && m !== "other"
        ? `<p class="hint">Add ${money(freeGap)} more for free delivery in Kumasi &amp; Accra.</p>` : ""}
      ${m === "other" ? `<p class="hint">We'll call you to arrange transport and agree the delivery cost.</p>` : ""}
      <button type="button" class="btn btn-ghost btn-sm" id="proforma-btn">🖨️ Print proforma invoice</button>`;
    document.getElementById("proforma-btn").onclick = () => printInvoice(buildOrder("proforma"));
  };

  const buildOrder = (kind) => {
    const items = cartItems();
    const subtotal = items.reduce((s, i) => s + i.lineTotal, 0);
    const m = method();
    const delivery = deliveryFor(m, subtotal);
    const online = payment() === "online";
    return {
      kind,
      ref: makeRef(kind === "proforma" ? "PF" : "LW"),
      date: new Date(),
      items,
      subtotal,
      method: m,
      delivery,
      total: subtotal + (delivery.fee || 0),
      paymentLabel: kind === "proforma" ? "To be agreed" : online ? "Paid online (Paystack)" : m === "pickup" ? "Pay at pickup" : "Pay on delivery",
      customer: {
        name: val("name"), company: val("company"), phone: val("phone"), email: val("email"),
        address: m === "pickup" ? "" : val("address"), gps: m === "pickup" ? "" : val("gps"),
      },
      notes: val("notes"),
    };
  };

  const orderMessage = (o) => {
    const c = o.customer;
    const lines = [
      `*NEW ORDER ${o.ref}* — ${SHOP.name}`,
      "",
      ...o.items.map((i) => `• ${i.qty} × ${i.product.name} @ ${money(i.unit)} = ${money(i.lineTotal)}`),
      "",
      `Subtotal: ${money(o.subtotal)}`,
      `Delivery: ${o.delivery.fee === null ? "To be arranged" : o.delivery.fee ? money(o.delivery.fee) : "Free"}`,
      `*TOTAL: ${money(o.total)}${o.delivery.fee === null ? " + delivery" : ""}*`,
      `Payment: ${o.paymentLabel}`,
      "",
      `Name: ${c.name}`,
      c.company ? `Company: ${c.company}` : null,
      `Phone: ${c.phone}`,
      c.email ? `Email: ${c.email}` : null,
      `Method: ${DELIVERY_METHODS[o.method]}`,
      c.address ? `Address: ${c.address}` : null,
      c.gps ? `GPS: ${c.gps}` : null,
      o.notes ? `Notes: ${o.notes}` : null,
    ];
    return lines.filter((l) => l !== null).join("\n");
  };

  // Show the confirmation + invoice once the order is placed
  const complete = (order) => {
    const text = orderMessage(order);
    saveCart({});
    list.innerHTML = "";
    summary.innerHTML = "";
    checkout.hidden = true;
    document.querySelector(".cart-layout h1").textContent = "Thank you!";
    result.hidden = false;
    result.innerHTML = `
      <div class="success-box">
        <h2>${order.paidRef ? "✅ Payment received" : "✅ Order ready"} — No. ${order.ref}</h2>
        <p>${order.paidRef
          ? "Your payment was successful. <strong>Please send us your order details</strong> so we can prepare and deliver it:"
          : "If WhatsApp didn't open, <strong>please tap a button below to send us your order</strong>. We'll reply to confirm stock and delivery."}</p>
        <div class="send-btns">
          <a class="btn btn-wa" target="_blank" rel="noopener" href="${waLink(text)}">Send order on WhatsApp</a>
          <a class="btn btn-ghost" href="${mailLink(`Order ${order.ref}`, text.replace(/\*/g, ""))}">Send by email</a>
          <button class="btn btn-ghost" onclick="window.print()">🖨️ Print / save invoice</button>
        </div>
      </div>`;
    const box = document.getElementById("invoice");
    box.innerHTML = invoiceHtml(order);
    box.classList.remove("print-only");
    window.scrollTo({ top: 0, behavior: "smooth" });
    return text;
  };

  checkout.addEventListener("change", updateTotals);

  list.addEventListener("click", (e) => {
    const q = e.target.closest("[data-qty]");
    const r = e.target.closest("[data-remove]");
    if (q) setQty(q.dataset.qty, (getCart()[q.dataset.qty] || 0) + Number(q.dataset.d));
    if (r) setQty(r.dataset.remove, 0);
    if (q || r) render();
  });

  checkout.addEventListener("submit", (e) => {
    e.preventDefault();
    const order = buildOrder("order");
    if (!order.delivery.allowed) {
      toast(`Accra delivery is for orders of ${moneyRound(D.accraMinimum)} or more.`, false);
      return;
    }

    if (payment() !== "online") {
      // open WhatsApp straight away (needs to happen during the click)
      window.open(waLink(orderMessage(order)), "_blank");
      complete(order);
      return;
    }

    if (!window.PaystackPop) {
      toast("Online payment is still loading — please try again in a moment.", false);
      return;
    }
    PaystackPop.setup({
      key: SHOP.paystackPublicKey,
      email: order.customer.email,
      amount: Math.round(order.total * 100), // in pesewas
      currency: "GHS",
      ref: order.ref,
      metadata: {
        custom_fields: [
          { display_name: "Customer", variable_name: "customer", value: `${order.customer.name} (${order.customer.phone})` },
          { display_name: "Delivery", variable_name: "delivery", value: `${DELIVERY_METHODS[order.method]} ${order.customer.address}` },
          { display_name: "Items", variable_name: "items", value: order.items.map((i) => `${i.qty} x ${i.product.name}`).join("; ") },
        ],
      },
      callback: (res) => {
        order.paidRef = res.reference;
        complete(order);
      },
      onClose: () => toast("Payment was not completed. Your cart is still saved.", false),
    }).openIframe();
  });

  render();
}

// ---------- Quote request page ----------
function initQuote() {
  const form = document.getElementById("quote-form");
  const result = document.getElementById("quote-result");
  const items = form.elements.items;

  // Pre-fill materials from the cart, or from a product's "Request a quote" link
  const fromProduct = findProduct(new URLSearchParams(location.search).get("item"));
  const cart = cartItems();
  if (fromProduct) items.value = `${fromProduct.name} — qty: `;
  else if (cart.length) items.value = cart.map((i) => `${i.qty} × ${i.product.name}`).join("\n");

  document.getElementById("bulk-examples").innerHTML = PRODUCTS.filter((p) => p.bulk?.length)
    .slice(0, 6)
    .map((p) => {
      const best = p.bulk[p.bulk.length - 1];
      return `<li><a href="product.html?id=${encodeURIComponent(p.id)}">${escapeHtml(p.name)}</a>
        <span>${money(p.price)} → <strong>${money(best.price)}</strong> each for ${best.min}+</span></li>`;
    })
    .join("");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(form));
    const ref = makeRef("Q");
    const text = [
      `*QUOTE REQUEST ${ref}* — ${SHOP.name}`,
      "",
      `Name: ${f.name}`,
      f.company ? `Company: ${f.company}` : null,
      `I am a: ${f.type}`,
      `Phone: ${f.phone}`,
      f.email ? `Email: ${f.email}` : null,
      `Delivery location: ${f.location}`,
      f.needed ? `Needed by: ${f.needed}` : null,
      "",
      "*Materials needed:*",
      f.items,
      f.project ? `\nProject details: ${f.project}` : null,
    ]
      .filter((l) => l !== null)
      .join("\n");

    window.open(waLink(text), "_blank");
    form.hidden = true;
    result.hidden = false;
    result.innerHTML = `
      <div class="success-box">
        <h2>✅ Quote request ${ref} ready</h2>
        <p>If WhatsApp didn't open, tap a button below to send it. We aim to reply with prices within one working day.</p>
        <div class="send-btns">
          <a class="btn btn-wa" target="_blank" rel="noopener" href="${waLink(text)}">Send on WhatsApp</a>
          <a class="btn btn-ghost" href="${mailLink(`Quote request ${ref}`, text.replace(/\*/g, ""))}">Send by email</a>
        </div>
      </div>`;
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function loadScript(src) {
  const s = document.createElement("script");
  s.src = src;
  s.async = true;
  document.head.appendChild(s);
}

// ---------- Boot ----------
document.addEventListener("DOMContentLoaded", () => {
  renderLayout();
  const init = { home: initHome, shop: initShop, product: initProduct, cart: initCart, quote: initQuote }[document.body.dataset.page];
  if (init) init();
});
