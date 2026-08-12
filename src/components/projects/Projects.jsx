import ProjectCard from "./ProjectCard";
import "./projects.css";
import { useTranslation } from "react-i18next";
import { Workflow } from "lucide-react";

const Projects = () => {
  const { t } = useTranslation("main");

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
    <section
      id="projects"
      className="w-full mx-auto my-16"
      aria-labelledby="projects-title"
    >
      <div className="flex items-center gap-4 mb-14 text-2xl sm:text-3xl md:text-4xl">
        <Workflow
          className="text-light-subtitle dark:text-dark-subtitle"
          aria-hidden="true"
        />
        <h2 id="projects-title" className="title mb-0 leading-tight">
          {t("navigation.projects")}
        </h2>
      </div>

      <div
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        role="tabpanel"
        aria-labelledby="projects-title"
      >
        {myProjects.map((project) => (
          <ProjectCard key={project.id} id={project.id} project={{ ...project }} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
