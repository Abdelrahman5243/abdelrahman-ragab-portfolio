import { useState } from "react";
import { myProjects, categories } from "./myProjects";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const [currentActive, setCurrentActive] = useState("All Projects");

  const handleClick = (category) => {
    setCurrentActive(category);
  };
  const Allcategories = ["All Projects", ...categories];

  // Get the projects to display based on the selected category
  const filteredProjects =
    currentActive === "All Projects"
      ? myProjects.flatMap((cat) => cat.projects)
      : myProjects.find((cat) => cat.category === currentActive)?.projects ||
        [];

  return (
    <section
      className="mx-auto my-8 flex flex-col gap-8 md:flex-row justify-between
     bg-light-secondary dark:bg-dark-secondary items-start "
    >
      <div className="buttons flex flex-wrap justify-center md:flex-col gap-4">
        {Allcategories.map((category, index) => (
          <button
            key={index}
            className={`py-2 px-6 bg-light-bgHeader dark:bg-dark-bgHeader text-light-subtitle dark:text-dark-subtitle 
              rounded  ${
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

      <div className="flex flex-wrap gap-8  justify-center w-full md:w-3/4">
        {filteredProjects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
