import React, { useRef, useEffect } from "react";
import { X } from "lucide-react";
import { HashLink } from "react-router-hash-link";

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
      className={`fixed inset-0 z-40 bg-dark-secondary bg-opacity-70 backdrop-blur items-start justify-center ${
        showModal ? "flex" : "hidden"
      }`}
      role="dialog"
      aria-labelledby="modal-title"
      aria-hidden={!showModal}
    >
      <div
        ref={modalRef}
        className="model max-w-[90%] w-[330px] relative bg-light-secondary dark:bg-dark-bgHeader modal-animation
         mt-10 rounded-lg p-8 flex flex-col gap-4 text-light-subtitle dark:text-dark-subtitle"
      >
        <button
          className="self-end"
          onClick={closeModal}
          aria-label="Close modal"
        >
          <X />
        </button>

        <ul className="divide-y divide-opacity-10 dark:divide-dark-border capitalize">
          {ITEMS.map((item) => (
            <li key={item.label} className="py-3 hover:text-dark-blue">
              <HashLink to={item.href} className="text-sm" onClick={closeModal}>
                {item.label}
              </HashLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Modal;
