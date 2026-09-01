# Partsman – Auto Spare Destination

Portfolio + product catalogue website for Partsman truck body parts, built with **React 18 + Vite 5**, React Router and Framer Motion.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the production build
```

Node 18+ is required.

## Deploying to GitHub Pages

The site is configured for a **project page** served under `/Partsman/` (see `vite.config.js`). The build:

- prefixes every JS/CSS/image URL with `/Partsman/` (`asset()` helper in `src/data/assets.js` handles catalogue images),
- sets the router `basename` to match,
- copies `dist/index.html` to `dist/404.html` so deep links such as `/Partsman/model/tata-lpt-truck-body-parts` load on refresh.

Publish the contents of `dist/` to the `gh-pages` branch (or the folder GitHub Pages serves). For a custom domain or root hosting, build with `VITE_BASE_PATH=/ npm run build`.

Locally the dev server therefore runs at **http://localhost:5173/Partsman/**.

## Configure the company details

All contact details live in one file: `src/data/company.js` (WhatsApp number, phone, email, address, hours, social links, map embed). Replace the placeholder values before going live.

## Catalogue data

`src/data/catalog.json` holds 17 categories, 14 vehicle models and 846 products (name, SKU, material, compatible variants, description, images). It was scraped from sparebix.com for **demo purposes only**; the product, category, model and banner photos in `public/images/` are that site's copyrighted assets and must be replaced with Partsman's own photos before launch. 199 products had no photo on the source site and use `public/images/placeholder.svg`.

`src/data/catalog.js` wraps the JSON with brand mapping, lookups, search and related-product helpers.

## Pages

- `/` – hero, parts finder (brand → model → category), brand marquee, popular models, categories, featured parts, why-us, how-it-works, stats, testimonials, CTA
- `/models`, `/model/:slug` – models list with brand filter; per-model catalogue with category sidebar/chips
- `/categories`, `/category/:slug` – categories grid; per-category catalogue with model/brand filters
- `/product/:slug` – gallery with lightbox, specs, compatible variants, WhatsApp/call/share CTAs, related parts
- `/search?q=&brand=&model=&category=` – global search (also live dropdown in the header, press `/` to focus)
- `/about`, `/contact` (enquiry form opens WhatsApp pre-filled), `/policies`

## Theme

Light / Dark / System toggle in the header (persisted in `localStorage` as `pm-theme`). Tokens are defined in `src/styles/global.css` under `:root` and `:root[data-theme="dark"]`. Brand colours come from the logo: yellow `#FFCB01`, navy `#433A59`.
