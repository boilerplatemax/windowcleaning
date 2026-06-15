"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Address field with optional Google Places autocomplete.
 * If NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is set, we load the Places library and
 * attach an autocomplete widget. Otherwise we fall back to a plain text input
 * so the quote flow keeps working without any keys configured.
 */

declare global {
  interface Window {
    google?: typeof google;
    __stingrayMapsLoading?: Promise<void>;
  }
}

const KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

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

export function AddressInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [ready, setReady] = useState(false);

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
        setReady(true);
      })
      .catch(() => setReady(false));
    return () => {
      if (ac && window.google) window.google.maps.event.clearInstanceListeners(ac);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
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
          placeholder="Start typing your home address…"
          autoComplete="off"
          className="w-full rounded-lg border border-line bg-surface py-4 pl-12 pr-4 text-lg text-ink placeholder:text-ink/40 focus:border-ocean"
        />
      </div>
      <p className="mt-2 text-xs text-ink/55">
        {KEY && ready
          ? "Pick your address from the suggestions for the fastest quote."
          : "Enter your street address — we service Victoria & Greater Victoria."}
      </p>
    </div>
  );
}
