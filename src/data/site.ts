/**
 * ─────────────────────────────────────────────────────────────
 *  ELISE GRACE ARTISTRY — SITE CONTENT
 *  Every piece of text, price and link on the site lives here.
 *  Edit this file to update the website; no component changes needed.
 * ─────────────────────────────────────────────────────────────
 */

export const BRAND = {
  name: 'Elise Grace Artistry',
  location: 'Yagoona, NSW, Australia',
  locationShort: 'Yagoona · NSW',
  instagram: {
    handle: '@elisegraceartistry',
    url: 'https://www.instagram.com/elisegraceartistry/',
  },
  tiktok: {
    handle: '@elisegraceartistry',
    url: 'https://www.tiktok.com/@elisegraceartistry',
  },
};

/** Primary booking route: Instagram DMs. */
export const BOOK_URL = BRAND.instagram.url;

export const NAV = [
  { label: 'Story', href: '#story' },
  { label: 'Services', href: '#services' },
  { label: 'Menu', href: '#menu' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Mobile', href: '#mobile' },
  { label: 'Contact', href: '#book' },
];

export type Service = {
  no: string;
  title: string;
  script: string;
  body: string;
  includes: string[];
  note?: string;
  art: 'eye' | 'curl' | 'leaf' | 'drop';
};

export const SERVICES: Service[] = [
  {
    no: '01',
    title: 'Makeup Artistry',
    script: 'the art of you',
    body:
      'Makeup that looks like you, just more polished and made to last. Each look starts with your skin, your features and your inspiration photos, then it is built to hold up from the first photo to the last dance.',
    includes: ['Special occasions', 'Events & celebrations', 'Inspiration-led looks', 'Studio or mobile'],
    art: 'eye',
  },
  {
    no: '02',
    title: 'Professional Hairstyling',
    script: 'good hair, good mood',
    body:
      'From a glossy blowdry to soft curls and sculpted upstyles, plus tint and regrowth colour. Every style is chosen to suit your hair, your outfit and how long your day will be.',
    includes: ['Wash & blowdry', 'Curling', 'Upstyles', 'Tint & regrowth colour'],
    art: 'curl',
  },
  {
    no: '03',
    title: 'Facials',
    script: 'healthy skin is a routine',
    body:
      'Advanced facials by Josey, a facial technician with 25 years of experience. Treatments use high-performance Korean skincare and advanced technology for healthy, glowing skin. By appointment only.',
    includes: ['Microdermabrasion', 'LED light therapy', 'Radio frequency', 'Ultrasonic', 'Eye creams', 'Korean face masks'],
    art: 'leaf',
  },
  {
    no: '04',
    title: 'Nanoplasty',
    script: 'coming soon',
    body:
      'A straightening treatment that grows out, leaving hair smoother, healthier and easier to manage. It lasts 3–6 months depending on your hair growth, and you can book now to secure your spot.',
    includes: ['Smooth, frizz-free finish', 'High shine', 'Repairs & strengthens', 'Suitable for all hair types'],
    note: 'Coming soon · now taking bookings',
    art: 'drop',
  },
];

export type PriceItem = { name: string; detail?: string; price: string };
export type PriceGroup = { title: string; script: string; items: PriceItem[] };

/** Prices as published on @elisegraceartistry. Update here when they change. */
export const MENU: PriceGroup[] = [
  {
    title: 'Hair',
    script: 'hair services',
    items: [
      { name: 'Wash & Blowdry', detail: 'Depending on length & thickness', price: '$25 – $55' },
      { name: 'Curling / Wash & Curl', detail: 'Depending on length & thickness', price: '$50 – $70' },
      { name: 'Full Head Tint & Blowdry', price: 'from $60' },
      { name: 'Regrowth Tint & Blowdry', price: 'from $50' },
      { name: 'Upstyles', detail: 'Depending on length & thickness', price: '$60 – $80' },
    ],
  },
  {
    title: 'Makeup',
    script: 'makeup',
    items: [{ name: 'Makeup Looks', detail: 'All makeup looks', price: '$100' }],
  },
  {
    title: 'Skin & Treatments',
    script: 'treatments',
    items: [
      { name: 'Facials with Josey', detail: 'Approx. 80 minutes · by appointment only', price: '$150' },
      { name: 'Nanoplasty', detail: 'Coming soon · depending on hair type', price: '$250 – $300' },
    ],
  },
];

export const TESTIMONIALS = [
  {
    quote:
      'Despite the windy and rainy weather, our hair and makeup stayed flawless the entire day… You followed our inspiration pictures beautifully while also giving us expert advice on styles that would suit our dresses.',
    tail: 'Someone who is not only talented but genuinely cares about making her clients feel amazing.',
    who: 'Client message, hair & makeup',
  },
  {
    quote:
      'I just wanted to extend another big thank you for doing such a beautiful job on my hair and make up, it lasted all day and night.',
    tail: 'Here is a photo with my SIL at around 9pm.',
    who: 'Client message, hair & makeup',
  },
];

export const WHY = [
  {
    title: 'Personalised, always',
    body: 'Your inspiration, your features, your occasion. Every look is planned around you, never copied from a template.',
  },
  {
    title: 'Makeup & hair, together',
    body: 'One artist for your complete look, so your hair and makeup are designed to work as a single, cohesive finish.',
  },
  {
    title: 'Made to last',
    body: 'Considered products and technique, chosen to hold through weather, photos and long celebrations.',
  },
  {
    title: 'Mobile convenience',
    body: 'Get ready where you are most comfortable. Mobile makeup and hairstyling services are available.',
  },
];

export const CARE_TIPS = [
  { title: 'Use quality products', body: 'Invest in good hair care products that suit your hair type.' },
  { title: 'Heat styling in moderation', body: 'Limit heat styling and always use a heat protectant.' },
  { title: 'Keep it hydrated', body: 'Deep condition regularly to keep your hair soft and nourished.' },
  { title: 'Be gentle', body: 'Use a wide-tooth comb and avoid rough brushing when wet.' },
  { title: 'Protect your hair', body: 'Protect your hair while sleeping and from sun, chlorine and harsh environmental factors.' },
];

/**
 * PORTFOLIO
 * ─────────
 * These are art-directed placeholders, not client work.
 * To show real photographs, add `src` (an imported image or a URL on your own host)
 * and an `alt` description. The placeholder art and "placeholder" tag disappear automatically.
 *
 *   import bridal01 from '../assets/bridal-01.jpg';
 *   { ..., src: bridal01, alt: 'Soft glam bridal makeup with sculpted waves' }
 */
export type PortfolioItem = {
  id: string;
  category: 'Makeup' | 'Hair' | 'Occasion';
  title: string;
  art: 'eye' | 'lips' | 'curl' | 'updo' | 'profile' | 'brush' | 'wave';
  tone: [string, string, string];
  shape: 'tall' | 'wide' | 'square';
  src?: string;
  alt?: string;
};

export const PORTFOLIO: PortfolioItem[] = [
  { id: 'p1', category: 'Makeup', title: 'Soft Glam', art: 'eye', tone: ['#CDBBA9', '#9F8B79', '#5C4A3E'], shape: 'tall' },
  { id: 'p2', category: 'Hair', title: 'Hollywood Waves', art: 'curl', tone: ['#E2D5C6', '#B9A592', '#7A6656'], shape: 'square' },
  { id: 'p3', category: 'Occasion', title: 'Evening Look', art: 'profile', tone: ['#B6A291', '#7E6B5D', '#3C2F27'], shape: 'wide' },
  { id: 'p4', category: 'Makeup', title: 'Defined Lip', art: 'lips', tone: ['#D9C7B5', '#A9907C', '#6B5446'], shape: 'square' },
  { id: 'p5', category: 'Hair', title: 'Sculpted Upstyle', art: 'updo', tone: ['#C9B8A7', '#93806F', '#4E3F35'], shape: 'tall' },
  { id: 'p6', category: 'Hair', title: 'Glossy Blowdry', art: 'wave', tone: ['#EDE3D8', '#C4B19F', '#8B7766'], shape: 'square' },
  { id: 'p7', category: 'Makeup', title: 'Skin First', art: 'brush', tone: ['#D3C2B1', '#A28D7B', '#5F4D41'], shape: 'wide' },
  { id: 'p8', category: 'Occasion', title: 'Celebration Glam', art: 'lips', tone: ['#C4B2A1', '#8F7B6B', '#493A31'], shape: 'square' },
];
