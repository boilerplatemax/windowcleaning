"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Address field with autocomplete.
 *
 * 1. If NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is set, we load Google Places and attach
 *    its autocomplete widget (best quality).
 * 2. Otherwise we fall back to a free, keyless autocomplete powered by Photon
 *    (OpenStreetMap data, CORS-friendly), biased to Greater Victoria and
 *    filtered to Canada. No API key, no billing — works out of the box.
 * 3. If both are unavailable (e.g. offline), it degrades to a plain text input.
 */

declare global {
  interface Window {
    google?: typeof google;
    __stingrayMapsLoading?: Promise<void>;
  }
}

const KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

// Victoria, BC — used to bias the keyless suggestions toward the service area.
const VICTORIA = { lat: 48.4284, lon: -123.3656 };

function loadMaps(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.google?.maps?.places) return Promise.resolve();
  if (window.__stingrayMapsLoading) return window.__stingrayMapsLoading;

  window.__stingrayMapsLoading = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Google Maps"));
    document.head.appendChild(script);
  });
  return window.__stingrayMapsLoading;
}

type PhotonProps = {
  name?: string;
  housenumber?: string;
  street?: string;
  city?: string;
  state?: string;
  postcode?: string;
  country?: string;
  countrycode?: string;
};

function formatPhoton(p: PhotonProps): string {
  const line1 = [p.housenumber, p.street || p.name].filter(Boolean).join(" ");
  return [line1 || p.name, p.city, p.state, p.postcode]
    .filter(Boolean)
    .join(", ");
}

export function AddressInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [googleReady, setGoogleReady] = useState(false);

  // Keyless fallback state.
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const skipNextFetch = useRef(false);

  // --- Google Places (only when a key is configured) ---
  useEffect(() => {
    if (!KEY || !inputRef.current) return;
    let ac: google.maps.places.Autocomplete | undefined;
    loadMaps()
      .then(() => {
        if (!inputRef.current || !window.google) return;
        ac = new window.google.maps.places.Autocomplete(inputRef.current, {
          types: ["address"],
          componentRestrictions: { country: "ca" },
          fields: ["formatted_address"],
        });
        ac.addListener("place_changed", () => {
          const place = ac?.getPlace();
          if (place?.formatted_address) onChange(place.formatted_address);
        });
        setGoogleReady(true);
      })
      .catch(() => setGoogleReady(false));
    return () => {
      if (ac && window.google)
        window.google.maps.event.clearInstanceListeners(ac);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Keyless Photon autocomplete (only when there's no Google key) ---
  useEffect(() => {
    if (KEY) return;
    if (skipNextFetch.current) {
      skipNextFetch.current = false;
      return;
    }
    const q = value.trim();
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      if (q.length < 4) {
        setSuggestions([]);
        setOpen(false);
        return;
      }
      try {
        const url =
          `https://photon.komoot.io/api/?q=${encodeURIComponent(q)}` +
          `&limit=5&lang=en&lat=${VICTORIA.lat}&lon=${VICTORIA.lon}`;
        const res = await fetch(url, { signal: controller.signal });
        const data: { features?: { properties: PhotonProps }[] } =
          await res.json();
        const list = (data.features ?? [])
          .map((f) => f.properties)
          .filter((p) => p.country === "Canada" || p.countrycode === "CA")
          .map(formatPhoton)
          .filter((s, i, arr) => s && arr.indexOf(s) === i);
        setSuggestions(list);
        setOpen(list.length > 0);
        setActiveIdx(-1);
      } catch {
        // Network hiccup / aborted — quietly keep the plain input usable.
      }
    }, 250);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [value]);

  const pick = (s: string) => {
    skipNextFetch.current = true;
    onChange(s);
    setSuggestions([]);
    setOpen(false);
    setActiveIdx(-1);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => (i + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
    } else if (e.key === "Enter" && activeIdx >= 0) {
      e.preventDefault();
      pick(suggestions[activeIdx]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const showList = !KEY && open && suggestions.length > 0;

  return (
    <div className="relative">
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ocean-deep">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
            <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
          </svg>
        </span>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          onFocus={() => suggestions.length > 0 && setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder="Start typing your home address…"
          autoComplete="off"
          role="combobox"
          aria-expanded={showList}
          aria-controls="address-suggestions"
          aria-autocomplete="list"
          className="w-full rounded-lg border border-line bg-surface py-4 pl-12 pr-4 text-lg text-ink placeholder:text-ink/40 focus:border-ocean"
        />

        {showList && (
          <ul
            id="address-suggestions"
            role="listbox"
            className="absolute left-0 right-0 top-full z-20 mt-1 overflow-hidden rounded-lg border border-line bg-surface shadow-luxe"
          >
            {suggestions.map((s, i) => (
              <li key={s}>
                <button
                  type="button"
                  // onMouseDown fires before the input's onBlur, so the pick
                  // registers before the dropdown closes.
                  onMouseDown={(e) => {
                    e.preventDefault();
                    pick(s);
                  }}
                  className={`flex w-full items-start gap-2 px-4 py-3 text-left text-sm ${
                    i === activeIdx
                      ? "bg-ocean/10 text-ocean-deep"
                      : "text-ink/80 hover:bg-surface-2"
                  }`}
                >
                  <span className="mt-0.5 text-ocean-deep">📍</span>
                  <span>{s}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <p className="mt-2 text-xs text-ink/55">
        {KEY && googleReady
          ? "Pick your address from the suggestions for the fastest quote."
          : "Start typing and pick your address from the suggestions — we service Victoria & Greater Victoria."}
      </p>
    </div>
  );
}
