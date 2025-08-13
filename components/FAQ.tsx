"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import heroImage from "@/public/images/faq.jpg";
import Breadcrumb from "@/components/Breadcrumb";

const faqData = [
  {
    id: 1,
    question: "What’s included in the tour?",
    answer:
      "All tours include transportation and a licensed guide. Meals and activity gear are also included depending on the tour package.",
  },
  {
    id: 2,
    question: "What should I bring?",
    answer:
      "Bring comfortable clothes, sunscreen, water, and any personal medication. For outdoor tours, good walking shoes are recommended.",
  },
  {
    id: 3,
    question: "Is accommodation included?",
    answer:
      "Yes, accommodation is included in multi-day tours. Day trips do not include overnight stays.",
  },
  {
    id: 4,
    question: "Can I cancel my bookings?",
    answer:
      "Yes, cancellations are allowed with notice. A small fee may apply depending on how close to the tour date you cancel.",
  },
  {
    id: 5,
    question: "Are your guides licensed?",
    answer:
      "Yes, all our guides are professionally licensed. They are trained to offer safe, informative and engaging experiences.",
  },
];

export default function FAQ() {
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First FAQ open

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <main className="bg-white text-gray-800 relative z-0">
      {/* Hero Section */}
      <div className="relative w-full h-[70vh] overflow-hidden z-0">
        <Image
          src={heroImage}
          alt="tress"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <h1 className="text-4xl md:text-8xl font-black text-white text-center leading-tight">
            FAQ.
          </h1>
        </div>
      </div>

      {/* Breadcrumb */}
      <Breadcrumb
                  items={[
                    { label: "Home", href: "/home" },
                    { label: "FAQ" },
                  ]}
                />
      
      <div className="px-6 md:px-40 py-12 space-y-12">
        <section>
          <h2 className="text-3xl font-bold text-[#fda720] ">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-700 leading-relaxed text-justify pt-5">
            Have questions about touring Sri Lanka? Here are some common queries
            and helpful answers to plan your perfect journey.
          </p>
        </section>
      </div>

      {/* FAQ Section */}
      <section className="py-1 px-6 md:px-20 z-30 relative">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqData.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={item.id}
                  className="bg-white shadow-md rounded-lg overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggle(index)}
                    className="w-full flex items-center justify-between px-6 py-9 text-left focus:outline-none"
                  >
                    <h4 className="text-base md:text-lg font-semibold text-black">
                      {item.question}
                    </h4>
                    {isOpen ? (
                      <FiChevronUp className="text-blue-500 w-5 h-5" />
                    ) : (
                      <FiChevronDown className="text-blue-500 w-5 h-5" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5">
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
