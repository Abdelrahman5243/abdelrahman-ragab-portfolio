import React, { useEffect, useState } from "react";
import { MdLightMode, MdDarkMode, MdOutlineTranslate } from "react-icons/md";
import { AiOutlineMenu } from "react-icons/ai";
import Modal from "./Modal"; // Import the Modal component
import "./header.css";

const NAV_ITEMS = [
  { label: "About", href: "#" },
  { label: "Projects", href: "#" },
  { label: "Contact", href: "#" },
];

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [theme, setTheme] = useState(
    localStorage.getItem("currentMode") ?? "dark"
  );

  useEffect(() => {
    document.body.classList.toggle("light", theme === "light");
    document.body.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("currentMode", newTheme);
    setTheme(newTheme);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <header className="flex justify-between items-center">
      <button
        onClick={() => setShowModal(true)}
        className="centered header_btn md:hidden"
      >
        <AiOutlineMenu />
      </button>

      <nav className="bg-light-bgHeader dark:bg-dark-bgHeader p-4 px-6 rounded-full hidden md:flex">
        <ul className="flex gap-4">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex gap-4">
        <button
          onClick={() => console.log("translate")}
          className="centered header_btn"
        >
          <MdOutlineTranslate />
        </button>
        <button onClick={toggleTheme} className="centered header_btn">
          {theme === "dark" ? <MdDarkMode /> : <MdLightMode />}
        </button>
      </div>

      {showModal && (
        <Modal
          ITEMS={NAV_ITEMS}
          closeModal={closeModal}
          showModal={showModal}
        />
      )}
    </header>
  );
};

export default Header;
