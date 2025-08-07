'use client';
import Image from 'next/image';

import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from 'react';

export default function WelcomeSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="bg-white py-20 px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center overflow-hidden">
      <div>
        <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
          Welcome to <span className="text-[#52ACE4]"><br />Famous Tours and <br /> Travels</span>
        </h2>
        <p className="text-gray-500 text-1x2 mb-6 max-w-xl md:pl-0 text-justify">
          From the misty highlands of Kandy to the golden beaches of Galle, from ancient ruins of Polonnaruwa to
          the wildlife of Yala National Park, we craft journeys that create lasting memories and deep connections
          with Sri Lanka’s rich culture and nature.
        </p>
        <button className="group relative inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-[#52ACE4] font-medium text-white transition-all duration-300 hover:w-32">
          <div className="inline-flex whitespace-nowrap opacity-0 transition-all duration-200 group-hover:-translate-x-3 group-hover:opacity-100 text-white">
            About Us
          </div>
          <div className="absolute right-3.5">
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
            >
              <path
                d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </button>



      </div>

      <div className="flex justify-center">
        <Image
          src="/images/logo.png"
          alt="Famous Tours Logo"
          width={750}
          height={750}
          className="object-contain max-w-full h-auto"
        />
      </div>
    </section>
  );
}
