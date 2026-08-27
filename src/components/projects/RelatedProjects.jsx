import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./relatedprojects.css";
import { ChevronLeft, ChevronRight, Layers } from "lucide-react";
import ProjectCard from "./ProjectCard";

const RelatedProjects = ({ currentSlug }) => {
  const { t, i18n } = useTranslation("main");
  const projectsData = t("projects", { returnObjects: true });

  const current = projectsData.find((p) => p.slug === currentSlug);
  const others = projectsData.filter((p) => p.slug !== currentSlug);

  const sameCategory = others.filter((p) => p.categories === current?.categories);
  const rest = others.filter((p) => p.categories !== current?.categories);
  const related = [...sameCategory, ...rest].slice(0, 6);

  if (related.length === 0) return null;

  return (
    <div className="mt-16 sm:mt-20">
      <div className="flex items-center justify-between gap-4 mb-6 px-2 sm:px-4">
        <div className="flex items-center gap-3">
          <Layers className="text-light-blue dark:text-dark-blue" aria-hidden="true" size={24} />
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-light-title dark:text-dark-title">
            {t("relatedProjects", "More Projects")}
          </h2>
        </div>

        <div className="hidden sm:flex gap-2">
          <button
            type="button"
            className="related-prev flex items-center justify-center w-9 h-9 rounded-full border border-light-border dark:border-dark-border bg-light-secondary/80 dark:bg-dark-secondary/80 hover:border-light-blue/60 dark:hover:border-dark-blue/60 transition-colors duration-200"
            aria-label={t("previous", "Previous")}
          >
            {i18n.language === "ar" ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
          <button
            type="button"
            className="related-next flex items-center justify-center w-9 h-9 rounded-full border border-light-border dark:border-dark-border bg-light-secondary/80 dark:bg-dark-secondary/80 hover:border-light-blue/60 dark:hover:border-dark-blue/60 transition-colors duration-200"
            aria-label={t("next", "Next")}
          >
            {i18n.language === "ar" ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </button>
        </div>
      </div>

      <Swiper
        key={i18n.language}
        dir={i18n.language === "ar" ? "rtl" : "ltr"}
        modules={[Navigation]}
        navigation={{ prevEl: ".related-prev", nextEl: ".related-next" }}
        spaceBetween={16}
        slidesPerView={1.15}
        breakpoints={{
          480: { slidesPerView: 1.6, spaceBetween: 20 },
          640: { slidesPerView: 2.5, spaceBetween: 20 },
          768: { slidesPerView: 2.8, spaceBetween: 20 },
          1024: { slidesPerView: 3.8, spaceBetween: 20 },
        }}
        className="related-projects-swiper !px-2 sm:!px-4 !pb-2"
      >
        {related.map((project) => (
          <SwiperSlide key={project.slug} className="!flex">
            <ProjectCard slug={project.slug} project={project} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default RelatedProjects;
