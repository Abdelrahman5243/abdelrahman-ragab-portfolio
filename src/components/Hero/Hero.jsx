import React, { useRef } from "react";
import { motion } from "framer-motion";
import { AiFillLinkedin, AiOutlineCodepen, AiFillGithub } from "react-icons/ai";
import { BiLogoGmail } from "react-icons/bi";
import { HiDownload } from "react-icons/hi";
import Lottie from "lottie-react";
import devAnimation from "../../assets/animation/dev.json";
import cv from "../../assets/cv.pdf";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation("main");
  const lottieRef = useRef();

  const HERO_CONTENT = {
    title: t("hero.title"),
    description: t("hero.description"),
    btn: t("hero.btn"),
    socialLinks: [
      {
        href: "https://www.linkedin.com",
        icon: (
          <AiFillLinkedin className="hover:text-dark-iconHover transition-all duration-300 cursor-pointer" />
        ),
        ariaLabel: "LinkedIn profile",
      },
      {
        href: "https://codepen.io",
        icon: (
          <AiOutlineCodepen className="hover:text-dark-iconHover transition-all duration-300 cursor-pointer" />
        ),
        ariaLabel: "CodePen profile",
      },
      {
        href: "https://github.com",
        icon: (
          <AiFillGithub className="hover:text-dark-iconHover transition-all duration-300 cursor-pointer" />
        ),
        ariaLabel: "GitHub profile",
      },
      {
        href: "mailto:example@example.com",
        icon: (
          <BiLogoGmail className="hover:text-dark-iconHover transition-all duration-300 cursor-pointer" />
        ),
        ariaLabel: "Send an email",
      },
    ],
  };

  return (
    <section
      id="about"
      className="flex my-8 items-center flex-col-reverse md:flex-row"
      aria-labelledby="hero-title"
    >
      <div className="left-section w-full md:w-1/2">
        <motion.h1
          id="hero-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-2xl sm:text-3xl md:text-4xl leading-tight mb-6 dark:text-dark-title text-light-title"
        >
          {HERO_CONTENT.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-base sm:text-lg md:text-xl leading-6 mb-8 dark:text-dark-subtitle text-light-subtitle"
        >
          {HERO_CONTENT.description}
        </motion.p>
        <motion.a
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          href={cv}
          download="Ali_Hassan_Cv.pdf"
          className="max-w-max mb-8 py-2 px-6 bg-light-bgHeader dark:bg-dark-bgHeader text-light-subtitle dark:text-dark-subtitle rounded flex gap-4 items-center"
          aria-label="Download CV"
        >
          {HERO_CONTENT.btn}
          <HiDownload />
        </motion.a>
        <div className="flex text-lg gap-6 dark:text-dark-subtitle text-light-subtitle">
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
              {link.icon}
            </motion.a>
          ))}
        </div>
      </div>

      <div className="right-section w-full md:w-1/2">
        <Lottie
          lottieRef={lottieRef}
          onComplete={() => lottieRef.current.setSpeed(0.5)}
          animationData={devAnimation}
          aria-label="Developer animation"
        />
      </div>
    </section>
  );
};

export default Hero;
