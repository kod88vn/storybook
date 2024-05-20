import i18n from 'i18next';
import { LocaleCode } from '@clover/locales';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { baseConfig } from './i18n.config';

window.addEventListener('i18nLocaleChange', ((e: CustomEvent<{ locale: LocaleCode }>) => {
  if (e.detail.locale) {
    if (process.env.NODE_ENV === 'development') {
      console.log(`changing locales to ${e.detail.locale}`);
    }

    i18n.changeLanguage(e.detail.locale);
  }
}) as EventListener);

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init(baseConfig, err => {
    if (err) console.error(`i18n Error: ${err}`);
  });
