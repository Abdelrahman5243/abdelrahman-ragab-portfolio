import { useEffect, useState } from "react";
import { BookOpenText, ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ArticleCard from "./ArticleCard";
import SEO from "../SEO";
import { useTranslationMode } from "../../hooks/useTranslationMode";
import { fetchAllArticles } from "../../services/articleService";

const ArticleSection = ({ showAll }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t, currentLang } = useTranslationMode();
  const navigate = useNavigate();

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true);
        const articlesData = await fetchAllArticles();

        if (!articlesData || articlesData.length === 0) {
          if (showAll) {
            navigate("/", { replace: true });
            return;
          }
          setArticles([]);
          return;
        }

        setArticles(showAll ? articlesData : articlesData.slice(0, 6));
      } catch (error) {
        console.error("Error fetching articles:", error);
        if (showAll) navigate("/", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, [showAll, navigate]);

  const seo = showAll && (
    <SEO
      title="Articles — Abdelrahman Ragab's Portfolio"
      description="Technical articles by Abdelrahman Ragab covering React, performance, and frontend architecture."
      path="/all-articles"
    />
  );

  if (loading)
    return (
      <>
        {seo}
        <div className="loader"></div>
      </>
    );
  if (!articles || articles.length === 0) return seo || null;

  return (
    <section id="articles" className="my-16 w-full">
      {seo}
      <div className="flex gap-4 items-center justify-between mb-8">
        <div className="flex gap-4 items-center text-3xl">
          <BookOpenText
            className="text-light-subtitle dark:text-dark-subtitle"
            aria-hidden="true"
          />
          <h2 id="articles-title" className="title mb-0">
            {t("articlesTitle")}
          </h2>
        </div>

        {!showAll && (
          <div className="hidden sm:flex gap-2">
            <button
              type="button"
              className="articles-prev flex items-center justify-center w-9 h-9 rounded-full border border-light-border dark:border-dark-border bg-light-secondary/80 dark:bg-dark-secondary/80 hover:border-light-blue/60 dark:hover:border-dark-blue/60 transition-colors duration-200"
              aria-label={t("previous", "Previous")}
            >
              {currentLang === "ar" ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
            <button
              type="button"
              className="articles-next flex items-center justify-center w-9 h-9 rounded-full border border-light-border dark:border-dark-border bg-light-secondary/80 dark:bg-dark-secondary/80 hover:border-light-blue/60 dark:hover:border-dark-blue/60 transition-colors duration-200"
              aria-label={t("next", "Next")}
            >
              {currentLang === "ar" ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
            </button>
          </div>
        )}
      </div>

      {showAll ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {articles.map((article) => (
            <ArticleCard article={article} key={article._id} />
          ))}
        </div>
      ) : (
        <Swiper
          key={currentLang}
          dir={currentLang === "ar" ? "rtl" : "ltr"}
          modules={[Navigation]}
          navigation={{ prevEl: ".articles-prev", nextEl: ".articles-next" }}
          spaceBetween={16}
          slidesPerView={1.15}
          breakpoints={{
            480: { slidesPerView: 1.6, spaceBetween: 20 },
            640: { slidesPerView: 2.2, spaceBetween: 20 },
            1024: { slidesPerView: 3.2, spaceBetween: 24 },
          }}
          className="!px-2 sm:!px-4 !pb-2"
        >
          {articles.map((article) => (
            <SwiperSlide key={article._id} className="!h-auto">
              <ArticleCard article={article} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {!showAll && (
        <div className="mt-8 text-center mx-auto max-w-48">
          <Link
            to="/all-articles"
            className="relative py-2 px-6 backdrop-blur-sm border border-light-border/80 dark:border-dark-border 
            bg-light-secondary/85 dark:bg-dark-secondary/85 text-sm sm:text-base md:text-lg 
            text-light-title dark:text-dark-title rounded-full shadow-[0_12px_32px_rgb(15_23_42_/_0.05)] hover:border-light-blue/40 dark:hover:border-dark-blue/40"
            aria-label="Show More Articles"
          >
            <span>{t("seeMore")}</span>
          </Link>
        </div>
      )}
    </section>
  );
};

export default ArticleSection;
