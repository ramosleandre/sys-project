/**
 * i18n — FR/EN.
 * Drop-in: `npm i i18next react-i18next` then wire `App.tsx` to the helper below.
 *
 * All UI copy MUST come through `t('key')`. Never hardcode strings inside screens.
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import fr from './fr.json';
import en from './en.json';

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v4',
    lng: Localization.getLocales()[0]?.languageCode?.startsWith('fr') ? 'fr' : 'en',
    fallbackLng: 'fr',
    resources: {
      fr: { translation: fr },
      en: { translation: en },
    },
    interpolation: { escapeValue: false },
  });

export default i18n;

/** Switch language at runtime: `setLang('en')` */
export const setLang = (lang: 'fr' | 'en') => i18n.changeLanguage(lang);
