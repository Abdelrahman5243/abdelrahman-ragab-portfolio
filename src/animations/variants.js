// container animation
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

// item fade-up animation
export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

// download icon animation
export const downloadVariants = {
  animate: {
    y: [0, 5, 0],
    opacity: [1, 0.7, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};


// // project card animation
// export const projectCardVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: (index = 0) => ({
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.5,
//       delay: index * 0.1, // stagger by index
//     },
//   }),
//   exit: {
//     opacity: 0,
//     y: -20,
//     transition: { duration: 0.3 },
//   },
//   hover: {
//     scale: 1.03,
//     transition: { type: "spring", stiffness: 300 },
//   },
// };

// skill item animation
export const skillItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.08,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

// Contact Section Variants

export const contactIconVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
};

export const contactTitleVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export const contactDescriptionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export const contactFormVariants = {
  hidden: { opacity: 0, y: -80 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export const contactAnimationVariants = {
  hidden: { opacity: 0, y: 80 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export const contactSuccessVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
};
