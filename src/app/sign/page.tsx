"use client";

import CatchPhrase from "./catch-phrase";
import QuickMenu from "./quick-menu";
import BackgroundSwiper from "./background-swiper";
import Footer from "../components/footer";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function Sign() {
  return (
    <div className="relative h-full">
      <QuickMenu />
      <CatchPhrase />
      <BackgroundSwiper />
      <Footer />
    </div>
  );
}
