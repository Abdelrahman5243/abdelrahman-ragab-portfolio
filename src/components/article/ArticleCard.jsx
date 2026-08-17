import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const ArticleCard = ({ article }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Link
      to={`/article/${article.slug}`}
      className="group block focus-visible:outline-none"
      aria-label={article.title}
    >
      <motion.article
        className="relative overflow-hidden rounded-2xl p-5 sm:p-7
                   border border-light-border dark:border-dark-border
                   bg-light-secondary dark:bg-dark-secondary
                   
                   group-hover:border-light-blue/50 dark:group-hover:border-dark-blue/50
                   group-focus-visible:border-light-blue dark:group-focus-visible:border-dark-blue
                   group-focus-visible:ring-2 group-focus-visible:ring-light-blue/40 dark:group-focus-visible:ring-dark-blue/40"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* accent wash on hover, tinted from the active palette */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(320px circle at 12% 0%, rgb(var(--accent-light-rgb) / 0.07), transparent 65%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 hidden dark:block"
          style={{
            background:
              "radial-gradient(320px circle at 12% 0%, rgb(var(--accent-dark-rgb) / 0.12), transparent 65%)",
          }}
        />

        <div className="relative flex gap-6 sm:gap-10">
          {article.cover && (
            <div className="relative hidden sm:block w-36 md:w-48 aspect-[4/3] shrink-0 overflow-hidden rounded-lg">
              <img
                src={article.cover}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover grayscale-[35%] transition-all duration-500 ease-out group-hover:grayscale-0 group-hover:scale-[1.04]"
              />
            </div>
          )}

          <div className="flex min-w-0 flex-1 flex-col gap-3.5">
            {article.tags && article.tags.length > 0 && (
              <p className="text-xs sm:text-[0.8rem] font-medium uppercase tracking-wide text-light-subtitle/80 dark:text-dark-subtitle/80 ">
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

            <p className="max-w-[65ch] text-sm sm:text-base text-light-subtitle dark:text-dark-subtitle leading-relaxed line-clamp-2 ">
              {article["short-description"]}
            </p>

            <span
              className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold
                         text-light-title dark:text-dark-title "
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
        </div>
      </motion.article>
    </Link>
  );
};

export default ArticleCard;
