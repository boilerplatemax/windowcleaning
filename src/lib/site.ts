// Central business / brand configuration for Wise Guys Windows.
// Update these values in one place and the whole site follows.

export const site = {
  name: "Wise Guys Windows",
  shortName: "Wise Guys",
  tagline: "Dirty Windows? Forget about it.",
  description:
    "Wise Guys Windows is Victoria BC's residential window cleaning crew. Streak-free shine, honest pricing, and an instant online quote in under 60 seconds.",
  url: "https://wiseguyswindows.ca",
  phone: "416-579-3253",
  phoneHref: "tel:+14165793253",
  email: "mshapovalov7@gmail.com",
  emailHref: "mailto:mshapovalov7@gmail.com",
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
