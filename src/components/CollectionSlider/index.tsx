import React, { useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import { collectionSliderData } from "@/data/collectionSliderData";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CollectionSlider(props: { loadingState: boolean }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const totalSlides = collectionSliderData.length;

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    slidesToShow: 5, // Show 5 slides on desktop
    speed: 500,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Set autoplay interval to 3 seconds (3000ms)
    beforeChange: (_: number, next: number) => setActiveIndex(next),

    // Responsive settings
    responsive: [
      {
        breakpoint: 1440, // For desktop
        settings: {
          slidesToShow: 7, // Show 5 slides on desktop
          centerMode: true,
        },
      },
      {
        breakpoint: 1024, // For desktop
        settings: {
          slidesToShow: 5, // Show 5 slides on desktop
          centerMode: true,
        },
      },
      {
        breakpoint: 768, // For tablets
        settings: {
          slidesToShow: 3, // Show 4 slides on tablets
          centerMode: true,
        },
      },
      {
        breakpoint: 480, // For mobile devices
        settings: {
          slidesToShow: 1, // Show 2 slides on mobile
          centerMode: true,
        },
      },
    ],
  };

  return (
    <div className={`flex justify-center items-center overflow-hidden object-cover pt-8 w-full ${props.loadingState && "hidden"}`}>
      <div className="w-full">
        <Slider {...settings}>
          {collectionSliderData.map((data, index) => {
            let isCenter = index === activeIndex;

            // Calculate circular adjacent indexes
            let prevIndex = (activeIndex - 1 + totalSlides) % totalSlides;
            let nextIndex = (activeIndex + 1) % totalSlides;
            let prevIndex2 = (activeIndex - 2 + totalSlides) % totalSlides;
            let nextIndex2 = (activeIndex + 2) % totalSlides;

            let isAdjacent = index === prevIndex || index === nextIndex;
            let isAdjacent2 = index === prevIndex2 || index === nextIndex2;

            return (
              <div key={index} className="relative py-16">
                <div
                  className={`relative rounded-[26px] flex flex-col items-center justify-center cursor-pointer aspect-square transition-transform duration-300
                  ${isCenter ? "scale-[1.3] z-30" : isAdjacent ? "scale-[1.2] z-20" : isAdjacent2 ? "scale-[1.1] z-10" : "scale-[1] z-0"}`}
                >
                  <Image
                    src={data.imgUrl}
                    fill
                    className="rounded-xl duration-300 w-full h-full max-w-[300px]"
                    alt=""
                  />
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
}
