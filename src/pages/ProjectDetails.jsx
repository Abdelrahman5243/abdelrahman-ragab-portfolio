import { useLayoutEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, GithubIcon, MoreVertical, CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Slider from "../components/slider/Slider";
import ThumbnailGallery from "../components/lightbox/ThumbnailGallery";

const parseDetails = (text = "") =>
  text
    .split(/(?<=[.!؟])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 10);

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

      {/* Thumbnail Gallery */}
      {projectData.screens_url && projectData.screens_url.length > 0 && (
        <ThumbnailGallery images={projectData.screens_url} />
      )}

      {/* Project Title & Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex gap-3 sm:gap-4 items-center my-6 sm:my-8 mt-6 flex-wrap">
          <MoreVertical
            className="text-light-subtitle dark:text-dark-subtitle"
            aria-hidden="true"
          />
          <h1 className="title mb-0 text-xl sm:text-2xl md:text-3xl lg:text-5xl break-words">
            {projectData.title}
          </h1>
          {projectData.company && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-light-secondary/80 dark:bg-dark-secondary/80 border border-light-border/80 dark:border-dark-border text-xs font-medium text-light-subtitle dark:text-dark-subtitle backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              @ {projectData.company}
            </div>
          )}
          {projectData.badge && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-light-secondary/80 dark:bg-dark-secondary/80 border border-light-border/80 dark:border-dark-border text-xs font-medium text-light-subtitle dark:text-dark-subtitle backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              {projectData.badge}
            </div>
          )}
        </div>
        {Array.isArray(projectData.detailGroups) &&
        projectData.detailGroups.length > 0 ? (
          <div className="mx-0 sm:mx-2 grid gap-4 mt-4 sm:grid-cols-2">
            {projectData.detailGroups.map((group, gi) => (
              <motion.div
                key={gi}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: gi * 0.06 }}
                className="rounded-2xl p-5 bg-light-secondary/70 dark:bg-dark-secondary/60 border border-light-border/60 dark:border-dark-border hover:border-light-blue/40 dark:hover:border-dark-blue/40 transition-colors"
              >
                <h3 className="flex items-center gap-2.5 mb-3 text-base sm:text-lg font-bold text-light-title dark:text-dark-title">
                  <span className="w-2 h-2 rounded-full bg-light-blue dark:bg-dark-blue flex-shrink-0" />
                  {group.title}
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {group.items.map((item, ii) => (
                    <li
                      key={ii}
                      className="flex items-start gap-2.5 text-sm sm:text-base text-light-subtitle dark:text-dark-subtitle leading-7"
                    >
                      <CheckCircle2
                        size={16}
                        className="mt-1 flex-shrink-0 text-light-blue dark:text-dark-blue"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        ) : (
          <ul className="mx-0 sm:mx-2 grid gap-3 mt-4 sm:grid-cols-2">
            {parseDetails(projectData.details).map((sentence, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="flex items-start gap-3 rounded-xl p-4 bg-light-secondary/70 dark:bg-dark-secondary/60 border border-light-border/60 dark:border-dark-border hover:border-light-blue/40 dark:hover:border-dark-blue/40 transition-colors"
              >
                <CheckCircle2
                  size={18}
                  className="mt-0.5 flex-shrink-0 text-light-blue dark:text-dark-blue"
                />
                <span className="text-sm sm:text-base text-light-title/90 dark:text-dark-title/90 leading-7">
                  {sentence}
                </span>
              </motion.li>
            ))}
          </ul>
        )}
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
        {projectData.live && projectData.live !== "#" && (
          <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <a
              href={projectData.live}
              className="relative py-1.5 px-3 sm:py-2 sm:px-6 backdrop-blur-sm border border-light-border/80 dark:border-dark-border bg-light-secondary/85 dark:bg-dark-secondary/85 text-light-title dark:text-dark-title rounded-full flex gap-2 sm:gap-4 items-center justify-between text-xs sm:text-sm md:text-base shadow-[0_12px_32px_rgb(15_23_42_/_0.05)] hover:border-light-blue/40 dark:hover:border-dark-blue/40"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Go to live demo</span>
              <ExternalLink size={16} className="sm:w-5 sm:h-5" />
              <div className="absolute inset-x-0 h-px -bottom-px bg-gradient-to-r w-2/3 sm:w-3/4 mx-auto from-transparent via-orange-300 to-transparent" />
            </a>
          </motion.li>
        )}

        {/* Code Repo */}
        {projectData.repo && projectData.repo !== "#" && (
          <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <a
              href={projectData.repo}
              className="relative py-1.5 px-3 sm:py-2 sm:px-6 backdrop-blur-sm border border-light-border/80 dark:border-dark-border bg-light-secondary/85 dark:bg-dark-secondary/85 text-light-title dark:text-dark-title rounded-full flex gap-2 sm:gap-4 items-center justify-between text-xs sm:text-sm md:text-base shadow-[0_12px_32px_rgb(15_23_42_/_0.05)] hover:border-light-blue/40 dark:hover:border-dark-blue/40"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Go to Code</span>
              <GithubIcon size={16} className="sm:w-5 sm:h-5" />
              <div className="absolute inset-x-0 h-px -bottom-px bg-gradient-to-r w-2/3 sm:w-3/4 mx-auto from-transparent via-red-300 to-transparent" />
            </a>
          </motion.li>
        )}
      </motion.ul>
    </motion.div>
  );
};

export default ProjectDetails;
