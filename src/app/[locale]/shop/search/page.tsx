'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { HeaderWithCart } from '@/widgets/Header';
import { Footer } from '@/widgets/Footer';
import { CatalogSearch } from '@/features/search-catalog';
import { ProductGrid } from '@/widgets/ProductGrid';
import { useProducts } from '@/app/providers/ProductsProvider';
import { useCartContext } from '@/app/providers/CartProvider';
import type { Product } from '@/entities/product';

function filterProductsByQuery(products: Product[], query: string): Product[] {
  if (!query.trim()) return products;
  const lower = query.trim().toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lower) ||
      (p.code && p.code.toLowerCase().includes(lower))
  );
}

export default function SearchPage() {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const textParam = searchParams?.get('text') ?? '';
  const { products } = useProducts();
  const { addItem } = useCartContext();

  const filteredProducts = useMemo(
    () => filterProductsByQuery(products, textParam),
    [products, textParam]
  );

  const handleAddToCart = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      addItem({
        productId: product.id,
        name: product.name,
        code: product.code,
        price: product.price,
        quantity: 1,
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <HeaderWithCart />
      <main className="flex-1 px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-4 text-xl font-semibold">{t('search.title')}</h1>
          <CatalogSearch
            defaultValue={textParam}
            navigateOnDebounce={true}
            className="mb-6 max-w-xl"
          />
          {textParam && (
            <p className="mb-4 text-sm text-gray-500">
              {filteredProducts.length === 0
                ? t('search.noResults', { query: textParam })
                : t('search.resultsCount', { count: filteredProducts.length, query: textParam })}
            </p>
          )}
          {filteredProducts.length === 0 ? (
            <p className="py-8 text-center text-gray-500">
              {textParam ? t('search.noResultsShort') : t('search.enterQuery')}
            </p>
          ) : (
            <ProductGrid
              products={filteredProducts}
              onAddToCart={handleAddToCart}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
