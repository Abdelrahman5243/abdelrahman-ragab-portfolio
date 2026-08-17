import { useRef, lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { motion, useInView } from "framer-motion";
import { mySkills } from "./skillsData.js";

const TechMarquee = lazy(() => import("./TechMarquee"));
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
  "Core Languages": Code2,
  "Frameworks & Libraries": Layers,
  Styling: Palette,
  "GraphQL & API": Zap,
  "Routing & i18n": Globe,
  "E-Commerce & CMS": ShoppingCart,
  "Animation & UI": Sparkles,
  "Data & Charts": BarChart2,
  Tooling: Wrench,
  "Soft Skills": Heart,
};

const groupVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: "easeOut" },
  }),
};

const itemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.025, duration: 0.25, ease: "easeOut" },
  }),
};

const Skills = () => {
  const { t, i18n } = useTranslation("main");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isAr = i18n.language === "ar";

  return (
    <section id="skills" ref={ref} className="my-16 w-full" aria-labelledby="skills-title">
      <motion.div
        className="flex gap-4 items-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
      >
        <RocketIcon className="text-light-blue dark:text-dark-blue" size={28} aria-hidden="true" />
        <h2 id="skills-title" className="title mb-0">
          {t("skillsTitle")}
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-5">
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
                group relative overflow-hidden rounded-2xl h-full
                border border-light-border dark:border-dark-border
                bg-light-secondary/80 dark:bg-dark-secondary/80
                hover:border-light-blue/40 dark:hover:border-dark-blue/40
                transition-colors duration-300 p-5
              "
            >
              <div
                className="
                absolute inset-0 opacity-0 group-hover:opacity-100
                transition-opacity duration-300 pointer-events-none
                bg-[radial-gradient(ellipse_at_top_left,rgb(var(--accent-light-rgb)/0.05),transparent_60%)]
                dark:bg-[radial-gradient(ellipse_at_top_left,rgb(var(--accent-dark-rgb)/0.06),transparent_60%)]
              "
              />

              {/* Category header */}
              <div className="relative flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <Icon
                    size={15}
                    className="text-light-blue dark:text-dark-blue flex-shrink-0"
                    aria-hidden="true"
                  />
                  <p className="text-xs font-semibold tracking-wider uppercase text-light-subtitle dark:text-dark-subtitle leading-tight">
                    {label}
                  </p>
                </div>
                <span className="text-[11px] font-medium text-light-subtitle/70 dark:text-dark-subtitle/70 tabular-nums">
                  {group.items.length}
                </span>
              </div>
              <div className="relative h-px w-8 bg-light-blue dark:bg-dark-blue mb-4" />

              {/* Skill list */}
              <ul className="relative flex flex-col gap-2">
                {group.items.map((skill, si) => (
                  <motion.li
                    key={skill}
                    custom={gi * 6 + si}
                    variants={itemVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="flex items-center gap-2.5 text-sm sm:text-base text-light-title dark:text-dark-title"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-light-blue/60 dark:bg-dark-blue/60 flex-shrink-0" />
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>

      {isInView && (
        <Suspense fallback={<div className="h-[46px] mt-10" />}>
          <TechMarquee />
        </Suspense>
      )}
    </section>
  );
};

export default Skills;
