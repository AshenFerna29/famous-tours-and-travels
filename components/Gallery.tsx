"use client";

import Masonry from "./Masonry";

const Gallery = () => {
  const items = [
    {
      id: "1",
      img: "/images/gallery/gallery-1.jpg",
      height: 400,
    },
    {
      id: "2",
      img: "/images/gallery/gallery-2.jpg",
      height: 250,
    },
    {
      id: "3",
      img: "/images/gallery/gallery-3.jpg",
      height: 600,
    },
    {
      id: "4",
      img: "/images/gallery/gallery-4.JPG",
      height: 350,
    },
    {
      id: "5",
      img: "/images/gallery/gallery-5.jpg",
      height: 450,
    },
    {
      id: "6",
      img: "/images/gallery/gallery-6.jpg",
      height: 300,
    },
    {
      id: "7",
      img: "/images/gallery/gallery-7.jpg",
      height: 400,
    },
    {
      id: "8",
      img: "/images/gallery/gallery-8.JPG",
      height: 375,
    },
    {
      id: "9",
      img: "/images/gallery/gallery-9.JPG",
      height: 425,
    },
    {
      id: "10",
      img: "/images/gallery/gallery-10.JPG",
      height: 360,
    },
    {
      id: "11",
      img: "/images/gallery/gallery-11.JPG",
      height: 520,
    },
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div>
          <h2 className="text-4xl font-bold text-black mb-4 ml-15 text-left">
            <span className="text-[#fda720]">Moments </span>from the Journey
          </h2>
          <p className="text-lg text-black max-w-2xl text-left ml-15">
            Explore snapshots from our recent tours real memories made by real
            travelers. Discover the beauty, adventure, and joy captured along
            the way
          </p>
        </div>

        <div className="w-full p-15">
          <Masonry
            items={items}
            ease="power3.out"
            duration={0.6}
            stagger={0.05}
            animateFrom="bottom"
            scaleOnHover={true}
            hoverScale={0.95}
            blurToFocus={true}
            colorShiftOnHover={false}
          />
        </div>
      </div>
    </section>
  );
};

export default Gallery;
