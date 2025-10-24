import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const savedLanguage = localStorage.getItem("language") || "en";

i18n
  .use(HttpApi)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: `${API_BASE_URL}/{{lng}}`,
    },
    lng: savedLanguage,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    load: "languageOnly",
    react: {
      useSuspense: true,
    },
  });

export default i18n;
