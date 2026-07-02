# Ottanwa Commerce

A production-quality, reusable ecommerce storefront template built with Next.js 15 App Router, TypeScript, and Tailwind CSS.

This is the master template for Ottanwa Commerce — a fictional US-based towel and home linens retailer. Duplicate this repository and swap brand assets, colors, and data to launch new stores without rewriting components.

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **shadcn/ui** (Radix primitives)
- **Lucide Icons**
- **Framer Motion** (subtle animations)
- **Embla Carousel**
- **React Context** (cart, wishlist, recently viewed)
- **localStorage** persistence (no backend)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # Production build
npm run start   # Start production server
```

## Customizing for a New Store

To rebrand this template for a new store, edit **only** these files:

| What to change | Where |
|---|---|
| Company name, contact, social | `data/company.ts` |
| Brand colors | `styles/theme.ts` + `app/globals.css` |
| Navigation & footer links | `data/navigation.ts` |
| Categories | `data/categories.ts` |
| Products | `data/products.ts` |
| Homepage content | `data/homepage.ts` |
| Testimonials | `data/testimonials.ts` |
| Logo | `public/logo/` |
| Hero images | `public/hero/` |
| Banners | `public/banners/` |
| Category images | `public/categories/` |
| Product images | `public/products/` |

Regenerate placeholder SVGs after changing products:

```bash
node scripts/generate-images.mjs
```

## Project Structure

```
app/                  # Next.js pages (App Router)
components/
  navbar/             # Sticky navigation with search
  footer/             # Four-column footer
  homepage/           # Homepage sections
  product/            # Product cards, gallery, quick view
  cart/               # Cart page
  checkout/           # Demo checkout
  shop/               # Shop with filters
  ui/                 # Reusable UI primitives
data/                 # All store content (JSON-like TS files)
lib/                  # Utilities and constants
hooks/                # Custom React hooks
context/              # Cart, wishlist, recently viewed
public/               # Static assets
styles/               # Theme color tokens
types/                # TypeScript interfaces
```

## Features

- Full homepage with 12 sections (hero, categories, deals, best sellers, etc.)
- Working cart with add/remove/quantity and localStorage persistence
- Working wishlist with localStorage persistence
- Live search filtering in navbar and shop page
- Quick view modal on product cards
- Product detail page with gallery, accordion, related products
- Shop page with sidebar filters, sorting, and pagination
- Demo checkout (no payment processing)
- Fully responsive (mobile, tablet, desktop)
- 26 products across 6 categories

## Demo Checkout

The checkout page displays **"Demo Checkout"** — no payment is processed. Use coupon code `SAVE10` on the cart page for a 10% discount demo.

## Brand Colors

- **Primary:** Deep Green `#1B4332`
- **Accent:** Gold `#C9A227`
