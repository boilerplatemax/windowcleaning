import { NextResponse } from "next/server";
import { sendQuoteEmail } from "@/lib/email";
import { calculateQuote } from "@/lib/pricing";
import type { QuoteInput, QuoteContact, PhotoAttachment } from "@/lib/types";

export const runtime = "nodejs";

interface QuoteBody {
  input: QuoteInput;
  contact: QuoteContact;
  photoCount?: number;
  photos?: PhotoAttachment[];
}

export async function POST(req: Request) {
  let body: QuoteBody;
  try {
    body = (await req.json()) as QuoteBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { input, contact } = body;

  // Name, phone and a valid email are required.
  const emailValid =
    !!contact?.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email.trim());
  if (!contact?.name || !contact?.phone || !emailValid) {
    return NextResponse.json(
      { error: "Name, phone and a valid email are required." },
      { status: 400 },
    );
  }

  // Recompute the price server-side so we never trust client math.
  const result = calculateQuote(input);
  const photos = Array.isArray(body.photos) ? body.photos : [];
  const photoCount = photos.length || body.photoCount || 0;

  // Notify the business via SendGrid, with the customer's photos attached.
  // Non-fatal if not configured.
  // (CRM lead persistence — e.g. Supabase — can be wired back in here later.)
  const emailSent = await sendQuoteEmail({
    input,
    contact,
    result,
    photoCount,
    photos,
  });

  return NextResponse.json({
    ok: true,
    result,
    emailSent,
  });
}
