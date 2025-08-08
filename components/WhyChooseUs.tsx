// components/WhyChooseUs.tsx
"use client";

import { FaTicketAlt, FaHeart, FaGem, FaRegClock } from "react-icons/fa";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <FaTicketAlt size={40} className="text-[#fda720] mb-4" />,
      title: "Ultimate flexibility",
      desc: "You're in control, with free cancellation and payment options to satisfy any plan or budget.",
    },
    {
      icon: <FaHeart size={40} className="text-[#fda720] mb-4" />,
      title: "Memorable experiences",
      desc: "Browse and book tours and activities so incredible, you'll want to tell your friends.",
    },
    {
      icon: <FaGem size={40} className="text-[#fda720] mb-4" />,
      title: "Quality at our core",
      desc: "Exceptional experiences. Trusted by travelers. Your journey starts with us.",
    },
    {
      icon: <FaRegClock size={40} className="text-[#fda720] mb-4" />,
      title: "24/7 support",
      desc: "New price? New plan? No problem. We’re here to help, 24/7.",
    },
  ];

  return (
    <section className="bg-gray-50 py-20 px-6 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-[#fda720] mb-4">
        Why Choose Us?
      </h2>
      <p className="text-gray-500 max-w-3xl mx-auto mb-12">
        With over a decade of experience, we&apos;re committed to providing
        exceptional service and unforgettable experiences in beautiful Sri
        Lanka.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
        {features.map((item, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            {item.icon}
            <h3 className="font-semibold text-md text-gray-900 mb-2">
              {item.title}
            </h3>
            <p className="text-sm text-gray-500 max-w-xs">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
