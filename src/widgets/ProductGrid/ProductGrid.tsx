'use client';

import { useTranslation } from 'react-i18next';
import { ProductCard } from '@/entities/product';
import type { ProductCardData } from '@/entities/product';

export interface ProductGridProps {
  products: ProductCardData[];
  onAddToCart?: (id: string) => void;
}

export function ProductGrid({ products, onAddToCart }: ProductGridProps) {
  const { t } = useTranslation();

  if (products.length === 0) {
    return (
      <p className="py-12 text-center text-gray-500">
        {t('search.empty')}
      </p>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}
