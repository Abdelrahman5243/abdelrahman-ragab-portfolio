import { useState } from "react";
import { Github, ExternalLink, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SkeletonLoader from "../spinner/SkeletonLoader";

const ProjectCard = ({ project, id }) => {
  const { i18n } = useTranslation("main");
  const language = i18n.language;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <>
      <div className="w-full h-40 sm:h-48 md:h-56 lg:h-64 overflow-hidden relative rounded-md">
        <Link to={`project-details/${id}`} aria-label={`View details for project ${id}`}>
          {(!imageLoaded || imageError) && (
            <div className="absolute inset-0 z-10">
              <SkeletonLoader />
            </div>
          )}
          {!imageError && (
            <img
              src={project.image_url}
              alt="project"
              width={1280}
              height={720}
              className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110"
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          )}
        </Link>
      </div>

      <h1
        id={`project-${id}-title`}
        className="text-base sm:text-lg md:text-xl lg:text-2xl capitalize m-4 text-light-title dark:text-dark-title"
      >
        {project.title}
      </h1>

      <p
        id={`project-${id}-description`}
        className="mx-4 my-2 text-xs sm:text-sm md:text-base lg:text-lg text-light-subtitle dark:text-dark-subtitle flex-1"
      >
        {project.description}
      </p>

      <div className="flex justify-center items-center flex-wrap gap-10 m-4 text-xs sm:text-sm md:text-base lg:text-lg mt-4 text-light-subtitle dark:text-dark-subtitle">
        <div className="flex gap-4 items-center">
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-9 h-9 rounded-full border border-light-border dark:border-dark-border hover:bg-light-border/10 dark:hover:bg-dark-border/10 transition-colors duration-200 cursor-pointer"
            aria-label={`View the project at ${project.title}`}
          >
            <ExternalLink size={18} />
          </a>

          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-9 h-9 rounded-full border border-light-border dark:border-dark-border hover:bg-light-border/10 dark:hover:bg-dark-border/10 transition-colors duration-200 cursor-pointer"
            aria-label="View the project's code on GitHub"
          >
            <Github size={18} />
          </a>
        </div>

        <Link
          to={`project-details/${id}`}
          className="group/btn flex items-center gap-2 mb-2 px-4 py-2 rounded-xl border border-light-border dark:border-dark-border hover:bg-light-border/10 dark:hover:bg-dark-border/10 transition-colors duration-200 text-sm sm:text-base cursor-pointer"
          aria-label={`View details for project ${id}`}
        >
          <span>View details</span>
          <ArrowLeft
            size={16}
            className={`mt-0.5 transition-transform duration-300 ${language === "ar" ? "group-hover/btn:-translate-x-1" : "rotate-180 group-hover/btn:translate-x-1"
              }`}
          />
        </Link>

      </div>
    </>
  );
};

export default ProjectCard;
