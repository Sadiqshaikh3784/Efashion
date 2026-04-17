import { useState, useEffect } from "react";

const banners = [
  "https://images.unsplash.com/photo-1521335629791-ce4aec67dd53",
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
  "https://images.unsplash.com/photo-1520975916090-3105956dac38"
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[300px] md:h-[450px] overflow-hidden">
      <img src={banners[index]} className="w-full h-full object-cover" />

      <div className="absolute inset-0 bg-black/50 flex items-center px-10">
        <div>
          <h1 className="text-white text-4xl md:text-5xl font-bold">
            Mega Sale 🔥
          </h1>
          <p className="text-white mt-3 text-lg">
            Up to <span className="text-pink-400 font-bold">70% OFF</span>
          </p>
        </div>
      </div>
    </div>
  );
}