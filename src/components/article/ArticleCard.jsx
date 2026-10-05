import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cardAt, cardSrcSet, isCard } from "../../utils/cardImage";

const CARD_WIDTHS = [360, 520, 720, 1040];

const ArticleCard = ({ article }) => {
  const shouldReduceMotion = useReducedMotion();
  const cover = article.cover;
  const cardIsTheTile = isCard(cover);

  return (
    <Link
      to={`/article/${article.slug}`}
      className="group block focus-visible:outline-none"
      aria-label={`${article.title} — ${article["short-description"] ?? ""}`}
    >
      <motion.article
        className="relative rounded-2xl
                   group-focus-visible:ring-2 group-focus-visible:ring-light-blue/50 dark:group-focus-visible:ring-dark-blue/50
                   group-focus-visible:ring-offset-2 ring-offset-light-primary dark:ring-offset-dark-primary"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {cardIsTheTile ? (
          <>
            <div className="relative overflow-hidden rounded-2xl aspect-square">
              <img
                src={cardAt(cover, { w: 520, h: 520 })}
                srcSet={cardSrcSet(cover, CARD_WIDTHS, 1)}
                sizes="(min-width: 1024px) 420px, (min-width: 640px) 340px, 88vw"
                alt={article.title}
                loading="lazy"
                decoding="async"
                width={520}
                height={520}
                className="absolute inset-0 h-full w-full object-cover
                           transition-transform duration-700 ease-out
                           group-hover:scale-[1.02]"
              />
            </div>

            <div className="flex items-center justify-between gap-4 pt-3.5">
              {article.tags?.length > 0 && (
                <p
                  className="min-w-0 truncate text-xs sm:text-[0.8rem] font-medium uppercase tracking-wide
                             text-light-subtitle/80 dark:text-dark-subtitle/80"
                >
                  {article.tags.slice(0, 2).join("  /  ")}
                </p>
              )}
              <span
                className="shrink-0 inline-flex items-center gap-1.5 text-sm font-semibold
                           text-light-title dark:text-dark-title
                           group-hover:text-light-blue dark:group-hover:text-dark-blue"
              >
                Read article
                <ArrowUpRight
                  size={16}
                  strokeWidth={2.5}
                  className="rtl:-scale-x-100 transition-transform duration-300 ease-out
                             group-hover:translate-x-1 rtl:group-hover:-translate-x-1 group-hover:-translate-y-0.5"
                />
              </span>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-3 p-5 sm:p-7">
            {article.tags?.length > 0 && (
              <p className="text-xs sm:text-[0.8rem] font-medium uppercase tracking-wide text-light-subtitle/80 dark:text-dark-subtitle/80">
                {article.tags.join("  /  ")}
              </p>
            )}
            <h2
              className="text-xl sm:text-2xl md:text-[1.75rem] font-bold leading-[1.15] tracking-tight text-balance
                         text-light-title dark:text-dark-title
                         group-hover:text-light-blue dark:group-hover:text-dark-blue"
            >
              {article.title}
            </h2>
            <p className="max-w-[65ch] text-sm sm:text-base text-light-subtitle dark:text-dark-subtitle leading-relaxed line-clamp-2">
              {article["short-description"]}
            </p>
            <span
              className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold
                         text-light-title dark:text-dark-title"
            >
              Read article
              <ArrowUpRight
                size={16}
                strokeWidth={2.5}
                className="rtl:-scale-x-100 transition-transform duration-300 ease-out
                           group-hover:translate-x-1 rtl:group-hover:-translate-x-1 group-hover:-translate-y-0.5"
              />
            </span>
          </div>
        )}
      </motion.article>
    </Link>
  );
};

export default ArticleCard;
