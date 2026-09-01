import raw from './catalog.json';
import { asset } from './assets.js';

// ── Brands (derived from model slugs) ─────────────────────────
export const BRANDS = [
  { id: 'tata', name: 'TATA', match: (s) => s.startsWith('tata-') },
  { id: 'leyland', name: 'Ashok Leyland', match: (s) => s.startsWith('leyland-') },
  { id: 'eicher', name: 'Eicher', match: (s) => s.startsWith('eicher-') },
  { id: 'bharatbenz', name: 'BharatBenz', match: (s) => s.startsWith('bharatbenz') },
  { id: 'sml', name: 'SML Isuzu', match: (s) => s.startsWith('swaraj-') },
];

const brandOf = (slug) => BRANDS.find((b) => b.match(slug))?.id || 'other';

const MODEL_META = {
  'tata-lpt-truck-body-parts': { short: 'TATA LPT', tag: 'Medium & heavy trucks', accent: '#FFCB01' },
  'tata-lp-truck-body-parts': { short: 'TATA COWL', tag: 'LP / Cowl chassis', accent: '#F59E0B' },
  'tata-hyva-truck-body-parts': { short: 'TATA HYVA', tag: 'Tippers & dumpers', accent: '#EF7D1A' },
  'leyland-truck-body-parts': { short: 'LEYLAND', tag: 'Ashok Leyland range', accent: '#3B82F6' },
  'eicher-truck-body-parts': { short: 'EICHER', tag: 'Eicher classic', accent: '#22C55E' },
  'eicher-pro-truck-body-parts': { short: 'EICHER PRO', tag: 'Pro series', accent: '#10B981' },
  'tata-signa-truck-body-parts': { short: 'TATA SIGNA', tag: 'Signa cabins', accent: '#EAB308' },
  'tata-ace-body-parts': { short: 'TATA ACE', tag: 'Mini trucks', accent: '#F97316' },
  'leyland-dost-truck-body-parts': { short: 'LEYLAND DOST', tag: 'Light commercial', accent: '#0EA5E9' },
  'tata-se-truck-body-parts': { short: 'TATA SE', tag: 'SE 1613 / 1615', accent: '#D97706' },
  'tata-sfc-truck-body-parts': { short: 'TATA SFC', tag: 'SFC 407 / 709', accent: '#FB923C' },
  'leyland-ecomet-truck-body-parts': { short: 'ECOMET', tag: 'Leyland Ecomet', accent: '#6366F1' },
  'swaraj-mazda-truck-body-parts': { short: 'SML', tag: 'Swaraj Mazda / SML', accent: '#A855F7' },
  'bharatbenz-truck-body-parts': { short: 'BHARATBENZ', tag: 'Daimler trucks', accent: '#64748B' },
};

const CATEGORY_META = {
  'truck-bumpers': { icon: 'bumper', short: 'Bumpers' },
  'truck-doors': { icon: 'door', short: 'Doors' },
  'truck-show-grills': { icon: 'grill', short: 'Show Grills' },
  'truck-pillars': { icon: 'pillar', short: 'Pillars' },
  'truck-wiper-panels': { icon: 'wiper', short: 'Wiper Panels' },
  'truck-fenders': { icon: 'fender', short: 'Fenders' },
  'truck-side-panels': { icon: 'panel', short: 'Side Panels' },
  'truck-mudguards': { icon: 'mudguard', short: 'Mudguards' },
  'truck-bonnets': { icon: 'bonnet', short: 'Bonnets' },
  'truck-corners': { icon: 'corner', short: 'Corners' },
  'truck-rppf-tops': { icon: 'roof', short: 'Roof Tops' },
  'truck-tailgates': { icon: 'tailgate', short: 'Tailgates' },
  'truck-water-channels': { icon: 'channel', short: 'Water Channels' },
  'truck-hinges-brackets': { icon: 'hinge', short: 'Hinges & Brackets' },
  'truck-floorings': { icon: 'floor', short: 'Floorings' },
  'truck-patti': { icon: 'patti', short: 'Patti & Handles' },
  'truck-others-parts': { icon: 'others', short: 'Other Parts' },
};

const cleanName = (n) => n.replace(/^Truck\s+/i, '').replace(/^Commercial Vehicle & Truck\s+/i, '');

export const categories = raw.categories.map((c) => ({
  ...c,
  image: asset(c.image),
  ...CATEGORY_META[c.slug],
  short: CATEGORY_META[c.slug]?.short || cleanName(c.name),
  count: c.products.length,
}));

export const models = raw.models.map((m) => ({
  ...m,
  image: asset(m.image),
  ...MODEL_META[m.slug],
  short: MODEL_META[m.slug]?.short || m.name,
  brand: brandOf(m.slug),
  count: m.products.length,
}));

export const products = raw.products.map((p) => ({
  ...p,
  images: p.images.map(asset),
  thumb: asset(p.thumb),
  brand: brandOf(p.models[0] || ''),
  primaryModel: p.models[0] || '',
  primaryCategory: p.categories[0] || 'truck-others-parts',
}));

export const banners = raw.banners.map(asset);

// ── Lookups ───────────────────────────────────────────────────
const bySlug = (list) => Object.fromEntries(list.map((x) => [x.slug, x]));
export const categoryMap = bySlug(categories);
export const modelMap = bySlug(models);
export const productMap = bySlug(products);

export const getCategory = (slug) => categoryMap[slug];
export const getModel = (slug) => modelMap[slug];
export const getProduct = (slug) => productMap[slug];

export const productsForCategory = (slug) => products.filter((p) => p.categories.includes(slug));
export const productsForModel = (slug) => products.filter((p) => p.models.includes(slug));
export const modelsForBrand = (brandId) => models.filter((m) => m.brand === brandId);

export const featuredProducts = (n = 8) => {
  const picks = [];
  const seen = new Set();
  for (const m of models) {
    const p = products.find((x) => x.models.includes(m.slug) && x.images.length > 1 && !seen.has(x.slug));
    if (p) { picks.push(p); seen.add(p.slug); }
    if (picks.length >= n) break;
  }
  return picks;
};

export const relatedProducts = (p, n = 8) => {
  const same = products.filter((x) => x.slug !== p.slug && x.models.some((m) => p.models.includes(m)));
  const sameCat = same.filter((x) => x.categories.some((c) => p.categories.includes(c)));
  const rest = same.filter((x) => !sameCat.includes(x));
  return [...sameCat, ...rest].slice(0, n);
};

// ── Search ────────────────────────────────────────────────────
const norm = (s) => s.toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();

export function searchProducts({ q = '', brand = '', model = '', category = '' } = {}) {
  const terms = norm(q).split(' ').filter(Boolean);
  return products.filter((p) => {
    if (brand && p.brand !== brand) return false;
    if (model && !p.models.includes(model)) return false;
    if (category && !p.categories.includes(category)) return false;
    if (!terms.length) return true;
    const hay = norm(`${p.name} ${p.title} ${p.sku} ${p.modelName} ${p.compatible.join(' ')} ${p.categories.join(' ')}`);
    return terms.every((t) => hay.includes(t));
  });
}

export const stats = {
  products: products.length,
  models: models.length,
  categories: categories.length,
  brands: BRANDS.length,
};
