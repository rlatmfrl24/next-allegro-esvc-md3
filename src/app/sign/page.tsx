"use client";

import { useSetRecoilState } from "recoil";
import { isSigningState } from "./store";
import { use, useEffect, useState } from "react";
import Image from "next/image";
import image1 from "@/../public/images/image_1.jpg";
import image2 from "@/../public/images/image_2.jpg";
import image3 from "@/../public/images/image_3.jpg";
import image4 from "@/../public/images/image_4.jpg";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

export default function Sign() {
  const setIsSigning = useSetRecoilState(isSigningState);

  const images = [image1, image2, image3, image4];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setIsSigning(false);
  }, [setIsSigning]);

  return (
    <div className="flex-1 flex relative">
      <Swiper
        slidesPerView={1}
        loop={true}
        // noSwiping
        // noSwipingClass="swiper-slide"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        onSlideChange={(e) => setActiveIndex(e.realIndex)}
        className="flex-1"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Image
              src={image}
              alt="Picture of the author"
              fill
              style={{
                objectFit: "cover",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <SwipeIndicator activeIndex={activeIndex} total={images.length} />
      <CatchPhrase />
    </div>
  );
}

const SwipeIndicator = ({
  activeIndex,
  total,
}: {
  activeIndex?: number;
  total?: number;
}) => {
  const ActiveIndicator = () => (
    <div className="w-16 h-3 bg-white rounded-full"></div>
  );

  const Indicator = () => (
    <div className="w-3 h-3 bg-white bg-opacity-40 border border-whi rounded-full"></div>
  );

  return (
    <div
      className={`absolute bottom-8 gap-4 left-1/2 transform -translate-x-1/2 z-10 flex`}
    >
      {[...Array(total)].map((_, index) =>
        index === activeIndex ? (
          <ActiveIndicator key={`swipe-indicator-` + index} />
        ) : (
          <Indicator key={`swipe-indicator-` + index} />
        )
      )}
    </div>
  );
};

const CatchPhrase = () => {
  return (
    <div className="absolute left-0 top-1/3 z-10 bg-black bg-opacity-50 px-20 py-9 text-white font-pretendard rounded-r-2xl">
      <h1 className="text-5xl font-semibold mb-8">
        The Best Choice is TS Line!
      </h1>
      <p>
        Register on our website for enjoying a variety of e-service <br />
        Cargo Tracking service is available without registration
      </p>
    </div>
  );
};
