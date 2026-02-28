'use client';

import Link from 'next/link';
import { CatalogSearch } from '@/features/search-catalog';
import { siteConfig } from '@/shared/config/site';
import { Button } from '@/shared/ui';

export interface HeaderProps {
  cartCount?: number;
}

export function Header({ cartCount = 0 }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <Link
            href="/"
            className="text-xl font-bold text-primary hover:text-primary-hover"
          >
            {siteConfig.name}
          </Link>
          <div className="flex-1 max-w-xl w-full">
            <CatalogSearch />
          </div>
          <div className="flex items-center gap-2">
            <Link href="/auth">
              <Button variant="ghost">Вход</Button>
            </Link>
            <Link href="/cart" className="relative">
              <Button variant="outline">
                Корзина
                {cartCount > 0 && (
                  <span className="ml-1 rounded-full bg-primary px-2 py-0.5 text-xs text-white">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
        <p className="mt-1 text-sm text-gray-500">{siteConfig.tagline}</p>
      </div>
    </header>
  );
}
