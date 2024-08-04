import React, { useRef, useEffect } from "react";
import { MdOutlineClose } from "react-icons/md";

const Modal = ({ ITEMS, closeModal, showModal }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showModal, closeModal]);

  return (
    <div
      className="fixed inset-0 z-10 bg-dark-secondary bg-opacity-70 backdrop-blur-sm"
      role="dialog"
      aria-labelledby="modal-title"
      aria-hidden={!showModal}
    >
      <div
        ref={modalRef}
        className="model w-[60%] relative bg-light-secondary dark:bg-dark-secondary modal-animation w-1/3 mx-auto mt-8 rounded-lg p-4"
      >
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-base"
          aria-label="Close modal"
        >
          <MdOutlineClose />
        </button>
        <ul>
          {ITEMS.map((item) => (
            <li key={item.label} className="py-2">
              <a
                href={item.href}
                className="text-sm text-light-title dark:text-dark-title"
                onClick={closeModal}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Modal;