import ProjectCard from "./ProjectCard";
import "./projects.css";
import { useTranslation } from "react-i18next";
import SectionHeader from "../SectionHeader";

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
      className="section-block w-full mx-auto"
      aria-labelledby="projects-title"
    >
      <SectionHeader
        id="projects-title"
        title={t("navigation.projects")}
        eyebrow="03 / SELECTED WORK"
        trailing={
          <span className="section-heading-count">{myProjects.length} projects</span>
        }
      />

      <div
        className="projects-grid"
        role="tabpanel"
        aria-labelledby="projects-title"
      >
          {myProjects.map((project) => (
            <article
              key={project.id}
              className="project-card"
              aria-labelledby={`project-${project.id}-title`}
              aria-describedby={`project-${project.id}-description`}
            >
              <ProjectCard id={project.id} project={{ ...project }} />
            </article>
          ))}
      </div>
    </section>
  );
};

export default Projects;
