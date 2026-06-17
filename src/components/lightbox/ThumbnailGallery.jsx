import { useState } from "react";
import { createPortal } from "react-dom";
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

  const goToNext = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const goToPrev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") goToNext();
    if (e.key === "ArrowLeft") goToPrev();
    if (e.key === "Escape") closeLightbox();
  };

  return (
    <>
      {/* Thumbnail Gallery */}
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

      {/* Lightbox Portal */}
      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeLightbox}
              onKeyDown={handleKeyDown}
              tabIndex={-1}
              className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex items-center justify-center"
            >
              {/* Close */}
              <button
                onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X size={20} className="text-white" />
              </button>

              {/* Image */}
              <motion.img
                key={currentIndex}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.25 }}
                src={images[currentIndex]}
                alt={`Gallery ${currentIndex + 1}`}
                onClick={(e) => e.stopPropagation()}
                className="max-w-[85vw] max-h-[85vh] object-contain rounded-lg"
              />

              {/* Prev / Next */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); goToPrev(); }}
                    className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    <ChevronLeft size={22} className="text-white" />
                  </button>

                  <button
                    onClick={(e) => { e.stopPropagation(); goToNext(); }}
                    className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    <ChevronRight size={22} className="text-white" />
                  </button>

                  <div className="absolute bottom-5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium">
                    {currentIndex + 1} / {images.length}
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

export default ThumbnailGallery;
