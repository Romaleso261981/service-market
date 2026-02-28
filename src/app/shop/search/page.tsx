'use client';

import { useTranslation } from 'react-i18next';
import { HeaderWithCart } from '@/widgets/Header';
import { Footer } from '@/widgets/Footer';
import { CatalogSearch } from '@/features/search-catalog';
import { ProductGrid } from '@/widgets/ProductGrid';
import { mockProducts } from '@/shared/config/mock-products';

export default function SearchPage() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col">
      <HeaderWithCart />
      <main className="flex-1 px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-4 text-xl font-semibold">{t('search.title')}</h1>
          <CatalogSearch className="mb-6 max-w-xl" />
          <ProductGrid products={mockProducts} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
