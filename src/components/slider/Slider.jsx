import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./slider.css";

const Slider = ({ project, language }) => {
  const projectImages = project.screens_url || [];
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
