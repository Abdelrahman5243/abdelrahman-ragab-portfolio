import React from "react";
import { useTranslation } from "react-i18next";
import { HashLink } from "react-router-hash-link";

const Footer = () => {
  const { t } = useTranslation();

  const NAV_ITEMS = [
    { label: t("navigation.about"), href: "/#about" },
    { label: t("navigation.skills"), href: "/#skills" },
    { label: t("navigation.projects"), href: "/#projects" },
    { label: t("navigation.contact"), href: "/#contact" },
  ];

  return (
    <footer
      id="footer"
      className="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6 md:gap-8 my-6 sm:my-8 px-2 sm:px-4 text-light-subtitle dark:text-dark-subtitle text-xs sm:text-sm md:text-base"
    >
      <ul className="flex flex-wrap justify-center gap-3 sm:gap-4">
        {NAV_ITEMS.map((item, index) => (
          <li key={index}>
            <HashLink
              to={item.href}
              className="hover:underline hover:text-light-title dark:hover:text-dark-title transition-colors"
            >
              {item.label}
            </HashLink>
          </li>
        ))}
      </ul>

      <p className="text-center text-[11px] sm:text-xs md:text-sm mt-2 md:mt-0 break-words">
        {t("copyright")}
      </p>
    </footer>
  );
};

export default Footer;
