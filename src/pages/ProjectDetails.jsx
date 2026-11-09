import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ExternalLink,
  GithubIcon,
  MoreVertical,
  CheckCircle2,
  UserRound,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Slider from "../components/slider/Slider";
import ThumbnailGallery from "../components/lightbox/ThumbnailGallery";
import RelatedProjects from "../components/projects/RelatedProjects";
import ProjectShowcase from "../components/projects/ProjectShowcase";
import SEO from "../components/SEO";

const parseDetails = (text = "") =>
  text
    .split(/(?<=[.!؟])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 10);

// Renders **bold** lead phrases and [label](/path) links inside project text.
// Bold lets the key point of each bullet stand out when skimming; links let
// related projects point to each other.
const TOKEN = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g;
const linkClass =
  "font-semibold text-light-blue dark:text-dark-blue underline underline-offset-4 decoration-1 hover:decoration-2";

const RichText = ({ text }) => {
  const out = [];
  let last = 0;
  for (const m of text.matchAll(TOKEN)) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const [, bold, label, href] = m;
    if (bold) {
      out.push(
        <strong key={m.index} className="font-semibold text-light-title dark:text-dark-title">
          {bold}
        </strong>
      );
    } else if (href.startsWith("/")) {
      out.push(
        <Link key={m.index} to={href} className={linkClass}>
          {label}
        </Link>
      );
    } else {
      out.push(
        <a
          key={m.index}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          {label}
        </a>
      );
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
};

const ProjectDetails = () => {
  const { slug } = useParams();
  const { i18n, t } = useTranslation("main");
  const projectsData = t("projects", { returnObjects: true });
  const projectData = projectsData.find((project) => project.slug === slug);

  if (!projectData) return null;

  return (
    <motion.div
      key={slug}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="my-6 sm:my-8"
    >
      <SEO
        title={`${projectData.title} — Abdelrahman Ragab's Portfolio`}
        description={projectData.description}
        path={`/project-details/${slug}`}
      />

      {/* Back button */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Link
          to="/"
          className="header_btn centered mb-8 w-28 px-3 py-2 sm:px-4 sm:py-3 gap-2 sm:gap-4 text-sm sm:text-base md:text-lg"
        >
          <ArrowLeft size={18} className={`${i18n.language === "ar" ? "rotate-180" : ""}`} />
          Home
        </Link>
      </motion.div>

      {/* Slider */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.7,
          delay: 0.3,
          ease: "easeOut",
        }}
      >
        <Slider
          key={`${slug}-${projectData.screens_url?.join("|") || "no-images"}`}
          project={projectData}
          language={i18n.language}
        />
      </motion.div>

      {/* Thumbnail Gallery */}
      {projectData.screens_url && projectData.screens_url.length > 0 && (
        <ThumbnailGallery images={projectData.screens_url} />
      )}

      {/* Project Title & Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex gap-3 sm:gap-4 items-center my-6 sm:my-8 mt-6 flex-wrap">
          <MoreVertical
            className="text-light-subtitle dark:text-dark-subtitle"
            aria-hidden="true"
          />
          <h1 className="title mb-0 text-xl sm:text-2xl md:text-3xl lg:text-5xl break-words">
            {projectData.title}
          </h1>
          {projectData.company && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-light-secondary/80 dark:bg-dark-secondary/80 border border-light-border/80 dark:border-dark-border text-xs font-medium text-light-subtitle dark:text-dark-subtitle backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />@ {projectData.company}
            </div>
          )}
          {projectData.badge && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-light-secondary/80 dark:bg-dark-secondary/80 border border-light-border/80 dark:border-dark-border text-xs font-medium text-light-subtitle dark:text-dark-subtitle backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              {projectData.badge}
            </div>
          )}
        </div>
        {/* Stack and links: the two facts people look for first */}
        <div className="mx-0 sm:mx-2 mb-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          <ul
            aria-label={t("technologiesTitle")}
            className="flex flex-wrap gap-2 text-light-subtitle dark:text-dark-subtitle"
          >
            {projectData.technologies.map((technology) => (
              <li
                key={technology}
                className="px-2.5 py-1 rounded-lg border border-light-border dark:border-dark-border text-sm"
              >
                {technology}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2">
            {projectData.live && projectData.live !== "#" && (
              <a
                href={projectData.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-light-blue dark:bg-dark-blue text-white dark:text-dark-primary hover:opacity-90 transition-opacity"
              >
                <ExternalLink size={16} aria-hidden="true" />
                Live demo
              </a>
            )}
            {projectData.repo && projectData.repo !== "#" && (
              <a
                href={projectData.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-light-border dark:border-dark-border text-light-title dark:text-dark-title hover:border-light-blue dark:hover:border-dark-blue transition-colors"
              >
                <GithubIcon size={16} aria-hidden="true" />
                Code
              </a>
            )}
          </div>
        </div>
        {projectData.role && (
          <div className="mx-0 sm:mx-2 mb-6 flex items-start gap-4 rounded-2xl p-5 sm:p-6 border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary">
            <span
              className="flex flex-shrink-0 items-center justify-center w-11 h-11 rounded-xl bg-[color-mix(in_srgb,var(--light-accent)_12%,transparent)] dark:bg-[color-mix(in_srgb,var(--dark-accent)_16%,transparent)] text-light-blue dark:text-dark-blue"
              aria-hidden="true"
            >
              <UserRound size={22} />
            </span>
            <div className="flex flex-col gap-1 min-w-0">
              <span className="text-sm font-medium text-light-subtitle dark:text-dark-subtitle">
                {t("myRole")}
              </span>
              <p className="text-base sm:text-lg leading-8 font-medium text-light-title dark:text-dark-title">
                <RichText text={projectData.role} />
              </p>
            </div>
          </div>
        )}
        <ProjectShowcase showcase={projectData.showcase} />
        {Array.isArray(projectData.detailGroups) && projectData.detailGroups.length > 0 ? (
          <div className="mx-0 sm:mx-2 rounded-2xl border border-light-border dark:border-dark-border bg-light-secondary dark:bg-dark-secondary divide-y divide-light-border dark:divide-dark-border">
            {projectData.detailGroups.map((group, gi) => (
              <motion.section
                key={gi}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35 }}
                className="grid gap-3 p-5 sm:p-6 md:grid-cols-[15rem_minmax(0,1fr)] md:gap-8"
              >
                <h3 className="flex items-baseline gap-3 text-base sm:text-lg font-bold text-light-title dark:text-dark-title">
                  <span
                    dir="ltr"
                    className="font-mono text-sm font-normal text-light-blue dark:text-dark-blue"
                  >
                    {String(gi + 1).padStart(2, "0")}
                  </span>
                  {group.title}
                </h3>
                <ul className="flex flex-col gap-3">
                  {group.items.map((item, ii) => (
                    <li
                      key={ii}
                      className="relative ps-4 text-base leading-7 text-light-subtitle dark:text-dark-subtitle
                                 before:absolute before:start-0 before:top-[0.7rem] before:w-1.5 before:h-1.5 before:rounded-full before:bg-light-blue dark:before:bg-dark-blue"
                    >
                      <RichText text={item} />
                    </li>
                  ))}
                </ul>
              </motion.section>
            ))}
          </div>
        ) : (
          <ul className="mx-0 sm:mx-2 grid gap-3 mt-4 sm:grid-cols-2">
            {parseDetails(projectData.details).map((sentence, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="flex items-start gap-3 rounded-xl p-4 bg-light-secondary/70 dark:bg-dark-secondary/60 border border-light-border/60 dark:border-dark-border hover:border-light-blue/40 dark:hover:border-dark-blue/40 transition-colors"
              >
                <CheckCircle2
                  size={18}
                  className="mt-0.5 flex-shrink-0 text-light-blue dark:text-dark-blue"
                />
                <span className="text-base sm:text-lg text-light-title/90 dark:text-dark-title/90 leading-7">
                  {sentence}
                </span>
              </motion.li>
            ))}
          </ul>
        )}
      </motion.div>

      <RelatedProjects currentSlug={slug} />
    </motion.div>
  );
};

export default ProjectDetails;
