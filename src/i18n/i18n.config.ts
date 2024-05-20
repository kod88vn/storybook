import { getDataCenter, LANGUAGES, LOCALES } from '@clover/locales';
import * as i18next from 'i18next';

import resources from '../locales';

const CURRENT_DATA_CENTER = getDataCenter();
export const CURRENT_I18N_KEY = `${CURRENT_DATA_CENTER.code}.Locale`;

export const baseConfig: i18next.InitOptions = {
  resources,
  debug: process.env.NODE_ENV === 'development',
  fallbackLng: 'en-US',
  ns: ['common'],
  defaultNS: 'common',
  supportedLngs: [...Object.keys(LOCALES), ...Object.keys(LANGUAGES)],
  partialBundledLanguages: true,
  saveMissing: true,

  missingKeyHandler: (lng, namespace, key) => {
    const message = `Failed to load ${namespace}:${key} for locale ${lng}`;
    if (process.env.NODE_ENV === 'development') console.error(message);
  },

  detection: {
    // order and from where user language should be detected
    order: ['htmlTag', 'querystring', 'localStorage', 'navigator'],

    // keys or params to lookup language from
    lookupQuerystring: 'lng',
    lookupLocalStorage: CURRENT_I18N_KEY,
    lookupCookie: 'i18next',

    // Do not cache the user's selected language
    caches: [],
  },

  interpolation: {
    escapeValue: false, // explicitly set to false for usage with react
  },

  react: { useSuspense: true },
};
