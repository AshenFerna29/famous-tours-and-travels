"use client";

import Image from "next/image";

export default function MissionVision() {
  return (
    <section className="px-6 md:px-40 py-20">
      {/* max width keeps it centered; the 12-col grid gives us precise placement */}
      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-20 items-center">
        {/* ========== TOP-RIGHT IMAGE ========== */}
        <div className="md:col-start-8 md:col-span-5 md:row-start-1">
          {/* IMPORTANT: use a relative wrapper + fill + aspect to avoid tiny images */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="/images/mission-1.jpg"
              alt="Airplane window"
              fill /* makes it use the wrapper size */
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* ========== MISSION TEXT (CENTER-LEFT) ========== */}
        <div className="md:col-start-2 md:col-span-6 md:row-start-1 flex justify-center md:justify-start">
          <div className="max-w-[460px] text-center md:text-left">
            <p className="text-[15px] tracking-[0.2em] uppercase mb-2 text-[#fda720]">
              Our Mission
            </p>
            <p className="italic text-[16px] md:text-[25px] leading-8 text-neutral-800">
              &ldquo;Through travel, we connect people to positive experiences,
              enabling them to see the world differently.&rdquo;
            </p>
          </div>
        </div>

        {/* ========== BOTTOM-LEFT IMAGE ========== */}
        <div className="md:col-start-2 md:col-span-5 md:row-start-2">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="/images/mission-2.jpg"
              alt="Friends at market"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* ========== VISION TEXT (CENTER-RIGHT) ========== */}
        <div className="md:col-start-8 md:col-span-5 md:row-start-2 flex justify-center md:justify-start">
          <div className="max-w-[460px] text-center md:text-left">
            <p className="text-[15px] tracking-[0.2em] uppercase mb-2 text-[#fda720]">
              Our Vision
            </p>
            <p className="italic text-[16px] md:text-[25px] leading-8 text-neutral-800">
              &ldquo;To create a world where everyone is encouraged to
              travel.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
