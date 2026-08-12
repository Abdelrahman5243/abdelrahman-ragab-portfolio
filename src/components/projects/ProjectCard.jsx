import { useState } from "react";
import { Github, ExternalLink, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SkeletonLoader from "../spinner/SkeletonLoader";
import { external_link_click } from "../../analytics";

const ProjectCard = ({ project, id }) => {
  const { i18n } = useTranslation("main");
  const language = i18n.language;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <Link
      to={`/project-details/${id}`}
      aria-labelledby={`project-${id}-title`}
      aria-describedby={`project-${id}-description`}
      className="
        group flex flex-col h-full w-full overflow-hidden rounded-2xl
        border border-light-border dark:border-dark-border
        bg-light-secondary/90 dark:bg-dark-secondary/90
        transition-colors duration-300
        hover:border-light-blue/60 dark:hover:border-dark-blue/60
      "
    >
      <div className="w-full h-40 sm:h-48 md:h-56 lg:h-64 overflow-hidden relative">
        {(!imageLoaded || imageError) && (
          <div className="absolute inset-0 z-10">
            <SkeletonLoader />
          </div>
        )}
        {!imageError && (
          <img
            src={project.image_url}
            alt={project.title}
            width={1280}
            height={720}
            className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105"
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        )}

        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/25 to-transparent pointer-events-none" />

        {(project.company || project.badge) && (
          <div className="absolute top-3 left-3 z-20 flex flex-col items-start gap-1.5">
            {project.company && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/55 backdrop-blur-md border border-white/15 text-white text-xs font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                @ {project.company}
              </div>
            )}

            {project.badge && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/55 backdrop-blur-md border border-white/15 text-white text-xs font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                {project.badge}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h3
          id={`project-${id}-title`}
          className="text-lg sm:text-xl md:text-2xl font-semibold capitalize text-light-title dark:text-dark-title transition-colors group-hover:text-light-blue dark:group-hover:text-dark-blue"
        >
          {project.title}
        </h3>

        <p
          id={`project-${id}-description`}
          className="mt-2 text-sm sm:text-base leading-relaxed text-light-subtitle dark:text-dark-subtitle line-clamp-2"
        >
          {project.description}
        </p>

        {Array.isArray(project.technologies) && project.technologies.length > 0 && (
          <div className="flex flex-nowrap gap-1.5 mt-4 overflow-hidden">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="flex-shrink-0 px-2.5 py-1 rounded-md text-xs font-medium border border-light-border dark:border-dark-border bg-light-primary/60 dark:bg-dark-primary/60 text-light-subtitle dark:text-dark-subtitle"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="flex-shrink-0 px-2.5 py-1 rounded-md text-xs font-medium text-light-subtitle dark:text-dark-subtitle">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
        )}

        <div className="flex-1" />

        <div className="flex items-center justify-between gap-4 mt-5 pt-4">
          <div className="flex gap-2 items-center">
            {project.live && project.live !== "#" && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.stopPropagation();
                  // Example: external link click tracking (project live demo).
                  external_link_click({ url: project.live, label: `${project.title} live demo`, location: "project_card" });
                }}
                className="flex items-center justify-center w-9 h-9 rounded-full border border-light-border/80 dark:border-dark-border bg-light-primary/60 dark:bg-dark-primary/60 hover:border-light-blue/50 dark:hover:border-dark-blue/50 hover:text-light-blue dark:hover:text-dark-blue transition-all duration-200"
                aria-label={`View the project at ${project.title}`}
              >
                <ExternalLink size={16} />
              </a>
            )}

            {project.repo && project.repo !== "#" && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.stopPropagation();
                  // Example: external link click tracking (project repo).
                  external_link_click({ url: project.repo, label: `${project.title} repo`, location: "project_card" });
                }}
                className="flex items-center justify-center w-9 h-9 rounded-full border border-light-border/80 dark:border-dark-border bg-light-primary/60 dark:bg-dark-primary/60 hover:border-light-blue/50 dark:hover:border-dark-blue/50 hover:text-light-blue dark:hover:text-dark-blue transition-all duration-200"
                aria-label={`View the project ${project.title} code on GitHub`}
              >
                <Github size={16} />
              </a>
            )}
          </div>

          <span className="flex items-center gap-1.5 text-sm font-medium text-light-blue dark:text-dark-blue">
            <span>View details</span>
            <ArrowLeft
              size={15}
              className={`transition-transform duration-300 ${language === "ar" ? "group-hover:-translate-x-1" : "rotate-180 group-hover:translate-x-1"
                }`}
            />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
