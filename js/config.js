// ============================================================
//  SHOP SETTINGS — edit these to match your business
//  (items marked TODO are placeholders you still need to fill in)
// ============================================================
const SHOP = {
  name: "Light World Electricals",
  tagline: "Quality electrical supplies for homes, contractors and builders",
  currency: "GH₵",
  phone: "+233 24 000 0000",        // TODO: your shop phone number
  whatsapp: "233240000000",         // TODO: WhatsApp number — digits only, starting with 233, no + or spaces
  email: "orders@lightworld.example", // TODO: your email address
  address: "Adum, Kumasi, Ghana",   // TODO: your full shop address
  gps: "AK-000-0000",               // TODO: your GhanaPost GPS address (or "" to hide)
  hours: "Mon–Sat 8:00am – 6:00pm", // TODO: your opening hours
  heroImage: "images/stock/hero-banner.jpg", // photo behind the home page banner, e.g. "images/hero.jpg" ("" = plain dark banner)

  // ---------- Delivery ----------
  // Pickup is always at the Kumasi shop.
  delivery: {
    kumasiFee: 50,        // TODO: fixed delivery fee for orders in Kumasi below freeOver
    freeOver: 5000,       // orders of this amount or more get FREE delivery to Kumasi & Accra
    accraMinimum: 5000,   // Accra delivery is only available for orders of at least this amount
    accraFee: 150,        // Accra fee — only charged if you set accraMinimum lower than freeOver
  },

  // ---------- Payment badges ----------
  // Shown in the footer and at checkout. Remove any you don't accept.
  // Known names get their own colours: "MTN MoMo", "Telecel Cash", "AT Money", "Visa", "Mastercard", "Cash"
  paymentMethods: ["MTN MoMo", "Telecel Cash", "AT Money", "Visa", "Mastercard", "Cash"],

  // ---------- Online payment (Paystack — card & mobile money) ----------
  // Paste your Paystack PUBLIC key here (starts with pk_live_ or pk_test_).
  // While it is empty, the "Pay online" option is hidden and customers pay on delivery/pickup.
  // NEVER put your SECRET key (sk_...) here.
  paystackPublicKey: "",

  // ---------- Promo strip (top of every page) ----------
  // One short line to push this week's offer. Set text to "" to hide it.
  // Customers can close it; it comes back when you change the text.
  promo: {
    text: "Electricians & contractors: send us your materials list and get a bulk price today",
    link: "quote.html",
    linkText: "Get a quote",
  },

  // ---------- Customer reviews (home page) ----------
  // TODO: these are SAMPLE reviews for the test site. Replace them with real reviews from your
  // customers (with their permission), then set reviewsAreSamples to false to remove the "Sample" label.
  // Use [] to hide the section.
  reviewsAreSamples: true,
  reviews: [
    { name: "Kwame A.", role: "Electrician, Asokwa", stars: 5,
      text: "I buy all my cables and breakers here. Genuine stock, fair prices, and they always have what I need for a job." },
    { name: "Akosua M.", role: "Homeowner, Bantama", stars: 5,
      text: "They helped me choose the right bulbs and sockets for my new house and delivered the next morning." },
    { name: "Yaw B.", role: "Building contractor, Kumasi", stars: 5,
      text: "Sent my materials list on WhatsApp and got a quote the same day. The bulk price beat everywhere else I asked." },
    { name: "Efua O.", role: "Shop owner, Adum", stars: 4,
      text: "Good rechargeable bulbs for when the lights go off. Friendly staff who explain everything." },
  ],
};
