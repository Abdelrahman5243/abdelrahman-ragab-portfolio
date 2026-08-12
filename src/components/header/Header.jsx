import { useState, useEffect } from "react";
import { SunDim, CloudMoon, Languages, Menu } from "lucide-react";
import Modal from "./Modal";
import PalettePicker from "./PalettePicker";
import "./header.css";
import { useThemeMode } from "../../hooks/useThemeMode";
import { useTranslationMode } from "../../hooks/useTranslationMode";
import { useTranslation } from "react-i18next";
import { HashLink } from "react-router-hash-link";
import { useLocation } from "react-router-dom";

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const { theme, toggleTheme } = useThemeMode();
  const { currentLang, toggleLanguage, t } = useTranslationMode();
  const { i18n } = useTranslation();
  const location = useLocation();
  const isArticlePage = /^\/article\/[^/]+$/.test(location.pathname);

  const NAV_ITEMS = [
    { label: t("navigation.about"), href: "/#about" },
    { label: t("navigation.skills"), href: "/#skills" },
    { label: t("navigation.experience"), href: "/#experience" },
    { label: t("navigation.projects"), href: "/#projects" },
    { label: t("navigation.contact"), href: "/#contact" },
    { label: t("navigation.articles"), href: "/all-articles" },
  ];

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (isArticlePage && currentLang !== "en") {
      i18n.changeLanguage("en");
      localStorage.setItem("language", "en");
      document.body.classList.remove("arabic");
    }
  }, [isArticlePage, currentLang, i18n]);

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
        className="p-2 px-3 sm:p-3 sm:px-5 border border-light-border dark:border-dark-border rounded-full hidden md:flex bg-light-secondary/70 dark:bg-dark-secondary/70 backdrop-blur-xl"
        aria-label="Main navigation"
      >
        <ul className="flex gap-3 sm:gap-4 md:gap-5 lg:gap-6 text-sm md:text-base font-medium tracking-tight">
          {NAV_ITEMS.map((item) => (
            <li
              key={item.label}
              className="hover:text-light-blue dark:hover:text-dark-blue whitespace-nowrap"
            >
              <HashLink to={item.href} aria-label={item.label}>
                {item.label}
              </HashLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex gap-4">
        {!isArticlePage && (
          <button
            onClick={toggleLanguage}
            className="centered header_btn"
            aria-label={`Switch to ${
              currentLang === "en" ? "Arabic" : "English"
            }`}
          >
            <Languages />
          </button>
        )}
        <PalettePicker />
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
