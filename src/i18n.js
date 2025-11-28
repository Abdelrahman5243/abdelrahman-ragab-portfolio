import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import ChainedBackend from "i18next-chained-backend";
import LocalStorageBackend from "i18next-localstorage-backend";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const savedLanguage = localStorage.getItem("language") || "en";

i18n
  // Use chained backend: localStorage cache -> HTTP fallback
  .use(ChainedBackend)
  .use(initReactI18next)
  .init({
    // Backend configuration with caching
    backend: {
      backends: [
        LocalStorageBackend,  // Primary: check localStorage first
        HttpApi               // Fallback: fetch from API if not in cache
      ],
      backendOptions: [
        {
          // LocalStorageBackend options
          prefix: 'i18next_res_',
          expirationTime: 7 * 24 * 60 * 60 * 1000, // 7 days
          defaultVersion: 'v1.0',
          versions: {
            en: 'v1.0',
            ar: 'v1.0',
          },
          store: typeof window !== 'undefined' ? window.localStorage : null,
        },
        {
          // HttpApi options
          loadPath: `${API_BASE_URL}/{{lng}}`,
          requestOptions: {
            cache: 'default', // Use browser's HTTP cache
          },
          allowMultiLoading: false,
          crossDomain: false,
        }
      ]
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
    // Preload both languages for instant switching
    preload: ['en', 'ar'],
    // Namespace configuration
    ns: ['main'],
    defaultNS: 'main',
  });

export default i18n;
