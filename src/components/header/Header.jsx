import { useState, useEffect } from "react";
import { SunDim, CloudMoon, Languages, Menu } from "lucide-react";
import Modal from "./Modal";
import PalettePicker from "./PalettePicker";
import "./header.css";
import { useThemeMode } from "../../hooks/useThemeMode";
import { useTranslationMode } from "../../hooks/useTranslationMode";
import { useTranslation } from "react-i18next";
import { HashLink } from "react-router-hash-link";
import { NavLink, useLocation } from "react-router-dom";

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
    { label: t("navigation.experience"), href: "/experience" },
    { label: t("navigation.projects"), href: "/projects" },
    { label: t("navigation.contact"), href: "/contact" },
    { label: t("navigation.articles"), href: "/all-articles" },
  ];

  const closeModal = () => {
    setShowModal(false);
  };

  const isNavItemActive = (href) => {
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

  const linkClassName = (href) => `
    inline-flex items-center rounded-full px-2.5 py-1
    whitespace-nowrap transition-colors duration-200
    ${
      isNavItemActive(href)
        ? "bg-light-blue/10 dark:bg-dark-blue/10 text-light-blue dark:text-dark-blue"
        : "text-light-title dark:text-dark-title hover:text-light-blue dark:hover:text-dark-blue"
    }
  `;

  useEffect(() => {
    if (isArticlePage && currentLang !== "en") {
      i18n.changeLanguage("en");
      localStorage.setItem("language", "en");
      document.body.classList.remove("arabic");
      document.documentElement.lang = "en";
      document.documentElement.dir = "ltr";
    }
  }, [isArticlePage, currentLang, i18n]);

  return (
    <header className="flex justify-between items-center py-4">
      <button
        onClick={() => setShowModal(true)}
        className="centered header_btn lg:hidden"
        aria-label="Open menu"
      >
        <Menu />
      </button>
      {showModal && <Modal ITEMS={NAV_ITEMS} closeModal={closeModal} showModal={showModal} />}
      <nav
        className="p-1.5 px-2 sm:p-1.5 sm:px-3 border border-light-border dark:border-dark-border rounded-full hidden lg:flex bg-light-secondary/70 dark:bg-dark-secondary/70 backdrop-blur-xl"
        aria-label="Main navigation"
      >
        <ul className="flex gap-1.5 sm:gap-2 md:gap-3 text-sm md:text-base font-medium tracking-tight">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              {item.href.includes("#") ? (
                <HashLink
                  to={item.href}
                  aria-label={item.label}
                  className={linkClassName(item.href)}
                  aria-current={isNavItemActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                </HashLink>
              ) : (
                <NavLink
                  to={item.href}
                  aria-label={item.label}
                  className={linkClassName(item.href)}
                  aria-current={isNavItemActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex gap-4">
        {!isArticlePage && (
          <button
            onClick={toggleLanguage}
            className="centered header_btn"
            aria-label={`Switch to ${currentLang === "en" ? "Arabic" : "English"}`}
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
