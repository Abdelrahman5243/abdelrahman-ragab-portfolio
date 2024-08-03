import React from "react";
import "./footer.css";
const Footer = () => {
  return (
    <footer className="flex justify-between my-8 text-light-subtitle dark:text-dark-subtitle gap-8 items-center flex-col md:flex-row ">
      <ul className="flex gap-4">
        <li>
          <a href="">About</a>
        </li>
        <li>
          <a href="">Projects</a>
        </li>
        <li>
          <a href="">Contact</a>
        </li>
      </ul>

      <p>© 2023 Spencer Sharp. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
