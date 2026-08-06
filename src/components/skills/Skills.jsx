import { useRef, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { motion, useInView } from "framer-motion";
import { techSkills, softSkills } from "./skillsData.js";
import "./skills.css";
import SectionHeader from "../SectionHeader";

const tileVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.02, duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  }),
};

const TechIcon = ({ icon, name }) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <span className="skill-tile-fallback" aria-hidden="true">{name.slice(0, 2).toUpperCase()}</span>;
  }

  return (
    <img
      src={icon}
      alt=""
      aria-hidden="true"
      loading="lazy"
      className="skill-tile-icon"
      onError={() => setFailed(true)}
    />
  );
};

TechIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const Skills = () => {
  const { t, i18n } = useTranslation("main");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isAr = i18n.language === "ar";

  return (
    <section
      id="skills"
      ref={ref}
      className="section-block w-full"
      aria-labelledby="skills-title"
    >
      <SectionHeader id="skills-title" title={t("skillsTitle")} eyebrow="01 / TECHNOLOGIES" />

      <div className="skills-tile-grid">
        {techSkills.map((tech, i) => (
          <motion.div
            key={tech.name}
            custom={i}
            variants={tileVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={`skill-tile ${tech.weight === "primary" ? "skill-tile-primary" : ""}`}
          >
            <span className="skill-tile-icon-wrap">
              <TechIcon icon={tech.icon} name={tech.name} />
            </span>
            <span className="skill-tile-name">{tech.name}</span>
          </motion.div>
        ))}
      </div>

      <div className="skills-soft-row">
        {softSkills.map((skill) => (
          <span key={skill.name} className="skills-soft-chip">
            {isAr ? skill.nameAr : skill.name}
          </span>
        ))}
      </div>
    </section>
  );
};

export default Skills;
