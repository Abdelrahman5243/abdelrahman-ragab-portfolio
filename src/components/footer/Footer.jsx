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
      className="flex justify-between my-8 text-light-subtitle dark:text-dark-subtitle gap-8 items-center flex-col md:flex-row "
    >
      <ul className="flex gap-4">
        {NAV_ITEMS.map((item, index) => (
          <li key={index}>
            <HashLink to={item.href}>{item.label}</HashLink>
          </li>
        ))}
      </ul>

      <p>{t("copyright")}</p>
    </footer>
  );
};

export default Footer;
