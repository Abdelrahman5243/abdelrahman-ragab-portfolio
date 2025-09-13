import { AnimatePresence, motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import "./projects.css";
import { useTranslation } from "react-i18next";
import { Workflow } from "lucide-react";

const Projects = () => {
  const { t } = useTranslation("main");

  const projectsData = t("projects", { returnObjects: true });

  const myProjects = Object.keys(projectsData).map((id) => ({
    id,
    ...projectsData[id],
  }));

  return (
    <section
      id="projects"
      className="w-full mx-auto my-8 bg-light-secondary dark:bg-dark-secondary"
      aria-labelledby="projects-title"
    >
      <div className="flex gap-4 items-center text-2xl sm:text-3xl md:text-4xl mb-14">
        <Workflow
          className="text-light-subtitle dark:text-dark-subtitle"
          aria-hidden="true"
        />
        <h1 id="projects-title" className="title leading-tight mb-0">
          {t("navigation.projects")}
        </h1>
      </div>

      <div
        className="flex flex-wrap gap-6 justify-center"
        role="tabpanel"
        aria-labelledby="projects-title"
      >
        <AnimatePresence mode="wait">
          {myProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  delay: index * 0.1, // stagger
                },
              }}
              exit={{
                opacity: 0,
                y: -20,
                transition: { duration: 0.3 },
              }}
              whileHover={{
                scale: 1.03,
                transition: { type: "spring", stiffness: 300 },
              }}
              className="
                flex-grow
                basis-full 
                sm:basis-[47%] 
                lg:basis-[31%]
                bg-light-bgHeader dark:bg-dark-bgHeader 
                flex flex-col justify-between
                rounded-lg shadow-sm
              "
              aria-labelledby={`project-${project.id}-title`}
              aria-describedby={`project-${project.id}-description`}
            >
              <ProjectCard id={project.id} project={{ ...project }} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
