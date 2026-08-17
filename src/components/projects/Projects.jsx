import ProjectCard from "./ProjectCard";
import "./projects.css";
import { useTranslation } from "react-i18next";
import { motion, useReducedMotion } from "framer-motion";
import { Workflow } from "lucide-react";
import { getProjectSlug } from "../../data/projectSlugs";

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: index * 0.07,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const Projects = () => {
  const { t } = useTranslation("main");
  const shouldReduceMotion = useReducedMotion();

  const projectsData = t("projects", { returnObjects: true });

  const rank = (project) => {
    if (project.featured) return 2;
    if (project.company) return 1;
    return 0;
  };

  const myProjects = Object.keys(projectsData)
    .map((id) => ({ id, ...projectsData[id] }))
    .sort((a, b) => rank(b) - rank(a));

  return (
    <motion.section
      id="projects"
      className="w-full mx-auto my-16"
      aria-labelledby="projects-title"
      variants={sectionVariants}
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView={shouldReduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.12 }}
    >
      <motion.div
        className="flex items-center gap-4 mb-14 text-2xl sm:text-3xl md:text-4xl"
        variants={shouldReduceMotion ? undefined : sectionVariants}
      >
        <Workflow className="text-light-subtitle dark:text-dark-subtitle" aria-hidden="true" />
        <h2 id="projects-title" className="title mb-0 leading-tight">
          {t("navigation.projects")}
        </h2>
      </motion.div>

      <div
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        role="tabpanel"
        aria-labelledby="projects-title"
      >
        {myProjects.map((project, index) => (
          <motion.div
            key={project.id}
            custom={index}
            variants={shouldReduceMotion ? undefined : cardVariants}
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView={shouldReduceMotion ? undefined : "visible"}
            viewport={{ once: true, amount: 0.15 }}
            whileHover={shouldReduceMotion ? undefined : { y: -5 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <ProjectCard
              id={project.id}
              slug={project.slug || getProjectSlug(project.id)}
              project={{ ...project }}
            />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Projects;
