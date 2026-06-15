// Resolves user-supplied photos that live in `public/photos`.
//
// Drop a file named e.g. `home-hero.jpg` (any image extension works) into
// `public/photos` and it automatically replaces the matching placeholder —
// no code changes needed. Until a real file is added we fall back to the
// provided placeholder URL so the site always renders.
//
// This only runs in Server Components / route handlers (it touches the
// filesystem), which is where every photo on the marketing pages is rendered.

import fs from "node:fs";
import path from "node:path";

const PHOTO_DIR = path.join(process.cwd(), "public", "photos");

let cache: Map<string, string> | null = null;

function index(): Map<string, string> {
  // Cache the directory listing in production; re-read every time in dev so
  // newly dropped-in files appear without a server restart.
  if (cache && process.env.NODE_ENV === "production") return cache;

  const map = new Map<string, string>();
  try {
    for (const file of fs.readdirSync(PHOTO_DIR)) {
      if (file.startsWith(".") || file.toLowerCase().endsWith(".md")) continue;
      const base = file.replace(/\.[^.]+$/, "").toLowerCase();
      if (!map.has(base)) map.set(base, `/photos/${file}`);
    }
  } catch {
    // Folder may not exist yet — that's fine, we'll use fallbacks.
  }
  cache = map;
  return map;
}

/**
 * Returns the public path for a user-supplied photo (`/photos/<file>`) if one
 * exists for `name`, otherwise the `fallback` (e.g. an Unsplash placeholder).
 */
export function photo(name: string, fallback: string): string {
  return index().get(name.toLowerCase()) ?? fallback;
}

/** True when the user has actually added a real photo for `name`. */
export function hasPhoto(name: string): boolean {
  return index().has(name.toLowerCase());
}
