import React from "react";
import { useTranslation } from "react-i18next";

const mySkills = [
  "JavaScript",
  "React",
  "Redux Toolkit",
  "CSS3",
  "HTML5",
  "Responsive Design",
  "Tailwind CSS",
  "Version Control (Git)",
  "GitHub",
  "Framer Motion",
  "Lottie Animations",
];

const Skills = () => {
  const { t } = useTranslation("main");

  return (
    <div>
      <div id="skills" className="my-8 w-full">
        <h1 className="title">
          {t("skillsTitle")}
        </h1>
        <div className="flex flex-wrap gap-4 pl-5 dark:text-dark-subtitle text-light-subtitle">
          {mySkills.map((skill, index) => (
            <span
              key={index}
              className="mb-2 px-4 py-2 rounded-xl border border-light-border dark:border-dark-border"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
