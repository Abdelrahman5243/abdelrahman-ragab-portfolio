import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const ArticleCard = ({ article }) => {
  return (
    <Link to={`/article/${article._id}`} key={article._id}>
      <motion.div
        className="relative overflow-hidden flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between 
                   px-4 sm:px-6 py-5 rounded-xl border border-light-border dark:border-dark-border 
                   hover:bg-light-border/10 dark:hover:bg-dark-border/10 "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: article._id * 0.1, duration: 0.5 }}
      >
        <div
          className="absolute top-3 right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center 
                     bg-[rgb(69,69,69)] dark:bg-light-primary 
                     text-dark-title dark:text-light-title 
                     shadow-sm transition-transform duration-200 hover:scale-110 
                     opacity-60 sm:opacity-70 md:opacity-80"
        >
          <ArrowUpRight size={16} strokeWidth={2} />
        </div>

        <div className="flex flex-col gap-3 w-full lg:w-1/2 text-left">
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
                  className="px-3 py-1 text-[10px] sm:text-xs font-medium rounded-full border 
                             border-light-border dark:border-dark-border 
                             text-light-title dark:text-dark-title 
                             bg-light-secondary/60 dark:bg-dark-secondary/60
                             hover:bg-light-border/20 dark:hover:bg-dark-border/20 
                            "
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="hidden md:flex justify-center w-full lg:w-auto mt-4 lg:mt-0">
          <img
            src={article.cover}
            alt={article.title}
            className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 object-cover rounded-lg"
          />
        </div>
      </motion.div>
    </Link>
  );
};

export default ArticleCard;
