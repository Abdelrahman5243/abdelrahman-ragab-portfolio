import { useEffect, useState } from "react";
import { BookOpenText } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import SEO from "../SEO";
import { useTranslationMode } from "../../hooks/useTranslationMode";
import { fetchAllArticles } from "../../services/articleService";

const ArticleSection = ({ showAll }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslationMode();
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

        setArticles(showAll ? articlesData : articlesData.slice(0, 2));
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
      <div className="flex gap-4 items-center mb-8 text-3xl">
        <BookOpenText className="text-light-subtitle dark:text-dark-subtitle" aria-hidden="true" />
        <h2 id="articles-title" className="title mb-0">
          {t("articlesTitle")}
        </h2>
      </div>

      <div className="flex flex-col gap-4">
        {articles.map((article) => (
          <ArticleCard article={article} key={article._id} />
        ))}
      </div>

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
