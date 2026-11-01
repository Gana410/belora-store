# Belora — Beauty & Fashion Store

A modern, responsive e-commerce front end built with React 19 and Vite. Belora is a curated store for beauty, skincare and women's fashion, powered by the public [DummyJSON](https://dummyjson.com) API.

> **Portfolio demo.** There is no backend: checkout and the contact form are simulated, and no payments or orders are processed.

## Features

- Home page: hero slider, category tiles, promo banners, featured deals, best sellers, category carousels
- Shop and category pages: price, rating and in-stock filters, sorting, "load more"
- Search across the Belora catalog
- Product page: image gallery, discount pricing, quantity selector, reviews, share, related products
- Cart: quantities, free-shipping progress, savings and totals, persisted in `localStorage`
- Wishlist (persisted) with move-to-cart
- Demo checkout with form validation and an order confirmation view
- About, Contact (validated) and 404 pages
- Loading skeletons, empty states, API error handling with retry, toast notifications
- Responsive: mobile drawer menu, bottom-sheet filters

## Tech stack

React 19 · Vite · React Router 7 · Context API · Framer Motion · Swiper · React Hot Toast · React Icons

## Getting started

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Project structure

```
src/
  api/        DummyJSON requests (cached, error-aware)
  component/  common, header, layout, listing, home, slideProducts, context
  data/       curated catalog categories + shipping settings
  hooks/      useApi, useCart, useWishlist, useProductActions, useLocalStorage
  page/       home, shop, categoryPage, productDetails, search, cart, checkout, wishlist, about, contact, notFound
  utils/      pricing, validation, notifications
```

## Deployment

`vercel.json` and `public/_redirects` provide the SPA fallback for Vercel and Netlify. GitHub Pages needs a hash router or a 404 redirect.
