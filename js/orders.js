// ============================================================
//  ORDER TRACKING — what customers see on track.html
//  The website has no database, so you update this list yourself when an order moves on.
//  Only put the order number, status and a short note here — never names, phone numbers
//  or addresses (anyone who knows an order number can see its entry).
//
//  ref      the order number from the customer's invoice, e.g. "LW-261110-NCZ3"
//  method   "pickup" or "delivery"
//  status   for delivery:  "Received", "Confirmed", "Packed", "Out for delivery", "Delivered"
//           for pickup:    "Received", "Confirmed", "Packed", "Ready for pickup", "Collected"
//  updated  when you last changed it, e.g. "10 Nov 2026, 2:15pm"
//  note     optional message for the customer
// ============================================================
const ORDERS = [
  // Demo entries so the tracking page can be tried — delete before launch
  { ref: "LW-DEMO-1001", method: "delivery", status: "Out for delivery", updated: "10 Nov 2026, 2:15pm",
    note: "Our rider is on the way and will call you before arriving." },
  { ref: "LW-DEMO-1002", method: "pickup", status: "Ready for pickup", updated: "10 Nov 2026, 11:40am",
    note: "Your order is packed and waiting at the counter. Bring your order number." },
];
