// Central business / brand configuration for Stingray Cleaning.
// Update these values in one place and the whole site follows.

export const site = {
  name: "Stingray Cleaning",
  shortName: "Stingray",
  tagline: "Spotless windows. Stunning views.",
  description:
    "Stingray Cleaning delivers streak-free, professional residential window cleaning across Greater Victoria, BC. Honest pricing and an instant online quote in under 60 seconds.",
  url: "https://stingraycleaning.com",
  phone: "416-579-3253",
  phoneHref: "tel:+14165793253",
  email: "stingraywindows@gmail.com",
  emailHref: "mailto:stingraywindows@gmail.com",
  serviceArea: "Victoria, BC & Greater Victoria",
  currency: "CAD",
  hours: "Mon–Sat, 8am–6pm",
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
  },
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
] as const;
