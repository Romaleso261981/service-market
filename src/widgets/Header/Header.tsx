'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { CatalogSearch } from '@/features/search-catalog';
import { AuthDropdown } from '@/features/auth-dropdown';
import { LanguageSwitcher } from '@/features/language-switcher';
import { Button } from '@/shared/ui';

export interface HeaderProps {
  cartCount?: number;
}

export function Header({ cartCount = 0 }: HeaderProps) {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-50 border-b border-header-dark bg-header shadow-sm">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xl font-bold text-white hover:text-white/90"
            >
              {t('site.name')}
            </Link>
          </div>
          <div className="flex-1 max-w-xl w-full">
            <CatalogSearch variant="dark" />
          </div>
          <div className="flex items-center gap-2">
          <LanguageSwitcher variant="dark" />
            <AuthDropdown variant="dark" />
            <Link href="/cart" className="relative">
              <Button variant="darkHeader">
                {t('header.cart')}
                {cartCount > 0 && (
                  <span className="ml-1 rounded-full bg-primary px-2 py-0.5 text-xs text-white">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
        <p className="mt-1 text-sm text-white/80">{t('site.tagline')}</p>
      </div>
    </header>
  );
}
