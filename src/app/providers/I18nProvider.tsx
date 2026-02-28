'use client';

import { useMemo, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import { initI18n, getStoredLanguage } from '@/shared/lib/i18n';

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const i18n = useMemo(() => initI18n('ru'), []);

  useEffect(() => {
    const stored = getStoredLanguage();
    if (stored !== i18n.language) i18n.changeLanguage(stored);
  }, [i18n]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
