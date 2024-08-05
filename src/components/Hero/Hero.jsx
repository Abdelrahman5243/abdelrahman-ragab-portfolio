import Lottie from "lottie-react";
import devAnimation from "../../assets/animation/dev.json";
import { useRef } from "react";
import { motion } from "framer-motion";
import { AiFillLinkedin, AiOutlineCodepen, AiFillGithub } from "react-icons/ai";
import { BiLogoGmail } from "react-icons/bi";
import { HiDownload } from "react-icons/hi";
import cv from "../../assets/cv.pdf";

const HERO_CONTENT = {
  title: "Software designer, founder, and amateur astronaut.",
  description: `I’m Ali Hassan, a software designer and entrepreneur based in New York City. 
  I’m the founder and CEO of Planetaria, where we develop technologies that empower regular 
  people to explore space on their own terms.`,
  socialLinks: [
    {
      href: "https://www.linkedin.com",
      icon: (
        <AiFillLinkedin className="hover:text-dark-iconHover transition-all duration-300 cursor-pointer" />
      ),
    },
    {
      href: "https://codepen.io",
      icon: (
        <AiOutlineCodepen className="hover:text-dark-iconHover transition-all duration-300 cursor-pointer" />
      ),
    },
    {
      href: "https://github.com",
      icon: (
        <AiFillGithub className="hover:text-dark-iconHover transition-all duration-300 cursor-pointer" />
      ),
    },
    {
      href: "mailto:example@example.com",
      icon: (
        <BiLogoGmail className="hover:text-dark-iconHover transition-all duration-300 cursor-pointer" />
      ),
    },
  ],
};

const Hero = () => {
  const lottieRef = useRef();

  return (
    <section className="hero flex my-8 items-center">
      <div className="left-section flex-grow">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="text-2xl sm:text-3xl md:text-4xl leading-tight mb-6 dark:text-dark-title text-light-title"
        >
          {HERO_CONTENT.title}
        </motion.h1>
        <p className="text-base sm:text-lg md:text-xl leading-6 mb-8 dark:text-dark-subtitle text-light-subtitle">
          {HERO_CONTENT.description}
        </p>
        <a
          href={cv}
          download={"abdelrahman ragab (Cv).pdf"}
          className="max-w-max mb-8 py-2 px-6 bg-light-bgHeader dark:bg-dark-bgHeader text-light-subtitle dark:text-dark-subtitle rounded flex gap-4 items-center"
        >
          Download Cv
          <HiDownload />
        </a>
        <div className="flex text-lg gap-6 dark:text-dark-subtitle text-light-subtitle">
          {HERO_CONTENT.socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>

      <div className="right-section w-full hidden lg:block">
         <Lottie
          lottieRef={lottieRef}
          onLoadedImages={() => {
            lottieRef.current.setSpeed(0.5);
          }}
          animationData={devAnimation}
        /> 
      </div>
    </section>
  );
};

export default Hero;
