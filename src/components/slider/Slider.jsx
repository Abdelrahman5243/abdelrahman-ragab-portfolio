import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./slider.css";
import SkeletonLoader from "../spinner/SkeletonLoader";

const placeholderImg = "https://placehold.co/600x400/png";

const Slider = ({ project, language }) => {
  const projectImages = project.screens_url || [];
  const [images, setImages] = useState(projectImages);
  const [loading, setLoading] = useState(new Array(projectImages.length).fill(true));

  const handleImageLoad = (index) => {
    setLoading((prev) => {
      const updated = [...prev];
      updated[index] = false;
      return updated;
    });
  };

  const handleImageError = (index) => {
    setImages((prev) => {
      const updated = [...prev];
      updated[index] = placeholderImg;
      return updated;
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
      className="max-h-[500px] overflow-hidden rounded-lg"
    >
      {images.map((img, index) => (
        <SwiperSlide key={index} className="mx-auto w-full">
          <div className="relative w-full h-full min-h-[400px] flex justify-center items-center">
            {loading[index] && (
              <div className="absolute inset-0 z-10">
                <SkeletonLoader />
              </div>
            )}
            <img
              src={img}
              alt={`Design ${index + 1}`}
              width={1280}
              height={720}
              className={`w-full h-auto transition-opacity duration-300 rounded-lg ${
                loading[index] ? "opacity-0" : "opacity-100"
              }`}
              onLoad={() => handleImageLoad(index)}
              onError={() => handleImageError(index)}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
