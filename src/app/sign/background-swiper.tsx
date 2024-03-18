import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import image1 from "@/../public/images/transfar_1.png";
import image2 from "@/../public/images/transfar_2.png";
import image3 from "@/../public/images/transfar_3.png";
import { useState } from "react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function BackgroundSwiper() {
  const images = [image1, image2, image3];
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="h-[calc(100%-40px)] flex">
      <SwipeIndicator activeIndex={activeIndex} total={images.length} />
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
        className="flex-1 absolute top-0 left-0 "
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
      className={`absolute bottom-12 gap-4 left-1/2 transform -translate-x-1/2 z-10 flex`}
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
