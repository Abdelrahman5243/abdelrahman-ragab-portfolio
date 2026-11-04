import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { cardAt, cardSrcSet, isCard } from "../../utils/cardImage";

// Covers are Open Graph cards (1200×630), so thumbnails keep that ratio.
const RATIO = 1200 / 630;
const THUMB = { w: 480, h: 252 };
const THUMB_WIDTHS = [480, 720, 960];

// One full-width row, styled to match the Tools rows.
const ArticleCard = ({ article, index, readLabel }) => {
  const cover = article.cover;
  const number = String(index + 1).padStart(2, "0");

  return (
    <Link
      to={`/article/${article.slug}`}
      className="group relative grid grid-cols-[auto_minmax(0,1fr)] sm:grid-cols-[auto_minmax(0,1fr)_auto] gap-x-4 sm:gap-x-6 gap-y-4 items-center p-5 sm:p-6
                 transition-colors duration-300 hover:bg-light-primary dark:hover:bg-dark-primary
                 focus-visible:outline-none focus-visible:bg-light-primary dark:focus-visible:bg-dark-primary"
    >
      <span
        className="absolute inset-y-0 start-0 w-0.5 scale-y-0 bg-light-blue dark:bg-dark-blue transition-transform duration-300 group-hover:scale-y-100 group-focus-visible:scale-y-100"
        aria-hidden="true"
      />

      {cover && (
        <div className="relative overflow-hidden rounded-lg w-24 sm:w-40 md:w-52 aspect-[40/21] border border-light-border dark:border-dark-border bg-light-primary dark:bg-dark-primary">
          <img
            src={cardAt(cover, THUMB)}
            srcSet={isCard(cover) ? cardSrcSet(cover, THUMB_WIDTHS, RATIO) : undefined}
            sizes="(min-width: 768px) 208px, (min-width: 640px) 160px, 96px"
            alt=""
            loading="lazy"
            decoding="async"
            width={THUMB.w}
            height={THUMB.h}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </div>
      )}

      <div className={`flex flex-col gap-1.5 min-w-0 ${cover ? "" : "col-span-2"}`}>
        <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-wide text-light-subtitle dark:text-dark-subtitle">
          <span
            dir="ltr"
            className="font-mono group-hover:text-light-blue dark:group-hover:text-dark-blue transition-colors duration-300"
          >
            {number}
          </span>
          {article.tags?.length > 0 && (
            <span className="truncate">{article.tags.slice(0, 3).join(" · ")}</span>
          )}
        </div>
        <h3 className="text-base sm:text-lg md:text-xl font-semibold leading-snug text-balance text-light-title dark:text-dark-title group-hover:text-light-blue dark:group-hover:text-dark-blue transition-colors duration-300">
          <bdi>{article.title}</bdi>
        </h3>
        {article["short-description"] && (
          <p className="hidden sm:block text-sm leading-relaxed text-light-subtitle dark:text-dark-subtitle line-clamp-2 max-w-[70ch]">
            <bdi>{article["short-description"]}</bdi>
          </p>
        )}
      </div>

      <span
        className="hidden sm:inline-flex items-center gap-1.5 shrink-0 px-3 py-1.5 rounded-full text-xs font-medium
                   border border-light-border dark:border-dark-border text-light-subtitle dark:text-dark-subtitle
                   group-hover:border-light-blue dark:group-hover:border-dark-blue group-hover:text-light-blue dark:group-hover:text-dark-blue
                   transition-colors duration-200"
        aria-hidden="true"
      >
        {readLabel}
        <ArrowUpRight
          size={14}
          className="rtl:-scale-x-100 transition-transform duration-300 ease-out group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </span>
    </Link>
  );
};

export default ArticleCard;
