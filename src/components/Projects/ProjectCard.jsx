import React from "react";
import { AiFillGithub, AiOutlineLink } from "react-icons/ai";

const ProjectCard = ({ project }) => {
  return (
    <div className="card w-[300px] bg-light-bgHeader dark:bg-dark-bgHeader">
      <img
        src={project.imgPath}
        alt={project.projectTitle}
        className="w-full object-cover"
      />
      <div className="content p-4">
        <h1 className="text-2xl sm:text-3xl capitalize my-2 text-light-title dark:text-dark-title">
          {project.projectTitle}
        </h1>
        <p className="text-light-subtitle dark:text-dark-subtitle">
          {project.description}
        </p>
        <div className="controls flex justify-between text-xl mt-4 text-light-subtitle dark:text-dark-subtitle items-center">
          <div className="icons flex gap-4">
            <a href="#" className="hover:text-dark-iconHover">
              <AiOutlineLink />
            </a>
            <a href="#" className="hover:text-dark-iconHover">
              <AiFillGithub />
            </a>
          </div>
          <span className="text-dark-blue flex items-center gap-2">More</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
