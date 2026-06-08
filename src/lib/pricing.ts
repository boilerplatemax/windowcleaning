import type { QuoteInput, QuoteResult, QuoteBreakdownLine } from "./types";

// ------------------------------------------------------------------ //
//  Orca Window Cleaning — rule-based pricing engine (Victoria, BC)    //
//  Tuned to be slightly competitive to win early customers (CAD).     //
// ------------------------------------------------------------------ //

const BASE: Record<QuoteInput["homeSize"], { low: number; high: number }> = {
  small: { low: 120, high: 160 }, // 1–2 bed condo / townhouse
  medium: { low: 160, high: 220 }, // ~3 bed home
  large: { low: 220, high: 320 }, // 4+ bed home
};

// Floor multipliers — taller homes need ladders / more time.
const FLOOR_MULT: Record<QuoteInput["floors"], number> = {
  "1": 1.0,
  "2": 1.2, // +20%
  "3+": 1.45, // +45%
};

// "Lots of large windows / glass doors" access factor.
const LARGE_WINDOW_MULT: Record<QuoteInput["largeWindows"], number> = {
  no: 1.0,
  unsure: 1.05,
  yes: 1.15, // +15%
};

// Interior + exterior roughly +50% over exterior-only.
const INTERIOR_MULT = 1.5;

// Flat add-ons (CAD).
const ADDON_SCREENS = 35;
const ADDON_TRACKS = 25;
const ADDON_SKYLIGHTS = 45;

// Round to the nearest $5 for clean psychological pricing.
function round5(n: number): number {
  return Math.round(n / 5) * 5;
}

export function calculateQuote(input: QuoteInput): QuoteResult {
  const breakdown: QuoteBreakdownLine[] = [];

  // 1. Base by home size (adjusted if a manual window count is given).
  let { low, high } = BASE[input.homeSize];

  if (typeof input.windowCount === "number" && input.windowCount > 0) {
    // Blend the size band toward a per-window estimate (~$8–$12 / window).
    const wcLow = input.windowCount * 8;
    const wcHigh = input.windowCount * 12;
    low = Math.round((low + wcLow) / 2);
    high = Math.round((high + wcHigh) / 2);
    breakdown.push({
      label: "Base clean",
      detail: `~${input.windowCount} windows`,
    });
  } else {
    const sizeLabel = {
      small: "Small home",
      medium: "Medium home",
      large: "Large home",
    }[input.homeSize];
    breakdown.push({ label: "Base clean", detail: sizeLabel });
  }

  // 2. Floors.
  const floorMult = FLOOR_MULT[input.floors];
  if (floorMult > 1) {
    low *= floorMult;
    high *= floorMult;
    breakdown.push({
      label: "Height & access",
      detail: `${input.floors} stories (+${Math.round((floorMult - 1) * 100)}%)`,
    });
  }

  // 3. Large windows / tricky access.
  const lwMult = LARGE_WINDOW_MULT[input.largeWindows];
  if (lwMult > 1) {
    low *= lwMult;
    high *= lwMult;
    breakdown.push({
      label: "Large glass / doors",
      detail: `+${Math.round((lwMult - 1) * 100)}%`,
    });
  }

  // 4. Interior + exterior.
  if (input.cleaning === "both") {
    low *= INTERIOR_MULT;
    high *= INTERIOR_MULT;
    breakdown.push({
      label: "Inside + outside",
      detail: `+${Math.round((INTERIOR_MULT - 1) * 100)}%`,
    });
  } else {
    breakdown.push({ label: "Exterior only", detail: "Included" });
  }

  // 5. Flat add-ons.
  if (input.screens) {
    low += ADDON_SCREENS;
    high += ADDON_SCREENS;
    breakdown.push({ label: "Screen cleaning", detail: `+$${ADDON_SCREENS}` });
  }
  if (input.tracks) {
    low += ADDON_TRACKS;
    high += ADDON_TRACKS;
    breakdown.push({ label: "Track & frame wipe", detail: `+$${ADDON_TRACKS}` });
  }
  if (input.skylights) {
    low += ADDON_SKYLIGHTS;
    high += ADDON_SKYLIGHTS;
    breakdown.push({ label: "Skylights", detail: `+$${ADDON_SKYLIGHTS}` });
  }

  low = round5(low);
  high = round5(high);
  const midpoint = round5((low + high) / 2);

  // Confidence: photos and/or a manual count tighten the estimate.
  const confidence: QuoteResult["confidence"] =
    input.hasPhotos || (input.windowCount ?? 0) > 0 ? "high" : "preliminary";

  return {
    low,
    high,
    midpoint,
    currency: "CAD",
    confidence,
    breakdown,
  };
}

export function formatCAD(n: number): string {
  return `$${n.toLocaleString("en-CA")}`;
}
