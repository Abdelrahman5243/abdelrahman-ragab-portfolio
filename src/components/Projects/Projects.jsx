import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { myProjects, categories } from "./myProjects";
import ProjectCard from "./ProjectCard";
import "./projects.css";

const Projects = () => {
  const [currentActive, setCurrentActive] = useState("All Projects");

  const handleClick = (category) => {
    setCurrentActive(category);
  };

  const allCategories = ["All Projects", ...categories];

  // Get the projects to display based on the selected category
  const filteredProjects =
    currentActive === "All Projects"
      ? myProjects.flatMap((cat) => cat.projects)
      : myProjects.find((cat) => cat.category === currentActive)?.projects ||
        [];

  return (
    <section className="w-full mx-auto my-8 flex flex-col md:flex-row gap-8 justify-between bg-light-secondary dark:bg-dark-secondary items-start">
      <div className="flex flex-wrap justify-center md:flex-col gap-4">
        {allCategories.map((category, index) => (
          <button
            key={index}
            className={`filter-btn py-2 px-6 bg-light-bgHeader dark:bg-dark-bgHeader text-light-subtitle dark:text-dark-subtitle rounded ${
              currentActive === category
                ? "border border-dark-blue"
                : "border border-light-border dark:border-dark-border"
            }`}
            onClick={() => handleClick(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-8 justify-center w-full md:w-3/4">
        <AnimatePresence>
          {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ transform: "scale(0.4)" }}
              animate={{ transform: "scale(1)" }}
              transition={{ type: "spring", damping: 8, stiffness: 50 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
