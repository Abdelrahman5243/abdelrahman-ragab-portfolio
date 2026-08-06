import { motion } from "framer-motion";
import { Award, Calendar, BookOpen } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  sectionCardVariants,
  listItemVariants,
} from "../animations/variants";
import SectionHeader from "./SectionHeader";
import "./experience.css";

const Education = () => {
  const { t } = useTranslation("main");
  const education = t("education", { returnObjects: true });

  return (
    <section id="education" className="education-section section-block w-full">
      <SectionHeader title={education.title} eyebrow="04 / EDUCATION" layout="stacked" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={sectionCardVariants}
        className="education-card group"
      >
        <div className="education-card-surface
          relative p-6 sm:p-8 rounded-2xl
          bg-light-secondary dark:bg-dark-secondary
          border border-light-border dark:border-dark-border
          transition-all duration-300
          overflow-hidden
        ">

          <motion.h2
            id="education-institution"
            className="
              text-lg sm:text-xl md:text-2xl
              font-bold text-light-title dark:text-dark-title 
              mb-2
            "
            variants={listItemVariants}
          >
            {education.items[0]?.university}
          </motion.h2>

          <motion.p
            className="
              text-base sm:text-lg md:text-xl 
              text-light-subtitle dark:text-dark-subtitle 
              font-medium mb-6
            "
            variants={listItemVariants}
          >
            Bachelor of Science in Computer Science
          </motion.p>

          <motion.div
            className="education-facts grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6"
            variants={listItemVariants}
          >
            <div className="education-fact
              flex items-center gap-3 p-3 rounded-lg
              bg-light-primary dark:bg-dark-primary
              border border-light-border dark:border-dark-border
            ">
              <Award className="text-light-title dark:text-dark-title flex-shrink-0" size={20} />
              <div>
                <p className="text-sm text-light-subtitle dark:text-dark-subtitle">
                  {education.grade}
                </p>
                <p className="text-sm sm:text-base font-semibold text-light-title dark:text-dark-title">
                  {education.items[0]?.grade}
                </p>
              </div>
            </div>

            <div className="education-fact
              flex items-center gap-3 p-3 rounded-lg
              bg-light-primary dark:bg-dark-primary
              border border-light-border dark:border-dark-border
            ">
              <Calendar className="text-light-title dark:text-dark-title flex-shrink-0" size={20} />
              <div>
                <p className="text-sm text-light-subtitle dark:text-dark-subtitle">Duration</p>
                <p className="text-sm sm:text-base font-semibold text-light-title dark:text-dark-title">
                  {education.items[0]?.duration}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="education-coursework mb-6"
            variants={listItemVariants}
          >
            <div className="education-subheading flex items-center gap-2 mb-3">
              <BookOpen className="text-light-title dark:text-dark-title" size={20} />
              <h3 className="font-semibold text-base sm:text-lg text-light-title dark:text-dark-title">
                {education.relevantCoursework}
              </h3>
            </div>
            <motion.ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {education.items[0]?.relevantCoursework.map((course, index) => (
                <motion.li
                  key={index}
                  variants={listItemVariants}
                  custom={index}
                  className="
                    flex items-start gap-2
                    text-sm sm:text-base
                    text-light-subtitle dark:text-dark-subtitle
                    hover:text-light-title dark:hover:text-dark-title
                    transition-colors duration-200
                    cursor-default
                  "
                >
                  <span className="text-light-blue dark:text-dark-blue mt-1">•</span>
                  <span>{course}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <div className="h-px bg-light-border dark:bg-dark-border my-6" />

          <motion.div variants={listItemVariants}>
            <div className="education-project
              p-5 rounded-xl
              bg-light-primary dark:bg-dark-primary
              border border-light-border dark:border-dark-border
            ">
              <h4 className="
                font-semibold text-base sm:text-lg md:text-xl
                text-light-title dark:text-dark-title
                mb-3
              ">
                {education.graduationProject}
              </h4>

              <p className="
                text-base sm:text-lg font-semibold
                text-light-title dark:text-dark-title
                mb-3
              ">
                {education.items[0]?.projectTitle}
              </p>

              <div className="flex items-center gap-2 mb-4">
                <Award className="text-light-title dark:text-dark-title" size={18} />
                <span className="text-sm text-light-subtitle dark:text-dark-subtitle">
                  {education.grade}:
                </span>
                <span className="text-sm font-semibold text-light-title dark:text-dark-title">
                  {education.items[0]?.projectGrade}
                </span>
              </div>

              <p className="
                text-sm sm:text-base 
                text-light-subtitle dark:text-dark-subtitle 
                leading-relaxed mb-4
              ">
                {education.items[0]?.projectDescription}
              </p>

              <motion.ul className="space-y-2 mb-4">
                {education.items[0]?.projectFeatures.map((feature, index) => (
                  <motion.li
                    key={index}
                    variants={listItemVariants}
                    custom={index}
                    className="
                      flex items-start gap-2
                      text-sm sm:text-base
                      text-light-subtitle dark:text-dark-subtitle
                      hover:text-light-title dark:hover:text-dark-title
                      transition-colors duration-200
                    "
                  >
                    <span className="text-light-blue dark:text-dark-blue mt-1">▸</span>
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </motion.ul>

              {education.items[0]?.projectNote && (
                <p className="
                  text-sm sm:text-base
                  italic font-medium
                  text-light-subtitle dark:text-dark-subtitle
                  border-t border-light-border dark:border-dark-border
                  pt-3 mt-1
                ">
                  {education.items[0]?.projectNote}
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Education;
