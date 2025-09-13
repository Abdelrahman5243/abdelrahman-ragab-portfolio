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
        <Link
          to={`project-details/${id}`}
          aria-label={`View details for project ${id}`}
        >
          {(!imageLoaded || imageError) && (
            <div className="absolute inset-0 z-10">
              <SkeletonLoader />
            </div>
          )}

          {!imageError && (
            <img
              src={`${project.image_url}`} 
              alt="project"
              width={1280}
              height={720}
              className="object-cover w-full h-full"
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          )}
        </Link>
      </div>

      <h1
        id={`project-${id}-title`}
        className="
          text-base sm:text-lg md:text-xl lg:text-2xl 
          capitalize m-4 
          text-light-title dark:text-dark-title
        "
      >
        {project.title}
      </h1>

      <p
        id={`project-${id}-description`}
        className="
          mx-4 my-2 
          text-xs sm:text-sm md:text-base lg:text-lg 
          text-light-subtitle dark:text-dark-subtitle flex-1
        "
      >
        {project.description}
      </p>

      <div
        className="
          flex justify-between items-center 
          m-4 
          text-xs sm:text-sm md:text-base lg:text-lg 
          mt-4 
          text-light-subtitle dark:text-dark-subtitle
        "
      >
        <div className="icons flex gap-4">
          <a
            href={project.live}
            className="hover:text-dark-iconHover"
            aria-label={`View the project at ${project.title}`}
          >
            <ExternalLink size={18} />
          </a>
          <a
            href={project.repo}
            className="hover:text-dark-iconHover"
            aria-label="View the project's code on GitHub"
          >
            <Github size={18} />
          </a>
        </div>
        <Link
          className="text-blue-600 dark:text-blue-400 flex items-center gap-2"
          to={`project-details/${id}`}
          aria-label={`View details for project ${id}`}
        >
          <span className="text-xs sm:text-sm md:text-base">View details</span>
          <ArrowLeft
            size={18}
            className={`mt-1 ${language === "ar" ? "" : "rotate-180"}`}
          />
        </Link>
      </div>
    </>
  );
};

export default ProjectCard;
