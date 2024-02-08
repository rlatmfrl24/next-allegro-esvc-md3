"use client";

import CatchPhrase from "./catch-phrase";
import QuickMenu from "./quick-menu";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import BackgroundSwiper from "./background-swiper";

export default function Sign() {
  return (
    <div className="relative h-full">
      <QuickMenu />
      <CatchPhrase />
      <BackgroundSwiper />
    </div>
  );
}
