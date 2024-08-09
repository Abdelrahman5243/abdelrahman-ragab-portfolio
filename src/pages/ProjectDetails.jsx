import React from "react";
import { Link, useParams } from "react-router-dom";
import { LuArrowLeft } from "react-icons/lu";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { PiDotsSixVerticalThin } from "react-icons/pi";
import { useTranslation } from "react-i18next";

const ProjectDetails = () => {
  const { id } = useParams();
  const { i18n, t } = useTranslation("main");
  const language = i18n.language;
  const projectData = t(`projects.${id}`, { returnObjects: true });

  return (
    <>
      <div className="my-8">
        <Link to="/" className="header_btn centered mb-8 w-28 p-4 gap-4">
          <LuArrowLeft
            size={"20px"}
            className={`${language === "ar" ? "rotate-180" : ""}`}
          />
          Home
        </Link>
        <div className="overflow-hidden max-h-[650px]">
          <img
            src={projectData.imagePath}
            alt="design"
            className="mx-auto mb-16 w-full"
          />
        </div>

        <div className="flex gap-4 items-center my-8 text-3xl">
          <PiDotsSixVerticalThin
            className="text-light-subtitle dark:text-dark-subtitle"
            aria-hidden="true"
          />
          <h1 className="title  mb-0">{projectData.title}</h1>
        </div>
        <p className="description mx-9">{projectData.details}</p>
        <div className="flex gap-4 items-center my-8 text-3xl">
          <PiDotsSixVerticalThin
            className="text-light-subtitle dark:text-dark-subtitle"
            aria-hidden="true"
          />
          <h1 className="text-xl sm:text-2xl md:text-3xl lead dark:text-dark-title text-light-title">
            {t("technologiesTitle")}
          </h1>
        </div>
        <div className="flex flex-wrap gap-4 px-8 mb-10 dark:text-dark-subtitle text-light-subtitle">
          {projectData.technologies.map((technology, index) => (
            <span
              key={index}
              className="mb-2 px-4 py-2 rounded-xl border border-light-border dark:border-dark-border"
            >
              {technology}
            </span>
          ))}
        </div>

        <ul className="pl-5">
          <li className="mb-4">
            <a
              href={projectData.live}
              className="text-light-blue flex items-center gap-4"
            >
              Go to live demo
              <FaExternalLinkAlt className="mr-2 text-light-blue" />
            </a>
          </li>
          <li>
            <a
              className="text-light-blue flex items-center gap-4"
              href={projectData.repo}
            >
              Go to Code
              <FaGithub className="mr-2 text-light-blue" />
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ProjectDetails;
