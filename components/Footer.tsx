'use client';

import Image from 'next/image';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { BsTelephoneFill } from 'react-icons/bs';

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
              <FaFacebookF/>
              <FaInstagram />
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold mb-3 text-white">QUICK LINKS</h4>
            <ul className="flex flex-wrap gap-4">
              <li>Home</li>
              <li>About Us</li>
              <li>Packages</li>
              <li>FAQ</li>
              <li>Contact Us</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-3 text-white">CONTACT US</h4>
            <div className="flex items-center gap-2 mb-2 text-sm">
              <BsTelephoneFill className="text-white flex-shrink-0" />
              <span className="break-all">+94 77 349 1157</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MdEmail className="text-white text-xl flex-shrink-0" />
              <span className="break-all">famoustoursandtravels@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
