import { motion } from "framer-motion";
import { Briefcase, MapPin, Calendar } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  sectionHeaderVariants,
  sectionCardVariants,
  listItemVariants,
} from "../animations/variants";

const typeColors = {
  "full-time": "text-light-blue dark:text-dark-blue bg-light-blue/10 dark:bg-dark-blue/10",
  trainee: "text-purple-500 dark:text-purple-400 bg-purple-500/10 dark:bg-purple-400/10",
  training: "text-green-600 dark:text-green-400 bg-green-600/10 dark:bg-green-400/10",
};

const typeLabels = {
  "full-time": "Full-time",
  trainee: "Trainee",
  training: "Training",
};

const Experience = () => {
  const { t } = useTranslation("main");
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
          <div className="absolute inset-0 bg-light-blue dark:bg-dark-blue opacity-20 blur-xl rounded-full" />
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
        <div className="absolute start-[11px] top-2 bottom-2 w-0.5 bg-light-border dark:bg-dark-border hidden sm:block" />

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
              <div className="absolute start-0 top-6 w-[23px] h-[23px] rounded-full bg-light-blue dark:bg-dark-blue border-4 border-light-primary dark:border-dark-primary hidden sm:block" />

              <div className="
                p-5 sm:p-6 rounded-2xl
                bg-light-secondary dark:bg-dark-secondary
                border border-light-border dark:border-dark-border
                shadow-sm
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
                          bg-light-bgHeader dark:bg-dark-bgHeader
                          border border-light-border/50 dark:border-dark-border/50
                        "
                      >
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <p className="text-sm sm:text-base font-semibold text-light-title dark:text-dark-title">
                            {project.name}
                          </p>
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
                              className="flex items-start gap-2 text-sm text-light-subtitle dark:text-dark-subtitle"
                            >
                              <span className="text-light-blue dark:text-dark-blue mt-1 flex-shrink-0">▸</span>
                              <span>{ach}</span>
                            </motion.li>
                          ))}
                        </ul>
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
