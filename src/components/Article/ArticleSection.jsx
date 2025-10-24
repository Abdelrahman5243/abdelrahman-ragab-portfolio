import { useEffect, useState } from "react";
import { BookOpenText } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ArticleCard from "./ArticleCard";
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

  if (loading) return <div className="loader"></div>;
  if (!articles || articles.length === 0) return null;

  return (
    <section id="articles" className="my-12 w-full">
      <div className="flex gap-4 items-center mb-8 text-3xl">
        <BookOpenText
          className="text-light-subtitle dark:text-dark-subtitle"
          aria-hidden="true"
        />
        <h1 id="skills-title" className="title mb-0">
          {t("articlesTitle")}
        </h1>
      </div>

      <div className="flex flex-col gap-3">
        {articles.map((article) => (
          <ArticleCard article={article} key={article._id} />
        ))}
      </div>

      {!showAll && (
        <div className="mt-8 text-center mx-auto max-w-48">
          <Link
            to="/all-articles"
            className="relative py-2 px-6 backdrop-blur-sm border border-dark-bgHeader/10 dark:border-light-bgHeader/10 
              bg-light-bgHeader/80 dark:bg-dark-bgHeader/80 text-sm sm:text-base md:text-lg 
              text-light-subtitle dark:text-dark-subtitle rounded-full"
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
