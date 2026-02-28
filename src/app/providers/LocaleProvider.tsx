'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { UrlLocale } from '@/shared/config/locale-url';

const LocaleContext = createContext<UrlLocale | null>(null);

export function LocaleProvider({
  locale,
  children,
}: {
  locale: UrlLocale;
  children: ReactNode;
}) {
  return (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): UrlLocale {
  const locale = useContext(LocaleContext);
  if (locale == null) {
    throw new Error('useLocale must be used within LocaleProvider (under [locale] route)');
  }
  return locale;
}

/** Повертає шлях з префіксом локалі, напр. localePath('/cart') => '/ua/cart' */
export function useLocalePath() {
  const locale = useLocale();
  return (path: string) => {
    const p = path.startsWith('/') ? path : `/${path}`;
    return `/${locale}${p}`;
  };
}
