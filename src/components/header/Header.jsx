import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SunDim, CloudMoon, Languages, Menu } from "lucide-react";
import Modal from "./Modal";
import PalettePicker from "./PalettePicker";
import "./header.css";
import { useThemeMode } from "../../hooks/useThemeMode";
import { useTranslationMode } from "../../hooks/useTranslationMode";
import { useTranslation } from "react-i18next";
import { HashLink } from "react-router-hash-link";
import { useLocation } from "react-router-dom";
import { HashLink as BrandLink } from "react-router-hash-link";

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

  const headerControls = (
    <>
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
        className="centered header_btn overflow-hidden"
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={theme}
            className="centered"
            initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {theme === "dark" ? <CloudMoon /> : <SunDim />}
          </motion.span>
        </AnimatePresence>
      </button>
    </>
  );

  useEffect(() => {
    if (isArticlePage && currentLang !== "en") {
      i18n.changeLanguage("en");
      localStorage.setItem("language", "en");
      document.body.classList.remove("arabic");
    }
  }, [isArticlePage, currentLang, i18n]);

  return (
    <header className="site-header flex justify-between items-center py-4">
      <BrandLink to="/#about" className="site-brand" aria-label="Go to homepage">
        <img src="/letter-a.png" alt="Abdelrahman Ragab logo" />
        <span>AR<span className="site-brand-dot">.</span></span>
      </BrandLink>
      <button
        onClick={() => setShowModal(true)}
        className="centered header_btn md:hidden"
        aria-label="Open menu"
      >
        <Menu />
      </button>
      <Modal
        ITEMS={NAV_ITEMS}
        closeModal={closeModal}
        showModal={showModal}
        controls={headerControls}
      />
      <nav className="hidden md:flex" aria-label="Main navigation">
        <ul className="flex gap-6 lg:gap-8 text-sm font-medium">
          {NAV_ITEMS.map((item) => (
            <li
              key={item.label}
              className="text-light-title dark:text-dark-title whitespace-nowrap"
            >
              <HashLink to={item.href} aria-label={item.label}>
                {item.label}
              </HashLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="hidden md:flex gap-4">
        {headerControls}
      </div>
    </header>
  );
};

export default Header;
