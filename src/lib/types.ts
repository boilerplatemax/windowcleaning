// Shared types for the quote flow.

export type PropertyType = "detached" | "townhouse" | "condo";
export type Floors = "1" | "2" | "3+";
export type HomeSize = "small" | "medium" | "large";
export type LargeWindows = "yes" | "no" | "unsure";
export type Cleaning = "exterior" | "both";

export interface QuoteInput {
  address: string;
  propertyType: PropertyType;
  floors: Floors;
  homeSize: HomeSize;
  largeWindows: LargeWindows;
  cleaning: Cleaning;
  // add-ons
  screens: boolean;
  tracks: boolean;
  skylights: boolean;
  // optional manual override
  windowCount?: number | null;
  hasPhotos?: boolean;
}

export interface QuoteBreakdownLine {
  label: string;
  detail: string;
}

export interface QuoteResult {
  low: number;
  high: number;
  midpoint: number;
  currency: string;
  confidence: "high" | "preliminary";
  breakdown: QuoteBreakdownLine[];
}

export interface QuoteContact {
  name: string;
  phone: string;
  email?: string;
  notes?: string;
}
