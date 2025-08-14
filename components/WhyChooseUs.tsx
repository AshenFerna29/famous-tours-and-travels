"use client";

import { FaTicketAlt, FaHeart, FaGem, FaRegClock } from "react-icons/fa";
import ScrollStack, { ScrollStackItem } from "./ScrollStack";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <FaTicketAlt size={22} className="text-[#fda720]" />,
      title: "Ultimate flexibility",
      desc: "You're in control, with free cancellation and payment options to satisfy any plan or budget.",
    },
    {
      icon: <FaHeart size={22} className="text-[#fda720]" />,
      title: "Memorable experiences",
      desc: "Browse and book tours and activities so incredible, you'll want to tell your friends.",
    },
    {
      icon: <FaGem size={22} className="text-[#fda720]" />,
      title: "Quality at our core",
      desc: "Exceptional experiences. Trusted by travelers. Your journey starts with us.",
    },
    {
      icon: <FaRegClock size={22} className="text-[#fda720]" />,
      title: "24/7 support",
      desc: "New price? New plan? No problem. We’re here to help, 24/7.",
    },
  ];

  return (
    <section className="bg-gray-50 py-24 px-6 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Left: heading + description */}
        <div className="sticky top-20 self-start">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#fda720]/10 text-[#fda720] ring-1 ring-[#fda720]/20">
            Trusted by travelers
          </span>

          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
            <span className="bg-gradient-to-r from-[#fda720] to-[#ffcc66] bg-clip-text text-transparent drop-shadow-[0_6px_24px_rgba(253,167,32,0.35)]">
              Why Choose Us ?
            </span>
            <span className="text-slate-900"></span>
          </h2>

          <div className="mt-4 h-1 w-16 rounded-full bg-[#fda720]" />

          <p className="mt-6 text-[17px] leading-8 text-slate-600 max-w-md">
            With over a decade of experience, we’re committed to providing
            exceptional service and unforgettable experiences in beautiful Sri Lanka.
          </p>
        </div>

        {/* Right: scroll stack — lifted up to align with the heading */}
        <div className="-mt-6 md:-mt-10 h-[78vh]">
          <ScrollStack topPadding="6vh" stackPosition="16%">
            {features.map((item, index) => (
              <ScrollStackItem key={index}>
                <div className="flex flex-col items-center text-center">
                  {/* Round gradient badge */}
                  <div className="mb-4 inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-[#ffe3b0] via-[#ffd58a] to-[#fda720]/70 ring-1 ring-[#fda720]/30 shadow-[0_10px_30px_rgba(253,167,32,0.35)]">
                    {item.icon}
                  </div>

                  <h3 className="font-semibold text-lg text-slate-900 mb-1">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-500 max-w-xs">
                    {item.desc}
                  </p>

                  {/* subtle bottom glow */}
                  <div className="pointer-events-none absolute inset-x-10 -bottom-6 h-10 blur-2xl bg-gradient-to-r from-transparent via-[#fda720]/20 to-transparent" />
                </div>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>
      </div>
    </section>
  );
}
