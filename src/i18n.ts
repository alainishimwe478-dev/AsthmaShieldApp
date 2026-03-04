import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './i18n/en.json';
import frTranslation from './i18n/fr.json';
import rwTranslation from './i18n/rw.json';

const resources = {
  en: { translation: enTranslation },
  fr: { translation: frTranslation },
  rw: { translation: rwTranslation },
};

// Get saved language from localStorage or default to 'en'
const getSavedLanguage = () => {
  try {
    const saved = localStorage.getItem("language");
    // If saved language exists and is one of our supported languages, use it
    if (saved && ["en", "rw", "fr"].includes(saved)) {
      return saved;
    }
    // Otherwise try browser language
    const browserLang = navigator.language?.split("-")[0];
    if (browserLang && ["en", "rw", "fr"].includes(browserLang)) {
      return browserLang;
    }
  } catch (e) {
    // localStorage might not be available
    console.warn("Could not access localStorage:", e);
  }
  // Default to English
  return "en";
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: getSavedLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    compatibilityJSON: 'v4',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'language',
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;
