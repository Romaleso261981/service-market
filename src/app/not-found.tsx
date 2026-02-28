'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { isValidUrlLocale, DEFAULT_URL_LOCALE } from '@/shared/config/locale-url';

export default function NotFound() {
  const pathname = usePathname() ?? '';
  const segment = pathname.split('/')[1] ?? '';
  const locale = isValidUrlLocale(segment) ? segment : DEFAULT_URL_LOCALE;
  const homeHref = `/${locale}`;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md text-center">
        <p className="text-6xl font-bold text-primary">404</p>
        <h1 className="mt-4 text-xl font-semibold text-gray-900">
          Сторінку не знайдено
        </h1>
        <p className="mt-3 text-gray-600">
          Ми приносимо свої вибачення. Ми працюємо над створенням цієї сторінки.
        </p>
        <p className="mt-2 text-gray-600">
          А поки ви можете повернутися на головну.
        </p>
        <Link
          href={homeHref}
          className="mt-6 inline-block rounded-lg bg-primary px-6 py-3 font-medium text-white transition-colors hover:bg-primary/90"
        >
          На головну
        </Link>
      </div>
    </div>
  );
}
