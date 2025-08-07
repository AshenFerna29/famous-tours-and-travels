"use client";
import Image from "next/image";
import BookNowButton from "./Button";

import { useEffect, useState } from "react";

export default function WelcomeSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="bg-white py-25 px-10 md:px-35 grid grid-cols-1 md:grid-cols-2 gap-50 items-center overflow-hidden">
      <div className="pl-12">
        <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight text-black uppercase tracking-tight">
          Welcome to{" "}
          <span className="text-[#000000] block">Famous Tours and Travels</span>
        </h2>
        <p className="text-black text-1x2 mb-6 max-w-xl text-justify font-medium leading-relaxed">
          From the misty highlands of Kandy to the golden beaches of Galle, from
          ancient ruins of Polonnaruwa to the wildlife of Yala National Park, we
          craft journeys that create lasting memories and deep connections with
          Sri Lanka’s rich culture and nature.
        </p>
        <div>
          <BookNowButton
            text="ABOUT US"
            isVisible={isLoaded}
            delay="700ms"
            size="md"
            variant="primary"
          />
        </div>
      </div>

      <div
        className="flex justify-center"
        style={{ marginLeft: "40px", marginTop: "-30px" }}
      >
        <Image
          src="/images/logo.png"
          alt="Famous Tours Logo"
          width={350}
          height={350}
          className="object-contain max-w-full h-auto"
        />
      </div>
    </section>
  );
}
