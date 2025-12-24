import { motion } from "framer-motion";
import { GraduationCap, Award, Calendar, BookOpen } from "lucide-react";
import { useTranslation } from "react-i18next";

const Education = () => {
  const { t } = useTranslation("main");
  const education = t("education", { returnObjects: true });

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15, duration: 0.6 },
    },
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 120, damping: 12 },
    },
  };

  return (
    <section id="education" className="my-16 w-full">
      <motion.div
        className="flex gap-3 items-center mb-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={headerVariants}
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
          <GraduationCap
            className="relative text-light-blue dark:text-dark-blue"
            aria-hidden="true"
            size={36}
          />
        </motion.div>
        <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl text-light-title dark:text-dark-title">
          {education.title}
        </h2>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={cardVariants}
        className="group"
      >
        <div className="
          relative p-6 sm:p-8 rounded-2xl
          bg-light-secondary dark:bg-dark-secondary
          border border-light-border dark:border-dark-border
          shadow-sm
          transition-all duration-300
          overflow-hidden
        ">

          <motion.h3
            className="
              text-lg sm:text-xl md:text-2xl
              font-bold text-light-title dark:text-dark-title 
              mb-2
            "
            variants={listItemVariants}
          >
            {education.items[0]?.university}
          </motion.h3>

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
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6"
            variants={listItemVariants}
          >
            <div className="
              flex items-center gap-3 p-3 rounded-lg
              bg-light-bgHeader dark:bg-dark-bgHeader
              border border-light-border/50 dark:border-dark-border/50
            ">
              <Award className="text-green-600 dark:text-green-400 flex-shrink-0" size={20} />
              <div>
                <p className="text-xs text-light-subtitle dark:text-dark-subtitle">
                  {education.grade}
                </p>
                <p className="text-sm sm:text-base font-semibold text-green-600 dark:text-green-400">
                  {education.items[0]?.grade}
                </p>
              </div>
            </div>

            <div className="
              flex items-center gap-3 p-3 rounded-lg
              bg-light-bgHeader dark:bg-dark-bgHeader
              border border-light-border/50 dark:border-dark-border/50
            ">
              <Calendar className="text-light-blue dark:text-dark-blue flex-shrink-0" size={20} />
              <div>
                <p className="text-xs text-light-subtitle dark:text-dark-subtitle">Duration</p>
                <p className="text-sm sm:text-base font-semibold text-light-title dark:text-dark-title">
                  {education.items[0]?.duration}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="mb-6"
            variants={listItemVariants}
          >
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="text-light-blue dark:text-dark-blue" size={20} />
              <h4 className="font-semibold text-base sm:text-lg text-light-title dark:text-dark-title">
                {education.relevantCoursework}
              </h4>
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
                    hover:text-light-blue dark:hover:text-dark-blue
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
            <div className="
              p-5 rounded-xl
              bg-gradient-to-br from-light-bgHeader to-light-primary
              dark:from-dark-bgHeader dark:to-dark-primary
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
                text-light-blue dark:text-dark-blue 
                mb-3
              ">
                {education.items[0]?.projectTitle}
              </p>

              <div className="flex items-center gap-2 mb-4">
                <Award className="text-green-600 dark:text-green-400" size={18} />
                <span className="text-sm text-light-subtitle dark:text-dark-subtitle">
                  {education.grade}:
                </span>
                <span className="text-sm font-semibold text-green-600 dark:text-green-400">
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
                      hover:text-light-blue dark:hover:text-dark-blue
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
                  text-light-blue/80 dark:text-dark-blue/80
                  border-l-2 border-light-blue dark:border-dark-blue
                  pl-4 py-2
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
