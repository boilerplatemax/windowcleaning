import type { Metadata } from "next";
import Image from "next/image";
import { Button, Container, Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "See the spotless results from Wise Guys Windows — residential window cleaning across Greater Victoria, BC.",
  alternates: { canonical: "/gallery" },
};

const photos = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
  "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800&q=80",
  "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&q=80",
  "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=80",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
  "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
  "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80",
];

export default function GalleryPage() {
  return (
    <>
      <section className="border-b border-line bg-surface-2 py-16 sm:py-24">
        <Container className="text-center">
          <Eyebrow>The portfolio</Eyebrow>
          <h1 className="display mt-3 text-4xl font-bold text-ink sm:text-6xl">
            Our handiwork
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-ink/70">
            A few homes we&apos;ve made shine. Yours could be next.
          </p>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
            {photos.map((src, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-xl border border-line shadow-luxe"
              >
                <Image
                  src={src}
                  alt={`Window cleaning result ${i + 1}`}
                  width={800}
                  height={600}
                  className="h-auto w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
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
