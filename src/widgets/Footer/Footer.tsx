'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { mainCategories } from '@/shared/config/categories';

const sitePhone = '0 (800) 752 110';
const sitePhones = ['(067) 468 33 55', '(093) 468 33 55', '(050) 468 33 55'];

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="font-semibold text-gray-900">{t('site.name')}</h3>
            <p className="mt-1 text-sm text-gray-600">{t('site.tagline')}</p>
            <p className="mt-2 text-sm text-gray-600">{t('site.schedule')}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{t('footer.contacts')}</h3>
            <a
              href={`tel:${sitePhone.replace(/\s/g, '')}`}
              className="mt-2 block text-primary hover:underline"
            >
              {sitePhone}
            </a>
            <p className="text-xs text-gray-500">{t('footer.phoneFree')}</p>
            <div className="mt-1 flex flex-wrap gap-2 text-sm">
              {sitePhones.map((p) => (
                <a key={p} href={`tel:${p.replace(/\s|\(|\)/g, '')}`} className="text-gray-600 hover:text-primary">
                  {p}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{t('catalog.title')}</h3>
            <ul className="mt-2 space-y-1">
              {mainCategories.slice(0, 8).map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={cat.href}
                    className="text-sm text-gray-600 hover:text-primary"
                  >
                    {t(`catalog.categories.${cat.id}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{t('footer.help')}</h3>
            <ul className="mt-2 space-y-1 text-sm text-gray-600">
              <li>
                <Link href="/delivery" className="hover:text-primary">{t('footer.delivery')}</Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-primary">{t('footer.returns')}</Link>
              </li>
              <li>
                <Link href="/tracking" className="hover:text-primary">{t('footer.tracking')}</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
          {t('footer.copyright', { year: new Date().getFullYear(), name: t('site.name') })}
        </div>
      </div>
    </footer>
  );
}
