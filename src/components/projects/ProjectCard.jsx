import { useState } from "react";
import { Github, ExternalLink, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SkeletonLoader from "../spinner/SkeletonLoader";

const ProjectCard = ({ project, id }) => {
  const { i18n } = useTranslation("main");
  const language = i18n.language;

  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <>
      <div className="w-full h-[200px] overflow-hidden relative rounded-md">
        <Link
          to={`project-details/${id}`}
          aria-label={`View details for project ${id}`}
        >
          {!imageLoaded && (
            <div className="absolute inset-0 w-full h-full">
              <SkeletonLoader />
            </div>
          )}

          <img
            src={project.image_url}
            alt="project"
            width={1280}
            height={720}
            className={`object-cover w-full h-[200px] transition duration-500 origin-top ${imageLoaded ? "opacity-100 hover:scale-105 hover:brightness-75" : "opacity-0"
              }`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(true)}

          />
        </Link>
      </div>

      <h1 className="text-2xl sm:text-3xl capitalize m-4 text-light-title dark:text-dark-title">
        {project.title}
      </h1>

      <p className="mx-4 my-2 text-light-subtitle dark:text-dark-subtitle flex-1">
        {project.description}
      </p>

      <div className="flex justify-between items-center m-4 text-xl mt-4 text-light-subtitle dark:text-dark-subtitle">
        <div className="icons flex gap-4">
          <a
            href={project.live}
            className="hover:text-dark-iconHover"
            aria-label={`View the project at ${project.title}`}
          >
            <ExternalLink />
          </a>
          <a
            href={project.repo}
            className="hover:text-dark-iconHover"
            aria-label={`View the project's code on GitHub`}
          >
            <Github />
          </a>
        </div>
        <Link
          className="text-blue-600 dark:text-blue-400 flex items-center gap-2"
          to={`project-details/${id}`}
          aria-label={`View details for project ${id}`}
        >
          View details
          <ArrowLeft
            size={"20px"}
            className={`mt-1 ${language === "ar" ? "" : "rotate-180"}`}
          />
        </Link>
      </div>
    </>
  );
};

export default ProjectCard;
