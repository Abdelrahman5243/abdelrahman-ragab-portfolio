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

  return (
    <section id="about" aria-labelledby="hero-title" className="flex flex-col items-center">
      <div className="flex mt-8 items-center flex-col-reverse md:flex-row py-8">
        <div className="left-section w-full md:w-1/2 relative">
          <motion.h1
            id="hero-title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="title"
          >
            {t(HERO_CONTENT.titleKey)}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="description"
            style={{ lineHeight: 2 }}
          >
            {t(HERO_CONTENT.descriptionKey)}
          </motion.p>
          <div className="flex flex-wrap gap-4 mb-8 max-w-max">
            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              href={HERO_CONTENT.cvUrl}
              target="_blank"
              className="py-2 px-6 bg-light-bgHeader dark:bg-dark-bgHeader text-light-subtitle dark:text-dark-subtitle rounded flex gap-4 items-center justify-between"
              aria-label="Preview CV"
            >
              {t(HERO_CONTENT.showCVKey)}
              <ExternalLink />
            </motion.a>
          </div>
        </div>

        <div className="right-section w-full md:w-1/2 relative">
          <div className="animation-container w-full h-80 flex items-center justify-center">
            <Lottie
              lottieRef={lottieRef}
              onComplete={() => lottieRef.current.setSpeed(0.5)}
              animationData={devAnimation}
              role="img"
              aria-label="Developer animation"
            />
          </div>
        </div>
      </div>
      <div className="flex text-lg gap-6 dark:text-dark-subtitle text-light-subtitle mb-8">
        {HERO_CONTENT.socialLinks.map((link, index) => (
          <motion.a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transform transition-transform duration-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.1 * index }}
            aria-label={link.ariaLabel}
          >
            {<link.icon />}
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default Hero;
