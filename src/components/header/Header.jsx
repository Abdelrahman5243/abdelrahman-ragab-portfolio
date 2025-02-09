import React, { useState } from "react";
import { SunDim, CloudMoon, Languages, Menu } from "lucide-react";
import Modal from "./Modal";
import "./header.css";
import { useThemeMode } from "../../hooks/useThemeMode";
import { useTranslationMode } from "../../hooks/useTranslationMode";
import { HashLink } from "react-router-hash-link";

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const { theme, toggleTheme } = useThemeMode();
  const { currentLang, toggleLanguage, t } = useTranslationMode();

  const NAV_ITEMS = [
    { label: t("navigation.about"), href: "/#about" },
    { label: t("navigation.skills"), href: `/#skills` },
    { label: t("navigation.projects"), href: "/#projects" },
    { label: t("navigation.contact"), href: "/#contact" },
  ];

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
        <Menu />
      </button>
      {showModal && (
        <Modal
          ITEMS={NAV_ITEMS}
          closeModal={closeModal}
          showModal={showModal}
        />
      )}

      <nav
        className="p-4 px-6 border border-light-border dark:border-dark-border rounded-full hidden md:flex"
        aria-label="Main navigation"
      >
        <ul className="flex gap-4">
          {NAV_ITEMS.map((item) => (
            <li key={item.label} className="hover:text-dark-subtitle">
              <HashLink to={item.href} aria-label={item.label}>
                {item.label}
              </HashLink>
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
          <Languages />
        </button>
        <button
          onClick={toggleTheme}
          className="centered header_btn"
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? <CloudMoon /> : <SunDim />}
        </button>
      </div>
    </header>
  );
};

export default Header;
