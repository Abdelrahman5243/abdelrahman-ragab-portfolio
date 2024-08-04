import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdLightMode, MdDarkMode, MdOutlineTranslate } from "react-icons/md";
import { AiOutlineMenu } from "react-icons/ai";
import Modal from "./Modal";
import "./header.css";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
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
    <header className="flex justify-between items-center py-4">
      <button
        onClick={() => setShowModal(true)}
        className="centered header_btn md:hidden"
      >
        <AiOutlineMenu />
      </button>

      <nav
        className=" p-4 px-6 border border-light-border dark:border-dark-border
      rounded-full hidden md:flex ml-56"
      >
        <ul className="flex gap-4">
          {NAV_ITEMS.map((item) => (
            <li key={item.label} className="hover:text-dark-blue">
              <Link to={item.href}>{item.label}</Link>
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
