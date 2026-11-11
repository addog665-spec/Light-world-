# Image spots — where every picture on the site comes from

Use this list to swap in your own photos. **Your photo** = a real photo of your stock (keep). **Stock** = a free photo (Unsplash or Wikimedia Commons) of the same kind of item (shown labelled "Example photo" on products). **Placeholder** = a coloured block with an icon and the product name, until you add a photo.

To add your own product photo: save it in `images/products/` (square, plain background works best) and set `image: "images/products/your-photo.jpg"` on the product in `js/products.js`. That replaces the stock photo or placeholder automatically. Extra photos go in `gallery: [...]`.

## Site-wide

| Spot | File | Set in |
|---|---|---|
| Logo, browser-tab and phone icons | `images/logo.svg`, `images/favicon-32.png`, `images/apple-touch-icon.png` (exports in `images/brand/`) | files |
| Home page banner | `images/stock/hero-banner.jpg` | `heroImage` in `js/config.js` |
| Home: trade section photo | `images/stock/page-trade.jpg` | `index.html` |
| Contact & About: shopfront photo | *not set — add one* | `shopPhoto` in `js/config.js` |
| Link previews (WhatsApp/Facebook) | `images/stock/hero-banner.jpg` | `og:image` in each page |

## Home page promotion slider

| Slide | File (`promoSlides` in `js/config.js`) |
|---|---|
| Solar & inverter systems sized for your home | `images/stock/inverter-system.jpg` |
| Split air conditioners from GH₵3,900 | `images/stock/air-conditioner.jpg` |
| CCTV kits you can watch from your phone | `images/stock/cat-security.jpg` |
| Bulk prices for electricians & contractors | `images/stock/page-trade.jpg` |

## Page banners

| Page | File |
|---|---|
| About | `images/stock/page-about.jpg` |
| Contact | `images/stock/page-contact.jpg` |
| FAQs | `images/stock/page-faq.jpg` |
| Buying guides | `images/stock/page-faq.jpg` |
| Delivery & Returns | `images/stock/page-delivery.jpg` |
| Track order | `images/stock/page-delivery.jpg` |
| Trade & Quotes | `images/stock/page-trade.jpg` |
| Solar calculator | `images/stock/inverter-system.jpg` |

## Buying guides

| Guide | File (`image` in `js/guides.js`) |
|---|---|
| Which cable size do I need? | `images/stock/cable-rolls.jpg` |
| B22 or E27? Choosing the right LED bulb | `images/stock/led-bulb.jpg` |
| How to size a solar and inverter system | `images/stock/inverter-system.jpg` |
| Stabilizer, voltage guard or surge protector? | `images/stock/page-faq.jpg` |
| Choosing a CCTV system for your home or shop | `images/stock/cat-security.jpg` |
| Protect your home: breakers, RCDs and earthing | `images/stock/circuit-breakers.jpg` |

## Category tiles and category banners

| Category | File (`photo` in `CATEGORIES`) |
|---|---|
| Lighting | `images/stock/led-bulb.jpg` |
| Switches & Sockets | `images/stock/sockets-switches.jpg` |
| Cables & Wiring | `images/stock/cable-rolls.jpg` |
| Circuit Protection | `images/stock/circuit-breakers.jpg` |
| Fans & Cooling | `images/stock/ceiling-fan.jpg` |
| Power & Backup | `images/stock/cat-power.jpg` |
| Home Appliances | `images/stock/cat-appliances.jpg` |
| Tools & Accessories | `images/stock/electrician-tools.jpg` |
| Security & Smart Home | `images/stock/cat-security.jpg` |

## Products

### Lighting

| Product | id | Image now |
|---|---|---|
| Fortune LED Bulb 12W | `fortune-bulb-12w` | Stock — `images/stock/led-bulb.jpg` |
| Fortune LED Bulb 15W | `fortune-bulb-15w` | Stock — `images/stock/led-bulb.jpg` |
| Fortune LED Bulb 18W | `fortune-bulb-18w` | Stock — `images/stock/led-bulb.jpg` |
| Fortune LED Bulb 22W | `fortune-bulb-22w` | Stock — `images/stock/led-bulb.jpg` |
| XBZ LED Bulb 15W (E27) | `xbz-bulb-15w` | Your photo — `images/products/xbz-bulb-15w.jpg` |
| Newman LED Bulb 10W | `newman-bulb-10w` | Stock — `images/stock/led-bulb.jpg` |
| Newman LED Bulb 30W (B22) | `newman-bulb-30w` | Your photo — `images/products/newman-bulb-30w.jpg` |
| Newman LED Tube Bulb 10W | `newman-tube-bulb-10w` | Placeholder |
| Newman UFO LED Bulb 50W | `newman-ufo-50w` | Placeholder |
| Brothers Union LED Bulb 50W | `brothers-union-50w` | Placeholder |
| Newman Rechargeable LED Bulb 20W (with Battery) | `newman-rechargeable-bulb` | Your photo — `images/products/newman-rechargeable-20w.jpg` |
| Newman Rechargeable LED Bulb 30W (with Battery) | `newman-rechargeable-30w` | Your photo — `images/products/newman-rechargeable-30w.jpg` |
| Focus LED Bulb 20W (B22) | `focus-bulb-20w` | Your photo — `images/products/focus-bulb-20w.jpg` |
| Philips LED Filament Bulb 6W (E27) *(demo)* | `philips-filament-6w` | Stock — `images/stock/filament-bulb.jpg` |
| USB Rechargeable Emergency Light | `usb-emergency-light` | Placeholder |
| LED Tube Light with Batten 4ft 18W *(demo)* | `led-tube-4ft` | Stock — `images/stock/led-tube.jpg` |
| Round LED Ceiling Light 24W *(demo)* | `led-ceiling-24w` | Stock — `images/stock/ceiling-light.jpg` |
| Opal Globe Ceiling Light *(demo)* | `globe-ceiling-light` | Stock — `images/stock/globe-light.jpg` |
| Recessed LED Downlight 9W *(demo)* | `led-downlight-9w` | Stock — `images/stock/recessed-lights.jpg` |
| LED Panel Light 600 × 600 48W *(demo)* | `led-panel-600` | Stock — `images/stock/led-panel.jpg` |
| Crystal Chandelier 6-Light *(demo)* | `crystal-chandelier-6` | Stock — `images/stock/chandelier.jpg` |
| Newman LED Floodlight 30W | `newman-floodlight-30w` | Placeholder |
| Newman LED Floodlight 100W | `newman-floodlight-100w` | Your photo — `images/products/newman-floodlight-100w.jpg` |
| LED Security Light with Motion Sensor 30W *(demo)* | `security-light-sensor` | Placeholder |
| All-in-One Solar Street Light 100W *(demo)* | `solar-street-light-100w` | Stock — `images/stock/solar-street-light.jpg` |
| Solar Floodlight 200W with Remote *(demo)* | `solar-flood-200w` | Placeholder |
| Mercury Lamp 400W (E40) | `mercury-lamp-400w` | Your photo — `images/products/mercury-lamp-400w.jpg` |
| Newman Lamp Holder — Screw Type (E27) | `lamp-holder-screw` | Your photo — `images/products/lamp-holder-screw.jpg` |
| Lamp Holder — Pin Type (B22) | `lamp-holder-pin` | Placeholder |

### Switches & Sockets

| Product | id | Image now |
|---|---|---|
| 1-Gang 1-Way Light Switch *(demo)* | `switch-1gang` | Stock — `images/stock/light-switch-1gang.jpg` |
| 2-Gang 2-Way Light Switch *(demo)* | `switch-2gang` | Stock — `images/stock/light-switch.jpg` |
| Click 1-Gang Rotary Dimmer Switch 400W *(demo)* | `dimmer-switch` | Stock — `images/stock/dimmer.jpg` |
| Focus Double Socket (PC-Series) | `focus-double-socket` | Your photo — `images/products/focus-double-socket.jpg` |
| BG Double Socket | `bg-double-socket` | Stock — `images/stock/sockets-switches.jpg` |
| Double Socket with 2 USB Ports *(demo)* | `usb-double-socket` | Placeholder |
| Weatherproof Outdoor Socket *(demo)* | `outdoor-socket` | Stock — `images/stock/outdoor-socket.jpg` |
| Cooker / Water Heater Switch 45A *(demo)* | `cooker-switch` | Placeholder |
| 2-Way Main Switch | `two-way-main-switch` | Placeholder |
| Space Plug | `space-plug` | Placeholder |
| 3-Way Multi Plug Adapter *(demo)* | `multi-adapter-3way` | Placeholder |
| Universal Travel Adapter *(demo)* | `travel-adapter` | Stock — `images/stock/travel-adapter.jpg` |
| Extension Board | `extension-board` | Stock — `images/stock/extension-lead.jpg` |
| 6-Way Universal Extension Board with 4 USB Ports *(demo)* | `extension-6way-usb` | Stock — `images/stock/extension-usb.jpg` |
| Pattress Box 3×6 | `pattress-box-3x6` | Placeholder |
| Metal Box 3×6 | `metal-box-3x6` | Placeholder |
| Circular Box | `circular-box` | Stock — `images/stock/circular-box.jpg` |

### Cables & Wiring

| Product | id | Image now |
|---|---|---|
| 1.5mm Cable — Roll | `cable-roll-1.5mm` | Stock — `images/stock/cable-rolls.jpg` |
| Sanbra 2.5mm² Cable — 100 Yards | `cable-roll-2.5mm` | Your photo — `images/products/sanbra-cable-2.5mm.jpg` |
| 4mm Cable — Roll | `cable-roll-4mm` | Stock — `images/stock/cable-rolls.jpg` |
| 6mm Cable — Roll | `cable-roll-6mm` | Stock — `images/stock/cable-rolls.jpg` |
| Armoured Cable 4mm² 3-Core *(demo)* | `armoured-cable-4mm` | Placeholder |
| Flexible Cord 3-Core 1.5mm² — 100m *(demo)* | `flex-cord-3core` | Placeholder |
| Heavy-Duty Extension Cable Reel 25m (2.5mm) *(demo)* | `extension-reel-25m` | Placeholder |
| PVC Conduit Pipe 20mm (White) | `pvc-conduit-20mm` | Stock — `images/stock/pvc-conduit.jpg` |
| PVC Trunking 25 × 16mm, 2m *(demo)* | `trunking-25x16` | Placeholder |
| Cable Ties 200mm — Pack of 100 *(demo)* | `cable-ties-200` | Stock — `images/stock/cable-ties.jpg` |
| Cable Clips 6mm — Box | `cable-clips-6mm` | Stock — `images/stock/cable-clips.jpg` |
| Cable Clips 10mm — Box | `cable-clips-10mm` | Stock — `images/stock/cable-clips.jpg` |
| Copper-Bonded Earth Rod 1.2m with Clamp *(demo)* | `earth-rod` | Placeholder |

### Circuit Protection

| Product | id | Image now |
|---|---|---|
| MCB Breaker (Single Pole) | `mcb-single-pole` | Stock — `images/stock/circuit-breakers.jpg` |
| 2-Pole Breaker | `two-pole-breaker` | Stock — `images/stock/mcb-2pole.jpg` |
| RCCB 40A 30mA 2-Pole *(demo)* | `rccb-40a` | Stock — `images/stock/rccb.jpg` |
| Distribution Board | `distribution-board` | Stock — `images/stock/circuit-breakers.jpg` |
| Focus 8-Way Distribution Board *(demo)* | `focus-db-8way` | Stock — `images/stock/circuit-breakers.jpg` |
| Cut-Out Fuse | `cut-out-fuse` | Stock — `images/stock/cutout-fuse.jpg` |
| Surge Protection Device (SPD) 2-Pole *(demo)* | `spd-surge` | Stock — `images/stock/spd-surge.jpg` |
| Manual Changeover Switch 63A *(demo)* | `changeover-63a` | Placeholder |
| Fridge & TV Voltage Guard *(demo)* | `voltage-guard` | Stock — `images/stock/voltage-guard.jpg` |
| Main Isolator Switch 100A *(demo)* | `isolator-100a` | Placeholder |

### Fans & Cooling

| Product | id | Image now |
|---|---|---|
| Focus Ceiling Fan 24" (Crystal White) | `focus-ceiling-fan-24` | Your photo — `images/products/focus-ceiling-fan-24.jpg` |
| Ceiling Fan (Other Sizes) | `ceiling-fan` | Stock — `images/stock/ceiling-fan.jpg` |
| Standing Fan | `standing-fan` | Stock — `images/stock/standing-fan.jpg` |
| Tornado 18" Standing Fan with Remote *(demo)* | `tornado-standing-fan-18` | Stock — `images/stock/standing-fan.jpg` |
| Binatone Table Fan 16" *(demo)* | `table-fan-16` | Stock — `images/stock/table-fan.jpg` |
| Rechargeable Desk Fan 8" (USB) *(demo)* | `rechargeable-desk-fan` | Stock — `images/stock/rechargeable-fan.jpg` |
| 16" Rechargeable Solar Standing Fan with Remote *(demo)* | `rechargeable-fan-16` | Stock — `images/stock/standing-fan.jpg` |
| Kepas 16" Heavy-Duty Wall Fan *(demo)* | `wall-fan-16` | Stock — `images/stock/wall-fan.jpg` |
| Bathroom / Kitchen Exhaust Fan 8" *(demo)* | `exhaust-fan-8` | Stock — `images/stock/exhaust-fan.jpg` |
| Midea Split Air Conditioner 1HP *(demo)* | `midea-ac-1hp` | Stock — `images/stock/air-conditioner.jpg` |
| Midea Split Air Conditioner 1.5HP *(demo)* | `midea-ac-1-5hp` | Stock — `images/stock/air-conditioner.jpg` |
| Midea Split Air Conditioner 2HP *(demo)* | `midea-ac-2hp` | Stock — `images/stock/air-conditioner.jpg` |
| Fan Regulator | `fan-regulator` | Stock — `images/stock/fan-regulator.jpg` |
| Fan Capacitor 2.5µF | `fan-capacitor-2.5` | Stock — `images/stock/fan-capacitor.jpg` |
| Fan Hook | `fan-hook` | Placeholder |

### Power & Backup

| Product | id | Image now |
|---|---|---|
| Jinko Mono Solar Panel 300W *(demo)* | `solar-panel-300w` | Stock — `images/stock/cat-power.jpg` |
| Jinko Mono Solar Panel 450W *(demo)* | `solar-panel-450w` | Stock — `images/stock/cat-power.jpg` |
| Felicity Hybrid Inverter 3kVA 24V *(demo)* | `felicity-inverter-3kva` | Stock — `images/stock/inverter-system.jpg` |
| Felicity Hybrid Inverter 5kVA 48V *(demo)* | `felicity-inverter-5kva` | Stock — `images/stock/inverter-system.jpg` |
| Ritar Deep-Cycle Gel Battery 12V 200Ah *(demo)* | `tubular-battery-200ah` | Stock — `images/stock/deep-cycle-battery.jpg` |
| Lithium Battery 48V 100Ah (5kWh) *(demo)* | `lithium-battery-5kwh` | Stock — `images/stock/inverter-system.jpg` |
| MPPT Solar Charge Controller 60A *(demo)* | `charge-controller-60a` | Placeholder |
| Sollatek Voltage Stabilizer 2kVA *(demo)* | `sollatek-avs-2kva` | Placeholder |
| Sollatek Voltage Stabilizer 5kVA *(demo)* | `sollatek-avs-5kva` | Placeholder |
| APC Easy UPS 1000VA (BV1000I) *(demo)* | `apc-ups-1000va` | Stock — `images/stock/ups.jpg` |
| Firman Petrol Generator 2.8kVA *(demo)* | `firman-gen-2-8kva` | Stock — `images/stock/generator.jpg` |
| Firman Petrol Generator 7.5kVA Key Start *(demo)* | `firman-gen-7-5kva` | Stock — `images/stock/generator-large.jpg` |
| Solar Home System 3kVA (Complete Kit) *(demo)* | `solar-home-kit-3kva` | Stock — `images/stock/inverter-system.jpg` |

### Home Appliances

| Product | id | Image now |
|---|---|---|
| Nasco 95L Double-Door Fridge (Top Freezer) *(demo)* | `nasco-fridge-95l` | Stock — `images/stock/fridge-top-freezer.jpg` |
| Nasco 210L Double-Door Fridge *(demo)* | `nasco-fridge-210l` | Stock — `images/stock/fridge-silver.jpg` |
| Nasco 200L Chest Freezer *(demo)* | `nasco-freezer-200l` | Stock — `images/stock/chest-freezer.jpg` |
| Nasco 32" LED TV (Digital Satellite) *(demo)* | `nasco-tv-32` | Stock — `images/stock/tv-wall.jpg` |
| Nasco 43" Full HD LED TV (Digital Satellite) *(demo)* | `nasco-tv-43` | Stock — `images/stock/tv-wall.jpg` |
| Samsung 55" Crystal UHD 4K Smart TV *(demo)* | `samsung-tv-55` | Stock — `images/stock/tv.jpg` |
| Haier 20L Microwave Oven *(demo)* | `haier-microwave-20l` | Stock — `images/stock/microwave-solo.jpg` |
| Binatone Blender 1.5L with Grinder (BLG-452) *(demo)* | `binatone-blender` | Stock — `images/stock/blender.jpg` |
| Binatone Steam Iron (SI-1605) *(demo)* | `binatone-iron` | Stock — `images/stock/iron.jpg` |
| Electric Kettle 1.7L *(demo)* | `electric-kettle` | Stock — `images/stock/kettle.jpg` |
| Rice Cooker 1.8L *(demo)* | `rice-cooker-1-8l` | Stock — `images/stock/rice-cooker.jpg` |
| Electric Pressure Cooker 5L *(demo)* | `pressure-cooker-5l` | Stock — `images/stock/pressure-cooker-electric.jpg` |
| Electric Hot Plate — Single *(demo)* | `hot-plate-single` | Stock — `images/stock/hot-plate.jpg` |
| Binatone 7kg Twin-Tub Washing Machine *(demo)* | `twin-tub-7kg` | Stock — `images/stock/twin-tub.jpg` |
| Bruhm 7kg Front-Load Washing Machine *(demo)* | `front-load-7kg` | Stock — `images/stock/washing-machine.jpg` |
| Midea 30L Water Heater *(demo)* | `midea-water-heater-30l` | Placeholder |

### Tools & Accessories

| Product | id | Image now |
|---|---|---|
| Tester Screwdriver | `tester` | Stock — `images/stock/voltage-tester.jpg` |
| Digital Multimeter (DT9205A) *(demo)* | `digital-multimeter` | Stock — `images/stock/multimeter.jpg` |
| Screwdriver | `screwdriver` | Stock — `images/stock/screwdriver.jpg` |
| Magnetic Screwdriver Set — 9 Pieces *(demo)* | `screwdriver-set` | Stock — `images/stock/tester-screwdriver.jpg` |
| Combination Pliers 8" (Insulated) *(demo)* | `pliers-combination` | Stock — `images/stock/pliers.jpg` |
| Side Cutter 6" *(demo)* | `side-cutter` | Stock — `images/stock/side-cutter.jpg` |
| Self-Adjusting Wire Stripper *(demo)* | `wire-stripper` | Stock — `images/stock/wire-stripper.jpg` |
| DeWalt 20V Cordless Drill/Driver *(demo)* | `dewalt-drill` | Stock — `images/stock/cordless-drill.jpg` |
| Ingco Impact Drill 710W (ID7118) *(demo)* | `ingco-impact-drill-710w` | Stock — `images/stock/corded-drill.jpg` |
| Stanley PowerLock Tape Measure 5m *(demo)* | `stanley-tape-5m` | Stock — `images/stock/tape-measure.jpg` |
| Soldering Iron 60W with Stand *(demo)* | `soldering-iron-60w` | Stock — `images/stock/soldering-iron.jpg` |
| Rechargeable LED Torch *(demo)* | `rechargeable-torch` | Stock — `images/stock/torch.jpg` |
| Insulation Tape — Small Roll | `tape-small` | Stock — `images/stock/insulation-tape.jpg` |
| Focus PVC Insulating Tape — Big Roll | `tape-big` | Your photo — `images/products/tape-big.jpg` |
| Mr. Bond Super Glue | `mr-bond-superglue` | Placeholder |
| Screws — Box | `screws-box` | Stock — `images/stock/screws.jpg` |
| Newman TV Wall Mount 14"–42" | `newman-tv-mount-14-42` | Your photo — `images/products/newman-tv-mount-14-42.jpg` |

### Security & Smart Home

| Product | id | Image now |
|---|---|---|
| Hikvision 2MP ColorVu Outdoor Camera *(demo)* | `hik-bullet-2mp` | Stock — `images/stock/bullet-camera.jpg` |
| Hikvision 4-Camera CCTV Kit with 1TB DVR *(demo)* | `hik-dvr-kit-4` | Stock — `images/stock/dvr.jpg` |
| Outdoor Wi-Fi PTZ Camera 4MP *(demo)* | `ptz-wifi-camera` | Stock — `images/stock/cctv-dome.jpg` |
| Indoor Wi-Fi Security Camera 2MP *(demo)* | `indoor-wifi-camera` | Stock — `images/stock/wifi-camera.jpg` |
| Wi-Fi Video Doorbell *(demo)* | `video-doorbell` | Stock — `images/stock/video-doorbell.jpg` |
| Wireless Doorbell with Plug-In Chime *(demo)* | `wireless-doorbell` | Stock — `images/stock/wireless-doorbell.jpg` |
| Smart Wi-Fi Plug 16A (UK) *(demo)* | `smart-plug-13a` | Placeholder |
| Smart Wi-Fi LED Bulb 9W (Colour) *(demo)* | `smart-bulb-9w` | Stock — `images/stock/smart-bulb.jpg` |
| PIR Motion Sensor (Wall/Corner Mount) *(demo)* | `motion-sensor-switch` | Stock — `images/stock/pir-sensor.jpg` |
| Smoke Alarm (10-Year Battery) *(demo)* | `smoke-alarm` | Stock — `images/stock/smoke-alarm.jpg` |

**Totals:** 140 products — 13 with your photos, 98 with stock example photos, 29 with placeholders.

Stock photo sources, authors and licences: `images/stock/CREDITS.md` (shown on the site at `credits.html`).
