import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const ThumbnailGallery = ({ images = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setIsOpen(false);
    document.body.style.overflow = "unset";
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleKeyDown = (e) => {
    if (!isOpen) return;
    if (e.key === "ArrowRight") goToNext();
    if (e.key === "ArrowLeft") goToPrev();
    if (e.key === "Escape") closeLightbox();
  };

  if (typeof window !== "undefined") {
    window.addEventListener("keydown", handleKeyDown);
  }

  return (
    <>
      {/* Horizontal Thumbnail Gallery */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-8 sm:mt-10"
      >
        <h3 className="text-sm sm:text-base font-medium text-light-title dark:text-dark-title mb-4 px-2 sm:px-4">
          Gallery
        </h3>

        {/* Scrollable Thumbnail Container */}
        <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide px-2 sm:px-4">
          {images.map((image, index) => (
            <motion.button
              key={index}
              onClick={() => openLightbox(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0 relative overflow-hidden rounded-lg border-2 border-transparent group/thumb"
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-20 sm:w-24 h-20 sm:h-24 object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover/thumb:bg-black/50 transition-colors duration-300" />
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full h-full flex items-center justify-center px-4 sm:px-8"
            >
              <img
                src={images[currentIndex]}
                alt={`Gallery ${currentIndex + 1}`}
                className="max-w-full max-h-[90vh] object-contain"
              />

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={closeLightbox}
                className="absolute top-4 right-4 sm:top-8 sm:right-8 p-2 sm:p-3 rounded-full bg-black/60 hover:bg-black/80 transition-colors"
              >
                <X size={24} className="text-white" />
              </motion.button>

              {images.length > 1 && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      goToPrev();
                    }}
                    className="absolute left-4 sm:left-8 p-2 sm:p-3 rounded-full bg-black/10 hover:bg-black/20 transition-colors"
                  >
                    <ChevronLeft size={24} className="text-white" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      goToNext();
                    }}
                    className="absolute right-4 sm:right-8 p-2 sm:p-3 rounded-full bg-black/10 hover:bg-black/20 transition-colors"
                  >
                    <ChevronRight size={24} className="text-white" />
                  </motion.button>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium"
                  >
                    {currentIndex + 1} / {images.length}
                  </motion.div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ThumbnailGallery;
