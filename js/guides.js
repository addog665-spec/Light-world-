// ============================================================
//  BUYING GUIDES — shown on guides.html and guide.html?id=...
//  id        unique text, no spaces (used in the link)
//  title, summary, image, minutes (reading time), tag (small label)
//  related   product ids shown under the article
//  body      the article, written in simple HTML (<p>, <h2>, <ul>, <li>, <strong>, <a>)
// ============================================================
const GUIDES = [
  {
    id: "cable-size",
    title: "Which cable size do I need?",
    summary: "1.5mm, 2.5mm, 4mm or 6mm? A simple guide to choosing house wiring cable for lights, sockets, ACs and cookers.",
    image: "images/stock/cable-rolls.jpg", minutes: 4, tag: "Cables & Wiring",
    related: ["cable-roll-1.5mm", "cable-roll-2.5mm", "cable-roll-4mm", "cable-roll-6mm"],
    body: `
      <p>Using cable that is too thin is one of the most common causes of electrical fires: it overheats when an appliance draws more current than it can carry. Here is how the usual sizes are used in Ghanaian homes.</p>
      <h2>The usual sizes</h2>
      <ul>
        <li><strong>1.5mm²</strong> — lighting circuits, usually protected by a 6A or 10A breaker.</li>
        <li><strong>2.5mm²</strong> — socket circuits for TVs, fridges, fans and phone chargers, usually on a 16A or 20A breaker.</li>
        <li><strong>4mm²</strong> — air conditioners, water heaters and other heavy single appliances.</li>
        <li><strong>6mm²</strong> — electric cookers, large water heaters and sub-mains to an outbuilding.</li>
        <li><strong>10mm² and above</strong> — the main supply from the meter to the distribution board, and long sub-mains.</li>
      </ul>
      <h2>Things that change the answer</h2>
      <ul>
        <li><strong>Long runs:</strong> over long distances voltage drops, so a bigger size may be needed — for example to a gatehouse or borehole.</li>
        <li><strong>Underground or outside:</strong> use <a href="product.html?id=armoured-cable-4mm">armoured cable</a>, not ordinary house wire.</li>
        <li><strong>The breaker must match the cable</strong>, not the appliance. A 32A breaker on 1.5mm² cable will not protect it.</li>
      </ul>
      <h2>How to spot good cable</h2>
      <p>Genuine copper cable is heavy for its size, has a bright copper core, and is printed along its length with the size, voltage rating and maker's name. Very cheap rolls are often undersized or copper-coated aluminium. If in doubt, ask us to show you the difference in the shop.</p>
      <p><strong>Always have wiring designed and installed by a qualified, certified electrician.</strong> This guide helps you understand the materials list — it doesn't replace a proper design.</p>`,
  },
  {
    id: "led-bulbs",
    title: "B22 or E27? Choosing the right LED bulb",
    summary: "Pin or screw fitting, watts and lumens, warm or cool light — everything you need to buy the right bulb the first time.",
    image: "images/stock/led-bulb.jpg", minutes: 3, tag: "Lighting",
    related: ["newman-bulb-30w", "xbz-bulb-15w", "newman-rechargeable-bulb", "lamp-holder-screw"],
    body: `
      <h2>1. Check the fitting (cap)</h2>
      <ul>
        <li><strong>B22 (pin / bayonet)</strong> — push in and twist. Very common in Ghana.</li>
        <li><strong>E27 (screw)</strong> — screws in like a bottle top.</li>
        <li><strong>E14</strong> — a small screw, used in chandeliers and small lamps.</li>
      </ul>
      <p>Take your old bulb to the shop if you're not sure, or change the holder: we sell both <a href="product.html?id=lamp-holder-pin">pin</a> and <a href="product.html?id=lamp-holder-screw">screw</a> holders.</p>
      <h2>2. Look at lumens, not just watts</h2>
      <p>Watts tell you how much power a bulb uses; <strong>lumens</strong> tell you how bright it is. As a rough guide, a 10W LED replaces an old 60–75W bulb, and a 30W LED is bright enough for a hall or a shop.</p>
      <h2>3. Choose the colour of light</h2>
      <ul>
        <li><strong>Warm white (2700–3000K)</strong> — cosy, yellowish light for bedrooms and living rooms.</li>
        <li><strong>Daylight / cool white (6000–6500K)</strong> — bright, white light for kitchens, shops, offices and security.</li>
      </ul>
      <h2>4. Think about power cuts</h2>
      <p><a href="product.html?id=newman-rechargeable-bulb">Rechargeable LED bulbs</a> have a battery inside and keep shining for a few hours when the light goes off — ideal for the hall, kitchen or shop counter.</p>
      <p>Only use bulbs marked <strong>dimmable</strong> with a dimmer switch, and use outdoor-rated fittings outside.</p>`,
  },
  {
    id: "solar-sizing",
    title: "How to size a solar and inverter system",
    summary: "Work out the inverter, batteries and solar panels you need for lights, fans, TV and a fridge — in four steps.",
    image: "images/stock/inverter-system.jpg", minutes: 5, tag: "Power & Backup",
    related: ["felicity-inverter-3kva", "tubular-battery-200ah", "solar-panel-450w", "solar-home-kit-3kva"],
    body: `
      <p>Want to skip the maths? Use our <a href="calculator.html">solar &amp; inverter calculator</a> — it does these steps for you and recommends products.</p>
      <h2>1. List what you want to run</h2>
      <p>Write down each appliance and its power in watts (it's on the label). Typical figures: LED bulb 10W, ceiling fan 75W, TV 50–100W, fridge 150W, laptop 65W, 1.5HP AC about 1,300W.</p>
      <h2>2. Size the inverter</h2>
      <p>Add up the watts of everything that might run <strong>at the same time</strong>, then add about 25% headroom. Inverters are rated in kVA; multiply by 0.8 to get usable watts. A 3kVA inverter gives about 2,400W — enough for lights, fans, TV, a fridge and a computer. Add an AC or a pump and you'll want 5kVA.</p>
      <h2>3. Size the batteries</h2>
      <p>Multiply the power you'll use during a power cut by the hours you want it to last. Lead-acid batteries should only be used to about half their capacity; lithium batteries to about 90%. One 12V 200Ah battery stores 2,400Wh — so roughly 1,200Wh usable if it's lead-acid.</p>
      <h2>4. Size the solar panels</h2>
      <p>Ghana gets about 4.5–5.5 hours of strong sun a day. Divide your daily energy use (Wh) by about 3.75 (5 sun hours × 75% efficiency) to get the panel watts you need, then divide by the panel size (e.g. 450W).</p>
      <h2>Avoid heating appliances on the inverter</h2>
      <p>Irons, kettles, water heaters and hot plates draw a lot of power and drain batteries fast. Keep them on ECG power or the generator, and protect the system with a <a href="product.html?id=changeover-63a">changeover switch</a> and <a href="product.html?id=spd-surge">surge protection</a>.</p>`,
  },
  {
    id: "voltage-protection",
    title: "Stabilizer, voltage guard or surge protector?",
    summary: "Low voltage, high voltage and lightning damage appliances in different ways. Here's which protection you need.",
    image: "images/stock/page-faq.jpg", minutes: 3, tag: "Circuit Protection",
    related: ["voltage-guard", "sollatek-avs-2kva", "sollatek-avs-5kva", "spd-surge"],
    body: `
      <h2>Voltage guard — for one appliance</h2>
      <p>A <a href="product.html?id=voltage-guard">voltage guard</a> plugs into the socket. If the voltage goes too low or too high it cuts the power, then waits a few minutes before switching back on — which protects fridge and freezer compressors. Best for: one fridge, freezer or TV.</p>
      <h2>Stabilizer — when your voltage is often low</h2>
      <p>A stabilizer (AVS/AVR) <strong>corrects</strong> the voltage, boosting it when it's low and lowering it when it's high, so appliances keep working normally. Best for: areas where the voltage regularly drops, ACs, offices and whole houses. Choose a size above the total load — <a href="product.html?id=sollatek-avs-2kva">2kVA</a> for a few appliances, <a href="product.html?id=sollatek-avs-5kva">5kVA</a> for a house or shop.</p>
      <h2>Surge protector — against lightning and spikes</h2>
      <p>A <a href="product.html?id=spd-surge">surge protection device</a> fits in the distribution board and diverts sudden spikes from lightning or switching to earth, protecting everything in the building. It needs good earthing to work.</p>
      <h2>Our recommendation</h2>
      <ul>
        <li>Every house: a surge protector in the board and a good earth.</li>
        <li>Fridges and freezers: a voltage guard each.</li>
        <li>Low-voltage areas or ACs: a stabilizer sized for the load.</li>
      </ul>`,
  },
  {
    id: "cctv",
    title: "Choosing a CCTV system for your home or shop",
    summary: "Wired kit or Wi-Fi cameras? How many cameras, what resolution and how much storage — explained simply.",
    image: "images/stock/cat-security.jpg", minutes: 4, tag: "Security",
    related: ["hik-dvr-kit-4", "hik-bullet-2mp", "indoor-wifi-camera", "apc-ups-1000va"],
    body: `
      <h2>Wired kit or Wi-Fi cameras?</h2>
      <ul>
        <li><strong>Wired kit with recorder (DVR)</strong> — most reliable, records all cameras in one place, best for compounds, shops and offices. See our <a href="product.html?id=hik-dvr-kit-4">4-camera kit</a>.</li>
        <li><strong>Wi-Fi cameras</strong> — easy to install yourself, record to a memory card or the cloud, best for one or two rooms.</li>
      </ul>
      <h2>Where to put cameras</h2>
      <p>Cover the gate, the main door, the car park or yard, and the shop counter or till. Mount outdoor cameras high, under cover, and away from direct sun.</p>
      <h2>Resolution and night vision</h2>
      <p>2MP (1080p) is enough to see faces near the camera; 4MP gives more detail over wider areas. Check the infrared night-vision range — 20m is good for a compound.</p>
      <h2>Storage</h2>
      <p>A 1TB hard drive usually keeps about 10–14 days of recording from four 2MP cameras before it records over the oldest footage.</p>
      <h2>Keep it running in power cuts</h2>
      <p>Put the recorder and router on a <a href="product.html?id=apc-ups-1000va">UPS</a> or your inverter — otherwise the cameras go off exactly when the lights do.</p>`,
  },
  {
    id: "home-safety",
    title: "Protect your home: breakers, RCDs and earthing",
    summary: "What each part of your distribution board does, and the protection every Ghanaian home should have.",
    image: "images/stock/circuit-breakers.jpg", minutes: 4, tag: "Safety",
    related: ["focus-db-8way", "rccb-40a", "mcb-single-pole", "earth-rod"],
    body: `
      <h2>Breakers (MCBs) protect the cables</h2>
      <p>A miniature circuit breaker switches off when a circuit is overloaded or short-circuits, before the cable overheats. Each circuit needs a breaker matched to its cable size.</p>
      <h2>RCDs protect people</h2>
      <p>An <a href="product.html?id=rccb-40a">RCD / RCCB (30mA)</a> watches for current leaking to earth — for example through a person touching a faulty appliance — and switches off in a fraction of a second. It can save a life, especially in kitchens, bathrooms and outside.</p>
      <h2>Earthing makes it all work</h2>
      <p>A proper earth connection with an <a href="product.html?id=earth-rod">earth rod</a> lets fault current flow safely away, so breakers and RCDs can do their job and surge protectors can divert spikes.</p>
      <h2>Generators and inverters</h2>
      <p>Always connect a generator or inverter through a <a href="product.html?id=changeover-63a">changeover switch</a>. It stops backup power flowing back into ECG lines, which can injure workers and damage your equipment.</p>
      <p><strong>Have your installation tested by a qualified, certified electrician</strong>, especially in an older house or after adding new appliances.</p>`,
  },
];
