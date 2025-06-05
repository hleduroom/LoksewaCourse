// components/HomeCarousel.tsx
"use client";

import Image from "next/image";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

// components/HomeCarousel.tsx

// components/HomeCarousel.tsx

// components/HomeCarousel.tsx

// components/HomeCarousel.tsx

// components/HomeCarousel.tsx

// components/HomeCarousel.tsx

// components/HomeCarousel.tsx

// components/HomeCarousel.tsx

type Banner = {
  id: string;
  title: string;
  image: string;
};

type Props = {
  items: Banner[];
};

export default function HomeCarousel({ items }: Props) {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 3,
      spacing: 16,
    },
    breakpoints: {
      "(max-width: 1024px)": {
        slides: { perView: 2 },
      },
      "(max-width: 640px)": {
        slides: { perView: 1 },
      },
    },
  });

  return (
    <div className="py-6">
      <h2 className="mb-4 text-2xl font-bold">Top Picks</h2>
      <div ref={sliderRef} className="keen-slider">
        {items.map((item) => (
          <div key={item.id} className="keen-slider__slide">
            <div className="overflow-hidden rounded-xl bg-white shadow transition-all hover:shadow-md dark:bg-gray-900">
              <div className="relative h-48 w-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {item.title}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
