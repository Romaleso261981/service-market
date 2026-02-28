'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui';
import { useLocalePath } from '@/app/providers/LocaleProvider';
import type { ProductCardData } from '../../model/types';

export interface ProductCardProps {
  product: ProductCardData;
  onAddToCart?: (id: string) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { t } = useTranslation();
  const localePath = useLocalePath();
  const { id, code, name, slug, price, currency, image, inStock, deliveryDays } = product;

  return (
    <article className="flex flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <Link href={localePath(`/products/${slug}`)} className="flex flex-1 flex-col">
        {image ? (
          <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={image}
              alt={name}
              fill
              className="object-contain p-2"
              sizes="(max-width: 640px) 100vw, 25vw"
            />
          </div>
        ) : (
          <div className="aspect-square rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
            {t('product.noPhoto')}
          </div>
        )}
        <p className="mt-2 text-xs text-gray-500">{t('product.code')}: {code}</p>
        <h3 className="mt-1 line-clamp-2 font-medium text-gray-900">{name}</h3>
        {deliveryDays && (
          <p className="mt-1 text-xs text-amber-600">{deliveryDays}</p>
        )}
        <p className="mt-auto pt-2 text-lg font-semibold text-primary">
          {price} {currency}
        </p>
      </Link>
      <Button
        variant="primary"
        className="mt-3 w-full"
        disabled={!inStock}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onAddToCart?.(id);
        }}
      >
        {inStock ? t('product.buy') : t('product.onOrder')}
      </Button>
    </article>
  );
}
