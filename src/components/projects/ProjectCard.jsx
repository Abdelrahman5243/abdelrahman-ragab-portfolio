import React from "react";
import { AiFillGithub, AiOutlineLink } from "react-icons/ai";
import { Link } from "react-router-dom";

const ProjectCard = ({ project, id }) => {
  return (
    <>
      <img
        src={project.imgPath}
        alt={project.title}
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
            href="#"
            className="hover:text-dark-iconHover"
            aria-label={`View the project at ${project.title}`}
          >
            <AiOutlineLink />
          </a>
          <a
            href="#"
            className="hover:text-dark-iconHover"
            aria-label={`View the project's code on GitHub`}
          >
            <AiFillGithub />
          </a>
        </div>
        <Link className="text-light-blue" to={`project-details/${id}`}>
          more
        </Link>
      </div>
    </>
  );
};

export default ProjectCard;
