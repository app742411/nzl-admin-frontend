import { useState } from "react";
import { useTranslation } from "react-i18next";
import "flag-icons/css/flag-icons.min.css"; //   Import the flag-icons CSS

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: "en", label: "English", flag: "fi fi-us" },
    { code: "ar", label: "العربية", flag: "fi fi-sa" },
  ];

  const currentLang =
    languages.find((lang) => i18n.language.startsWith(lang.code)) ||
    languages[0];

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang.code);
    document.documentElement.dir = lang.code === "ar" ? "rtl" : "ltr";
    localStorage.setItem("lang", lang.code);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Current language button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
      >
        <span className={`${currentLang.flag} text-xl`}></span>
        <span className="text-sm font-medium dark:text-gray-100">
          {currentLang.label}
        </span>
        <svg
          className={`w-4 h-4 ml-1 transition-transform ${isOpen ? "rotate-180" : ""
            }`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang)}
              className={`flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition ${i18n.language.startsWith(lang.code)
                  ? "bg-gray-100 dark:bg-gray-700"
                  : ""
                }`}
            >
              <span className={`${lang.flag} text-xl`}></span>
              <span className="dark:text-gray-100">{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
