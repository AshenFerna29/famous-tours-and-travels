"use client";

import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BsTelephoneFill } from "react-icons/bs";

export default function Footer() {
  return (
    <footer className="relative w-full h-[380px] mt-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/footer.png"
          alt="Footer Background"
          fill
          sizes="100vw"
          className="object-cover"
        />
        {/* White top gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 md:px-20 py-10 flex flex-col gap-6 text-white max-w-full">
        {/* Horizontal Line */}
        <div className="w-full border-t-3 border-white mb-6 mt-40" />

        {/* Grid Content */}
        <div className="grid md:grid-cols-3 gap-6 text-sm md:text-base">
          {/* Social */}
          <div>
            <h4 className="font-bold mb-3 text-white">CONNECT WITH US</h4>
            <div className="flex space-x-4 text-lg ">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#fda720] transition-colors"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#fda720] transition-colors"
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold mb-3 text-white">QUICK LINKS</h4>
            <ul className="flex flex-wrap gap-4">
              <li>
                <Link
                  href="/home"
                  className="hover:text-[#fda720] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us"
                  className="hover:text-[#fda720] transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/booking"
                  className="hover:text-[#fda720] transition-colors"
                >
                  Packages
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-[#fda720] transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="hover:text-[#fda720] transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-3 text-white">CONTACT US</h4>
            <div className="flex items-center gap-2 mb-2 text-sm">
              <BsTelephoneFill className="text-white flex-shrink-0" />
              <a
                href="tel:+94773491157"
                className="hover:text-[#fda720] transition-colors"
              >
                +94 77 349 1157
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MdEmail className="text-white text-xl flex-shrink-0" />
              <a
                href="mailto:famoustoursandtravels@gmail.com"
                className="hover:text-[#fda720] transition-colors"
              >
                famoustoursandtravels@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
