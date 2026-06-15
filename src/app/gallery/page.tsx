import type { Metadata } from "next";
import Image from "next/image";
import { Button, Container, Eyebrow, SectionHeading } from "@/components/ui";
import { photo } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "See the spotless results from Stingray Cleaning — professional residential window cleaning across Greater Victoria, BC.",
  alternates: { canonical: "/gallery" },
};

const featured = {
  src: photo(
    "gallery-featured",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=2000&q=80",
  ),
  alt: "Sunlit modern home with crystal-clear floor-to-ceiling windows",
  caption: "Floor-to-ceiling glass, perfectly clear — Oak Bay",
};

// Before / after shots. Drop files named before-after-1 … before-after-5 into
// public/photos to replace these placeholders.
const beforeAfter: { src: string; alt: string }[] = [
  {
    src: photo(
      "before-after-1",
      "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=1200&q=80",
    ),
    alt: "Before and after window cleaning result",
  },
  {
    src: photo(
      "before-after-2",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80",
    ),
    alt: "Before and after window cleaning result",
  },
  {
    src: photo(
      "before-after-3",
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&q=80",
    ),
    alt: "Before and after window cleaning result",
  },
  {
    src: photo(
      "before-after-4",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&q=80",
    ),
    alt: "Before and after window cleaning result",
  },
  {
    src: photo(
      "before-after-5",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=1200&q=80",
    ),
    alt: "Before and after window cleaning result",
  },
];

// General gallery grid. Add files gallery-1 … gallery-8 to public/photos.
const galleryFallbacks = [
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1000&q=80",
  "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=1000&q=80",
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1000&q=80",
  "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1000&q=80",
  "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=1000&q=80",
  "https://images.unsplash.com/photo-1581578017093-cd30fce4eeb7?w=1000&q=80",
  "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1000&q=80",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1000&q=80",
];

const photos = galleryFallbacks.map((fallback, i) => ({
  src: photo(`gallery-${i + 1}`, fallback),
  alt: "Spotless windows by Stingray Cleaning",
}));

export default function GalleryPage() {
  return (
    <>
      <section className="border-b border-line bg-surface-2 py-16 sm:py-24">
        <Container className="text-center">
          <Eyebrow>The gallery</Eyebrow>
          <h1 className="display mt-3 text-4xl font-bold text-ink sm:text-6xl">
            Our handiwork
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-ink/75">
            A few coastal homes we&apos;ve made shine. Streak-free glass, edge to
            edge — yours could be next.
          </p>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          {/* Featured shot */}
          <figure className="group relative mb-12 overflow-hidden rounded-3xl border border-line shadow-luxe">
            <div className="relative h-[42vh] min-h-72 w-full sm:h-[58vh]">
              <Image
                src={featured.src}
                alt={featured.alt}
                fill
                priority
                sizes="100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" />
            </div>
            <figcaption className="absolute bottom-0 left-0 p-6 text-cream sm:p-8">
              <span className="eyebrow text-xs text-ocean-soft">Featured</span>
              <p className="display mt-1 text-xl font-semibold sm:text-2xl">
                {featured.caption}
              </p>
            </figcaption>
          </figure>

          {/* Before & after */}
          <SectionHeading
            align="left"
            eyebrow="Before & after"
            title="See the difference"
            subtitle="Real homes, real results — the grime goes, the view comes back."
          />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {beforeAfter.map((p, i) => (
              <figure
                key={i}
                className="group relative overflow-hidden rounded-2xl border border-line shadow-card"
              >
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </figure>
            ))}
          </div>

          {/* Gallery grid */}
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((p, i) => (
              <figure
                key={i}
                className="group relative overflow-hidden rounded-2xl border border-line shadow-card"
              >
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </figure>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Button href="/quote" size="lg">
              Get Your Windows Looking Like This
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
