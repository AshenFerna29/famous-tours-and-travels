// components/WhyChooseUs.tsx
"use client";

import { motion, useAnimation, Variants } from "framer-motion";
import { useEffect, useRef } from "react";
import {
  TicketCheck,
  HeartHandshake,
  Gem,
  Headphones,
} from "lucide-react";

type Feature = {
  icon: React.ElementType;
  title: string;
  desc: string;
};

const features: Feature[] = [
  { icon: TicketCheck, title: "Ultimate flexibility", desc: "You're in control, with free cancellation and payment options to satisfy any plan or budget." },
  { icon: HeartHandshake, title: "Memorable experiences", desc: "Browse and book tours and activities so incredible, you'll want to tell your friends." },
  { icon: Gem, title: "Quality at our core", desc: "Exceptional experiences. Trusted by travelers. Your journey starts with us." },
  { icon: Headphones, title: "24/7 support", desc: "New price? New plan? No problem. We’re here to help, around the clock." },
];

// Scroll-trigger helper (no extra libs)
function useInViewOnce<T extends HTMLElement>(offset = 0.2) {
  const ref = useRef<T | null>(null);
  const controls = useAnimation();

  useEffect(() => {
    if (!ref.current) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            controls.start("show");
            io.disconnect();
          }
        });
      },
      { threshold: offset }
    );

    io.observe(ref.current);
    return () => io.disconnect();
  }, [controls, offset]);

  return { ref, controls };
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.98, rotateX: -6 },
  show: {
    opacity: 1, y: 0, scale: 1, rotateX: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

export default function WhyChooseUs() {
  const { ref, controls } = useInViewOnce<HTMLDivElement>(0.15);

  return (
    <section className="relative isolate py-20 px-6">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mx-auto max-w-3xl text-center"
      >
        <hr />
        <br />
        <span className="inline-flex items-center gap-2 rounded-full border border-amber-200/70 bg-white px-3 py-1 text-xs font-semibold tracking-wide text-amber-700 shadow-sm">
          Why Choose Us
          <span className="h-1 w-1 rounded-full bg-[#fda720]" />
        </span>

        <h2 className="mt-4 text-3xl md:text-5xl font-extrabold leading-tight">
          Travel made <span className="text-[#fda720]">effortless & unforgettable</span>
        </h2>

        <p className="mt-4 text-sm md:text-base text-gray-600">
          With over a decade of expertise, we craft seamless trips and stunning memories across Sri Lanka.
        </p>
      </motion.div>

      {/* Features grid */}
      <motion.div
        ref={ref}
        variants={container}
        initial="hidden"
        animate={controls}
        className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {features.map(({ icon: Icon, title, desc }, i) => (
          <motion.article key={i} variants={item}>
            <div
              className="group relative h-full min-h-[220px] rounded-2xl border border-gray-200 bg-white p-6 shadow-sm ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-1.5 hover:border-[#fda720] hover:shadow-2xl"
            >
              {/* Icon badge */}
              <div className="relative mx-auto mb-6 h-16 w-16">
                <div className="absolute inset-0 rounded-full bg-[#fda720]/10 opacity-60 transition-opacity group-hover:opacity-80" />
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-black/5 transition-transform duration-500 group-hover:rotate-3 group-hover:scale-105">
                  <Icon className="h-7 w-7 text-[#fda720] transition-transform duration-500 group-hover:scale-110" aria-hidden />
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 text-balance">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{desc}</p>

              <div className="mt-6 h-0.5 w-0 bg-[#fda720] transition-all duration-500 group-hover:w-full" />
            </div>
          </motion.article>
        ))}
      </motion.div>

      {/* Trust bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 }}
        className="mx-auto mt-10 flex max-w-6xl items-center justify-center gap-3 text-xs text-gray-500"
      >
        <div className="h-px w-10 bg-gray-200" />
        Trusted by thousands of happy travelers
        <div className="h-px w-10 bg-gray-200" />
      </motion.div>
    </section>
  );
}
