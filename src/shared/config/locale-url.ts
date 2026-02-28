/**
 * Локаль у URL: /ua та /ru. Джерело правди для мови — посилання.
 */
export const URL_LOCALES = ['ua', 'ru'] as const;
export type UrlLocale = (typeof URL_LOCALES)[number];

export const DEFAULT_URL_LOCALE: UrlLocale = 'ua';

/** Відповідність URL-локалі та коду мови i18next (uk = українська, ru = російська) */
export const URL_LOCALE_TO_I18N: Record<UrlLocale, 'uk' | 'ru'> = {
  ua: 'uk',
  ru: 'ru',
};

export const I18N_TO_URL_LOCALE: Record<'uk' | 'ru', UrlLocale> = {
  uk: 'ua',
  ru: 'ru',
};

export function isValidUrlLocale(value: string): value is UrlLocale {
  return URL_LOCALES.includes(value as UrlLocale);
}
