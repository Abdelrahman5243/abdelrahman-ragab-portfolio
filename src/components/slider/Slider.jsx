import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./slider.css";
import designsImage from "../../assets/designs";

const Slider = ({ projectId, language }) => {
  const projectImages = designsImage[projectId] || [];

  return (
    <Swiper
      key={language}
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      autoplay={{ delay: 3000 }}
      navigation
      pagination={{ clickable: true }}
      className="max-h-[500px] overflow-hidden"
    >
      {projectImages.map((img, index) => (
        <SwiperSlide key={index} className="mx-auto w-full">
          <img src={img} alt="design" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
