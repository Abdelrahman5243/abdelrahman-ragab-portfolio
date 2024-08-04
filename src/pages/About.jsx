import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="text-4xl leading-tight mb-6 dark:text-dark-title text-light-title"
      >
        Software designer, founder, and amateur astronaut.
      </motion.h1>
      <p className="text-sm leading-6 mb-8 dark:text-dark-subtitle text-light-subtitle">
        I’m Ali Hassan, a software designer and entrepreneur based in New York
        City. I’m the founder and CEO of Planetaria, where we develop
        technologies that empower regular people to explore space on their own
        terms.
      </p>
    </div>
  );
};

export default About;
