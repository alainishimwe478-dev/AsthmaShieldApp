import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', name: 'EN', flag: '🇺🇸' },
  { code: 'fr', name: 'FR', flag: '🇫🇷' },
  { code: 'rw', name: 'RW', flag: '🇷🇼' },
];

// Helper to get language code without region suffix
const getLangCode = (lang: string) => {
  // Handle cases like 'en-US', 'en', 'rw-RW', etc.
  return lang.split('-')[0].toLowerCase();
};

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const currentLang = getLangCode(i18n.language);

  const handleChange = async (langCode: string) => {
    console.log("Changing language from:", i18n.language, "to:", langCode);
    await i18n.changeLanguage(langCode);
    localStorage.setItem("language", langCode);
    console.log("Language changed successfully to:", i18n.language);
  };

  return (
    <div className="0i4ob4hb flex gap-2">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleChange(lang.code)}
          className={`0ne83iwu px-2 py-1 rounded-md text-sm font-medium transition-colors ${
            currentLang === lang.code
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300'
          }`}
        >
          {lang.flag} {lang.name}
        </button>
      ))}
    </div>
  );
}
