import type { Metadata } from "next";
import Image from "next/image";
import { Button, Container, Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "See the spotless results from Orca Window Cleaning — professional residential window cleaning across Greater Victoria, BC.",
  alternates: { canonical: "/gallery" },
};

const featured = {
  src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=2000&q=80",
  alt: "Sunlit modern home with crystal-clear floor-to-ceiling windows",
  caption: "Floor-to-ceiling glass, perfectly clear — Oak Bay",
};

const photos: { src: string; alt: string; caption: string }[] = [
  {
    src: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1000&q=80",
    alt: "Bright living room with spotless windows",
    caption: "Morning light, no streaks",
  },
  {
    src: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=1000&q=80",
    alt: "Exterior window cleaning result",
    caption: "Exterior detail",
  },
  {
    src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1000&q=80",
    alt: "Crystal-clear interior windows",
    caption: "Interior shine",
  },
  {
    src: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1000&q=80",
    alt: "Modern glass home at dusk",
    caption: "Glass facade at dusk",
  },
  {
    src: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=1000&q=80",
    alt: "Contemporary home with large windows",
    caption: "Big windows, bigger views",
  },
  {
    src: "https://images.unsplash.com/photo-1581578017093-cd30fce4eeb7?w=1000&q=80",
    alt: "Professional window cleaner at work",
    caption: "The crew at work",
  },
  {
    src: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1000&q=80",
    alt: "Sunlit home interior with clean glass",
    caption: "Sunroom, spotless",
  },
  {
    src: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1000&q=80",
    alt: "Bright modern living space with clean windows",
    caption: "Clear all the way through",
  },
  {
    src: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1000&q=80",
    alt: "Cosy interior with sparkling windows",
    caption: "Cosy and clear",
  },
];

export default function GalleryPage() {
  return (
    <>
      <section className="border-b border-line bg-surface-2 py-16 sm:py-24">
        <Container className="text-center">
          <Eyebrow>The gallery</Eyebrow>
          <h1 className="display mt-3 text-4xl font-bold text-ink sm:text-6xl">
            Our handiwork
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-ink/70">
            A few coastal homes we&apos;ve made shine. Streak-free glass, edge to
            edge — yours could be next.
          </p>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          {/* Featured shot */}
          <figure className="group relative mb-6 overflow-hidden rounded-3xl border border-line shadow-luxe">
            <div className="relative h-[42vh] min-h-72 w-full sm:h-[58vh]">
              <Image
                src={featured.src}
                alt={featured.alt}
                fill
                priority
                sizes="100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            </div>
            <figcaption className="absolute bottom-0 left-0 p-6 text-cream sm:p-8">
              <span className="eyebrow text-xs text-ocean-soft">Featured</span>
              <p className="display mt-1 text-xl font-semibold sm:text-2xl">
                {featured.caption}
              </p>
            </figcaption>
          </figure>

          {/* Masonry grid */}
          <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
            {photos.map((p, i) => (
              <figure
                key={i}
                className="group relative overflow-hidden rounded-2xl border border-line shadow-card"
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  width={1000}
                  height={750}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <figcaption className="absolute bottom-0 left-0 p-4 text-sm font-medium text-cream opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {p.caption}
                </figcaption>
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
