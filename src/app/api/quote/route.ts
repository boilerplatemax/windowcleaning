import { NextResponse } from "next/server";
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

  // Notify the business via SendGrid. Non-fatal if not configured.
  // (CRM lead persistence — e.g. Supabase — can be wired back in here later.)
  const emailSent = await sendQuoteEmail({ input, contact, result, photoCount });

  return NextResponse.json({
    ok: true,
    result,
    emailSent,
  });
}
