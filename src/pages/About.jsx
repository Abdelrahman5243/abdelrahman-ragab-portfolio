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
      </motion.h1>
      <p className="text-sm leading-6 mb-8 dark:text-dark-subtitle text-light-subtitle">
  
      </p>
    </div>
  );
};

export default About;
