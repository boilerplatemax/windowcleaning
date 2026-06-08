# Wise Guys Windows

A sleek, SEO-optimized Next.js website for **Wise Guys Windows** — a residential
window cleaning business in Greater Victoria, BC with a fun, playful mob/mafia
theme ("Dirty windows? Forget about it.").

Built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4** and
**SendGrid** (email notifications). A light, airy theme with gold accents and a
dark navbar/footer for contrast.

## Features

- **Playful mafia theme** — light "speakeasy" design with gold accents, fully
  responsive.
- **Instant quote wizard** — a 5-step, idiot-proof flow that produces a price
  range + recommended midpoint in under 60 seconds. No window/pane jargon.
- **Rule-based pricing engine** (`src/lib/pricing.ts`) tuned for Victoria, BC
  in CAD, with server-side recalculation so client math is never trusted.
- **SendGrid notifications** — you get an email for every new lead.
- **Google Places autocomplete** for addresses (optional; graceful fallback).
- **SEO-first** — per-page metadata, OpenGraph, JSON-LD `LocalBusiness`,
  `sitemap.xml`, and `robots.txt`.

> CRM lead persistence (e.g. Supabase) was removed for now. The `/api/quote`
> route has a clearly marked spot to wire a database back in later.

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
still computes and shows prices without them; it just won't send email.

| Variable | Purpose |
| --- | --- |
| `SENDGRID_API_KEY` / `SENDGRID_FROM_EMAIL` / `QUOTE_NOTIFICATION_EMAIL` | Email notifications |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Address autocomplete |

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
  confidence indicator) and records a count. To store the actual files, wire up
  storage in `/api/quote`.
