import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
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
    hidden: { opacity: 0, x: -60, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 12, duration: 0.8 },
    },
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  };

  return (
    <section id="education" className="my-12 w-full">
      <motion.div
        className="flex gap-3 items-center mb-6 text-xl sm:text-2xl md:text-3xl lg:text-4xl"
        variants={headerVariants}
      >
        <motion.div
          whileHover={{
            rotate: [0, -10, 10, -10, 0],
            transition: { duration: 0.5 },
          }}
        >
          <GraduationCap
            className="text-blue-600 dark:text-blue-400"
            aria-hidden="true"
            size={32}
          />
        </motion.div>
        <h1 className="font-bold text-light-title dark:text-dark-title mb-0">
          {education.title}
        </h1>
      </motion.div>

      <motion.div className="my-8" variants={cardVariants}>
        <div className="p-4 sm:p-6 rounded-lg bg-light-bgHeader dark:bg-dark-bgHeader">
          <motion.h3
            className="
              text-base sm:text-lg md:text-xl lg:text-2xl
              font-semibold text-light-title dark:text-dark-title mb-2
            "
            variants={listItemVariants}
          >
            {education.items[0]?.university}
          </motion.h3>

          <motion.p
            className="text-sm sm:text-base md:text-lg text-light-subtitle dark:text-dark-subtitle mb-4"
            variants={listItemVariants}
          >
            Bachelor of Science in Computer Science
          </motion.p>

          <motion.div className="space-y-2 text-light-subtitle dark:text-dark-subtitle">
            <motion.p
              className="text-xs sm:text-sm md:text-base"
              variants={listItemVariants}
            >
              • {education.grade}:{" "}
              <span className="text-green-600 dark:text-green-400 font-medium">
                {education.items[0]?.grade}
              </span>
            </motion.p>

            <motion.p
              className="text-xs sm:text-sm md:text-base"
              variants={listItemVariants}
            >
              {education.items[0]?.duration}
            </motion.p>

            <motion.p
              className="font-medium text-sm sm:text-base md:text-lg"
              variants={listItemVariants}
            >
              • {education.relevantCoursework}:
            </motion.p>

            <motion.ul className="list-disc pl-6 sm:pl-8 space-y-1">
              {education.items[0]?.relevantCoursework.map((course, index) => (
                <motion.li
                  key={index}
                  variants={listItemVariants}
                  custom={index}
                  className="
                    text-xs sm:text-sm md:text-base
                    hover:text-blue-600 dark:hover:text-blue-400 
                    transition-colors duration-200
                  "
                >
                  {course}
                </motion.li>
              ))}
            </motion.ul>

            <motion.p
              className="mt-4 font-medium text-sm sm:text-base md:text-lg"
              variants={listItemVariants}
            >
              • {education.graduationProject}:{" "}
              <span className="text-blue-600 dark:text-blue-400">
                {education.items[0]?.projectTitle}
              </span>
            </motion.p>

            <motion.p
              className="pl-4 text-xs sm:text-sm md:text-base"
              variants={listItemVariants}
            >
              • {education.grade}:{" "}
              <span className="text-green-600 dark:text-green-400 font-medium">
                {education.items[0]?.projectGrade}
              </span>
            </motion.p>

            <motion.p
              className="pl-4 mt-2 leading-relaxed text-xs sm:text-sm md:text-base"
              variants={listItemVariants}
            >
              {education.items[0]?.projectDescription}
            </motion.p>

            <motion.ul className="list-disc pl-6 sm:pl-10 space-y-2 mt-2">
              {education.items[0]?.projectFeatures.map((feature, index) => (
                <motion.li
                  key={index}
                  variants={listItemVariants}
                  custom={index}
                  className="
                    text-xs sm:text-sm md:text-base
                    hover:text-blue-600 dark:hover:text-blue-400 
                    transition-colors duration-200
                  "
                >
                  {feature}
                </motion.li>
              ))}
            </motion.ul>

            <motion.p
              className="
                pl-4 mt-2 italic 
                text-xs sm:text-sm md:text-base 
                font-medium text-blue-600/80 dark:text-blue-400/80
              "
              variants={listItemVariants}
            >
              {education.items[0]?.projectNote}
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Education;
