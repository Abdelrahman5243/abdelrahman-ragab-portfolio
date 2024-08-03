import React from "react";
import {
  MdLightMode,
  MdDarkMode,
  MdArrowRightAlt,
  MdMail,
} from "react-icons/md";
import { FaHome } from "react-icons/fa";
import {
  AiFillLinkedin,
  AiOutlineCodepen,
  AiFillGithub,
  AiOutlineLink,
  AiOutlineMenu,
} from "react-icons/ai";

const UsedIcons = () => {
  const iconStyle = { margin: "0 10px", fontSize: "24px" };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <FaHome size={32} color="#007bff" />

      <MdLightMode style={iconStyle} aria-label="Light Mode" />
      <MdDarkMode style={iconStyle} aria-label="Dark Mode" />
      <AiFillLinkedin style={iconStyle} aria-label="LinkedIn" />
      <AiOutlineCodepen style={iconStyle} aria-label="CodePen" />
      <AiFillGithub style={iconStyle} aria-label="GitHub" />
      <MdArrowRightAlt style={iconStyle} aria-label="Arrow Right" />
      <AiOutlineLink style={iconStyle} aria-label="Link" />
      <MdMail style={iconStyle} aria-label="Mail" />
      <AiOutlineMenu style={iconStyle} aria-label="Menu" />
    </div>
  );
};

export default UsedIcons;
