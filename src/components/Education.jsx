import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap } from "lucide-react";

const Education = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -200px 0px" });

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
    hidden: {
      opacity: 0,
      y: -30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      x: -60,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.8,
      },
    },
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <motion.section
      id="education"
      className="my-8"
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.div
        className="flex gap-4 items-center mb-4 text-3xl"
        variants={headerVariants}
      >
        <motion.div
          whileHover={{
            rotate: [0, -10, 10, -10, 0],
            transition: { duration: 0.5 },
          }}
        >
          <GraduationCap className="section-title" aria-hidden="true" />
        </motion.div>
        <h1 className="title mb-0">Education</h1>
      </motion.div>

      <motion.div className="my-8" variants={cardVariants}>
        <motion.div
          className="mb-6 p-6 rounded-lg bg-light-bgHeader dark:bg-dark-bgHeader"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <motion.h3
            className="text-xl font-semibold text-light-title dark:text-dark-title mb-2"
            variants={listItemVariants}
          >
            Faculty of Engineering,
            <span className="text-blue-600 dark:text-blue-400">
              Zagazig University
            </span>
          </motion.h3>
          <motion.p
            className="text-lg text-light-subtitle dark:text-dark-subtitle mb-4"
            variants={listItemVariants}
          >
            Bachelor of Science in
            <span className="text-blue-600 dark:text-blue-400">
              Computer Science
            </span>
          </motion.p>
          <motion.div
            className="space-y-2 text-light-subtitle dark:text-dark-subtitle"
            variants={containerVariants}
          >
            <motion.p variants={listItemVariants}>
              • Grade:
              <span className="text-green-600 dark:text-green-400 font-medium">
                Very Good
              </span>
            </motion.p>
            <motion.p variants={listItemVariants}>
              • Duration: 2019 - 2024
            </motion.p>
            <motion.p variants={listItemVariants} className="font-medium">
              • Relevant Coursework:
            </motion.p>
            <motion.ul className="list-disc pl-8 space-y-1">
              {[
                "Data Structures and Algorithms",
                "Object-Oriented Programming",
                "Database Management Systems",
                "Web Development",
                "Software Engineering",
                "Computer Networks",
              ].map((course, index) => (
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
              • Graduation Project:
              <span className="text-blue-600 dark:text-blue-400">
                Website Builder Platform
              </span>
            </motion.p>
            <motion.p className="pl-8 text-sm" variants={listItemVariants}>
              Grade:
              <span className="text-green-600 dark:text-green-400 font-medium">
                Excellent
              </span>
            </motion.p>
            <motion.p
              className="pl-8 mt-2 leading-relaxed"
              variants={listItemVariants}
            >
              Developed a comprehensive website builder platform that enables
              users to create and customize websites with ease. The platform
              features a
              <span className="text-blue-600 dark:text-blue-400">
                bilingual interface (Arabic/English)
              </span>
              and includes:
            </motion.p>
            <motion.ul className="list-disc pl-12 space-y-2 mt-2">
              {[
                "Real-time website customization and preview",
                "AI-powered content generation capabilities",
                "Flexible section management and arrangement",
                "Multiple template options and style customization",
                "Responsive design implementation",
                "User-friendly interface for content management",
              ].map((feature, index) => (
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
              This project demonstrated proficiency in modern web development
              practices, multilingual support, and advanced user interface
              design principles.
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Education;
