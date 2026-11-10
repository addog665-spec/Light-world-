# Light World Electricals — Online Shop

The website and online shop for **Light World Electricals, Kumasi**.

Customers browse products, add them to a cart and place an order. The order arrives on your **WhatsApp** with an order number such as `LW-261026-7K3Q`. Customers get a printable invoice. They can pay on delivery or pickup, or pay online by card or mobile money through **Paystack** once you switch it on.

It's plain HTML, CSS and JavaScript. There's no server, database or build step, so it can be hosted for free.

## Pages

Every page has the same menu (with a search box) and footer.

| Page | What it does |
|---|---|
| `index.html` | Home: banner with search, 9 category tiles, deals, featured products, packs, brands, reviews, trade section, delivery, contact |
| `shop.html` | All products. Filter by category, type, brand, price, availability and deals; search; sort. `shop.html?cat=power` opens a category page with its own banner |
| `product.html` | One product: photo, price, versions (e.g. 12W / 15W / 18W), stock, bulk prices, specifications, related products |
| `cart.html` | Cart, free-delivery progress and printable proforma invoice |
| `checkout.html` | Customer details, pickup/delivery, payment, order confirmation and invoice |
| `quote.html` | Quote requests for electricians, contractors and builders |
| `calculator.html` | Solar & inverter calculator: customers pick appliances and backup hours, and get a recommended inverter, batteries and panels from your stock, with a price, "Add system to cart" and "Get a quote on WhatsApp" |
| `guides.html`, `guide.html` | Buying guides (cable sizes, bulbs, solar sizing, voltage protection, CCTV, home safety) — written in `js/guides.js` |
| `track.html` | Order tracking by order number — you update `js/orders.js` |
| `wishlist.html` | Products the visitor saved with the heart; add all to cart or send the list on WhatsApp |
| `compare.html` | Up to 4 products side by side (price and every specification) |
| `about.html` | About the shop, values, who you serve |
| `contact.html` | Address, hours, phone, email, map link and a contact form (the form prepares a WhatsApp or email message) |
| `faq.html` | Ordering, payment, delivery and warranty questions, plus buying guides |
| `delivery.html` | Delivery options and times, returns, warranty, damaged items |
| `terms.html`, `privacy.html` | Terms & Conditions and Privacy Policy |
| `404.html` | Shown by GitHub Pages for a wrong address |

Also on every page: **live search** (the magnifier in the header, or press `/`) suggests products, departments and guides as you type; hearts and compare buttons on every product; a **Twi (beta)** language switch. Product pages add a **photo gallery with zoom**, **frequently bought together** and **recently viewed**. The home page adds a **promotion slider**. `shop.html?brand=Newman` is a **brand page**.

Page text that depends on your settings (phone, address, hours, delivery fees, product counts) fills itself in from `js/config.js` and `js/products.js`, so you only change it in one place.

## Delivery rules (built in)

| Option | Rule |
|---|---|
| Pickup | At the Kumasi shop. Always free |
| Delivery in Kumasi | Fixed fee (`kumasiFee`), **free** on orders of GH₵5,000+ |
| Delivery in Accra | Only for orders of GH₵5,000+, **free** |
| Elsewhere in Ghana | Customer orders, you call them to arrange transport and cost |

You can change all of these amounts in `js/config.js`.

## Before going live — checklist

Open **`js/config.js`** and fill in everything marked `TODO`:

- [ ] **Phone number**
- [ ] **WhatsApp number**: digits only, starting with `233`, e.g. `233241234567` (orders go here!)
- [ ] **Email**
- [ ] **Shop address** and **GhanaPost GPS address**
- [ ] **Opening hours**
- [ ] **Kumasi delivery fee** (`kumasiFee`)
- [ ] **Paystack public key** (optional, see below)
- [ ] **Customer reviews**: replace the sample reviews with real ones, then set `reviewsAreSamples: false`
- [ ] **Payment badges** (`paymentMethods`): remove any method you don't accept
- [ ] **Promo strip** (`promo`): write this week's offer, or set `text: ""` to hide it
- [ ] **Promotion slider** (`promoSlides`): check the offers and prices on the 4 slides
- [ ] **Map** (`mapQuery`): your exact location (Plus Code or coordinates) so the Contact map pins the shop
- [ ] **Shop photo** (`shopPhoto`): add a photo of your shopfront — it then appears on the Contact and About pages

Then in **`js/products.js`**:

- [ ] **Demo products.** Every product marked `sample: true` was added for the presentation, with an estimated price. Replace each with your real item, price and photo, or delete it. (Products without `sample` come from your sales book.)
- [ ] **Prices on request.** Products with `price: null` show "Price on request". Add prices where you can.
- [ ] **Bulb fittings.** Confirm B22 (pin) or E27 (screw) for the Fortune bulbs, Newman 10W, Newman tube bulb, UFO 50W and Brothers Union 50W.
- [ ] **Labels.** Check which products really are "Best seller", "New" or "Popular", and which are on sale (`oldPrice`).
- [ ] **Stock.** Add `stock: 0` to anything sold out (and `stock: 3` to show "Only 3 left").
- [ ] **Photos.** Replace stock and placeholder images with your own photos — see **`IMAGES.md`** for every image spot.

Other files:

- [ ] **Twi translations** (`js/i18n.js`): drafted without a native speaker — have a Twi speaker check every line
- [ ] **Order tracking** (`js/orders.js`): delete the two `LW-DEMO-…` entries, and add real orders as they move along
- [ ] **Buying guides** (`js/guides.js`): read them through and adjust anything to your own advice
- [ ] **Calculator** (`CALC_APPLIANCES` at the top of the calculator section in `js/features.js`): adjust appliance watts if you like; it recommends the Felicity inverters, batteries and Jinko panels in your catalogue, so keep those products (or change the ids in `initCalculator`)

And check the policy pages say what you actually do:

- [ ] **Delivery times** and the **returns** (7 days), **warranty** and **damaged-item** (48 hours) rules on `delivery.html` and `faq.html`
- [ ] **Terms & Conditions** and **Privacy Policy** (ideally have someone review them)
- [ ] **Payment methods**: card payments only work if you have a card machine or Paystack; remove "Visa"/"Mastercard" otherwise

## Editing products — `js/products.js`

Each product looks like this:

```js
{ id: "socket-double", name: "Double Switched Socket 13A", brand: "Schneider", category: "switches",
  price: 48, bulk: [{ min: 20, price: 43 }, { min: 100, price: 39 }], featured: true,
  description: "Twin switched wall socket with UK-style 3-pin outlets.",
  specs: { Outlets: "2 × 13A", Type: "UK 3-pin (Type G)", Finish: "White" } },
```

The full list of fields is explained at the top of `js/products.js`.

- **Add a product:** copy a product, give it a new `id` (no spaces), and change the details. Give it a `type` (e.g. `"LED bulb"`) so it appears in the Type filter.
- **Versions:** give products the same `group` and a `variant` each (e.g. `group: "fortune-bulb", variant: "18W"`) and the product page shows buttons to switch between them.
- **Demo products:** remove `sample: true` once a product's details and price are real.
- **Remove a product:** delete it.
- **Bulk prices:** `bulk: [{ min: 20, price: 43 }]` means 20 or more pieces cost GH₵43 each. The cart applies it automatically.
- **Sale:** add `oldPrice: 60` to show a "Sale" badge.
- **Out of stock:** add `stock: 0`.
- **Show on the home page:** add `featured: true`.
- **Photos:** put the photo in `images/products/` and add `image: "images/products/double-socket.jpg"`. Square photos on a plain background look best. A product with no photo shows a coloured block with its icon and name.
- **Sold by the roll or pack:** add `unit: "roll"` (shows "per roll").
- **Label on the photo:** add `badge: "Best seller"` or `badge: "New"`.
- **Example photo:** `examplePhoto: "images/stock/led-bulb.jpg"` shows a labelled stock photo until you have your own. Only use one that really shows the item.
- **Ready-made packs:** edit `PACKS` at the bottom of the file. Each pack lists product ids and quantities; its price is worked out from the product prices.

Watch the commas and quotation marks. If the shop page goes blank after an edit, a comma or quote is probably missing.

## Updating order tracking — `js/orders.js`

The site has no database, so tracking is a short list you edit. When you confirm an order, add a line with its number from the invoice:

```js
{ ref: "LW-261110-NCZ3", method: "delivery", status: "Confirmed", updated: "10 Nov 2026, 10:05am", note: "We'll deliver tomorrow morning." },
```

Change `status` as it moves (`Received` → `Confirmed` → `Packed` → `Out for delivery` → `Delivered`, or `Ready for pickup` → `Collected` for pickups) and publish. Never put names, phone numbers or addresses in this file — anyone with an order number can see its line.

## Online payments with Paystack (card + MoMo)

1. Open a free account at **paystack.com**. You need your Ghana Card and business registration.
2. In the Paystack dashboard, go to **Settings → API Keys** and copy your **Public key** (starts with `pk_live_`).
3. Paste it into `js/config.js` → `paystackPublicKey: "pk_live_..."`.

A "Pay online now" option then appears at checkout. Customers pay by card or mobile money, and the payment shows in your Paystack dashboard under the same order number.

- Never put the **secret key** (`sk_...`) in the website.
- Before you dispatch an order marked "Paid online", check that the payment appears in your Paystack dashboard.
- Online payment is not offered for "Elsewhere in Ghana" orders, because the delivery cost isn't known yet.

## Putting it online (free, with GitHub Pages)

1. On GitHub, open this repository and go to **Settings → Pages**.
2. Under "Build and deployment", choose **Deploy from a branch**, pick your branch and `/ (root)`, then click **Save**.
3. After a minute or two the site will be live at `https://<your-username>.github.io/<repo-name>/`.

You can connect your own domain (e.g. `lightworldelectricals.com`) on the same settings page.

## Previewing on your computer

Run `python3 -m http.server` in this folder and open http://localhost:8000.

## Logo

`images/logo.svg` is the logo: a bright white light bulb with a bold blue globe on the glass ("Light World") and a chrome screw base, on a blue rounded badge with a soft white glow. It's drawn with crisp lines so it stays clear even at favicon size. It's a vector file, so it stays sharp at any size. Give the SVG to printers and designers for signboards and vehicles.

Ready-made high-resolution files are in `images/brand/`:

- `logo-icon-1024.png` and `logo-icon-512.png`: the icon alone, transparent corners (WhatsApp profile picture, social media, app icon)
- `logo-full-light.png`: icon and name on white (letterheads, invoices, documents)
- `logo-full-dark.png`: icon and name on dark (presentations, dark backgrounds)
- `logo-full-transparent.png`: icon and name with no background (place on any light design)
