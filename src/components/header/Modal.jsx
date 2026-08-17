import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { HashLink } from "react-router-hash-link";
import { useLocation } from "react-router-dom";

const Modal = ({ ITEMS, closeModal, showModal }) => {
  const modalRef = useRef(null);
  const location = useLocation();

  const isActive = (href) => {
    const [path, hash] = href.split("#");
    if (hash) return location.pathname === path && location.hash === `#${hash}`;
    if (href === "/projects") {
      return location.pathname === "/projects" || location.pathname.startsWith("/project-details/");
    }
    if (href === "/all-articles") {
      return location.pathname === "/all-articles" || location.pathname.startsWith("/article/");
    }
    return location.pathname === href;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showModal, closeModal]);

  return createPortal(
    <div
      className={`fixed inset-0 z-[60] bg-dark-secondary bg-opacity-70 backdrop-blur-sm items-start justify-center modal-overlay ${
        showModal ? "flex" : "hidden"
      }`}
      role="dialog"
      aria-labelledby="modal-title"
      aria-hidden={!showModal}
    >
      <div
        ref={modalRef}
        className="model w-[min(300px,calc(100vw-2rem))] relative bg-light-secondary dark:bg-dark-bgHeader modal-animation
         mt-6 rounded-lg p-6 flex flex-col gap-2 text-light-subtitle dark:text-dark-subtitle"
      >
        <button className="self-end" onClick={closeModal} aria-label="Close modal">
          <X />
        </button>

        <ul className="divide-y divide-opacity-10 dark:divide-dark-border capitalize">
          {ITEMS.map((item) => (
            <li key={item.label}>
              <HashLink
                to={item.href}
                className={`flex items-center rounded-lg px-3 py-2.5 text-sm transition-colors duration-200 ${
                  isActive(item.href)
                    ? "bg-light-blue/10 dark:bg-dark-blue/10 text-light-blue dark:text-dark-blue"
                    : "hover:bg-light-bgHeader dark:hover:bg-dark-bgHeader hover:text-light-blue dark:hover:text-dark-blue"
                }`}
                aria-current={isActive(item.href) ? "page" : undefined}
                onClick={closeModal}
              >
                {item.label}
              </HashLink>
            </li>
          ))}
        </ul>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
