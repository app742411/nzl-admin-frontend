import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import ar from "./locales/ar.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
    fallbackLng: "en", // default
    detection: {
      order: ["localStorage", "navigator", "htmlTag", "path", "subdomain"],
      caches: ["localStorage"],
    },
    interpolation: {
      escapeValue: false,
    },
  });

// Handle RTL direction
const currentLang = localStorage.getItem("i18nextLng") || "en";
document.documentElement.dir = currentLang.startsWith("ar") ? "rtl" : "ltr";

i18n.on("languageChanged", (lng) => {
  document.documentElement.dir = lng.startsWith("ar") ? "rtl" : "ltr";
  document.documentElement.lang = lng;
});

export default i18n;
