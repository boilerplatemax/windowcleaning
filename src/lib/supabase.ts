import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client using the service-role key so we can insert
 * quote leads even with row-level security enabled. Never import this in
 * client components — the service role key must stay on the server.
 *
 * Returns null when env vars are missing so the quote flow degrades
 * gracefully (the customer still sees their price; we just log a warning).
 */
export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) return null;

  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
