import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./slider.css";

const Slider = ({ project, language }) => {
  const projectImages = project.screens_url || [];
  const [loading, setLoading] = useState(new Array(projectImages.length).fill(true));

  const handleImageLoad = (index) => {
    setLoading((prev) => {
      const updatedLoading = [...prev];
      updatedLoading[index] = false;
      return updatedLoading;
    });
  };

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
          <div className="relative w-full h-full">
            {loading[index] && (
              <div className="w-screen h-screen flex justify-center items-center">
                <div className="loader"></div>
              </div>
            )}
            <img
              src={img}
              alt={`design ${index}`}
              className="w-full h-auto"
              onLoad={() => handleImageLoad(index)}
              style={{ visibility: loading[index] ? 'hidden' : 'visible' }}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
