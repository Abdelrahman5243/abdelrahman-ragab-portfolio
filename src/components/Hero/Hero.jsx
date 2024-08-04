import Lottie from "lottie-react";
import devAnimation from "../../assets/animation/dev.json";
import { useRef } from "react";
import { motion } from "framer-motion";
import { AiFillLinkedin, AiOutlineCodepen, AiFillGithub } from "react-icons/ai";
import { MdMail } from "react-icons/md";

// Define a constant object for dynamic content
const HERO_CONTENT = {
  title: "Software designer, founder, and amateur astronaut.",
  description: `I’m Ali Hassan, a software designer and entrepreneur based in New York
  City. I’m the founder and CEO of Planetaria, where we develop
  technologies that empower regular people to explore space on their own
  terms.`,
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
        <MdMail className="hover:text-dark-iconHover transition-all duration-300 cursor-pointer" />
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
          className="text-4xl leading-tight mb-6 dark:text-dark-title text-light-title"
        >
          {HERO_CONTENT.title}
        </motion.h1>

        <p className="text-sm leading-6 mb-8 dark:text-dark-subtitle text-light-subtitle">
          {HERO_CONTENT.description}
        </p>

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
        {/* <Lottie
          lottieRef={lottieRef}
          onLoadedImages={() => {
            lottieRef.current.setSpeed(0.5);
          }}
          animationData={devAnimation}
        /> */}
      </div>
    </section>
  );
};

export default Hero;