import React, { useEffect, useState } from "react";
import { MdLightMode, MdDarkMode, MdOutlineTranslate } from "react-icons/md";
import { AiOutlineMenu } from "react-icons/ai";
import Modal from "./Modal";
import "./header.css";
import { useTranslation } from "react-i18next";

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [theme, setTheme] = useState(
    localStorage.getItem("currentMode") ?? "dark"
  );
  const { i18n, t } = useTranslation();
  const [currentLang, setCurrentLang] = useState(
    localStorage.getItem("language") || "en"
  );

  const NAV_ITEMS = [
    { label: t("navigation.Projects"), href: "#projects" },
    { label: t("navigation.about"), href: "#about" },
    { label: t("navigation.contact"), href: "#contact" },
  ];

  useEffect(() => {
    document.body.classList.toggle("light", theme === "light");
    document.body.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    i18n.changeLanguage(currentLang);
    document.body.classList.toggle("arabic", currentLang === "ar");
  }, [currentLang, i18n]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("currentMode", newTheme);
    setTheme(newTheme);
  };

  const toggleLanguage = () => {
    const newLang = currentLang === "en" ? "ar" : "en";
    localStorage.setItem("language", newLang);
    setCurrentLang(newLang);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <header className="flex justify-between items-center py-4">
      <button
        onClick={() => setShowModal(true)}
        className="centered header_btn md:hidden"
        aria-label="Open menu"
      >
        <AiOutlineMenu />
      </button>

      <nav
        className="p-4 px-6 border border-light-border dark:border-dark-border rounded-full hidden md:flex ml-56"
        aria-label="Main navigation"
      >
        <ul className="flex gap-4">
          {NAV_ITEMS.map((item) => (
            <li key={item.label} className="hover:text-dark-blue">
              <a href={item.href} aria-label={item.label}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex gap-4">
        <button
          onClick={toggleLanguage}
          className="centered header_btn"
          aria-label={`Switch to ${
            currentLang === "en" ? "Arabic" : "English"
          }`}
        >
          <MdOutlineTranslate />
        </button>
        <button
          onClick={toggleTheme}
          className="centered header_btn"
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
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
