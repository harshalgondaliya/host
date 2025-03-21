import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import individual translation files
// This is more reliable than dynamic imports in browser environments
import enTranslation from './locales/en/translation.json';
import esTranslation from './locales/es/translation.json';
import frTranslation from './locales/fr/translation.json';
import deTranslation from './locales/de/translation.json';
import zhTranslation from './locales/zh/translation.json';
import hiTranslation from './locales/hi/translation.json';
import bnTranslation from './locales/bn/translation.json';
import teTranslation from './locales/te/translation.json';
import mrTranslation from './locales/mr/translation.json';
import taTranslation from './locales/ta/translation.json';
import urTranslation from './locales/ur/translation.json';
import guTranslation from './locales/gu/translation.json';
import knTranslation from './locales/kn/translation.json';
import mlTranslation from './locales/ml/translation.json';
import paTranslation from './locales/pa/translation.json';
import orTranslation from './locales/or/translation.json';
import asTranslation from './locales/as/translation.json';
import sdTranslation from './locales/sd/translation.json';
import saTranslation from './locales/sa/translation.json';
import ksTranslation from './locales/ks/translation.json';
import brxTranslation from './locales/brx/translation.json';
import jaTranslation from './locales/ja/translation.json';
import koTranslation from './locales/ko/translation.json';
import viTranslation from './locales/vi/translation.json';
import thTranslation from './locales/th/translation.json';
import idTranslation from './locales/id/translation.json';
import itTranslation from './locales/it/translation.json';
import nlTranslation from './locales/nl/translation.json';
import ptTranslation from './locales/pt/translation.json';
import plTranslation from './locales/pl/translation.json';
import ruTranslation from './locales/ru/translation.json';
import svTranslation from './locales/sv/translation.json';
import arTranslation from './locales/ar/translation.json';
import heTranslation from './locales/he/translation.json';
import trTranslation from './locales/tr/translation.json';

// Create resources object with all translations
const resources = {
  en: { translation: enTranslation },
  es: { translation: esTranslation },
  fr: { translation: frTranslation },
  de: { translation: deTranslation },
  zh: { translation: zhTranslation },
  hi: { translation: hiTranslation },
  bn: { translation: bnTranslation },
  te: { translation: teTranslation },
  mr: { translation: mrTranslation },
  ta: { translation: taTranslation },
  ur: { translation: urTranslation },
  gu: { translation: guTranslation },
  kn: { translation: knTranslation },
  ml: { translation: mlTranslation },
  pa: { translation: paTranslation },
  or: { translation: orTranslation },
  as: { translation: asTranslation },
  sd: { translation: sdTranslation },
  sa: { translation: saTranslation },
  ks: { translation: ksTranslation },
  brx: { translation: brxTranslation },
  ja: { translation: jaTranslation },
  ko: { translation: koTranslation },
  vi: { translation: viTranslation },
  th: { translation: thTranslation },
  id: { translation: idTranslation },
  it: { translation: itTranslation },
  nl: { translation: nlTranslation },
  pt: { translation: ptTranslation },
  pl: { translation: plTranslation },
  ru: { translation: ruTranslation },
  sv: { translation: svTranslation },
  ar: { translation: arTranslation },
  he: { translation: heTranslation },
  tr: { translation: trTranslation }
};

// Initialize i18next
i18n
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next
  .use(initReactI18next)
  // init i18next
  .init({
    resources,
    fallbackLng: 'en',
    debug: true, // Set to true temporarily for debugging
    
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    
    // language detection options
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    
    // React specific options
    react: {
      useSuspense: false
    }
  })
  .then(() => {
    console.log('i18n initialized successfully!');
    console.log('Available languages:', Object.keys(resources));
    console.log('Current language:', i18n.language);
  })
  .catch(error => {
    console.error('Error initializing i18n:', error);
  });

export default i18n; 