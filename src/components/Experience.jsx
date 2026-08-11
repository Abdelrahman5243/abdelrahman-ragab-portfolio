import { motion } from "framer-motion";
import { Briefcase, MapPin, Calendar, ExternalLink, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  sectionHeaderVariants,
  sectionCardVariants,
  listItemVariants,
} from "../animations/variants";

const typeColors = {
  "full-time": "text-light-blue dark:text-dark-blue bg-light-blue/10 dark:bg-dark-blue/10",
  trainee: "text-light-blue dark:text-dark-blue bg-light-blue/10 dark:bg-dark-blue/10",
  training: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-400/10",
};

const typeLabels = {
  "full-time": "Full-time",
  trainee: "Trainee",
  training: "Training",
};

const Experience = () => {
  const { t, i18n } = useTranslation("main");
  const experience = t("experience", { returnObjects: true });

  return (
    <section id="experience" className="my-16 w-full">
      <motion.div
        className="flex gap-3 items-center mb-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionHeaderVariants}
      >
        <motion.div
          className="relative"
          whileHover={{
            rotate: [0, -10, 10, -10, 0],
            scale: 1.1,
            transition: { duration: 0.5 },
          }}
        >
          <div className="absolute inset-0 bg-light-blue dark:bg-dark-blue opacity-15 blur-xl rounded-full" />
          <Briefcase
            className="relative text-light-blue dark:text-dark-blue"
            aria-hidden="true"
            size={36}
          />
        </motion.div>
        <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl text-light-title dark:text-dark-title">
          {experience.title}
        </h2>
      </motion.div>

      <div className="relative">
        {/* Timeline line */}
          <div className="absolute start-[11px] top-2 bottom-2 w-0.5 bg-light-border/80 dark:bg-dark-border hidden sm:block" />

        <div className="space-y-6">
          {experience.items?.map((item, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={sectionCardVariants}
              className="sm:ps-8 relative"
            >
              {/* Timeline dot */}
              <div className="absolute start-0 top-6 w-[23px] h-[23px] rounded-full bg-light-blue dark:bg-dark-blue border-4 border-light-primary dark:border-dark-primary hidden sm:block shadow-[0_0_0_6px_rgb(var(--accent-light-rgb)_/_0.08)] dark:shadow-[0_0_0_6px_rgb(var(--accent-dark-rgb)_/_0.08)]" />

              <div className="
                p-5 sm:p-6 rounded-2xl
                bg-light-secondary/95 dark:bg-dark-secondary/95
                border border-light-border/80 dark:border-dark-border
                shadow-[0_18px_50px_rgb(15_23_42_/_0.05)]
                transition-all duration-300
              ">
                {/* Header row */}
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-light-title dark:text-dark-title">
                      {item.role}
                    </h3>
                    <p className="text-base font-semibold text-light-blue dark:text-dark-blue mt-0.5">
                      {item.company}
                    </p>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${typeColors[item.type] ?? typeColors["training"]}`}>
                    {typeLabels[item.type] ?? item.type}
                  </span>
                </div>

                {/* Meta row */}
                <div className="flex flex-wrap gap-4 mb-5">
                  <div className="flex items-center gap-1.5 text-sm text-light-subtitle dark:text-dark-subtitle">
                    <Calendar size={14} className="text-light-blue dark:text-dark-blue flex-shrink-0" />
                    <span>{item.period}</span>
                  </div>
                  {item.location && (
                    <div className="flex items-center gap-1.5 text-sm text-light-subtitle dark:text-dark-subtitle">
                      <MapPin size={14} className="text-light-blue dark:text-dark-blue flex-shrink-0" />
                      <span>{item.location}</span>
                    </div>
                  )}
                </div>

                {/* Projects (for full-time with sub-projects) */}
                {item.projects && (
                  <div className="space-y-4">
                    {item.projects.map((project, pIdx) => (
                      <motion.div
                        key={pIdx}
                        variants={listItemVariants}
                        className="
                          p-4 rounded-xl
                          bg-light-bgHeader/85 dark:bg-dark-bgHeader/85
                          border border-light-border/80 dark:border-dark-border
                        "
                      >
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          {project.link ? (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-sm sm:text-base font-semibold text-light-title dark:text-dark-title hover:text-light-blue dark:hover:text-dark-blue transition-colors"
                            >
                              <span>{project.name}</span>
                              <ExternalLink size={14} className="flex-shrink-0 opacity-70" />
                            </a>
                          ) : (
                            <p className="text-sm sm:text-base font-semibold text-light-title dark:text-dark-title">
                              {project.name}
                            </p>
                          )}
                          {project.inProgress && (
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full text-amber-600 dark:text-amber-400 bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/20 dark:border-amber-400/20">
                              In Progress
                            </span>
                          )}
                        </div>
                        <ul className="space-y-1.5">
                          {project.achievements.map((ach, aIdx) => (
                            <motion.li
                              key={aIdx}
                              variants={listItemVariants}
                              className="flex items-start gap-2 text-sm sm:text-base text-light-subtitle dark:text-dark-subtitle leading-7"
                            >
                              <span className="text-light-blue dark:text-dark-blue mt-1 flex-shrink-0">▸</span>
                              <span>{ach}</span>
                            </motion.li>
                          ))}
                        </ul>
                        {project.projectId && (
                          <Link
                            to={`project-details/${project.projectId}`}
                            className="group/btn mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-light-blue dark:text-dark-blue hover:gap-2.5 transition-all"
                          >
                            <span>{t("viewDetails")}</span>
                            <ArrowRight
                              size={15}
                              className={`flex-shrink-0 ${i18n.language === "ar" ? "rotate-180" : ""}`}
                            />
                          </Link>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Simple achievements (for trainee / training) */}
                {item.achievements && (
                  <motion.ul className="space-y-1.5">
                    {item.achievements.map((ach, aIdx) => (
                      <motion.li
                        key={aIdx}
                        variants={listItemVariants}
                        className="flex items-start gap-2 text-sm text-light-subtitle dark:text-dark-subtitle"
                      >
                        <span className="text-light-blue dark:text-dark-blue mt-1 flex-shrink-0">▸</span>
                        <span>{ach}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
