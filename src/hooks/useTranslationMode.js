import { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";

export const useTranslationMode = () => {
  const { i18n, t } = useTranslation();
  const [currentLang, setCurrentLang] = useState(
    localStorage.getItem("language") || "en"
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    i18n.changeLanguage(currentLang).then(() => {
      document.body.classList.toggle("arabic", currentLang === "ar");
      setIsLoading(false);
    });
  }, [currentLang, i18n]);

  const toggleLanguage = () => {
    const newLang = currentLang === "en" ? "ar" : "en";
    localStorage.setItem("language", newLang);
    setCurrentLang(newLang);
  };

  return { currentLang, toggleLanguage, t, isLoading };
}; 