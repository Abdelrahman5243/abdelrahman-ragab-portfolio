import React from "react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  const NAV_ITEMS = [
    { label: t("navigation.Projects"), href: "#Projects" },
    { label: t("navigation.about"), href: "#Projects" },
    { label: t("navigation.contact"), href: "#contact" },
  ];

  return (
    <footer className="flex justify-between my-8 text-light-subtitle dark:text-dark-subtitle gap-8 items-center flex-col md:flex-row ">
      <ul className="flex gap-4">
        {NAV_ITEMS.map((item, index) => (
          <li key={index}>
            <a href={item.href}>{item.label}</a>
          </li>
        ))}
      </ul>

      <p>{t("copyright")}</p>
    </footer>
  );
};

export default Footer;
