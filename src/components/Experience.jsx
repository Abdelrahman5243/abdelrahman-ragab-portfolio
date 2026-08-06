import { motion } from "framer-motion";
import { MapPin, Calendar, ExternalLink, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  sectionCardVariants,
  listItemVariants,
} from "../animations/variants";
import SectionHeader from "./SectionHeader";
import "./experience.css";

const typeLabels = {
  "full-time": "Full-time",
  trainee: "Trainee",
  training: "Training",
};

const Experience = () => {
  const { t, i18n } = useTranslation("main");
  const experience = t("experience", { returnObjects: true });

  return (
    <section id="experience" className="experience-section section-block w-full">
      <SectionHeader title={experience.title} eyebrow="02 / EXPERIENCE" layout="aside" />

      <div className="experience-timeline relative">
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
              className="experience-item sm:ps-8 relative"
            >
              {/* Timeline dot */}
              <div className="absolute start-0 top-6 w-[23px] h-[23px] rounded-full bg-light-secondary dark:bg-dark-secondary border-2 border-light-title dark:border-dark-title hidden sm:flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-light-blue dark:bg-dark-blue" />
              </div>

              <div className="experience-card
                p-5 sm:p-6 rounded-2xl
                bg-light-secondary dark:bg-dark-secondary
                border border-light-border dark:border-dark-border
                transition-all duration-300
              ">
                {/* Header row */}
                <div className="experience-card-header flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <h3 className="experience-role text-lg sm:text-xl font-bold text-light-title dark:text-dark-title">
                      {item.role}
                    </h3>
                    <p className="experience-company text-base font-semibold text-light-subtitle dark:text-dark-subtitle mt-0.5">
                      {item.company}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border border-light-border dark:border-dark-border text-light-title dark:text-dark-title">
                    <span className="w-1.5 h-1.5 rounded-full bg-light-blue dark:bg-dark-blue flex-shrink-0" />
                    {typeLabels[item.type] ?? item.type}
                  </span>
                </div>

                {/* Meta row */}
                <div className="experience-meta flex flex-wrap gap-4 mb-5">
                  <div className="experience-meta-item flex items-center gap-1.5 text-sm text-light-subtitle dark:text-dark-subtitle">
                    <Calendar size={14} className="flex-shrink-0" />
                    <span>{item.period}</span>
                  </div>
                  {item.location && (
                    <div className="experience-meta-item flex items-center gap-1.5 text-sm text-light-subtitle dark:text-dark-subtitle">
                      <MapPin size={14} className="flex-shrink-0" />
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
                        className="experience-project"
                      >
                        <div className="experience-project-header flex flex-wrap items-center gap-2 mb-2">
                          {project.link ? (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-sm sm:text-base font-semibold text-light-title dark:text-dark-title hover:underline transition-colors"
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
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full border border-light-border dark:border-dark-border text-light-subtitle dark:text-dark-subtitle">
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
