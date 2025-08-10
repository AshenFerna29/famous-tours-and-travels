"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import heroImage from "@/public/images/contact-us.jpg";

export default function ContactUsPage() {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <div className="bg-white">
        {/* Hero Section */}
        <div className="relative w-full h-[70vh] overflow-hidden">
          <Image
            src={heroImage}
            alt="tress"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-8xl font-black text-white text-center">
              Contact Us
            </h1>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="px-6 md:px-40 mt-10 text-sm text-gray-500">
          <button
            onClick={() => router.push("/home")}
            className="hover:text-[#fda720] transition-colors duration-200 cursor-pointer"
          >
            Home
          </button>
          {" > "}
          <span className="text-black">Contact Us</span>
        </div>

        {/* Info Section */}
        <div className="px-6 md:px-40 py-12 space-y-12">
          <section>
            <h2 className="text-3xl font-bold text-[#fda720] ">Contact Us</h2>
            <p className="text-gray-700 leading-relaxed text-justify pt-5">
              Reach out via phone, email, or visit our travel agency or operator
              offices. Whether you need a quote, consultation, or just have
              questions, we’re here to help you plan the perfect journey through
              Sri Lanka’s scenic highlands.
            </p>
          </section>
        </div>
        <div className="px-6 md:px-20 pt-16 pb-12">
          <div className="grid md:grid-cols-3 gap-12 text-center justify-center items-start">
            {/* Location */}
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="bg-sky-400 text-white p-3 rounded-full">
                  <FaMapMarkerAlt className="text-xl" />
                </div>
                <h4 className="text-lg font-bold">Location</h4>
              </div>
              <p className="text-sm font-semibold text-black">Travel Agency</p>
              <p className="text-sm text-gray-500 mt-1">
                330/20, Prison Camp Road,
                <br />
                Dalupotha, Sri Lanka.
              </p>
            </div>

            {/* Phone */}
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="bg-sky-400 text-white p-3 rounded-full">
                  <FaPhoneAlt className="text-xl" />
                </div>
                <h4 className="text-lg font-bold">Give us a call</h4>
              </div>
              <p className="text-sm font-semibold text-black">Mobile Number</p>
              <p className="text-sm text-gray-500 mt-1">+94 77 349 9157</p>
            </div>

            {/* Email */}
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="bg-sky-400 text-white p-3 rounded-full">
                  <FaEnvelope className="text-xl" />
                </div>
                <h4 className="text-lg font-bold">Write for anything</h4>
              </div>
              <p className="text-sm font-semibold text-black">Quotes</p>
              <p className="text-sm text-gray-500 mt-1">
                Write to this email for a detailed quotation <br />
                <a
                  href="mailto:famoustoursandtravels@gmail.com"
                  className="text-blue-500 underline"
                >
                  famoustoursandtravels@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-gray-50 px-6 md:px-20 py-20">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl text-sky-600 font-medium mb-1">
                Plan your Next Trip
              </h3>
              <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
              <p className="text-sm text-gray-500 mb-6">
                Write to us for personalized travel advice or for information on
                group travel and last-minute travel. All travel is insured and
                safe.
              </p>
              <ContactForm />
            </div>
            <div className="w-full h-full">
              <Image
                src="/images/contact-form.jpg"
                alt="Sri Lanka"
                width={500}
                height={500}
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
