import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
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
        <div className="flex justify-between items-center">
          <h1 className="text-xl">Navigation</h1>
          <button
            onClick={closeModal}
            aria-label="Close modal"
          >
            <MdOutlineClose />
          </button>
        </div>

        <ul className="divide-y divide-opacity-10 dark:divide-dark-border capitalize">
          {ITEMS.map((item) => (
            <li key={item.label} className="py-3 hover:text-dark-blue">
              <Link to={item.href} className="text-sm" onClick={closeModal}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Modal;
