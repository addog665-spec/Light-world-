# Light World Electricals — Online Shop

The website and online shop for **Light World Electricals, Kumasi**.

Customers browse products, add them to a cart and place an order. The order arrives on your **WhatsApp** with an order number such as `LW-261026-7K3Q`. Customers get a printable invoice. They can pay on delivery or pickup, or pay online by card or mobile money through **Paystack** once you switch it on.

It's plain HTML, CSS and JavaScript. There's no server, database or build step, so it can be hosted for free.

## Pages

| Page | What it does |
|---|---|
| `index.html` | Home: banner, categories, featured products, trade section, delivery info, contact |
| `shop.html` | All products, with category filters, search (by name or brand) and sorting |
| `product.html` | One product: brand, price, bulk-price table, specifications, related products |
| `cart.html` | Cart, checkout, order confirmation, invoice and printable proforma invoice |
| `quote.html` | Quote requests for electricians, contractors and builders |

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

Then replace the sample products in **`js/products.js`** with your real stock and prices.

## Editing products — `js/products.js`

Each product looks like this:

```js
{ id: "socket-double", name: "Double Switched Socket 13A", brand: "Schneider", category: "switches",
  price: 48, bulk: [{ min: 20, price: 43 }, { min: 100, price: 39 }], featured: true,
  description: "Twin switched wall socket with UK-style 3-pin outlets.",
  specs: { Outlets: "2 × 13A", Type: "UK 3-pin (Type G)", Finish: "White" } },
```

- **Add a product:** copy a product, give it a new `id` (no spaces), and change the details.
- **Remove a product:** delete it.
- **Bulk prices:** `bulk: [{ min: 20, price: 43 }]` means 20 or more pieces cost GH₵43 each. The cart applies it automatically.
- **Sale:** add `oldPrice: 60` to show a "Sale" badge.
- **Out of stock:** add `stock: 0`.
- **Show on the home page:** add `featured: true`.
- **Photos:** put the photo in `images/` and add `image: "images/double-socket.jpg"`. Square photos on a plain background look best.
- **Sold by the roll or pack:** add `unit: "roll"` (shows "per roll").
- **Label on the photo:** add `badge: "Best seller"` or `badge: "New"`.
- **Example photo:** `examplePhoto: "images/stock/led-bulb.jpg"` shows a labelled stock photo until you have your own. Only use one that really shows the item.
- **Ready-made packs:** edit `PACKS` at the bottom of the file. Each pack lists product ids and quantities; its price is worked out from the product prices.

Watch the commas and quotation marks. If the shop page goes blank after an edit, a comma or quote is probably missing.

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

`images/logo.svg` is the logo: a clear glass bulb glowing with white light, with a globe drawn in light inside it ("Light World") and a chrome screw base, on a dark rounded badge. It's a vector file, so it stays sharp at any size. Give the SVG to printers and designers for signboards and vehicles.

Ready-made high-resolution files are in `images/brand/`:

- `logo-icon-1024.png` and `logo-icon-512.png`: the icon alone, transparent corners (WhatsApp profile picture, social media, app icon)
- `logo-full-light.png`: icon and name on white (letterheads, invoices, documents)
- `logo-full-dark.png`: icon and name on dark (presentations, dark backgrounds)
- `logo-full-transparent.png`: icon and name with no background (place on any light design)
