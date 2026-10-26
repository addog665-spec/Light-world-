// ============================================================
//  PRODUCT CATALOG — add, remove or edit products here
//  Prices are from the Light World sales book (confirmed by the owner).
//
//  id          unique text, no spaces (used in the product page link)
//  name        product name
//  brand       optional — e.g. "Newman"
//  category    must match one of the CATEGORIES ids below
//  price       price for one piece, number only (no GH₵)
//              use  price: null  to show "Ask for price" instead (customers ask on WhatsApp)
//  oldPrice    optional — shows a "Sale" badge with the old price crossed out
//  bulk        optional — cheaper price per piece for larger quantities, e.g.
//                bulk: [{ min: 4, price: 35 }]
//  unit        optional — what one piece is, e.g. "box", "roll", "length" (default "piece")
//  specs       optional — details shown on the product page
//  image       optional — path to a photo, e.g. "images/fortune-18w.jpg"
//              (if left out, the category icon is shown instead)
//  stock       optional — set to 0 to show "Out of stock"
//  featured    optional — true shows it on the home page
// ============================================================
const CATEGORIES = [
  { id: "lighting",   name: "Lighting",                 icon: "💡" },
  { id: "switches",   name: "Switches, Sockets & Boxes", icon: "🎚️" },
  { id: "cables",     name: "Cables & Wiring",          icon: "🔌" },
  { id: "protection", name: "Breakers & Fuses",         icon: "🛡️" },
  { id: "fans",       name: "Fans & Fan Parts",         icon: "🌀" },
  { id: "tools",      name: "Tools & Accessories",      icon: "🔧" },
];

const PRODUCTS = [
  // ---------- Lighting ----------
  { id: "fortune-bulb-12w", name: "Fortune LED Bulb 12W", brand: "Fortune", category: "lighting", price: 15,
    description: "Energy-saving LED bulb for rooms, kitchens and corridors.",
    specs: { Power: "12W", Type: "LED" } },
  { id: "fortune-bulb-15w", name: "Fortune LED Bulb 15W", brand: "Fortune", category: "lighting", price: 18,
    description: "Energy-saving LED bulb for rooms, kitchens and corridors.",
    specs: { Power: "15W", Type: "LED" } },
  { id: "fortune-bulb-18w", name: "Fortune LED Bulb 18W", brand: "Fortune", category: "lighting", price: 20, featured: true,
    description: "Bright energy-saving LED bulb for living rooms, shops and offices.",
    specs: { Power: "18W", Type: "LED" } },
  { id: "fortune-bulb-22w", name: "Fortune LED Bulb 22W", brand: "Fortune", category: "lighting", price: 30,
    description: "Extra-bright energy-saving LED bulb for large rooms, shops and workshops.",
    specs: { Power: "22W", Type: "LED" } },
  { id: "xbz-bulb-15w", name: "XBZ LED Bulb 15W", brand: "XBZ", category: "lighting", price: 18,
    description: "Energy-saving LED bulb for everyday lighting.",
    specs: { Power: "15W", Type: "LED" } },
  { id: "newman-bulb-10w", name: "Newman LED Bulb 10W", brand: "Newman", category: "lighting", price: 10, featured: true,
    description: "Affordable energy-saving LED bulb for bedrooms, toilets and porches.",
    specs: { Power: "10W", Type: "LED" } },
  { id: "newman-bulb-30w", name: "Newman LED Bulb 30W", brand: "Newman", category: "lighting", price: 30,
    description: "High-power LED bulb for halls, shops, compounds and workshops.",
    specs: { Power: "30W", Type: "LED" } },
  { id: "newman-tube-bulb-10w", name: "Newman LED Tube Bulb 10W", brand: "Newman", category: "lighting", price: 10,
    description: "Tube-shaped LED bulb for even, bright light.",
    specs: { Power: "10W", Type: "LED tube bulb" } },
  { id: "newman-ufo-50w", name: "Newman UFO LED Bulb 50W", brand: "Newman", category: "lighting", price: 80, featured: true,
    description: "Wide, flat 'UFO' LED bulb that lights up big spaces: shops, warehouses, churches and workshops.",
    specs: { Power: "50W", Type: "LED (UFO shape)" } },
  { id: "brothers-union-50w", name: "Brothers Union LED Bulb 50W", brand: "Brothers Union", category: "lighting", price: 70,
    description: "High-power LED bulb for large rooms, shops and outdoor areas.",
    specs: { Power: "50W", Type: "LED" } },
  { id: "newman-rechargeable-bulb", name: "Newman Rechargeable LED Bulb (with Battery)", brand: "Newman", category: "lighting", price: 35, featured: true,
    description: "LED bulb with a built-in battery that keeps giving light when the power goes off.",
    specs: { Type: "Rechargeable LED", Backup: "Built-in battery" } },
  { id: "usb-emergency-light", name: "USB Rechargeable Emergency Light", category: "lighting", price: 70, featured: true,
    description: "Rechargeable emergency light for when the lights go off. Charges by USB.",
    specs: { Charging: "USB", Type: "Rechargeable LED" } },
  { id: "newman-floodlight-30w", name: "Newman LED Floodlight 30W", brand: "Newman", category: "lighting", price: 50, featured: true,
    description: "Outdoor floodlight for compounds, gates, car parks and security lighting.",
    specs: { Power: "30W", Type: "LED floodlight", Use: "Outdoor" } },
  { id: "lamp-holder-screw", name: "Lamp Holder — Screw Type (E27)", category: "lighting", price: 7,
    description: "Screw-type bulb holder for E27 bulbs.",
    specs: { Fitting: "Screw (E27)" } },
  { id: "lamp-holder-pin", name: "Lamp Holder — Pin Type (B22)", category: "lighting", price: 12,
    description: "Pin (bayonet) bulb holder for B22 bulbs.",
    specs: { Fitting: "Pin / bayonet (B22)" } },

  // ---------- Switches, sockets & boxes ----------
  { id: "focus-double-socket", name: "Focus Double Socket", brand: "Focus", category: "switches", price: 40,
    bulk: [{ min: 4, price: 35 }], featured: true,
    description: "Twin 13A wall socket with UK-style 3-pin outlets.",
    specs: { Outlets: "2 × 13A", Type: "UK 3-pin (Type G)" } },
  { id: "bg-double-socket", name: "BG Double Socket", brand: "BG", category: "switches", price: 25,
    description: "Twin 13A wall socket with UK-style 3-pin outlets.",
    specs: { Outlets: "2 × 13A", Type: "UK 3-pin (Type G)" } },
  { id: "two-way-main-switch", name: "2-Way Main Switch", category: "switches", price: 110,
    description: "Main switch for switching the whole supply on or off.",
    specs: { Type: "2-way main switch" } },
  { id: "space-plug", name: "Space Plug", category: "switches", price: 15,
    description: "Plug for connecting appliances.",
    specs: {} },
  { id: "pattress-box-3x6", name: "Pattress Box 3×6", category: "switches", price: 6,
    description: "Surface-mount box for fixing double sockets and switches.",
    specs: { Size: "3×6", Material: "Plastic" } },
  { id: "metal-box-3x6", name: "Metal Box 3×6", category: "switches", price: 5,
    description: "Flush-mount metal box for double sockets and switches in block walls.",
    specs: { Size: "3×6", Material: "Metal" } },
  { id: "circular-box", name: "Circular Box", category: "switches", price: 4,
    description: "Round conduit box for lighting points and cable junctions.",
    specs: { Shape: "Circular" } },

  // ---------- Cables & wiring ----------
  { id: "cable-clips-6mm", name: "Cable Clips 6mm — Box", category: "cables", price: 12, unit: "box",
    description: "Box of 6mm nail-in cable clips for neat wiring.",
    specs: { Size: "6mm", "Sold per": "Box" } },
  { id: "cable-clips-10mm", name: "Cable Clips 10mm — Box", category: "cables", price: 25, unit: "box",
    description: "Box of 10mm nail-in cable clips for thicker cables.",
    specs: { Size: "10mm", "Sold per": "Box" } },
  { id: "pvc-conduit-20mm", name: "PVC Conduit Pipe 20mm (White)", category: "cables", price: 10, unit: "length",
    description: "White PVC conduit pipe for running cables safely along walls and ceilings.",
    specs: { Size: "20mm", Colour: "White", "Sold per": "Length" } },
  // Prices to come from the owner — shown as "Ask for price"
  { id: "cable-roll-1.5mm", name: "1.5mm Cable — Roll", category: "cables", price: null, unit: "roll",
    description: "1.5mm cable roll for lighting circuits. Ask us for today's price and available brands.",
    specs: { Size: "1.5mm", "Sold per": "Roll" } },
  { id: "cable-roll-2.5mm", name: "2.5mm Cable — Roll", category: "cables", price: null, unit: "roll", featured: true,
    description: "2.5mm cable roll for socket circuits. Ask us for today's price and available brands.",
    specs: { Size: "2.5mm", "Sold per": "Roll" } },
  { id: "cable-roll-4mm", name: "4mm Cable — Roll", category: "cables", price: null, unit: "roll",
    description: "4mm cable roll for air conditioners and heavy appliances. Ask us for today's price.",
    specs: { Size: "4mm", "Sold per": "Roll" } },
  { id: "cable-roll-6mm", name: "6mm Cable — Roll", category: "cables", price: null, unit: "roll",
    description: "6mm cable roll for cookers, water heaters and sub-mains. Ask us for today's price.",
    specs: { Size: "6mm", "Sold per": "Roll" } },
  { id: "extension-board", name: "Extension Board", category: "cables", price: null,
    description: "Multi-socket extension board. Ask us for sizes, brands and prices.",
    specs: {} },

  // ---------- Breakers & fuses ----------
  { id: "two-pole-breaker", name: "2-Pole Breaker", category: "protection", price: 60,
    description: "Double-pole circuit breaker that cuts both live and neutral.",
    specs: { Poles: "2" } },
  { id: "cut-out-fuse", name: "Cut-Out Fuse", category: "protection", price: 80,
    description: "Cut-out fuse for the incoming supply.",
    specs: {} },
  { id: "mcb-single-pole", name: "MCB Breaker (Single Pole)", category: "protection", price: null,
    description: "Single-pole circuit breaker for lighting and socket circuits. Ask us for ratings, brands and prices.",
    specs: { Poles: "1" } },
  { id: "distribution-board", name: "Distribution Board", category: "protection", price: null,
    description: "Distribution board / consumer unit. Ask us for the number of ways, brands and prices.",
    specs: {} },

  // ---------- Fans & fan parts ----------
  { id: "fan-regulator", name: "Fan Regulator", category: "fans", price: 60,
    description: "Speed regulator for ceiling fans.",
    specs: {} },
  { id: "fan-capacitor-2.5", name: "Fan Capacitor 2.5µF", category: "fans", price: 12,
    description: "Replacement capacitor for ceiling and standing fans that hum or turn slowly.",
    specs: { Capacitance: "2.5µF" } },
  { id: "fan-hook", name: "Fan Hook", category: "fans", price: 6,
    description: "Ceiling hook for hanging ceiling fans.",
    specs: {} },
  { id: "ceiling-fan", name: "Ceiling Fan", category: "fans", price: null,
    description: "Ceiling fans in different sizes and brands. Ask us for prices.",
    specs: {} },
  { id: "standing-fan", name: "Standing Fan", category: "fans", price: null,
    description: "Standing fans in different sizes and brands. Ask us for prices.",
    specs: {} },

  // ---------- Tools & accessories ----------
  { id: "tester", name: "Tester Screwdriver", category: "tools", price: 6,
    description: "Tester screwdriver for quick live-wire checks.",
    specs: {} },
  { id: "screwdriver", name: "Screwdriver", category: "tools", price: 20,
    description: "Screwdriver for electrical work.",
    specs: {} },
  { id: "tape-small", name: "Insulation Tape — Small Roll", category: "tools", price: 5,
    description: "PVC insulation tape for covering wire joints.",
    specs: { Size: "Small roll" } },
  { id: "tape-big", name: "Insulation Tape — Big Roll", category: "tools", price: 20,
    description: "Large roll of PVC insulation tape for bigger jobs.",
    specs: { Size: "Big roll" } },
  { id: "screws-box", name: "Screws — Box", category: "tools", price: 15, unit: "box",
    description: "Box of screws for fixing boxes, sockets and fittings.",
    specs: { "Sold per": "Box" } },
  { id: "mr-bond-superglue", name: "Mr. Bond Super Glue", brand: "Mr. Bond", category: "tools", price: 20,
    description: "Strong instant glue for quick repairs.",
    specs: {} },
];
