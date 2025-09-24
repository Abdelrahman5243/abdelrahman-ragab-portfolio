import { Suspense, lazy, useLayoutEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, GithubIcon, MoreVertical } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Slider from "../components/slider/Slider";

const ProjectDetails = () => {
  const { id } = useParams();
  const { i18n, t } = useTranslation("main");
  const projectData = t(`projects.${id}`, { returnObjects: true });

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="my-6 sm:my-8"
    >
      {/* Back button */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Link
          to="/"
          className="header_btn centered mb-8 w-28 px-3 py-2 sm:px-4 sm:py-3 gap-2 sm:gap-4 text-sm sm:text-base md:text-lg"
        >
          <ArrowLeft
            size={18}
            className={`${i18n.language === "ar" ? "rotate-180" : ""}`}
          />
          Home
        </Link>
      </motion.div>

      {/* Slider */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.7,
          delay: 0.3,
          ease: "easeOut",
        }}
      >
        <Slider project={projectData} language={i18n.language} />
      </motion.div>

      {/* Project Title & Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex gap-3 sm:gap-4 items-center my-6 sm:my-8 mt-6">
          <MoreVertical
            className="text-light-subtitle dark:text-dark-subtitle"
            aria-hidden="true"
          />
          <h1 className="title mb-0 text-xl sm:text-2xl md:text-3xl lg:text-5xl break-words">
            {projectData.title}
          </h1>
        </div>
        <p className="description mx-2 sm:mx-4 leading-6 sm:leading-7 md:leading-8 lg:leading-10 text-sm sm:text-base md:text-lg lg:text-xl break-words">
          {projectData.details}
        </p>
      </motion.div>

      {/* Technologies */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex gap-3 sm:gap-4 items-center my-6 sm:my-8">
          <MoreVertical
            className="text-light-subtitle dark:text-dark-subtitle"
            aria-hidden="true"
          />
          <h1 className="text-base sm:text-lg md:text-2xl lg:text-3xl dark:text-dark-title text-light-title">
            {t("technologiesTitle")}
          </h1>
        </div>
        <ul
          role="list"
          className="flex flex-wrap gap-2 sm:gap-4 px-2 sm:px-4 mb-8 dark:text-dark-subtitle text-light-subtitle"
        >
          {projectData.technologies.map((technology, index) => (
            <motion.li
              key={technology}
              role="listitem"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-2 px-2 py-1 sm:px-3 sm:py-2 rounded-xl border border-light-border dark:border-dark-border list-none text-xs sm:text-sm md:text-base break-words"
            >
              {technology}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Links (Live Demo & Code) */}
      <motion.ul
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap gap-3 sm:gap-4 px-2 sm:px-4"
      >
        {/* Live Demo */}
        <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <a
            href={projectData.live}
            className="relative py-1.5 px-3 sm:py-2 sm:px-6 backdrop-blur-sm border border-dark-bgHeader/10 dark:border-light-bgHeader/10 bg-light-bgHeader/80 dark:bg-dark-bgHeader/80 text-light-subtitle dark:text-dark-subtitle rounded-full flex gap-2 sm:gap-4 items-center justify-between text-xs sm:text-sm md:text-base"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Go to live demo</span>
            <ExternalLink size={16} className="sm:w-5 sm:h-5" />
            <div className="absolute inset-x-0 h-px -bottom-px bg-gradient-to-r w-2/3 sm:w-3/4 mx-auto from-transparent via-orange-300 to-transparent" />
          </a>
        </motion.li>

        {/* Code Repo */}
        <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <a
            href={projectData.repo}
            className="relative py-1.5 px-3 sm:py-2 sm:px-6 backdrop-blur-sm border border-dark-bgHeader/10 dark:border-light-bgHeader/10 bg-light-bgHeader/80 dark:bg-dark-bgHeader/80 text-light-subtitle dark:text-dark-subtitle rounded-full flex gap-2 sm:gap-4 items-center justify-between text-xs sm:text-sm md:text-base"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Go to Code</span>
            <GithubIcon size={16} className="sm:w-5 sm:h-5" />
            <div className="absolute inset-x-0 h-px -bottom-px bg-gradient-to-r w-2/3 sm:w-3/4 mx-auto from-transparent via-red-300 to-transparent" />
          </a>
        </motion.li>
      </motion.ul>
    </motion.div>
  );
};

export default ProjectDetails;
