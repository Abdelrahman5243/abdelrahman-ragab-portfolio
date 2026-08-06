import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const ArticleCard = ({ article }) => {
  return (
    <Link to={`/article/${article.slug}`} key={article._id}>
      <motion.div
        dir="ltr"
        className="relative overflow-hidden flex gap-6 items-start lg:items-center justify-between
                   px-4 sm:px-6 py-5 rounded-2xl border border-light-border dark:border-dark-border
                   bg-light-secondary dark:bg-dark-secondary
                   hover:border-light-blue/30 dark:hover:border-dark-blue/30
                   transition-colors duration-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: article._id * 0.1, duration: 0.5 }}
      >
        <div className="absolute top-3 right-3 centered header_btn">
          <ArrowUpRight size={16} strokeWidth={2} />
        </div>

        <div className="flex flex-col gap-3 w-full text-left">
          <h2 className="text-sm sm:text-base md:text-lg font-semibold text-light-title dark:text-dark-title leading-snug">
            {article.title}
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-light-subtitle dark:text-dark-subtitle leading-relaxed">
            {article["short-description"]}
          </p>

          {article.tags && (
            <div className="flex flex-wrap gap-2 mt-2">
              {article.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs font-medium rounded-full border
                             border-light-border dark:border-dark-border
                             text-light-title dark:text-dark-title
                             bg-light-primary dark:bg-dark-primary
                            "
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        {article.cover && (
            <div className="hidden md:flex justify-center lg:w-auto mt-4 lg:mt-0">
              <img
                src={article.cover}
                alt={article.title}
                className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 object-cover rounded-lg"
              />
            </div>
          )}
      </motion.div>
    </Link>
  );
};

ArticleCard.propTypes = {
  article: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    "short-description": PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    cover: PropTypes.string,
  }).isRequired,
};

export default ArticleCard;
