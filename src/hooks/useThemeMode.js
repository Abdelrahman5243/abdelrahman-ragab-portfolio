import { useState, useEffect } from "react";
import { disableTransitionsMomentarily } from "../utils/disableTransitionsMomentarily";

export const useThemeMode = () => {
  const [theme, setTheme] = useState(localStorage.getItem("currentMode") ?? "light");

  useEffect(() => {
    document.body.classList.toggle("light", theme === "light");
    document.body.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    disableTransitionsMomentarily();
    const newTheme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("currentMode", newTheme);
    setTheme(newTheme);
  };

  return { theme, toggleTheme };
};
