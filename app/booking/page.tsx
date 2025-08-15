"use client";

import Navbar from "@/components/Navbar";
import Image from "next/image";
import Footer from "@/components/Footer";
import Form from "@/components/TourBookingForm";

import Breadcrumb from "@/components/Breadcrumb";
import heroImage from "@/public/images/booking.jpg";

export default function AboutUsPage() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="relative w-full h-[70vh] overflow-hidden">
        <Image
          src={heroImage}
          alt="mountains"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-8xl leading-tight font-black text-white text-center">
            Bookings
          </h1>
        </div>
      </div>

      {/* Breadcrumb */}
      <Breadcrumb
        items={[{ label: "Home", href: "/home" }, { label: "Bookings" }]}
      />

      {/* Content Section */}
      <div className="px-6 md:px-40 py-12 space-y-12">
        <section>
          <h2 className="text-3xl font-bold text-[#fda720] ">Bookings</h2>
          <p className="text-gray-700 leading-relaxed text-justify pt-5">
            Secure your spot on one of our unforgettable tours across Sri Lanka.
            Choose your preferred package, travel dates, and group size and
            leave the rest to us! Hassle-free booking, flexible options, and
            instant confirmation.
          </p>
        </section>
      </div>

      <Form />

      <Footer />
    </>
  );
}
