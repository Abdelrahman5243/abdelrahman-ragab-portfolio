import React from "react";

export const footerData = {
  NAV_ITEMS: [
    { label: "About", href: "#about" },
    { label: "projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],
  copyright: "© 2023 Spencer Sharp. All rights reserved.",
};

const Footer = () => {
  return (
    <footer className="flex justify-between my-8 text-light-subtitle dark:text-dark-subtitle gap-8 items-center flex-col md:flex-row ">
      <ul className="flex gap-4">
        {footerData.NAV_ITEMS.map((item, index) => (
          <li key={index}>
            <a href={item.href}>{item.label}</a>
          </li>
        ))}
      </ul>

      <p>{footerData.copyright}</p>
    </footer>
  );
};

export default Footer;
