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
const discountPct = (p) => (p.oldPrice && p.price ? Math.round((1 - p.price / p.oldPrice) * 100) : 0);
const lowStock = (p) => p.stock > 0 && p.stock <= 5;
const productHref = (p) => `product.html?id=${encodeURIComponent(p.id)}`;
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
  search: '<circle cx="11" cy="11" r="7"/><path d="M20.5 20.5l-4.5-4.5"/>',
  solar: '<rect x="3" y="9" width="18" height="10" rx="1"/><path d="M3 14h18M9 9v10M15 9v10M12 2.5v2.5M6.6 4.6l1.4 1.4M17.4 4.6L16 6"/>',
  battery: '<rect x="2.5" y="7" width="17" height="10" rx="2"/><path d="M21.5 10.5v3M6 10v4M9.5 10v4"/>',
  fridge: '<rect x="5" y="2.5" width="14" height="19" rx="2"/><path d="M5 9.5h14M8.5 5.5v2M8.5 12.5v3"/>',
  tv: '<rect x="2.5" y="4.5" width="19" height="12.5" rx="2"/><path d="M8 21h8M12 17v4"/>',
  camera: '<path d="M3 7.5h11l3 3.5-3 3.5H3z"/><path d="M17 11h3.5M8.5 14.5V20M5.5 20h6"/><circle cx="8" cy="11" r="1.6"/>',
  filter: '<path d="M3.5 5h17l-6.5 8v6l-4 1.5V13z"/>',
  chevron: '<path d="M9 5.5l6.5 6.5L9 18.5"/>',
  refresh: '<path d="M20 11.5A8 8 0 0 0 5.6 6.6L3.5 9M4 12.5a8 8 0 0 0 14.4 4.9L20.5 15M3.5 4v5h5M20.5 20v-5h-5"/>',
  award: '<circle cx="12" cy="9" r="6"/><path d="M8.5 13.8L7 21.5l5-2.8 5 2.8-1.5-7.7"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20.5a6.5 6.5 0 0 1 13 0M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.3a6.5 6.5 0 0 1 3.5 6.2"/>',
  building: '<path d="M4 21V5.5L13 3v18M13 8.5l7 2.5v10M2.5 21h19M7.5 8h2M7.5 12h2M7.5 16h2M16.5 13.5h1M16.5 17h1"/>',
  lock: '<rect x="4.5" y="10.5" width="15" height="10.5" rx="2"/><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5M12 14.5v2.5"/>',
  send: '<path d="M21.5 2.5L10.5 13.5M21.5 2.5l-7 19-4-8-8-4z"/>',
  heart: '<path d="M12 20.5s-8-4.9-8-10.6A4.6 4.6 0 0 1 12 7a4.6 4.6 0 0 1 8 2.9c0 5.7-8 10.6-8 10.6z"/>',
  compare: '<path d="M8 3.5v17M16 3.5v17M3.5 8h9M11.5 16h9M9.5 6l-3 2 3 2M14.5 14l3 2-3 2"/>',
  zoom: '<circle cx="11" cy="11" r="7"/><path d="M20.5 20.5l-4.5-4.5M11 8v6M8 11h6"/>',
  calc: '<rect x="4.5" y="2.5" width="15" height="19" rx="2"/><path d="M8 6.5h8M8 11h.01M12 11h.01M16 11h.01M8 14.5h.01M12 14.5h.01M16 14.5v3.5M8 18h.01M12 18h.01"/>',
  book: '<path d="M4 4.5A2 2 0 0 1 6 2.5h13v16H6a2 2 0 0 0-2 2zM4 20.5a2 2 0 0 0 2 2h13v-4"/>',
  washer: '<rect x="4" y="2.5" width="16" height="19" rx="2"/><circle cx="12" cy="13.5" r="4.5"/><path d="M4 6.5h16M7.5 4.5h1"/>',
  kettle: '<path d="M6 9.5h10l1.5 11h-13zM8.5 9.5l1-4h3l1 4M17 11.5c2 0 3 1 3 2.5s-1 2.5-2.7 2.5"/>',
  doorbell: '<rect x="7" y="2.5" width="10" height="19" rx="5"/><circle cx="12" cy="9" r="2.2"/><circle cx="12" cy="16" r="1.4"/>',
  sensor: '<circle cx="12" cy="12" r="3"/><path d="M6.3 6.3a8 8 0 0 0 0 11.4M17.7 6.3a8 8 0 0 1 0 11.4M3.5 3.5a12 12 0 0 0 0 17M20.5 3.5a12 12 0 0 1 0 17"/>',
  tape: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="3.5"/>',
  drill: '<path d="M3 7h11v6H3zM14 9h4M18 8v2h3.5M6 13l-1 8h4l1-8"/>',
  torch: '<path d="M8 2.5h8l-1.5 6v13h-5v-13zM10 12.5h4"/>',
  chandelier: '<path d="M12 2.5v5M5 10.5h14M5 10.5c0 3 3.1 5.5 7 5.5s7-2.5 7-5.5M8 16v3M12 16v4M16 16v3M12 7.5a2 2 0 0 0-2 2v1M12 7.5a2 2 0 0 1 2 2v1"/>',
  flood: '<rect x="3" y="5.5" width="13" height="10" rx="1.5"/><path d="M9.5 15.5v3.5M6 19h7M19 7l2.5-1.5M19 10.5h3M19 14l2.5 1.5"/>',


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

// ---------- Saved lists in the visitor's browser: wishlist, compare, recently viewed ----------
function loadList(key) {
  try { return (JSON.parse(localStorage.getItem(key)) || []).filter((id) => findProduct(id)); } catch { return []; }
}
function saveList(key, ids) {
  try { localStorage.setItem(key, JSON.stringify(ids)); } catch {}
  document.dispatchEvent(new CustomEvent("lists-changed"));
}
const WISH_KEY = "lightworld-wishlist", COMPARE_KEY = "lightworld-compare", RECENT_KEY = "lightworld-recent";
const COMPARE_MAX = 4;
const isWished = (id) => loadList(WISH_KEY).includes(id);
const isCompared = (id) => loadList(COMPARE_KEY).includes(id);

// ---------- Language (English / Twi beta) ----------
let LANG = "en";
try { LANG = localStorage.getItem("lightworld-lang") === "tw" ? "tw" : "en"; } catch {}
const t = (s) => (LANG === "tw" && typeof I18N_TWI !== "undefined" && I18N_TWI[s]) || s;

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
  const wished = loadList(WISH_KEY).length;
  document.querySelectorAll("[data-wish-count]").forEach((el) => {
    el.textContent = wished;
    el.hidden = wished === 0;
  });
}
document.addEventListener("lists-changed", () => updateCartCount());

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

// Pages in the main menu (key = <body data-page="...">)
const NAV = [
  ["index.html", "Home", "home"],
  ["shop.html", "Shop", "shop"],
  ["calculator.html", "Solar Calculator", "calculator"],
  ["guides.html", "Guides", "guides"],
  ["quote.html", "Trade & Quotes", "quote"],
  ["contact.html", "Contact", "contact"],
];
// extra links shown only in the phone menu
const NAV_MORE = [
  ["about.html", "About us", "about"],
  ["track.html", "Track order", "track"],
  ["faq.html", "FAQs", "faq"],
  ["delivery.html", "Delivery & Returns", "delivery"],
];

function searchFormHtml(cls, placeholder = "Search products…") {
  return `<form class="${cls}" action="shop.html" role="search">
    <input type="search" name="q" placeholder="${placeholder}" aria-label="Search products">
    <button type="submit" aria-label="Search">${icon("search")}</button>
  </form>`;
}

function renderLayout() {
  const page = document.body.dataset.page;
  const link = ([href, label, key], cls = "") => `<a href="${href}" class="${cls} ${page === key ? "active" : ""}"${page === key ? ' aria-current="page"' : ""}>${escapeHtml(t(label))}</a>`;

  const promo = SHOP.promo?.text ? SHOP.promo : null;
  let promoClosed = false;
  try { promoClosed = !!promo && localStorage.getItem("lightworld-promo-closed") === promo.text; } catch {}
  document.getElementById("site-header").innerHTML = `
    <a class="skip-link" href="#main">Skip to content</a>
    ${promo && !promoClosed ? `<div class="promo-strip"><div class="container">
      <span>${escapeHtml(promo.text)}${promo.link ? ` <a href="${escapeHtml(promo.link)}">${escapeHtml(promo.linkText || "Find out more")} →</a>` : ""}</span>
      <button type="button" class="promo-close" aria-label="Close">${icon("close")}</button>
    </div></div>` : ""}
    <div class="topbar"><div class="container">
      <span>${icon("phone")} <a href="${telHref(SHOP.phone)}">${escapeHtml(SHOP.phone)}</a>
        <span class="hide-sm"><span class="sep"></span> ${icon("clock")} ${escapeHtml(SHOP.hours)}</span></span>
      <span class="topbar-right"><a href="track.html">${icon("truck")} ${escapeHtml(t("Track order"))}</a></span>
    </div></div>
    <div class="container nav">
      ${logoHtml()}
      <nav class="nav-links" id="nav-links" aria-label="Main">
        ${searchFormHtml("nav-search-m", t("Search products…"))}
        ${NAV.map((n) => link(n)).join("")}
        ${NAV_MORE.map((n) => link(n, "nav-extra")).join("")}
        <div class="nav-extra lang-row"><span>Language / Kasa</span>
          <span class="lang-toggle"><button type="button" data-lang="en" aria-pressed="${LANG === "en"}">English</button><button type="button" data-lang="tw" aria-pressed="${LANG === "tw"}">Twi (beta)</button></span></div>
      </nav>
      <div class="nav-icons">
        <span class="lang-toggle" role="group" aria-label="Language / Kasa">
          <button type="button" data-lang="en" aria-pressed="${LANG === "en"}" title="English">EN</button><button type="button" data-lang="tw" aria-pressed="${LANG === "tw"}" title="Twi (beta)">Twi</button>
        </span>
        <button type="button" class="icon-btn search-toggle" aria-label="${escapeHtml(t("Search"))}" aria-expanded="false" aria-controls="search-panel">${icon("search")}</button>
        <a href="wishlist.html" class="icon-btn" aria-label="${escapeHtml(t("Wishlist"))}">${icon("heart")}<span class="badge" data-wish-count hidden>0</span></a>
        <a href="cart.html" class="cart-btn" aria-label="Cart">
          ${icon("cart")} <span class="hide-sm">${escapeHtml(t("Cart"))}</span><span class="badge" data-cart-count hidden>0</span>
        </a>
        <button class="menu-btn" aria-label="Menu" aria-expanded="false" aria-controls="nav-links">${icon("menu")}</button>
      </div>
    </div>
    <div class="search-panel" id="search-panel" hidden>
      <div class="container">
        <form class="search-panel-form" action="shop.html" role="search" data-live-search>
          ${icon("search")}
          <input type="search" name="q" placeholder="${escapeHtml(t("Search products…"))}" aria-label="Search products" autocomplete="off">
          <button type="button" class="icon-btn search-close" aria-label="Close search">${icon("close")}</button>
        </form>
      </div>
    </div>`;

  document.querySelectorAll("[data-lang]").forEach((b) => b.addEventListener("click", () => {
    try { localStorage.setItem("lightworld-lang", b.dataset.lang); } catch {}
    location.reload();
  }));

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

  // keep the header search filled in on the shop page
  const q = new URLSearchParams(location.search).get("q");
  if (q) document.querySelectorAll(".nav-search-m input").forEach((i) => { i.value = q; });

  document.getElementById("site-footer").innerHTML = `
    <div class="container footer-grid">
      <div class="footer-brand">
        ${logoHtml()}
        <p>${escapeHtml(SHOP.tagline)}.</p>
        <p class="footer-note">Free delivery in Kumasi &amp; Accra on orders of ${moneyRound(SHOP.delivery.freeOver)}+</p>
        <a class="btn btn-wa btn-sm" target="_blank" rel="noopener" href="${waLink(`Hello ${SHOP.name}, I have a question.`)}">${icon("whatsapp")} ${escapeHtml(t("Chat on WhatsApp"))}</a>
      </div>
      <div>
        <h4>${escapeHtml(t("Shop"))}</h4>
        ${CATEGORIES.map((c) => `<a href="shop.html?cat=${c.id}">${escapeHtml(c.name)}</a>`).join("")}
        <a href="shop.html?deals=1">Deals</a>
      </div>
      <div>
        <h4>${escapeHtml(t("Customer service"))}</h4>
        <a href="contact.html">${escapeHtml(t("Contact us"))}</a>
        <a href="track.html">${escapeHtml(t("Track order"))}</a>
        <a href="faq.html">${escapeHtml(t("FAQs"))}</a>
        <a href="delivery.html">${escapeHtml(t("Delivery & Returns"))}</a>
        <a href="delivery.html#warranty">Warranty</a>
        <a href="wishlist.html">${escapeHtml(t("Wishlist"))}</a>
        <a href="compare.html">${escapeHtml(t("Compare"))}</a>
        <h4 class="footer-sub">${escapeHtml(t("Company"))}</h4>
        <a href="about.html">${escapeHtml(t("About us"))}</a>
        <a href="quote.html">${escapeHtml(t("Trade & Quotes"))}</a>
        <a href="calculator.html">${escapeHtml(t("Solar Calculator"))}</a>
        <a href="guides.html">Buying guides</a>
      </div>
      <div>
        <h4>${escapeHtml(t("Visit us"))}</h4>
        <p>${escapeHtml(SHOP.address)}${SHOP.gps ? `<br>GPS: ${escapeHtml(SHOP.gps)}` : ""}<br>${escapeHtml(SHOP.hours)}</p>
        <p class="footer-contact">${icon("phone")} <a href="${telHref(SHOP.phone)}">${escapeHtml(SHOP.phone)}</a><br>
        ${icon("mail")} <a href="mailto:${SHOP.email}">${escapeHtml(SHOP.email)}</a></p>
      </div>
    </div>
    ${SHOP.paymentMethods?.length ? `<div class="container pay-row"><span>${escapeHtml(t("We accept"))}</span><div class="pay-badges">${paymentBadgesHtml()}</div></div>` : ""}
    <div class="copyright"><div class="container">
      <span>© ${new Date().getFullYear()} ${escapeHtml(SHOP.name)}. All rights reserved.</span>
      <span class="legal"><a href="terms.html">Terms &amp; Conditions</a><a href="privacy.html">Privacy Policy</a><a href="credits.html">Photo credits</a></span>
    </div></div>`;

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
    <a href="${telHref(SHOP.phone)}">${icon("phone")}${escapeHtml(t("Call"))}</a>
    <a href="${waLink(`Hello ${SHOP.name}, `)}" target="_blank" rel="noopener" class="mb-wa">${icon("whatsapp")}WhatsApp</a>
    <a href="cart.html">${icon("cart")}${escapeHtml(t("Cart"))}<b class="badge" data-cart-count hidden>0</b></a>`;
  document.body.appendChild(bar);

  // gentle fade-in of sections as they scroll into view (styled by the theme; skipped if motion is reduced)
  if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }), { rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll("main > section:not(.hero):not(.page-hero)").forEach((el) => { el.classList.add("reveal"); io.observe(el); });
  }

  // static pages mark icons as <span data-icon="name"></span> and live shop values as <span data-fill="name"></span>
  document.querySelectorAll("[data-icon]").forEach((el) => { el.innerHTML = icon(el.dataset.icon); });
  if (LANG !== "en") {
    document.documentElement.lang = "tw";
    document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t(el.textContent.trim()); });
  }
  fillShopValues();

  updateCartCount();
}

// Values from js/config.js and js/products.js used in page text, so pages stay correct when settings change
function fillShopValues() {
  const D = SHOP.delivery;
  const brands = new Set(PRODUCTS.map((p) => p.brand).filter(Boolean));
  const values = {
    name: SHOP.name, phone: SHOP.phone, email: SHOP.email, address: SHOP.address, gps: SHOP.gps || "—", hours: SHOP.hours,
    kumasiFee: moneyRound(D.kumasiFee), freeOver: moneyRound(D.freeOver), accraMinimum: moneyRound(D.accraMinimum), accraFee: moneyRound(D.accraFee),
    productCount: `${PRODUCTS.length}+`, brandCount: `${brands.size}+`, categoryCount: String(CATEGORIES.length),
    payments: (SHOP.paymentMethods || []).join(", "),
  };
  document.querySelectorAll("[data-fill]").forEach((el) => { if (values[el.dataset.fill] != null) el.textContent = values[el.dataset.fill]; });
  document.querySelectorAll("[data-href=phone]").forEach((a) => { a.href = telHref(SHOP.phone); });
  document.querySelectorAll("[data-href=email]").forEach((a) => { a.href = `mailto:${SHOP.email}`; });
  document.querySelectorAll("[data-href=whatsapp]").forEach((a) => { a.href = waLink(`Hello ${SHOP.name}, `); });
  document.querySelectorAll("[data-href=map]").forEach((a) => {
    a.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${SHOP.name}, ${SHOP.address}`)}`;
  });
}

// Placeholder icon for each product type (falls back to the category icon)
const TYPE_ICONS = {
  "LED bulb": "bulb", "Rechargeable light": "battery", "LED tube": "bulb", "Ceiling light": "bulb", Chandelier: "chandelier",
  Floodlight: "flood", "Security light": "flood", "Solar light": "solar", "Industrial lamp": "bulb", "Lamp holder": "bulb",
  "Light switch": "socket", "Wall socket": "socket", "Wall switch": "socket", "Plug & adapter": "plug", "Extension board": "plug", Box: "box",
  "House wiring cable": "plug", "Armoured cable": "plug", "Flexible cord": "plug", "Extension cable": "plug", "Conduit & trunking": "box",
  Fixings: "box", Earthing: "breaker",
  Breaker: "breaker", "RCD / RCCB": "breaker", "Distribution board": "breaker", Fuse: "breaker", "Surge protector": "shield", "Changeover switch": "breaker",
  "Air conditioner": "fan", "Fan part": "fan",
  "Solar panel": "solar", "Solar kit": "solar", Inverter: "battery", Battery: "battery", "Charge controller": "battery", Stabilizer: "shield", UPS: "battery", Generator: "battery",
  Fridge: "fridge", Freezer: "fridge", Television: "tv", Microwave: "tv", Blender: "kettle", Iron: "kettle", Kettle: "kettle", Cooker: "kettle",
  "Washing machine": "washer", "Water heater": "kettle",
  Tester: "wrench", "Hand tool": "wrench", "Power tool": "drill", "Tape & glue": "tape", Torch: "torch", "TV mount": "tv",
  "CCTV camera": "camera", "CCTV kit": "camera", Doorbell: "doorbell", "Smart device": "plug", Sensor: "sensor",
};

// ---------- Product card ----------
// The product's own photo; otherwise its example photo (labelled); otherwise a coloured block
// with the category icon and the product name, so every product still looks complete
function productMedia(p, { compact = false } = {}) {
  const cat = findCategory(p.category);
  if (p.image) return `<img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.name)}" loading="lazy">`;
  if (p.examplePhoto)
    return `<img class="example" src="${escapeHtml(p.examplePhoto)}" alt="" loading="lazy"><span class="tag example-tag">Example photo</span>`;
  return `<span class="placeholder" style="--tint:${cat?.tint || "#eef1f6"}">
      ${icon(TYPE_ICONS[p.type] || cat?.icon || "bulb")}${compact ? "" : `<span class="ph-name">${escapeHtml(p.name)}</span>
      ${p.brand ? `<span class="ph-brand">${escapeHtml(p.brand)}</span>` : ""}`}
    </span>`;
}

function productCard(p) {
  const out = p.stock === 0;
  const best = (p.bulk || []).reduce((a, t) => (!a || t.price < a.price ? t : a), null);
  const href = productHref(p);
  const pct = discountPct(p);
  const tag = p.oldPrice ? `<span class="tag sale">−${pct}%</span>` : p.badge ? `<span class="tag hot">${escapeHtml(p.badge)}</span>` : "";
  const versions = p.group ? PRODUCTS.filter((x) => x.group === p.group).length : 0;
  return `
    <article class="card">
      <div class="card-media-wrap">
        <a class="card-media" href="${href}" tabindex="-1" aria-hidden="true">${productMedia(p)}
          ${tag}
          ${out ? `<span class="tag out">Out of stock</span>` : lowStock(p) ? `<span class="tag low">Only ${p.stock} left</span>` : ""}
        </a>
        <div class="card-actions">
          <button type="button" class="act-btn${isWished(p.id) ? " on" : ""}" data-wish="${p.id}" aria-pressed="${isWished(p.id)}" aria-label="Save ${escapeHtml(p.name)} to wishlist" title="Save to wishlist">${icon("heart")}</button>
          <button type="button" class="act-btn${isCompared(p.id) ? " on" : ""}" data-compare="${p.id}" aria-pressed="${isCompared(p.id)}" aria-label="Compare ${escapeHtml(p.name)}" title="Compare">${icon("compare")}</button>
        </div>
      </div>
      <div class="card-body">
        <div class="card-cat">${escapeHtml(p.brand || findCategory(p.category)?.name || "")}</div>
        <h3><a href="${href}">${escapeHtml(p.name)}</a></h3>
        <p class="bulk-hint">${best ? `Bulk: ${money(best.price)} each for ${best.min}+` : versions > 1 ? `<span class="muted-hint">${versions} versions available</span>` : ""}</p>
        <div class="card-foot">
          ${askPrice(p)
            ? `<div class="price ask">${escapeHtml(t("Price on request"))}</div>
               <a class="btn btn-sm btn-wa" target="_blank" rel="noopener" href="${askPriceLink(p)}">${escapeHtml(t("Ask for price"))}</a>`
            : `<div class="price">${money(p.price)}${p.oldPrice ? ` <s>${money(p.oldPrice)}</s>` : ""}</div>
               <button class="btn btn-sm" data-add="${p.id}" ${out ? "disabled" : ""}>${escapeHtml(t(out ? "Sold out" : "Add to cart"))}</button>`}
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
    return `<a class="cat-tile${c.photo ? " has-photo" : ""}" href="shop.html?cat=${c.id}">
      ${c.photo ? `<span class="cat-media"><img class="cat-photo" src="${escapeHtml(c.photo)}" alt="" loading="lazy"></span>` : `<span class="cat-icon">${icon(c.icon)}</span>`}
      <span class="cat-label"><span class="cat-ico">${icon(c.icon)}</span><strong>${escapeHtml(c.name)}</strong><small>${n} products</small></span></a>`;
  }).join("");

  const deals = PRODUCTS.filter((p) => p.oldPrice && !askPrice(p)).sort((a, b) => discountPct(b) - discountPct(a));
  document.getElementById("deals-section").hidden = !deals.length;
  document.getElementById("deals-grid").innerHTML = deals.slice(0, 4).map(productCard).join("");
  // brands come from the product list, most products first
  const brands = {};
  PRODUCTS.forEach((p) => { if (p.brand) brands[p.brand] = (brands[p.brand] || 0) + 1; });
  document.getElementById("brand-grid").innerHTML = Object.entries(brands)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([name, n]) => `<a class="brand-tile" href="shop.html?brand=${encodeURIComponent(name)}">
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
    <div class="send-btns"><a class="btn btn-wa" target="_blank" rel="noopener" href="${waLink(`Hello ${SHOP.name}, I have a question.`)}">Chat on WhatsApp</a>
    <a class="btn btn-ghost" href="contact.html">Send a message</a></div>`;
}

// ---------- Shop page ----------
// Filters live in the address bar (?cat=&q=&brand=&type=&min=&max=&avail=&deals=&sort=) so a filtered page can be shared
function initShop() {
  const params = new URLSearchParams(location.search);
  const list = (k) => (params.get(k) ? params.get(k).split("|").filter(Boolean) : []);
  const state = {
    cat: findCategory(params.get("cat")) ? params.get("cat") : "all",
    q: params.get("q") || "",
    brands: list("brand"),
    types: list("type"),
    min: params.get("min") || "",
    max: params.get("max") || "",
    avail: params.get("avail") === "1",
    deals: params.get("deals") === "1",
    sort: params.get("sort") || "default",
  };

  const $ = (id) => document.getElementById(id);
  const filters = $("cat-filters"), search = $("search"), sort = $("sort"), grid = $("product-grid"), count = $("result-count");
  const facets = $("facets"), banner = $("shop-banner"), active = $("active-filters");
  search.value = state.q;
  sort.value = state.sort;

  const matchesSearch = (p, q) => !q || [p.name, p.brand, p.type, p.description, findCategory(p.category)?.name].join(" ").toLowerCase().includes(q);
  const inCat = (p) => state.cat === "all" || p.category === state.cat;
  const priceOk = (p) => {
    if (!state.min && !state.max) return true;
    if (askPrice(p)) return false;
    return (!state.min || p.price >= +state.min) && (!state.max || p.price <= +state.max);
  };
  const base = () => PRODUCTS.filter((p) => inCat(p) && matchesSearch(p, state.q.trim().toLowerCase()));

  const renderBanner = () => {
    const c = findCategory(state.cat);
    // a single brand with no category is that brand's page
    if (!c && state.brands.length === 1 && !state.deals) {
      const b = state.brands[0];
      const items = PRODUCTS.filter((p) => p.brand === b);
      const cats = [...new Set(items.map((p) => findCategory(p.category)?.name))];
      banner.innerHTML = `<div class="shop-banner brand-banner"><div class="shop-banner-text">
          <nav class="crumbs"><a href="index.html">Home</a> › <a href="shop.html">Shop</a> › Brands › ${escapeHtml(b)}</nav>
          <p class="brand-word">${escapeHtml(b)}</p>
          <p>${items.length} product${items.length === 1 ? "" : "s"} from ${escapeHtml(b)} in ${escapeHtml(cats.join(", "))}. Genuine stock from trusted suppliers.</p></div></div>`;
      document.title = `${b} — ${SHOP.name}`;
      return;
    }
    banner.innerHTML = c
      ? `<div class="shop-banner has-photo"><img src="${escapeHtml(c.photo)}" alt="">
          <div class="shop-banner-text"><nav class="crumbs"><a href="index.html">Home</a> › <a href="shop.html">Shop</a> › ${escapeHtml(c.name)}</nav>
          <h1>${escapeHtml(c.name)}</h1><p>${escapeHtml(c.blurb || "")}</p></div></div>`
      : `<div class="shop-banner"><div class="shop-banner-text"><nav class="crumbs"><a href="index.html">Home</a> › Shop</nav>
          <h1>${state.deals ? "Deals" : "Shop all products"}</h1>
          <p>${state.deals ? "Discounted items while stocks last." : `${PRODUCTS.length} products across ${CATEGORIES.length} categories — lighting, wiring, protection, power, appliances and more.`}</p></div></div>`;
    document.title = `${c ? c.name : state.deals ? "Deals" : "Shop"} — ${SHOP.name}`;
  };

  const renderChips = () => {
    filters.innerHTML = [{ id: "all", name: "All products", icon: "grid" }, ...CATEGORIES]
      .map((c) => `<button class="chip ${state.cat === c.id ? "active" : ""}" data-cat="${c.id}" aria-pressed="${state.cat === c.id}">${icon(c.icon)} ${escapeHtml(c.name)}</button>`)
      .join("");
  };

  // brand and type lists only offer what's in the chosen category (with counts)
  const renderFacets = () => {
    const pool = base();
    const tally = (key) => {
      const t = {};
      pool.forEach((p) => { if (p[key]) t[p[key]] = (t[p[key]] || 0) + 1; });
      return Object.entries(t).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
    };
    const group = (title, name, entries, chosen) => entries.length ? `
      <fieldset class="facet"><legend>${title}</legend>
        <div class="facet-list">${entries.map(([v, n]) => `<label class="check"><input type="checkbox" name="${name}" value="${escapeHtml(v)}" ${chosen.includes(v) ? "checked" : ""}>
          <span>${escapeHtml(v)}</span><small>${n}</small></label>`).join("")}</div>
      </fieldset>` : "";
    facets.innerHTML = `
      ${group("Type", "type", tally("type"), state.types)}
      ${group("Brand", "brand", tally("brand"), state.brands)}
      <fieldset class="facet"><legend>Price (${escapeHtml(SHOP.currency)})</legend>
        <div class="price-range">
          <input type="number" name="min" min="0" inputmode="numeric" placeholder="Min" value="${escapeHtml(state.min)}" aria-label="Minimum price">
          <span>–</span>
          <input type="number" name="max" min="0" inputmode="numeric" placeholder="Max" value="${escapeHtml(state.max)}" aria-label="Maximum price">
        </div>
        <div class="price-quick">${[[0, 50], [50, 200], [200, 1000], [1000, ""]].map(([a, b]) =>
          `<button type="button" data-range="${a}-${b}">${b === "" ? `${moneyRound(a)}+` : `${moneyRound(a)}–${moneyRound(b)}`}</button>`).join("")}</div>
      </fieldset>
      <fieldset class="facet"><legend>Availability</legend>
        <label class="check"><input type="checkbox" name="avail" ${state.avail ? "checked" : ""}><span>Price shown, in stock</span></label>
        <label class="check"><input type="checkbox" name="deals" ${state.deals ? "checked" : ""}><span>Deals only</span></label>
      </fieldset>`;
  };

  const renderActive = () => {
    const pills = [
      ...state.types.map((v) => ["type", v, v]),
      ...state.brands.map((v) => ["brand", v, v]),
      ...(state.min || state.max ? [["price", "", `${state.min ? moneyRound(state.min) : "Any"} – ${state.max ? moneyRound(state.max) : "any"}`]] : []),
      ...(state.avail ? [["avail", "", "In stock"]] : []),
      ...(state.deals ? [["deals", "", "Deals"]] : []),
      ...(state.q ? [["q", "", `“${state.q}”`]] : []),
    ];
    active.innerHTML = pills.length
      ? pills.map(([k, v, label]) => `<button class="pill" data-clear="${k}" data-value="${escapeHtml(v)}">${escapeHtml(label)} ${icon("close")}</button>`).join("") +
        `<button class="pill clear-all" data-clear="all">Clear all</button>`
      : "";
    const n = pills.length;
    $("filter-toggle-count").textContent = n ? `(${n})` : "";
  };

  const render = () => {
    let items = base().filter((p) =>
      (!state.types.length || state.types.includes(p.type)) &&
      (!state.brands.length || state.brands.includes(p.brand)) &&
      priceOk(p) &&
      (!state.avail || (!askPrice(p) && p.stock !== 0)) &&
      (!state.deals || p.oldPrice));
    const byPrice = (dir) => (a, b) => askPrice(a) - askPrice(b) || dir * (a.price - b.price);
    if (state.sort === "price-asc") items = [...items].sort(byPrice(1));
    if (state.sort === "price-desc") items = [...items].sort(byPrice(-1));
    if (state.sort === "name") items = [...items].sort((a, b) => a.name.localeCompare(b.name));
    if (state.sort === "discount") items = [...items].sort((a, b) => discountPct(b) - discountPct(a));

    count.textContent = `${items.length} product${items.length === 1 ? "" : "s"}`;
    grid.innerHTML = items.length
      ? items.map(productCard).join("")
      : `<div class="empty">${icon("search", "empty-ico")}<h3>No products match these filters</h3>
         <p>Try removing a filter or searching for something else — or tell us what you need and we'll source it.</p>
         <div class="send-btns"><button class="btn" data-clear="all">Clear filters</button><a class="btn btn-ghost" href="quote.html">Ask us for it</a></div></div>`;

    const url = new URL(location);
    const set = (k, v) => (v ? url.searchParams.set(k, v) : url.searchParams.delete(k));
    set("cat", state.cat === "all" ? "" : state.cat);
    set("q", state.q); set("brand", state.brands.join("|")); set("type", state.types.join("|"));
    set("min", state.min); set("max", state.max); set("avail", state.avail ? "1" : ""); set("deals", state.deals ? "1" : "");
    set("sort", state.sort === "default" ? "" : state.sort);
    history.replaceState(null, "", url);
    renderActive();
  };

  const refresh = () => { renderBanner(); renderChips(); renderFacets(); render(); };

  filters.addEventListener("click", (e) => {
    const b = e.target.closest("[data-cat]");
    if (!b) return;
    state.cat = b.dataset.cat;
    state.types = []; state.brands = []; // these depend on the category
    refresh();
  });
  facets.addEventListener("change", (e) => {
    const t = e.target;
    if (t.name === "type" || t.name === "brand") {
      const key = t.name === "type" ? "types" : "brands";
      state[key] = [...facets.querySelectorAll(`input[name=${t.name}]:checked`)].map((i) => i.value);
      if (key === "brands") renderBanner();
    }
    if (t.name === "min" || t.name === "max") state[t.name] = t.value;
    if (t.name === "avail") state.avail = t.checked;
    if (t.name === "deals") { state.deals = t.checked; renderBanner(); }
    render();
  });
  facets.addEventListener("click", (e) => {
    const b = e.target.closest("[data-range]");
    if (!b) return;
    [state.min, state.max] = b.dataset.range.split("-");
    renderFacets(); render();
  });
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-clear]");
    if (!b) return;
    const k = b.dataset.clear, v = b.dataset.value;
    if (k === "all") Object.assign(state, { q: "", brands: [], types: [], min: "", max: "", avail: false, deals: false });
    if (k === "type") state.types = state.types.filter((x) => x !== v);
    if (k === "brand") state.brands = state.brands.filter((x) => x !== v);
    if (k === "price") { state.min = ""; state.max = ""; }
    if (k === "avail") state.avail = false;
    if (k === "deals") state.deals = false;
    if (k === "q") state.q = "";
    search.value = state.q;
    refresh();
  });
  search.addEventListener("input", () => { state.q = search.value; renderFacets(); render(); });
  sort.addEventListener("change", () => { state.sort = sort.value; render(); });
  $("filter-toggle").addEventListener("click", () => {
    const open = document.querySelector(".shop-layout").classList.toggle("filters-open");
    $("filter-toggle").setAttribute("aria-expanded", open);
  });

  refresh();
}

// ---------- Product detail page ----------
// Small-print credit for a stock photo (licence terms require it for CC BY / CC BY-SA photos).
function photoCredit(src) {
  const c = typeof PHOTO_CREDITS !== "undefined" && PHOTO_CREDITS[src];
  if (!c) return "";
  const by = c.by === "Unsplash" ? "Unsplash" : escapeHtml(c.by);
  return `Example photo: <a href="${escapeHtml(c.source)}" target="_blank" rel="noopener">${by}</a>, ` +
    `<a href="${escapeHtml(c.licenseUrl)}" target="_blank" rel="noopener">${escapeHtml(c.license)}</a>` +
    (c.changes && c.changes !== "resized" ? ` (${escapeHtml(c.changes.replace(/^resized, /, ""))})` : "");
}

function initProduct() {
  const root = document.getElementById("product");
  const p = findProduct(new URLSearchParams(location.search).get("id"));
  if (!p) {
    root.innerHTML = `<div class="empty">${icon("box", "empty-ico")}<h3>We couldn't find that product</h3>
      <p>It may have been renamed or removed.</p><a class="btn" href="shop.html">Browse the shop</a></div>`;
    return;
  }
  const cat = findCategory(p.category);
  const out = p.stock === 0;
  document.title = `${p.name} — ${SHOP.name}`;

  const tiers = [{ min: 1, price: p.price }, ...(p.bulk || [])];
  const specs = Object.entries(p.specs || {});
  const versions = p.group ? PRODUCTS.filter((x) => x.group === p.group) : [];
  const photos = [p.image || p.examplePhoto, ...(p.gallery || [])].filter(Boolean);
  const stockLine = out ? `<p class="stock no">● Out of stock — ask us when it's back</p>`
    : lowStock(p) ? `<p class="stock low">● Only ${p.stock} left in stock</p>`
    : `<p class="stock yes">● In stock</p>`;

  root.innerHTML = `
    <nav class="crumbs"><a href="index.html">Home</a> › <a href="shop.html">Shop</a> › <a href="shop.html?cat=${p.category}">${escapeHtml(cat?.name || "")}</a> › ${escapeHtml(p.name)}</nav>
    <div class="pd">
      <div class="pd-gallery">
        <div class="pd-media" ${photos.length ? `data-zoomable tabindex="0" role="button" aria-label="Enlarge photo"` : ""}>${productMedia(p)}${p.oldPrice ? `<span class="tag sale">−${discountPct(p)}%</span>` : p.badge ? `<span class="tag hot">${escapeHtml(p.badge)}</span>` : ""}
          ${photos.length ? `<span class="zoom-hint">${icon("zoom")}</span>` : ""}</div>
        ${photos.length > 1 ? `<div class="pd-thumbs">${photos.map((src, i) =>
          `<button type="button" class="pd-thumb${i === 0 ? " active" : ""}" data-photo="${escapeHtml(src)}" aria-label="Photo ${i + 1}"><img src="${escapeHtml(src)}" alt="" loading="lazy"></button>`).join("")}</div>` : ""}
        ${!p.image && photos.length ? `<p class="photo-credit" id="photo-credit">${photoCredit(photos[0])}</p>` : ""}
      </div>
      <div class="pd-info">
        ${p.brand ? `<div class="card-cat">${escapeHtml(p.brand)}</div>` : ""}
        <h1>${escapeHtml(p.name)}</h1>
        ${askPrice(p)
          ? `<div class="pd-price ask">Price on request</div>
             <p class="stock yes">● Ask us for today's price, sizes and brands</p>`
          : `<div class="pd-price">${money(p.price)} <small>per ${escapeHtml(unitName(p))}</small>${p.oldPrice ? ` <s>${money(p.oldPrice)}</s> <span class="save-tag">Save ${money(p.oldPrice - p.price)}</span>` : ""}</div>
             ${stockLine}`}
        <p>${escapeHtml(p.description || "")}</p>
        ${versions.length > 1 ? `<div class="variants"><span class="variants-label">${escapeHtml(versionLabel(versions))}</span>
          <div class="variant-list">${versions.map((v) => v.id === p.id
            ? `<span class="variant active" aria-current="true">${escapeHtml(v.variant)}</span>`
            : `<a class="variant" href="${productHref(v)}">${escapeHtml(v.variant)}<small>${askPrice(v) ? "Ask" : money(v.price)}</small></a>`).join("")}</div></div>` : ""}
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
          <a class="btn btn-lg btn-wa" target="_blank" rel="noopener" href="${askPriceLink(p)}">${escapeHtml(t("Ask for price"))} — WhatsApp</a>
        </div>` : `<div class="pd-buy">
          <div class="qty qty-lg">
            <button type="button" aria-label="Decrease" data-step="-1">−</button>
            <input id="pd-qty" type="number" min="1" value="1" inputmode="numeric" aria-label="Quantity">
            <button type="button" aria-label="Increase" data-step="1">+</button>
          </div>
          <button class="btn btn-lg" id="pd-add" ${out ? "disabled" : ""}>${escapeHtml(t(out ? "Sold out" : "Add to cart"))}</button>
          ${out ? "" : `<a class="btn btn-lg btn-wa" id="pd-wa" target="_blank" rel="noopener">Order on WhatsApp</a>`}
        </div>
        <p class="pd-line" id="pd-line"></p>`}
        <div class="pd-secondary">
          <button type="button" class="link-btn${isWished(p.id) ? " on" : ""}" data-wish="${p.id}" aria-pressed="${isWished(p.id)}">${icon("heart")} <span>${isWished(p.id) ? "Saved to wishlist" : "Save to wishlist"}</span></button>
          <button type="button" class="link-btn${isCompared(p.id) ? " on" : ""}" data-compare="${p.id}" aria-pressed="${isCompared(p.id)}">${icon("compare")} <span>${isCompared(p.id) ? "Added to compare" : "Compare"}</span></button>
        </div>
        <p class="hint">Buying for a project? <a href="quote.html?item=${encodeURIComponent(p.id)}">Request a quote</a> for large quantities.</p>
        <ul class="pd-assure">
          <li>${icon("shield")} Genuine, original stock</li>
          <li>${icon("truck")} Delivery in Kumasi &amp; Accra, or pick up in Kumasi</li>
          <li>${icon("card")} Pay by cash, card or mobile money</li>
        </ul>
      </div>
    </div>
    ${specs.length ? `<section class="specs"><h2>Specifications</h2><table>
        ${p.brand ? `<tr><th>Brand</th><td>${escapeHtml(p.brand)}</td></tr>` : ""}
        ${specs.map(([k, v]) => `<tr><th>${escapeHtml(k)}</th><td>${escapeHtml(v)}</td></tr>`).join("")}
      </table></section>` : ""}
    <section id="together" class="together" hidden></section>`;

  if (!askPrice(p)) initBuyBox(root, p);

  const related = PRODUCTS.filter((x) => x.category === p.category && x.id !== p.id && (!p.group || x.group !== p.group)).slice(0, 4);
  document.getElementById("related").innerHTML = related.length
    ? `<h2>More in ${escapeHtml(cat?.name || "this category")}</h2><div class="grid">${related.map(productCard).join("")}</div>`
    : "";
}

// "Choose wattage" / "Choose size" … from what the versions differ by
function versionLabel(versions) {
  const v = versions.map((x) => x.variant).join(" ");
  if (/\d+(\.\d+)?W\b/.test(v)) return "Choose wattage";
  if (/HP|kVA/.test(v)) return "Choose capacity";
  if (/mm|"|L\b/.test(v)) return "Choose size";
  return "Choose version";
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

// ---------- Orders (shared by cart and checkout) ----------
function buildOrder({ kind = "order", method = "pickup", payment = "later", customer = {}, notes = "" } = {}) {
  const items = cartItems();
  const subtotal = items.reduce((s, i) => s + i.lineTotal, 0);
  const delivery = deliveryFor(method, subtotal);
  const online = payment === "online";
  return {
    kind,
    ref: makeRef(kind === "proforma" ? "PF" : "LW"),
    date: new Date(),
    items, subtotal, method, delivery,
    total: subtotal + (delivery.fee || 0),
    paymentLabel: kind === "proforma" ? "To be agreed" : online ? "Paid online (Paystack)" : method === "pickup" ? "Pay at pickup" : "Pay on delivery",
    customer: { name: "", company: "", phone: "", email: "", address: "", gps: "", ...customer },
    notes,
  };
}

function orderMessage(o) {
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
}

const emptyCartHtml = () => `<div class="empty">${icon("cart", "empty-ico")}<h3>Your cart is empty</h3>
  <p>Browse lighting, cables, sockets, breakers, solar and more.</p><a class="btn" href="shop.html">Start shopping</a></div>`;

// Progress towards free delivery
function freeDeliveryHtml(subtotal) {
  const D = SHOP.delivery;
  const pct = Math.min(100, Math.round((subtotal / D.freeOver) * 100));
  return `<div class="free-progress">
    <p>${subtotal >= D.freeOver
      ? `${icon("check")} You qualify for <strong>free delivery</strong> in Kumasi &amp; Accra.`
      : `Add <strong>${money(D.freeOver - subtotal)}</strong> more for free delivery in Kumasi &amp; Accra.`}</p>
    <div class="bar"><span style="width:${pct}%"></span></div>
  </div>`;
}

// ---------- Cart page ----------
function initCart() {
  const list = document.getElementById("cart-items");
  const summary = document.getElementById("cart-summary");

  const render = () => {
    const items = cartItems();
    if (!items.length) {
      list.innerHTML = emptyCartHtml();
      summary.hidden = true;
      return;
    }
    summary.hidden = false;
    list.innerHTML = items
      .map(({ product: p, qty, unit, lineTotal, bulkApplied }) => `
        <div class="cart-row">
          <a class="cart-thumb" href="${productHref(p)}">${productMedia(p, { compact: true })}</a>
          <div class="cart-info">
            <a href="${productHref(p)}"><strong>${escapeHtml(p.name)}</strong></a>
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
    const subtotal = items.reduce((s, i) => s + i.lineTotal, 0);
    const count = items.reduce((s, i) => s + i.qty, 0);
    summary.innerHTML = `
      <h2>Order summary</h2>
      <div class="sum-row"><span>Items (${count})</span><span>${money(subtotal)}</span></div>
      <div class="sum-row"><span>Delivery</span><span class="muted">Chosen at checkout</span></div>
      <div class="sum-row total"><span>Subtotal</span><span>${money(subtotal)}</span></div>
      ${freeDeliveryHtml(subtotal)}
      <a class="btn btn-lg btn-block" href="checkout.html">Proceed to checkout</a>
      <button type="button" class="btn btn-ghost btn-block" id="proforma-btn">${icon("printer")} Print proforma invoice</button>
      <a class="continue" href="shop.html">← Continue shopping</a>
      <div class="pay-badges">${paymentBadgesHtml()}</div>`;
    document.getElementById("proforma-btn").onclick = () => printInvoice(buildOrder({ kind: "proforma" }));
  };

  list.addEventListener("click", (e) => {
    const q = e.target.closest("[data-qty]");
    const r = e.target.closest("[data-remove]");
    if (q) setQty(q.dataset.qty, (getCart()[q.dataset.qty] || 0) + Number(q.dataset.d));
    if (r) setQty(r.dataset.remove, 0);
    if (q || r) render();
  });
  render();
}

// ---------- Checkout page ----------
function initCheckout() {
  const checkout = document.getElementById("checkout");
  const summary = document.getElementById("order-summary");
  const result = document.getElementById("order-result");
  const layout = document.querySelector(".checkout-layout");
  const onlineEnabled = !!SHOP.paystackPublicKey;
  const D = SHOP.delivery;

  if (!cartItems().length) {
    layout.innerHTML = `<div class="checkout-empty">${emptyCartHtml()}</div>`;
    return;
  }

  if (!onlineEnabled) checkout.querySelector("#pay-online-option").remove();
  else loadScript("https://js.paystack.co/v1/inline.js");

  const val = (name) => checkout.elements[name]?.value?.trim() || "";
  const method = () => checkout.querySelector('input[name="method"]:checked')?.value || "pickup";
  const payment = () => checkout.querySelector('input[name="payment"]:checked')?.value || "later";
  const currentOrder = (kind = "order") => buildOrder({
    kind, method: method(), payment: payment(), notes: val("notes"),
    customer: {
      name: val("name"), company: val("company"), phone: val("phone"), email: val("email"),
      address: method() === "pickup" ? "" : val("address"), gps: method() === "pickup" ? "" : val("gps"),
    },
  });

  // Recalculate delivery & totals, and enforce the delivery rules on the form
  const update = () => {
    const items = cartItems();
    const subtotal = items.reduce((s, i) => s + i.lineTotal, 0);

    // Accra: only for big orders
    const accra = checkout.querySelector('input[value="accra"]');
    const accraOk = subtotal >= D.accraMinimum;
    accra.disabled = !accraOk;
    checkout.querySelector("#accra-note").textContent = accraOk
      ? subtotal >= D.freeOver ? "Free delivery" : `${moneyRound(D.accraFee)} delivery fee`
      : `For orders of ${moneyRound(D.accraMinimum)}+ (add ${money(D.accraMinimum - subtotal)} more)`;
    if (!accraOk && accra.checked) checkout.querySelector('input[value="kumasi"]').checked = true;
    checkout.querySelector("#kumasi-note").textContent =
      subtotal >= D.freeOver ? "Free delivery" : `${moneyRound(D.kumasiFee)} delivery fee · usually next working day`;

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
    checkout.querySelector("#place-order").innerHTML = payingOnline
      ? `${icon("lock")} Pay ${money(subtotal + (del.fee || 0))} now`
      : `${icon("whatsapp")} Place order via WhatsApp`;

    summary.innerHTML = `
      <h2>Your order</h2>
      <ul class="mini-items">${items.map((i) => `<li>
        <span class="mini-thumb">${productMedia(i.product, { compact: true })}<b>${i.qty}</b></span>
        <span class="mini-name">${escapeHtml(i.product.name)}</span><span>${money(i.lineTotal)}</span></li>`).join("")}</ul>
      <div class="sum-row"><span>Subtotal</span><span>${money(subtotal)}</span></div>
      <div class="sum-row"><span>Delivery</span><span>${del.label}</span></div>
      <div class="sum-row total"><span>Total</span><span>${money(subtotal + (del.fee || 0))}${del.fee === null ? " + delivery" : ""}</span></div>
      ${m === "other" ? `<p class="hint">We'll call you to arrange transport and agree the delivery cost.</p>` : m !== "pickup" ? freeDeliveryHtml(subtotal) : ""}
      <a class="continue" href="cart.html">← Edit cart</a>
      <ul class="pd-assure">
        <li>${icon("shield")} Genuine, original stock</li>
        <li>${icon("check")} We confirm stock and price before you pay</li>
      </ul>`;
  };

  // Show the confirmation + invoice once the order is placed
  const complete = (order) => {
    const text = orderMessage(order);
    saveCart({});
    layout.hidden = true;
    document.querySelector(".checkout-steps")?.classList.add("done");
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
  };

  checkout.addEventListener("change", update);

  checkout.addEventListener("submit", (e) => {
    e.preventDefault();
    const order = currentOrder();
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

  update();
}

// ---------- Contact page ----------
// The form doesn't send by itself yet: it prepares the message for WhatsApp or email
function initContact() {
  const form = document.getElementById("contact-form");
  const result = document.getElementById("contact-result");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(form));
    const text = [
      `*MESSAGE — ${f.subject}* — ${SHOP.name}`,
      "",
      `Name: ${f.name}`,
      `Phone: ${f.phone}`,
      f.email ? `Email: ${f.email}` : null,
      "",
      f.message,
    ].filter((l) => l !== null).join("\n");
    form.hidden = true;
    result.hidden = false;
    result.innerHTML = `
      <div class="success-box">
        <h2>${icon("check")} Thank you, ${escapeHtml(f.name.split(" ")[0] || "")}!</h2>
        <p>Your message is ready. Tap a button to send it — we reply within working hours (${escapeHtml(SHOP.hours)}).</p>
        <div class="send-btns">
          <a class="btn btn-wa" target="_blank" rel="noopener" href="${waLink(text)}">Send on WhatsApp</a>
          <a class="btn btn-ghost" href="${mailLink(`${f.subject} — website message`, text.replace(/\*/g, ""))}">Send by email</a>
          <button type="button" class="btn btn-ghost" id="contact-again">Write another message</button>
        </div>
      </div>`;
    document.getElementById("contact-again").onclick = () => { form.reset(); form.hidden = false; result.hidden = true; };
  });
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
  const init = {
    home: initHome, shop: initShop, product: initProduct, cart: initCart, checkout: initCheckout,
    quote: initQuote, contact: initContact,
  }[document.body.dataset.page];
  if (init) init();
});
