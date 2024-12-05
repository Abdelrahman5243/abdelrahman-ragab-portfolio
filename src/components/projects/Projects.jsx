import { AnimatePresence, motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import "./projects.css";
import { useTranslation } from "react-i18next";
import { LiaProjectDiagramSolid } from "react-icons/lia";

const Projects = () => {
  // const [currentActive, setCurrentActive] = useState("All Projects");
  const { t } = useTranslation("main");

  const projectsData = t("projects", { returnObjects: true });

  const myProjects = Object.keys(projectsData).map((id) => ({
    id,
    ...projectsData[id],
  }));

  // const handleClick = (category) => {
  //   setCurrentActive(category);
  // };

  // // Get unique categories
  // const allCategories = [
  //   "All Projects",
  //   ...new Set(myProjects.map((project) => project.categories)),
  // ];

  // Get the projects to display based on the selected category
  // const filteredProjects =
  //   currentActive === "All Projects"
  //     ? myProjects
  //     : myProjects.filter((project) => project.categories === currentActive);

  return (
    <section
      id="projects"
      className="w-full mx-auto my-8 bg-light-secondary dark:bg-dark-secondary"
      aria-labelledby="projects-title"
    >
      <div className="flex gap-4 items-center text-3xl mb-14">
        <LiaProjectDiagramSolid
          className="text-light-subtitle dark:text-dark-subtitle"
          aria-hidden="true"
        />
        <h1 id="projects-title" className="title leading-tight mb-0">
          {t("navigation.projects")}
        </h1>
      </div>

      {/* <div className="flex flex-col md:flex-row gap-8 justify-between items-start">
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
      </div> */}

      <div
        className="flex flex-wrap gap-8 justify-center w-full"
        role="tabpanel"
        aria-labelledby="projects-title"
      >
        <AnimatePresence>
          {myProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ transform: "scale(0.4)" }}
              animate={{ transform: "scale(1)" }}
              transition={{ type: "spring", damping: 8, stiffness: 50 }}
              className="card w-[300px] bg-light-bgHeader dark:bg-dark-bgHeader flex flex-col justify-between"
              aria-labelledby={`project-${project.id}-title`}
              aria-describedby={`project-${project.id}-description`}
            >
              <ProjectCard
                id={project.id}
                project={{
                  ...project,
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
