import React from "react";
import { Link, useParams } from "react-router-dom";
import { LuArrowLeft } from "react-icons/lu";

const ProjectDetails = () => {
  const { id } = useParams();

  // Construct the image path based on the id
  const imagePath = `/images/${id}.jpg`;

  return (
    <>
      <div className="my-8">
        <Link to="/" className="header_btn centered mb-8 w-28 p-4 gap-4">
          <LuArrowLeft size={"20px"} />
          Home
        </Link>
        <img src={imagePath} alt="design" className="mx-auto mb-16" />

        <h1 className="title my-4">Project Title {id}</h1>
        <p className="description">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus
          maiores rem accusamus error cum asperiores distinctio odit ullam
          officia illum nisi tenetur laborum, dolorem, eaque mollitia laboriosam
          aperiam iure repudiandae.
        </p>

        <h3 className="text-xl sm:text-2xl md:text-3xl leading-tight mb-6 dark:text-dark-title text-light-title">
          technologies used :
        </h3>
        <div className="flex flex-wrap gap-4 pl-5 mb-10 dark:text-dark-subtitle text-light-subtitle">
          <span className="mb-2 px-4 py-2 rounded-xl border border-light-border dark:border-dark-border">
            js
          </span>
          <span className="mb-2 px-4 py-2 rounded-xl border border-light-border dark:border-dark-border">
            js
          </span>
          <span className="mb-2 px-4 py-2 rounded-xl border border-light-border dark:border-dark-border">
            js
          </span>
          <span className="mb-2 px-4 py-2 rounded-xl border border-light-border dark:border-dark-border">
            js
          </span>
          <span className="mb-2 px-4 py-2 rounded-xl border border-light-border dark:border-dark-border">
            js
          </span>
          <span className="mb-2 px-4 py-2 rounded-xl border border-light-border dark:border-dark-border">
            js
          </span>
          <span className="mb-2 px-4 py-2 rounded-xl border border-light-border dark:border-dark-border">
            js
          </span>
          <span className="mb-2 px-4 py-2 rounded-xl border border-light-border dark:border-dark-border">
            js
          </span>
          <span className="mb-2 px-4 py-2 rounded-xl border border-light-border dark:border-dark-border">
            js
          </span>
          <span className="mb-2 px-4 py-2 rounded-xl border border-light-border dark:border-dark-border">
            js
          </span>
          <span className="mb-2 px-4 py-2 rounded-xl border border-light-border dark:border-dark-border">
            js
          </span>
          <span className="mb-2 px-4 py-2 rounded-xl border border-light-border dark:border-dark-border">
            js
          </span>
          <span className="mb-2 px-4 py-2 rounded-xl border border-light-border dark:border-dark-border">
            js
          </span>
          <span className="mb-2 px-4 py-2 rounded-xl border border-light-border dark:border-dark-border">
            js
          </span>
          <span className="mb-2 px-4 py-2 rounded-xl border border-light-border dark:border-dark-border">
            js
          </span>
          <span className="mb-2 px-4 py-2 rounded-xl border border-light-border dark:border-dark-border">
            js
          </span>
          <span className="mb-2 px-4 py-2 rounded-xl border border-light-border dark:border-dark-border">
            js
          </span>
          <span className="mb-2 px-4 py-2 rounded-xl border border-light-border dark:border-dark-border">
            js
          </span>
          <span className="mb-2 px-4 py-2 rounded-xl border border-light-border dark:border-dark-border">
            js
          </span>
          <span className="mb-2 px-4 py-2 rounded-xl border border-light-border dark:border-dark-border">
            js
          </span>
          <span className="mb-2 px-4 py-2 rounded-xl border border-light-border dark:border-dark-border">
            js
          </span>
          <span className="mb-2 px-4 py-2 rounded-xl border border-light-border dark:border-dark-border">
            js
          </span>
          <span className="mb-2 px-4 py-2 rounded-xl border border-light-border dark:border-dark-border">
            js
          </span>
        </div>

        <ul className="list-disc">
          <li>
            <span className="font-bold">live demo</span> :
            <a href="google.com">www</a>
          </li>
          <li>
            <span className="font-bold">Code</span> :
            <a href="google.com">www</a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ProjectDetails;
