import { useState } from "react";
import PropTypes from "prop-types";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SkeletonLoader from "../spinner/SkeletonLoader";
import { external_link_click } from "../../analytics";

const getHost = (url) => {
  if (!url || url === "#") return "localhost";
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "localhost";
  }
};

const ProjectCard = ({ project, id }) => {
  const { t } = useTranslation("main");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <>
      <div className="project-card-media">
        <Link className="project-card-visual-link" to={`project-details/${id}`} aria-label={`View details for ${project.title}`}>
          <div className="project-card-window">
            <div className="project-card-window-bar" aria-hidden="true">
              <span className="project-card-window-dots">
                <i /><i /><i />
              </span>
              <span className="project-card-window-url">{getHost(project.live)}</span>
            </div>
            <div className="project-card-visual">
              {(!imageLoaded || imageError) && <div className="project-card-loader"><SkeletonLoader /></div>}
              {!imageError && (
                <img
                  src={project.image_url}
                  alt={`${project.title} preview`}
                  width={1280}
                  height={720}
                  className="project-card-image"
                  loading="lazy"
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                />
              )}
            </div>
          </div>
        </Link>
      </div>

      <div className="project-card-body">
        <div className="project-card-head">
          <div className="project-card-meta">
            <span className="project-card-meta-accent">{project.badge || project.categories}</span>
            <span className="project-card-meta-rule" aria-hidden="true" />
            <span>{project.categories}</span>
          </div>
          <div className="project-card-links">
            {project.live && project.live !== "#" && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card-icon-link"
                aria-label={`View ${project.title} live`}
                onClick={() =>
                  // Example: external link click tracking (project live demo).
                  external_link_click({ url: project.live, label: `${project.title} live demo`, location: "project_card" })
                }
              >
                <ExternalLink size={16} />
              </a>
            )}
            {project.repo && project.repo !== "#" && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card-icon-link"
                aria-label={`View ${project.title} source code`}
                onClick={() =>
                  // Example: external link click tracking (project repo).
                  external_link_click({ url: project.repo, label: `${project.title} repo`, location: "project_card" })
                }
              >
                <Github size={16} />
              </a>
            )}
          </div>
        </div>

        <h3 id={`project-${id}-title`} className="project-card-title">{project.title}</h3>
        <p id={`project-${id}-description`} className="project-card-description">{project.description}</p>

        <div className="project-card-technologies" aria-label={t("technologiesTitle", "Technologies used")}>
          {project.technologies?.slice(0, 5).map((technology) => <span key={technology}>{technology}</span>)}
          {project.technologies?.length > 5 && <span className="project-card-tech-more">+{project.technologies.length - 5}</span>}
        </div>

        <div className="project-card-footer">
          <span className="project-card-company">{project.company ? `@ ${project.company}` : `${project.technologies?.length || 0} ${t("technologiesCount", "technologies")}`}</span>
          <Link to={`project-details/${id}`} className="project-card-details-link" aria-label={`View details for ${project.title}`}>
            <span>{t("viewDetails", "View details")}</span>
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
    </>
  );
};

ProjectCard.propTypes = {
  id: PropTypes.string.isRequired,
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired,
    categories: PropTypes.string,
    company: PropTypes.string,
    badge: PropTypes.string,
    live: PropTypes.string,
    repo: PropTypes.string,
    technologies: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default ProjectCard;
