import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { HERO_CONTENT } from "./heroContent.js";
import { ExternalLink, Download } from "lucide-react";
import { containerVariants, itemVariants, downloadVariants } from "../../animations/variants";

const Hero = () => {
  const { t } = useTranslation("main");

  const cvUrl = "/cv/Abdelrahman-Ragab-Frontend-CV.pdf";

  return (
    <motion.section
      id="about"
      aria-labelledby="hero-title"
      className="flex flex-col items-center px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex mt-8 items-center flex-col-reverse md:flex-row py-8">
        <motion.div
          className="left-section w-full text-center relative"
          variants={itemVariants}
        >
          <motion.h1
            id="hero-title"
            className="
              text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl
              font-bold leading-tight 
              text-light-title dark:text-dark-title
            "
            variants={itemVariants}
          >
            {t(HERO_CONTENT.titleKey)}
          </motion.h1>

          <motion.h2
            className="
              mt-2
              text-base sm:text-lg md:text-xl lg:text-2xl
              font-medium tracking-wide
              text-green-600 dark:text-green-400 
            "
            variants={itemVariants}
          >
            {t("hero.jobTitle", "Front-End Developer")}
          </motion.h2>

          <p
            className="
              mt-4
              text-sm sm:text-base md:text-lg lg:text-xl
              text-light-subtitle dark:text-dark-subtitle
              max-w-2xl mx-auto
            "
            style={{ lineHeight: 1.8 }}
          >
            {t(HERO_CONTENT.descriptionKey)}
          </p>

          <motion.div
            className="flex m-auto gap-4 mb-8 max-w-max mt-6 flex-wrap justify-center"
            variants={itemVariants}
          >
            <motion.a
              href={HERO_CONTENT.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                relative py-2 px-6 
                backdrop-blur-sm 
                border border-dark-bgHeader/10 dark:border-light-bgHeader/10 
                bg-light-bgHeader/80 dark:bg-dark-bgHeader/80 
                text-sm sm:text-base md:text-lg 
                text-light-subtitle dark:text-dark-subtitle 
                rounded-full flex gap-2 items-center justify-center
              "
              aria-label="Preview CV"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink size={18} />
              <span>{t(HERO_CONTENT.showCVKey)}</span>
            </motion.a>

            <motion.a
              href={cvUrl}
              download="Abdelrahman-Ragab-Frontend-CV.pdf"
              className="
                relative py-2 px-6 
                backdrop-blur-sm 
                border border-dark-bgHeader/10 dark:border-light-bgHeader/10 
                bg-light-bgHeader/80 dark:bg-dark-bgHeader/80 
                text-sm sm:text-base md:text-lg 
                text-light-subtitle dark:text-dark-subtitle 
                rounded-full flex gap-2 items-center justify-center
              "
              aria-label="Download CV"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div variants={downloadVariants} animate="animate">
                <Download size={18} />
              </motion.div>
              <span>{t("hero.downloadCV", "Download CV")}</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="
          flex gap-6 mb-8 
          text-lg sm:text-xl md:text-2xl 
          dark:text-dark-subtitle text-light-subtitle
        "
        variants={containerVariants}
      >
        {HERO_CONTENT.socialLinks.map((link, index) => (
          <motion.a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transform transition-transform duration-200"
            variants={itemVariants}
            whileHover={{
              scale: 1.2,
              rotate: [0, -10, 10, -10, 0],
              transition: { duration: 0.5, ease: "easeInOut" },
            }}
            aria-label={link.ariaLabel}
          >
            <link.icon size="1em" />
          </motion.a>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Hero;
