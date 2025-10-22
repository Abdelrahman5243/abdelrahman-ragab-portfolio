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
      <div className="flex items-center gap-4 mb-14 text-2xl sm:text-3xl md:text-4xl">
        <Workflow
          className="text-light-subtitle dark:text-dark-subtitle"
          aria-hidden="true"
        />
        <h1 id="projects-title" className="title mb-0 leading-tight">
          {t("navigation.projects")}
        </h1>
      </div>

      <div
        className="grid gap-6 justify-items-center sm:grid-cols-2 lg:grid-cols-3"
        role="tabpanel"
        aria-labelledby="projects-title"
      >
          {myProjects.map((project, index) => (
            <div
              key={project.id}
              custom={index}
              className="flex flex-col justify-between w-full rounded-lg shadow-sm bg-light-bgHeader dark:bg-dark-bgHeader group"
              aria-labelledby={`project-${project.id}-title`}
              aria-describedby={`project-${project.id}-description`}
            >
              <ProjectCard id={project.id} project={{ ...project }} />
            </div>
          ))}
      </div>
    </section>
  );
};

export default Projects;
