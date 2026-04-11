# Jindal Vastrakala — Website

Luxury Indian ethnic wear e-commerce. Built with Next.js 14, Tailwind CSS, Razorpay (India), and Stripe (International).

---

## Quick Start

```bash
npm install
cp .env.local.example .env.local
# Fill in your API keys in .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Setup Checklist

### 1. Environment Variables
Copy `.env.local.example` to `.env.local` and fill in:

| Variable | Where to get it |
|---|---|
| `RAZORPAY_KEY_ID` | dashboard.razorpay.com → Settings → API Keys |
| `RAZORPAY_KEY_SECRET` | dashboard.razorpay.com → Settings → API Keys |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Same as above |
| `STRIPE_SECRET_KEY` | dashboard.stripe.com → Developers → API Keys |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | dashboard.stripe.com → Developers → API Keys |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Your WhatsApp number with country code e.g. `919876543210` |
| `ADMIN_PASSWORD` | Choose a strong password for the admin panel |

### 2. Update Products
Edit `lib/products.ts` to add your real products, photos, and prices.

For photos, either:
- Upload to Cloudinary (free tier) and paste the URL
- Use your own server/S3 bucket

### 3. Update Contact Info
- `components/shop/Navbar.tsx` — update shop address in footer
- `app/layout.tsx` — update metadata and address
- `app/link-in-bio/page.tsx` — update TikTok/Instagram handles

### 4. Admin Panel
Visit `/admin` to manage inventory. Password is set in `.env.local`.

> **Note:** The admin panel currently runs in-memory. For production, connect a database (Supabase, PlanetScale, or Prisma + PostgreSQL).

---

## Pages

| Route | Description |
|---|---|
| `/` | Homepage — hero, categories, featured products, brand story |
| `/shop/sarees` | Sarees catalogue |
| `/shop/lehengas` | Lehengas catalogue |
| `/shop/suits` | Suits catalogue |
| `/products/[slug]` | Product detail page |
| `/checkout` | Checkout — Razorpay (INR) or Stripe (EUR) |
| `/checkout/success` | Order confirmation |
| `/admin` | Inventory management panel |
| `/link-in-bio` | TikTok/Instagram link-in-bio page |

---

## TikTok / Instagram Setup

Use `yourdomain.com/link-in-bio` as your link in bio on:
- TikTok profile
- Instagram bio
- YouTube channel description

This page shows all your key links in one place.

---

## To fix the TikTok → sales gap

Add this to every TikTok caption:
```
Shop this piece → link in bio → WhatsApp us with "SAREE" for instant help
```

The WhatsApp button on every page captures customers even before the website is fully set up.

---

## Production Deployment (Vercel)

1. Push to GitHub
2. Import repo in Vercel
3. Add all environment variables in Vercel dashboard → Settings → Environment Variables
4. Deploy ✓

---

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + custom CSS
- **Fonts**: Cormorant Garamond, EB Garamond, Cinzel (Google Fonts)
- **Cart**: Zustand (persisted to localStorage)
- **Payments**: Razorpay (India) + Stripe (International)
- **Icons**: Lucide React
