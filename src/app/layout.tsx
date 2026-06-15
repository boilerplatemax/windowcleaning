import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { photo } from "@/lib/photos";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const ogImage = photo(
  "home-hero",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
);

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Window Cleaning in ${site.serviceArea}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "window cleaning Victoria BC",
    "residential window cleaning",
    "window washing Victoria",
    "Greater Victoria window cleaners",
    "gutter cleaning",
    "window cleaning quote",
    "Stingray Cleaning",
  ],
  authors: [{ name: site.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Sparkling clean windows by Stingray Cleaning",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.name,
  image: ogImage,
  description: site.description,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  priceRange: "$$",
  areaServed: site.serviceArea,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Victoria",
    addressRegion: "BC",
    addressCountry: "CA",
  },
  openingHours: "Mo-Sa 08:00-18:00",
  sameAs: [site.social.instagram, site.social.facebook],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const logoSrc = photo("logo-landscape", "") || undefined;
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header logoSrc={logoSrc} />
        <main className="flex-1">{children}</main>
        <Footer logoSrc={logoSrc} />
      </body>
    </html>
  );
}
