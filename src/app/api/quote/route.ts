import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { sendQuoteEmail } from "@/lib/email";
import { calculateQuote } from "@/lib/pricing";
import type { QuoteInput, QuoteContact } from "@/lib/types";

export const runtime = "nodejs";

interface QuoteBody {
  input: QuoteInput;
  contact: QuoteContact;
  photoCount?: number;
}

export async function POST(req: Request) {
  let body: QuoteBody;
  try {
    body = (await req.json()) as QuoteBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { input, contact } = body;

  // Minimal validation — we still want to capture partial leads.
  if (!contact?.name || !contact?.phone) {
    return NextResponse.json(
      { error: "Name and phone are required." },
      { status: 400 },
    );
  }

  // Recompute the price server-side so we never trust client math.
  const result = calculateQuote(input);
  const photoCount = body.photoCount ?? 0;

  // 1. Persist the lead to Supabase (CRM). Non-fatal if not configured.
  const supabase = getSupabaseAdmin();
  if (supabase) {
    const { error } = await supabase.from("quotes").insert({
      name: contact.name,
      phone: contact.phone,
      email: contact.email || null,
      notes: contact.notes || null,
      address: input.address,
      property_type: input.propertyType,
      floors: input.floors,
      home_size: input.homeSize,
      large_windows: input.largeWindows,
      cleaning: input.cleaning,
      addon_screens: input.screens,
      addon_tracks: input.tracks,
      addon_skylights: input.skylights,
      window_count: input.windowCount,
      photo_count: photoCount,
      price_low: result.low,
      price_high: result.high,
      price_mid: result.midpoint,
      confidence: result.confidence,
      raw_input: input,
    });
    if (error) console.error("Supabase insert error:", error.message);
  } else {
    console.warn("Supabase not configured — lead not persisted.");
  }

  // 2. Notify the business via SendGrid. Non-fatal if not configured.
  const emailSent = await sendQuoteEmail({ input, contact, result, photoCount });

  return NextResponse.json({
    ok: true,
    result,
    persisted: Boolean(supabase),
    emailSent,
  });
}
