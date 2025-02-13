import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion, useInView } from "framer-motion";
import { mySkills } from "./skillsData.js";
import { RocketIcon } from "lucide-react";

const Skills = () => {
  const { t } = useTranslation("main");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      id="skills"
      ref={ref}
      className="my-12 w-full"
      aria-labelledby="skills-title"
    >
      <div className="flex gap-4 items-center mb-8 text-3xl">
        <RocketIcon
          className="text-light-subtitle dark:text-dark-subtitle"
          aria-hidden="true"
        />
        <h1 id="skills-title" className="title mb-0">
          {t("skillsTitle")}
        </h1>
      </div>
      <div className="flex flex-wrap gap-4 pl-5 dark:text-dark-subtitle text-light-subtitle">
        {mySkills.map((skill, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              delay: index * 0.08,
              duration: 0.4,
              ease: "easeOut",
            }}
            className="mb-2 px-4 py-2 rounded-xl border border-light-border dark:border-dark-border
              hover:bg-light-border/10 dark:hover:bg-dark-border/10 
              transition-colors duration-200 cursor-default"
            role="listitem"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </section>
  );
};

export default Skills;
