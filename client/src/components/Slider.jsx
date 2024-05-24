import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay"; // Import autoplay styles if needed

import "../App.css";

// import required modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";

const slides = [
  "https://www.casio.com/content/casio/locales/in/en/products/_jcr_content/root/responsivegrid/carousel_copy_203272445/item_1708924062193.casiocoreimg.jpeg/1716448850222/vk-casio-bannerdesktop.jpeg",
  "https://www.casio.com/content/casio/locales/in/en/products/_jcr_content/root/responsivegrid/carousel_copy_203272445/item_1708923982946.casiocoreimg.jpeg/1716448900349/main-banner.jpeg",
  "https://www.fastrack.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Library-Sites-FastrackSharedLibrary/default/dw5a394630/images/homepage/desktop/fastrack_d.jpg",
  "https://www.sonatawatches.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Library-Sites-SonataSharedLibrary/default/dw9a40b6ca/images/homepage/desktop/NewArrivals-D.jpg",
];

export default function App() {
  return (
    <Swiper
      pagination={{
        type: "fraction",
      }}
      navigation={true}
      autoplay={{
        delay: 2000, // 3 seconds delay
        disableOnInteraction: false, // Continue autoplay after user interaction
      }}
      modules={[Pagination, Navigation, Autoplay]}
      className="mySwiper"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <img src={slide} alt={`Slide ${index}`} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
