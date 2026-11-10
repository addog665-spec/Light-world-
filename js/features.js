// ============================================================
//  Extra shop features — live search, wishlist, compare, recently viewed,
//  "frequently bought together", photo gallery & zoom, promo slider, solar
//  calculator, buying guides, order tracking and the contact map.
//  Runs after js/app.js has drawn the page. You normally don't need to edit this file.
// ============================================================

// ---------- Live search (header panel, home banner, 404 page) ----------
function searchCatalogue(query) {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return { products: [], categories: [], guides: [] };
  const score = (text, w) => (text.toLowerCase().includes(w) ? 1 : 0);
  const products = PRODUCTS.map((p) => {
    const cat = findCategory(p.category)?.name || "";
    let s = 0;
    for (const w of words) {
      const hit = score(p.name, w) * 3 + score(p.brand || "", w) * 2 + score(p.type || "", w) * 2 + score(cat, w) + score(p.description || "", w) * 0.5;
      if (!hit) return null; // every word must match somewhere
      s += hit;
    }
    if (p.name.toLowerCase().startsWith(words[0])) s += 2;
    return { p, s };
  }).filter(Boolean).sort((a, b) => b.s - a.s).map((x) => x.p);
  const categories = CATEGORIES.filter((c) => words.every((w) => (c.name + " " + c.blurb).toLowerCase().includes(w)));
  const guides = (typeof GUIDES !== "undefined" ? GUIDES : []).filter((g) => words.every((w) => (g.title + " " + g.summary).toLowerCase().includes(w)));
  return { products, categories, guides };
}

function initLiveSearch(form) {
  const input = form.querySelector("input[name=q]");
  const box = document.createElement("div");
  box.className = "live-results";
  box.hidden = true;
  box.setAttribute("role", "listbox");
  form.appendChild(box);
  form.classList.add("has-live");
  let active = -1;

  const links = () => [...box.querySelectorAll("a")];
  const setActive = (i) => {
    const l = links();
    active = l.length ? (i + l.length) % l.length : -1;
    l.forEach((a, n) => a.classList.toggle("active", n === active));
    l[active]?.scrollIntoView({ block: "nearest" });
  };
  const render = () => {
    const q = input.value.trim();
    if (q.length < 2) { box.hidden = true; return; }
    const r = searchCatalogue(q);
    const total = r.products.length;
    box.innerHTML = `
      ${r.categories.slice(0, 2).map((c) => `<a class="lr-cat" href="shop.html?cat=${c.id}">${icon(c.icon)}<span>${escapeHtml(c.name)}</span><small>Department</small></a>`).join("")}
      ${r.products.slice(0, 6).map((p) => `<a class="lr-item" href="${productHref(p)}">
          <span class="lr-thumb">${productMedia(p, { compact: true })}</span>
          <span class="lr-name">${escapeHtml(p.name)}<small>${escapeHtml(p.brand || findCategory(p.category)?.name || "")}</small></span>
          <span class="lr-price">${askPrice(p) ? "Ask" : money(p.price)}</span></a>`).join("")}
      ${r.guides.slice(0, 2).map((g) => `<a class="lr-cat" href="guide.html?id=${g.id}">${icon("book")}<span>${escapeHtml(g.title)}</span><small>Guide</small></a>`).join("")}
      ${total ? `<a class="lr-all" href="shop.html?q=${encodeURIComponent(q)}">See all ${total} result${total === 1 ? "" : "s"} for “${escapeHtml(q)}” →</a>`
        : `<div class="lr-none">No products match “${escapeHtml(q)}”. <a href="quote.html">Ask us for it →</a></div>`}`;
    box.hidden = false;
    active = -1;
  };
  input.addEventListener("input", render);
  input.addEventListener("focus", render);
  input.addEventListener("keydown", (e) => {
    if (box.hidden) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setActive(active + 1); }
    if (e.key === "ArrowUp") { e.preventDefault(); setActive(active - 1); }
    if (e.key === "Enter" && active >= 0) { e.preventDefault(); links()[active].click(); }
    if (e.key === "Escape") { box.hidden = true; }
  });
  document.addEventListener("click", (e) => { if (!form.contains(e.target)) box.hidden = true; });
}

function initSearchPanel() {
  const panel = document.getElementById("search-panel");
  const toggle = document.querySelector(".search-toggle");
  if (!panel || !toggle) return;
  const input = panel.querySelector("input");
  const open = (show) => {
    panel.hidden = !show;
    toggle.setAttribute("aria-expanded", show);
    if (show) setTimeout(() => input.focus(), 30);
  };
  toggle.addEventListener("click", () => open(panel.hidden));
  panel.querySelector(".search-close").addEventListener("click", () => open(false));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !panel.hidden) open(false); });
  // "/" opens search, like many shops
  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && !/input|textarea|select/i.test(document.activeElement.tagName)) { e.preventDefault(); open(true); }
  });
}

// ---------- Wishlist & compare buttons (on cards and product pages) ----------
function refreshListButtons() {
  const wish = loadList(WISH_KEY), cmp = loadList(COMPARE_KEY);
  document.querySelectorAll("[data-wish]").forEach((b) => {
    const on = wish.includes(b.dataset.wish);
    b.classList.toggle("on", on); b.setAttribute("aria-pressed", on);
    const label = b.querySelector("span"); if (label) label.textContent = on ? "Saved to wishlist" : "Save to wishlist";
  });
  document.querySelectorAll("[data-compare]").forEach((b) => {
    const on = cmp.includes(b.dataset.compare);
    b.classList.toggle("on", on); b.setAttribute("aria-pressed", on);
    const label = b.querySelector("span"); if (label) label.textContent = on ? "Added to compare" : "Compare";
  });
  renderCompareBar();
}

document.addEventListener("click", (e) => {
  const w = e.target.closest("[data-wish]");
  const c = e.target.closest("[data-compare]");
  if (w) {
    e.preventDefault();
    const id = w.dataset.wish, list = loadList(WISH_KEY), p = findProduct(id);
    const on = !list.includes(id);
    saveList(WISH_KEY, on ? [id, ...list] : list.filter((x) => x !== id));
    toast(on ? `Saved “${p.name}” to your wishlist` : `Removed “${p.name}” from your wishlist`, false);
    refreshListButtons();
  }
  if (c) {
    e.preventDefault();
    const id = c.dataset.compare, list = loadList(COMPARE_KEY), p = findProduct(id);
    if (!list.includes(id) && list.length >= COMPARE_MAX) {
      toast(`You can compare up to ${COMPARE_MAX} products. Remove one first.`, false);
      return;
    }
    const on = !list.includes(id);
    saveList(COMPARE_KEY, on ? [...list, id] : list.filter((x) => x !== id));
    if (on && list.length && findProduct(list[0]).category !== p.category)
      toast("Tip: comparing products from the same department works best.", false);
    refreshListButtons();
  }
});

// Floating bar listing the products picked for comparison
function renderCompareBar() {
  let bar = document.getElementById("compare-bar");
  const ids = loadList(COMPARE_KEY);
  if (document.body.dataset.page === "compare" || !ids.length) { bar?.remove(); return; }
  if (!bar) {
    bar = document.createElement("div");
    bar.id = "compare-bar";
    bar.className = "compare-bar";
    bar.setAttribute("role", "region");
    bar.setAttribute("aria-label", "Products to compare");
    document.body.appendChild(bar);
  }
  bar.innerHTML = `<div class="container">
      <div class="cb-items">${ids.map((id) => { const p = findProduct(id); return `<span class="cb-item" title="${escapeHtml(p.name)}">${productMedia(p, { compact: true })}
        <button type="button" data-compare="${id}" aria-label="Remove ${escapeHtml(p.name)}">${icon("close")}</button></span>`; }).join("")}
        ${Array.from({ length: COMPARE_MAX - ids.length }, () => `<span class="cb-item cb-slot"></span>`).join("")}</div>
      <span class="cb-text">${ids.length} of ${COMPARE_MAX} selected</span>
      <button type="button" class="btn btn-ghost btn-sm" data-compare-clear>Clear</button>
      <a class="btn btn-sm" href="compare.html">${icon("compare")} ${escapeHtml(t("Compare"))}</a>
    </div>`;
  bar.querySelector("[data-compare-clear]").onclick = () => { saveList(COMPARE_KEY, []); refreshListButtons(); };
}

// ---------- Recently viewed ----------
function rememberViewed(id) {
  const list = loadList(RECENT_KEY).filter((x) => x !== id);
  try { localStorage.setItem(RECENT_KEY, JSON.stringify([id, ...list].slice(0, 12))); } catch {}
}
function renderRecent(container, { exclude, title, max = 4 }) {
  const ids = loadList(RECENT_KEY).filter((x) => x !== exclude).slice(0, max);
  if (!container || !ids.length) return;
  container.hidden = false;
  const grid = container.querySelector(".grid");
  const cards = ids.map((id) => productCard(findProduct(id))).join("");
  if (grid) grid.innerHTML = cards;
  else container.innerHTML = `<h2>${escapeHtml(title)}</h2><div class="grid">${cards}</div>`;
}

// ---------- Product page: gallery, zoom, frequently bought together ----------
function initProductExtras() {
  const p = findProduct(new URLSearchParams(location.search).get("id"));
  if (!p) return;
  rememberViewed(p.id);
  renderRecent(document.getElementById("recent"), { exclude: p.id, title: t("Recently viewed") });

  const media = document.querySelector(".pd-media");
  const photos = [...document.querySelectorAll(".pd-thumb")].map((b) => b.dataset.photo);
  let current = 0;
  const show = (i) => {
    current = i;
    const img = media.querySelector("img");
    if (img) img.src = photos[i];
    document.querySelectorAll(".pd-thumb").forEach((b, n) => b.classList.toggle("active", n === i));
  };
  document.querySelectorAll(".pd-thumb").forEach((b, i) => b.addEventListener("click", () => show(i)));
  if (media?.hasAttribute("data-zoomable")) {
    const all = photos.length ? photos : [media.querySelector("img")?.getAttribute("src")].filter(Boolean);
    const open = () => openLightbox(all, current, p.name, !p.image);
    media.addEventListener("click", open);
    media.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
  }

  // Frequently bought together
  const box = document.getElementById("together");
  const ids = (p.together || TOGETHER[p.type] || []).filter((id) => id !== p.id && findProduct(id));
  if (!box || !ids.length) return;
  const items = [p, ...ids.map(findProduct)];
  box.hidden = false;
  box.innerHTML = `<h2>Frequently bought together</h2>
    <div class="fbt">
      <div class="fbt-items">${items.map((x, i) => `
        ${i ? `<span class="fbt-plus" aria-hidden="true">+</span>` : ""}
        <label class="fbt-item${canBuy(x) ? "" : " disabled"}">
          <input type="checkbox" value="${x.id}" ${canBuy(x) ? "checked" : "disabled"}>
          <span class="fbt-thumb">${productMedia(x, { compact: true })}</span>
          <span class="fbt-name">${i === 0 ? "<b>This item:</b> " : ""}<a href="${productHref(x)}">${escapeHtml(x.name)}</a></span>
          <span class="fbt-price">${askPrice(x) ? "Ask for price" : money(x.price)}</span>
        </label>`).join("")}</div>
      <div class="fbt-total"><span>Total for selected</span><strong id="fbt-sum"></strong>
        <button type="button" class="btn" id="fbt-add"></button>
        ${items.some((x) => askPrice(x)) ? `<small class="muted">Items without a price can be added on WhatsApp.</small>` : ""}</div>
    </div>`;
  const update = () => {
    const chosen = [...box.querySelectorAll("input:checked")].map((i) => findProduct(i.value));
    box.querySelector("#fbt-sum").textContent = money(chosen.reduce((s, x) => s + x.price, 0));
    const btn = box.querySelector("#fbt-add");
    btn.textContent = chosen.length ? `Add ${chosen.length} to cart` : "Select items";
    btn.disabled = !chosen.length;
  };
  box.addEventListener("change", update);
  box.querySelector("#fbt-add").addEventListener("click", () => {
    const chosen = [...box.querySelectorAll("input:checked")].map((i) => i.value);
    const cart = getCart();
    chosen.forEach((id) => { cart[id] = (cart[id] || 0) + 1; });
    saveCart(cart);
    toast(`Added ${chosen.length} item${chosen.length === 1 ? "" : "s"} to cart`);
  });
  update();
}

// Full-screen photo viewer: arrows to move, click the photo to zoom in and move around
function openLightbox(photos, start, title, example) {
  let i = start;
  const lb = document.createElement("div");
  lb.className = "lightbox";
  lb.setAttribute("role", "dialog");
  lb.setAttribute("aria-modal", "true");
  lb.setAttribute("aria-label", `${title} — photos`);
  lb.innerHTML = `
    <button type="button" class="lb-close" aria-label="Close">${icon("close")}</button>
    ${photos.length > 1 ? `<button type="button" class="lb-nav prev" aria-label="Previous photo">${icon("chevron")}</button>
      <button type="button" class="lb-nav next" aria-label="Next photo">${icon("chevron")}</button>` : ""}
    <figure><div class="lb-stage"><img alt=""></div>
      <figcaption>${escapeHtml(title)}${example ? " · Example photo" : ""}${photos.length > 1 ? ` · <span class="lb-count"></span>` : ""}<br><small>Click the photo to zoom</small></figcaption></figure>`;
  document.body.appendChild(lb);
  document.body.style.overflow = "hidden";
  const img = lb.querySelector("img"), stage = lb.querySelector(".lb-stage");
  const show = () => {
    img.src = photos[i];
    stage.classList.remove("zoomed");
    img.style.transformOrigin = "";
    const c = lb.querySelector(".lb-count"); if (c) c.textContent = `${i + 1} / ${photos.length}`;
  };
  const close = () => { lb.remove(); document.body.style.overflow = ""; document.removeEventListener("keydown", keys); };
  const keys = (e) => {
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight" && photos.length > 1) { i = (i + 1) % photos.length; show(); }
    if (e.key === "ArrowLeft" && photos.length > 1) { i = (i - 1 + photos.length) % photos.length; show(); }
  };
  const pan = (e) => {
    const r = stage.getBoundingClientRect();
    img.style.transformOrigin = `${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`;
  };
  stage.addEventListener("click", (e) => { pan(e); stage.classList.toggle("zoomed"); });
  stage.addEventListener("mousemove", (e) => { if (stage.classList.contains("zoomed")) pan(e); });
  lb.querySelector(".lb-close").onclick = close;
  lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
  lb.querySelector(".prev")?.addEventListener("click", () => { i = (i - 1 + photos.length) % photos.length; show(); });
  lb.querySelector(".next")?.addEventListener("click", () => { i = (i + 1) % photos.length; show(); });
  document.addEventListener("keydown", keys);
  show();
  lb.querySelector(".lb-close").focus();
}

// ---------- Home page: promo slider and recently viewed ----------
function initPromoSlider() {
  const slides = SHOP.promoSlides || [];
  const root = document.getElementById("promo-slider");
  if (!root || !slides.length) return;
  document.getElementById("promo-section").hidden = false;
  root.innerHTML = `
    <div class="ps-track">${slides.map((s, i) => `
      <article class="ps-slide${i === 0 ? " active" : ""}" aria-roledescription="slide" aria-label="${i + 1} of ${slides.length}" ${i ? 'aria-hidden="true"' : ""}>
        <img src="${escapeHtml(s.image)}" alt="" loading="${i ? "lazy" : "eager"}">
        <div class="ps-text">
          ${s.kicker ? `<p class="ps-kicker">${escapeHtml(s.kicker)}</p>` : ""}
          <h2>${escapeHtml(s.title)}</h2>
          <p>${escapeHtml(s.text || "")}</p>
          ${s.link ? `<a class="btn" href="${escapeHtml(s.link)}" ${i ? 'tabindex="-1"' : ""}>${escapeHtml(s.linkText || "Find out more")} →</a>` : ""}
        </div>
      </article>`).join("")}</div>
    ${slides.length > 1 ? `
      <button type="button" class="ps-nav prev" aria-label="Previous offer">${icon("chevron")}</button>
      <button type="button" class="ps-nav next" aria-label="Next offer">${icon("chevron")}</button>
      <div class="ps-dots">${slides.map((_, i) => `<button type="button" aria-label="Show offer ${i + 1}" ${i === 0 ? 'aria-current="true"' : ""}></button>`).join("")}</div>` : ""}`;
  if (slides.length < 2) return;
  let i = 0, timer;
  const go = (n) => {
    i = (n + slides.length) % slides.length;
    root.querySelectorAll(".ps-slide").forEach((s, k) => {
      s.classList.toggle("active", k === i);
      s.setAttribute("aria-hidden", k !== i);
      s.querySelector(".btn")?.setAttribute("tabindex", k === i ? "0" : "-1");
    });
    root.querySelectorAll(".ps-dots button").forEach((d, k) => d.toggleAttribute("aria-current", k === i));
  };
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const play = () => { if (!reduce) { clearInterval(timer); timer = setInterval(() => go(i + 1), 6500); } };
  const stop = () => clearInterval(timer);
  root.querySelector(".prev").onclick = () => { go(i - 1); play(); };
  root.querySelector(".next").onclick = () => { go(i + 1); play(); };
  root.querySelectorAll(".ps-dots button").forEach((d, k) => d.addEventListener("click", () => { go(k); play(); }));
  root.addEventListener("mouseenter", stop);
  root.addEventListener("mouseleave", play);
  root.addEventListener("focusin", stop);
  // swipe on phones
  let x0 = null;
  root.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; stop(); }, { passive: true });
  root.addEventListener("touchend", (e) => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1));
    x0 = null; play();
  });
  play();
}

// ---------- Wishlist page ----------
function initWishlist() {
  const grid = document.getElementById("wish-grid");
  const actions = document.getElementById("wish-actions");
  const render = () => {
    const items = loadList(WISH_KEY).map(findProduct);
    document.getElementById("wish-count").textContent = items.length ? `${items.length} saved item${items.length === 1 ? "" : "s"}` : "";
    if (!items.length) {
      actions.hidden = true;
      grid.innerHTML = `<div class="empty">${icon("heart", "empty-ico")}<h3>Your wishlist is empty</h3>
        <p>Tap the heart on any product to save it here for later.</p><a class="btn" href="shop.html">Browse the shop</a></div>`;
      return;
    }
    actions.hidden = false;
    grid.innerHTML = items.map(productCard).join("");
    const priced = items.filter(canBuy);
    const msg = [`Hello ${SHOP.name}, I'm interested in these items:`, "", ...items.map((p) => `• ${p.name}${askPrice(p) ? " (price?)" : ` — ${money(p.price)}`}`)].join("\n");
    actions.innerHTML = `
      <button type="button" class="btn" id="wish-all" ${priced.length ? "" : "disabled"}>Add ${priced.length} to cart</button>
      <a class="btn btn-wa" target="_blank" rel="noopener" href="${waLink(msg)}">${icon("whatsapp")} Send list on WhatsApp</a>
      <button type="button" class="btn btn-ghost" id="wish-clear">Clear wishlist</button>`;
    document.getElementById("wish-all").onclick = () => {
      const cart = getCart();
      priced.forEach((p) => { cart[p.id] = (cart[p.id] || 0) + 1; });
      saveCart(cart);
      toast(`Added ${priced.length} item${priced.length === 1 ? "" : "s"} to cart`);
    };
    document.getElementById("wish-clear").onclick = () => { saveList(WISH_KEY, []); render(); };
  };
  document.addEventListener("lists-changed", render);
  render();
}

// ---------- Compare page ----------
function initCompare() {
  const root = document.getElementById("compare-root");
  const render = () => {
    const items = loadList(COMPARE_KEY).map(findProduct);
    if (!items.length) {
      root.innerHTML = `<div class="empty">${icon("compare", "empty-ico")}<h3>Nothing to compare yet</h3>
        <p>Tap the compare icon on up to ${COMPARE_MAX} products — for example inverters, ACs or TVs — to see them side by side.</p>
        <a class="btn" href="shop.html">Browse the shop</a></div>`;
      return;
    }
    const specKeys = [...new Set(items.flatMap((p) => Object.keys(p.specs || {})))];
    const row = (label, cells, cls = "") => `<tr class="${cls}"><th scope="row">${escapeHtml(label)}</th>${cells.map((c) => `<td>${c}</td>`).join("")}</tr>`;
    const best = Math.min(...items.filter((p) => !askPrice(p)).map((p) => p.price));
    root.innerHTML = `
      <div class="compare-actions"><span class="muted">${items.length} of ${COMPARE_MAX} products</span>
        <button type="button" class="btn btn-ghost btn-sm" id="compare-clear">Clear all</button></div>
      <div class="compare-scroll"><table class="compare-table">
        <thead><tr><th></th>${items.map((p) => `<th scope="col">
          <div class="ct-media">${productMedia(p, { compact: true })}</div>
          <a href="${productHref(p)}">${escapeHtml(p.name)}</a>
          <button type="button" class="link-btn" data-compare="${p.id}">${icon("close")} Remove</button></th>`).join("")}</tr></thead>
        <tbody>
          ${row("Price", items.map((p) => askPrice(p) ? "Price on request" : `<strong>${money(p.price)}</strong>${p.price === best && items.length > 1 ? ` <span class="best-tag">Lowest</span>` : ""}`), "price-row")}
          ${row("Brand", items.map((p) => escapeHtml(p.brand || "—")))}
          ${row("Department", items.map((p) => escapeHtml(findCategory(p.category)?.name || "")))}
          ${row("Type", items.map((p) => escapeHtml(p.type || "")))}
          ${row("Availability", items.map((p) => p.stock === 0 ? "Out of stock" : lowStock(p) ? `Only ${p.stock} left` : "In stock"))}
          ${specKeys.map((k) => row(k, items.map((p) => escapeHtml(p.specs?.[k] || "—")))).join("")}
          ${row("", items.map((p) => canBuy(p) ? `<button class="btn btn-sm" data-add="${p.id}">${escapeHtml(t("Add to cart"))}</button>`
            : `<a class="btn btn-sm btn-wa" target="_blank" rel="noopener" href="${askPriceLink(p)}">${escapeHtml(t("Ask for price"))}</a>`), "buy-row")}
        </tbody></table></div>`;
    document.getElementById("compare-clear").onclick = () => saveList(COMPARE_KEY, []);
  };
  document.addEventListener("lists-changed", render);
  render();
}

// ---------- Solar & inverter calculator ----------
// Typical power use. You can change watts, hours and starting quantities here.
// motor: has a start-up surge (fridges, pumps, ACs); heavy: not recommended on an inverter
const CALC_APPLIANCES = [
  { id: "bulb", name: "LED bulbs", watts: 10, hours: 6, qty: 6, icon: "bulb" },
  { id: "fan", name: "Ceiling / standing fans", watts: 75, hours: 8, qty: 2, icon: "fan" },
  { id: "tv", name: "TV (32–55\")", watts: 80, hours: 5, qty: 1, icon: "tv" },
  { id: "decoder", name: "Decoder or Wi-Fi router", watts: 20, hours: 8, qty: 1, icon: "tv" },
  { id: "phone", name: "Phone chargers", watts: 10, hours: 3, qty: 3, icon: "plug" },
  { id: "laptop", name: "Laptops", watts: 65, hours: 6, qty: 1, icon: "tv" },
  { id: "desktop", name: "Desktop computers", watts: 200, hours: 6, qty: 0, icon: "tv" },
  { id: "fridge", name: "Fridge", watts: 150, hours: 8, qty: 1, icon: "fridge", motor: true },
  { id: "freezer", name: "Chest freezer", watts: 200, hours: 10, qty: 0, icon: "fridge", motor: true },
  { id: "cctv", name: "CCTV kit (4 cameras)", watts: 40, hours: 24, qty: 0, icon: "camera" },
  { id: "washer", name: "Washing machine", watts: 500, hours: 1, qty: 0, icon: "washer", motor: true },
  { id: "pump", name: "Water pump (1HP)", watts: 750, hours: 1, qty: 0, icon: "battery", motor: true },
  { id: "ac1", name: "Air conditioner 1HP", watts: 900, hours: 6, qty: 0, icon: "fan", motor: true },
  { id: "ac15", name: "Air conditioner 1.5HP", watts: 1300, hours: 6, qty: 0, icon: "fan", motor: true },
  { id: "microwave", name: "Microwave", watts: 1000, hours: 0.25, qty: 0, icon: "kettle", heavy: true },
  { id: "iron", name: "Electric iron", watts: 1200, hours: 0.5, qty: 0, icon: "kettle", heavy: true },
  { id: "kettle", name: "Electric kettle", watts: 2000, hours: 0.2, qty: 0, icon: "kettle", heavy: true },
];
const INVERTER_SIZES = [1, 1.5, 2, 3, 5, 7.5, 10]; // kVA

function initCalculator() {
  const list = document.getElementById("calc-list");
  const out = document.getElementById("calc-result");
  const form = document.getElementById("calc-form");
  const rows = CALC_APPLIANCES.map((a) => ({ ...a }));

  list.innerHTML = rows.map((a, i) => `
    <div class="calc-row${a.heavy ? " heavy" : ""}" data-i="${i}">
      <span class="calc-ico">${icon(a.icon)}</span>
      <span class="calc-name">${escapeHtml(a.name)}<small>${a.watts}W each${a.heavy ? " · not ideal on an inverter" : ""}</small></span>
      <div class="qty" aria-label="${escapeHtml(a.name)} quantity">
        <button type="button" data-step="-1" aria-label="Fewer">−</button><span class="calc-q">${a.qty}</span><button type="button" data-step="1" aria-label="More">+</button>
      </div>
      <label class="calc-hours"><input type="number" min="0" max="24" step="0.5" value="${a.hours}" aria-label="${escapeHtml(a.name)} hours per day"><span>h/day</span></label>
    </div>`).join("");

  list.addEventListener("click", (e) => {
    const b = e.target.closest("[data-step]");
    if (!b) return;
    const row = b.closest(".calc-row"), a = rows[row.dataset.i];
    a.qty = Math.max(0, Math.min(50, a.qty + Number(b.dataset.step)));
    row.querySelector(".calc-q").textContent = a.qty;
    row.classList.toggle("on", a.qty > 0);
    calc();
  });
  list.addEventListener("input", (e) => {
    const row = e.target.closest(".calc-row");
    if (!row) return;
    rows[row.dataset.i].hours = Math.max(0, Math.min(24, parseFloat(e.target.value) || 0));
    calc();
  });
  form.addEventListener("input", calc);
  list.querySelectorAll(".calc-row").forEach((r) => r.classList.toggle("on", rows[r.dataset.i].qty > 0));

  function calc() {
    const backup = +form.backup.value, sun = +form.sun.value, lithium = form.battery.value === "lithium";
    document.getElementById("backup-val").textContent = `${backup} hours`;
    document.getElementById("sun-val").textContent = `${sun} hours`;
    const used = rows.filter((a) => a.qty > 0);
    if (!used.length) { out.innerHTML = `<div class="empty"><h3>Add some appliances</h3><p>Use the + buttons to tell us what you want to run.</p></div>`; return; }

    const load = used.reduce((s, a) => s + a.qty * a.watts, 0);
    const motor = Math.max(0, ...used.filter((a) => a.motor).map((a) => a.watts));
    const daily = used.reduce((s, a) => s + a.qty * a.watts * a.hours, 0);
    const backupWh = used.reduce((s, a) => s + a.qty * a.watts * Math.min(a.hours, backup), 0);
    const neededW = Math.max(load * 1.25, load + motor * 1.5);
    const kva = INVERTER_SIZES.find((k) => k * 800 >= neededW) || null;

    // Pick from what we stock
    const inv3 = findProduct("felicity-inverter-3kva"), inv5 = findProduct("felicity-inverter-5kva");
    let inverter = null, systemV = 24;
    if (kva && kva <= 3 && !lithium) { inverter = inv3; systemV = 24; }
    else if (kva && kva <= 5) { inverter = inv5; systemV = 48; }
    const lead = findProduct("tubular-battery-200ah"), li = findProduct("lithium-battery-5kwh"), panel = findProduct("solar-panel-450w");
    const usableEach = lithium ? 5120 * 0.9 : 2400 * 0.5;
    let batteries = Math.ceil((backupWh / 0.9) / usableEach);
    if (!lithium) { const series = systemV / 12; batteries = Math.max(series, Math.ceil(batteries / series) * series); }
    batteries = Math.max(1, batteries);
    const panelW = daily / (sun * 0.75);
    const panels = Math.max(2, Math.ceil(panelW / 450));
    const battery = lithium ? li : lead;
    const extras = [findProduct("changeover-63a"), findProduct("spd-surge")];
    const system = inverter ? [[inverter, 1], [battery, batteries], [panel, panels], ...extras.map((x) => [x, 1])] : [];
    const total = system.reduce((s, [p, n]) => s + p.price * n, 0);
    const heavy = used.filter((a) => a.heavy);
    const kw = (w) => (w >= 1000 ? `${(w / 1000).toFixed(w >= 10000 ? 0 : 1)}kW` : `${Math.round(w)}W`);
    const kwh = (wh) => `${(wh / 1000).toFixed(1)}kWh`;

    out.innerHTML = `
      <div class="calc-stats">
        <div><span>Running load</span><strong>${kw(load)}</strong></div>
        <div><span>Daily energy</span><strong>${kwh(daily)}</strong></div>
        <div><span>Needed for ${backup}h backup</span><strong>${kwh(backupWh)}</strong></div>
      </div>
      ${heavy.length ? `<p class="calc-warn">${icon("shield")} ${escapeHtml(heavy.map((a) => a.name).join(", "))} use a lot of power for a short time. We recommend running ${heavy.length > 1 ? "them" : "it"} on ECG power or a generator, not the inverter.</p>` : ""}
      ${inverter ? `
        <h3>Recommended system</h3>
        <ul class="calc-system">
          <li><span class="cs-ico">${icon("battery")}</span><span><strong>Inverter: ${kva}kVA needed</strong><small>${inverter.variant === "3kVA" && kva < 3 ? `We stock 3kVA — it gives you room to add more later.` : `${systemV}V system`}</small></span>
            <a href="${productHref(inverter)}">${escapeHtml(inverter.name)}</a><b>1 ×</b></li>
          <li><span class="cs-ico">${icon("battery")}</span><span><strong>Batteries: ${batteries}</strong><small>${lithium ? "LiFePO4, about 90% usable" : `12V 200Ah, wired for ${systemV}V, about 50% usable`}</small></span>
            <a href="${productHref(battery)}">${escapeHtml(battery.name)}</a><b>${batteries} ×</b></li>
          <li><span class="cs-ico">${icon("solar")}</span><span><strong>Solar panels: ${panels} × 450W</strong><small>${kw(panels * 450)} to recharge ${kwh(daily)} a day</small></span>
            <a href="${productHref(panel)}">${escapeHtml(panel.name)}</a><b>${panels} ×</b></li>
          <li><span class="cs-ico">${icon("breaker")}</span><span><strong>Protection</strong><small>Changeover switch and surge protector</small></span>
            <a href="shop.html?cat=protection">Changeover + SPD</a><b>1 + 1</b></li>
        </ul>
        <div class="calc-total"><span>Estimated equipment cost</span><strong>${money(total)}</strong><small>Excludes installation, mounting and cabling. Prices change — we confirm before you pay.</small></div>
        <div class="send-btns">
          <button type="button" class="btn" id="calc-add">Add system to cart</button>
          <a class="btn btn-wa" target="_blank" rel="noopener" id="calc-wa">${icon("whatsapp")} Get a quote on WhatsApp</a>
        </div>`
      : `<div class="calc-big"><h3>You need a larger system</h3><p>Your load needs more than a 5kVA inverter${lithium ? "" : ""}. We'll design a custom system — usually a larger inverter or several in parallel.</p>
          <a class="btn btn-wa" target="_blank" rel="noopener" id="calc-wa">${icon("whatsapp")} Send us your list</a></div>`}`;

    const summary = [
      `Hello ${SHOP.name}, I used your solar calculator. Please quote for:`, "",
      ...used.map((a) => `• ${a.qty} × ${a.name} (${a.watts}W, ${a.hours}h/day)`), "",
      `Running load: ${kw(load)} · Daily energy: ${kwh(daily)} · Backup wanted: ${backup}h · Battery: ${lithium ? "lithium" : "lead-acid"}`,
      ...(inverter ? ["", "Suggested:", ...system.map(([p, n]) => `• ${n} × ${p.name}`)] : []),
    ].join("\n");
    document.getElementById("calc-wa").href = waLink(summary);
    document.getElementById("calc-add")?.addEventListener("click", () => {
      const cart = getCart();
      system.forEach(([p, n]) => { if (canBuy(p)) cart[p.id] = (cart[p.id] || 0) + n; });
      saveCart(cart);
      toast("Added the recommended system to your cart");
    });
  }
  calc();
}

// ---------- Buying guides ----------
function guideCard(g) {
  return `<a class="guide-card" href="guide.html?id=${g.id}">
    <span class="guide-img"><img src="${escapeHtml(g.image)}" alt="" loading="lazy"></span>
    <span class="guide-body"><small>${escapeHtml(g.tag)} · ${g.minutes} min read</small><strong>${escapeHtml(g.title)}</strong><span>${escapeHtml(g.summary)}</span>
    <em>Read guide →</em></span></a>`;
}
function initGuides() {
  document.getElementById("guide-grid").innerHTML = GUIDES.map(guideCard).join("");
}
function initGuide() {
  const g = GUIDES.find((x) => x.id === new URLSearchParams(location.search).get("id"));
  const root = document.getElementById("guide");
  if (!g) {
    root.innerHTML = `<div class="container section"><div class="empty">${icon("book", "empty-ico")}<h3>We couldn't find that guide</h3><a class="btn" href="guides.html">See all guides</a></div></div>`;
    return;
  }
  document.title = `${g.title} — ${SHOP.name}`;
  const related = (g.related || []).map(findProduct).filter(Boolean);
  root.innerHTML = `
    <section class="page-hero guide-hero"><img src="${escapeHtml(g.image)}" alt="">
      <div class="container"><nav class="crumbs"><a href="index.html">Home</a> › <a href="guides.html">Guides</a> › ${escapeHtml(g.tag)}</nav>
        <h1>${escapeHtml(g.title)}</h1><p>${escapeHtml(g.summary)}</p><p class="guide-meta">${icon("clock")} ${g.minutes} min read</p></div></section>
    <section class="section"><div class="container guide-layout">
      <article class="guide-article">${g.body}
        <div class="guide-help"><h3>Need advice for your project?</h3><p>Send us your list or a photo — we'll recommend the right products.</p>
          <div class="send-btns"><a class="btn btn-wa" data-href="whatsapp" target="_blank" rel="noopener">WhatsApp us</a>
          ${g.id === "solar-sizing" ? `<a class="btn" href="calculator.html">Open the solar calculator</a>` : `<a class="btn btn-ghost" href="quote.html">Request a quote</a>`}</div></div>
      </article>
      <aside class="guide-side"><h3>More guides</h3>${GUIDES.filter((x) => x.id !== g.id).map((x) =>
        `<a href="guide.html?id=${x.id}"><img src="${escapeHtml(x.image)}" alt="" loading="lazy"><span>${escapeHtml(x.title)}<small>${x.minutes} min read</small></span></a>`).join("")}</aside>
    </div></section>
    ${related.length ? `<section class="section alt"><div class="container"><h2>Products in this guide</h2><div class="grid">${related.map(productCard).join("")}</div></div></section>` : ""}`;
  fillShopValues();
  refreshListButtons();
}

// ---------- Order tracking ----------
const TRACK_STEPS = {
  delivery: ["Received", "Confirmed", "Packed", "Out for delivery", "Delivered"],
  pickup: ["Received", "Confirmed", "Packed", "Ready for pickup", "Collected"],
};
function initTrack() {
  const form = document.getElementById("track-form");
  const out = document.getElementById("track-result");
  const show = (ref) => {
    const o = ORDERS.find((x) => x.ref.toUpperCase() === ref.trim().toUpperCase());
    if (!o) {
      out.innerHTML = `<div class="track-card"><h3>We can't find order ${escapeHtml(ref)} yet</h3>
        <p class="muted">Orders appear here once we've confirmed them, usually within an hour during opening hours. Check the number on your invoice, or ask us directly.</p>
        <a class="btn btn-wa" target="_blank" rel="noopener" href="${waLink(`Hello ${SHOP.name}, can you give me an update on order ${ref}?`)}">${icon("whatsapp")} Ask on WhatsApp</a></div>`;
      return;
    }
    const steps = TRACK_STEPS[o.method] || TRACK_STEPS.delivery;
    const at = Math.max(0, steps.indexOf(o.status));
    out.innerHTML = `<div class="track-card">
      <p class="kicker">Order ${escapeHtml(o.ref)} · ${o.method === "pickup" ? "Pickup in Kumasi" : "Delivery"}</p>
      <h3>${escapeHtml(o.status)}</h3>
      <ol class="track-steps">${steps.map((s, i) => `<li class="${i < at ? "done" : i === at ? "now" : ""}"><span>${i <= at ? icon("check") : i + 1}</span>${escapeHtml(s)}</li>`).join("")}</ol>
      ${o.note ? `<p class="track-note">${escapeHtml(o.note)}</p>` : ""}
      <p class="muted">Last updated: ${escapeHtml(o.updated || "")}</p>
      <a class="btn btn-ghost" target="_blank" rel="noopener" href="${waLink(`Hello ${SHOP.name}, I have a question about order ${o.ref}.`)}">Question about this order?</a></div>`;
  };
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const ref = form.ref.value;
    show(ref);
    const url = new URL(location); url.searchParams.set("order", ref.trim()); history.replaceState(null, "", url);
  });
  const pre = new URLSearchParams(location.search).get("order");
  if (pre) { form.ref.value = pre; show(pre); }
  document.querySelectorAll("[data-demo-order]").forEach((b) => b.addEventListener("click", () => { form.ref.value = b.dataset.demoOrder; form.requestSubmit(); }));
}

// ---------- Contact / About: map and shop photo ----------
function initPlaceExtras() {
  const map = document.getElementById("map-wrap");
  if (map && SHOP.mapQuery) {
    map.hidden = false;
    map.innerHTML = `<iframe title="Map showing ${escapeHtml(SHOP.name)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
      src="https://www.google.com/maps?q=${encodeURIComponent(SHOP.mapQuery)}&output=embed"></iframe>`;
  }
  document.querySelectorAll("[data-shop-photo]").forEach((el) => {
    if (!SHOP.shopPhoto) return;
    el.hidden = false;
    el.innerHTML = `<img src="${escapeHtml(SHOP.shopPhoto)}" alt="${escapeHtml(SHOP.name)} shopfront" loading="lazy"><figcaption>Our shop at ${escapeHtml(SHOP.address)}</figcaption>`;
  });
}

// ---------- Boot (after js/app.js has drawn the page) ----------
document.addEventListener("DOMContentLoaded", () => {
  initSearchPanel();
  document.querySelectorAll("[data-live-search]").forEach(initLiveSearch);
  const page = document.body.dataset.page;
  if (page === "home") {
    initPromoSlider();
    renderRecent(document.getElementById("recent-section"), { title: t("Recently viewed") });
  }
  const pages = { product: initProductExtras, wishlist: initWishlist, compare: initCompare, calculator: initCalculator,
    guides: initGuides, guide: initGuide, track: initTrack };
  pages[page]?.();
  initPlaceExtras();
  refreshListButtons();
  // shop results are redrawn when filters change: keep heart/compare states in sync
  const grid = document.getElementById("product-grid");
  if (grid) new MutationObserver(() => refreshListButtons()).observe(grid, { childList: true });
});
