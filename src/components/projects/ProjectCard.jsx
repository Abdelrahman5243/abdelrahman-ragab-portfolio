import React from "react";
import { AiFillGithub, AiOutlineLink } from "react-icons/ai";

import { LuArrowLeft } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ProjectCard = ({ project, id }) => {
  const { i18n } = useTranslation("main");
  const language = i18n.language;

  return (
    <>
      <img
        src={project.imagePath}
        alt="project"
        className="w-full h-[200px] object-cover"
      />
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
            <AiOutlineLink />
          </a>
          <a
            href={project.repo}
            className="hover:text-dark-iconHover"
            aria-label={`View the project's code on GitHub`}
          >
            <AiFillGithub />
          </a>
        </div>
        <Link
          className="text-light-blue flex items-center gap-2"
          to={`project-details/${id}`}
          aria-label={`View details for project ${id}`}
        >
          more
          <LuArrowLeft
            size={"20px"}
            className={`mt-1 ${language === "ar" ? "" : "rotate-180"}`}
          />
        </Link>
      </div>
    </>
  );
};

export default ProjectCard;
