import React from "react";
import { AiFillGithub, AiOutlineLink } from "react-icons/ai";

const ProjectCard = ({ project }) => {
  return (
    <>
      <img
        src={project.imgPath}
        alt={project.projectTitle}
        className="w-full h-[200px] object-cover"
      />
      <h1 className="text-2xl sm:text-3xl capitalize m-4 text-light-title dark:text-dark-title">
        {project.projectTitle}
      </h1>
      <p className="mx-4 my-2 text-light-subtitle dark:text-dark-subtitle flex-1">
        {project.description}
      </p>
      <div className="icons flex gap-4 m-4 text-xl mt-4 text-light-subtitle dark:text-dark-subtitle items-center">
        <a href="#" className="hover:text-dark-iconHover">
          <AiOutlineLink />
        </a>
        <a href="#" className="hover:text-dark-iconHover">
          <AiFillGithub />
        </a>
      </div>
    </>
  );
};

export default ProjectCard;
