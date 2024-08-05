import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <section className="flex flex-col items-center pt-20 pb-10 px-4 text-center">
      <motion.h1
        className="text-6xl sm:text-8xl md:text-9xl font-extrabold text-gray-900 dark:text-gray-100 mb-6"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
        }}
      >
        404
      </motion.h1>
      <motion.h2
        className="mt-4 text-2xl sm:text-3xl md:text-4xl leading-tight mb-6 dark:text-dark-title text-light-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      >
        Page Not Found
      </motion.h2>
      <motion.p
        className="text-base sm:text-lg md:text-xl leading-6 mb-8 dark:text-dark-subtitle text-light-subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1 }}
      >
        Sorry, the page you are looking for does not exist.
      </motion.p>
      <motion.div
        className="mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <Link
          className="max-w-max py-2 px-6 bg-light-bgHeader dark:bg-dark-bgHeader text-light-subtitle dark:text-dark-subtitle rounded flex gap-4 items-center"
          to="/"
        >
          Go Back Home
        </Link>
      </motion.div>
    </section>
  );
};

export default NotFound;
