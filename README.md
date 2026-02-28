# Service-Market

Online store for **appliance parts** (запчасти для бытовой техники), inspired by [service-market.com.ua](https://www.service-market.com.ua/).

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Feature-Sliced Design (FSD)** for scalable structure

## Project structure (FSD)

```
src/
├── app/              # Next.js routes, layout, providers
├── views/            # Page compositions (HomePage, …)
├── widgets/          # Header, Footer, CatalogNav, PartFinder, ProductGrid, TrustBadges
├── features/         # search-catalog, part-picker, add-to-cart
├── entities/         # product, category, cart
└── shared/           # ui (Button, Input), lib (cn), config (site, categories)
```

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Features (current)

- Catalog search placeholder (redirects to `/shop/search?text=...`)
- Part picker (brand + model) — redirects to `/models?brand=...&model=...`
- Category navigation (main categories from Service-Market)
- Product grid with mock products and “Add to cart”
- Global cart (count in header)
- Trust badges and footer with contacts

## Scaling

- Add new **entities** for new domain models.
- Add new **features** for new user actions.
- Add new **widgets** and **views** for new screens.
- Keep imports strictly by FSD layers (see `.cursor/rules/fsd-architecture.mdc`).

## Cursor rules

- `.cursor/rules/fsd-architecture.mdc` — FSD layers and import rules (always apply).
- `.cursor/rules/typescript-react.mdc` — TS/React conventions for `**/*.{ts,tsx}`.
