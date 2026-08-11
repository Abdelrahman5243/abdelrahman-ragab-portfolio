// Optimized animations for better performance
// Using GPU-accelerated properties: transform (x, y, scale) and opacity

// container animation
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.15, // Reduced from 0.2 for faster perceived load
      delayChildren: 0.1,    // Reduced from 0.3
    },
  },
};

// item fade-up animation
export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.5,  // Reduced from 0.8 for snappier feel
      ease: "easeOut" 
    },
  },
};

// download icon animation - optimized to use only transform
export const downloadVariants = {
  animate: {
    y: [0, 5, 0],
    opacity: [1, 0.8, 1], // Reduced opacity change for smoother animation
    transition: {
      duration: 1.5, // Slightly slower for more subtle effect
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// skill item animation - optimized
export const skillItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.05, // Reduced from 0.08 for faster stagger
      duration: 0.3,       // Reduced from 0.4
      ease: "easeOut",
    },
  }),
};

// Contact Section Variants - optimized

export const contactIconVariants = {
  hidden: { opacity: 0, scale: 0.9 }, // Less dramatic scale for smoother animation
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.4 } // Reduced from 0.6
  },
};

export const contactTitleVariants = {
  hidden: { opacity: 0, y: -30 }, // Reduced from -50
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.4 } // Reduced from 0.6
  },
};

export const contactDescriptionVariants = {
  hidden: { opacity: 0, y: 15 }, // Reduced from 20
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.4 } // Reduced from 0.6
  },
};

export const contactFormVariants = {
  hidden: { opacity: 0, y: -40 }, // Reduced from -80
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5 } // Reduced from 0.6
  },
};

export const contactAnimationVariants = {
  hidden: { opacity: 0, y: 40 }, // Reduced from 80
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5 } // Reduced from 0.6
  },
};

export const contactSuccessVariants = {
  hidden: { opacity: 0, scale: 0.9 }, // Less dramatic scale
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4 } // Reduced from 0.6
  },
};

// Shared section variants (used in Education, Experience, etc.)

export const sectionHeaderVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 12 },
  },
};

// Accepts optional custom index for staggered delay (default i=0 → no delay)
export const sectionCardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15, delay: i * 0.1 },
  }),
};

export const listItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 120, damping: 12 },
  },
};
