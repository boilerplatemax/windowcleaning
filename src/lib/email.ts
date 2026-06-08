import sgMail from "@sendgrid/mail";
import { site } from "./site";
import { formatCAD } from "./pricing";
import type { QuoteInput, QuoteContact, QuoteResult } from "./types";

/**
 * Sends the lead-notification email to the business via SendGrid.
 * No-ops (returns false) when SENDGRID_API_KEY is not configured.
 */
export async function sendQuoteEmail(payload: {
  input: QuoteInput;
  contact: QuoteContact;
  result: QuoteResult;
  photoCount: number;
}): Promise<boolean> {
  const apiKey = process.env.SENDGRID_API_KEY;
  const to = process.env.QUOTE_NOTIFICATION_EMAIL || site.email;
  const from = process.env.SENDGRID_FROM_EMAIL || site.email;

  if (!apiKey) return false;
  sgMail.setApiKey(apiKey);

  const { input, contact, result } = payload;

  const rows = [
    ["Name", contact.name],
    ["Phone", contact.phone],
    ["Email", contact.email || "—"],
    ["Address", input.address],
    ["Property", input.propertyType],
    ["Floors", input.floors],
    ["Home size", input.homeSize],
    ["Window count", input.windowCount ? String(input.windowCount) : "n/a"],
    ["Large windows", input.largeWindows],
    ["Cleaning", input.cleaning === "both" ? "Interior + Exterior" : "Exterior"],
    [
      "Add-ons",
      [
        input.screens && "Screens",
        input.tracks && "Tracks/Frames",
        input.skylights && "Skylights",
      ]
        .filter(Boolean)
        .join(", ") || "None",
    ],
    ["Photos uploaded", String(payload.photoCount)],
    ["Confidence", result.confidence],
    ["Notes", contact.notes || "—"],
  ];

  const tableRows = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px;color:#a9842a;font-weight:600;white-space:nowrap;">${k}</td><td style="padding:6px 12px;">${v}</td></tr>`,
    )
    .join("");

  const html = `
  <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;background:#141418;color:#f6f1e4;border-radius:12px;overflow:hidden;border:1px solid #2a2a32;">
    <div style="background:#d4af37;color:#0b0b0d;padding:20px;text-align:center;">
      <h1 style="margin:0;font-size:20px;">🕴️ New Quote Request</h1>
      <p style="margin:6px 0 0;font-size:14px;">${site.name}</p>
    </div>
    <div style="padding:24px;text-align:center;">
      <p style="margin:0;color:#d4af37;letter-spacing:2px;font-size:12px;">ESTIMATED PRICE</p>
      <p style="margin:6px 0;font-size:28px;font-weight:bold;">
        ${formatCAD(result.low)} – ${formatCAD(result.high)}
      </p>
      <p style="margin:0;color:#a9842a;">Recommended ~${formatCAD(result.midpoint)} CAD</p>
    </div>
    <table style="width:100%;border-collapse:collapse;font-size:14px;border-top:1px solid #2a2a32;">
      ${tableRows}
    </table>
    <div style="padding:16px;text-align:center;font-size:12px;color:#888;">
      Sent automatically from the wiseguyswindows.ca quote tool.
    </div>
  </div>`;

  try {
    await sgMail.send({
      to,
      from,
      replyTo: contact.email || undefined,
      subject: `New Quote: ${contact.name} — ${formatCAD(result.midpoint)} (${input.address})`,
      html,
    });
    return true;
  } catch (err) {
    console.error("SendGrid error:", err);
    return false;
  }
}
