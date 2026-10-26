// ============================================================
//  PRODUCT CATALOG — add, remove or edit products here
//  (these are SAMPLE products and prices — replace with your own)
//
//  id          unique text, no spaces (used in the product page link)
//  name        product name
//  brand       optional — e.g. "Philips"
//  category    must match one of the CATEGORIES ids below
//  price       price for one piece, number only (no GH₵)
//  oldPrice    optional — shows a "Sale" badge with the old price crossed out
//  bulk        optional — cheaper price per piece for larger quantities, e.g.
//                bulk: [{ min: 10, price: 13 }, { min: 50, price: 12 }]
//  unit        optional — what one piece is, e.g. "roll", "pack", "piece" (default "piece")
//  specs       optional — list of details shown on the product page
//  image       optional — path to a photo, e.g. "images/led-bulb.jpg"
//              (if left out, the category icon is shown instead)
//  stock       optional — set to 0 to show "Out of stock"
//  featured    optional — true shows it on the home page
// ============================================================
const CATEGORIES = [
  { id: "lighting",   name: "Lighting",              icon: "💡" },
  { id: "cables",     name: "Cables & Wires",        icon: "🔌" },
  { id: "switches",   name: "Switches & Sockets",    icon: "🎚️" },
  { id: "protection", name: "Breakers & Protection", icon: "🛡️" },
  { id: "fans",       name: "Fans & Cooling",        icon: "🌀" },
  { id: "tools",      name: "Tools & Accessories",   icon: "🔧" },
  { id: "solar",      name: "Solar & Backup Power",  icon: "☀️" },
];

const PRODUCTS = [
  // ---------- Lighting ----------
  { id: "led-bulb-9w", name: "LED Bulb 9W Warm White (E27)", brand: "Philips", category: "lighting",
    price: 18, bulk: [{ min: 10, price: 16 }, { min: 50, price: 14 }], featured: true,
    description: "Energy-saving 9W LED bulb, as bright as a 60W old-style bulb. Screw-in E27 cap.",
    specs: { Power: "9W", "Equivalent to": "60W", "Colour": "Warm white (2700K)", Cap: "E27 screw", Lifespan: "15,000 hours" } },
  { id: "led-bulb-15w", name: "LED Bulb 15W Daylight (B22) — Pack of 4", brand: "Osram", category: "lighting",
    price: 85, oldPrice: 100, unit: "pack", bulk: [{ min: 10, price: 78 }], featured: true,
    description: "Bright daylight bulbs for kitchens, shops and workshops. Bayonet B22 cap.",
    specs: { Power: "15W each", Colour: "Daylight (6500K)", Cap: "B22 bayonet", "Pack size": "4 bulbs" } },
  { id: "led-tube-4ft", name: "LED Tube Light 4ft 18W with Fitting", brand: "Philips", category: "lighting",
    price: 95, bulk: [{ min: 10, price: 85 }],
    description: "Complete batten fitting with built-in 18W LED tube. Flicker-free, instant start.",
    specs: { Power: "18W", Length: "4ft (1.2m)", Colour: "Daylight (6500K)", Voltage: "220–240V" } },
  { id: "flood-100w", name: "Outdoor LED Floodlight 100W (IP65)", brand: "Opple", category: "lighting",
    price: 280, featured: true,
    description: "Weatherproof floodlight for compounds, gates, car parks and security lighting.",
    specs: { Power: "100W", Protection: "IP65 waterproof", Body: "Aluminium", Colour: "Daylight (6500K)" } },
  { id: "ceiling-panel-24w", name: "Round LED Ceiling Panel 24W", brand: "Opple", category: "lighting",
    price: 120, bulk: [{ min: 10, price: 105 }],
    description: "Slim surface-mount panel for living rooms, offices and corridors.",
    specs: { Power: "24W", Size: "300mm diameter", Mounting: "Surface", Colour: "Neutral white (4000K)" } },

  // ---------- Cables ----------
  { id: "cable-2.5-single", name: "2.5mm² Single Core Cable — 100m Roll", brand: "Nexans", category: "cables",
    price: 950, unit: "roll", bulk: [{ min: 5, price: 900 }, { min: 20, price: 860 }], featured: true,
    description: "Copper single core PVC cable for socket circuits in conduit wiring.",
    specs: { Size: "2.5mm²", Conductor: "Copper", Length: "100m", Insulation: "PVC", Use: "Socket circuits" } },
  { id: "cable-1.5-single", name: "1.5mm² Single Core Cable — 100m Roll", brand: "Nexans", category: "cables",
    price: 620, unit: "roll", bulk: [{ min: 5, price: 590 }, { min: 20, price: 560 }],
    description: "Copper single core PVC cable for lighting circuits.",
    specs: { Size: "1.5mm²", Conductor: "Copper", Length: "100m", Insulation: "PVC", Use: "Lighting circuits" } },
  { id: "cable-6-single", name: "6mm² Single Core Cable — 100m Roll", brand: "Reroy", category: "cables",
    price: 2300, unit: "roll", bulk: [{ min: 5, price: 2200 }],
    description: "Heavy-duty copper cable for cookers, water heaters and sub-mains.",
    specs: { Size: "6mm²", Conductor: "Copper", Length: "100m", Insulation: "PVC", Use: "Cookers, heaters, sub-mains" } },
  { id: "ext-lead-4", name: "4-Way Extension Board 5m (Surge Protected)", brand: "Legrand", category: "cables",
    price: 150, featured: true,
    description: "Four 13A sockets with surge protection, master switch and 5m cord.",
    specs: { Sockets: "4 × 13A", "Cord length": "5m", Protection: "Surge protected", Switch: "Master on/off" } },

  // ---------- Switches & sockets ----------
  { id: "switch-1g", name: "1-Gang 1-Way Light Switch", brand: "Schneider", category: "switches",
    price: 22, bulk: [{ min: 20, price: 19 }, { min: 100, price: 17 }],
    description: "White switch plate for single light points.",
    specs: { Gangs: "1", Ways: "1-way", Rating: "10A", Finish: "White" } },
  { id: "switch-2g", name: "2-Gang 2-Way Light Switch", brand: "Schneider", category: "switches",
    price: 32, bulk: [{ min: 20, price: 28 }, { min: 100, price: 25 }],
    description: "Control two lights, each from two places (e.g. top and bottom of stairs).",
    specs: { Gangs: "2", Ways: "2-way", Rating: "10A", Finish: "White" } },
  { id: "socket-double", name: "Double Switched Socket 13A", brand: "Schneider", category: "switches",
    price: 48, bulk: [{ min: 20, price: 43 }, { min: 100, price: 39 }], featured: true,
    description: "Twin switched wall socket with UK-style 3-pin outlets.",
    specs: { Outlets: "2 × 13A", Type: "UK 3-pin (Type G)", Switched: "Yes", Finish: "White" } },
  { id: "socket-usb", name: "Double Socket with 2 USB Ports", brand: "Legrand", category: "switches",
    price: 145,
    description: "13A double socket with built-in USB charging ports for phones and tablets.",
    specs: { Outlets: "2 × 13A + 2 × USB", "USB output": "2.1A", Type: "UK 3-pin (Type G)", Finish: "White" } },

  // ---------- Protection ----------
  { id: "mcb-20a", name: "MCB Circuit Breaker 20A (Type B)", brand: "Hager", category: "protection",
    price: 55, bulk: [{ min: 10, price: 49 }],
    description: "Single-pole miniature circuit breaker for socket circuits.",
    specs: { Rating: "20A", Curve: "Type B", Poles: "1", "Breaking capacity": "6kA" } },
  { id: "rccb-63a", name: "RCCB 63A 30mA (2-Pole)", brand: "Hager", category: "protection",
    price: 320,
    description: "Protects people against electric shock by cutting power when current leaks to earth.",
    specs: { Rating: "63A", Sensitivity: "30mA", Poles: "2", Type: "AC" } },
  { id: "consumer-unit-12", name: "Distribution Board 12-Way (Metal)", brand: "Hager", category: "protection",
    price: 780, oldPrice: 880,
    description: "Metal distribution board with main switch and space for 12 modules.",
    specs: { Ways: "12", Body: "Metal", "Main switch": "100A included" } },
  { id: "avs-30a", name: "Automatic Voltage Switcher (AVS) 30A", brand: "Sollatek", category: "protection",
    price: 260, featured: true,
    description: "Protects fridges, ACs and TVs from power surges and low voltage when ECG power returns.",
    specs: { Rating: "30A", "Suitable for": "Fridges, freezers, ACs, TVs", Delay: "Adjustable start delay" } },

  // ---------- Fans ----------
  { id: "ceiling-fan-56", name: "Ceiling Fan 56\" with Regulator", brand: "Binatone", category: "fans",
    price: 650, featured: true,
    description: "Five-speed ceiling fan with three metal blades and wall regulator.",
    specs: { Size: "56 inch", Blades: "3 metal", Speeds: "5", Includes: "Wall regulator" } },
  { id: "standing-fan-18", name: "Standing Fan 18\" (3-Speed)", brand: "Nasco", category: "fans",
    price: 520,
    description: "Oscillating standing fan with adjustable height and tilt.",
    specs: { Size: "18 inch", Speeds: "3", Oscillation: "Yes", Timer: "No" } },
  { id: "exhaust-fan-6", name: "Bathroom Exhaust Fan 6\"", brand: "Nasco", category: "fans",
    price: 180,
    description: "Quiet extractor fan for bathrooms and kitchens.",
    specs: { Size: "6 inch", Mounting: "Wall or ceiling" } },

  // ---------- Tools & accessories ----------
  { id: "multimeter", name: "Digital Multimeter", brand: "Uni-T", category: "tools",
    price: 240,
    description: "Measures AC/DC voltage, current, resistance and continuity.",
    specs: { "AC voltage": "up to 750V", "DC voltage": "up to 1000V", Current: "up to 10A", Display: "Digital LCD" } },
  { id: "tester-pen", name: "Voltage Tester Screwdriver", brand: "Ingco", category: "tools",
    price: 20, bulk: [{ min: 12, price: 16 }],
    description: "Tester screwdriver for quick live-wire checks.",
    specs: { Range: "100–500V" } },
  { id: "pliers-set", name: "Insulated Pliers Set (3 pcs)", brand: "Ingco", category: "tools",
    price: 210,
    description: "1000V insulated combination pliers, side cutter and long-nose pliers.",
    specs: { Pieces: "3", Insulation: "1000V VDE" } },
  { id: "tape-pack", name: "PVC Insulation Tape — Pack of 10", brand: "Ingco", category: "tools",
    price: 45, unit: "pack", bulk: [{ min: 10, price: 39 }],
    description: "Assorted colours, 19mm × 10m rolls.",
    specs: { Rolls: "10", Size: "19mm × 10m", Colours: "Assorted" } },

  // ---------- Solar & backup ----------
  { id: "solar-panel-450", name: "Solar Panel 450W Mono", brand: "Jinko", category: "solar",
    price: 1950, bulk: [{ min: 4, price: 1850 }, { min: 10, price: 1750 }], featured: true,
    description: "High-efficiency monocrystalline panel for home and business solar systems.",
    specs: { Power: "450W", Type: "Monocrystalline", Warranty: "Ask in store" } },
  { id: "inverter-3.5kva", name: "Hybrid Inverter 3.5kVA / 24V", brand: "Felicity", category: "solar",
    price: 6200,
    description: "Runs your home from solar, battery and ECG power with automatic switching.",
    specs: { Capacity: "3.5kVA", "Battery voltage": "24V", "Solar charger": "Built-in MPPT", Output: "Pure sine wave" } },
  { id: "battery-200ah", name: "Deep Cycle Battery 200Ah 12V", brand: "Felicity", category: "solar",
    price: 4300, stock: 0,
    description: "Maintenance-free battery for solar and inverter backup.",
    specs: { Capacity: "200Ah", Voltage: "12V", Type: "Gel, maintenance-free" } },
  { id: "rechargeable-lamp", name: "Rechargeable LED Lantern", brand: "Binatone", category: "solar",
    price: 160,
    description: "Up to 8 hours of light for 'dumsor' with USB and solar charging.",
    specs: { Runtime: "Up to 8 hours", Charging: "USB / solar" } },
];
