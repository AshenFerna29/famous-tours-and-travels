export default function Hero() {
  return (
    <section
      className="relative h-screen flex flex-col justify-center items-center text-center px-4"
      style={{
        backgroundImage: `url('/images/sigiriya.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Top fade overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white/10 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl">
        {/* Heading (centered) */}
        <h1 className="text-4xl md:text-6xl font-bold font-poppins text-black">
          Unwrap The Wonders of <br />
          <span className="text-[#F68713]">Sri Lanka</span>
        </h1>
        <br />
        <br />
        <br />

        {/* Paragraph + Button (left aligned) */}
        <p className="text-black font-poppins text-lg">
          <span className="font-bold">Famous Tours & Travel</span> is a Sri
          Lanka-based travel company dedicated to creating memorable and stress
          free journeys. From cultural tours to scenic getaways, we help you
          experience the very best of the island.
        </p>
        <button className="mt-6 bg-[#52ACE4] hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold">
          BOOK NOW
        </button>
      </div>
    </section>
  );
}
