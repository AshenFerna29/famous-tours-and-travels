"use client";

import Masonry from "./Masonry";

const Gallery = () => {
  const items = [
    {
      id: "1",
      img: "https://picsum.photos/id/1015/600/900?grayscale",
      url: "#",
      height: 400,
    },
    {
      id: "2",
      img: "https://picsum.photos/id/1011/600/750?grayscale",
      url: "#",
      height: 250,
    },
    {
      id: "3",
      img: "https://picsum.photos/id/1020/600/800?grayscale",
      url: "#",
      height: 600,
    },
    {
      id: "4",
      img: "https://picsum.photos/id/1025/600/700?grayscale",
      url: "#",
      height: 350,
    },
    {
      id: "5",
      img: "https://picsum.photos/id/1043/600/900?grayscale",
      url: "#",
      height: 450,
    },
    {
      id: "6",
      img: "https://picsum.photos/id/1044/600/600?grayscale",
      url: "#",
      height: 300,
    },
    {
      id: "7",
      img: "https://picsum.photos/id/1051/600/800?grayscale",
      url: "#",
      height: 400,
    },
    {
      id: "8",
      img: "https://picsum.photos/id/1062/600/750?grayscale",
      url: "#",
      height: 375,
    },
    {
      id: "9",
      img: "https://picsum.photos/id/1074/600/850?grayscale",
      url: "#",
      height: 425,
    },
    {
      id: "10",
      img: "https://picsum.photos/id/1084/600/700?grayscale",
      url: "#",
      height: 350,
    },
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-black mb-4 text-left">
            Moments from the Journey
          </h2>
          <p className="text-lg text-black max-w-2xl text-left">
            Explore snapshots from our recent tours real memories made by real
            travelers. Discover the beauty, adventure, and joy captured along
            the way
          </p>
        </div>

        <div className="h-[800px] w-full">
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
