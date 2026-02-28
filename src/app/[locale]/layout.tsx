import { redirect } from 'next/navigation';
import {
  isValidUrlLocale,
  DEFAULT_URL_LOCALE,
  type UrlLocale,
} from '@/shared/config/locale-url';
import { LocaleProvider } from '@/app/providers/LocaleProvider';
import { I18nProvider } from '@/app/providers/I18nProvider';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidUrlLocale(locale)) {
    redirect(`/${DEFAULT_URL_LOCALE}`);
  }

  return (
    <LocaleProvider locale={locale as UrlLocale}>
      <I18nProvider urlLocale={locale as UrlLocale}>
        {children}
      </I18nProvider>
    </LocaleProvider>
  );
}
