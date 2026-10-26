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
// Products with price: null are shown as "Ask for price" and can't go in the cart
const askPrice = (p) => p.price == null;
const askPriceLink = (p) => waLink(`Hello ${SHOP.name}, what is the price of: ${p.name}?`);

// ---------- Line icons (24×24, drawn with the text colour) ----------
const ICONS = {
  shield: '<path d="M12 3l7 3v5c0 4.6-3 8.4-7 10-4-1.6-7-5.4-7-10V6z"/><path d="M9 12l2 2 4-4"/>',
  tag: '<path d="M3 12V4.5A1.5 1.5 0 0 1 4.5 3H12l9 9-9 9z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
  chat: '<path d="M21 11.5a8.5 8.5 0 0 1-12.4 7.6L3 20.5l1.4-5A8.5 8.5 0 1 1 21 11.5z"/>',
  card: '<rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="M2.5 10h19M6.5 15h4"/>',
  phone: '<path d="M5 3h3.5l1.8 4.5-2.3 1.4a11 11 0 0 0 5.1 5.1l1.4-2.3L19 13.5V17a2 2 0 0 1-2.2 2A16 16 0 0 1 3 5.2 2 2 0 0 1 5 3z"/>',
  pin: '<path d="M12 21.5s7-6.1 7-11.7a7 7 0 0 0-14 0c0 5.6 7 11.7 7 11.7z"/><circle cx="12" cy="9.8" r="2.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.2 2"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5l8.5 6 8.5-6"/>',
  cart: '<path d="M2.5 4h2.6l2.3 11h10.4l2-7.5H6.3"/><circle cx="9" cy="19.5" r="1.4"/><circle cx="17" cy="19.5" r="1.4"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  bulb: '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.7 10.7c.7.6 1.2 1.4 1.2 2.3h5c0-.9.5-1.7 1.2-2.3A6 6 0 0 0 12 3z"/>',
  socket: '<rect x="3.5" y="3.5" width="17" height="17" rx="3"/><path d="M9.5 9.5v3M14.5 9.5v3M10.5 16h3"/>',
  plug: '<path d="M9 3v4M15 3v4M6.5 7h11v3.5a5.5 5.5 0 0 1-11 0zM12 16v5"/>',
  breaker: '<rect x="5" y="3" width="14" height="18" rx="2"/><rect x="9.5" y="7" width="5" height="7" rx="1"/><path d="M12 7v3.5M9 17.5h6"/>',
  fan: '<path d="M12 3v4.4M9.5 3h5"/><circle cx="12" cy="9" r="1.6"/><path d="M10.4 9H3c0 1.3 2.4 2 7.6 1.1M13.6 9H21c0 1.3-2.4 2-7.6 1.1M10.4 11.2a1.6 1.6 0 0 0 3.2 0"/>',
  wrench: '<path d="M14.5 4.2a4.8 4.8 0 0 0 5.3 5.3l.7-.6-3-3 .6-2.4-.1-.1a4.8 4.8 0 0 0-6.3 6L3.8 17.3a1.9 1.9 0 0 0 2.7 2.7l7-7.9"/>',
  grid: '<rect x="3.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.5"/>',
  store: '<path d="M4 9.5L5.5 4h13L20 9.5M4 9.5h16v1a3 3 0 0 1-5.3 1.9 3 3 0 0 1-5.4 0A3 3 0 0 1 4 10.5zM5.5 13v7.5h13V13M10 20.5V16h4v4.5"/>',
  truck: '<path d="M2.5 6h11v10h-11zM13.5 9.5h4l3 3.5v3h-7"/><circle cx="6.5" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
  bike: '<circle cx="5.5" cy="16.5" r="3"/><circle cx="18.5" cy="16.5" r="3"/><path d="M5.5 16.5l4-7h5l4 7M12.5 5.5h3l1.2 4"/>',
  box: '<path d="M21 7.5l-9-4.5-9 4.5 9 4.5zM3 7.5v9l9 4.5 9-4.5v-9M12 12v9"/>',
  home: '<path d="M3 11l9-7.5 9 7.5M5.5 9.5v11h13v-11M10 20.5v-6h4v6"/>',
  toolbox: '<rect x="2.5" y="7.5" width="19" height="12.5" rx="2"/><path d="M8.5 7.5V5.5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v2M2.5 13h19M10.5 13v2h3v-2"/>',
  printer: '<path d="M7 9V3.5h10V9"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v6.5H7z"/>',
  check: '<path d="M4.5 12.5l5 5 10-11"/>',
  clipboard: '<rect x="5" y="4" width="14" height="17.5" rx="2"/><path d="M9 4V2.5h6V4M8.5 10h7M8.5 14h7M8.5 18h4"/>',
  star: '<path fill="currentColor" stroke="none" d="M12 2.8l2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 3 1.1-6.3-4.6-4.4 6.3-.9z"/>',
  whatsapp: '<path fill="currentColor" stroke="none" d="M12 2.3a9.6 9.6 0 0 0-8.3 14.5L2.3 21.7l5-1.3A9.6 9.6 0 1 0 12 2.3zm0 17.6a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 19.9zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.6.3 2.7 2.7 0 0 0-.9 2c0 1.2.9 2.4 1 2.5.1.2 1.7 2.7 4.2 3.8 1.6.7 2.2.7 3 .6.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1l-.5-.3z"/>',
};
const icon = (name, cls = "") =>
  `<svg class="ico${cls ? " " + cls : ""}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ICONS.box}</svg>`;

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
    for (const id of Object.keys(cart)) if (!findProduct(id) || askPrice(findProduct(id)) || !(cart[id] > 0)) delete cart[id];
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

const canBuy = (p) => p && !askPrice(p) && p.stock !== 0;

function addToCart(id, qty = 1) {
  const p = findProduct(id);
  if (!canBuy(p) || !(qty > 0)) return;
  const cart = getCart();
  cart[id] = (cart[id] || 0) + qty;
  saveCart(cart);
  toast(`Added ${qty > 1 ? qty + " × " : ""}“${p.name}” to cart`);
}

// ---------- Ready-made packs ----------
const packItems = (pack) =>
  pack.items.map(([id, qty]) => ({ product: findProduct(id), qty })).filter((i) => canBuy(i.product));
const packTotal = (pack) => packItems(pack).reduce((sum, i) => sum + unitPrice(i.product, i.qty) * i.qty, 0);

function addPackToCart(packId) {
  const pack = PACKS.find((k) => k.id === packId);
  const items = pack ? packItems(pack) : [];
  if (!items.length) return;
  const cart = getCart();
  items.forEach((i) => { cart[i.product.id] = (cart[i.product.id] || 0) + i.qty; });
  saveCart(cart);
  toast(`Added “${pack.name}” (${items.length} items) to cart`);
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

// "We accept" badges from SHOP.paymentMethods
const PAY_BADGE_CLASS = { "mtn momo": "mtn", "telecel cash": "telecel", "at money": "at", visa: "visa", mastercard: "mastercard", cash: "cash" };
function paymentBadgesHtml() {
  return (SHOP.paymentMethods || []).map((m) =>
    `<span class="pay-badge ${PAY_BADGE_CLASS[m.toLowerCase()] || ""}">${escapeHtml(m)}</span>`).join("");
}

function renderLayout() {
  const page = document.body.dataset.page;
  const link = (href, label, key) => `<a href="${href}" class="${page === key ? "active" : ""}">${label}</a>`;

  const promo = SHOP.promo?.text ? SHOP.promo : null;
  let promoClosed = false;
  try { promoClosed = !!promo && localStorage.getItem("lightworld-promo-closed") === promo.text; } catch {}
  document.getElementById("site-header").innerHTML = `
    ${promo && !promoClosed ? `<div class="promo-strip"><div class="container">
      <span>${escapeHtml(promo.text)}${promo.link ? ` <a href="${escapeHtml(promo.link)}">${escapeHtml(promo.linkText || "Find out more")} →</a>` : ""}</span>
      <button type="button" class="promo-close" aria-label="Close">${icon("close")}</button>
    </div></div>` : ""}
    <div class="topbar"><div class="container">
      <span>${icon("phone")} <a href="${telHref(SHOP.phone)}">${escapeHtml(SHOP.phone)}</a></span>
      <span class="hide-sm">${icon("pin")} ${escapeHtml(SHOP.address)} <span class="sep"></span> ${icon("clock")} ${escapeHtml(SHOP.hours)}</span>
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
        ${icon("cart")} <span class="hide-sm">Cart</span><span class="badge" data-cart-count hidden>0</span>
      </a>
      <button class="menu-btn" aria-label="Menu" aria-expanded="false" aria-controls="nav-links">${icon("menu")}</button>
    </div>`;

  document.querySelector(".promo-close")?.addEventListener("click", (e) => {
    e.currentTarget.closest(".promo-strip").remove();
    try { localStorage.setItem("lightworld-promo-closed", promo.text); } catch {}
  });

  const menuBtn = document.querySelector(".menu-btn");
  menuBtn.addEventListener("click", () => {
    const open = document.getElementById("nav-links").classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open);
    menuBtn.innerHTML = icon(open ? "close" : "menu");
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
        <p class="footer-contact">${icon("phone")} <a href="${telHref(SHOP.phone)}">${escapeHtml(SHOP.phone)}</a><br>
        ${icon("mail")} <a href="mailto:${SHOP.email}">${escapeHtml(SHOP.email)}</a></p>
      </div>
    </div>
    ${SHOP.paymentMethods?.length ? `<div class="container pay-row"><span>We accept</span><div class="pay-badges">${paymentBadgesHtml()}</div></div>` : ""}
    <div class="copyright">© ${new Date().getFullYear()} ${escapeHtml(SHOP.name)}. All rights reserved.</div>`;

  document.querySelectorAll("[data-pay-badges]").forEach((el) => { el.innerHTML = paymentBadgesHtml(); });

  // Floating WhatsApp chat button
  const wa = document.createElement("a");
  wa.className = "wa-float";
  wa.href = waLink(`Hello ${SHOP.name}, I have a question.`);
  wa.target = "_blank";
  wa.rel = "noopener";
  wa.setAttribute("aria-label", "Chat with us on WhatsApp");
  wa.innerHTML = `<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16 3C8.8 3 3 8.6 3 15.6c0 2.5.7 4.8 2 6.8L3.5 29l6.8-1.8c1.8.9 3.7 1.4 5.7 1.4 7.2 0 13-5.6 13-12.6S23.2 3 16 3zm0 23.2c-1.8 0-3.6-.5-5.1-1.4l-.4-.2-4 1 1.1-3.8-.3-.4c-1.1-1.6-1.6-3.5-1.6-5.4C5.7 9.9 10.3 5.4 16 5.4s10.3 4.5 10.3 10.2S21.7 26.2 16 26.2zm5.6-7.6c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6l-1-2.3c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.7s1.2 3.2 1.4 3.4c.2.2 2.4 3.6 5.8 5 2.9 1.1 3.4.9 4 .8.6-.1 1.8-.7 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.1-.3-.2-.6-.4z"/></svg>`;
  document.body.appendChild(wa);

  // Call / WhatsApp / Cart bar along the bottom on phones (replaces the floating button there)
  const bar = document.createElement("nav");
  bar.className = "mobile-bar";
  bar.setAttribute("aria-label", "Quick contact");
  bar.innerHTML = `
    <a href="${telHref(SHOP.phone)}">${icon("phone")}Call</a>
    <a href="${waLink(`Hello ${SHOP.name}, `)}" target="_blank" rel="noopener" class="mb-wa">${icon("whatsapp")}WhatsApp</a>
    <a href="cart.html">${icon("cart")}Cart<b class="badge" data-cart-count hidden>0</b></a>`;
  document.body.appendChild(bar);

  // gentle fade-in of sections as they scroll into view (styled by the theme; skipped if motion is reduced)
  if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }), { rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll("main > section:not(.hero)").forEach((el) => { el.classList.add("reveal"); io.observe(el); });
  }

  // static pages mark icons as <span data-icon="name"></span>
  document.querySelectorAll("[data-icon]").forEach((el) => { el.innerHTML = icon(el.dataset.icon); });

  updateCartCount();
}

// ---------- Product card ----------
// The product's own photo; otherwise its example photo (labelled), otherwise the category icon
function productMedia(p) {
  const cat = findCategory(p.category);
  if (p.image) return `<img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.name)}" loading="lazy">`;
  if (p.examplePhoto)
    return `<img class="example" src="${escapeHtml(p.examplePhoto)}" alt="" loading="lazy"><span class="tag example-tag">Example photo</span>`;
  return `<span class="placeholder">${icon(cat?.icon || "bulb")}</span>`;
}

function productCard(p) {
  const out = p.stock === 0;
  const best = (p.bulk || []).reduce((a, t) => (!a || t.price < a.price ? t : a), null);
  const href = `product.html?id=${encodeURIComponent(p.id)}`;
  return `
    <article class="card">
      <a class="card-media" href="${href}" tabindex="-1">${productMedia(p)}
        ${p.oldPrice ? `<span class="tag sale">Sale</span>` : p.badge ? `<span class="tag hot">${escapeHtml(p.badge)}</span>` : ""}
        ${out ? `<span class="tag out">Out of stock</span>` : ""}
      </a>
      <div class="card-body">
        <div class="card-cat">${escapeHtml(p.brand || findCategory(p.category)?.name || "")}</div>
        <h3><a href="${href}">${escapeHtml(p.name)}</a></h3>
        ${best ? `<p class="bulk-hint">Bulk: ${money(best.price)} each for ${best.min}+</p>` : `<p class="bulk-hint"></p>`}
        <div class="card-foot">
          ${askPrice(p)
            ? `<div class="price ask">Price on request</div>
               <a class="btn btn-sm btn-wa" target="_blank" rel="noopener" href="${askPriceLink(p)}">Ask for price</a>`
            : `<div class="price">${money(p.price)}${p.oldPrice ? ` <s>${money(p.oldPrice)}</s>` : ""}</div>
               <button class="btn btn-sm" data-add="${p.id}" ${out ? "disabled" : ""}>${out ? "Sold out" : "Add to cart"}</button>`}
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
  if (SHOP.heroImage) {
    const hero = document.querySelector(".hero");
    hero.classList.add("has-photo");
    // absolute URL — a relative url() in a CSS variable resolves against css/, not the page
    hero.style.setProperty("--hero-photo", `url("${new URL(SHOP.heroImage, document.baseURI).href}")`);
  }
  document.getElementById("free-delivery-note").textContent =
    `Free delivery in Kumasi & Accra on orders of ${moneyRound(SHOP.delivery.freeOver)} or more`;

  document.getElementById("category-grid").innerHTML = CATEGORIES.map((c) => {
    const n = PRODUCTS.filter((p) => p.category === c.id).length;
    const photo = c.photo;
    return `<a class="cat-tile${photo ? " has-photo" : ""}" href="shop.html?cat=${c.id}">
      ${photo ? `<span class="cat-media"><img class="cat-photo" src="${escapeHtml(photo)}" alt="" loading="lazy"></span>` : `<span class="cat-icon">${icon(c.icon)}</span>`}
      <strong>${escapeHtml(c.name)}</strong><small>${n} products</small></a>`;
  }).join("");
  // brands come from the product list, most products first
  const brands = {};
  PRODUCTS.forEach((p) => { if (p.brand) brands[p.brand] = (brands[p.brand] || 0) + 1; });
  document.getElementById("brand-grid").innerHTML = Object.entries(brands)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([name, n]) => `<a class="brand-tile" href="shop.html?q=${encodeURIComponent(name)}">
      <strong>${escapeHtml(name)}</strong><small>${n} product${n === 1 ? "" : "s"}</small></a>`)
    .join("");
  document.getElementById("pack-grid").innerHTML = PACKS.map((k) => {
    const items = packItems(k);
    return `<article class="pack">
      <div class="pack-head"><span class="pack-icon">${icon(k.icon || "box")}</span><h3>${escapeHtml(k.name)}</h3></div>
      <p class="muted">${escapeHtml(k.description || "")}</p>
      <ul>${items.map((i) => `<li><span>${i.qty} ×</span> <a href="product.html?id=${encodeURIComponent(i.product.id)}">${escapeHtml(i.product.name)}</a></li>`).join("")}</ul>
      ${k.note ? `<p class="hint">${escapeHtml(k.note)}</p>` : ""}
      <div class="pack-foot"><div class="price">${money(packTotal(k))}</div>
        <button class="btn btn-sm" data-pack="${k.id}">Add pack to cart</button></div>
    </article>`;
  }).join("");
  document.getElementById("pack-grid").addEventListener("click", (e) => {
    const b = e.target.closest("[data-pack]");
    if (b) addPackToCart(b.dataset.pack);
  });

  if (SHOP.reviews?.length) {
    document.getElementById("reviews-section").hidden = false;
    document.getElementById("reviews-sample-note").hidden = !SHOP.reviewsAreSamples;
    document.getElementById("review-grid").innerHTML = SHOP.reviews.map((r) => {
      const stars = Math.max(0, Math.min(5, r.stars ?? 5));
      return `<figure class="review">
        <div class="stars" aria-label="${stars} out of 5 stars">${icon("star").repeat(stars)}<span>${icon("star").repeat(5 - stars)}</span></div>
        <blockquote>“${escapeHtml(r.text)}”</blockquote>
        <figcaption><strong>${escapeHtml(r.name)}</strong><small>${escapeHtml(r.role || "")}</small></figcaption>
      </figure>`;
    }).join("");
  }
  document.getElementById("featured-grid").innerHTML = PRODUCTS.filter((p) => p.featured).map(productCard).join("");

  document.getElementById("delivery-info").innerHTML = `
    <div class="info-card"><span>${icon("store")}</span><h3>Pickup in Kumasi</h3><p>Order online and collect from our shop. Always free.</p></div>
    <div class="info-card"><span>${icon("bike")}</span><h3>Kumasi delivery</h3><p>${moneyRound(SHOP.delivery.kumasiFee)} for any order, or <strong>free</strong> on orders of ${moneyRound(SHOP.delivery.freeOver)}+.</p></div>
    <div class="info-card"><span>${icon("truck")}</span><h3>Accra delivery</h3><p><strong>Free</strong> delivery for orders of ${moneyRound(SHOP.delivery.accraMinimum)} or more.</p></div>
    <div class="info-card"><span>${icon("box")}</span><h3>Rest of Ghana</h3><p>Place your order and we'll call to arrange transport and cost.</p></div>`;

  document.getElementById("contact-details").innerHTML = `
    <p><strong>${icon("pin")} Shop</strong><br>${escapeHtml(SHOP.address)}${SHOP.gps ? `<br>GPS: ${escapeHtml(SHOP.gps)}` : ""}</p>
    <p><strong>${icon("clock")} Opening hours</strong><br>${escapeHtml(SHOP.hours)}</p>
    <p><strong>${icon("phone")} Phone</strong><br><a href="${telHref(SHOP.phone)}">${escapeHtml(SHOP.phone)}</a></p>
    <p><strong>${icon("mail")} Email</strong><br><a href="mailto:${SHOP.email}">${escapeHtml(SHOP.email)}</a></p>
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
    filters.innerHTML = [{ id: "all", name: "All products", icon: "grid" }, ...CATEGORIES]
      .map((c) => `<button class="chip ${state.cat === c.id ? "active" : ""}" data-cat="${c.id}">${icon(c.icon)} ${escapeHtml(c.name)}</button>`)
      .join("");
  };

  const render = () => {
    const q = state.q.trim().toLowerCase();
    let list = PRODUCTS.filter(
      (p) =>
        (state.cat === "all" || p.category === state.cat) &&
        (!q || [p.name, p.brand, p.description].join(" ").toLowerCase().includes(q))
    );
    const byPrice = (dir) => (a, b) => askPrice(a) - askPrice(b) || dir * (a.price - b.price);
    if (state.sort === "price-asc") list = [...list].sort(byPrice(1));
    if (state.sort === "price-desc") list = [...list].sort(byPrice(-1));
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
        ${askPrice(p)
          ? `<div class="pd-price ask">Price on request</div>
             <p class="stock yes">● Ask us for today's price, sizes and brands</p>`
          : `<div class="pd-price">${money(p.price)} <small>per ${escapeHtml(unitName(p))}</small>${p.oldPrice ? ` <s>${money(p.oldPrice)}</s>` : ""}</div>
             <p class="stock ${out ? "no" : "yes"}">${out ? "● Out of stock — ask us when it's back" : "● In stock"}</p>`}
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
        ${askPrice(p) ? `<div class="pd-buy">
          <a class="btn btn-lg btn-wa" target="_blank" rel="noopener" href="${askPriceLink(p)}">Ask for price on WhatsApp</a>
        </div>` : `<div class="pd-buy">
          <div class="qty qty-lg">
            <button type="button" aria-label="Decrease" data-step="-1">−</button>
            <input id="pd-qty" type="number" min="1" value="1" inputmode="numeric" aria-label="Quantity">
            <button type="button" aria-label="Increase" data-step="1">+</button>
          </div>
          <button class="btn btn-lg" id="pd-add" ${out ? "disabled" : ""}>${out ? "Sold out" : "Add to cart"}</button>
          ${out ? "" : `<a class="btn btn-lg btn-wa" id="pd-wa" target="_blank" rel="noopener">Order on WhatsApp</a>`}
        </div>
        <p class="pd-line" id="pd-line"></p>`}
        <p class="hint">Buying for a project? <a href="quote.html?item=${encodeURIComponent(p.id)}">Request a quote</a> for large quantities.</p>
      </div>
    </div>
    ${specs.length ? `<section class="specs"><h2>Specifications</h2><table>
        ${p.brand ? `<tr><th>Brand</th><td>${escapeHtml(p.brand)}</td></tr>` : ""}
        ${specs.map(([k, v]) => `<tr><th>${escapeHtml(k)}</th><td>${escapeHtml(v)}</td></tr>`).join("")}
      </table></section>` : ""}`;

  if (!askPrice(p)) initBuyBox(root, p);

  const related = PRODUCTS.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 4);
  document.getElementById("related").innerHTML = related.length
    ? `<h2>More in ${escapeHtml(cat?.name || "this category")}</h2><div class="grid">${related.map(productCard).join("")}</div>`
    : "";
}

// Quantity box, live bulk-price line and "Add to cart" on the product page
function initBuyBox(root, p) {
  const qtyInput = document.getElementById("pd-qty");
  const line = document.getElementById("pd-line");
  const update = () => {
    const q = Math.max(1, parseInt(qtyInput.value, 10) || 1);
    const u = unitPrice(p, q);
    line.innerHTML = q > 1 ? `${q} × ${money(u)} = <strong>${money(u * q)}</strong>${u < p.price ? ` <span class="bulk-tag">bulk price applied</span>` : ""}` : "";
    const wa = document.getElementById("pd-wa");
    if (wa) wa.href = waLink(`Hello ${SHOP.name}, I'd like to order:\n${q} × ${p.name} — ${money(u)} each = ${money(u * q)}\nIs it available?`);
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
          <button class="remove" aria-label="Remove ${escapeHtml(p.name)}" data-remove="${p.id}">${icon("close")}</button>
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
      <button type="button" class="btn btn-ghost btn-sm" id="proforma-btn">${icon("printer")} Print proforma invoice</button>`;
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
        <h2>${icon("check")} ${order.paidRef ? "Payment received" : "Order ready"} — No. ${order.ref}</h2>
        <p>${order.paidRef
          ? "Your payment was successful. <strong>Please send us your order details</strong> so we can prepare and deliver it:"
          : "If WhatsApp didn't open, <strong>please tap a button below to send us your order</strong>. We'll reply to confirm stock and delivery."}</p>
        <div class="send-btns">
          <a class="btn btn-wa" target="_blank" rel="noopener" href="${waLink(text)}">Send order on WhatsApp</a>
          <a class="btn btn-ghost" href="${mailLink(`Order ${order.ref}`, text.replace(/\*/g, ""))}">Send by email</a>
          <button class="btn btn-ghost" onclick="window.print()">${icon("printer")} Print / save invoice</button>
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
        <h2>${icon("check")} Quote request ${ref} ready</h2>
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
