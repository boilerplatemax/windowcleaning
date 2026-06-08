# Wise Guys Windows 🕴️🪟

A sleek, SEO-optimized Next.js website for **Wise Guys Windows** — a residential
window cleaning business in Greater Victoria, BC with a fun, playful mob/mafia
theme ("Dirty windows? Fuhgeddaboudit.").

Built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**,
**Supabase** (lead capture / CRM) and **SendGrid** (email notifications).

## Features

- 🎩 **Playful mafia theme** — noir + gold "speakeasy" design, fully responsive.
- ⚡ **Instant quote wizard** — a 5-step, idiot-proof flow that produces a price
  range + recommended midpoint in under 60 seconds. No window/pane jargon.
- 💰 **Rule-based pricing engine** (`src/lib/pricing.ts`) tuned for Victoria, BC
  in CAD, with server-side recalculation so client math is never trusted.
- 🗂️ **Supabase CRM capture** — every quote is saved for follow-up.
- ✉️ **SendGrid notifications** — you get an email for every new lead.
- 📍 **Google Places autocomplete** for addresses (optional; graceful fallback).
- 🔍 **SEO-first** — per-page metadata, OpenGraph, JSON-LD `LocalBusiness`,
  `sitemap.xml`, and `robots.txt`.

## Pages

`/` Home · `/services` · `/about` · `/gallery` · `/contact` · `/quote`

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in keys (all optional for local dev)
npm run dev
```

Open http://localhost:3000.

## Environment variables

See `.env.example`. All are optional for local development — the quote flow
still computes and shows prices without them; it just won't persist leads or
send email.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` | Save leads to Supabase |
| `SENDGRID_API_KEY` / `SENDGRID_FROM_EMAIL` / `QUOTE_NOTIFICATION_EMAIL` | Email notifications |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Address autocomplete |

## Supabase setup

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the SQL editor to create the `quotes` table.
3. Copy the project URL + service-role key into `.env.local`.

Leads are inserted from the server (`/api/quote`) using the service-role key,
so Row Level Security stays fully locked down.

## Pricing model

Configured in `src/lib/pricing.ts`:

- **Base by home size:** Small $120–160 · Medium $160–220 · Large $220–320
- **Floors:** 2-story +20% · 3+ story +45%
- **Large glass/doors:** +15% (unsure +5%)
- **Interior + exterior:** +50%
- **Add-ons:** Screens +$35 · Tracks/frames +$25 · Skylights +$45
- Output rounded to the nearest $5 with a clean midpoint.

## Notes

- Images are royalty-free Unsplash placeholders — swap for real photos later.
- Photo upload on the quote form currently flags "photos provided" (boosts the
  confidence indicator) and records a count. To store the actual files, add a
  Supabase Storage bucket and upload in `/api/quote`.
