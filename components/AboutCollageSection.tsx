"use client";

import Image from "next/image";

type Img = { src: string; alt?: string };

type Props = {
  label: string; // small orange label (e.g., ABOUT US)
  titleItalic?: string; // optional italic title (e.g., Intan)
  paragraphs: string[]; // content paragraphs
  images: Img[]; // exactly 5 images
};

export default function AboutCollageSection({
  label,
  titleItalic,
  paragraphs,
  images,
}: Props) {
  // guard against missing images
  const safe = (i: number) =>
    images[i] || { src: "/images/placeholder.png", alt: "" };

  return (
    <section className="px-6 md:px-40 py-16 md:py-20">
      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
        {/* LEFT: Text */}
        <div className="md:col-span-7">
          <p className="text-[13px] md:text-[14px] tracking-[0.18em] uppercase text-[#fda720] font-semibold">
            {label}
          </p>

          {titleItalic && (
            <div className="flex items-center gap-4 mt-1 mb-4">
              <p className="italic text-2xl md:text-[28px] font-medium">
                {titleItalic}
              </p>
              <span className="h-px flex-1 bg-gray-300" />
            </div>
          )}

          <div className="space-y-4 text-[15px] leading-7 text-neutral-800">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        {/* RIGHT: Photo collage (compact) */}
        <div className="md:col-span-5">
          <div className="grid grid-cols-2 gap-4 content-start max-w-[520px] ml-auto">
            {/* Row 1: two small landscapes */}
            <div className="relative h-32 md:h-36 overflow-hidden rounded-xl shadow-md">
              <Image
                fill
                src={safe(0).src}
                alt={safe(0).alt || ""}
                className="object-cover"
              />
            </div>
            <div className="relative h-32 md:h-36 overflow-hidden rounded-xl shadow-md">
              <Image
                fill
                src={safe(1).src}
                alt={safe(1).alt || ""}
                className="object-cover"
              />
            </div>

            {/* Row 2: one taller portrait + one small landscape */}
            <div className="relative h-44 md:h-56 overflow-hidden rounded-xl shadow-md">
              <Image
                fill
                src={safe(2).src}
                alt={safe(2).alt || ""}
                className="object-cover"
              />
            </div>
            <div className="relative h-32 md:h-36 overflow-hidden rounded-xl shadow-md">
              <Image
                fill
                src={safe(3).src}
                alt={safe(3).alt || ""}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
