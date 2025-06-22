import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { useTranslation } from "react-i18next";

const Education = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -200px 0px" });
  const { t } = useTranslation("main"); 
  const education = t("education", { returnObjects: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

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
    <motion.section
      id="education"
      className="my-12 px-4 md:px-8"
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.div
        className="flex gap-4 items-center mb-6 text-3xl"
        variants={headerVariants}
      >
        <motion.div
          whileHover={{
            rotate: [0, -10, 10, -10, 0],
            transition: { duration: 0.5 },
          }}
        >
          <GraduationCap className="section-title text-blue-600 dark:text-blue-400" aria-hidden="true" />
        </motion.div>
        <h1 className="title text-light-title dark:text-dark-title mb-0">{education.title}</h1>
      </motion.div>

      <motion.div className="my-8" variants={cardVariants}>
        <motion.div
          className="p-6 rounded-lg bg-light-bgHeader dark:bg-dark-bgHeader"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <motion.h3
            className="text-xl font-semibold text-light-title dark:text-dark-title mb-2"
            variants={listItemVariants}
          >
            {education.items[0]?.university}
          </motion.h3>
          <motion.p
            className="text-lg text-light-subtitle dark:text-dark-subtitle mb-4"
            variants={listItemVariants}
          >
           Bachelor of Science in Computer Science
          </motion.p>

          <motion.div className="space-y-2 text-light-subtitle dark:text-dark-subtitle">
            <motion.p variants={listItemVariants}>
              • {education.grade}: 
              <span className="text-green-600 dark:text-green-400 font-medium">
                {education.items[0]?.grade}
              </span>
            </motion.p>
            <motion.p variants={listItemVariants}>
              {education.items[0]?.duration}
            </motion.p>
            <motion.p variants={listItemVariants} className="font-medium">
              • {education.relevantCoursework}:
            </motion.p>
            <motion.ul className="list-disc pl-8 space-y-1">
              {education.items[0]?.relevantCoursework.map((course, index) => (
                <motion.li
                  key={index}
                  variants={listItemVariants}
                  custom={index}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                >
                  {course}
                </motion.li>
              ))}
            </motion.ul>

            <motion.p className="mt-4 font-medium" variants={listItemVariants}>
              • {education.graduationProject}:
              <span className="text-blue-600 dark:text-blue-400">
                {education.items[0]?.projectTitle}
              </span>
            </motion.p>
            <motion.p className="pl-8 text-sm" variants={listItemVariants}>
              • {education.grade}:
              <span className="text-green-600 dark:text-green-400 font-medium">
                {education.items[0]?.projectGrade}
              </span>
            </motion.p>
            <motion.p className="pl-8 mt-2 leading-relaxed" variants={listItemVariants}>
              {education.items[0]?.projectDescription}
            </motion.p>
            <motion.ul className="list-disc pl-12 space-y-2 mt-2">
              {education.items[0]?.projectFeatures.map((feature, index) => (
                <motion.li
                  key={index}
                  variants={listItemVariants}
                  custom={index}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                >
                  {feature}
                </motion.li>
              ))}
            </motion.ul>
            <motion.p
              className="pl-8 mt-2 italic text-sm font-medium text-blue-600/80 dark:text-blue-400/80"
              variants={listItemVariants}
            >
              {education.items[0]?.projectNote}
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Education;
