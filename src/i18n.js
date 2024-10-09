import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enMain from "./locales/en/translation.json";
import arMain from "./locales/ar/translation.json";

const savedLanguage = localStorage.getItem("language") || "en";
i18n.use(initReactI18next).init({
  resources: {
    en: {
      main: enMain,
    },
    ar: {
      main: arMain,
    },
  },
  lng: savedLanguage, // default language
  fallbackLng: "en",
  ns: ["main"],
  defaultNS: "main",
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
