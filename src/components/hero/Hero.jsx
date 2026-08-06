import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { HERO_CONTENT } from "./heroContent.js";
import { ExternalLink, Download } from "lucide-react";
import { containerVariants, itemVariants } from "../../animations/variants";
import { file_download, external_link_click } from "../../analytics";

const Hero = () => {
  const { t } = useTranslation("main");

  const cvUrl = "https://drive.google.com/uc?export=download&id=16zAur4LWn7n6oGUzxqgL4EIFkIL3VXM0";

  return (
    <motion.section
      id="about"
      aria-labelledby="hero-title"
      className="w-full py-10 md:py-16 flex flex-col items-center text-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.span className="hero-badge" variants={itemVariants}>
        <span className="hero-badge-dot" aria-hidden="true" />
        {t("hero.availability")}
      </motion.span>

      <motion.p className="hero-eyebrow mt-6 justify-center" variants={itemVariants}>
        {t("hero.eyebrow")}
      </motion.p>

      <motion.h1
        id="hero-title"
        className="hero-title mt-4 max-w-4xl"
        variants={itemVariants}
      >
        {t(HERO_CONTENT.titleKey)}
      </motion.h1>

      <motion.p className="hero-description mt-6 mx-auto" variants={itemVariants}>
        {t(HERO_CONTENT.descriptionKey)}
      </motion.p>

      <motion.div
        className="flex gap-4 mt-8 flex-wrap justify-center"
        variants={itemVariants}
      >
        <motion.a
          href={cvUrl}
          download
          className="hero-btn hero-btn-primary"
          aria-label="Download CV"
          whileTap={{ scale: 0.97 }}
          onClick={() =>
            // Example: file download tracking.
            file_download({
              fileName: "Abdelrahman-Ragab-CV.pdf",
              url: cvUrl,
              label: "Download CV",
              location: "hero",
            })
          }
        >
          <Download size={16} />
          <span>{t("hero.downloadCV", "Download CV")}</span>
        </motion.a>

        <motion.a
          href={HERO_CONTENT.cvUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hero-btn hero-btn-secondary"
          aria-label="Preview CV"
          whileTap={{ scale: 0.97 }}
          onClick={() =>
            // Example: external link click tracking.
            external_link_click({
              url: HERO_CONTENT.cvUrl,
              label: "Preview CV",
              location: "hero",
            })
          }
        >
          <ExternalLink size={16} />
          <span>{t(HERO_CONTENT.showCVKey)}</span>
        </motion.a>
      </motion.div>

      <motion.div
        className="flex gap-5 mt-8 justify-center text-lg text-light-subtitle dark:text-dark-subtitle"
        variants={itemVariants}
      >
        {HERO_CONTENT.socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-social-link"
            aria-label={link.ariaLabel}
            onClick={() =>
              // Example: external link click tracking (social profiles).
              external_link_click({
                url: link.href,
                label: link.ariaLabel,
                location: "hero_social",
              })
            }
          >
            <link.icon size="1.05em" />
          </a>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Hero;
