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
//  badge       optional — a short label on the photo, e.g. "Best seller" or "New"
//
//  examplePhoto optional — a stock photo of the same kind of item, shown labelled
//              "Example photo" until you have your own photo (only use one that
//              really shows this item; otherwise leave it out and the icon is shown)
//
//  Categories: photo         optional — a general photo of this kind of item for the home page tile
//                            (the shop's own product photos show once a customer opens the category)
//              icon          line icon name (see ICONS in js/app.js), e.g. "bulb", "socket", "plug",
//                            "breaker", "fan", "wrench" — also used for packs
// ============================================================
const CATEGORIES = [
  { id: "lighting",   name: "Lighting",                 icon: "bulb", photo: "images/stock/led-bulb.jpg" },
  { id: "switches",   name: "Switches, Sockets & Boxes", icon: "socket", photo: "images/stock/sockets-switches.jpg" },
  { id: "cables",     name: "Cables & Wiring",          icon: "plug", photo: "images/stock/cable-rolls.jpg" },
  { id: "protection", name: "Breakers & Fuses",         icon: "breaker", photo: "images/stock/circuit-breakers.jpg" },
  { id: "fans",       name: "Fans & Fan Parts",         icon: "fan", photo: "images/stock/ceiling-fan.jpg" },
  { id: "tools",      name: "Tools & Accessories",      icon: "wrench", photo: "images/stock/electrician-tools.jpg" },
];

const PRODUCTS = [
  // ---------- Lighting ----------
  { id: "fortune-bulb-12w", name: "Fortune LED Bulb 12W", brand: "Fortune", category: "lighting", price: 15, examplePhoto: "images/stock/led-bulb.jpg",
    description: "Energy-saving LED bulb for rooms, kitchens and corridors.",
    specs: { Power: "12W", Type: "LED" } },
  { id: "fortune-bulb-15w", name: "Fortune LED Bulb 15W", brand: "Fortune", category: "lighting", price: 18, examplePhoto: "images/stock/led-bulb.jpg",
    description: "Energy-saving LED bulb for rooms, kitchens and corridors.",
    specs: { Power: "15W", Type: "LED" } },
  { id: "fortune-bulb-18w", name: "Fortune LED Bulb 18W", brand: "Fortune", category: "lighting", price: 20, examplePhoto: "images/stock/led-bulb.jpg",
    description: "Bright energy-saving LED bulb for living rooms, shops and offices.",
    specs: { Power: "18W", Type: "LED" } },
  { id: "fortune-bulb-22w", name: "Fortune LED Bulb 22W", brand: "Fortune", category: "lighting", price: 30, examplePhoto: "images/stock/led-bulb.jpg",
    description: "Extra-bright energy-saving LED bulb for large rooms, shops and workshops.",
    specs: { Power: "22W", Type: "LED" } },
  { id: "xbz-bulb-15w", name: "XBZ LED Bulb 15W (E27)", brand: "XBZ", category: "lighting", price: 18, featured: true,
    image: "images/products/xbz-bulb-15w.jpg",
    description: "Bright white LED bulb that gives the light of an old 150W bulb while using only 15W.",
    specs: { Power: "15W", Brightness: "Same as a 150W old-style bulb", Colour: "White light (6500K)", Cap: "E27 screw",
             Voltage: "170–250V", Lifespan: "6,000 hours", "Item no.": "GH-15W/W" } },
  { id: "newman-bulb-10w", name: "Newman LED Bulb 10W", brand: "Newman", category: "lighting", price: 10, examplePhoto: "images/stock/led-bulb.jpg",
    description: "Affordable energy-saving LED bulb for bedrooms, toilets and porches.",
    specs: { Power: "10W", Type: "LED" } },
  { id: "newman-bulb-30w", name: "Newman LED Bulb 30W (B22)", brand: "Newman", category: "lighting", price: 30, badge: "Best seller", featured: true,
    image: "images/products/newman-bulb-30w.jpg",
    description: "High-power daylight LED bulb for halls, shops, compounds and workshops. Comes with a 2-year warranty.",
    specs: { Power: "30W", Cap: "B22 pin", Colour: "Daylight", Brightness: "2,700 lumens", Efficiency: "90 lm/W",
             "Colour rendering (CRI)": "80", "Beam angle": "135°", Voltage: "220V", Lifespan: "20,000 hours", Warranty: "2 years" } },
  { id: "newman-tube-bulb-10w", name: "Newman LED Tube Bulb 10W", brand: "Newman", category: "lighting", price: 10,
    description: "Tube-shaped LED bulb for even, bright light.",
    specs: { Power: "10W", Type: "LED tube bulb" } },
  { id: "newman-ufo-50w", name: "Newman UFO LED Bulb 50W", brand: "Newman", category: "lighting", price: 80,
    description: "Wide, flat 'UFO' LED bulb that lights up big spaces: shops, warehouses, churches and workshops.",
    specs: { Power: "50W", Type: "LED (UFO shape)" } },
  { id: "brothers-union-50w", name: "Brothers Union LED Bulb 50W", brand: "Brothers Union", category: "lighting", price: 70,
    description: "High-power LED bulb for large rooms, shops and outdoor areas.",
    specs: { Power: "50W", Type: "LED" } },
  { id: "newman-rechargeable-bulb", name: "Newman Rechargeable LED Bulb 20W (with Battery)", brand: "Newman", category: "lighting", price: 35, badge: "Best seller", featured: true,
    image: "images/products/newman-rechargeable-20w.jpg",
    description: "LED bulb with a built-in battery that keeps giving light when the power goes off.",
    specs: { Power: "20W", Cap: "B22 pin", Backup: "Built-in battery", "Energy saving": "90%", Warranty: "2 years" } },
  { id: "newman-rechargeable-30w", name: "Newman Rechargeable LED Bulb 30W (with Battery)", brand: "Newman", category: "lighting", price: null, badge: "New",
    image: "images/products/newman-rechargeable-30w.jpg",
    description: "Bigger, brighter LED bulb with a built-in battery that keeps giving light when the power goes off.",
    specs: { Power: "30W", Cap: "B22 pin", Backup: "Built-in battery", "Energy saving": "90%", Warranty: "2 years" } },
  { id: "focus-bulb-20w", name: "Focus LED Bulb 20W (B22)", brand: "Focus", category: "lighting", price: null,
    image: "images/products/focus-bulb-20w.jpg",
    description: "Bright daylight LED bulb for homes, offices, schools and shops. A direct replacement for energy-saver bulbs. For indoor use; not for dimmers, damp places or closed fittings.",
    specs: { Power: "20W", Cap: "B22 pin", Colour: "Daylight (6400K)", Brightness: "1,100 lumens", Voltage: "170–270V",
             Lifespan: "10,000 hours", "Colour rendering (CRI)": "80", Size: "80 × 155mm", Use: "Indoor only" } },
  { id: "usb-emergency-light", name: "USB Rechargeable Emergency Light", category: "lighting", price: 70,
    description: "Rechargeable emergency light for when the lights go off. Charges by USB.",
    specs: { Charging: "USB", Type: "Rechargeable LED" } },
  { id: "newman-floodlight-30w", name: "Newman LED Floodlight 30W", brand: "Newman", category: "lighting", price: 50,
    description: "Outdoor floodlight for compounds, gates, car parks and security lighting.",
    specs: { Power: "30W", Type: "LED floodlight", Use: "Outdoor" } },
  { id: "newman-floodlight-100w", name: "Newman LED Floodlight 100W", brand: "Newman", category: "lighting", price: null, featured: true,
    image: "images/products/newman-floodlight-100w.jpg",
    description: "Powerful twin-LED floodlight for large compounds, car parks, churches, schools and security lighting.",
    specs: { Power: "100W", Type: "LED floodlight (2 LED chips)", Protection: "IP67 waterproof", Use: "Outdoor", Warranty: "2 years" } },
  { id: "mercury-lamp-400w", name: "Mercury Lamp 400W (E40)", brand: "Smart Quality", category: "lighting", price: null,
    image: "images/products/mercury-lamp-400w.jpg",
    description: "High-power mercury lamp for street lights, warehouses and factories. Must be used with the correct control gear (ballast). Never connect it straight to the mains.",
    specs: { Power: "400W", Cap: "E40 (large screw)", Type: "Mercury lamp", Important: "Use only with control gear (ballast)" } },
  { id: "lamp-holder-screw", name: "Newman Lamp Holder — Screw Type (E27)", brand: "Newman", category: "lighting", price: 7,
    image: "images/products/lamp-holder-screw.jpg",
    description: "Ceiling/batten bulb holder for E27 screw bulbs. Comes with a 5-year guarantee.",
    specs: { Fitting: "Screw (E27)", Mounting: "Ceiling / batten", Guarantee: "5 years" } },
  { id: "lamp-holder-pin", name: "Lamp Holder — Pin Type (B22)", category: "lighting", price: 12,
    description: "Pin (bayonet) bulb holder for B22 bulbs.",
    specs: { Fitting: "Pin / bayonet (B22)" } },

  // ---------- Switches, sockets & boxes ----------
  { id: "focus-double-socket", name: "Focus Double Socket (PC-Series)", brand: "Focus", category: "switches", price: 40,
    bulk: [{ min: 4, price: 35 }], featured: true,
    image: "images/products/focus-double-socket.jpg",
    description: "Twin wall socket from the Focus PC-Series range.",
    specs: { Outlets: "2", Range: "Focus PC-Series" } },
  { id: "bg-double-socket", name: "BG Double Socket", brand: "BG", category: "switches", price: 25, examplePhoto: "images/stock/sockets-switches.jpg",
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
  { id: "cable-roll-1.5mm", name: "1.5mm Cable — Roll", category: "cables", price: null, unit: "roll", examplePhoto: "images/stock/cable-rolls.jpg",
    description: "1.5mm cable roll for lighting circuits. Ask us for today's price and available brands.",
    specs: { Size: "1.5mm", "Sold per": "Roll" } },
  { id: "cable-roll-2.5mm", name: "Sanbra 2.5mm² Cable — 100 Yards", brand: "Sanbra", category: "cables", price: null, badge: "Best seller", unit: "roll", featured: true,
    image: "images/products/sanbra-cable-2.5mm.jpg",
    description: "Copper PVC-insulated cable for socket circuits. Ask us for today's price and the colours in stock.",
    specs: { Size: "2.5mm²", Length: "100 yards", Conductor: "High-grade copper", Insulation: "PVC",
             Voltage: "450/750V", Quality: "ISO 9001", "Sold per": "Roll" } },
  { id: "cable-roll-4mm", name: "4mm Cable — Roll", category: "cables", price: null, unit: "roll", examplePhoto: "images/stock/cable-rolls.jpg",
    description: "4mm cable roll for air conditioners and heavy appliances. Ask us for today's price.",
    specs: { Size: "4mm", "Sold per": "Roll" } },
  { id: "cable-roll-6mm", name: "6mm Cable — Roll", category: "cables", price: null, unit: "roll", examplePhoto: "images/stock/cable-rolls.jpg",
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
  { id: "mcb-single-pole", name: "MCB Breaker (Single Pole)", category: "protection", price: null, examplePhoto: "images/stock/circuit-breakers.jpg",
    description: "Single-pole circuit breaker for lighting and socket circuits. Ask us for ratings, brands and prices.",
    specs: { Poles: "1" } },
  { id: "distribution-board", name: "Distribution Board", category: "protection", price: null, examplePhoto: "images/stock/circuit-breakers.jpg",
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
  { id: "focus-ceiling-fan-24", name: "Focus Ceiling Fan 24\" (Crystal White)", brand: "Focus", category: "fans", price: null, featured: true,
    image: "images/products/focus-ceiling-fan-24.jpg",
    description: "Compact 4-blade ceiling fan for small rooms, kiosks, shops and offices.",
    specs: { Size: "24 inch (600mm)", Speed: "850 RPM", Blades: "4", Bearings: "Double ball bearing", Colour: "Crystal White" } },
  { id: "ceiling-fan", name: "Ceiling Fan (Other Sizes)", category: "fans", price: null, examplePhoto: "images/stock/ceiling-fan.jpg",
    description: "Ceiling fans in other sizes and brands. Ask us what's in stock and for prices.",
    specs: {} },
  { id: "standing-fan", name: "Standing Fan", category: "fans", price: null, examplePhoto: "images/stock/standing-fan.jpg",
    description: "Standing fans in different sizes and brands. Ask us for prices.",
    specs: {} },

  // ---------- Tools & accessories ----------
  { id: "tester", name: "Tester Screwdriver", category: "tools", price: 6, examplePhoto: "images/stock/tester-screwdriver.jpg",
    description: "Tester screwdriver for quick live-wire checks.",
    specs: {} },
  { id: "screwdriver", name: "Screwdriver", category: "tools", price: 20, examplePhoto: "images/stock/screwdriver.jpg",
    description: "Screwdriver for electrical work.",
    specs: {} },
  { id: "tape-small", name: "Insulation Tape — Small Roll", category: "tools", price: 5, examplePhoto: "images/stock/insulation-tape.jpg",
    description: "PVC insulation tape for covering wire joints.",
    specs: { Size: "Small roll" } },
  { id: "tape-big", name: "Focus PVC Insulating Tape — Big Roll", brand: "Focus", category: "tools", price: 20, featured: true,
    image: "images/products/tape-big.jpg",
    description: "Wide, long roll of PVC insulating tape for bigger jobs.",
    specs: { Size: "38mm × 21m", Thickness: "0.18mm", "Rated up to": "600V", "Max temperature": "80°C", "Item no.": "FPTP3821" } },
  { id: "screws-box", name: "Screws — Box", category: "tools", price: 15, unit: "box", examplePhoto: "images/stock/screws.jpg",
    description: "Box of screws for fixing boxes, sockets and fittings.",
    specs: { "Sold per": "Box" } },
  { id: "newman-tv-mount-14-42", name: "Newman TV Wall Mount 14\"–42\"", brand: "Newman", category: "tools", price: null,
    image: "images/products/newman-tv-mount-14-42.jpg",
    description: "Fixed wall bracket for flat-panel TVs from 14 to 42 inches.",
    specs: { Model: "NEWMAN-1442", "TV size": "14\"–42\"", Type: "Fixed flat-panel wall mount", "Max load": "25kg (55 lbs)",
             VESA: "75×75 to 200×200" } },
  { id: "mr-bond-superglue", name: "Mr. Bond Super Glue", brand: "Mr. Bond", category: "tools", price: 20,
    description: "Strong instant glue for quick repairs.",
    specs: {} },
];

// ============================================================
//  READY-MADE PACKS (home page) — everything for one job, added to the cart in one tap
//  items: [product id, quantity] — only products with a price are added
//  note:  optional — shown under the pack, e.g. to say what isn't included
// ============================================================
const PACKS = [
  { id: "room-wiring", name: "Room Wiring Pack", icon: "home",
    description: "Sockets, boxes, lamp holders, bulbs, conduit and fixings to wire one room.",
    note: "Cable not included — ask us for today's cable price.",
    items: [["bg-double-socket", 2], ["pattress-box-3x6", 2], ["circular-box", 1], ["lamp-holder-pin", 2],
            ["fortune-bulb-15w", 2], ["cable-clips-6mm", 1], ["pvc-conduit-20mm", 3], ["tape-small", 1]] },
  { id: "fan-fitting", name: "Ceiling Fan Fitting Pack", icon: "fan",
    description: "Hook, regulator, capacitor and box to fit a ceiling fan properly.",
    note: "Need the fan too? Ask us for sizes and prices.",
    items: [["fan-hook", 1], ["fan-regulator", 1], ["fan-capacitor-2.5", 1], ["circular-box", 1], ["tape-small", 1]] },
  { id: "main-supply", name: "Main Supply Pack", icon: "breaker",
    description: "Cut-out fuse, 2-pole breaker and 2-way main switch for the incoming supply.",
    items: [["cut-out-fuse", 1], ["two-pole-breaker", 1], ["two-way-main-switch", 1]] },
  { id: "electrician-kit", name: "Electrician's Starter Kit", icon: "toolbox",
    description: "Tester, screwdriver, insulation tape and screws for everyday jobs.",
    items: [["tester", 1], ["screwdriver", 1], ["tape-big", 1], ["screws-box", 1]] },
];
