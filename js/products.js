// ============================================================
//  PRODUCT CATALOG — add, remove or edit products here
//
//  id        unique text, no spaces
//  name      product name
//  category  must match one of the CATEGORIES ids below
//  price     number (no currency symbol)
//  oldPrice  optional — shows a "Sale" badge with the old price crossed out
//  image     optional — path to a photo, e.g. "images/led-bulb.jpg".
//            If left out, the category icon is shown instead.
//  stock     optional — set to 0 to show "Out of stock"
//  featured  optional — true shows it on the home page
// ============================================================
const CATEGORIES = [
  { id: "lighting",   name: "Lighting",          icon: "💡" },
  { id: "cables",     name: "Cables & Wires",    icon: "🔌" },
  { id: "switches",   name: "Switches & Sockets", icon: "🎚️" },
  { id: "protection", name: "Breakers & Protection", icon: "🛡️" },
  { id: "fans",       name: "Fans & Cooling",    icon: "🌀" },
  { id: "tools",      name: "Tools & Testers",   icon: "🔧" },
  { id: "solar",      name: "Solar & Power",     icon: "☀️" },
];

const PRODUCTS = [
  { id: "led-bulb-9w", name: "LED Bulb 9W (Warm White, E27)", category: "lighting", price: 3.5, featured: true,
    description: "Energy-saving 9W LED bulb, equivalent to 60W incandescent. 2700K warm white, 15,000-hour life." },
  { id: "led-bulb-pack", name: "LED Bulb 12W — Pack of 4 (Cool White)", category: "lighting", price: 14, oldPrice: 18, featured: true,
    description: "Bright 6500K daylight bulbs, B22 bayonet cap. Ideal for kitchens and workshops." },
  { id: "led-tube-4ft", name: "LED Tube Light 4ft 18W with Fitting", category: "lighting", price: 9.99,
    description: "Complete batten fitting with integrated 18W LED tube. Flicker-free, instant start." },
  { id: "flood-50w", name: "Outdoor LED Floodlight 50W (IP65)", category: "lighting", price: 24, featured: true,
    description: "Weatherproof aluminium floodlight for yards, gates and car parks." },
  { id: "ceiling-panel", name: "Round LED Ceiling Panel 24W", category: "lighting", price: 15.5,
    description: "Slim surface-mount panel, 300mm diameter. Neutral 4000K light." },

  { id: "cable-2.5", name: "Twin & Earth Cable 2.5mm² — 100m", category: "cables", price: 79, featured: true,
    description: "Copper twin and earth cable for socket circuits. Sold per 100m roll." },
  { id: "cable-1.5", name: "Twin & Earth Cable 1.5mm² — 100m", category: "cables", price: 55,
    description: "Copper twin and earth cable for lighting circuits. Sold per 100m roll." },
  { id: "flex-3core", name: "3-Core Flexible Cable 1.0mm² — 50m", category: "cables", price: 32,
    description: "PVC flexible cable for appliances and extension leads." },
  { id: "ext-lead-4", name: "4-Way Extension Lead 5m (Surge Protected)", category: "cables", price: 18, featured: true,
    description: "Four sockets with surge protection, individual switches and 5m cord." },

  { id: "switch-1g", name: "1-Gang 1-Way Light Switch", category: "switches", price: 2.25,
    description: "White moulded plastic switch plate, 10A rated." },
  { id: "switch-2g", name: "2-Gang 2-Way Light Switch", category: "switches", price: 3.75,
    description: "Control two lights from two locations. 10A rated." },
  { id: "socket-double", name: "Double Switched Socket 13A", category: "switches", price: 5.5, featured: true,
    description: "Twin switched wall socket with screwless white finish." },
  { id: "socket-usb", name: "Double Socket with 2 USB Ports", category: "switches", price: 14.99,
    description: "13A double socket with built-in 2.1A USB charging ports." },

  { id: "mcb-20a", name: "MCB Circuit Breaker 20A (Type B)", category: "protection", price: 6,
    description: "Single-pole miniature circuit breaker, 6kA breaking capacity." },
  { id: "rccb-63a", name: "RCCB 63A 30mA (2-Pole)", category: "protection", price: 28,
    description: "Residual current protection against electric shock and earth faults." },
  { id: "consumer-unit", name: "Consumer Unit 10-Way (Metal)", category: "protection", price: 65, oldPrice: 79,
    description: "Metal distribution board with main switch and space for 10 modules." },
  { id: "avs-stabilizer", name: "Automatic Voltage Switcher (AVS) 15A", category: "protection", price: 16,
    description: "Protects fridges, TVs and appliances from surges and low voltage." },

  { id: "ceiling-fan", name: "Ceiling Fan 56\" with Regulator", category: "fans", price: 45, featured: true,
    description: "Five-speed ceiling fan with 3 metal blades and wall regulator." },
  { id: "standing-fan", name: "Standing Fan 16\" (3-Speed)", category: "fans", price: 29,
    description: "Oscillating pedestal fan with adjustable height and tilt." },
  { id: "exhaust-fan", name: "Bathroom Exhaust Fan 6\"", category: "fans", price: 19.5,
    description: "Quiet wall/ceiling extractor fan for bathrooms and kitchens." },

  { id: "multimeter", name: "Digital Multimeter", category: "tools", price: 22,
    description: "Measures AC/DC voltage, current, resistance and continuity." },
  { id: "tester-pen", name: "Voltage Tester Screwdriver", category: "tools", price: 2.5,
    description: "Neon tester screwdriver for quick live-wire checks." },
  { id: "pliers-set", name: "Insulated Pliers Set (3 pcs)", category: "tools", price: 17,
    description: "1000V insulated combination, side cutter and long-nose pliers." },
  { id: "tape-pack", name: "PVC Insulation Tape — Pack of 10", category: "tools", price: 4,
    description: "Assorted colours, 19mm x 10m rolls." },

  { id: "solar-panel-200", name: "Solar Panel 200W Mono", category: "solar", price: 110, featured: true,
    description: "High-efficiency monocrystalline panel for home solar systems." },
  { id: "inverter-1kva", name: "Inverter 1kVA / 12V (Pure Sine Wave)", category: "solar", price: 185,
    description: "Run lights, TV and small appliances from battery or solar." },
  { id: "battery-100ah", name: "Deep Cycle Battery 100Ah", category: "solar", price: 140, stock: 0,
    description: "Maintenance-free battery for solar and inverter backup." },
  { id: "rechargeable-lamp", name: "Rechargeable LED Lantern", category: "solar", price: 12,
    description: "Up to 8 hours of light with USB and solar charging." },
];
