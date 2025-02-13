import { useRef } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Lottie from "lottie-react";
import devAnimation from "../../assets/animation/dev.json";
import { HERO_CONTENT } from "./heroContent.js";
import { ExternalLink } from "lucide-react";

const Hero = () => {
  const { t } = useTranslation("main");
  const lottieRef = useRef();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      id="about"
      aria-labelledby="hero-title"
      className="flex flex-col items-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex mt-8 items-center flex-col-reverse md:flex-row py-8">
        <motion.div
          className="left-section w-full md:w-1/2 relative"
          variants={itemVariants}
        >
          <motion.h1 id="hero-title" className="title" variants={itemVariants}>
            {t(HERO_CONTENT.titleKey)}
          </motion.h1>
          <motion.p
            className="description"
            style={{ lineHeight: 2 }}
            variants={itemVariants}
          >
            {t(HERO_CONTENT.descriptionKey)}
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-4 mb-8 max-w-max"
            variants={itemVariants}
          >
            <motion.a
              href={HERO_CONTENT.cvUrl}
              target="_blank"
              className="relative py-2 px-6 backdrop-blur-sm border border-dark-bgHeader/10 dark:border-light-bgHeader/10 bg-light-bgHeader/80 dark:bg-dark-bgHeader/80 text-light-subtitle dark:text-dark-subtitle rounded-full flex gap-4 items-center justify-between"
              aria-label="Preview CV"
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{t(HERO_CONTENT.showCVKey)}</span>
              <ExternalLink />
              <div className="absolute inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-dark-bgHeader dark:via-light-blue to-transparent" />
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          className="right-section w-full md:w-1/2 relative"
          variants={itemVariants}
        >
          <div className="animation-container w-full h-80 flex items-center justify-center">
            <Lottie
              lottieRef={lottieRef}
              onComplete={() => lottieRef.current.setSpeed(0.5)}
              animationData={devAnimation}
              role="img"
              aria-label="Developer animation"
            />
          </div>
        </motion.div>
      </div>
      <motion.div
        className="flex text-lg gap-6 dark:text-dark-subtitle text-light-subtitle mb-8"
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
              transition: {
                duration: 0.5,
                ease: "easeInOut",
              },
            }}
            aria-label={link.ariaLabel}
          >
            {<link.icon />}
          </motion.a>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Hero;
