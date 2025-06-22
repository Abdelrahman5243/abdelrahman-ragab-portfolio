import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend"; 

const savedLanguage = localStorage.getItem("language") || "en";

i18n
  .use(HttpApi) 
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: "https://portfolio-express-production-f354.up.railway.app/{{lng}}",
    },
    lng: savedLanguage,
    fallbackLng: "en",
    ns: ["main"],
    defaultNS: "main",
    interpolation: {
      escapeValue: false,
    },
    load: "languageOnly",
    react: {
      useSuspense: true,
    },
  });

export default i18n;
