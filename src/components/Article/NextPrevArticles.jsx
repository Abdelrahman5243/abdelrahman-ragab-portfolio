import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { fetchAllArticles } from "../../services/articleService";

const NextPrevArticles = ({ currentId }) => {
  const { t } = useTranslation();
  const [prev, setPrev] = useState(null);
  const [next, setNext] = useState(null);

  useEffect(() => {
    let active = true;
    fetchAllArticles()
      .then((articles) => {
        if (!active || !Array.isArray(articles)) return;
        const index = articles.findIndex((a) => a._id === Number(currentId));
        if (index === -1) return;
        setPrev(index > 0 ? articles[index - 1] : null);
        setNext(index < articles.length - 1 ? articles[index + 1] : null);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [currentId]);

  if (!prev && !next) return null;

  return (
    <nav
      aria-label={t("articleNavigation", "Article navigation")}
      className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose"
    >
      {prev ? (
        <Link
          to={`/article/${prev._id}`}
          className="group flex flex-col gap-2 p-5 rounded-2xl border border-light-border dark:border-dark-border bg-light-secondary/90 dark:bg-dark-secondary/90 hover:border-light-blue/60 dark:hover:border-dark-blue/60 transition-colors duration-300"
        >
          <span className="flex items-center gap-1.5 text-sm font-medium text-light-subtitle dark:text-dark-subtitle">
            <ArrowRight size={15} className="rotate-180 transition-transform duration-300 group-hover:-translate-x-1" />
            {t("previousArticle", "Previous")}
          </span>
          <span className="text-base sm:text-lg font-semibold text-light-title dark:text-dark-title line-clamp-2 group-hover:text-light-blue dark:group-hover:text-dark-blue transition-colors">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {next && (
        <Link
          to={`/article/${next._id}`}
          className="group flex flex-col gap-2 p-5 rounded-2xl border border-light-border dark:border-dark-border bg-light-secondary/90 dark:bg-dark-secondary/90 hover:border-light-blue/60 dark:hover:border-dark-blue/60 transition-colors duration-300 sm:text-right sm:items-end"
        >
          <span className="flex items-center gap-1.5 text-sm font-medium text-light-subtitle dark:text-dark-subtitle">
            {t("nextArticle", "Next")}
            <ArrowLeft size={15} className="rotate-180 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
          <span className="text-base sm:text-lg font-semibold text-light-title dark:text-dark-title line-clamp-2 group-hover:text-light-blue dark:group-hover:text-dark-blue transition-colors">
            {next.title}
          </span>
        </Link>
      )}
    </nav>
  );
};

export default NextPrevArticles;
