// ─────────────────────────────────────────────────────────────
//  PARTSMAN company configuration
//  Replace the placeholder values below with the real details.
// ─────────────────────────────────────────────────────────────
export const company = {
  name: 'Partsman',
  tagline: 'Auto Spare Destination',
  // WhatsApp number in international format WITHOUT "+" or spaces (e.g. 919876543210)
  whatsapp: '919999999999',
  phoneDisplay: '+91 99999 99999',
  phone: '+919999999999',
  email: 'sales@partsman.in',
  address: 'Partsman Auto Spares, Industrial Area, Ahmedabad, Gujarat 380001, India',
  city: 'Ahmedabad, Gujarat',
  hours: 'Mon – Sat, 9:00 AM – 7:00 PM',
  gst: 'GSTIN: 24XXXXXXXXXXXXX',
  social: {
    facebook: 'https://facebook.com/',
    instagram: 'https://instagram.com/',
    youtube: 'https://youtube.com/',
  },
  mapEmbed: 'https://www.google.com/maps?q=Ahmedabad,Gujarat&output=embed',
};

export const waLink = (text) =>
  `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(text)}`;

export const productEnquiryLink = (p) =>
  waLink(`Hello Partsman, I am interested in ${p.name}${p.sku ? ` (SKU: ${p.sku})` : ''}. Please share price and availability.`);
