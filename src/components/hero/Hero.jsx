import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Lottie from "lottie-react";
import devAnimation from "../../assets/animation/dev.json";
import { AiFillLinkedin, AiOutlineCodepen, AiFillGithub } from "react-icons/ai";
import { BiLogoGmail } from "react-icons/bi";
import { HiDownload } from "react-icons/hi";
import { IoOpenOutline } from "react-icons/io5";
import cv from "../../assets/Abdelrahman-Ragab-Abdelbaky-CV.pdf";

const Hero = () => {
  const { t } = useTranslation("main");
  const lottieRef = useRef();

  const HERO_CONTENT = {
    title: t("hero.title"),
    description: t("hero.description"),
    downloadCV: t("hero.downloadCV"),
    showCV: t("hero.showCV"),
    cvUrl: "https://flowcv.com/resume/gsawfcbwff",
    socialLinks: [
      {
        href: "mailto:abdelrahman.ragab.abdelbaky@gmail.com",
        icon: (
          <BiLogoGmail className="hover:text-dark-iconHover transition-all duration-300 cursor-pointer" />
        ),
        ariaLabel: "Send an email",
      },
      {
        href: "https://linkedin.com/in/abdelrahman-ragab-9443b8264",
        icon: (
          <AiFillLinkedin className="hover:text-dark-iconHover transition-all duration-300 cursor-pointer" />
        ),
        ariaLabel: "LinkedIn profile",
      },
      {
        href: "https://github.com/abdelrahmanrgab",
        icon: (
          <AiFillGithub className="hover:text-dark-iconHover transition-all duration-300 cursor-pointer" />
        ),
        ariaLabel: "GitHub profile",
      },
      {
        href: "https://codepen.io/Abdelrahman-Ragab",
        icon: (
          <AiOutlineCodepen className="hover:text-dark-iconHover transition-all duration-300 cursor-pointer" />
        ),
        ariaLabel: "CodePen profile",
      },
    ],
  };

  return (
    <section
      id="about"
      className="flex my-8 items-center flex-col-reverse md:flex-row py-8"
      aria-labelledby="hero-title"
    >
      <div className="left-section w-full md:w-1/2 relative">
        <motion.h1
          id="hero-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="title"
        >
          {HERO_CONTENT.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="description"
          style={{ lineHeight: 2 }}
        >
          {HERO_CONTENT.description}
        </motion.p>
        <div className="flex flex-wrap gap-4 mb-8 max-w-max">
          <motion.a
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            href={cv}
            download="Abdelrahman-Ragab-Abdelbaky-CV.pdf"
            className="py-2 px-6 bg-light-bgHeader dark:bg-dark-bgHeader text-light-subtitle dark:text-dark-subtitle rounded flex gap-4 items-center justify-between"
            aria-label="Download CV"
          >
            {HERO_CONTENT.downloadCV}
            <HiDownload />
          </motion.a>

          <motion.a
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            href={HERO_CONTENT.cvUrl}
            target="_blank"
            className="py-2 px-6 bg-light-bgHeader dark:bg-dark-bgHeader text-light-subtitle dark:text-dark-subtitle rounded flex gap-4 items-center justify-between"
            aria-label="Preview CV"
          >
            {HERO_CONTENT.showCV}
            <IoOpenOutline />
          </motion.a>
        </div>
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
    </section>
  );
};

export default Hero;
