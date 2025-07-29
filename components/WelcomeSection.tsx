import Image from 'next/image';

export default function WelcomeSection() {
  return (
    <section className="bg-white py-20 px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div>
        <h2 className="text-5xl md:text-5xl font-bold mb-6 leading-tight">
          Welcome to <span className="text-[#52ACE4]"><br />Famous Tours and <br /> Travels</span>
        </h2>
        <p className="text-gray-500 font-medium mb-6 max-w-xl md:pl-0 text-justify">
          From the misty highlands of Kandy to the golden beaches of Galle, from ancient ruins of Polonnaruwa to
          the wildlife of Yala National Park, we craft journeys that create lasting memories and deep connections
          with Sri Lanka’s rich culture and nature.
        </p>
       <a
            href="#"
            className="group inline-flex items-center gap-2 text-[#52ACE4] font-bold text-base md:pl-0"
            >
            ABOUT US
            <span className="w-6 h-6 rounded-full border-2 border-[#52ACE4] flex items-center justify-center transition-transform group-hover:translate-x-1">
                <svg
                className="w-3.5 h-3.5 text-gray-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
            </span>
        </a>

      </div>

      <div className="flex justify-center">
        <Image
          src="/images/logo.png"
          alt="Famous Tours Logo"
          width={750}
          height={750}
          className="object-contain"
        />
      </div>
    </section>
  );
}
