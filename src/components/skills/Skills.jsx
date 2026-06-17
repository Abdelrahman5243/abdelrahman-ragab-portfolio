import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion, useInView } from "framer-motion";
import { mySkills } from "./skillsData.js";
import {
  RocketIcon,
  Code2,
  Layers,
  Palette,
  Zap,
  Globe,
  ShoppingCart,
  Sparkles,
  BarChart2,
  Wrench,
  Heart,
} from "lucide-react";

const categoryIcons = {
  "Core Languages":         Code2,
  "Frameworks & Libraries": Layers,
  "Styling":                Palette,
  "GraphQL & API":          Zap,
  "Routing & i18n":         Globe,
  "E-Commerce & CMS":       ShoppingCart,
  "Animation & UI":         Sparkles,
  "Data & Charts":          BarChart2,
  "Tooling":                Wrench,
  "Soft Skills":            Heart,
};

const groupVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.4, ease: "easeOut" },
  }),
};

const chipVariants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.03, duration: 0.25, ease: "easeOut" },
  }),
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
      className="my-12 w-full"
      aria-labelledby="skills-title"
    >
      <motion.div
        className="flex gap-4 items-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
      >
        <RocketIcon
          className="text-light-blue dark:text-dark-blue"
          size={28}
          aria-hidden="true"
        />
        <h1 id="skills-title" className="title mb-0">
          {t("skillsTitle")}
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4">
        {mySkills.map((group, gi) => {
          const Icon = categoryIcons[group.category] ?? Code2;
          const label = isAr ? group.categoryAr : group.category;

          return (
            <motion.div
              key={group.category}
              custom={gi}
              variants={groupVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="
                group relative overflow-hidden rounded-2xl
                border border-light-border/80 dark:border-dark-border
                bg-light-secondary/80 dark:bg-dark-secondary/80
                hover:border-light-blue/20 dark:hover:border-dark-blue/20
                hover:shadow-[0_0_0_1px_rgb(var(--accent-light-rgb)/0.08),0_6px_24px_rgb(var(--accent-light-rgb)/0.06)]
                dark:hover:shadow-[0_0_0_1px_rgb(var(--accent-dark-rgb)/0.12),0_6px_24px_rgb(var(--accent-dark-rgb)/0.08)]
                transition-all duration-300 p-5
              "
            >
              {/* Accent glow */}
              <div className="
                absolute inset-0 opacity-0 group-hover:opacity-100
                transition-opacity duration-300 pointer-events-none
                bg-[radial-gradient(ellipse_at_top_left,rgb(var(--accent-light-rgb)/0.04),transparent_60%)]
                dark:bg-[radial-gradient(ellipse_at_top_left,rgb(var(--accent-dark-rgb)/0.05),transparent_60%)]
              " />

              {/* Category header */}
              <div className="flex items-center gap-2.5 mb-4">
                <span className="
                  w-8 h-8 flex items-center justify-center flex-shrink-0
                  rounded-lg
                  bg-light-blue/10 dark:bg-dark-blue/10
                ">
                  <Icon
                    size={15}
                    className="text-light-blue dark:text-dark-blue"
                    aria-hidden="true"
                  />
                </span>
                <p className="text-xs font-semibold tracking-wider uppercase text-light-subtitle dark:text-dark-subtitle leading-tight">
                  {label}
                </p>
              </div>

              {/* Chips */}
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill, si) => (
                  <motion.span
                    key={skill}
                    custom={gi * 6 + si}
                    variants={chipVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="
                      text-xs px-2.5 py-1 rounded-lg
                      border border-light-border dark:border-dark-border
                      bg-light-primary/60 dark:bg-dark-primary/60
                      text-light-subtitle dark:text-dark-subtitle
                      hover:border-light-blue/50 dark:hover:border-dark-blue/50
                      hover:text-light-title dark:hover:text-dark-title
                      transition-all duration-150 cursor-default select-none
                    "
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;
