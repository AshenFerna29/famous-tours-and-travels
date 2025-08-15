"use client";

import Image from "next/image";
import ScrollVelocity from "@/components/ScrollVelocity";

export default function VelocityMarqueeSection() {
  const velocity = 110; // 80–150 feels good

  return (
    <section className="relative py-8 md:py-12 overflow-hidden">
      {/* divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent mb-4 md:mb-6" />

      <ScrollVelocity
        texts={[
          // Line 1: logo + brand (repeats seamlessly)
          <span key="brand" className="inline-flex items-center gap-3 align-middle">
            <Image
              src="/images/logo.png"  // ensure this exists
              alt="Famouse Tours & Travels"
              width={128}
              height={128}
              className="inline-block h-[1em] w-auto object-contain align-middle"
              priority
            />
            <span> Famouse Tours &amp; Travels </span>
          </span>,

          // Line 2: quote
          <span key="quote"> Travel Beyond the Expectation </span>,
        ]}
        velocity={velocity}
        // ✅ Responsive text size + tight line-height so it never wraps or collides
        className="px-4 md:px-6 inline-flex items-center gap-3 uppercase tracking-[0.18em] text-[clamp(14px,3.8vw,36px)] leading-[1.1] font-semibold select-none"
        // add little vertical padding per line so rows don't touch
        parallaxClassName="w-full py-2 md:py-3"
        // just color; sizes are set above
        scrollerClassName="text-neutral-900 dark:text-neutral-100"
      />

      {/* optional soft fade */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-transparent to-neutral-50 dark:to-neutral-900" />
    </section>
  );
}
