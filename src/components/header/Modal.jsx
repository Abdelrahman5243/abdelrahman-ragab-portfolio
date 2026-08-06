import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { HashLink } from "react-router-hash-link";

const EASE_OUT = [0.16, 1, 0.3, 1];

const Modal = ({ ITEMS, closeModal, showModal, controls }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (showModal) {
      document.body.style.overflow = "hidden";
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.body.style.overflow = "";
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [showModal, closeModal]);

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          className="mobile-menu-overlay flex"
          role="dialog"
          aria-labelledby="modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE_OUT }}
        >
          <motion.div
            ref={modalRef}
            className="mobile-menu-panel"
            aria-labelledby="modal-title"
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
          >
            <button
              className="mobile-menu-close"
              onClick={closeModal}
              aria-label="Close modal"
            >
              <X />
            </button>

            <h2 id="modal-title" className="mobile-menu-title">Menu</h2>
            <ul className="mobile-menu-list">
              {ITEMS.map((item) => (
                <li key={item.label} className="py-3 hover:text-dark-blue">
                  <HashLink to={item.href} className="text-sm" onClick={closeModal}>
                    {item.label}
                  </HashLink>
                </li>
              ))}
            </ul>
            {controls && <div className="mobile-menu-controls">{controls}</div>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

Modal.propTypes = {
  ITEMS: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
  })).isRequired,
  closeModal: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  controls: PropTypes.node,
};

export default Modal;
