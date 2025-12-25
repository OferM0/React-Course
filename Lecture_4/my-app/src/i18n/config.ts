import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import commonEn from './locales/en/common.json';
import productsEn from './locales/en/products.json';
import commonHe from './locales/he/common.json';
import productsHe from './locales/he/products.json';

const savedLanguage = localStorage.getItem('app-language') || 'en';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: savedLanguage, 
    fallbackLng: 'en',
    ns: ['common', 'products'],
    defaultNS: 'common',
    resources: {
      en: {
        common: commonEn,
        products: productsEn,
      },
      he: {
        common: commonHe,
        products: productsHe,
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;