"use client";

import Image from "next/image";
import ScrollVelocity from "@/components/ScrollVelocity";

export default function VelocityMarqueeSection() {
  const velocity = 110; // tweak 80–150 as you like

  return (
    <section className="relative py-10 md:py-16 overflow-hidden">
      {/* subtle divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent mb-6 md:mb-10" />

      <ScrollVelocity
        texts={[
          // ✅ Logo + brand as a single React node (repeats seamlessly)
          <span key="brand" className="inline-flex items-center gap-3 align-middle">
            <Image
              src="/images/logo.png"          // put your logo at public/images/logo.png
              alt="Famouse Tours & Travels"
              width={160}
              height={160}
              className="inline-block h-[2em] w-auto object-contain align-middle" // scales with text size
              priority
            />
            <span> Famouse Tours & Travels </span>
          </span>,

          // Second line: quote (kept as plain text; strings are also ReactNodes)
          " Travel Beyond the Expectation ",
        ]}
        velocity={velocity}
        className="px-4 md:px-8 uppercase tracking-[0.2em] text-[22px] md:text-[40px] font-semibold select-none"
        parallaxClassName="w-full"
        scrollerClassName="text-neutral-900 dark:text-neutral-100"
      />

      {/* soft fade at bottom (optional) */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-transparent to-neutral-50 dark:to-neutral-900" />
    </section>
  );
}
