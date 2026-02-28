'use client';

import { useMemo } from 'react';
import { I18nextProvider } from 'react-i18next';
import { initI18n } from '@/shared/lib/i18n';
import { URL_LOCALE_TO_I18N, type UrlLocale } from '@/shared/config/locale-url';

export function I18nProvider({
  urlLocale,
  children,
}: {
  urlLocale: UrlLocale;
  children: React.ReactNode;
}) {
  const lng = URL_LOCALE_TO_I18N[urlLocale];
  const i18n = useMemo(() => initI18n(lng), [lng]);

  if (i18n.language !== lng) {
    i18n.changeLanguage(lng);
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
