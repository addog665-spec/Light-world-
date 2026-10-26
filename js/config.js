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

  // ---------- Online payment (Paystack — card & mobile money) ----------
  // Paste your Paystack PUBLIC key here (starts with pk_live_ or pk_test_).
  // While it is empty, the "Pay online" option is hidden and customers pay on delivery/pickup.
  // NEVER put your SECRET key (sk_...) here.
  paystackPublicKey: "",
};
