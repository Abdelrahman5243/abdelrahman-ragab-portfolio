import { useEffect, useState } from "react";
import { ArrowRight, BookOpenText } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import SEO from "../SEO";
import { useTranslationMode } from "../../hooks/useTranslationMode";
import { fetchAllArticles } from "../../services/articleService";

// The home page shows the latest two; the rest live on /all-articles.
const HOME_COUNT = 2;

const ArticleSection = ({ showAll }) => {
  const [articles, setArticles] = useState([]);
  const [total, setTotal] = useState(0);
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

        setTotal(articlesData.length);
        setArticles(showAll ? articlesData : articlesData.slice(0, HOME_COUNT));
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
      <div className="flex flex-wrap gap-4 items-center justify-between mb-8">
        <div className="flex gap-4 items-center text-3xl">
          <BookOpenText
            className="text-light-subtitle dark:text-dark-subtitle"
            aria-hidden="true"
          />
          <h2 id="articles-title" className="title mb-0">
            {t("articlesTitle")}
          </h2>
        </div>

        {!showAll && total > articles.length && (
          <Link
            to="/all-articles"
            className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium
                       border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary
                       text-light-title dark:text-dark-title hover:border-light-blue dark:hover:border-dark-blue
                       hover:text-light-blue dark:hover:text-dark-blue transition-colors duration-200"
          >
            {t("readAll", "Read all")}
            <span className="text-light-subtitle dark:text-dark-subtitle">({total})</span>
            <ArrowRight
              size={15}
              className="rtl:-scale-x-100 transition-transform duration-200 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        )}
      </div>

      <div className="overflow-hidden rounded-2xl border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary divide-y divide-light-border dark:divide-dark-border">
        {articles.map((article, index) => (
          <ArticleCard
            key={article._id}
            article={article}
            index={index}
            readLabel={t("readArticle", "Read article")}
          />
        ))}
      </div>
    </section>
  );
};

export default ArticleSection;
