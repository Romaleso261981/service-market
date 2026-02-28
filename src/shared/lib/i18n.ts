import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ru from '@/locales/ru.json';
import uk from '@/locales/uk.json';

export const defaultNS = 'common';
export const supportedLngs = ['ru', 'uk'] as const;
export type Locale = (typeof supportedLngs)[number];

export const localeLabels: Record<Locale, string> = {
  ru: 'RU',
  uk: 'UA',
};

const resources = {
  ru: { [defaultNS]: ru },
  uk: { [defaultNS]: uk },
};

export function initI18n(lng: Locale = 'ru') {
  if (!i18n.isInitialized) {
    i18n.use(initReactI18next).init({
      resources,
      lng,
      fallbackLng: 'ru',
      defaultNS,
      ns: [defaultNS],
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    });
  } else if (lng && i18n.language !== lng) {
    i18n.changeLanguage(lng);
  }
  return i18n;
}

export function getStoredLanguage(): Locale {
  if (typeof window === 'undefined') return 'ru';
  const stored = localStorage.getItem('locale') as Locale | null;
  return stored && supportedLngs.includes(stored) ? stored : 'ru';
}

export function setStoredLanguage(lng: Locale) {
  if (typeof window !== 'undefined') localStorage.setItem('locale', lng);
}
