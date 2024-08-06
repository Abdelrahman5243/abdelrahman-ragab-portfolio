import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import useProjectTranslations from "./useProjectTranslations"; // Import the custom hook
import "./projects.css";

const Projects = () => {
  const [currentActive, setCurrentActive] = useState("All Projects");
  const { categories, projectTitles, descriptions } = useProjectTranslations();

  // Define the projects data with translations
  const myProjects = [
    {
      category: categories.reactjs,
      projects: [
        {
          projectTitle: projectTitles.reactProject,
          imgPath: "./images/1.webp",
          description: descriptions.reactProject,
        },
        {
          projectTitle: projectTitles.reactCssProject,
          imgPath: "./images/1.webp",
          description: descriptions.reactCssProject,
        },
      ],
    },
    {
      category: categories.htmlCss,
      projects: [
        {
          projectTitle: projectTitles.cssProject,
          imgPath: "./images/1.webp",
          description: descriptions.cssProject,
        },
      ],
    },
    {
      category: categories.javascript,
      projects: [
        {
          projectTitle: projectTitles.jsProject,
          imgPath: "./images/1.webp",
          description: descriptions.jsProject,
        },
      ],
    },
  ];

  const handleClick = (category) => {
    setCurrentActive(category);
  };

  const allCategories = ["All Projects", ...Object.values(categories)];

  // Get the projects to display based on the selected category
  const filteredProjects =
    currentActive === "All Projects"
      ? myProjects.flatMap((cat) => cat.projects)
      : myProjects.find((cat) => cat.category === currentActive)?.projects ||
        [];

  return (
    <section
      id="projects"
      className="w-full mx-auto my-8 flex flex-col md:flex-row gap-8 justify-between bg-light-secondary dark:bg-dark-secondary items-start"
      aria-labelledby="projects-title"
    >
      <h2 id="projects-title" className="sr-only">
        Projects
      </h2>
      <div
        className="flex flex-wrap justify-center md:flex-col gap-4"
        role="tablist"
        aria-label="Project categories"
      >
        {allCategories.map((category, index) => (
          <button
            key={index}
            className={`filter-btn py-2 px-6 bg-light-bgHeader dark:bg-dark-bgHeader text-light-subtitle dark:text-dark-subtitle rounded ${
              currentActive === category
                ? "border border-dark-blue"
                : "border border-light-border dark:border-dark-border"
            }`}
            onClick={() => handleClick(category)}
            role="tab"
            aria-selected={currentActive === category}
          >
            {category}
          </button>
        ))}
      </div>

      <div
        className="flex flex-wrap gap-8 justify-center w-full md:w-3/4"
        role="tabpanel"
        aria-labelledby="projects-title"
      >
        <AnimatePresence>
          {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ transform: "scale(0.4)" }}
              animate={{ transform: "scale(1)" }}
              transition={{ type: "spring", damping: 8, stiffness: 50 }}
              className="card w-[300px] bg-light-bgHeader dark:bg-dark-bgHeader flex flex-col justify-between"
              aria-labelledby={`project-${index}-title`}
              aria-describedby={`project-${index}-description`}
            >
              <ProjectCard
                project={{
                  ...project,
                  imgAlt: `Image for ${project.projectTitle}`,
                }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
