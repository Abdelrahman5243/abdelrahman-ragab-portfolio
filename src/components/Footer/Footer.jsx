import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";

export const footerData = {
  NAV_ITEMS: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  copyright: "© 2023 Spencer Sharp. All rights reserved.",
};

const Footer = () => {
  return (
    <footer className="flex justify-between my-8 text-light-subtitle dark:text-dark-subtitle gap-8 items-center flex-col md:flex-row ">
      <ul className="flex gap-4">
        {footerData.NAV_ITEMS.map((item, index) => (
          <li key={index}>
            <Link to={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>

      <p>{footerData.copyright}</p>
    </footer>
  );
};

export default Footer;
