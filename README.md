# Light World — Electrical Shop Website

An online store for an electrical shop. Customers browse products, add them to a cart, and send their order to you on **WhatsApp** or **email**. You confirm the order, then they pay by cash, card or transfer on delivery or pickup.

It's plain HTML, CSS and JavaScript. There's no server, database or build step, so it can be hosted for free.

## Pages

| Page | What it does |
|---|---|
| `index.html` | Home page: hero banner, categories, featured products, contact and about |
| `shop.html` | All products, with category filters, search and sorting |
| `cart.html` | Cart, delivery or pickup choice, and checkout form |

## Setting it up for your shop

### 1. Shop details — `js/config.js`
Change the name, phone, **WhatsApp number** (digits only, with country code, e.g. `233241234567`), email, address, opening hours, currency symbol and delivery fee.

### 2. Products — `js/products.js`
Each product is one line, like this:

```js
{ id: "led-bulb-9w", name: "LED Bulb 9W", category: "lighting", price: 3.5, featured: true,
  description: "Energy-saving bulb..." },
```

- **Add a product:** copy a line, give it a new `id`, and change the details.
- **Remove a product:** delete its line.
- **Sale price:** add `oldPrice: 5` to show a "Sale" badge.
- **Out of stock:** add `stock: 0`.
- **Show on the home page:** add `featured: true`.
- **Photos:** put the image in the `images/` folder and add `image: "images/your-photo.jpg"`. Products without a photo show their category icon.

Categories are listed at the top of the same file.

## Putting it online (free, with GitHub Pages)
1. On GitHub, open this repository and go to **Settings → Pages**.
2. Under "Build and deployment", choose **Deploy from a branch**, pick your branch and the `/ (root)` folder, then click **Save**.
3. After a minute or two the site will be live at `https://<your-username>.github.io/<repo-name>/`.

You can connect your own domain (e.g. `lightworld.com`) on the same settings page.

## Previewing on your computer
Open `index.html` in a browser, or run `python3 -m http.server` in this folder and go to http://localhost:8000.

## Next steps (optional)
- **Online card payments:** add Stripe Payment Links or Paystack/Flutterwave buttons.
- **Edit products without code:** move the catalog to a Google Sheet or a hosted store (Shopify, WooCommerce).
