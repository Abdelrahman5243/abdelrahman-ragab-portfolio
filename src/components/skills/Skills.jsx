import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { HiOutlineRocketLaunch } from "react-icons/hi2";
import { motion, useInView } from "framer-motion";

const mySkills = [
  "JavaScript",
  "React",
  "Redux Toolkit",
  "Context API",
  "CSS3",
  "Tailwind CSS",
  "Bootstrap",
  "HTML5",
  "Responsive Design",
  "Version Control (Git)",
  "GitHub",
  "Framer Motion",
  "RESTful API",
  "Shadcn UI",
  "Axios",
  "React Router",
  "Vite",
  "Figma",
  "Chart.js",
  "TypeScript",
  "Problem-Solving",
  "Time Management",
  "Responsive Design",
  "Communication",
  "Agile Methodologies",
  "Collaboration",
];

const Skills = () => {
  const { t } = useTranslation("main");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div>
      <div id="skills" ref={ref} className="my-12 w-full">
        <div className="flex gap-4 items-center mb-8 text-3xl">
          <HiOutlineRocketLaunch
            className="text-light-subtitle dark:text-dark-subtitle"
            aria-hidden="true"
          />
          <h1 className="title mb-0">{t("skillsTitle")}</h1>
        </div>
        <div className="flex flex-wrap gap-4 pl-5 dark:text-dark-subtitle text-light-subtitle">
          {mySkills.map((skill, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="mb-2 px-4 py-2 rounded-xl border border-light-border dark:border-dark-border"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
